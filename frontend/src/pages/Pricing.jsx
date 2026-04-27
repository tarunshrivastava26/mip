import { Link } from 'react-router-dom'
import { SiteHeader, SiteFooter } from '../components/SiteHeader.jsx'
import { Check } from 'lucide-react'

const TIERS = [
  { name: 'Free', price: '$0', desc: 'For solo students.', features: ['Top 3 daily focus','Skip Manager + Contracts','5-min Focus Timer','Local-only data'], cta: 'Start free' },
  { name: 'Pro', price: '$6', desc: 'For serious operators.', features: ['Everything in Free','Gemini AI breakdown','Cloud sync','Weekly insights email','5 buddies'], cta: 'Start trial', featured: true },
  { name: 'Team', price: '$18', desc: 'For study groups.', features: ['Everything in Pro','Unlimited buddies','Shared boards','Admin dashboard','Priority support'], cta: 'Contact sales' }
]

export default function Pricing() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">Simple pricing</h1>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {TIERS.map(t => (
            <div key={t.name} className={`rounded-2xl border p-6 backdrop-blur ${t.featured ? 'border-primary/60 bg-card shadow-glow' : 'border-border bg-card/60'}`}>
              <div className="flex items-baseline justify-between">
                <h3 className="font-bold text-xl">{t.name}</h3>
                {t.featured && <span className="text-[10px] uppercase rounded-full bg-primary/20 px-2 py-0.5 text-primary">Popular</span>}
              </div>
              <div className="mt-2 flex items-baseline gap-1"><span className="text-4xl font-bold">{t.price}</span><span className="text-muted text-sm">/mo</span></div>
              <p className="text-sm text-muted mt-1">{t.desc}</p>
              <ul className="mt-6 space-y-2 text-sm">{t.features.map(f => <li key={f} className="flex items-start gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />{f}</li>)}</ul>
              <Link to="/login" className={`mt-6 block text-center rounded-xl px-4 py-2.5 text-sm font-semibold ${t.featured ? 'bg-gradient-primary text-white shadow-glow' : 'border border-border hover:bg-card'}`}>{t.cta}</Link>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
