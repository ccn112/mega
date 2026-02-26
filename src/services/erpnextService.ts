/**
 * ERPNext API Service
 * Based on Frappe/ERPNext REST API Documentation
 */

export interface ERPNextConfig {
  baseUrl: string;
  apiKey?: string;
  apiSecret?: string;
}

export interface ERPNextUser {
  full_name: string;
  email: string;
  username: string;
  user_image?: string;
  roles: string[];
}

class ERPNextService {
  private proxyPath: string = '/api/erpnext';
  private targetUrl: string = 'https://finerp.com.vn';
  private baseUrl: string = '/api/erpnext'; 
  private sid: string | null = null;

  setBaseUrl(url: string) {
    const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    // If the URL matches our proxy target, use the proxy path instead of the full URL
    if (cleanUrl === this.targetUrl) {
      this.baseUrl = this.proxyPath;
    } else {
      this.baseUrl = cleanUrl;
    }
  }

  /**
   * Login using username and password
   * Returns session ID or throws error
   */
  async login(usr: string, pwd: string): Promise<{ message: string, full_name: string }> {
    try {
      console.log('Attempting ERPNext login for:', usr);
      const response = await fetch(`${this.baseUrl}/api/method/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ usr, pwd }),
        credentials: 'include',
      });

      const data = await response.json();
      console.log('ERPNext Login Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store SID if returned
      if (data.sid) {
        this.sid = data.sid;
        localStorage.setItem('erpnext_sid', data.sid);
      }

      // Store username locally as fallback
      localStorage.setItem('erpnext_last_user', usr);
      
      return data;
    } catch (error) {
      console.error('ERPNext Login Error:', error);
      throw error;
    }
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };
    
    const sid = this.sid || localStorage.getItem('erpnext_sid');
    if (sid) {
      headers['X-ERPNext-SID'] = sid;
    }
    
    return headers;
  }

  /**
   * Get current logged in user info
   */
  async getCurrentUser(): Promise<ERPNextUser> {
    try {
      console.log('Fetching logged user info...');
      // First get the username
      const userRes = await fetch(`${this.baseUrl}/api/method/frappe.auth.get_logged_user`, {
        method: 'GET',
        headers: this.getHeaders(),
        credentials: 'include',
      });

      let username: string;
      if (!userRes.ok) {
        console.warn('Failed to get logged user from API, trying fallback...');
        const fallback = localStorage.getItem('erpnext_last_user');
        if (fallback) {
          username = fallback;
        } else {
          throw new Error('Failed to get logged user and no fallback available');
        }
      } else {
        const userData = await userRes.json();
        username = userData.message;
      }

      console.log('Getting details for user:', username);
      // Then get full details using frappe.client.get
      const detailRes = await fetch(`${this.baseUrl}/api/method/frappe.client.get`, {
        method: 'POST',
        headers: {
          ...this.getHeaders(),
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          doctype: 'User',
          name: username,
        }),
      });

      if (!detailRes.ok) {
        const errorText = await detailRes.text();
        console.error(`Failed to get user details. Status: ${detailRes.status}, Body: ${errorText}`);
        throw new Error(`Failed to get user details: ${detailRes.status}`);
      }
      const { message: data } = await detailRes.json();

      return {
        full_name: data.full_name,
        email: data.email,
        username: data.name,
        user_image: data.user_image ? `${this.baseUrl}${data.user_image}` : undefined,
        roles: data.roles?.map((r: any) => r.role) || [],
      };
    } catch (error) {
      console.error('ERPNext Get User Error:', error);
      throw error;
    }
  }

  /**
   * Logout from ERPNext
   */
  async logout() {
    try {
      await fetch(`${this.baseUrl}/api/method/logout`, {
        method: 'POST',
      });
      this.sid = null;
    } catch (error) {
      console.error('ERPNext Logout Error:', error);
    }
  }

  /**
   * Example of fetching a resource (e.g., Projects)
   */
  async getProjects() {
    const response = await fetch(`${this.baseUrl}/api/resource/Project?fields=["*"]`, {
      method: 'GET',
      headers: this.getHeaders(),
      credentials: 'include',
    });
    return await response.json();
  }
}

export const erpnext = new ERPNextService();
