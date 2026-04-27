import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const db = new Database(path.join(__dirname, 'backlogos.db'))
db.pragma('journal_mode = WAL')

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      type TEXT DEFAULT 'task',
      due_date TEXT,
      completed INTEGER DEFAULT 0,
      completed_at TEXT,
      postponed_count INTEGER DEFAULT 0,
      top_pick INTEGER DEFAULT 0,
      skip_score INTEGER,
      notes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS users (
      email TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      password TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      points INTEGER DEFAULT 0,
      streak INTEGER DEFAULT 0,
      badges TEXT DEFAULT '[]'
    );
  `)
  // Seed demo accounts
  const seedUser = db.prepare('INSERT OR IGNORE INTO users (email, name, role, password) VALUES (?, ?, ?, ?)')
  seedUser.run('demo@backlogos.app', 'Demo Student', 'user', 'demo')
  seedUser.run('admin@backlogos.app', 'Admin', 'admin', 'admin')
  db.prepare('INSERT OR IGNORE INTO stats (id, points, streak, badges) VALUES (1, 0, 0, ?)').run('[]')
  // Seed demo tasks if empty
  const count = db.prepare('SELECT COUNT(*) as c FROM tasks').get().c
  if (count === 0) {
    const ins = db.prepare('INSERT INTO tasks (id, title, type, due_date, top_pick) VALUES (?, ?, ?, ?, ?)')
    const now = new Date()
    const tomorrow = new Date(Date.now() + 86400000).toISOString()
    ins.run('t1', 'Finish algorithms homework', 'task', tomorrow, 1)
    ins.run('t2', 'Lecture 4: Binary Trees', 'lecture', now.toISOString(), 1)
    ins.run('t3', 'Group project meeting', 'task', now.toISOString(), 1)
    ins.run('t4', 'Email advisor about thesis', 'task', null, 0)
  }
  console.log('✅ SQLite initialized at backlogos.db')
}

export function rowToTask(r) {
  return {
    id: r.id, title: r.title, type: r.type,
    dueDate: r.due_date, completed: !!r.completed, completedAt: r.completed_at,
    postponedCount: r.postponed_count, topPick: !!r.top_pick,
    skipScore: r.skip_score, notes: r.notes, createdAt: r.created_at
  }
}
