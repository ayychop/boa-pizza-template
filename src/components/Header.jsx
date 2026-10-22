import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { Bag, Phone } from './icons'
import { BUSINESS } from '../data/menu'

export default function Header({ count, onCart, onNav }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    ['menu', 'Menu'],
    ['oven', 'The Oven'],
    ['find', 'Find Us'],
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background,border-color,backdrop-filter] duration-500 ${
        scrolled ? 'border-b border-cream/[0.08] bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-8">
        <button onClick={() => onNav('top')} aria-label="Forno Rosso, back to top">
          <Logo />
        </button>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {links.map(([id, label]) => (
            <button
              key={id}
              onClick={() => onNav(id)}
              className="group relative text-[13px] font-extrabold uppercase tracking-[0.08em] text-cream/75 transition-colors duration-200 hover:text-cream"
            >
              {label}
              <span className="absolute -bottom-2 left-0 h-[3px] w-full origin-left scale-x-0 rounded-full bg-ember transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a href={BUSINESS.phoneHref} className="hidden items-center gap-2 text-sm font-semibold tabular-nums text-cream/75 transition-colors hover:text-cream lg:inline-flex">
            <Phone className="h-4 w-4" />
            {BUSINESS.phone}
          </a>
          <button
            onClick={onCart}
            className="btn-ember relative hidden h-11 px-5 text-base md:inline-flex"
            aria-label={`Open order, ${count} items`}
          >
            <Bag className="h-[18px] w-[18px]" />
            Order
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ transform: 'scale(0.6)', opacity: 0 }}
                  animate={{ transform: 'scale(1)', opacity: 1 }}
                  exit={{ transform: 'scale(0.6)', opacity: 0 }}
                  transition={{ type: 'spring', duration: 0.35, bounce: 0.3 }}
                  className="grid h-6 min-w-6 place-items-center rounded-md bg-white px-1.5 font-sans text-xs font-extrabold tabular-nums text-blaze"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <a href={BUSINESS.phoneHref} className="btn-ghost h-11 w-11 px-0 md:hidden" aria-label={`Call ${BUSINESS.phone}`}>
            <Phone className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </header>
  )
}
