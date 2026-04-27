import { SiteHeader, SiteFooter } from '../components/SiteHeader.jsx'
export default function About() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight">We built BacklogOS because to-do apps were making us worse.</h1>
        <p className="text-muted mt-6">Most productivity tools show you everything. You feel paralyzed and close the app. The backlog wins.</p>
        <p className="text-muted mt-4">BacklogOS does the opposite. It hides 95% of your list and shows you three things. It tells you which lectures to skip — strategically, with a Skip Score and a Contract.</p>
        <p className="text-muted mt-4">Built by students, for students. Open backend. Local-first.</p>
      </main>
      <SiteFooter />
    </div>
  )
}
