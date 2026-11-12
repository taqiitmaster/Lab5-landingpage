import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { NAV, PERSON, SECTIONS } from '../lib/site.js'
import { scrollToId, useFinePointer, useScrollLock } from '../lib/hooks.js'
import { EASE } from '../ui/Motion.jsx'

/* ---------- brand marks for the two links that matter most ---------- */
export function GitHubMark({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}
export function LinkedInMark({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

/** External links always open safely: no window.opener, no referrer. */
export const ext = { target: '_blank', rel: 'noopener noreferrer' }

/* ---------- navbar ---------- */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(SECTIONS[0])
  const [open, setOpen] = useState(false)
  useScrollLock(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    // Live section label: whichever section crosses the middle of the screen.
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(SECTIONS.find((s) => s.id === e.target.id) ?? SECTIONS[0]) })
    }, { rootMargin: '-45% 0px -54% 0px' })
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  const go = (id) => { setOpen(false); setTimeout(() => scrollToId(id), open ? 350 : 0) }

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ${scrolled || open ? 'border-g-700 bg-ink' : 'border-transparent bg-transparent'}`}>
        <nav className={`frame flex items-center justify-between gap-6 transition-[height] duration-500 ${scrolled ? 'h-14' : 'h-[72px]'}`}>
          <div className="flex min-w-0 items-center gap-5">
            <a href="#home" onClick={(e) => { e.preventDefault(); go('home') }} className="meta whitespace-nowrap text-paper">M. Taqi Nayyer</a>
            {/* Live chapter label — updates as you pass each section. */}
            <span className="meta hidden items-center gap-2 text-g-400 sm:flex" aria-live="polite">
              <span className="h-px w-6 bg-g-600" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={active.id} className="whitespace-nowrap" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.25 }}>
                  {active.index} / {active.label}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id) }}
                  className={`meta group relative py-2 transition-colors ${active.id === l.id || (l.id === 'home' && active.id === 'about') ? 'text-paper' : 'text-g-400 hover:text-paper'}`}>
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-paper transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href={PERSON.github} {...ext} aria-label="GitHub profile" className="flex h-10 items-center gap-2 border border-g-600 px-3 text-paper transition-colors hover:bg-paper hover:text-ink">
              <GitHubMark size={17} /><span className="meta hidden lg:inline">GitHub</span>
            </a>
            <a href={PERSON.linkedin} {...ext} aria-label="LinkedIn profile" className="flex h-10 items-center gap-2 border border-g-600 px-3 text-paper transition-colors hover:bg-paper hover:text-ink">
              <LinkedInMark size={16} /><span className="meta hidden lg:inline">LinkedIn</span>
            </a>
            <button onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="menu" className="meta ml-1 h-10 border border-g-600 px-3 text-paper md:hidden">
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div id="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink pt-24 md:hidden">
            <ul className="frame">
              {NAV.map((l, i) => (
                <li key={l.id} className="overflow-hidden border-b border-g-700">
                  <motion.a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id) }}
                    initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.06 + i * 0.07, duration: 0.6, ease: EASE }}
                    className="flex items-baseline justify-between py-5">
                    <span className="font-display text-[2.6rem] font-semibold leading-none tracking-[-0.04em] text-paper">{l.label}</span>
                    <span className="meta text-g-500">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="frame mt-10 grid grid-cols-2 gap-3">
              <a href={PERSON.github} {...ext} className="meta flex h-12 items-center justify-center gap-2 border border-g-600 text-paper"><GitHubMark size={16} /> GitHub</a>
              <a href={PERSON.linkedin} {...ext} className="meta flex h-12 items-center justify-center gap-2 border border-g-600 text-paper"><LinkedInMark size={15} /> LinkedIn</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ---------- scroll progress as a measurement scale ---------- */
export function ScaleProgress() {
  const { scrollYProgress } = useScroll()
  const p = useSpring(scrollYProgress, { stiffness: 200, damping: 36, restDelta: 0.0005 })
  const top = useTransform(p, (v) => `${v * 100}%`)
  const [pct, setPct] = useState(0)
  useEffect(() => scrollYProgress.on('change', (v) => setPct(Math.round(v * 100))), [scrollYProgress])
  const ticks = Array.from({ length: 51 }, (_, i) => i)
  return (
    <>
      {/* Desktop: a vertical ruler on the right edge, with a reading. */}
      <div aria-hidden="true" className="pointer-events-none fixed bottom-8 right-5 top-24 z-40 hidden w-6 lg:block" style={{ mixBlendMode: 'difference' }}>
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 24 1000">
          {ticks.map((i) => <line key={i} x1={i % 5 === 0 ? 10 : 16} x2="24" y1={i * 20} y2={i * 20} stroke="#8a8a8a" strokeWidth={i % 5 === 0 ? 1.4 : 0.8} vectorEffect="non-scaling-stroke" />)}
        </svg>
        <motion.div className="absolute right-0 flex -translate-y-1/2 items-center gap-1.5" style={{ top }}>
          <span className="meta tabular text-[10px] text-paper">{String(pct).padStart(3, '0')}</span>
          <span className="block h-px w-6 bg-paper" />
        </motion.div>
      </div>
      {/* Phones and tablets: a tick scale along the top edge, filled as you go. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[5px] lg:hidden" style={{ mixBlendMode: 'difference' }}>
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1000 5">
          {ticks.map((i) => <line key={i} y1="0" y2={i % 5 === 0 ? 5 : 2.5} x1={i * 20} x2={i * 20} stroke="#8a8a8a" strokeWidth="1" vectorEffect="non-scaling-stroke" />)}
        </svg>
        <motion.div className="absolute left-0 top-0 h-[2px] w-full origin-left bg-paper" style={{ scaleX: p }} />
      </div>
    </>
  )
}

/* ---------- crosshair cursor (fine pointers only) ---------- */
export function Crosshair() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const [hot, setHot] = useState(false)
  const [shown, setShown] = useState(false)
  const x = useMotionValue(-50)
  const y = useMotionValue(-50)
  const sx = useSpring(x, { stiffness: 900, damping: 50, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 900, damping: 50, mass: 0.3 })
  const shownRef = useRef(false)

  useEffect(() => {
    if (!fine || reduce) return
    document.documentElement.classList.add('has-crosshair')
    const move = (e) => {
      x.set(e.clientX); y.set(e.clientY)
      if (!shownRef.current) { shownRef.current = true; setShown(true) }
      setHot(!!(e.target instanceof Element && e.target.closest('a,button,[data-hot]')))
    }
    const leave = () => { shownRef.current = false; setShown(false) }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-crosshair')
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [fine, reduce, x, y])

  // Reduced motion keeps the normal system cursor.
  if (!fine || reduce) return null
  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100]" style={{ x: sx, y: sy, opacity: shown ? 1 : 0, mixBlendMode: 'difference' }}>
      <motion.div animate={{ scale: hot ? 1 : 0.35, opacity: hot ? 1 : 0 }} transition={{ duration: 0.2 }}
        className="absolute -left-5 -top-5 h-10 w-10 rounded-full border border-paper" />
      <motion.div animate={{ rotate: hot ? 45 : 0, scale: hot ? 0.7 : 1 }} transition={{ duration: 0.2 }} className="absolute -left-[9px] -top-[9px] h-[18px] w-[18px]">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-paper" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-paper" />
      </motion.div>
    </motion.div>
  )
}
