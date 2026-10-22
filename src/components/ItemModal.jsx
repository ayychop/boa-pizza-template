import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import Photo from './Photo'
import { Check, Close, Minus, Plus } from './icons'
import { ADDONS, CRUSTS, SIZES, money, unitPrice } from '../data/menu'
import { useMediaQuery } from '../hooks/useMediaQuery'

const ease = [0.16, 1, 0.3, 1]

function Group({ title, hint, children }) {
  return (
    <fieldset className="mt-8 first:mt-0">
      <div className="mb-3 flex items-baseline justify-between">
        <legend className="eyebrow text-cream/70">{title}</legend>
        {hint && <span className="text-xs text-cream/40">{hint}</span>}
      </div>
      {children}
    </fieldset>
  )
}

export function Stepper({ value, onDec, onInc, size = 'md', min = 1 }) {
  const s = size === 'sm' ? 'h-8 w-8' : 'h-11 w-11'
  return (
    <div className="inline-flex items-center rounded-full bg-cream/[0.06] p-1 ring-1 ring-cream/10">
      <button
        onClick={onDec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`${s} grid place-items-center rounded-full text-cream/80 transition-colors hover:bg-cream/10 disabled:opacity-30`}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className={`relative grid ${size === 'sm' ? 'w-6' : 'w-8'} place-items-center overflow-hidden text-sm font-semibold tabular-nums`}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={value} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.25 }}>
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <button
        onClick={onInc}
        aria-label="Increase quantity"
        className={`${s} grid place-items-center rounded-full text-cream/80 transition-colors hover:bg-cream/10`}
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

  const panel = desktop
    ? { initial: { opacity: 0, scale: 0.96, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.97, y: 10 } }
    : { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6" role="dialog" aria-modal="true" aria-label={item.name}>
      <motion.div
        className="absolute inset-0 bg-ink/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
      />
      <motion.div
        {...panel}
        transition={{ duration: desktop ? 0.6 : 0.55, ease }}
        drag={desktop ? false : 'y'}
        dragControls={drag}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => (info.offset.y > 120 || info.velocity.y > 600) && onClose()}
        className={`glass relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[32px] md:grid ${isPizza ? 'md:h-[min(760px,88vh)]' : 'md:h-[min(520px,80vh)]'} md:max-h-none md:max-w-[980px] md:grid-cols-[1.05fr_1fr] md:grid-rows-[minmax(0,1fr)] md:rounded-[32px]`}
      >
        {/* Image */}
        <div className="relative h-60 shrink-0 touch-none md:h-auto md:touch-auto" onPointerDown={(e) => !desktop && drag.start(e)}>
          <Photo src={item.img.replace('w=600', 'w=1200').replace('w=900', 'w=1400')} alt={item.name} eager className="absolute inset-0" />
          <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[#171310] via-transparent to-ink/30 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#171310]/40" />
          <div className="absolute left-1/2 top-2.5 z-[4] h-1 w-10 -translate-x-1/2 rounded-full bg-cream/40 md:hidden" />
          {isPizza && (
            <motion.div
              className="absolute bottom-5 left-5 z-[4] hidden items-center gap-3 md:flex"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease }}
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
            className="glass-soft absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full text-cream transition-colors hover:bg-cream/15"
          >
            <Close className="h-5 w-5" />
          </button>

          <div data-lenis-prevent className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-6 pt-6 md:px-9 md:pt-10">
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((t) => (
                <span key={t} className="rounded-full bg-cream/[0.07] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/60">
                  {t}
                </span>
              ))}
            </div>
            <h2 className="mt-3 pr-10 font-display text-4xl italic leading-[1] tracking-tight md:text-5xl">{item.name}</h2>
            <p className="mt-3 text-pretty text-[15px] leading-relaxed text-cream/65">{item.desc}</p>

            {isPizza ? (
              <div className="mt-8">
                <Group title="Size">
                  <div className="grid grid-cols-2 gap-2.5">
                    {SIZES.map((s) => {
                      const on = size === s.id
                      return (
                        <button
                          key={s.id}
                          onClick={() => setSize(s.id)}
                          aria-pressed={on}
                          className={`relative flex items-center gap-3.5 rounded-2xl p-3.5 text-left ring-1 transition-all duration-300 ${
                            on ? 'bg-ember/[0.12] ring-ember/70' : 'bg-cream/[0.03] ring-cream/10 hover:ring-cream/25'
                          }`}
                        >
                          <span className="grid h-11 w-11 shrink-0 place-items-center">
                            <motion.span
                              animate={{ scale: s.scale }}
                              className={`block h-11 w-11 rounded-full border-2 ${on ? 'border-ember bg-ember/20' : 'border-cream/30'}`}
                              style={{ boxShadow: on ? '0 0 24px rgba(214,40,40,.45)' : 'none' }}
                            />
                          </span>
                          <span>
                            <span className="block font-display text-2xl leading-none">{s.label}</span>
                            <span className="mt-1 block text-xs text-cream/50">
                              {s.note}
                              {s.delta > 0 && <span className="text-cream/75"> · +{money(s.delta)}</span>}
                            </span>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </Group>

                <Group title="Crust">
                  <div className="relative grid grid-cols-2 gap-1 rounded-2xl bg-cream/[0.04] p-1 ring-1 ring-cream/10">
                    {CRUSTS.map((c) => {
                      const on = crust === c.id
                      return (
                        <button
                          key={c.id}
                          onClick={() => setCrust(c.id)}
                          aria-pressed={on}
                          className="relative rounded-xl px-4 py-3 text-left"
                        >
                          {on && (
                            <motion.span
                              layoutId="crust-pill"
                              className="absolute inset-0 rounded-xl bg-cream"
                              transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                            />
                          )}
                          <span className={`relative block text-sm font-semibold transition-colors ${on ? 'text-ink' : 'text-cream'}`}>
                            {c.label}
                            {c.delta > 0 && <span className={on ? 'text-ink/60' : 'text-cream/50'}> +{money(c.delta)}</span>}
                          </span>
                          <span className={`relative mt-0.5 block text-xs transition-colors ${on ? 'text-ink/60' : 'text-cream/45'}`}>{c.note}</span>
                        </button>
                      )
                    })}
                  </div>
                </Group>

                <Group title="Add-ons" hint="Choose any">
                  <div className="divide-y divide-cream/[0.07] overflow-hidden rounded-2xl bg-cream/[0.03] ring-1 ring-cream/10">
                    {ADDONS.map((a) => {
                      const on = addons.includes(a.id)
                      return (
                        <button
                          key={a.id}
                          onClick={() => toggleAddon(a.id)}
                          aria-pressed={on}
                          className="flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-cream/[0.04]"
                        >
                          <span
                            className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg ring-1 transition-all duration-300 ${
                              on ? 'bg-ember text-cream ring-ember shadow-[0_0_16px_rgba(214,40,40,.6)]' : 'ring-cream/25'
                            }`}
                          >
                            <motion.span initial={false} animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={{ type: 'spring', stiffness: 600, damping: 28 }}>
                              <Check className="h-3.5 w-3.5" />
                            </motion.span>
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium">{a.label}</span>
                            <span className="block text-xs text-cream/45">{a.note}</span>
                          </span>
                          <span className="text-sm tabular-nums text-cream/70">+{money(a.delta)}</span>
                        </button>
                      )
                    })}
                  </div>
                </Group>
              </div>
            ) : (
              <div className="mt-8 rounded-2xl bg-cream/[0.03] p-4 text-sm leading-relaxed text-cream/55 ring-1 ring-cream/10">
                Packed separately so it arrives exactly as it left the pass.
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="flex shrink-0 items-center gap-3 border-t border-cream/[0.08] bg-[#151210]/80 px-5 py-4 backdrop-blur-xl md:px-9 md:py-5"
            style={{ paddingBottom: desktop ? undefined : 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <Stepper value={qty} onDec={() => setQty((q) => Math.max(1, q - 1))} onInc={() => setQty((q) => q + 1)} />
            <button onClick={() => onAdd(item, opts, qty)} className="btn-ember h-14 flex-1 text-[15px]">
              <span>Add to Order</span>
              <span className="h-4 w-px bg-cream/30" />
              <span className="relative inline-flex overflow-hidden tabular-nums">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={total}
                    initial={{ y: 16, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -16, opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35, ease }}
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
