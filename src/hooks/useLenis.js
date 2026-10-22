import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 0.95 })
    ref.current = lenis
    let frame
    const raf = (t) => {
      lenis.raf(t)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      ref.current = null
    }
  }, [])

  return ref
}
