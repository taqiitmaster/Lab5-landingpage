import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { PERSON, ROLES } from '../lib/site.js'
import { PORTRAIT } from '../lib/assets.js'
import { scrollToId } from '../lib/hooks.js'
import { EASE } from '../ui/Motion.jsx'

/** Types each role out, holds, deletes it, moves on. */
function RoleTyper() {
  const reduce = useReducedMotion()
  const [text, setText] = useState('')
  useEffect(() => {
    if (reduce) return
    let i = 0
    let n = 0
    let dir = 1
    let t
    const step = () => {
      const word = ROLES[i].toUpperCase()
      n += dir
      setText(word.slice(0, n))
      let wait = dir > 0 ? 55 : 28
      if (dir > 0 && n === word.length) { dir = -1; wait = 1700 }
      else if (dir < 0 && n === 0) { dir = 1; i = (i + 1) % ROLES.length; wait = 350 }
      t = setTimeout(step, wait)
    }
    t = setTimeout(step, 1300)
    return () => clearTimeout(t)
  }, [reduce])

  if (reduce) return <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-paper">{ROLES.join(' · ')}</p>
  return (
    <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-paper sm:text-[15px]" aria-label={ROLES.join(', ')}>
      <span aria-hidden="true" className="text-g-500">&gt; </span>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true" className="ml-0.5 inline-block h-[1.05em] w-[0.6em] translate-y-[0.18em] animate-blink bg-paper" />
    </p>
  )
}

/**
 * Portrait: shown first as a 1-bit black-and-white dither, then the full-colour
 * photograph wipes up over it, so the image "resolves" from print into life as
 * the page loads. It is the one piece of colour on an otherwise monochrome page.
 */
function Portrait() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '10%'])
  return (
    <div ref={ref} className="relative aspect-[4/5] w-full overflow-hidden bg-g-900">
      <motion.div style={{ y }} className="absolute inset-[-6%_0]">
        <img src={PORTRAIT.dither} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover [image-rendering:pixelated]" />
        <motion.img src={PORTRAIT.src} srcSet={PORTRAIT.srcSet} sizes="(min-width: 1024px) 34vw, 90vw" width={PORTRAIT.width} height={PORTRAIT.height}
          alt="Muhammad Taqi Nayyer in a navy double-breasted suit, photographed at night in Lahore" fetchpriority="high"
          className="absolute inset-0 h-full w-full object-cover"
          initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 1.5, delay: 0.7, ease: [0.65, 0, 0.35, 1] }} />
      </motion.div>
      {/* Registration marks on the frame, like a print proof. */}
      {['left-2 top-2', 'right-2 top-2', 'left-2 bottom-2', 'right-2 bottom-2'].map((p) => (
        <span key={p} aria-hidden="true" className={`absolute ${p} h-3 w-3`}>
          <span className="absolute left-1/2 top-0 h-full w-px bg-paper/70" /><span className="absolute left-0 top-1/2 h-px w-full bg-paper/70" />
        </span>
      ))}
      <p className="meta absolute bottom-3 left-8 hidden text-paper/80 lg:block">Fig. 01 — Lahore</p>
    </div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const fade = (delay) => ({ initial: reduce ? false : { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: EASE } })
  const nameLines = ['Muhammad', 'Taqi', 'Nayyer']

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden pb-16 pt-24 lg:pb-20 lg:pt-28">
      {/* Where The Line's heartbeat sits. */}
      <span data-line="pulse" aria-hidden="true" className="pointer-events-none absolute left-0 top-[170px] h-[110px] w-px lg:top-[230px]" />

      <div className="frame relative">
        {/* Technical readout */}
        <motion.dl {...fade(0.2)} className="meta mb-8 grid grid-cols-2 gap-x-6 gap-y-1.5 text-g-400 sm:flex sm:flex-wrap sm:justify-end sm:gap-x-8 lg:mb-0 lg:absolute lg:right-[72px] lg:top-0 lg:z-10">
          <div className="flex gap-2"><dt className="sr-only">Location</dt><dd className="text-paper">Lahore, PK</dd></div>
          <div className="flex gap-2"><dt>Est.</dt><dd className="tabular text-paper">{PERSON.born}</dd></div>
          <div className="flex gap-2"><dt className="sr-only">Coordinates</dt><dd className="tabular">31.52° N 74.36° E</dd></div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 animate-blink bg-paper" aria-hidden="true" /><dd className="text-paper">Available for work</dd></div>
        </motion.dl>

        <div className="relative lg:grid lg:grid-cols-12 lg:gap-6">
          {/* Portrait sits right; the name runs across and over it. */}
          <div className="relative mb-[-11vw] w-[78%] max-w-[420px] sm:mb-[-12vw] lg:col-span-4 lg:col-start-9 lg:mb-0 lg:mt-16 lg:w-full lg:max-w-none">
            <Portrait />
          </div>

          {/* Plain white (no blend): a difference blend over the colour photo would tint the letters. The night photo is dark enough to carry white type. */}
          <h1 className="display-hero relative z-10 text-paper lg:absolute lg:left-0 lg:top-14 lg:w-full">
            <span className="sr-only">{PERSON.name}</span>
            {nameLines.map((l, i) => (
              <span key={l} aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
                <motion.span className="block" initial={reduce ? false : { y: '102%' }} animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.15 + i * 0.1, ease: EASE }}>
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-6">
          <motion.div {...fade(0.9)} className="lg:col-span-5">
            <RoleTyper />
          </motion.div>
          <motion.p {...fade(1)} className="max-w-md text-[17px] leading-[1.6] text-g-300 lg:col-span-4 lg:text-[18px]">
            22, based in Lahore. Building fast, modern web products — and running a studio that ships them.
          </motion.p>
        </div>

        <motion.button {...fade(1.2)} onClick={() => scrollToId('about')} className="meta mt-14 flex items-center gap-3 text-g-400 transition-colors hover:text-paper">
          <span className="relative block h-8 w-px overflow-hidden bg-g-700">
            <motion.span className="absolute left-0 top-0 block h-3 w-px bg-paper" animate={reduce ? {} : { y: [-12, 34] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
          </span>
          Scroll
        </motion.button>
      </div>
    </section>
  )
}
