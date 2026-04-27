import { Router } from 'express'
import { db } from '../db.js'

const r = Router()

r.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'email and password required' })
  const u = db.prepare('SELECT email, name, role, password FROM users WHERE email = ?').get(email.toLowerCase())
  if (!u || u.password !== password) return res.status(401).json({ error: 'Invalid credentials' })
  res.json({ user: { email: u.email, name: u.name, role: u.role } })
})

r.get('/users', (_req, res) => {
  const users = db.prepare('SELECT email, name, role, created_at FROM users').all()
  res.json({ users })
})

export default r
