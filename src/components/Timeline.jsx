import { useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

/* Vertical timeline whose accent line draws itself as you scroll. */
export default function Timeline({ children, label }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  return (
    <ol className="timeline" ref={ref} aria-label={label}>
      <span className="tl-track" aria-hidden="true" />
      <motion.span className="tl-progress" style={{ scaleY }} aria-hidden="true" />
      {children}
    </ol>
  )
}
