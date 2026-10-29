import { useEffect, useState } from "react"
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion"
import Background from "./components/Background.jsx"
import Navbar from "./components/Navbar.jsx"
import Hero from "./components/Hero.jsx"
import About from "./components/About.jsx"
import Skills from "./components/Skills.jsx"
import ProgrammingLanguages from "./components/ProgrammingLanguages.jsx"
import Education from "./components/Education.jsx"
import Experience from "./components/Experience.jsx"
import FounderSpotlight from "./components/FounderSpotlight.jsx"
import Contact from "./components/Contact.jsx"
import Footer from "./components/Footer.jsx"

export default function App() {
  const [active, setActive] = useState("home")
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  /* Active nav item: the section crossing 35% of the viewport height. */
  useEffect(() => {
    const sections = [...document.querySelectorAll("section[data-nav]")]
    const update = () => {
      const y = window.innerHeight * 0.35
      let current = "home"
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= y) current = s.dataset.nav
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = "contact"
      setActive(current)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  /* Cursor spotlight: feeds --mx/--my to any element with .spot */
  useEffect(() => {
    const move = (e) => {
      const el = e.target.closest && e.target.closest(".spot")
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty("--mx", `${e.clientX - r.left}px`)
      el.style.setProperty("--my", `${e.clientY - r.top}px`)
    }
    document.addEventListener("pointermove", move, { passive: true })
    return () => document.removeEventListener("pointermove", move)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">Skip to content</a>
      <Background />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Navbar active={active} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <ProgrammingLanguages />
        <Education />
        <Experience />
        <FounderSpotlight />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
