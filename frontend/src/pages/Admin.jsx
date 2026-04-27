import { SiteHeader, SiteFooter } from '../components/SiteHeader.jsx'
import { Users, ListChecks, Scissors, TrendingUp } from 'lucide-react'

const FAKE = [
  { name: 'Demo Student', email: 'demo@backlogos.app', tasks: 12, skips: 4, streak: 5 },
  { name: 'Priya R.', email: 'priya@uni.edu', tasks: 23, skips: 8, streak: 11 },
  { name: 'Marco V.', email: 'marco@uni.edu', tasks: 7, skips: 1, streak: 2 },
  { name: 'Ada L.', email: 'ada@uni.edu', tasks: 31, skips: 12, streak: 14 }
]

export default function Admin() {
  const totals = FAKE.reduce((a, u) => ({ tasks: a.tasks + u.tasks, skips: a.skips + u.skips }), { tasks: 0, skips: 0 })
  const stats = [
    { label: 'Users', value: FAKE.length, icon: Users },
    { label: 'Tasks', value: totals.tasks, icon: ListChecks },
    { label: 'Skips', value: totals.skips, icon: Scissors },
    { label: 'Avg streak', value: Math.round(FAKE.reduce((a, u) => a + u.streak, 0) / FAKE.length) + 'd', icon: TrendingUp }
  ]
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12 space-y-6">
        <h1 className="text-3xl font-bold">Admin dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map(s => (
            <div key={s.label} className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur">
              <s.icon className="h-4 w-4 text-primary mb-2" />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <section className="rounded-2xl border border-border bg-card/60 backdrop-blur overflow-hidden">
          <div className="px-6 py-4 border-b border-border font-semibold">Users</div>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted tracking-wider">
              <tr><th className="text-left px-6 py-3">Name</th><th className="text-left px-6 py-3">Email</th><th className="text-right px-6 py-3">Tasks</th><th className="text-right px-6 py-3">Skips</th><th className="text-right px-6 py-3">Streak</th></tr>
            </thead>
            <tbody>
              {FAKE.map(u => (
                <tr key={u.email} className="border-t border-border/60 hover:bg-card">
                  <td className="px-6 py-3 font-medium">{u.name}</td>
                  <td className="px-6 py-3 text-muted">{u.email}</td>
                  <td className="px-6 py-3 text-right">{u.tasks}</td>
                  <td className="px-6 py-3 text-right">{u.skips}</td>
                  <td className="px-6 py-3 text-right">{u.streak}d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
