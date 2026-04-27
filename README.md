# BacklogOS — Full Stack

Two folders:

- `backlogos-frontend/` — React 18 + Vite + Tailwind (CDN). Pure JSX.
- `backlogos-backend/` — Express + SQLite + Gemini.

## Run both

```bash
# Terminal 1 — backend
cd backlogos-backend
cp .env.example .env   # add GEMINI_API_KEY
npm install
npm start              # http://localhost:5000

# Terminal 2 — frontend
cd backlogos-frontend
npm install
npm run dev            # http://localhost:5173
```

Vite proxies `/api/*` to the backend automatically.

## Demo logins

- User: `demo@backlogos.app` / `demo`
- Admin: `admin@backlogos.app` / `admin`
