import { Router } from 'express'
import { db, rowToTask } from '../db.js'

const r = Router()

r.get('/', (_req, res) => {
  const tasks = db.prepare('SELECT * FROM tasks ORDER BY created_at DESC').all().map(rowToTask)
  const stats = db.prepare('SELECT * FROM stats WHERE id = 1').get() || { points: 0, streak: 0, badges: '[]' }
  res.json({ tasks, points: stats.points, streak: stats.streak, badges: JSON.parse(stats.badges) })
})

r.post('/', (req, res) => {
  const t = req.body
  if (!t.id || !t.title) return res.status(400).json({ error: 'id and title required' })
  db.prepare(`INSERT INTO tasks (id, title, type, due_date, top_pick, postponed_count, skip_score, notes)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(
    t.id, t.title, t.type || 'task', t.dueDate || null, t.topPick ? 1 : 0,
    t.postponedCount || 0, t.skipScore || null, t.notes || null
  )
  res.json({ ok: true })
})

r.patch('/:id', (req, res) => {
  const id = req.params.id
  const map = { dueDate: 'due_date', topPick: 'top_pick', postponedCount: 'postponed_count', skipScore: 'skip_score', completedAt: 'completed_at' }
  const sets = []
  const vals = []
  for (const [k, v] of Object.entries(req.body)) {
    const col = map[k] || k
    let val = v
    if (typeof v === 'boolean') val = v ? 1 : 0
    sets.push(`${col} = ?`); vals.push(val)
  }
  if (sets.length === 0) return res.json({ ok: true })
  vals.push(id)
  db.prepare(`UPDATE tasks SET ${sets.join(', ')} WHERE id = ?`).run(...vals)
  res.json({ ok: true })
})

r.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id)
  res.json({ ok: true })
})

export default r
