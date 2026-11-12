import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { IndexLabel } from '../ui/Motion.jsx'

/**
 * 05 / PROCESS — a website builds itself as you scroll.
 *
 * A browser window and a phone assemble from wireframe into solid panels,
 * then pull apart into their layers (an exploded view, like a design file),
 * then lock back together, finished and responsive.
 *
 * Mechanics
 * ---------
 * Each part is a row in a timeline: where it flies in from, which layer it
 * belongs to, and when it starts moving. Wireframe edges fade out as the solid
 * fades in. Layer depth is driven by one "explode" curve, so every part
 * separates and closes in sync. Strictly monochrome: white, greys and ink.
 *
 * Performance (built for mid-range phones)
 * ----------------------------------------
 *  - three.js is code-split: downloaded only when this section mounts.
 *  - The render loop runs only while the canvas is on screen.
 *  - Pixel ratio capped (1.5 on phones, 1.75 elsewhere); ~40 box meshes.
 *  - Scroll is read from a ref, so scrolling never re-renders React.
 *
 * Framing was worked out by projecting the scene's bounding box through this
 * camera at 1440x900, 1280x720, 1024x640, 820x1180, 390x844 and 360x740 for
 * every scroll position, including the fully exploded state.
 */

const STEPS = [
  { at: 0.12, text: 'Wireframe' },
  { at: 0.42, text: 'Components' },
  { at: 0.66, text: 'Layers' },
  { at: 0.9, text: 'Shipped' },
]

const clamp01 = (n) => Math.min(1, Math.max(0, n))
const smooth = (t) => t * t * (3 - 2 * t)
const snap = (t) => { const c1 = 1.7, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2) } // slight overshoot = "click into place"
const explodeAt = (p) => smooth(clamp01((p - 0.55) / 0.13)) * (1 - smooth(clamp01((p - 0.76) / 0.12)))

