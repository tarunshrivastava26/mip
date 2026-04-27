import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const Ctx = createContext(null)
const KEY = 'backlogos.tasks.v1'
const API = '/api'

const seed = () => ([
  { id: 't1', title: 'Finish algorithms homework', type: 'task', dueDate: new Date(Date.now()+86400000).toISOString(), completed: false, postponedCount: 0, createdAt: new Date().toISOString(), topPick: true },
  { id: 't2', title: 'Lecture 4: Binary Trees', type: 'lecture', dueDate: new Date().toISOString(), completed: false, postponedCount: 0, createdAt: new Date().toISOString(), topPick: true, skipScore: 72 },
  { id: 't3', title: 'Group project meeting', type: 'task', dueDate: new Date().toISOString(), completed: false, postponedCount: 0, createdAt: new Date().toISOString(), topPick: true },
  { id: 't4', title: 'Email advisor about thesis', type: 'task', dueDate: null, completed: false, postponedCount: 8, createdAt: new Date(Date.now()-10*86400000).toISOString() }
])

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [points, setPoints] = useState(0)
  const [streak, setStreak] = useState(0)
  const [badges, setBadges] = useState([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // Try backend first, fall back to localStorage
    axios.get(`${API}/tasks`).then(res => {
      setTasks(res.data.tasks || [])
      setPoints(res.data.points || 0)
      setStreak(res.data.streak || 0)
      setBadges(res.data.badges || [])
      setHydrated(true)
    }).catch(() => {
      try {
        const raw = localStorage.getItem(KEY)
        if (raw) {
          const s = JSON.parse(raw)
          setTasks(s.tasks || seed())
          setPoints(s.points || 0); setStreak(s.streak || 0); setBadges(s.badges || [])
        } else { setTasks(seed()) }
      } catch { setTasks(seed()) }
      setHydrated(true)
    })
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify({ tasks, points, streak, badges }))
  }, [tasks, points, streak, badges, hydrated])

  const pending = useMemo(() => tasks.filter(t => !t.completed), [tasks])
  const top3 = useMemo(() => {
    const explicit = pending.filter(t => t.topPick).slice(0, 3)
    if (explicit.length === 3) return explicit
    const rest = pending.filter(t => !t.topPick).sort((a, b) => {
      const ad = a.dueDate ? new Date(a.dueDate) : Infinity
      const bd = b.dueDate ? new Date(b.dueDate) : Infinity
      return ad - bd
    })
    return [...explicit, ...rest].slice(0, 3)
  }, [pending])

  const addTask = (data) => {
    const t = { id: Date.now().toString(36), completed: false, postponedCount: 0, createdAt: new Date().toISOString(), type: 'task', topPick: false, ...data }
    setTasks(s => [t, ...s])
    axios.post(`${API}/tasks`, t).catch(() => {})
    return t
  }
  const updateTask = (id, patch) => {
    setTasks(s => s.map(t => t.id === id ? { ...t, ...patch } : t))
    axios.patch(`${API}/tasks/${id}`, patch).catch(() => {})
  }
  const deleteTask = (id) => {
    setTasks(s => s.filter(t => t.id !== id))
    axios.delete(`${API}/tasks/${id}`).catch(() => {})
  }
  const toggleComplete = (id) => {
    setTasks(s => s.map(t => {
      if (t.id !== id) return t
      const completed = !t.completed
      if (completed) setPoints(p => p + 10)
      return { ...t, completed, completedAt: completed ? new Date().toISOString() : null }
    }))
  }
  const toggleTopPick = (id) => {
    const picks = tasks.filter(t => t.topPick && !t.completed).length
    setTasks(s => s.map(t => {
      if (t.id !== id) return t
      if (!t.topPick && picks >= 3) return t
      return { ...t, topPick: !t.topPick }
    }))
  }
  const postpone = (id) => updateTask(id, { postponedCount: (tasks.find(t=>t.id===id)?.postponedCount||0) + 1, topPick: false })

  return <Ctx.Provider value={{ tasks, pending, top3, points, streak, badges, addTask, updateTask, deleteTask, toggleComplete, toggleTopPick, postpone }}>{children}</Ctx.Provider>
}

export const useTasks = () => useContext(Ctx)
