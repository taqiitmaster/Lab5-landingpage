import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * THE LINE
 * ========
 * One continuous stroke that draws itself down the page as you scroll, and
 * changes shape as it passes through each chapter.
 *
 * How it's built
 * --------------
 * Sections mark their chapter with a data attribute, e.g.
 *     <article data-line="helix">…</article>
 * On mount (and whenever the page resizes or fonts load) we measure where each
 * marked element sits and generate the path from those real positions, so the
 * motifs always line up with their content on any screen size.
 *
 * The path is generated as a list of contiguous PIECES — straight connectors
 * plus one piece per motif — each rendered as its own <path>. Every piece knows
 * the vertical range [y0, y1] of the page it belongs to. That gives a very
 * cheap scroll mapping with no length lookups:
 *
 *     tip      = scrollY + 60% of the viewport
 *     progress = clamp((tip - y0) / (y1 - y0), 0, 1)     per piece
 *
 * and each piece is drawn with stroke-dashoffset on a normalised pathLength
 * of 1. Pieces share endpoints, so together they read as one unbroken line —
 * including the inphint loop, which rises ABOVE its start point and so could
 * never be drawn by mapping scroll position straight onto the path's length.
 *
 * Motifs also have DETAIL strokes (the second DNA strand, blueprint ticks, the
 * closing brace, circuit pads, the rocket chevron) drawn on the same schedule
 * as the piece they belong to.
 *
 * Performance
 * -----------
 * Geometry is built once per resize. On scroll, a single rAF callback writes
 * one attribute per piece that is actually changing — no React renders, no
 * layout reads except one getBoundingClientRect on the wrapper.
 *
 * The SVG uses mix-blend-mode: difference with a near-white stroke, so the
 * line turns black by itself over the white inphint section.
 */

const TIP = 0.6 // where the "pen" sits, as a fraction of viewport height

