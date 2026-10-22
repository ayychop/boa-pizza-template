import { AnimatePresence, motion } from 'framer-motion'
import { Arrow, Bag } from './icons'
import { money } from '../data/menu'

export default function FloatingOrder({ show, count, subtotal, onClick }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4 bottom-[calc(var(--nav-h)+var(--safe-b)+12px)] md:bottom-8"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        >
          <motion.button
            key={count}
            initial={{ scale: 0.96 }}
            animate={{ scale: [1.04, 1] }}
            transition={{ duration: 0.4 }}
            onClick={onClick}
            className="btn-ember pointer-events-auto h-[60px] w-full max-w-md justify-between pl-3 pr-6 text-[15px]"
          >
            <span className="flex items-center gap-3">
              <span className="relative grid h-10 w-10 place-items-center rounded-full bg-ink/25">
                <Bag className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-cream px-1 text-[11px] font-bold tabular-nums text-ink">
                  {count}
                </span>
              </span>
              View Order
            </span>
            <span className="flex items-center gap-2 tabular-nums">
              {money(subtotal)}
              <Arrow className="h-4 w-4" />
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
