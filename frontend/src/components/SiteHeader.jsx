import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Sparkles, LogOut, User as UserIcon, ShieldCheck } from 'lucide-react'

export function SiteHeader() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          Backlog<span className="text-gradient-primary">OS</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          <NavLink to="/features" className={({isActive}) => isActive ? 'text-fg' : 'hover:text-fg'}>Features</NavLink>
          <NavLink to="/pricing" className={({isActive}) => isActive ? 'text-fg' : 'hover:text-fg'}>Pricing</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? 'text-fg' : 'hover:text-fg'}>About</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? 'text-fg' : 'hover:text-fg'}>Contact</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/app" className="hidden sm:inline-flex rounded-lg bg-gradient-primary px-3 py-1.5 text-xs font-semibold text-white shadow-glow">Open app</Link>
              {user.role === 'admin' && <Link to="/admin" className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs hover:bg-card"><ShieldCheck className="h-3 w-3" /> Admin</Link>}
              <Link to="/profile" className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs hover:bg-card"><UserIcon className="h-3 w-3" /> {user.name.split(' ')[0]}</Link>
              <button onClick={() => { logout(); nav('/') }} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-muted hover:text-fg"><LogOut className="h-3 w-3" /></button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-lg px-3 py-1.5 text-xs text-muted hover:text-fg">Sign in</Link>
              <Link to="/login" className="rounded-lg bg-gradient-primary px-3 py-1.5 text-xs font-semibold text-white shadow-glow">Get started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-20">
      <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-bold text-base">Backlog<span className="text-gradient-primary">OS</span></div>
          <p className="text-muted mt-2 text-xs">Show less. Start faster. Skip strategically.</p>
        </div>
        <div>
          <div className="font-semibold mb-2 text-xs uppercase tracking-wider text-muted">Product</div>
          <ul className="space-y-1.5 text-muted">
            <li><Link to="/features" className="hover:text-fg">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-fg">Pricing</Link></li>
            <li><Link to="/app" className="hover:text-fg">Open app</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2 text-xs uppercase tracking-wider text-muted">Company</div>
          <ul className="space-y-1.5 text-muted">
            <li><Link to="/about" className="hover:text-fg">About</Link></li>
            <li><Link to="/contact" className="hover:text-fg">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2 text-xs uppercase tracking-wider text-muted">Demo login</div>
          <p className="text-muted text-xs">demo@backlogos.app / demo<br/>admin@backlogos.app / admin</p>
        </div>
      </div>
      <div className="text-center text-xs text-muted pb-6">© {new Date().getFullYear()} BacklogOS</div>
    </footer>
  )
}
