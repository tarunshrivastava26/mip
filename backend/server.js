import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { db, initDb } from './db.js'
import tasksRouter from './routes/tasks.js'
import aiRouter from './routes/ai.js'
import authRouter from './routes/auth.js'
import insightsRouter from './routes/insights.js'

dotenv.config()
initDb()

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/', (_req, res) => res.json({ name: 'BacklogOS API', version: '1.0.0', endpoints: ['/api/tasks','/api/ai/chat','/api/auth/login','/api/insights'] }))
app.use('/api/tasks', tasksRouter)
app.use('/api/ai', aiRouter)
app.use('/api/auth', authRouter)
app.use('/api/insights', insightsRouter)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`✅ BacklogOS backend on http://localhost:${PORT}`))
