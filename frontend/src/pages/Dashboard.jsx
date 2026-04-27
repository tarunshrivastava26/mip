import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Plus, Star, X, Clock, Scissors, Timer, Brain, Sparkles, Trophy, Inbox, Flame } from 'lucide-react'
import { SiteHeader } from '../components/SiteHeader.jsx'
import { useTasks } from '../context/TaskContext.jsx'

export default function Dashboard() {
  const { tasks, pending, top3, points, streak, badges, addTask, deleteTask, toggleComplete, toggleTopPick, postpone } = useTasks()
  const [title, setTitle] = useState('')
  const [type, setType] = useState('task')
  const [focusOn, setFocusOn] = useState(null)
  const [chat, setChat] = useState('')
  const [aiReply, setAiReply] = useState('')

  const submitChat = async () => {
    if (!chat.trim()) return
    try {
      const res = await axios.post('/api/ai/chat', { message: chat })
      setAiReply(res.data.reply || 'AI offline.')
    } catch {
      setAiReply("AI unavailable. Backend not running on :5000? Try: cd backend && npm start")
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-6 md:py-10 space-y-6">
        {/* Stats */}
        <header className="rounded-2xl border border-border bg-card/60 backdrop-blur p-6 shadow-card">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Backlog<span className="text-gradient-primary">OS</span></h1>
              <p className="text-sm text-muted mt-1">Show less. Start faster. Skip strategically.</p>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {[{label:'Backlog',value:pending.length,icon:Inbox},{label:'Streak',value:`${streak}d`,icon:Flame},{label:'Points',value:points,icon:Sparkles},{label:'Badges',value:badges.length,icon:Trophy}].map(s => (
                <div key={s.label} className="rounded-xl bg-card/80 px-3 py-2 sm:px-4 sm:py-3 min-w-[72px] text-center">
                  <s.icon className="mx-auto h-4 w-4 text-primary mb-1" />
                  <div className="font-bold text-lg leading-none">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Top 3 */}
            <section className="rounded-2xl border border-primary/40 bg-card/60 p-6 backdrop-blur shadow-glow">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> Top 3 today</h2>
              <div className="space-y-2">
                {top3.length === 0 && <p className="text-sm text-muted">Add a task below to populate your Top 3.</p>}
                {top3.map(t => (
                  <div key={t.id} className="flex items-center gap-3 rounded-xl border border-border bg-bg/40 p-3">
                    <input type="checkbox" checked={t.completed} onChange={() => toggleComplete(t.id)} className="h-4 w-4 accent-primary" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{t.title}</div>
                      <div className="text-xs text-muted">{t.type === 'lecture' ? '🎓 Lecture' : '📝 Task'}{t.skipScore ? ` · Skip score ${t.skipScore}` : ''}</div>
                    </div>
                    <button onClick={() => setFocusOn(t)} title="5-min focus" className="rounded-lg border border-border px-2 py-1 text-xs hover:bg-card"><Timer className="h-3 w-3" /></button>
                    <button onClick={() => postpone(t.id)} title="Postpone" className="rounded-lg border border-border px-2 py-1 text-xs hover:bg-card"><Clock className="h-3 w-3" /></button>
                  </div>
                ))}
              </div>
            </section>

            {/* Backlog */}
            <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold">Backlog</h2>
              </div>
              <form onSubmit={e => { e.preventDefault(); if (title.trim()) { addTask({ title, type }); setTitle(''); toast.success('Added') } }} className="flex gap-2 mb-4">
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Add a task or lecture…" className="flex-1 rounded-lg border border-border bg-bg/40 px-3 py-2 text-sm outline-none focus:border-primary" />
                <select value={type} onChange={e => setType(e.target.value)} className="rounded-lg border border-border bg-bg/40 px-3 text-sm">
                  <option value="task">Task</option><option value="lecture">Lecture</option>
                </select>
                <button className="inline-flex items-center gap-1 rounded-lg bg-gradient-primary px-3 text-xs font-semibold text-white shadow-glow"><Plus className="h-3 w-3" />Add</button>
              </form>
              <ul className="space-y-1.5">
                {pending.filter(t => !t.topPick).map(t => (
                  <li key={t.id} className="group flex items-center gap-3 rounded-lg border border-border/40 bg-bg/30 p-2.5 hover:border-border">
                    <input type="checkbox" checked={t.completed} onChange={() => toggleComplete(t.id)} className="h-4 w-4 accent-primary" />
                    <span className="flex-1 text-sm">{t.title} {t.postponedCount > 5 && <span className="text-warning text-xs">(👻 ghost)</span>}</span>
                    <button onClick={() => toggleTopPick(t.id)} title="Pin to Top 3" className="opacity-0 group-hover:opacity-100 text-xs text-muted hover:text-primary"><Star className="h-3 w-3" /></button>
                    <button onClick={() => deleteTask(t.id)} className="opacity-0 group-hover:opacity-100 text-xs text-muted hover:text-danger"><X className="h-3 w-3" /></button>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-6">
            {/* AI */}
            <section className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
              <h3 className="font-semibold flex items-center gap-2 mb-3"><Brain className="h-4 w-4 text-primary" /> AI Assistant</h3>
              <textarea value={chat} onChange={e => setChat(e.target.value)} placeholder="Break down 'study for compilers exam'…" className="w-full rounded-lg border border-border bg-bg/40 p-2 text-sm outline-none focus:border-primary" rows={3} />
              <button onClick={submitChat} className="mt-2 w-full rounded-lg bg-gradient-primary px-3 py-1.5 text-xs font-semibold text-white shadow-glow">Ask Gemini</button>
              {aiReply && <div className="mt-3 text-xs text-muted whitespace-pre-wrap rounded-lg border border-border bg-bg/40 p-3">{aiReply}</div>}
            </section>

            {/* Buddies */}
            <section className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
              <h3 className="font-semibold mb-3">Buddies</h3>
              <div className="flex gap-2">
                {[{n:'Alex',e:'🧠'},{n:'Sam',e:'⚡'}].map(b => (
                  <div key={b.n} className="flex-1 rounded-lg border border-border bg-bg/40 p-3 text-center">
                    <div className="text-2xl">{b.e}</div>
                    <div className="text-xs mt-1">{b.n}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Badges */}
            <section className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
              <h3 className="font-semibold flex items-center gap-2 mb-3"><Trophy className="h-4 w-4 text-primary" /> Badges</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {['The Closer','Responsible Skipper','Backlog Zero','Morning Person','Debt Free'].map(b => (
                  <span key={b} className={`rounded-full px-2.5 py-1 ${badges.includes(b) ? 'bg-gradient-primary text-white' : 'border border-border text-muted'}`}>{b}</span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {focusOn && <FocusModal task={focusOn} onClose={() => setFocusOn(null)} />}
    </div>
  )
}

function FocusModal({ task, onClose }) {
  const [seconds, setSeconds] = useState(300)
  useState(() => { const id = setInterval(() => setSeconds(s => s > 0 ? s - 1 : 0), 1000); return () => clearInterval(id) })
  const m = Math.floor(seconds / 60), s = seconds % 60
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="rounded-2xl border border-primary/60 bg-card p-8 max-w-sm w-full text-center shadow-glow">
        <Timer className="h-8 w-8 text-primary mx-auto" />
        <h3 className="mt-4 font-bold text-lg">5-min Action Mode</h3>
        <p className="text-sm text-muted mt-1">{task.title}</p>
        <div className="mt-6 text-5xl font-bold tabular-nums">{m}:{s.toString().padStart(2,'0')}</div>
        <button onClick={onClose} className="mt-6 w-full rounded-xl border border-border px-4 py-2 text-sm hover:bg-bg/40">Close</button>
      </div>
    </div>
  )
}
