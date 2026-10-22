import { useEffect, useRef, useState } from 'react'

// Warm-graded, vignetted image with a soft fade-in once decoded.
export default function Photo({ src, alt = '', className = '', imgClassName = '', vignette = true, eager = false, sizes }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true)
  }, [src])

  return (
    <div className={`photo overflow-hidden ${/\b(absolute|fixed)\b/.test(className) ? '' : 'relative'} ${className}`}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`photo-img h-full w-full object-cover transition-opacity duration-700 ease-out ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
      {vignette && <div className="vignette pointer-events-none absolute inset-0" />}
    </div>
  )
}
