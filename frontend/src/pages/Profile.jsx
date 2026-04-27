import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { SiteHeader, SiteFooter } from '../components/SiteHeader.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Profile() {
  const { user, updateProfile, logout } = useAuth()
  const nav = useNavigate()
  const [name, setName] = useState(user?.name || '')
  useEffect(() => { if (user) setName(user.name) }, [user])
  if (!user) return null
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-12 space-y-6">
        <h1 className="text-3xl font-bold">Profile & settings</h1>
        <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-white shadow-glow">{user.name.charAt(0)}</div>
            <div>
              <div className="font-semibold text-lg">{user.name}</div>
              <div className="text-sm text-muted">{user.email}</div>
              <div className="text-[10px] uppercase tracking-wider text-primary mt-1">{user.role}</div>
            </div>
          </div>
        </section>
        <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur space-y-3">
          <h2 className="font-semibold">Edit profile</h2>
          <label className="block text-xs text-muted">Display name
            <input value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-bg/40 px-3 py-2 text-sm outline-none focus:border-primary" />
          </label>
          <button onClick={() => { updateProfile({ name }); toast.success('Saved') }} className="rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-glow">Save changes</button>
        </section>
        <section className="rounded-2xl border border-danger/30 bg-card/60 p-6 backdrop-blur">
          <h2 className="font-semibold text-danger">Danger zone</h2>
          <button onClick={() => { logout(); nav('/') }} className="mt-3 rounded-xl border border-danger/40 px-4 py-2 text-sm text-danger hover:bg-danger/10">Sign out</button>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
