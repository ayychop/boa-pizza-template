import { AnimatePresence, motion } from 'framer-motion'
import { Arrow, Bag } from './icons'
import { money } from '../data/menu'
import { EASE_OUT } from '../motion'

export default function FloatingOrder({ show, count, subtotal, onClick }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4 bottom-[calc(var(--nav-h)+var(--safe-b)+12px)] md:bottom-8"
          initial={{ transform: 'translateY(140%)', opacity: 0 }}
          animate={{ transform: 'translateY(0%)', opacity: 1 }}
          exit={{ transform: 'translateY(140%)', opacity: 0, transition: { duration: 0.22, ease: EASE_OUT } }}
          transition={{ type: 'spring', duration: 0.55, bounce: 0.18 }}
        >
          <button
            onClick={onClick}
            className="btn-ember group pointer-events-auto h-16 w-full max-w-md justify-between pl-2.5 pr-5 text-[1.5rem]"
          >
            <span className="flex items-center gap-3.5">
              <span className="relative grid h-11 w-11 place-items-center rounded-[10px] bg-black/20 ring-2 ring-inset ring-white/20">
                <Bag className="h-[22px] w-[22px]" />
                <AnimatePresence initial={false}>
                  <motion.span
                    key={count}
                    initial={{ transform: 'scale(0.6)', opacity: 0 }}
                    animate={{ transform: 'scale(1)', opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    transition={{ type: 'spring', duration: 0.4, bounce: 0.3 }}
                    className="absolute -right-1.5 -top-1.5 grid h-[22px] min-w-[22px] place-items-center rounded-md bg-white px-1 font-sans text-xs font-extrabold tabular-nums text-blaze shadow-[0_2px_6px_rgba(60,0,0,0.5)]"
                  >
                    {count}
                  </motion.span>
                </AnimatePresence>
              </span>
              View Order
            </span>
            <span className="flex items-center gap-2 tabular-nums">
              {money(subtotal)}
              <Arrow className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
