import { Link } from 'react-router-dom'
import { SiteHeader, SiteFooter } from '../components/SiteHeader.jsx'
import { Target, Scissors, Timer, Brain, ArrowRight, Sparkles, Users, Trophy } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-6xl px-4 pt-16 pb-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted backdrop-blur">
            <Sparkles className="h-3 w-3 text-primary" /> Built for students drowning in lectures
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.05]">
            Clear your backlog. <span className="text-gradient-primary">Skip what doesn't matter.</span>
          </h1>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
            BacklogOS shows you 3 things a day, kills procrastination in 5 minutes, and tells you which lectures to skip — strategically, not lazily.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/login" className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 font-semibold text-white shadow-glow">
              Try the demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/features" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-6 py-3 font-semibold backdrop-blur hover:bg-card">See the 9 pillars</Link>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Target, h: 'Show less', p: 'Only 3 tasks today. Everything else hides until you\'re ready.' },
              { icon: Timer, h: 'Start faster', p: 'A 5-minute timer that breaks the freeze.' },
              { icon: Scissors, h: 'Skip smart', p: 'Skip Score across 8 criteria + a Skip Contract.' }
            ].map(c => (
              <div key={c.h} className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
                <c.icon className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-bold text-xl">{c.h}</h3>
                <p className="text-sm text-muted mt-2">{c.p}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">9 pillars. Zero bloat.</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-10">
            {[Target, Scissors, Timer, Brain, Users, Trophy, Sparkles, Target, Brain].map((Icon, i) => (
              <div key={i} className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur flex items-center gap-3">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{['Top 3','Skip Manager','Focus Timer','AI Breakdown','Buddies','Badges','Insights','Reset Review','Smart Backlog'][i]}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-4xl px-4 py-20 text-center">
          <div className="rounded-3xl border border-primary/30 bg-card/60 backdrop-blur p-12 shadow-glow">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to clear it?</h2>
            <p className="mt-3 text-muted">Sign in with the demo and see your Top 3 in 30 seconds.</p>
            <Link to="/login" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 font-semibold text-white shadow-glow">
              Open BacklogOS <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
