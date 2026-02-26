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