// --- small path helpers -----------------------------------------------------
const f = (n) => Math.round(n * 10) / 10
const circle = (cx, cy, r) => `M${f(cx - r)} ${f(cy)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`
const poly = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${f(x)} ${f(y)}`).join('')

/** Build pieces + details + markers from the measured checkpoints. */
function buildGeometry(cps, { X, k, top, bottom }) {
  const pieces = []
  const details = []
  const markers = []
  let cy = top // current pen y; x always returns to X between motifs

  const straightTo = (y) => {
    if (y - cy > 1) pieces.push({ d: poly([[X, cy], [X, y]]), y0: cy, y1: y })
    cy = Math.max(cy, y)
  }

  for (const cp of cps) {
    const { kind, y0: top0, y1: bot0 } = cp
    if (top0 < cy - 2 && kind !== 'node') continue // overlapping checkpoint; skip
    switch (kind) {
      case 'pulse': {
        // A single heartbeat, then the line straightens out.
        straightTo(top0)
        const y = cy
        const pts = [[X, y], [X, y + 24], [X - 8 * k, y + 34], [X + 26 * k, y + 50], [X - 34 * k, y + 70], [X + 16 * k, y + 86], [X - 5 * k, y + 96], [X, y + 104]]
        pieces.push({ d: poly(pts), y0: y, y1: y + 104, motif: true })
        cy = y + 104
        break
      }
      case 'helix': {
        // DNA: the line is one strand; the second strand and rungs are details.
        straightTo(top0)
        const P = k < 1 ? 92 : 120
        const A = 24 * k
        const halves = Math.max(2, Math.floor((bot0 - cy) / (P / 2)))
        const y0 = cy
        const y1 = y0 + (halves * P) / 2
        const a = []
        const b = []
        for (let y = y0; y <= y1 + 0.1; y += 4) {
          const s = Math.sin((2 * Math.PI * (y - y0)) / P)
          a.push([X + A * s, y])
          b.push([X - A * s, y])
        }
        let rungs = ''
        for (let y = y0 + P / 16; y < y1; y += P / 8) {
          const s = Math.sin((2 * Math.PI * (y - y0)) / P)
          if (Math.abs(s) > 0.3) rungs += `M${f(X + A * s * 0.82)} ${f(y)}L${f(X - A * s * 0.82)} ${f(y)}`
        }
        pieces.push({ d: poly(a), y0, y1, motif: true })
        details.push({ d: poly(b), y0, y1 })
        details.push({ d: rungs, y0, y1, thin: true })
        cy = y1
        break
      }
      case 'blueprint': {
        // Engineering profile: the line steps out on a radius, runs, steps back.
        // Details: a measuring scale along the left and a dimension line.
        straightTo(top0)
        const y0 = cy
        const y1 = Math.max(y0 + 160, bot0)
        const w = 28 * k
        const d =
          `M${X} ${y0}L${X} ${y0 + 18}` +
          `C${X} ${y0 + 34} ${f(X + w)} ${y0 + 30} ${f(X + w)} ${y0 + 48}` +
          `L${f(X + w)} ${f(y1 - 48)}` +
          `C${f(X + w)} ${f(y1 - 30)} ${X} ${f(y1 - 34)} ${X} ${f(y1 - 18)}L${X} ${f(y1)}`
        pieces.push({ d, y0, y1, motif: true })
        let ticks = ''
        let i = 0
        for (let y = y0 + 6; y < y1 - 4; y += 8, i++) {
          const len = (i % 5 === 0 ? 12 : 6) * k
          ticks += `M${f(X - 7 * k)} ${f(y)}L${f(X - 7 * k - len)} ${f(y)}`
        }
        details.push({ d: ticks, y0, y1, thin: true })
        const dx = X + w + 16 * k
        details.push({ d: `M${f(dx - 5 * k)} ${y0 + 48}L${f(dx + 5 * k)} ${y0 + 48}M${f(dx)} ${y0 + 48}L${f(dx)} ${f(y1 - 48)}M${f(dx - 5 * k)} ${f(y1 - 48)}L${f(dx + 5 * k)} ${f(y1 - 48)}`, y0: y0 + 48, y1: y1 - 48, thin: true })
        cy = y1
        break
      }
      case 'code': {
        // An opening brace "{" in the line; the closing "}" is drawn beside it.
        straightTo(top0)
        const y0 = cy
        const y1 = Math.max(y0 + 140, bot0)
        const m = (y0 + y1) / 2
        const w = 14 * k
        const p = 12 * k
        const brace = (dir) =>
          `M${X} ${y0}C${X} ${y0 + 14} ${f(X + dir * w)} ${y0 + 10} ${f(X + dir * w)} ${y0 + 26}` +
          `L${f(X + dir * w)} ${f(m - 14)}C${f(X + dir * w)} ${f(m - 4)} ${f(X + dir * (w + p))} ${f(m - 2)} ${f(X + dir * (w + p))} ${f(m)}` +
          `C${f(X + dir * (w + p))} ${f(m + 2)} ${f(X + dir * w)} ${f(m + 4)} ${f(X + dir * w)} ${f(m + 14)}` +
          `L${f(X + dir * w)} ${f(y1 - 26)}C${f(X + dir * w)} ${f(y1 - 10)} ${X} ${f(y1 - 14)} ${X} ${f(y1)}`
        pieces.push({ d: brace(-1), y0, y1, motif: true })
        // Closing brace, mirrored and offset to the right.
        const off = 30 * k
        details.push({ d: brace(1).replace(/(-?\d+\.?\d*) (-?\d+\.?\d*)/g, (s, x, y) => `${f(+x + off)} ${y}`), y0, y1 })
        cy = y1
        break
      }
      case 'circuit': {
        // Circuit trace: 45° jogs, vias at the corners, branches to pads.
        straightTo(top0)
        const y0 = cy
        const y1 = Math.max(y0 + 180, bot0)
        const j = 22 * k
        const pts = [[X, y0], [X, y0 + 20], [X + j, y0 + 20 + j], [X + j, y0 + 80], [X, y0 + 80 + j], [X, y1 - 50], [X - j * 0.7, y1 - 50 + j * 0.7], [X - j * 0.7, y1 - 34], [X, y1 - 34 + j * 0.7], [X, y1]]
        pieces.push({ d: poly(pts), y0, y1, motif: true })
        const r = 3 * k + 0.6
        details.push({
          d: [circle(X + j, y0 + 20 + j, r), circle(X, y0 + 80 + j, r), circle(X - j * 0.7, y1 - 50 + j * 0.7, r),
            `M${f(X + j)} ${y0 + 56}L${f(X + j + 26 * k)} ${y0 + 56}`, circle(X + j + 26 * k + r, y0 + 56, r),
            `M${X} ${f(y1 - 80)}L${f(X - 26 * k)} ${f(y1 - 80)}`, circle(X - 26 * k - r, y1 - 80, r)].join(''),
          y0, y1, thin: true,
        })
        cy = y1
        break
      }
      case 'node': {
        // Experience: a component on the trace, with a lead out to its entry.
        const y = top0 + 14
        straightTo(y)
        markers.push({ x: X, y, r: 5.5 * Math.max(k, 0.8) })
        details.push({ d: `M${f(X + 8)} ${y}L${f(X + 38 * k)} ${y}M${f(X + 38 * k)} ${f(y - 3)}L${f(X + 38 * k)} ${f(y + 3)}`, y0: y, y1: y + 30, thin: true })
        break
      }
      case 'rocket': {
        // inphint: the line launches — it swings out and climbs ABOVE where it
        // started (a loop), points upward at the apex, then comes back to the rail.
        straightTo(top0)
        const y0 = cy
        const R = 30 * k
        const y1 = y0 + 150
        const d =
          `M${X} ${y0}C${X} ${y0 + 60} ${f(X + 2 * R)} ${y0 + 80} ${f(X + 2 * R)} ${y0 + 20}` +
          `C${f(X + 2 * R)} ${y0 - 40} ${f(X + 0.5 * R)} ${y0 - 44} ${f(X + 0.5 * R)} ${y0 + 30}` +
          `C${f(X + 0.5 * R)} ${y0 + 100} ${X} ${y0 + 96} ${X} ${y1}`
        pieces.push({ d, y0, y1, motif: true })
        const ax = X + 1.25 * R
        const ay = y0 - 26
        details.push({ d: `M${f(ax - 7 * k)} ${f(ay + 7 * k)}L${f(ax)} ${f(ay)}L${f(ax + 7 * k)} ${f(ay + 7 * k)}`, y0: y0 + 40, y1: y0 + 90 })
        cy = y1
        break
      }
      case 'end': {
        const y = top0 + 10
        straightTo(y)
        details.push({ d: `${circle(X, y, 8)}M${X - 18} ${y}L${X + 18} ${y}`, y0: y - 1, y1: y + 40 })
        markers.push({ x: X, y, r: 2.5, solid: true })
        cy = y
        break
      }
      default:
        break
    }
  }
  if (bottom > cy && !cps.some((c) => c.kind === 'end')) straightTo(bottom)
  return { pieces, details, markers, end: cy }
}

export default function TheLine({ wrapperRef }) {
  const reduce = useReducedMotion()
  const [geo, setGeo] = useState(null)
  const pieceRefs = useRef([])
  const detailRefs = useRef([])
  const markerRefs = useRef([])
  const tipRef = useRef(null)
  const lengths = useRef([])
  const last = useRef([])

  /** Measure checkpoints and rebuild geometry. */
  const build = useCallback(() => {
    const wrap = wrapperRef.current
    if (!wrap) return
    const wr = wrap.getBoundingClientRect()
    const rail = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--rail')) || 44
    const narrow = window.innerWidth < 1024
    const X = narrow ? 20 : rail / 2
    const k = narrow ? 0.5 : 1
    const cps = [...wrap.querySelectorAll('[data-line]')].map((el) => {
      const r = el.getBoundingClientRect()
      return { kind: el.dataset.line, y0: r.top - wr.top, y1: r.bottom - wr.top }
    }).sort((a, b) => a.y0 - b.y0)
    const g = buildGeometry(cps, { X, k, top: 96, bottom: wrap.scrollHeight - 40 })
    g.height = wrap.scrollHeight
    last.current = []
    setGeo(g)
  }, [wrapperRef])

  // Rebuild on resize (debounced) and once web fonts have settled the layout.
  useLayoutEffect(() => {
    build()
    let t
    const ro = new ResizeObserver(() => { clearTimeout(t); t = setTimeout(build, 120) })
    if (wrapperRef.current) ro.observe(wrapperRef.current)
    document.fonts?.ready.then(build)
    return () => { ro.disconnect(); clearTimeout(t) }
  }, [build, wrapperRef])

  // Measure each piece once per build, for positioning the pen tip.
  useEffect(() => {
    if (!geo) return
    lengths.current = pieceRefs.current.map((p) => (p ? p.getTotalLength() : 0))
  }, [geo])

  // Scroll → draw. Writes attributes directly; React never re-renders on scroll.
  useEffect(() => {
    if (!geo) return
    let raf = 0
    const draw = () => {
      raf = 0
      const wrap = wrapperRef.current
      if (!wrap) return
      const tip = reduce ? Infinity : -wrap.getBoundingClientRect().top + window.innerHeight * TIP
      const t = (y0, y1) => (tip >= y1 ? 1 : tip <= y0 ? 0 : (tip - y0) / (y1 - y0))

      let tipPoint = null
      geo.pieces.forEach((p, i) => {
        const v = t(p.y0, p.y1)
        if (last.current[i] !== v) {
          last.current[i] = v
          pieceRefs.current[i]?.setAttribute('stroke-dashoffset', String(1 - v))
        }
        if (v > 0 && v < 1 && pieceRefs.current[i] && lengths.current[i]) {
          tipPoint = pieceRefs.current[i].getPointAtLength(v * lengths.current[i])
        }
      })
      geo.details.forEach((d, i) => detailRefs.current[i]?.setAttribute('stroke-dashoffset', String(1 - t(d.y0, d.y1))))
      geo.markers.forEach((m, i) => markerRefs.current[i]?.setAttribute('data-on', tip >= m.y ? '1' : '0'))

      // Pen tip: rides the end of the stroke while it's drawing a piece.
      const tipEl = tipRef.current
      if (tipEl) {
        if (tipPoint) tipEl.setAttribute('transform', `translate(${f(tipPoint.x)} ${f(tipPoint.y)})`)
        tipEl.setAttribute('opacity', tipPoint ? '1' : '0')
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(draw) }
    draw()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [geo, reduce, wrapperRef])

  if (!geo) return null
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-30 w-full"
      style={{ height: geo.height, mixBlendMode: 'difference' }} width="100%" height={geo.height}>
      <g fill="none" stroke="#F4F4F4" strokeLinecap="round" strokeLinejoin="round">
        {geo.pieces.map((p, i) => (
          <path key={`p${i}`} ref={(el) => (pieceRefs.current[i] = el)} d={p.d} pathLength="1" strokeWidth={p.motif ? 1.6 : 1.3}
            strokeDasharray="1 1" strokeDashoffset="1" />
        ))}
        {geo.details.map((d, i) => (
          <path key={`d${i}`} ref={(el) => (detailRefs.current[i] = el)} d={d.d} pathLength="1" strokeWidth={d.thin ? 0.9 : 1.3}
            strokeDasharray="1 1" strokeDashoffset="1" opacity={d.thin ? 0.75 : 1} />
        ))}
      </g>
      {geo.markers.map((m, i) => (
        <circle key={`m${i}`} ref={(el) => (markerRefs.current[i] = el)} cx={m.x} cy={m.y} r={m.r} data-on="0"
          className="line-node" />
      ))}
      <g ref={tipRef} opacity="0">
        <rect x="-3.5" y="-3.5" width="7" height="7" fill="#F4F4F4" />
      </g>
    </svg>
  )
}
