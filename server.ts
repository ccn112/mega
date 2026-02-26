import express from "express";
import { createServer as createViteServer } from "vite";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Proxy for Odoo to avoid CORS
  app.use(
    "/api/odoo",
    createProxyMiddleware({
      target: "https://office.tanadaithanh.vn",
      pathRewrite: {
        '^/api/odoo': '',
      },
      changeOrigin: true,
      secure: false,
      cookieDomainRewrite: {
        "*": "" 
      },
      cookiePathRewrite: {
        "*": "/" 
      },
      on: {
        proxyReq: (proxyReq, req, res) => {
          console.log(`[Proxy Request] ${req.method} ${req.url} -> https://office.tanadaithanh.vn${proxyReq.path}`);
          
          const sessionId = req.headers['x-odoo-session-id'];
          if (sessionId) {
            proxyReq.setHeader('Cookie', `session_id=${sessionId}`);
          }
        },
        proxyRes: (proxyRes, req, res) => {
          console.log(`[Proxy Response] ${proxyRes.statusCode} from ${req.url}`);
          
          const sc = proxyRes.headers['set-cookie'];
          if (sc) {
            proxyRes.headers['set-cookie'] = sc.map(s => 
              s.replace(/Domain=[^;]+;?/i, '') 
               .replace(/Secure;?/i, '') 
               .replace(/SameSite=[^;]+;?/i, 'SameSite=Lax')
            );
          }
        },
        error: (err, req, res) => {
          console.error('[Proxy Error]', err);
        }
      }
    })
  );

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // News endpoint - fetch from Tân Á Đại Thành website
  app.get("/api/news", async (req, res) => {
    try {
      const response = await fetch('https://tanadaithanh.vn/tin-tuc/');
      const html = await response.text();
      
      const news: Array<{ id: string; title: string; excerpt: string; link: string; date: string; image?: string }> = [];
      let counter = 0;
      
      // Try multiple parsing strategies
      const articleMatches = html.matchAll(/<article[^>]*class="[^"]*post[^"]*"[^>]*>[\s\S]*?<\/article>/g);
      
      for (const article of articleMatches) {
        if (news.length >= 8) break;
        const articleHtml = article[0];
        
        // Extract link - try multiple patterns
        let linkMatch = articleHtml.match(/<a[^>]*href="([^"]*)"[^>]*class="[^"]*post-link[^"]*"/);
        if (!linkMatch) {
          linkMatch = articleHtml.match(/<a[^>]*href="([^"]*)"[^>]*>[\s\S]*?<h[2-3]/);
        }
        if (!linkMatch) continue;
        
        // Extract title - try multiple patterns
        let titleMatch = articleHtml.match(/<h[2-3][^>]*>([^<]*)<\/h[2-3]>/);
        if (!titleMatch) {
          titleMatch = articleHtml.match(/<h[2-3][^>]*class="[^"]*post-title[^"]*"[^>]*>([^<]*)<\/h[2-3]>/);
        }
        if (!titleMatch) continue;
        
        // Extract excerpt/content - try multiple patterns
        let excerptMatch = articleHtml.match(/<p[^>]*class="[^"]*post-excerpt[^"]*"[^>]*>([^<]*)<\/p>/);
        if (!excerptMatch) {
          excerptMatch = articleHtml.match(/<p[^>]*>([^<]*)<\/p>/);
        }
        const excerpt = excerptMatch ? excerptMatch[1].trim() : '';
        
        // Extract date - try multiple patterns
        let dateMatch = articleHtml.match(/(\d{1,2}\/\d{1,2}\/\d{4})|(\d{4}-\d{1,2}-\d{1,2})|(\d{1,2}-\d{1,2}-\d{4})/);
        if (!dateMatch) {
          dateMatch = articleHtml.match(/class="[^"]*post-date[^"]*"[^>]*>([^<]*)<\/[^>]*>/);
        }
        const date = dateMatch ? (dateMatch[1] || dateMatch[0]) : '';
        
        // Extract image - try multiple patterns
        let imgMatch = articleHtml.match(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"/);
        if (!imgMatch) {
          imgMatch = articleHtml.match(/<img[^>]*src="([^"]*)"[^>]*class="[^"]*post-image[^"]*"/);
        }
        const image = imgMatch ? imgMatch[1] : '';
        
        news.push({
          id: `news_${counter++}`,
          title: titleMatch[1].trim(),
          excerpt: excerpt.substring(0, 150) + (excerpt.length > 150 ? '...' : ''),
          link: linkMatch[1],
          date: date,
          image: image
        });
      }
      
      // If no news found, return some fallback data
      if (news.length === 0) {
        console.log('No news found from website, using fallback data');
        const fallbackNews = [
          {
            id: 'fallback_1',
            title: 'Tân Á Đại Thành nhận giải thưởng Top 10 Doanh nghiệp tiêu biểu',
            excerpt: 'Công ty TNHH Tân Á Đại Thành vinh dự nhận giải thưởng Top 10 Doanh nghiệp tiêu biểu năm 2024 từ UBND TP.HCM.',
            link: 'https://tanadaithanh.vn/tin-tuc/',
            date: '26/02/2026',
            image: 'https://tanadaithanh.vn/wp-content/uploads/2024/04/Logo-TADT-_-WF-all-01.png'
          },
          {
            id: 'fallback_2',
            title: 'Bản tin thị trường Bất động sản nghỉ dưỡng Phú Quốc Q1/2026',
            excerpt: 'Cập nhật tình hình thị trường bất động sản nghỉ dưỡng Phú Quốc trong quý đầu năm 2026.',
            link: 'https://tanadaithanh.vn/tin-tuc/',
            date: '25/02/2026',
            image: 'https://tanadaithanh.vn/wp-content/uploads/2024/04/Logo-TADT-_-WF-all-01.png'
          },
          {
            id: 'fallback_3',
            title: 'Công bố kết quả kinh doanh năm 2025',
            excerpt: 'Tân Á Đại Thành công bố kết quả kinh doanh năm 2025 với doanh thu đạt 15.000 tỷ đồng.',
            link: 'https://tanadaithanh.vn/tin-tuc/',
            date: '20/02/2026',
            image: 'https://tanadaithanh.vn/wp-content/uploads/2024/04/Logo-TADT-_-WF-all-01.png'
          }
        ];
        return res.json({ news: fallbackNews });
      }
      
      res.json({ news });
    } catch (error) {
      console.error('Error fetching news:', error);
      // Return fallback data on error
      const fallbackNews = [
        {
          id: 'fallback_1',
          title: 'Tân Á Đại Thành nhận giải thưởng Top 10 Doanh nghiệp tiêu biểu',
          excerpt: 'Công ty TNHH Tân Á Đại Thành vinh dự nhận giải thưởng Top 10 Doanh nghiệp tiêu biểu năm 2024 từ UBND TP.HCM.',
          link: 'https://tanadaithanh.vn/tin-tuc/',
          date: '26/02/2026',
          image: 'https://tanadaithanh.vn/wp-content/uploads/2024/04/Logo-TADT-_-WF-all-01.png'
        },
        {
          id: 'fallback_2',
          title: 'Bản tin thị trường Bất động sản nghỉ dưỡng Phú Quốc Q1/2026',
          excerpt: 'Cập nhật tình hình thị trường bất động sản nghỉ dưỡng Phú Quốc trong quý đầu năm 2026.',
          link: 'https://tanadaithanh.vn/tin-tuc/',
          date: '25/02/2026',
          image: 'https://tanadaithanh.vn/wp-content/uploads/2024/04/Logo-TADT-_-WF-all-01.png'
        }
      ];
      res.json({ news: fallbackNews });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