/** The parts list. size [w,h,d], to [x,y,z], from [x,y,z], layer (explode depth), material, start time. */
function plan() {
  const P = []
  const add = (o) => P.push({ span: 0.1, ...o })
  // ---- browser window (centred at x = -0.55)
  const bx = -0.55
  add({ size: [3.2, 2.0, 0.06], to: [bx, 0, 0], from: [bx, 0, -6], layer: 0, mat: 'shell', at: 0.0, span: 0.14 })
  add({ size: [3.2, 0.2, 0.04], to: [bx, 0.9, 0.05], from: [bx, 4, 0.05], layer: 1, mat: 'mid', at: 0.06 })
  for (let i = 0; i < 3; i++) add({ size: [0.07, 0.07, 0.04], to: [bx - 1.46 + i * 0.12, 0.9, 0.1], from: [bx - 1.46 + i * 0.12, 4.4, 0.1], layer: 1, mat: 'paper', at: 0.1 + i * 0.015, span: 0.08 })
  add({ size: [2.2, 0.1, 0.03], to: [bx + 0.25, 0.9, 0.09], from: [bx + 0.25, 4.6, 0.09], layer: 1, mat: 'grey', at: 0.12 })
  add({ size: [2.9, 0.1, 0.04], to: [bx, 0.64, 0.06], from: [bx - 5, 0.64, 0.06], layer: 2, mat: 'grey', at: 0.16 })
  add({ size: [2.9, 0.64, 0.05], to: [bx, 0.2, 0.06], from: [bx, 0.2, 5], layer: 2, mat: 'paper', at: 0.22, span: 0.12 })
  add({ size: [1.5, 0.1, 0.03], to: [bx - 0.62, 0.38, 0.1], from: [bx - 4, 0.38, 0.1], layer: 3, mat: 'ink', at: 0.3 })
  add({ size: [1.0, 0.1, 0.03], to: [bx - 0.87, 0.22, 0.1], from: [bx - 4.4, 0.22, 0.1], layer: 3, mat: 'ink', at: 0.33 })
  add({ size: [0.52, 0.14, 0.03], to: [bx - 1.11, 0.0, 0.1], from: [bx - 1.11, -3.6, 0.1], layer: 3, mat: 'ink', at: 0.36 })
  for (let i = 0; i < 3; i++) {
    const cx = bx - 0.98 + i * 0.98
    add({ size: [0.88, 0.62, 0.04], to: [cx, -0.48, 0.06], from: [cx, -4, 0.06], layer: 2, mat: 'grey', at: 0.36 + i * 0.03 })
    add({ size: [0.6, 0.06, 0.02], to: [cx - 0.1, -0.34, 0.1], from: [cx - 0.1, -4.2, 0.1], layer: 3, mat: 'paper', at: 0.4 + i * 0.03, span: 0.08 })
    add({ size: [0.42, 0.06, 0.02], to: [cx - 0.19, -0.46, 0.1], from: [cx - 0.19, -4.4, 0.1], layer: 3, mat: 'paper', at: 0.41 + i * 0.03, span: 0.08 })
  }
  add({ size: [2.9, 0.1, 0.04], to: [bx, -0.9, 0.06], from: [bx + 5, -0.9, 0.06], layer: 2, mat: 'grey', at: 0.46 })
  // ---- phone (front right): the same site, responsive
  const px = 1.86, py = -0.15, pz = 0.48
  add({ size: [0.92, 1.8, 0.08], to: [px, py, pz], from: [px + 4, py, pz], layer: 0, mat: 'shell', at: 0.3, span: 0.12 })
  add({ size: [0.8, 1.6, 0.03], to: [px, py, pz + 0.05], from: [px + 4.4, py, pz + 0.05], layer: 1, mat: 'mid', at: 0.36 })
  add({ size: [0.7, 0.44, 0.03], to: [px, py + 0.5, pz + 0.08], from: [px, py + 4, pz + 0.08], layer: 2, mat: 'paper', at: 0.42 })
  add({ size: [0.46, 0.07, 0.02], to: [px - 0.1, py + 0.58, pz + 0.11], from: [px - 0.1, py + 4.2, pz + 0.11], layer: 3, mat: 'ink', at: 0.45, span: 0.08 })
  add({ size: [0.7, 0.3, 0.03], to: [px, py + 0.04, pz + 0.08], from: [px, py - 4, pz + 0.08], layer: 2, mat: 'grey', at: 0.46 })
  add({ size: [0.7, 0.3, 0.03], to: [px, py - 0.34, pz + 0.08], from: [px, py - 4.2, pz + 0.08], layer: 2, mat: 'grey', at: 0.49 })
  add({ size: [0.24, 0.04, 0.02], to: [px, py - 0.78, pz + 0.08], from: [px, py - 4.4, pz + 0.08], layer: 1, mat: 'paper', at: 0.5, span: 0.06 })
  return P
}

function hasWebGL() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')) } catch { return false }
}

