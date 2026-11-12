import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CERTIFICATES, INPHINT, SKILLS } from '../lib/site.js'
import { useScrollLock } from '../lib/hooks.js'
import { EASE, IndexLabel, MaskLines, Reveal, Rule } from '../ui/Motion.jsx'
import { ext } from './Chrome.jsx'

/* ---------- 06 / INPHINT — inverted: the one white section ---------- */
export function Inphint() {
  return (
    <section id="inphint" className="relative bg-paper py-28 text-ink lg:py-40">
      <div className="frame">
        <IndexLabel index="06" label="The company" dark />
        <div data-line="rocket" className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-8">
            <MaskLines as="h2" lines={['inphint']} className="font-display text-[clamp(4.5rem,17vw,16rem)] font-bold leading-[0.8] tracking-[-0.07em]" />
          </div>
          <Reveal delay={0.15} className="lg:col-span-4 lg:pb-4">
            <dl className="meta grid grid-cols-2 gap-4 text-ink/55">
              <div><dt>Founded</dt><dd className="tabular mt-1 text-ink">{INPHINT.founded}</dd></div>
              <div><dt>Role</dt><dd className="mt-1 text-ink">Founder</dd></div>
            </dl>
            <a href={INPHINT.url} {...ext} className="group mt-6 inline-flex items-center gap-3 border border-ink px-4 py-3 font-mono text-[13px] uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-paper">
              {INPHINT.host}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="statement mt-14 max-w-4xl">{INPHINT.line}</p>
        </Reveal>

        {/* Services as a numbered index. Hover: a rule draws across and the type gains weight. */}
        <ul className="mt-16 border-t border-ink/15 lg:mt-24">
          {INPHINT.services.map((s, i) => (
            <li key={s} className="group relative border-b border-ink/15">
              <span aria-hidden="true" className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <Reveal delay={i * 0.05} amount={0.6} className="flex items-baseline gap-6 py-6 lg:gap-12 lg:py-8">
                <span className="meta tabular w-8 shrink-0 text-ink/45">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-[clamp(1.7rem,4.4vw,4rem)] font-normal leading-none tracking-[-0.04em] transition-[font-weight,transform] duration-500 group-hover:translate-x-2 group-hover:font-bold">
                  {s}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------- 07 / SKILLS — a specification sheet, not skill bars ---------- */
export function Skills() {
  const reduce = useReducedMotion()
  const total = SKILLS.reduce((n, g) => n + g.items.length, 0)
  return (
    <section id="skills" className="relative py-28 lg:py-36">
      <div className="frame">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <IndexLabel index="07" label="Skills" />
            <MaskLines lines={['Specification.']} className="display-xl mt-8 text-paper" />
          </div>
          <p className="meta tabular text-g-400">{total} entries / {SKILLS.length} groups</p>
        </div>

        {/* 1px gaps over a grey ground draw the hairlines between cells at any column count. */}
        <div className="mt-16 grid gap-px border border-g-700 bg-g-700 md:grid-cols-2 xl:grid-cols-3">
          {SKILLS.map((g, gi) => (
            <div key={g.group} className="bg-ink p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="meta text-paper">{String(gi + 1).padStart(2, '0')} — {g.group}</h3>
                <span className="meta tabular text-g-500">{String(g.items.length).padStart(2, '0')}</span>
              </div>
              <motion.ul className="mt-6 space-y-2.5" initial={reduce ? false : 'hidden'} whileInView="show" viewport={{ once: true, amount: 0.2 }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}>
                {g.items.map((s) => (
                  <motion.li key={s} variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
                    className="flex gap-3 text-[16px] leading-snug text-g-200">
                    <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-g-600" />{s}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- 08 / CERTIFICATIONS ---------- */
function Lightbox({ index, onClose, onStep }) {
  const c = CERTIFICATES[index]
  useScrollLock(true)
  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') onStep(1); if (e.key === 'ArrowLeft') onStep(-1) }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose, onStep])
  const stop = (e) => e.stopPropagation()
  return (
    <motion.div role="dialog" aria-modal="true" aria-label={c.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose} className="fixed inset-0 z-[90] flex flex-col bg-ink p-4 sm:p-8">
      <div onClick={stop} className="flex items-center justify-between gap-4 border-b border-g-700 pb-4">
        <p className="meta tabular text-g-400">{String(index + 1).padStart(2, '0')} / {String(CERTIFICATES.length).padStart(2, '0')}</p>
        <button onClick={onClose} className="meta border border-g-600 px-3 py-2 text-paper hover:bg-paper hover:text-ink">Close</button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center py-6">
        <motion.img key={c.id} src={c.full} alt={`Certificate: ${c.title}, ${c.issuer}`} onClick={stop}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-h-full w-auto max-w-full object-contain" />
      </div>
      <div onClick={stop} className="flex flex-col gap-4 border-t border-g-700 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight text-paper">{c.title}</p>
          <p className="meta mt-1 text-g-400">{c.issuer} · Coursera · {c.date}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onStep(-1)} aria-label="Previous certificate" className="meta h-11 border border-g-600 px-4 text-paper hover:bg-paper hover:text-ink">←</button>
          <button onClick={() => onStep(1)} aria-label="Next certificate" className="meta h-11 border border-g-600 px-4 text-paper hover:bg-paper hover:text-ink">→</button>
          <a href={c.verify} {...ext} className="meta flex h-11 items-center border border-paper bg-paper px-4 text-ink hover:bg-transparent hover:text-paper">Verify ↗</a>
        </div>
      </div>
    </motion.div>
  )
}

export function Certifications() {
  const [open, setOpen] = useState(null)
  const step = useCallback((d) => setOpen((i) => (i + d + CERTIFICATES.length) % CERTIFICATES.length), [])
  return (
    <section id="certifications" className="relative py-28 lg:py-36">
      <div className="frame">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <IndexLabel index="08" label="Certifications" />
            <MaskLines lines={['Certified.']} className="display-xl mt-8 text-paper" />
          </div>
          <p className="meta tabular max-w-xs text-g-400">{CERTIFICATES.length} certificates · Google &amp; Coursera · each one verifiable</p>
        </div>

        <ul className="mt-16 grid grid-cols-1 border-l border-t border-g-700 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATES.map((c, i) => (
            <li key={c.id} className="border-b border-r border-g-700">
              <button onClick={() => setOpen(i)} className="group block w-full p-4 text-left sm:p-5" aria-label={`View certificate: ${c.title}`}>
                <div className="relative aspect-[792/612] overflow-hidden bg-g-900">
                  {/* Greyscale on the page; full colour on hover and in the lightbox. */}
                  <img src={c.thumb} alt="" loading="lazy" decoding="async" width="720" height="556"
                    className="h-full w-full object-cover grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.02] group-hover:grayscale-0" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <p className="text-[15px] leading-snug text-paper">{c.title}</p>
                  <p className="meta tabular shrink-0 text-g-500">{String(i + 1).padStart(2, '0')}</p>
                </div>
                <p className="meta mt-2 text-g-500">{c.issuer} · {c.date}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={() => setOpen(null)} onStep={step} />}</AnimatePresence>
    </section>
  )
}
