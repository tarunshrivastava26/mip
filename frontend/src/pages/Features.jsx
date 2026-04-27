import { Link } from 'react-router-dom'
import { SiteHeader, SiteFooter } from '../components/SiteHeader.jsx'
import { Target, Scissors, Timer, Sparkles, Users, Trophy, BarChart3, RefreshCw, Brain } from 'lucide-react'

const PILLARS = [
  { icon: Target, title: 'Top 3 Daily Focus', desc: 'Only the 3 things that actually matter today.' },
  { icon: Scissors, title: 'Lecture Skip Manager', desc: 'An 8-criteria Skip Score + Contract for self-study.' },
  { icon: Timer, title: '5-Minute Focus Mode', desc: 'Procrastination killer.' },
  { icon: Brain, title: 'AI Task Breakdown', desc: 'Gemini-powered atomic 15-min steps.' },
  { icon: Users, title: 'Buddy Accountability', desc: 'Tiny emoji nudges from friends.' },
  { icon: Trophy, title: 'Badges & Streaks', desc: 'The Closer, Responsible Skipper, Backlog Zero.' },
  { icon: BarChart3, title: 'Weekly Insights', desc: 'What you finished and skipped.' },
  { icon: RefreshCw, title: 'Reset Review', desc: 'Every Monday: do, delegate, delete.' },
  { icon: Sparkles, title: 'Smart Backlog', desc: 'Tasks lingering 21+ days become Ghosts.' }
]

export default function Features() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">The 9 pillars</h1>
          <p className="mt-4 text-muted">Not 50 features. Nine focused systems.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {PILLARS.map(p => (
            <div key={p.title} className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
              <p.icon className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-sm text-muted mt-2">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link to="/login" className="inline-flex rounded-xl bg-gradient-primary px-6 py-3 font-semibold text-white shadow-glow">Try the demo</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