export default function BuildScene() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const progress = useRef(0)
  const reduce = useReducedMotion()
  const [webgl, setWebgl] = useState(null)
  const [ready, setReady] = useState(false)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  useEffect(() => setWebgl(hasWebGL()), [])
  useEffect(() => {
    if (reduce) { progress.current = 1; return }
    return scrollYProgress.on('change', (v) => { progress.current = v })
  }, [scrollYProgress, reduce])

  useEffect(() => {
    if (webgl !== true || !canvasRef.current) return
    const canvas = canvasRef.current
    let disposed = false
    let cleanup = () => {}

    ;(async () => {
      const THREE = await import('three')
      if (disposed) return
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: window.devicePixelRatio < 2, alpha: true, powerPreference: 'high-performance' })
      renderer.setClearColor(0x000000, 0)
      const phone = window.matchMedia('(max-width: 768px)').matches
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, phone ? 1.5 : 1.75))

      // Monochrome lighting only: white key, soft white fill, grey ground.
      scene.add(new THREE.HemisphereLight(0xffffff, 0x0a0a0a, 0.95))
      const key = new THREE.DirectionalLight(0xffffff, 1.5); key.position.set(-3, 4, 6); scene.add(key)
      const fill = new THREE.DirectionalLight(0xffffff, 0.45); fill.position.set(4, 1, 3); scene.add(fill)

      const base = {
        shell: { color: 0x171717, roughness: 0.55, metalness: 0.35 },
        mid: { color: 0x2b2b2b, roughness: 0.6, metalness: 0.1 },
        grey: { color: 0x4b4b4b, roughness: 0.7, metalness: 0 },
        paper: { color: 0xe6e6e6, roughness: 0.5, metalness: 0, emissive: 0xffffff, emissiveIntensity: 0 },
        ink: { color: 0x0c0c0c, roughness: 0.4, metalness: 0 },
      }
      const lineMat = new THREE.LineBasicMaterial({ color: 0xf4f4f4, transparent: true, opacity: 0.9 })
      const root = new THREE.Group()
      scene.add(root)
      const trash = []

      const parts = plan().map((p) => {
        const geo = new THREE.BoxGeometry(...p.size)
        // Own material per part: each fades on its own schedule.
        const mat = new THREE.MeshStandardMaterial({ ...base[p.mat], transparent: true, opacity: 0 })
        const mesh = new THREE.Mesh(geo, mat)
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), lineMat.clone())
        const g = new THREE.Group()
        g.add(mesh, edges)
        root.add(g)
        trash.push(geo, mat, edges.geometry, edges.material)
        return { ...p, g, mesh, edges, paper: p.mat === 'paper' }
      })

      const resize = () => {
        const w = canvas.clientWidth, h = canvas.clientHeight
        if (!w || !h) return
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        const portrait = w / h < 1
        camera.fov = portrait ? 46 : 32
        // Verified framings (see header): copy column stays clear on every screen.
        const c = portrait ? { x: 0, y: 1.05, s: 0.53 } : w >= 1280 ? { x: 1.4, y: -0.1, s: 0.7 } : { x: 1.95, y: -0.1, s: 0.55 }
        root.position.set(c.x, c.y, 0)
        root.scale.setScalar(c.s)
        camera.updateProjectionMatrix()
      }
      resize()
      const ro = new ResizeObserver(resize)
      ro.observe(canvas)

      let raf = 0
      let eased = progress.current
      const frame = () => {
        if (disposed) return
        // Ease towards the scroll position, but snap when the section isn't pinned
        // or after a fast flick, so nothing lingers on screen while the
        // section slides in or out (this showed up on phones scrolling back up).
        const target = progress.current
        if (target <= 0 || target >= 1 || Math.abs(target - eased) > 0.2) eased = target
        else eased += (target - eased) * 0.14
        const p = clamp01(eased)
        const e = explodeAt(p)
        const lit = smooth(clamp01((p - 0.86) / 0.1))
        for (const part of parts) {
          const t = clamp01((p - part.at) / part.span)
          const k = t === 0 ? 0 : snap(t)
          const z = part.from[2] + (part.to[2] - part.from[2]) * k + part.layer * 0.6 * e
          part.g.position.set(part.from[0] + (part.to[0] - part.from[0]) * k, part.from[1] + (part.to[1] - part.from[1]) * k, z)
          const solid = smooth(clamp01(t * 1.3))
          part.mesh.material.opacity = solid
          part.edges.material.opacity = Math.max(0.12, 0.9 - solid * 0.8) * (t > 0 ? 1 : 0) + e * 0.35
          if (part.paper) part.mesh.material.emissiveIntensity = lit * 0.35 // the site "goes live"
        }
        root.rotation.set(0.28 - p * 0.22 + e * 0.06, -0.75 + p * 0.75 + e * 0.45, 0)
        camera.position.set(0, 0.3, 9)
        camera.lookAt(0, 0, 0)
        renderer.render(scene, camera)
        raf = requestAnimationFrame(frame)
      }
      const io = new IntersectionObserver(([en]) => {
        if (en.isIntersecting && !raf) raf = requestAnimationFrame(frame)
        if (!en.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0 }
      }, { rootMargin: '150px' })
      io.observe(canvas)
      const lost = (ev) => { ev.preventDefault(); if (raf) cancelAnimationFrame(raf); raf = 0 }
      canvas.addEventListener('webglcontextlost', lost)
      setReady(true)

      cleanup = () => {
        io.disconnect(); ro.disconnect(); canvas.removeEventListener('webglcontextlost', lost)
        if (raf) cancelAnimationFrame(raf)
        trash.forEach((x) => x.dispose()); lineMat.dispose(); renderer.dispose()
      }
    })()
    return () => { disposed = true; cleanup() }
  }, [webgl])

  return (
    <section id="process" ref={sectionRef} className={`relative ${reduce ? '' : 'h-[260svh] lg:h-[300vh]'}`}>
      <div className={`sticky top-0 overflow-hidden ${reduce ? 'min-h-[100svh] py-24' : 'h-[100svh] supports-[height:100dvh]:h-[100dvh]'}`}>
        <div className="absolute inset-0">
          {webgl === true && <canvas ref={canvasRef} aria-hidden="true" className={`h-full w-full transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`} />}
          {webgl === false && <StaticWireframe />}
        </div>

        {/* Copy: left column on laptops; a solid panel along the bottom on phones. */}
        <div className="absolute inset-x-0 bottom-0 border-t border-g-700 bg-ink pb-8 pt-6 lg:inset-y-0 lg:flex lg:items-center lg:border-0 lg:bg-transparent lg:p-0">
          <div className="frame">
            <div className="lg:max-w-sm">
              <IndexLabel index="05" label="Process" />
              <h2 className="display-lg mt-5 text-paper lg:mt-8">From wireframe<br />to shipped.</h2>
              <p className="mt-4 hidden text-[16px] leading-relaxed text-g-400 sm:block lg:mt-6">
                Every site I build starts as lines on a grid and ends as something fast, responsive and live. Keep scrolling and watch one come together.
              </p>
              <ol className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 lg:mt-8 lg:grid-cols-1 lg:gap-y-3">
                {STEPS.map((s, i) => <Step key={s.text} step={s} i={i} progress={scrollYProgress} reduce={reduce} />)}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({ step, i, progress, reduce }) {
  const on = useTransform(progress, [step.at - 0.04, step.at], [0, 1])
  const op = useTransform(on, [0, 1], [0.35, 1])
  return (
    <motion.li style={{ opacity: reduce ? 1 : op }} className="meta flex items-center gap-3 text-paper">
      <span className="relative grid h-6 w-6 place-items-center border border-g-600 text-[10px] tabular">
        {String(i + 1).padStart(2, '0')}
        <motion.span style={{ opacity: reduce ? 1 : on }} className="absolute inset-0 grid place-items-center bg-paper text-ink">✓</motion.span>
      </span>
      {step.text}
    </motion.li>
  )
}

/** No-WebGL fallback: the finished browser + phone as a flat line drawing. */
function StaticWireframe() {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 220" className="absolute inset-x-0 top-[12%] mx-auto w-[86%] max-w-[560px] lg:left-[38%] lg:top-1/2 lg:w-[50%] lg:-translate-y-1/2" fill="none" stroke="#f4f4f4" strokeWidth="1">
      <rect x="10" y="20" width="280" height="175" /><line x1="10" y1="38" x2="290" y2="38" />
      <rect x="24" y="50" width="252" height="56" fill="#e6e6e6" stroke="none" />
      {[0, 1, 2].map((i) => <rect key={i} x={24 + i * 86} y="116" width="78" height="54" />)}
      <rect x="300" y="60" width="80" height="150" rx="8" /><rect x="310" y="78" width="60" height="38" fill="#e6e6e6" stroke="none" />
      <rect x="310" y="124" width="60" height="24" /><rect x="310" y="154" width="60" height="24" />
    </svg>
  )
}