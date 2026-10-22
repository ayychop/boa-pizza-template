import { useEffect, useRef, useState } from 'react'

// Fires exactly once, the first time the element enters the viewport.
export function useRevealOnce({ rootMargin = '0px 0px -12% 0px', threshold = 0.12 } = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || shown) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [shown, rootMargin, threshold])

  return [ref, shown]
}
