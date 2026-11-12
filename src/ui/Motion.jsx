import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInViewOnce } from '../lib/hooks.js'

export const EASE = [0.16, 1, 0.3, 1]

/**
 * Headline lines slide up from behind a mask — uncovered, not faded.
 *
 * The in-view trigger sits on the heading itself, not on each line: a line
 * parked below its overflow-hidden mask is fully clipped, so an observer on
 * the line would never see it and the heading would never appear.
 */
export function MaskLines({ lines, as = 'h2', className = '', delay = 0, amount = 0.4, lineClassName = '' }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.h2
  return (
    <Tag className={className} initial={reduce ? false : 'hidden'} whileInView="show" viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span className={`block ${lineClassName}`}
            variants={{ hidden: { y: '105%' }, show: { y: '0%', transition: { duration: 1, ease: EASE } } }}>
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export function Reveal({ children, className = '', delay = 0, y = 18, amount = 0.3, as = 'div' }) {
  const reduce = useReducedMotion()
  const C = motion[as] ?? motion.div
  return (
    <C className={className} initial={reduce ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }} transition={{ duration: 0.8, delay, ease: EASE }}>
      {children}
    </C>
  )
}

/** A hairline that draws across from the left. */
export function Rule({ className = '', delay = 0, dark = false }) {
  const reduce = useReducedMotion()
  return (
    <motion.div aria-hidden="true" className={`h-px w-full origin-left ${dark ? 'bg-ink/20' : 'bg-g-700'} ${className}`}
      initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.2, delay, ease: EASE }} />
  )
}

/** Mono section index, e.g. "03 / EDUCATION"; the number counts up as it enters. */
export function IndexLabel({ index, label, dark = false, className = '' }) {
  const [ref, seen] = useInViewOnce(0.8)
  const reduce = useReducedMotion()
  const target = parseInt(index, 10)
  const [n, setN] = useState(reduce ? target : 0)
  useEffect(() => {
    if (!seen || reduce) return
    let i = 0
    const t = setInterval(() => { i += 1; setN(i); if (i >= target) clearInterval(t) }, 45)
    return () => clearInterval(t)
  }, [seen, reduce, target])
  return (
    <p ref={ref} className={`meta flex items-center gap-3 ${dark ? 'text-ink/60' : 'text-g-400'} ${className}`}>
      <span className={`tabular ${dark ? 'text-ink' : 'text-paper'}`}>{String(n).padStart(2, '0')}</span>
      <span aria-hidden="true">/</span>
      <span>{label}</span>
    </p>
  )
}

/** Integer count-up, used on the large year numerals. */
export function CountUp({ to, from, className = '' }) {
  const [ref, seen] = useInViewOnce(0.6)
  const reduce = useReducedMotion()
  const start = from ?? to - 12
  const [v, setV] = useState(reduce ? to : start)
  useEffect(() => {
    if (!seen || reduce) return
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / 900)
      setV(Math.round(start + (to - start) * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, reduce, to, start])
  return <span ref={ref} className={`tabular ${className}`}>{v}</span>
}
