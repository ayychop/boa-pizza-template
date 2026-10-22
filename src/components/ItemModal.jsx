import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import Photo from './Photo'
import { Check, Close, Minus, Plus } from './icons'
import { ADDONS, CRUSTS, SIZES, money, unitPrice } from '../data/menu'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { EASE_DRAWER, EASE_OUT } from '../motion'

function Group({ title, hint, children }) {
  return (
    <fieldset className="mt-9 first:mt-0">
      <div className="mb-3.5 flex items-baseline justify-between">
        <legend className="poster text-[1.6rem]">{title}</legend>
        {hint && <span className="text-xs text-cream/45">{hint}</span>}
      </div>
      {children}
    </fieldset>
  )
}

export function Stepper({ value, onDec, onInc, size = 'md', min = 1 }) {
  const s = size === 'sm' ? 'h-8 w-8' : 'h-11 w-11'
  return (
    <div className="inline-flex items-center rounded-[12px] bg-cream/[0.06] p-1 ring-2 ring-inset ring-cream/10">
      <button
        onClick={onDec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`${s} grid place-items-center rounded-[9px] text-cream transition-[background-color,transform] duration-150 ease-out hover:bg-cream/10 active:scale-90 disabled:pointer-events-none disabled:opacity-30`}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className={`relative grid ${size === 'sm' ? 'w-6 text-sm' : 'w-8 text-base'} place-items-center overflow-hidden font-extrabold tabular-nums`}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ transform: 'translateY(10px)', opacity: 0 }}
            animate={{ transform: 'translateY(0px)', opacity: 1 }}
            exit={{ transform: 'translateY(-10px)', opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <button
        onClick={onInc}
        aria-label="Increase quantity"
        className={`${s} grid place-items-center rounded-[9px] text-cream transition-[background-color,transform] duration-150 ease-out hover:bg-cream/10 active:scale-90`}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}

export default function ItemModal({ item, onClose, onAdd }) {
  const desktop = useMediaQuery('(min-width: 768px)')
  const drag = useDragControls()
  const isPizza = item.kind === 'pizza'
  const [size, setSize] = useState(SIZES[0].id)
  const [crust, setCrust] = useState(CRUSTS[0].id)
  const [addons, setAddons] = useState([])
  const [qty, setQty] = useState(1)

  const opts = isPizza ? { size, crust, addons } : null
  const unit = unitPrice(item, opts)
  const total = unit * qty

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const toggleAddon = (id) => setAddons((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]))

  // Desktop: a centred dialog that settles in from 96% (never from nothing), leaving faster than it arrived.
  // Phone: a sheet on the iOS drawer curve. It keeps the `y` motion value because drag-to-dismiss drives it.
  const panel = desktop
    ? {
        initial: { opacity: 0, transform: 'translateY(12px) scale(0.96)' },
        animate: { opacity: 1, transform: 'translateY(0px) scale(1)', transition: { duration: 0.42, ease: EASE_OUT } },
        exit: { opacity: 0, transform: 'translateY(6px) scale(0.98)', transition: { duration: 0.2, ease: EASE_OUT } },
      }
    : {
        initial: { y: '100%' },
        animate: { y: 0, transition: { duration: 0.5, ease: EASE_DRAWER } },
        exit: { y: '100%', transition: { duration: 0.3, ease: EASE_DRAWER } },
      }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6" role="dialog" aria-modal="true" aria-label={item.name}>
      <motion.div
        className="absolute inset-0 bg-ink/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.35, ease: EASE_OUT } }}
        exit={{ opacity: 0, transition: { duration: 0.22, ease: EASE_OUT } }}
        onClick={onClose}
      />
      <motion.div
        {...panel}
        drag={desktop ? false : 'y'}
        dragControls={drag}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => (info.offset.y > 120 || info.velocity.y > 600) && onClose()}
        className={`glass grade-night relative flex max-h-[92dvh] w-full min-w-0 flex-col overflow-hidden rounded-t-[28px] md:grid ${isPizza ? 'md:h-[min(760px,88vh)]' : 'md:h-[min(520px,80vh)]'} md:max-h-none md:max-w-[980px] md:grid-cols-[1.05fr_1fr] md:grid-rows-[minmax(0,1fr)] md:rounded-[32px]`}
      >
        {/* Image */}
        <div className="relative h-56 shrink-0 touch-none sm:h-64 md:h-auto md:touch-auto" onPointerDown={(e) => !desktop && drag.start(e)}>
          <Photo src={item.img.replace('w=600', 'w=1200').replace('w=900', 'w=1400')} alt={item.name} look={item.look} eager className="absolute inset-0" />
          <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[#171310] via-transparent to-ink/30 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#171310]/40" />
          <div className="absolute left-1/2 top-2.5 z-[4] h-1 w-10 -translate-x-1/2 rounded-full bg-cream/50 shadow-[0_1px_3px_rgba(0,0,0,.4)] md:hidden" />
          {isPizza && (
            <motion.div
              className="absolute bottom-5 left-5 z-[4] hidden items-center gap-3 md:flex"
              initial={{ opacity: 0, transform: 'translateY(8px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ delay: 0.25, duration: 0.5, ease: EASE_OUT }}
            >
              <span className="glass-soft rounded-full px-3 py-1.5 text-xs text-cream/85">90 seconds at 485°C</span>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="flex min-h-0 flex-1 flex-col">
          <button
            onClick={onClose}
            aria-label="Close"
            className="glass-soft absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full text-cream md:right-5 md:top-5"
          >
            <Close className="h-5 w-5" />
          </button>

          <div data-lenis-prevent className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-8 pt-6 md:px-10 md:pt-12">
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((t) => (
                <span key={t} className={`rounded-md px-2 py-1 text-[11px] font-extrabold uppercase leading-none tracking-[0.06em] ${t === 'Hot' ? 'bg-blaze text-white' : t === 'Signature' ? 'bg-cream text-ink' : 'bg-cream/10 text-cream'}`}>
                  {t}
                </span>
              ))}
            </div>
            <h2 className="poster mt-4 text-balance pr-12 text-[3.25rem] md:text-[4.25rem]">{item.name}</h2>
            <p className="mt-4 max-w-[46ch] text-pretty text-[15px] font-medium leading-relaxed text-cream/75">{item.desc}</p>

            {isPizza ? (
              <div className="mt-10">
                <Group title="Size">
                  <div className="grid grid-cols-2 gap-2.5">
                    {SIZES.map((s) => {
                      const on = size === s.id
                      return (
                        <button
                          key={s.id}
                          onClick={() => setSize(s.id)}
                          aria-pressed={on}
                          className={`relative flex min-w-0 items-center gap-3 rounded-[14px] p-3 text-left ring-2 ring-inset transition-[background-color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] sm:gap-3.5 sm:p-3.5 ${
                            on ? 'bg-ember/[0.12] ring-ember shadow-[0_0_28px_-8px_rgba(255,46,46,.6)]' : 'bg-cream/[0.03] ring-cream/10 hover:bg-cream/[0.05] hover:ring-cream/30'
                          }`}
                        >
                          <span className="grid h-10 w-10 shrink-0 place-items-center sm:h-11 sm:w-11">
                            <span
                              style={{ transform: `scale(${s.scale})` }}
                              className={`block h-full w-full rounded-full border-[3px] transition-colors duration-200 ${on ? 'border-ember bg-ember/25' : 'border-cream/30'}`}
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="flex items-baseline gap-2">
                              <span className="poster text-[2rem] leading-none">{s.label}</span>
                              {s.delta > 0 && <span className="text-xs font-extrabold tabular-nums text-cream/85">+{money(s.delta)}</span>}
                            </span>
                            <span className="mt-1.5 block text-xs text-cream/55">{s.note}</span>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </Group>

                <Group title="Crust">
                  <div className="relative grid grid-cols-2 gap-1 rounded-[16px] bg-ink/50 p-1 ring-2 ring-inset ring-cream/[0.08]">
                    {CRUSTS.map((c) => {
                      const on = crust === c.id
                      return (
                        <button
                          key={c.id}
                          onClick={() => setCrust(c.id)}
                          aria-pressed={on}
                          className="relative min-w-0 rounded-[12px] px-3.5 py-3 text-left transition-transform duration-150 ease-out active:scale-[0.98] sm:px-4"
                        >
                          {on && (
                            <motion.span
                              layoutId="crust-pill"
                              className="absolute inset-0 rounded-[12px] bg-blaze shadow-[inset_0_1px_0_rgba(255,190,180,.45),inset_0_-3px_0_rgba(120,0,0,.4),0_8px_24px_-8px_rgba(255,46,46,.7)]"
                              transition={{ type: 'spring', duration: 0.45, bounce: 0.12 }}
                            />
                          )}
                          <span className={`relative flex flex-wrap items-baseline gap-x-1.5 text-[15px] font-extrabold transition-colors duration-200 ${on ? 'text-white' : 'text-cream'}`}>
                            {c.label}
                            {c.delta > 0 && <span className={`text-xs tabular-nums ${on ? 'text-white/80' : 'text-cream/60'}`}>+{money(c.delta)}</span>}
                          </span>
                          <span className={`relative mt-1 block text-xs font-medium leading-snug transition-colors duration-200 ${on ? 'text-white/80' : 'text-cream/55'}`}>{c.note}</span>
                        </button>
                      )
                    })}
                  </div>
                </Group>

                <Group title="Add-ons" hint="Choose any">
                  <div className="divide-y divide-cream/[0.07] overflow-hidden rounded-[16px] bg-cream/[0.03] ring-2 ring-inset ring-cream/10">
                    {ADDONS.map((a) => {
                      const on = addons.includes(a.id)
                      return (
                        <button
                          key={a.id}
                          onClick={() => toggleAddon(a.id)}
                          aria-pressed={on}
                          className="flex min-h-[60px] w-full items-center gap-4 px-4 py-3 text-left transition-colors duration-200 hover:bg-cream/[0.04] active:bg-cream/[0.06]"
                        >
                          <span
                            className={`grid h-7 w-7 shrink-0 place-items-center rounded-[8px] ring-2 ring-inset transition-[background-color,box-shadow] duration-200 ${
                              on ? 'bg-blaze text-white ring-ember shadow-[0_0_16px_-2px_rgba(255,46,46,.7)]' : 'ring-cream/25'
                            }`}
                          >
                            <motion.span
                              initial={false}
                              animate={{ transform: on ? 'scale(1)' : 'scale(0.6)', opacity: on ? 1 : 0 }}
                              transition={{ type: 'spring', duration: 0.3, bounce: 0.25 }}
                            >
                              <Check className="h-3.5 w-3.5" />
                            </motion.span>
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[15px] font-bold">{a.label}</span>
                            <span className="block text-xs font-medium text-cream/55">{a.note}</span>
                          </span>
                          <span className="text-[15px] font-extrabold tabular-nums text-cream">+{money(a.delta)}</span>
                        </button>
                      )
                    })}
                  </div>
                </Group>
              </div>
            ) : (
              <div className="mt-8 rounded-2xl bg-cream/[0.03] p-4 text-sm leading-relaxed text-cream/60 ring-1 ring-inset ring-cream/10">
                Packed separately so it arrives exactly as it left the pass.
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="flex shrink-0 items-center gap-3 border-t border-cream/[0.08] bg-[#141110]/85 px-5 py-4 shadow-[0_-12px_24px_-12px_rgba(8,5,4,.6)] backdrop-blur-xl md:px-10 md:py-5"
            style={{ paddingBottom: desktop ? undefined : 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <Stepper value={qty} onDec={() => setQty((q) => Math.max(1, q - 1))} onInc={() => setQty((q) => q + 1)} />
            <button onClick={() => onAdd(item, opts, qty)} aria-label={`Add ${qty} ${item.name} to order, ${money(total)}`} className="btn-ember h-14 min-w-0 flex-1 px-4 text-[1.35rem] sm:px-6">
              {/* The price never gives way: below sm the label shortens to "Add" instead. */}
              <span className="min-w-0 truncate">
                Add<span className="hidden sm:inline"> to order</span>
              </span>
              <span className="h-5 w-[2px] shrink-0 rounded-full bg-white/40" />
              <span className="relative inline-flex shrink-0 overflow-hidden tabular-nums">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={total}
                    initial={{ transform: 'translateY(14px)', opacity: 0, filter: 'blur(3px)' }}
                    animate={{ transform: 'translateY(0px)', opacity: 1, filter: 'blur(0px)' }}
                    exit={{ transform: 'translateY(-14px)', opacity: 0, filter: 'blur(3px)' }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    {money(total)}
                  </motion.span>
                </AnimatePresence>
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
