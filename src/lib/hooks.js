import { useEffect, useRef, useState } from 'react'

export function useMediaQuery(query) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = (e) => setM(e.matches)
    setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return m
}

export const useFinePointer = () => useMediaQuery('(pointer: fine)')

/** Fires once when the element first scrolls into view. */
export function useInViewOnce(threshold = 0.3) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [seen, threshold])
  return [ref, seen]
}

export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    window.__lenis?.stop()
    return () => { document.documentElement.style.overflow = prev; window.__lenis?.start() }
  }, [locked])
}

/** Anchor scroll that goes through Lenis when it's running. */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (window.__lenis && !reduce) window.__lenis.scrollTo(el, { offset: id === 'home' ? 0 : -64, duration: 1.4 })
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - (id === 'home' ? 0 : 64), behavior: 'auto' })
}
