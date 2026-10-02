import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { Instagram, Github } from 'lucide-react'
import { profile as p } from './config/profile'
import Background from './Background'
import { Logo } from './icons'

const Caret = () => <span className="inline-block w-[0.55em] h-[1.05em] -mb-[0.15em] bg-neon animate-blink align-baseline ml-0.5" />

function useTyped(text, speed = 40, delay = 0) {
  const rm = useReducedMotion(); const [n, setN] = useState(rm ? text.length : 0)
  useEffect(() => {
    if (rm) return; let i = 0, iv
    const t = setTimeout(() => { iv = setInterval(() => { setN(++i); if (i >= text.length) clearInterval(iv) }, speed) }, delay)
    return () => { clearTimeout(t); clearInterval(iv) }
  }, [text, speed, delay, rm])
  return text.slice(0, n)
}

function Glitch({ children }) {
  const rm = useReducedMotion(); const [g, setG] = useState(false)
  useEffect(() => {
    if (rm) return; let t, t2
    const loop = () => { t = setTimeout(() => { setG(true); t2 = setTimeout(() => setG(false), 200); loop() }, 3500 + Math.random() * 4500) }
    loop(); return () => { clearTimeout(t); clearTimeout(t2) }
  }, [rm])
  return (
    <span className="relative inline-block">{children}
      {g && <>
        <span aria-hidden className="absolute inset-0 text-red-500/80 translate-x-[3px] mix-blend-screen" style={{ clipPath: 'inset(10% 0 55% 0)' }}>{children}</span>
        <span aria-hidden className="absolute inset-0 text-cyan-400/80 -translate-x-[3px] mix-blend-screen" style={{ clipPath: 'inset(55% 0 8% 0)' }}>{children}</span>
      </>}
    </span>
  )
}

function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 600, damping: 45 }), sy = useSpring(y, { stiffness: 600, damping: 45 })
  const [big, setBig] = useState(false), [on, setOn] = useState(false)
  useEffect(() => {
    if (!matchMedia('(pointer:fine)').matches) return; setOn(true)
    const m = e => { x.set(e.clientX); y.set(e.clientY); setBig(!!e.target.closest?.('a,button,[data-hover]')) }
    addEventListener('mousemove', m); return () => removeEventListener('mousemove', m)
  }, [])
  if (!on) return null
  const s = big ? 44 : 10
  return <motion.div aria-hidden style={{ x: sx, y: sy }} animate={{ width: s, height: s, marginLeft: -s / 2, marginTop: -s / 2 }}
    className="fixed top-0 left-0 z-50 pointer-events-none rounded-full bg-neon/70 mix-blend-screen"
    transition={{ duration: .15 }}><div className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 ${big ? 30 : 12}px #00ff9c` }} /></motion.div>
}

function Avatar() {
  const [err, setErr] = useState(!p.profileImage)
  const ticks = Array.from({ length: 60 }, (_, i) => i)
  return (
    <motion.div initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .5 }}
      className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto">
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-spin2" style={{ animationDuration: '30s' }}>
        <circle cx="100" cy="100" r="97" fill="none" stroke="#22d3ee" strokeOpacity=".5" strokeWidth=".8" strokeDasharray="2 6" />
        {ticks.map(i => <line key={i} x1="100" y1="1" x2="100" y2={i % 5 ? 4 : 8} stroke="#00ff9c" strokeOpacity={i % 5 ? .35 : .8} transform={`rotate(${i * 6} 100 100)`} />)}
      </svg>
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '14s' }}>
        <circle cx="100" cy="100" r="88" fill="none" stroke="#00ff9c" strokeWidth="1.5" strokeDasharray="90 40 20 40" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 4px #00ff9c)' }} />
      </svg>
      <div className="absolute inset-[16px] rounded-full overflow-hidden border-2 border-neon/80 bg-black" style={{ boxShadow: '0 0 28px rgba(0,255,156,.4), inset 0 0 24px rgba(0,255,156,.25)' }}>
        {err ? <div className="w-full h-full grid place-items-center font-orb font-extrabold text-6xl text-neon glow">K</div>
          : <img src={p.profileImage} alt={`${p.name} profile`} onError={() => setErr(true)} className="w-full h-full object-cover grayscale-[.35] contrast-110" />}
        <div className="absolute inset-0 bg-neon/10 mix-blend-color" />
        <div className="scanlines absolute inset-0" />
        <div className="absolute inset-x-0 h-1/4 bg-gradient-to-b from-transparent via-neon/25 to-transparent animate-scan" />
      </div>
      <span className="absolute -left-1 top-1/2 font-mono text-[9px] text-cy/80">ID</span>
      <span className="absolute -right-1 top-1/2 font-mono text-[9px] text-cy/80">01</span>
    </motion.div>
  )
}

function Card({ title, children, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay }} whileHover={{ y: -3 }} data-hover
      className="relative w-full overflow-hidden rounded-xl p-px">
      <div className="absolute left-1/2 top-1/2 w-[200%] aspect-square -translate-x-1/2 -translate-y-1/2 animate-spin" style={{ animationDuration: '9s', background: 'conic-gradient(from 0deg,transparent 0 70%,#00ff9c 85%,#22d3ee 92%,transparent)' }} />
      <div className="relative glass rounded-[11px] bg-black/80">
        <div className="px-4 py-2 border-b border-neon/15 font-mono text-xs text-neon/90 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" /> {`┌─ ${title} ─`}
        </div>
        <div className="p-4 sm:p-5 font-mono text-sm leading-relaxed">{children}</div>
      </div>
    </motion.div>
  )
}

