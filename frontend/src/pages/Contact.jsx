import { useState } from 'react'
import toast from 'react-hot-toast'
import { SiteHeader, SiteFooter } from '../components/SiteHeader.jsx'
export default function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-xl px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight">Say hi</h1>
        <p className="text-muted mt-2">We answer within 48 hours.</p>
        <form onSubmit={e => { e.preventDefault(); setSent(true); toast.success('Message received') }} className="mt-8 space-y-4">
          <input required placeholder="Your name" className="w-full rounded-lg border border-border bg-card/60 px-4 py-2.5 text-sm outline-none focus:border-primary" />
          <input required type="email" placeholder="Email" className="w-full rounded-lg border border-border bg-card/60 px-4 py-2.5 text-sm outline-none focus:border-primary" />
          <textarea required placeholder="What's on your mind?" rows={5} className="w-full rounded-lg border border-border bg-card/60 px-4 py-2.5 text-sm outline-none focus:border-primary" />
          <button disabled={sent} className="w-full rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-white shadow-glow disabled:opacity-60">{sent ? 'Sent ✓' : 'Send message'}</button>
        </form>
      </main>
      <SiteFooter />
    </div>
  )
}
