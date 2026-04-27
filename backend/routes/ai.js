import { Router } from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'

const r = Router()

function getModel() {
  if (!process.env.GEMINI_API_KEY) return null
  const gen = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  return gen.getGenerativeModel({ model: 'gemini-1.5-flash' })
}

r.post('/chat', async (req, res) => {
  const { message } = req.body
  if (!message) return res.status(400).json({ error: 'message required' })
  const model = getModel()
  if (!model) {
    return res.json({ reply: "AI is offline (no GEMINI_API_KEY in .env). Add one and restart.\n\nMeanwhile, here's a heuristic breakdown:\n• Step 1: Open the doc\n• Step 2: Write 1 sentence\n• Step 3: Set 5-min timer" })
  }
  try {
    const prompt = `You are BacklogOS, a brutally pragmatic productivity coach for students. The user said: "${message}". Reply in <120 words. If it's a task to do, break it into 3-5 atomic 15-minute steps. If it's about skipping a lecture, evaluate strategically.`
    const result = await model.generateContent(prompt)
    res.json({ reply: result.response.text() })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

r.post('/breakdown', async (req, res) => {
  const { task } = req.body
  const model = getModel()
  if (!model) return res.json({ steps: ['Open the file', 'Write 1 sentence', 'Set 5-min timer', 'Continue if it flows'] })
  try {
    const result = await model.generateContent(`Break "${task}" into 3-5 atomic 15-minute steps. Return only a numbered list.`)
    const text = result.response.text()
    const steps = text.split('\n').filter(l => /^\s*\d/.test(l)).map(l => l.replace(/^\s*\d+[.)]\s*/, ''))
    res.json({ steps })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default r
