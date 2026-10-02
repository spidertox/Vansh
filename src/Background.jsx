import { useEffect, useRef } from 'react'
const CH = 'アイウエオカキクケコサシスセソ<>/{}=+'
export default function Background() {
  const ref = useRef()
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    const rm = matchMedia('(prefers-reduced-motion: reduce)').matches
    const mob = innerWidth < 768
    let w, h, drops, parts, raf, last = 0
    const init = () => {
      w = c.width = innerWidth; h = c.height = innerHeight
      const gap = mob ? 70 : 42
      drops = Array.from({ length: Math.floor(w / gap) }, (_, i) => ({ x: i * gap + 10, y: Math.random() * h }))
      parts = Array.from({ length: mob ? 18 : 42 }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.4 + .4, vx: (Math.random() - .5) * .25, vy: -Math.random() * .3 - .05, a: Math.random() * .5 + .2 }))
    }
    const draw = (t) => {
      raf = requestAnimationFrame(draw)
      if (t - last < 40) return; last = t
      ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'; ctx.font = '14px "JetBrains Mono",monospace'
      ctx.fillStyle = 'rgba(0,255,156,.22)'
      drops.forEach(d => { ctx.fillText(CH[(Math.random() * CH.length) | 0], d.x, d.y); d.y += 16; if (d.y > h && Math.random() > .975) d.y = 0 })
      parts.forEach(p => {
        p.x += p.vx; p.y += p.vy; if (p.y < 0) p.y = h; if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.shadowBlur = 8; ctx.shadowColor = '#00ff9c'
        ctx.fillStyle = `rgba(0,255,156,${p.a})`; ctx.fill(); ctx.shadowBlur = 0
      })
    }
    init(); addEventListener('resize', init)
    if (rm) { ctx.fillStyle = 'rgba(0,255,156,.5)'; parts.forEach(p => ctx.fillRect(p.x, p.y, 1.5, 1.5)) } else raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', init) }
  }, [])
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050607]" aria-hidden>
      <div className="absolute inset-x-0 top-[38%] bottom-0 overflow-hidden"><div className="grid3d absolute -inset-x-1/2 top-0 h-[200%]" /></div>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 45% at 50% 22%,rgba(0,255,156,.09),transparent),radial-gradient(40% 30% at 85% 10%,rgba(34,211,238,.07),transparent),radial-gradient(40% 30% at 10% 90%,rgba(139,92,246,.07),transparent)' }} />
      <canvas ref={ref} className="absolute inset-0" />
      <div className="scanlines absolute inset-0" />
      <div className="absolute inset-0 opacity-[.05] mix-blend-screen" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='.9' numOctaves='2'/></filter><rect width='120' height='120' filter='url(%23n)'/></svg>\")" }} />
    </div>
  )
}
