import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Sparkles } from 'lucide-react'
import { SiteHeader } from '../components/SiteHeader.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('demo@backlogos.app')
  const [password, setPassword] = useState('demo')
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-2xl border border-border bg-card/60 p-8 backdrop-blur shadow-card">
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow"><Sparkles className="h-4 w-4 text-white" /></span>
            <h1 className="text-2xl font-bold">Welcome back</h1>
          </div>
          <form onSubmit={e => { e.preventDefault(); const r = login(email, password); if (!r.ok) toast.error(r.error); else { toast.success('Signed in'); nav('/app') } }} className="space-y-3">
            <label className="block text-xs text-muted">Email
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="mt-1 w-full rounded-lg border border-border bg-bg/40 px-3 py-2 text-sm outline-none focus:border-primary" />
            </label>
            <label className="block text-xs text-muted">Password
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="mt-1 w-full rounded-lg border border-border bg-bg/40 px-3 py-2 text-sm outline-none focus:border-primary" />
            </label>
            <button className="w-full rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-white shadow-glow">Sign in</button>
          </form>
          <div className="mt-6 rounded-lg border border-border/60 bg-bg/40 p-3 text-xs text-muted">
            <div className="font-semibold text-fg mb-1">Demo accounts</div>
            User: <code className="text-primary">demo@backlogos.app</code> / <code className="text-primary">demo</code><br/>
            Admin: <code className="text-primary">admin@backlogos.app</code> / <code className="text-primary">admin</code>
          </div>
          <p className="mt-4 text-xs text-center text-muted">New here? <Link to="/" className="text-primary hover:underline">Read the pitch</Link></p>
        </div>
      </main>
    </div>
  )
}
