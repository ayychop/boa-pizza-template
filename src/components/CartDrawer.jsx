import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Photo from './Photo'
import { Stepper } from './ItemModal'
import { Arrow, Bag, Close, Moto, Store } from './icons'
import { BUSINESS, FREE_DELIVERY_OVER, money, totals } from '../data/menu'
import { useCart } from '../context/CartContext'
import { EASE_DRAWER, EASE_OUT } from '../motion'

function ModeToggle({ mode, setMode }) {
  const opts = [
    { id: 'delivery', label: 'Delivery', Icon: Moto, eta: '35 to 45 min' },
    { id: 'pickup', label: 'Pickup', Icon: Store, eta: 'Ready in 20 min' },
  ]
  return (
    <div className="grid grid-cols-2 gap-1 rounded-[16px] bg-ink/50 p-1 ring-2 ring-inset ring-cream/[0.08]" role="radiogroup" aria-label="Fulfilment">
      {opts.map(({ id, label, Icon, eta }) => {
        const on = mode === id
        return (
          <button
            key={id}
            role="radio"
            aria-checked={on}
            onClick={() => setMode(id)}
            className="group relative flex min-w-0 items-center gap-2.5 rounded-[12px] px-2.5 py-3 text-left transition-transform duration-150 ease-out active:scale-[0.98] sm:gap-3 sm:px-3"
          >
            {on && (
              <motion.span
                layoutId="mode-pill"
                className="absolute inset-0 rounded-[12px] bg-blaze shadow-[inset_0_1px_0_rgba(255,190,180,.45),inset_0_-3px_0_rgba(120,0,0,.4),0_8px_24px_-8px_rgba(255,46,46,.7)]"
                transition={{ type: 'spring', duration: 0.45, bounce: 0.12 }}
              />
            )}
            <span
              className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-[10px] transition-colors duration-200 sm:h-10 sm:w-10 ${
                on ? 'bg-white text-blaze' : 'bg-cream/[0.07] text-cream/70 group-hover:text-cream'
              }`}
            >
              <Icon className="h-[22px] w-[22px]" />
            </span>
            <span className="relative min-w-0">
              <span className={`poster block text-[1.35rem] transition-colors duration-200 ${on ? 'text-white' : 'text-cream/80 group-hover:text-cream'}`}>
                {label}
              </span>
              <span className={`mt-1 block whitespace-nowrap text-[11px] font-semibold leading-tight transition-colors duration-200 sm:text-xs ${on ? 'text-white/85' : 'text-cream/55'}`}>{eta}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default function CartDrawer({ open, onClose, mode, setMode, onCheckout, onBrowse }) {
  const cart = useCart()
  const { subtotal, fee, total } = totals(cart.subtotal, mode)
  const toFree = FREE_DELIVERY_OVER - cart.subtotal

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Your order">
          <motion.div
            className="absolute inset-0 bg-ink/65 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, ease: EASE_OUT } }}
            exit={{ opacity: 0, transition: { duration: 0.25, ease: EASE_OUT } }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ transform: 'translateX(100%)' }}
            animate={{ transform: 'translateX(0%)', transition: { duration: 0.5, ease: EASE_DRAWER } }}
            exit={{ transform: 'translateX(100%)', transition: { duration: 0.32, ease: EASE_DRAWER } }}
            className="glass grade-night absolute inset-y-0 right-0 flex w-full flex-col sm:w-[460px] sm:rounded-l-[32px] sm:border-r-0"
            style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
          >
            <div className="flex items-start justify-between gap-4 px-6 pb-6 pt-7">
              <div>
                <h2 className="poster text-[2.75rem]">Your order</h2>
                <p className="mt-2 text-sm font-semibold tabular-nums text-cream/65">
                  {cart.count === 0 ? 'Nothing added yet' : `${cart.count} ${cart.count === 1 ? 'item' : 'items'} · ${money(cart.subtotal)}`}
                </p>
              </div>
              <button onClick={onClose} aria-label="Close order" className="glass-soft -mr-1 grid h-11 w-11 shrink-0 place-items-center rounded-full">
                <Close className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6">
              <ModeToggle mode={mode} setMode={setMode} />
              <AnimatePresence initial={false}>
                {mode === 'delivery' && cart.subtotal > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4">
                      <div className="h-1.5 overflow-hidden rounded-full bg-cream/10">
                        <motion.div
                          className="h-full w-full origin-left rounded-full bg-ember shadow-[0_0_12px_rgba(255,46,46,.8)]"
                          initial={false}
                          animate={{ transform: `scaleX(${Math.min(1, cart.subtotal / FREE_DELIVERY_OVER)})` }}
                          transition={{ duration: 0.6, ease: EASE_OUT }}
                        />
                      </div>
                      <p className="mt-2.5 text-xs font-semibold text-cream/65">
                        {toFree > 0 ? `Add ${money(toFree)} more for free delivery.` : 'Free delivery unlocked.'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hairline mx-6 mt-6" />

            <div data-lenis-prevent className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5">
              {cart.lines.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-[16px] bg-cream/[0.05] ring-2 ring-inset ring-cream/10">
                      <Bag className="h-7 w-7 text-cream/50" />
                    </div>
                    <p className="poster mt-5 text-[2.25rem]">The oven is waiting.</p>
                    <p className="mt-2 text-sm font-medium text-cream/60">Your order is empty for now.</p>
                    <button onClick={onBrowse} className="btn-ember mt-6 h-12 text-lg">
                      Browse the menu
                    </button>
                  </div>
                </div>
              ) : (
                <ul className="space-y-2.5">
                  <AnimatePresence initial={false}>
                    {cart.lines.map((l) => (
                      <motion.li
                        key={l.key}
                        layout
                        initial={{ opacity: 0, transform: 'translateX(24px)' }}
                        animate={{ opacity: 1, transform: 'translateX(0px)' }}
                        exit={{ opacity: 0, transform: 'translateX(32px)', height: 0, marginTop: 0, paddingTop: 0, paddingBottom: 0 }}
                        transition={{ duration: 0.35, ease: EASE_OUT }}
                        className="flex gap-4 overflow-hidden rounded-[16px] bg-ink/40 p-3 ring-2 ring-inset ring-cream/[0.07]"
                      >
                        <Photo src={l.img} look={l.look} alt="" className="h-[76px] w-[76px] shrink-0 rounded-[10px]" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="poster min-w-0 text-[1.45rem]">{l.name}</div>
                            <div className="poster shrink-0 text-[1.45rem] tabular-nums text-ember">{money(l.unit * l.qty)}</div>
                          </div>
                          {l.summary && <div className="mt-1 text-xs font-medium leading-snug text-cream/60">{l.summary}</div>}
                          <div className="mt-2.5 flex items-center justify-between">
                            <Stepper size="sm" value={l.qty} min={0} onDec={() => cart.dec(l.key)} onInc={() => cart.inc(l.key)} />
                            <button onClick={() => cart.remove(l.key)} className="-mr-1 rounded-md px-2 py-1.5 text-xs font-bold text-cream/55 underline-offset-4 transition-colors duration-200 hover:text-cream hover:underline">
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {cart.lines.length > 0 && (
              <div className="border-t border-cream/[0.08] bg-ink/30 px-6 pt-6" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
                <dl className="space-y-2.5 text-sm font-semibold">
                  <div className="flex justify-between text-cream/60">
                    <dt>Subtotal</dt>
                    <dd className="tabular-nums">{money(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-cream/60">
                    <dt>{mode === 'delivery' ? 'Delivery' : 'Collection'}</dt>
                    <dd className="tabular-nums">{fee > 0 ? money(fee) : 'Free'}</dd>
                  </div>
                  <div className="flex items-baseline justify-between pt-3">
                    <dt className="poster text-[1.6rem]">Total</dt>
                    <dd className="poster text-glow text-[3.25rem] tabular-nums text-ember">{money(total)}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs font-medium text-cream/55">
                  {mode === 'delivery' ? 'Delivered hot within 3 miles of the shop.' : `Collect from ${BUSINESS.address[0]}, ${BUSINESS.address[1]}.`}
                </p>
                <button onClick={onCheckout} className="btn-ember group mt-5 h-16 w-full text-[1.6rem]">
                  Checkout
                  <span className="tabular-nums text-white/80">{money(total)}</span>
                  <Arrow className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
