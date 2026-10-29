import { useEffect, useRef } from "react"

/* Fixed ambient layer: grid + soft aurora + a cursor-following light.
   No blur filters are used (cheap gradients only), and the cursor light moves
   with a compositor-only transform, updated at most once per frame. */
export default function Background() {
  const ref = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) return
    let raf = 0
    let x = 0
    let y = 0
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        if (ref.current) {
          ref.current.style.setProperty("--cx", `${x}px`)
          ref.current.style.setProperty("--cy", `${y}px`)
        }
      })
    }
    window.addEventListener("pointermove", move, { passive: true })
    return () => {
      window.removeEventListener("pointermove", move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="bg-layer" ref={ref} aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-blob bg-blob--violet" />
      <div className="bg-blob bg-blob--cyan" />
      <div className="bg-cursor" />
    </div>
  )
}
