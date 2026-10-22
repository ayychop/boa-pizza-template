import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Photo from './Photo'
import { Stepper } from './ItemModal'
import { Arrow, Bag, Close, Scooter, Store } from './icons'
import { BUSINESS, FREE_DELIVERY_OVER, money, totals } from '../data/menu'
import { useCart } from '../context/CartContext'

const ease = [0.16, 1, 0.3, 1]

function ModeToggle({ mode, setMode }) {
  const opts = [
    { id: 'delivery', label: 'Delivery', Icon: Scooter, eta: '35 to 45 min' },
    { id: 'pickup', label: 'Pickup', Icon: Store, eta: 'Ready in 20 min' },
  ]
  return (
    <div className="grid grid-cols-2 gap-1 rounded-2xl bg-cream/[0.05] p-1 ring-1 ring-cream/10" role="radiogroup" aria-label="Fulfilment">
      {opts.map(({ id, label, Icon, eta }) => {
        const on = mode === id
        return (
          <button key={id} role="radio" aria-checked={on} onClick={() => setMode(id)} className="relative rounded-xl px-3 py-2.5">
            {on && (
              <motion.span
                layoutId="mode-pill"
                className="absolute inset-0 rounded-xl bg-cream shadow-[0_8px_24px_-10px_rgba(245,239,224,.5)]"
                transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              />
            )}
            <span className={`relative flex items-center justify-center gap-2 text-sm font-semibold transition-colors ${on ? 'text-ink' : 'text-cream/70'}`}>
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </span>
            <span className={`relative block text-center text-[11px] transition-colors ${on ? 'text-ink/55' : 'text-cream/40'}`}>{eta}</span>
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
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease }}
            className="glass absolute inset-y-0 right-0 flex w-full flex-col sm:w-[460px] sm:rounded-l-[32px]"
            style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
          >
            <div className="flex items-center justify-between px-6 pb-5 pt-6">
              <div>
                <div className="eyebrow">Your order</div>
                <div className="mt-1 font-display text-3xl italic">
                  {cart.count} {cart.count === 1 ? 'item' : 'items'}
                </div>
              </div>
              <button onClick={onClose} aria-label="Close order" className="glass-soft grid h-11 w-11 place-items-center rounded-full hover:bg-cream/15">
                <Close className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6">
              <ModeToggle mode={mode} setMode={setMode} />
              <AnimatePresence initial={false}>
                {mode === 'delivery' && cart.subtotal > 0 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="pt-3">
                      <div className="h-1 overflow-hidden rounded-full bg-cream/10">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-flame to-ember"
                          animate={{ width: `${Math.min(100, (cart.subtotal / FREE_DELIVERY_OVER) * 100)}%` }}
                          transition={{ duration: 0.7, ease }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-cream/50">
                        {toFree > 0 ? `Add ${money(toFree)} more for free delivery.` : 'Free delivery unlocked.'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hairline mx-6 mt-5" />

            <div data-lenis-prevent className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4">
              {cart.lines.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cream/[0.05] ring-1 ring-cream/10">
                      <Bag className="h-7 w-7 text-cream/50" />
                    </div>
                    <p className="mt-5 font-display text-2xl italic">The oven is waiting.</p>
                    <p className="mt-2 text-sm text-cream/50">Your order is empty for now.</p>
                    <button onClick={onBrowse} className="btn-ghost mt-6 h-12 text-sm">
                      Browse the menu
                    </button>
                  </div>
                </div>
              ) : (
                <ul className="space-y-2">
                  <AnimatePresence initial={false}>
                    {cart.lines.map((l) => (
                      <motion.li
                        key={l.key}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.45, ease }}
                        className="flex gap-4 overflow-hidden rounded-2xl bg-cream/[0.03] p-3 ring-1 ring-cream/[0.07]"
                      >
                        <Photo src={l.img} alt="" className="h-[72px] w-[72px] shrink-0 rounded-xl" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="font-display text-lg italic leading-tight">{l.name}</div>
                            <div className="text-sm font-semibold tabular-nums">{money(l.unit * l.qty)}</div>
                          </div>
                          {l.summary && <div className="mt-0.5 text-xs leading-snug text-cream/45">{l.summary}</div>}
                          <div className="mt-2 flex items-center justify-between">
                            <Stepper size="sm" value={l.qty} min={0} onDec={() => cart.dec(l.key)} onInc={() => cart.inc(l.key)} />
                            <button onClick={() => cart.remove(l.key)} className="text-xs text-cream/40 underline-offset-4 hover:text-cream hover:underline">
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
              <div className="border-t border-cream/[0.08] px-6 pt-5" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between text-cream/60">
                    <dt>Subtotal</dt>
                    <dd className="tabular-nums">{money(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-cream/60">
                    <dt>{mode === 'delivery' ? 'Delivery' : 'Collection'}</dt>
                    <dd className="tabular-nums">{fee > 0 ? money(fee) : 'Free'}</dd>
                  </div>
                  <div className="flex items-baseline justify-between pt-2">
                    <dt className="font-semibold">Total</dt>
                    <dd className="font-display text-3xl tabular-nums">{money(total)}</dd>
                  </div>
                </dl>
                <p className="mt-2 text-xs text-cream/40">
                  {mode === 'delivery' ? 'Delivered hot within 3 miles of the shop.' : `Collect from ${BUSINESS.address[0]}, ${BUSINESS.address[1]}.`}
                </p>
                <button onClick={onCheckout} className="btn-ember group mt-5 h-[60px] w-full text-base">
                  Checkout
                  <span className="tabular-nums opacity-80">{money(total)}</span>
                  <Arrow className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
