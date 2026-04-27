# BacklogOS — Backend (Express + SQLite + Gemini)

Zero-setup backend for BacklogOS. SQLite is file-based (no install needed).

## Run

```bash
cp .env.example .env
# edit .env to add your free Gemini key from https://aistudio.google.com/apikey
npm install
npm start
```

Listens on http://localhost:5000.

## Endpoints

- `GET  /api/tasks` — list tasks + stats
- `POST /api/tasks` — create
- `PATCH /api/tasks/:id` — update
- `DELETE /api/tasks/:id`
- `POST /api/ai/chat` — Gemini chat
- `POST /api/ai/breakdown` — split a task into atomic steps
- `POST /api/auth/login` — `{email, password}`
- `GET  /api/auth/users` — admin
- `GET  /api/insights` — totals/completion

## Demo accounts (seeded)

- `demo@backlogos.app` / `demo`
- `admin@backlogos.app` / `admin`

## Database

`backlogos.db` is created automatically on first run. Delete it to reset.
