import { motion } from 'framer-motion'
import { Bag, MenuIcon, Pin } from './icons'

export default function MobileNav({ active, count, onMenu, onOrder, onFind }) {
  const items = [
    { id: 'menu', label: 'Menu', Icon: MenuIcon, on: onMenu },
    { id: 'order', label: 'Order', Icon: Bag, on: onOrder, badge: count },
    { id: 'find', label: 'Find Us', Icon: Pin, on: onFind },
  ]
  return (
    <nav
      aria-label="App navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-cream/[0.08] bg-ink/85 backdrop-blur-2xl md:hidden"
      style={{ paddingBottom: 'var(--safe-b)' }}
    >
      <div className="grid h-[var(--nav-h)] grid-cols-3">
        {items.map(({ id, label, Icon, on, badge }) => {
          const isActive = active === id
          return (
            <button key={id} onClick={on} className="relative flex flex-col items-center justify-center gap-1 transition-transform duration-150 ease-out active:scale-95" aria-current={isActive ? 'page' : undefined}>
              {isActive && (
                <motion.span
                  layoutId="tab-glow"
                  transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }}
                  className="absolute -top-[2px] h-[3px] w-12 rounded-full bg-ember shadow-[0_0_18px_3px_rgba(255,46,46,.75)]"
                />
              )}
              <span className="relative">
                <Icon className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-ember' : 'text-cream/55'}`} />
                {badge > 0 && (
                  <motion.span
                    key={badge}
                    initial={{ transform: 'scale(0.6)' }}
                    animate={{ transform: 'scale(1)' }}
                    transition={{ type: 'spring', duration: 0.35, bounce: 0.3 }}
                    className="absolute -right-3 -top-2 grid h-5 min-w-5 place-items-center rounded-md bg-blaze px-1 text-[11px] font-extrabold tabular-nums text-white shadow-[0_0_12px_rgba(255,46,46,.6)]"
                  >
                    {badge}
                  </motion.span>
                )}
              </span>
              <span className={`text-[11px] font-extrabold uppercase tracking-[0.08em] transition-colors duration-200 ${isActive ? 'text-cream' : 'text-cream/55'}`}>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
