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
      className="fixed inset-x-0 bottom-0 z-40 border-t border-cream/[0.08] bg-ink/75 backdrop-blur-2xl md:hidden"
      style={{ paddingBottom: 'var(--safe-b)' }}
    >
      <div className="grid h-[var(--nav-h)] grid-cols-3">
        {items.map(({ id, label, Icon, on, badge }) => {
          const isActive = active === id
          return (
            <button key={id} onClick={on} className="relative flex flex-col items-center justify-center gap-1" aria-current={isActive ? 'page' : undefined}>
              {isActive && (
                <motion.span layoutId="tab-glow" className="absolute top-0 h-[2px] w-10 rounded-full bg-ember shadow-[0_0_16px_2px_rgba(214,40,40,.7)]" />
              )}
              <span className="relative">
                <Icon className={`h-6 w-6 transition-colors ${isActive ? 'text-cream' : 'text-cream/45'}`} />
                {badge > 0 && (
                  <motion.span
                    key={badge}
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className="absolute -right-2.5 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-ember px-1 text-[10px] font-bold tabular-nums text-cream"
                  >
                    {badge}
                  </motion.span>
                )}
              </span>
              <span className={`text-[11px] font-semibold tracking-wide transition-colors ${isActive ? 'text-cream' : 'text-cream/45'}`}>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
