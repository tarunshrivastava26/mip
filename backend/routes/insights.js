import { Router } from 'express'
import { db } from '../db.js'

const r = Router()

r.get('/', (_req, res) => {
  const total = db.prepare('SELECT COUNT(*) as c FROM tasks').get().c
  const done = db.prepare('SELECT COUNT(*) as c FROM tasks WHERE completed = 1').get().c
  const ghosts = db.prepare('SELECT COUNT(*) as c FROM tasks WHERE postponed_count >= 7').get().c
  res.json({ total, done, ghosts, completionRate: total ? Math.round((done / total) * 100) : 0 })
})

export default r