const LINES = ['$ whoami', `${p.name} / ${p.nickname}`, '', '$ status', 'ONLINE ██████████ 100%', '', '$ mission', 'BUILD • CREATE • EXPLORE']
function Stack() {
  return <div className="text-left space-y-4">{p.stack.map(g => (
    <div key={g.title}>
      <div className="text-xs text-cy mb-2">&gt; {g.title}</div>
      <div className="flex flex-wrap gap-2">{g.items.map(t => (
        <motion.span key={t} whileHover={{ y: -2 }} data-hover className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md border border-neon/20 bg-neon/5 text-slate-200 transition hover:border-neon hover:text-neon hover:shadow-[0_0_14px_rgba(0,255,156,.3)]"><Logo name={t} />{t}</motion.span>))}
      </div>
    </div>))}</div>
}

function Terminal() {
  const rm = useReducedMotion(); const [s, setS] = useState(rm ? { i: LINES.length, c: 0 } : { i: 0, c: 0 })
  useEffect(() => {
    if (rm || s.i >= LINES.length) return
    const L = LINES[s.i]
    const t = setTimeout(() => setS(s.c >= L.length ? { i: s.i + 1, c: 0 } : { i: s.i, c: s.c + 1 }), s.c >= L.length ? 180 : s.i === 0 && s.c === 0 ? 1600 : 18)
    return () => clearTimeout(t)
  }, [s, rm])
  return <div className="min-h-[9.5rem]">{LINES.map((l, i) => i > s.i ? null :
    <div key={i} className={`h-5 whitespace-pre ${l.startsWith('$') ? 'text-neon' : 'text-slate-300'}`}>
      {i < s.i ? l : l.slice(0, s.c)}{i === s.i && <Caret />}</div>)}</div>
}

export default function App() {
  const title = useTyped('> INITIALIZING_IDENTITY...', 35, 100)
  return (
    <div className="relative min-h-screen">
      <Background /><Cursor />
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between px-4 sm:px-6 py-3 font-mono text-[11px] text-neon/80">
        <span>KRISHNA://PROFILE</span>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse shadow-[0_0_8px_#00ff9c]" />SYSTEM ONLINE</span>
      </header>

      <main className="mx-auto max-w-xl px-4 pt-20 pb-10 flex flex-col items-center gap-7 text-center">
        <div className="font-mono text-xs text-cy/80 h-4">{title}</div>
        <motion.div initial={{ opacity: 0, letterSpacing: '0.6em' }} animate={{ opacity: 1, letterSpacing: '0.18em' }} transition={{ duration: 1.2, delay: 1 }}>
          <h1 className="font-orb font-extrabold text-6xl sm:text-7xl text-neon glow"><Glitch>{p.name}</Glitch></h1>
          <div className="font-mono mt-2 text-slate-300 text-sm">aka <span className="text-cy">{p.nickname}</span></div>
        </motion.div>

        <Avatar />

        <div className="font-mono text-xs text-neon">[ SYSTEM ONLINE ]<Caret /></div>
        <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="font-mono text-xs sm:text-sm text-slate-300 space-y-1">
          {['DIGITAL CREATOR', 'DEVELOPER', 'TECHNOLOGY EXPLORER'].map(t => <li key={t}><span className="text-neon">&gt;</span> {t}</li>)}
        </motion.ul>
        {p.bio && <p className="text-sm text-slate-400 max-w-sm">{p.bio}</p>}

        <Card title="VANSH_PROFILE.exe" delay={1.2}>
          <div className="text-left space-y-1.5">
            <div className="font-orb text-lg text-neon">{p.name}</div>
            <div className="text-cy">{p.nickname}</div>
            {[['STATUS', 'ONLINE', 'bg-neon'], ['MODE', 'CREATIVE', 'bg-cy'], ['ACCESS', 'PUBLIC', 'bg-vio']].map(([k, v, c]) =>
              <div key={k} className="flex items-center gap-2 text-slate-300"><span className={`w-1.5 h-1.5 rounded-full ${c} animate-pulse`} />{k}: <span className="text-white">{v}</span></div>)}
          </div>
        </Card>

        <Card title="TERMINAL" delay={1.4}><div className="text-left"><Terminal /></div></Card>

        {p.stack?.length > 0 && <Card title="TECH_STACK" delay={1.5}><Stack /></Card>}

        <motion.a href={p.instagramUrl} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}
          className="group relative w-full overflow-hidden rounded-xl border border-neon/30 glass px-6 py-5 sm:py-6 flex items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-neon hover:shadow-[0_0_34px_rgba(0,255,156,.35),0_0_60px_rgba(34,211,238,.18)]">
          <span className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-transparent via-neon/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan" />
          <Instagram className="w-8 h-8 text-neon transition-transform duration-300 group-hover:rotate-12 group-hover:text-cy" />
          <span className="text-left font-mono">
            <span className="block text-sm sm:text-base font-bold text-white tracking-wider">&gt; CONNECT_ON_INSTAGRAM</span>
            <span className="block text-xs text-neon/80 mt-0.5">@{p.instagramUsername}</span>
          </span>
        </motion.a>

        {p.githubUrl && <motion.a href={p.githubUrl} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="font-mono text-xs px-4 py-2 rounded-md border border-neon/25 text-slate-300 flex items-center gap-2 transition hover:border-cy hover:text-cy hover:shadow-[0_0_18px_rgba(34,211,238,.3)]">
          <Github className="w-4 h-4" />[ GITHUB ]</motion.a>}
      </main>

      <footer className="pb-6 text-center font-mono text-[10px] text-slate-500">
        {p.name} // {p.nickname} <br />© 2026 <span className="text-neon animate-blink">_</span>
      </footer>
    </div>
  )
}
