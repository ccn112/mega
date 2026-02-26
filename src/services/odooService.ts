/**
 * Odoo API Service
 */

export interface OdooUser {
  name: string;
  username: string;
  uid: number;
  db: string;
  company_name?: string;
  image_url?: string;
}

export interface ApprovalRequest {
  id: number;
  name: string;
  code: string;
  request_status: string;
  user_status: string;
  current_approval_sequence: number;
  next_approver_ids: number[];
  request_owner_id: [number, string];
  create_date?: string;
  date_confirmed: string;
  date_scheduled: string;
  date_done: string;
  amount: number;
  reason: string;
  suggest: string;
  legal_basis: string;
}

export type ApprovalUiStatus = 'pending' | 'approved' | 'rejected' | 'other';

export interface ApprovalApprover {
  id: number;
  user_id: [number, string] | false;
  status: string;
  required: boolean;
  sequence: number;
  action_date?: string;
  avatar_url?: string;
  email?: string;
}

export interface ApprovalFollower {
  id: number;
  partner_id: [number, string] | false;
  email?: string;
  avatar_url?: string;
}

export interface OdooFieldDefinition {
  string: string;
  type: string;
  relation?: string;
}

export interface ApprovalExtraField {
  key: string;
  label: string;
  value: any;
  type?: string;
}

export interface ApprovalComment {
  id: number;
  author: string;
  body: string;
  date?: string;
  attachment_ids: number[];
  subtype?: string;
  kind: 'comment' | 'note' | 'system';
}

export interface ApprovalAttachment {
  id: number;
  name: string;
  mimetype?: string;
  file_size?: number;
  create_date?: string;
  create_uid?: [number, string] | false;
  preview_url: string;
  download_url: string;
}

export interface ApprovalRequestDetail extends ApprovalRequest {
  category_id?: [number, string] | false;
  company_id?: [number, string] | false;
  priority?: string;
  detail_html?: string;
  request_date?: string;
  approvers: ApprovalApprover[];
  followers: ApprovalFollower[];
  comments: ApprovalComment[];
  attachments: ApprovalAttachment[];
  fieldDefinitions: Record<string, OdooFieldDefinition>;
  extraFields: ApprovalExtraField[];
}

class OdooService {
  private baseUrl: string = '/api/odoo';
  private sessionId: string | null = null;

  private async executeFirstSuccessfulCall(candidates: Array<{ model: string; method: string; args?: any[]; kwargs?: Record<string, any> }>) {
    let lastError: unknown = null;

    for (const candidate of candidates) {
      try {
        await this.callKw<any>({
          jsonrpc: '2.0',
          id: Math.floor(Math.random() * 1000) + 100,
          method: 'call',
          params: {
            model: candidate.model,
            method: candidate.method,
            args: candidate.args || [],
            kwargs: candidate.kwargs || {}
          }
        });
        return;
      } catch (error) {
        lastError = error;
      }
    }

    if (lastError instanceof Error) {
      throw lastError;
    }
    throw new Error('Không thực hiện được thao tác trên Odoo');
  }

  private pickFirstAvailableField(available: Set<string>, candidates: string[]): string | null {
    for (const candidate of candidates) {
      if (available.has(candidate)) {
        return candidate;
      }
    }
    return null;
  }

