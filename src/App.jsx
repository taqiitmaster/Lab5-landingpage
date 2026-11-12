import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { Crosshair, Navbar, ScaleProgress } from './components/Chrome.jsx'
import TheLine from './components/TheLine.jsx'
import Hero from './components/Hero.jsx'
import { About, Education, Experience } from './components/Story.jsx'
import { Certifications, Inphint, Skills } from './components/Showcase.jsx'
import Contact from './components/Contact.jsx'
import BuildScene from './components/BuildScene.jsx'

/**
 * One page, one scroll. Sections run in the order of the story the line tells:
 * hero → premise → education (DNA, blueprint, code) → experience (nodes) →
 * process (a site assembles in 3D) → inphint (the launch) → skills → certifications → contact (the endpoint).
 */
export default function App() {
  const pageRef = useRef(null)

  // Smooth scrolling. Skipped entirely for reduced-motion users; Lenis leaves
  // touch scrolling native by default, so phones keep their own physics.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    window.__lenis = lenis
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); delete window.__lenis }
  }, [])

  return (
    <>
      {/* Fixed texture layers: grain, and the underlying column grid. */}
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[80] opacity-[0.07]" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 hidden lg:block">
        <div className="frame grid h-full grid-cols-12 gap-6">
          {Array.from({ length: 13 }).map((_, i) => <span key={i} className={`h-full border-l border-white/[0.035] ${i === 12 ? 'hidden' : ''}`} />)}
        </div>
      </div>

      <ScaleProgress />
      <Crosshair />
      <Navbar />
      <main ref={pageRef} className="relative z-10">
        <TheLine wrapperRef={pageRef} />
        <Hero />
        <About />
        <Education />
        <Experience />
        <BuildScene />
        <Inphint />
        <Skills />
        <Certifications />
        <Contact />
      </main>
    </>
  )
}
