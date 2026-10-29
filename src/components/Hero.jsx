import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Download } from "lucide-react"
import { hero, profile, socials } from "../data/portfolioData"
import { Icon, GithubIcon } from "./icons.jsx"
import photo from "../assets/profile-photo.jpg"

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const GLYPHS = "!<>-_/[]{}=+*^?#"

/* Text "decodes" into the next role (~0.4s). Monospace, so nothing jitters. */
function RoleTicker() {
  const reduced = useReducedMotion()
  const [i, setI] = useState(0)
  const target = hero.roles[i]
  const [out, setOut] = useState(target)

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % hero.roles.length), 3200)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (reduced) { setOut(target); return }
    let f = 0
    const total = 14
    const id = setInterval(() => {
      f++
      setOut(
        target.split("").map((c, k) =>
          c === " " ? " " : k < (f / total) * target.length ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ).join("")
      )
      if (f >= total) { clearInterval(id); setOut(target) }
    }, 30)
    return () => clearInterval(id)
  }, [target, reduced])

  return (
    <p className="role-line">
      <span className="role-prompt" aria-hidden="true">&gt;</span>
      <span className="role-text" aria-hidden="true">{out}</span>
      <span className="role-caret" aria-hidden="true" />
      <span className="sr-only">{hero.roles.join(", ")}</span>
    </p>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()
  const tiltRef = useRef(null)

  /* Gentle 3D tilt, mouse only. Transform-only, so it stays smooth. */
  const onMove = (e) => {
    if (reduced || e.pointerType !== "mouse" || !tiltRef.current) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    tiltRef.current.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`)
    tiltRef.current.style.setProperty("--rx", `${(-py * 9).toFixed(2)}deg`)
  }
  const onLeave = () => {
    if (!tiltRef.current) return
    tiltRef.current.style.setProperty("--ry", "0deg")
    tiltRef.current.style.setProperty("--rx", "0deg")
  }

  const ticker = [...hero.roles, ...hero.highlights]

  return (
    <>
      <section id="home" className="hero" data-nav="home" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <motion.div className="hero-copy" variants={container} initial="hidden" animate="show">
            <motion.p variants={item} className="status-pill">
              <span className="pulse-dot" aria-hidden="true" />
              {hero.status}
            </motion.p>

            <motion.h1 variants={item} id="hero-title">
              <span className="hero-greeting">{hero.greeting}</span>
              <span className="hero-headline">{hero.headline}</span>
            </motion.h1>

            <motion.div variants={item}><RoleTicker /></motion.div>

            <motion.p variants={item} className="hero-intro">{hero.intro}</motion.p>

            <motion.div variants={item} className="hero-actions">
              <a href="#experience" className="btn btn-primary">Explore My Work <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a href="#contact" className="btn btn-ghost">Let&apos;s Connect</a>
            </motion.div>

            <motion.div variants={item} className="hero-links">
              {profile.cvUrl ? (
                <a href={profile.cvUrl} download className="text-link"><Download size={15} aria-hidden="true" /> Download CV</a>
              ) : null}
              <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-link">
                <GithubIcon size={15} /> GitHub
              </a>
            </motion.div>

            <motion.ul variants={item} className="hero-highlights" aria-label="Highlights">
              {hero.highlights.map((h) => <li key={h}>{h}</li>)}
            </motion.ul>
          </motion.div>

          <motion.div
            className="portrait"
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="portrait-glow" aria-hidden="true" />
            <div className="portrait-orbit" aria-hidden="true"><i /></div>
            <div className="portrait-tilt" ref={tiltRef}>
              <div className="portrait-ring" aria-hidden="true" />
              <div className="portrait-frame">
                <img src={photo} alt={hero.photoAlt} width="1080" height="1080" fetchpriority="high" decoding="async" />
                <span className="portrait-shade" aria-hidden="true" />
                <span className="portrait-scan" aria-hidden="true" />
                <span className="portrait-corner tl" aria-hidden="true" />
                <span className="portrait-corner tr" aria-hidden="true" />
                <span className="portrait-corner bl" aria-hidden="true" />
                <span className="portrait-corner br" aria-hidden="true" />
                <span className="hud" aria-hidden="true">31.52°N 74.36°E</span>
              </div>
              {hero.floatingCards.map((c, idx) => (
                <div key={c.text} className={`float-card fc-${idx + 1}`}>
                  <span className="float-icon"><Icon name={c.icon} size={16} /></span>
                  {c.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <a href="#about" className="scroll-cue" aria-label="Scroll to About"><span /></a>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...ticker, ...ticker].map((t, k) => <span key={k} className="marquee-item">{t}</span>)}
        </div>
      </div>
    </>
  )
}