  private async callKw<T>(payload: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}/web/dataset/call_kw`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(payload),
      credentials: 'include',
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.data?.message || data.error.message || 'Odoo call_kw failed');
    }

    return data.result as T;
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    const sid = this.sessionId || localStorage.getItem('odoo_session_id');
    if (sid) {
      headers['X-Odoo-Session-Id'] = sid;
    }
    return headers;
  }

  async login(login: string, password: string, db: string = 'production'): Promise<any> {
    const url = `${this.baseUrl}/web/session/authenticate`;
    console.log('Attempting Odoo login to:', url);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: Math.floor(Math.random() * 1000),
          params: {
            db,
            login,
            password
          }
        }),
        credentials: 'include',
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error('Odoo Login: Expected JSON but received:', text.substring(0, 200));
        throw new Error(`Server returned non-JSON response (${response.status}). Check console for details.`);
      }

      const data = await response.json();
      console.log('Odoo Login Response:', data);
      
      if (data.error) {
        throw new Error(data.error.data?.message || data.error.message || 'Login failed');
      }

      if (data.result) {
        // Odoo returns session_id in cookies, but we might need to store it if we can't rely on cookies in iframe
        // Note: The proxy handles injecting the session_id cookie if we send it in headers
        this.sessionId = data.result.session_id;
        localStorage.setItem('odoo_session_id', data.result.session_id || '');
        localStorage.setItem('odoo_user', JSON.stringify(data.result));
      }

      return data.result;
    } catch (error) {
      console.error('Odoo Login Error:', error);
      throw error;
    }
  }

  async getApprovalRequests(limit: number = 500, offset: number = 0): Promise<ApprovalRequest[]> {
    try {
      const result = await this.callKw<ApprovalRequest[]>({
        jsonrpc: "2.0",
        id: 2,
        method: "call",
        params: {
          model: "approval.request",
          method: "search_read",
          args: [
            [],
            [
              "id",
              "name",
              "code",
              "request_status",
              "user_status",
              "current_approval_sequence",
              "next_approver_ids",
              "request_owner_id",
              "create_date",
              "date_confirmed",
              "date_scheduled",
              "date_done",
              "amount",
              "reason",
              "suggest",
              "legal_basis"
            ]
          ],
          kwargs: {
            limit,
            offset,
            order: 'create_date desc, id desc'
          }
        }
      });

      return result || [];
    } catch (error) {
      console.error('Odoo Fetch Error:', error);
      throw error;
    }
  }

  mapApprovalStatus(status: string): ApprovalUiStatus {
    const normalized = (status || '').toLowerCase();

    if (['approved', 'approve', 'done'].includes(normalized)) {
      return 'approved';
    }

    if (['refused', 'rejected', 'reject', 'cancel', 'cancelled'].includes(normalized)) {
      return 'rejected';
    }

    if (['pending', 'to_approve', 'new', 'confirm', 'waiting'].includes(normalized)) {
      return 'pending';
    }

    return 'other';
  }

  getApprovalStatusLabel(status: string): string {
    const normalized = (status || '').toLowerCase();
    const mapped = this.mapApprovalStatus(normalized);

    if (mapped === 'approved') return 'Đã duyệt';
    if (mapped === 'rejected') return 'Từ chối';
    if (mapped === 'pending') return 'Chờ duyệt';

    if (['cancel', 'cancelled'].includes(normalized)) return 'Đã hủy';
    if (['draft', 'new'].includes(normalized)) return 'Bản nháp';
    return 'Khác';
  }

  async approveApprovalRequest(requestId: number): Promise<void> {
    await this.executeFirstSuccessfulCall([
      { model: 'approval.request', method: 'action_approve', args: [[requestId]] },
      { model: 'approval.request', method: 'approve', args: [[requestId]] },
      { model: 'approval.request', method: 'action_approve', args: [requestId] },
    ]);
  }

  async rejectApprovalRequest(requestId: number, reason?: string): Promise<void> {
    await this.executeFirstSuccessfulCall([
      { model: 'approval.request', method: 'action_refuse', args: [[requestId]], kwargs: reason ? { reason } : {} },
      { model: 'approval.request', method: 'action_reject', args: [[requestId]], kwargs: reason ? { reason } : {} },
      { model: 'approval.request', method: 'action_cancel', args: [[requestId]], kwargs: reason ? { reason } : {} },
    ]);

    if (reason?.trim()) {
      await this.commentApprovalRequest(requestId, `Lý do từ chối: ${reason.trim()}`);
    }
  }

  async commentApprovalRequest(requestId: number, content: string): Promise<void> {
    const body = (content || '').trim();
    if (!body) {
      throw new Error('Nội dung bình luận không được để trống');
    }

    await this.executeFirstSuccessfulCall([
      {
        model: 'approval.request',
        method: 'message_post',
        args: [[requestId]],
        kwargs: {
          body,
          message_type: 'comment',
          subtype_xmlid: 'mail.mt_comment'
        }
      },
      {
        model: 'mail.thread',
        method: 'message_post',
        args: [[requestId]],
        kwargs: {
          body,
          message_type: 'comment',
          subtype_xmlid: 'mail.mt_comment'
        }
      }
    ]);
  }

  async getApprovalRequestFields(): Promise<Record<string, OdooFieldDefinition>> {
    return this.callKw<Record<string, OdooFieldDefinition>>({
      jsonrpc: '2.0',
      id: 30,
      method: 'call',
      params: {
        model: 'approval.request',
        method: 'fields_get',
        args: [],
        kwargs: {
          attributes: ['string', 'type', 'relation']
        }
      }
    });
  }

  private async getApprovalApproversByIds(approverIds: number[]): Promise<ApprovalApprover[]> {
    if (!approverIds.length) return [];

    const approverFieldDefinitions = await this.callKw<Record<string, OdooFieldDefinition>>({
      jsonrpc: '2.0',
      id: 40,
      method: 'call',
      params: {
        model: 'approval.approver',
        method: 'fields_get',
        args: [],
        kwargs: {
          attributes: ['string', 'type', 'relation']
        }
      }
    });

    const approverAvailableFields = new Set(Object.keys(approverFieldDefinitions || {}));
    const approverReadFields = ['id', 'user_id', 'status', 'required', 'sequence'].filter((field) => approverAvailableFields.has(field));
    const approverActionDateField = this.pickFirstAvailableField(approverAvailableFields, ['action_date', 'date', 'write_date', 'create_date']);
    if (approverActionDateField && !approverReadFields.includes(approverActionDateField)) {
      approverReadFields.push(approverActionDateField);
    }

    const approverRows = await this.callKw<ApprovalApprover[]>({
      jsonrpc: '2.0',
      id: 4,
      method: 'call',
      params: {
        model: 'approval.approver',
        method: 'search_read',
        args: [[['id', 'in', approverIds]]],
        kwargs: {
          fields: approverReadFields,
          order: 'sequence asc, id asc'
        }
      }
    });

    const userIds = approverRows
      .map((item) => Array.isArray(item.user_id) ? item.user_id[0] : null)
      .filter((id): id is number => typeof id === 'number');

    const userMap = new Map<number, { email?: string; avatar_url?: string }>();

    if (userIds.length > 0) {
      const users = await this.callKw<any[]>({
        jsonrpc: '2.0',
        id: 41,
        method: 'call',
        params: {
          model: 'res.users',
          method: 'search_read',
          args: [[['id', 'in', userIds]]],
          kwargs: {
            fields: ['id', 'login']
          }
        }
      });

      users.forEach((user) => {
        if (typeof user.id === 'number') {
          userMap.set(user.id, {
            email: user.login,
            avatar_url: `/api/odoo/web/image?model=res.users&id=${user.id}&field=avatar_128`
          });
        }
      });
    }

    return approverRows.map((item) => {
      const userId = Array.isArray(item.user_id) ? item.user_id[0] : null;
      const userInfo = typeof userId === 'number' ? userMap.get(userId) : undefined;
      const mappedActionDate = approverActionDateField ? (item as any)[approverActionDateField] : undefined;
      return {
        ...item,
        action_date: mappedActionDate,
        avatar_url: userInfo?.avatar_url,
        email: userInfo?.email,
      };
    });
  }

  private async getApprovalFollowersByIds(followerIds: number[]): Promise<ApprovalFollower[]> {
    if (!followerIds.length) return [];

    const rawFollowers = await this.callKw<any[]>({
      jsonrpc: '2.0',
      id: 5,
      method: 'call',
      params: {
        model: 'mail.followers',
        method: 'search_read',
        args: [[['id', 'in', followerIds]]],
        kwargs: {
          fields: ['id', 'partner_id', 'email']
        }
      }
    });

    const partnerIds = rawFollowers
      .map((item) => Array.isArray(item.partner_id) ? item.partner_id[0] : null)
      .filter((id): id is number => typeof id === 'number');

    const partnerMap = new Map<number, { email?: string }>();
    if (partnerIds.length > 0) {
      const partners = await this.callKw<any[]>({
        jsonrpc: '2.0',
        id: 51,
        method: 'call',
        params: {
          model: 'res.partner',
          method: 'search_read',
          args: [[['id', 'in', partnerIds]]],
          kwargs: {
            fields: ['id', 'email']
          }
        }
      });

      partners.forEach((partner) => {
        if (typeof partner.id === 'number') {
          partnerMap.set(partner.id, { email: partner.email });
        }
      });
    }

    return (rawFollowers || []).map((item) => {
      const partnerId = Array.isArray(item.partner_id) ? item.partner_id[0] : undefined;
      return {
        id: item.id,
        partner_id: item.partner_id,
        email: item.email || (partnerId ? partnerMap.get(partnerId)?.email : undefined),
        avatar_url: partnerId ? `/api/odoo/web/image?model=res.partner&id=${partnerId}&field=avatar_128` : undefined,
      };
    });
  }

  private async getApprovalCommentsAndAttachments(requestId: number, directAttachmentIds: number[]): Promise<{ comments: ApprovalComment[]; attachments: ApprovalAttachment[] }> {
    let comments: ApprovalComment[] = [];
    let attachments: ApprovalAttachment[] = [];

    const rawMessages = await this.callKw<any[]>({
      jsonrpc: '2.0',
      id: 6,
      method: 'call',
      params: {
        model: 'mail.message',
        method: 'search_read',
        args: [[
          ['model', '=', 'approval.request'],
          ['res_id', '=', requestId],
        ]],
        kwargs: {
          fields: ['id', 'author_id', 'body', 'date', 'create_date', 'attachment_ids', 'message_type', 'subtype_id'],
          order: 'date desc, id desc',
          limit: 100,
        }
      }
    });

    const stripHtml = (value: string) => value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

    comments = (rawMessages || [])
      .filter((item) => ['comment', 'notification'].includes(item.message_type || 'comment'))
      .map((item) => {
        const subtypeLabel = Array.isArray(item.subtype_id) ? item.subtype_id[1] : '';
        const subtypeLower = String(subtypeLabel || '').toLowerCase();
        const kind: ApprovalComment['kind'] = subtypeLower.includes('note') || subtypeLower.includes('ghi')
          ? 'note'
          : item.message_type === 'notification'
            ? 'system'
            : 'comment';
        return {
          id: item.id,
          author: Array.isArray(item.author_id) ? item.author_id[1] : 'Hệ thống',
          body: item.body || '',
          date: item.date || item.create_date,
          attachment_ids: Array.isArray(item.attachment_ids) ? item.attachment_ids : [],
          subtype: subtypeLabel,
          kind,
        };
      })
      .filter((item) => stripHtml(item.body).length > 0)
      .filter((item) => {
        const subtypeLower = String(item.subtype || '').toLowerCase();
        const isAutoNote = item.kind === 'note' && /auto|automation|odoobot|system|changelog/i.test(subtypeLower);
        return !isAutoNote;
      });

    const messageAttachmentIds = comments.flatMap((item) => item.attachment_ids || []);
    const mergedAttachmentIds = Array.from(new Set([...(directAttachmentIds || []), ...messageAttachmentIds]));

    if (mergedAttachmentIds.length > 0) {
      const rawAttachments = await this.callKw<any[]>({
        jsonrpc: '2.0',
        id: 7,
        method: 'call',
        params: {
          model: 'ir.attachment',
          method: 'search_read',
          args: [[['id', 'in', mergedAttachmentIds]]],
          kwargs: {
            fields: ['id', 'name', 'mimetype', 'file_size', 'create_date', 'create_uid'],
            order: 'create_date desc, id desc',
          }
        }
      });

      attachments = (rawAttachments || []).map((item) => ({
        id: item.id,
        name: item.name || `File #${item.id}`,
        mimetype: item.mimetype,
        file_size: item.file_size,
        create_date: item.create_date,
        create_uid: item.create_uid,
        preview_url: `/api/odoo/web/content/${item.id}`,
        download_url: `/api/odoo/web/content/${item.id}?download=true`,
      }));
    }

    return { comments, attachments };
  }

  private async loadApprovalRequestRelatedByIds(requestId: number, approverIds: number[], followerIds: number[], directAttachmentIds: number[]) {
    const [approvers, followers, messageData] = await Promise.all([
      this.getApprovalApproversByIds(approverIds),
      this.getApprovalFollowersByIds(followerIds),
      this.getApprovalCommentsAndAttachments(requestId, directAttachmentIds),
    ]);

    return {
      approvers,
      followers,
      comments: messageData.comments,
      attachments: messageData.attachments,
    };
  }

  async getApprovalRequestRelated(requestId: number): Promise<Pick<ApprovalRequestDetail, 'approvers' | 'followers' | 'comments' | 'attachments'>> {
    const requestRows = await this.callKw<any[]>({
      jsonrpc: '2.0',
      id: 301,
      method: 'call',
      params: {
        model: 'approval.request',
        method: 'read',
        args: [[requestId]],
        kwargs: {
          fields: ['approver_ids', 'message_follower_ids', 'attachment_ids']
        }
      }
    });

    if (!requestRows?.length) {
      return { approvers: [], followers: [], comments: [], attachments: [] };
    }

    const row = requestRows[0];
    const approverIds: number[] = Array.isArray(row.approver_ids) ? row.approver_ids : [];
    const followerIds: number[] = Array.isArray(row.message_follower_ids) ? row.message_follower_ids : [];
    const directAttachmentIds: number[] = Array.isArray(row.attachment_ids) ? row.attachment_ids : [];

    try {
      return await this.loadApprovalRequestRelatedByIds(requestId, approverIds, followerIds, directAttachmentIds);
    } catch (error) {
      console.warn('Không tải được dữ liệu liên quan tờ trình:', error);
      return { approvers: [], followers: [], comments: [], attachments: [] };
    }
  }

  async getApprovalRequestDetail(requestId: number, options?: { includeRelated?: boolean }): Promise<ApprovalRequestDetail> {
    const includeRelated = options?.includeRelated !== false;
    const fieldDefinitions = await this.getApprovalRequestFields();
    const availableFields = new Set(Object.keys(fieldDefinitions || {}));

    const preferredFields = [
      'id',
      'name',
      'code',
      'request_status',
      'user_status',
      'current_approval_sequence',
      'next_approver_ids',
      'request_owner_id',
      'date_confirmed',
      'date_scheduled',
      'date_done',
      'category_id',
      'company_id',
      'priority',
      'amount',
      'reason',
      'suggest',
      'legal_basis',
      'description',
      'request_html',
      'request_content',
      'content',
      'note',
      'attachment_ids',
      'approver_ids',
      'message_follower_ids',
      'create_date',
      'write_date',
      'company_id',
      'owner_id',
      'request_date',
      'date',
      'request_date_start',
      'request_date_end'
    ];

    const readFields = preferredFields.filter((field) => availableFields.has(field));

    const requestDateField = this.pickFirstAvailableField(availableFields, [
      'request_date',
      'date',
      'date_confirmed',
      'create_date',
      'write_date'
    ]);

    const detailHtmlField = this.pickFirstAvailableField(availableFields, [
      'request_html',
      'request_content',
      'description',
      'content',
      'note',
    ]);

    const records = await this.callKw<any[]>({
      jsonrpc: '2.0',
      id: 3,
      method: 'call',
      params: {
        model: 'approval.request',
        method: 'read',
        args: [[requestId]],
        kwargs: {
          fields: readFields
        }
      }
    });

    if (!records?.length) {
      throw new Error('Không tìm thấy tờ trình');
    }

    const request = records[0];
    const approverIds: number[] = Array.isArray(request.approver_ids) ? request.approver_ids : [];
    const followerIds: number[] = Array.isArray(request.message_follower_ids) ? request.message_follower_ids : [];
    const directAttachmentIds: number[] = Array.isArray(request.attachment_ids) ? request.attachment_ids : [];

    let approvers: ApprovalApprover[] = [];
    let followers: ApprovalFollower[] = [];
    let comments: ApprovalComment[] = [];
    let attachments: ApprovalAttachment[] = [];

    if (includeRelated) {
      try {
        const related = await this.loadApprovalRequestRelatedByIds(requestId, approverIds, followerIds, directAttachmentIds);
        approvers = related.approvers;
        followers = related.followers;
        comments = related.comments;
        attachments = related.attachments;
      } catch (error) {
        console.warn('Không tải được dữ liệu liên quan tờ trình:', error);
      }
    }

    const extraFieldCandidates = [
      'request_status',
      'user_status',
      'current_approval_sequence',
      'date_confirmed',
      'date_scheduled',
      'date_done',
      'create_date',
      'write_date',
      'company_id',
      'owner_id',
      'category_id',
      'amount',
      'reason',
      'suggest',
      'legal_basis'
    ];

    const extraFields: ApprovalExtraField[] = extraFieldCandidates
      .filter((field) => availableFields.has(field) && request[field] !== undefined && request[field] !== false && request[field] !== null && request[field] !== '')
      .map((field) => ({
        key: field,
        label: fieldDefinitions[field]?.string || field,
        value: request[field],
        type: fieldDefinitions[field]?.type,
      }));

    return {
      ...request,
      id: request.id || requestId,
      name: request.name || 'N/A',
      code: request.code || '',
      request_date: requestDateField ? request[requestDateField] : undefined,
      category_id: request.category_id,
      company_id: request.company_id,
      priority: request.priority,
      detail_html: detailHtmlField ? request[detailHtmlField] : '',
      amount: request.amount || 0,
      reason: request.reason || '',
      suggest: request.suggest || '',
      legal_basis: request.legal_basis || '',
      request_status: request.request_status || '',
      user_status: request.user_status || '',
      current_approval_sequence: request.current_approval_sequence || 0,
      next_approver_ids: request.next_approver_ids || [],
      request_owner_id: request.request_owner_id || [0, 'N/A'],
      date_confirmed: request.date_confirmed || '',
      date_scheduled: request.date_scheduled || '',
      date_done: request.date_done || '',
      approvers,
      followers,
      comments,
      attachments,
      fieldDefinitions,
      extraFields,
    };
  }

  getCurrentUser(): OdooUser | null {
    const userStr = localStorage.getItem('odoo_user');
    if (!userStr) return null;
    try {
      const user = JSON.parse(userStr);
      
      // Extract company name from allowed_companies based on current_company ID
      const currentCompanyId = user.user_companies?.current_company;
      const companyName = user.user_companies?.allowed_companies?.[currentCompanyId]?.name;

      return {
        name: user.name,
        username: user.username,
        uid: user.uid,
        db: user.db,
        company_name: companyName || user.company_name,
        image_url: user.partner_id ? `/api/odoo/web/image?model=res.partner&id=${user.partner_id}&field=avatar_128` : undefined
      };
    } catch (e) {
      console.error('Error parsing stored user:', e);
      return null;
    }
  }

  async logout() {
    this.sessionId = null;
    localStorage.removeItem('odoo_session_id');
    localStorage.removeItem('odoo_user');
  }
}

export const odoo = new OdooService();
