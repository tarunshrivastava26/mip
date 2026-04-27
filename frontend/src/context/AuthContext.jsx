import { createContext, useContext, useEffect, useState } from 'react'

const Ctx = createContext(null)
const KEY = 'backlogos.user.v1'

const ACCOUNTS = {
  'demo@backlogos.app': { password: 'demo', user: { email: 'demo@backlogos.app', name: 'Demo Student', role: 'user' } },
  'admin@backlogos.app': { password: 'admin', user: { email: 'admin@backlogos.app', name: 'Admin', role: 'admin' } }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {}
    setHydrated(true)
  }, [])

  const login = (email, password) => {
    const acc = ACCOUNTS[email.trim().toLowerCase()]
    if (!acc || acc.password !== password) return { ok: false, error: 'Invalid credentials. Try demo@backlogos.app / demo' }
    setUser(acc.user)
    localStorage.setItem(KEY, JSON.stringify(acc.user))
    return { ok: true }
  }

  const logout = () => { setUser(null); localStorage.removeItem(KEY) }

  const updateProfile = (patch) => setUser(u => {
    if (!u) return u
    const next = { ...u, ...patch }
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  })

  return <Ctx.Provider value={{ user, hydrated, login, logout, updateProfile }}>{children}</Ctx.Provider>
}

export const useAuth = () => useContext(Ctx)
