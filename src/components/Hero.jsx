import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Download } from "lucide-react"
import { hero, profile, socials } from "../data/portfolioData"
import { Icon, GithubIcon } from "./icons.jsx"
import photo from "../assets/profile-photo.jpg"

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function RoleTicker() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % hero.roles.length), 2800)
    return () => clearInterval(t)
  }, [])
  return (
    <p className="role-line" aria-live="off">
      <span className="role-prompt" aria-hidden="true">&gt;</span>
      <span className="role-window">
        <AnimatePresence mode="wait">
          <motion.span
            key={hero.roles[i]}
            className="role-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {hero.roles[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="role-caret" aria-hidden="true" />
      <span className="sr-only">{hero.roles.join(", ")}</span>
    </p>
  )
}

export default function Hero() {
  return (
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
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="portrait-glow" aria-hidden="true" />
          <div className="portrait-ring" aria-hidden="true" />
          <div className="portrait-frame">
            <img src={photo} alt={hero.photoAlt} width="1080" height="1080" fetchpriority="high" decoding="async" />
            <span className="portrait-shade" aria-hidden="true" />
            <span className="portrait-corner tl" aria-hidden="true" />
            <span className="portrait-corner tr" aria-hidden="true" />
            <span className="portrait-corner bl" aria-hidden="true" />
            <span className="portrait-corner br" aria-hidden="true" />
          </div>
          {hero.floatingCards.map((c, idx) => (
            <div key={c.text} className={`float-card fc-${idx + 1}`}>
              <span className="float-icon"><Icon name={c.icon} size={16} /></span>
              {c.text}
            </div>
          ))}
        </motion.div>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to About"><span /></a>
    </section>
  )
}