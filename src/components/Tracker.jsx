import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Photo from './Photo'
import Logo from './Logo'
import { Check, Close, Moto, Store } from './icons'
import { PHOTOS, money } from '../data/menu'
import { EASE_IN_OUT, EASE_OUT, EXPO } from '../motion'
const STAGE_MS = 4000

const stagesFor = (mode) => [
  { title: 'Order Received', short: 'Received', copy: 'Your ticket is on the rail and the pass has called it.', img: PHOTOS.hero },
  { title: 'Dough Stretched', short: 'Stretched', copy: 'A 48-hour dough ball, opened by hand. Never a rolling pin.', img: PHOTOS.crust },
  { title: 'In the Wood-Fired Oven', short: 'In the oven', copy: 'Ninety seconds on the stone at 485°C, turned twice over oak.', img: PHOTOS.flames },
  { title: 'Quality Checked', short: 'Checked', copy: 'Leopard spots, a soft centre and a final thread of olive oil.', img: PHOTOS.buffalo },
  mode === 'pickup'
    ? { title: 'Ready to Collect', short: 'Ready', copy: 'Boxed and waiting on the pass. Come and get it while it sings.', img: PHOTOS.box }
    : { title: 'Out for Delivery', short: 'On its way', copy: 'Boxed, sealed and on the road to you while it is still singing.', img: PHOTOS.box },
]

function Embers() {
  const embers = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1.5 + Math.random() * 3,
        dur: 6 + Math.random() * 7,
        delay: Math.random() * 8,
        drift: (Math.random() - 0.5) * 120,
      })),
    [],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {embers.map((e) => (
        <motion.span
          key={e.id}
          className="absolute bottom-[-5%] rounded-full bg-flame"
          style={{ left: `${e.left}%`, width: e.size, height: e.size, boxShadow: `0 0 ${e.size * 4}px ${e.size}px rgba(255,90,40,.55)` }}
          initial={{ y: 0, x: 0, opacity: 0 }}
          animate={{ y: '-110vh', x: e.drift, opacity: [0, 1, 0.8, 0] }}
          transition={{ duration: e.dur, delay: e.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

// The stage number is the hero of the screen: huge, red and lit, with heat pulsing out behind it.
function StageNumber({ stage, done }) {
  return (
    <div className="relative grid h-[10.5rem] w-[10.5rem] place-items-center md:h-[15rem] md:w-[15rem]">
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,46,46,.42) 0%, rgba(255,46,46,0) 68%)' }}
        animate={{ transform: ['scale(0.92)', 'scale(1.12)', 'scale(0.92)'], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {[0, 1.3].map((d) => (
        <motion.span
          key={d}
          className="absolute inset-[18%] rounded-full border-2 border-ember/50"
          initial={{ transform: 'scale(1)', opacity: 0 }}
          animate={{ transform: ['scale(1)', 'scale(1.6)'], opacity: [0.55, 0] }}
          transition={{ duration: 2.6, delay: d, repeat: Infinity, ease: EASE_OUT }}
        />
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={done ? 'done' : stage}
          initial={{ opacity: 0, transform: 'translateY(35%) scale(0.9)', filter: 'blur(8px)' }}
          animate={{ opacity: 1, transform: 'translateY(0%) scale(1)', filter: 'blur(0px)' }}
          exit={{ opacity: 0, transform: 'translateY(-35%) scale(0.95)', filter: 'blur(8px)', transition: { duration: 0.25, ease: EASE_OUT } }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="poster relative text-[9rem] leading-none text-ember md:text-[13rem]"
          style={{ textShadow: '0 0 40px rgba(255,46,46,.75), 0 0 90px rgba(255,46,46,.45), 0 0 4px rgba(255,140,140,.6)' }}
        >
          {done ? <Check className="h-28 w-28 md:h-40 md:w-40" strokeWidth={2.6} style={{ filter: 'drop-shadow(0 0 22px rgba(255,46,46,.8))' }} /> : stage + 1}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

// Drawn on the paper ticket: ink for what is pending, red for what has happened.
function Track({ stages, stage, runKey }) {
  const last = stages.length - 1
  return (
    <div className="relative w-full px-3 md:px-10">
      <div className="relative h-3 rounded-full bg-ink/[0.12]">
        {stage < last && (
          <motion.div
            key={`pending-${runKey}-${stage}`}
            className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-blaze/25"
            initial={{ transform: `scaleX(${stage / last})` }}
            animate={{ transform: `scaleX(${(stage + 1) / last})` }}
            transition={{ duration: STAGE_MS / 1000, ease: 'linear' }}
          />
        )}
        <motion.div
          className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-blaze shadow-[0_0_14px_rgba(255,46,46,.55)]"
          initial={{ transform: 'scaleX(0)' }}
          animate={{ transform: `scaleX(${stage / last})` }}
          transition={{ type: 'spring', duration: 0.9, bounce: 0.1 }}
        />
        {stages.map((s, i) => {
          const reached = i <= stage
          const active = i === stage
          return (
            <div key={s.title} className="absolute top-1/2 h-0 w-0" style={{ left: `${(i / last) * 100}%` }}>
              {active && (
                <motion.span
                  className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-blaze"
                  animate={{ transform: ['scale(1)', 'scale(2.4)'], opacity: [0.55, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: EASE_OUT }}
                />
              )}
              <motion.span
                className="absolute left-0 top-0 block -translate-x-1/2 -translate-y-1/2 rounded-full"
                animate={{
                  width: active ? 26 : 18,
                  height: active ? 26 : 18,
                  backgroundColor: reached ? '#E60000' : '#F5EFE0',
                  borderColor: reached ? '#F5EFE0' : 'rgba(10,10,10,0.35)',
                  boxShadow: reached ? '0 0 0 2px #E60000, 0 0 16px 2px rgba(255,46,46,.5)' : '0 0 0 0 rgba(0,0,0,0)',
                }}
                transition={{ duration: 0.45, ease: EASE_OUT, delay: reached ? 0.2 : 0 }}
                style={{ borderWidth: 3, borderStyle: 'solid' }}
              />
              <span
                className={`absolute left-0 top-6 hidden -translate-x-1/2 whitespace-nowrap text-xs font-extrabold uppercase tracking-[0.06em] transition-colors duration-300 md:block ${
                  active ? 'text-blaze' : reached ? 'text-ink' : 'text-ink/45'
                }`}
              >
                {s.short}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Tracker({ order, onExit }) {
  const stages = useMemo(() => stagesFor(order.mode), [order.mode])
  const last = stages.length - 1
  const [stage, setStage] = useState(0)
  const [runKey, setRunKey] = useState(0)
  const [receipt, setReceipt] = useState(false)
  const done = stage === last

  // Demo timer: advance one stage every 4 seconds until the final stage.
  useEffect(() => {
    const id = setInterval(() => {
      setStage((s) => {
        if (s >= last) {
          clearInterval(id)
          return s
        }
        return s + 1
      })
    }, STAGE_MS)
    return () => clearInterval(id)
  }, [runKey, last])

  const replay = () => {
    setStage(0)
    setRunKey((k) => k + 1)
  }

  const current = stages[stage]
  const count = order.lines.reduce((n, l) => n + l.qty, 0)
  const delivery = order.mode === 'delivery'
  const ModeIcon = delivery ? Moto : Store

  return (
    <motion.div
      className="fixed inset-0 z-[60] overflow-hidden bg-ink"
      initial={{ clipPath: 'circle(0% at 50% 100%)' }}
      animate={{ clipPath: 'circle(150% at 50% 100%)' }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: EASE_OUT } }}
      transition={{ duration: 1.1, ease: EASE_IN_OUT }}
      role="dialog"
      aria-modal="true"
      aria-label="Order tracker"
    >
      {/* Cinematic background, crossfading per stage with a slow push-in */}
      <AnimatePresence>
        <motion.div
          key={current.img}
          className="absolute inset-0"
          initial={{ opacity: 0, transform: 'scale(1.14)' }}
          animate={{ opacity: 1, transform: 'scale(1.03)' }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4, ease: EASE_IN_OUT }, transform: { duration: 9, ease: 'linear' } }}
        >
          <Photo src={current.img} alt="" eager className="h-full w-full" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-ink/60" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(10,10,10,.2) 0%, rgba(10,10,10,.94) 100%)' }} />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
      <Embers />

      <div className="relative flex h-full flex-col" style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        {/* Top bar */}
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 py-4 md:px-8 md:py-5">
          <Logo compact />
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setReceipt((r) => !r)}
                className="glass-soft flex h-11 items-center gap-2 whitespace-nowrap rounded-[12px] px-4 text-sm font-bold"
                aria-expanded={receipt}
                aria-label={`Order ${order.number}, ${count} ${count === 1 ? 'item' : 'items'}, ${money(order.total)}. Show receipt`}
              >
                <span className="hidden text-cream/60 sm:inline">#{order.number}</span>
                <span className="tabular-nums">
                  {count} {count === 1 ? 'item' : 'items'} · {money(order.total)}
                </span>
              </button>
              <AnimatePresence>
                {receipt && (
                  <motion.div
                    initial={{ opacity: 0, transform: 'translateY(-6px) scale(0.97)' }}
                    animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
                    exit={{ opacity: 0, transform: 'translateY(-4px) scale(0.98)', transition: { duration: 0.15, ease: EASE_OUT } }}
                    transition={{ duration: 0.22, ease: EASE_OUT }}
                    className="glass absolute right-0 top-[calc(100%+10px)] z-10 w-[min(320px,calc(100vw-2.5rem))] origin-top-right rounded-[16px] p-5"
                  >
                    <div className="poster text-[1.6rem]">Order {order.number}</div>
                    <ul className="mt-3 space-y-2.5 text-sm">
                      {order.lines.map((l) => (
                        <li key={l.key} className="flex justify-between gap-3">
                          <span className="min-w-0 font-semibold">
                            <span className="text-ember">{l.qty}×</span> {l.name}
                            {l.summary && <span className="block truncate text-xs font-medium text-cream/55">{l.summary}</span>}
                          </span>
                          <span className="font-bold tabular-nums">{money(l.unit * l.qty)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="hairline my-4" />
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-cream/65">{delivery ? 'Delivery' : 'Collection'}</span>
                      <span className="tabular-nums">{order.fee > 0 ? money(order.fee) : 'Free'}</span>
                    </div>
                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="poster text-xl">Total</span>
                      <span className="poster text-[1.75rem] tabular-nums text-ember">{money(order.total)}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={onExit} aria-label="Close tracker and return to menu" className="glass-soft grid h-11 w-11 place-items-center rounded-[12px]">
              <Close className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Centre stage */}
        <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
          <motion.div
            initial={{ opacity: 0, transform: 'scale(0.85)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            transition={{ delay: 0.6, duration: 0.9, ease: EXPO }}
          >
            <StageNumber stage={stage} done={done} />
          </motion.div>

          {/* The numeral already says which stage; the count is announced, not printed. */}
          <p className="sr-only" aria-live="polite">
            Stage {stage + 1} of {stages.length}: {current.title}
          </p>

          {/* Stage copy: the outgoing line lifts away quickly; the incoming one rises in on a strong ease-out.
              Exit faster than enter so the change never feels like waiting. */}
          <div className="mt-3 min-h-[9rem] md:min-h-[11.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${runKey}-${stage}`}
                initial={{ opacity: 0, transform: 'translateY(20px)', filter: 'blur(8px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }}
                exit={{ opacity: 0, transform: 'translateY(-12px)', filter: 'blur(6px)', transition: { duration: 0.24, ease: EASE_OUT } }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
              >
                <h1 className="poster text-balance text-[clamp(3.25rem,9vw,7.5rem)] leading-[0.88]">{current.title}</h1>
                <motion.p
                  className="mx-auto mt-4 max-w-md text-pretty text-base font-medium leading-relaxed text-cream/80 md:text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.08, duration: 0.5, ease: EASE_OUT }}
                >
                  {current.copy}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom sheet: the order's kitchen ticket. Header line, a tear line, the ETA, then progress. */}
        <motion.div
          className="mx-auto w-full max-w-3xl px-4 pb-4 md:px-8 md:pb-10"
          initial={{ opacity: 0, transform: 'translateY(32px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ delay: 0.95, duration: 0.8, ease: EXPO }}
        >
          <div className="ticket-wrap">
          <div className="ticket rounded-b-[18px] px-5 pb-6 pt-6 md:px-8 md:pb-10 md:pt-7">
            <div className="flex items-baseline justify-between gap-3 border-b-2 border-dashed border-ink/20 pb-3 text-[11px] font-extrabold uppercase tracking-[0.1em] text-ink/60">
              <span>
                Ticket <span className="tabular-nums text-ink">{order.number}</span>
              </span>
              <span className="tabular-nums">
                {count} {count === 1 ? 'item' : 'items'} · {money(order.total)}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-ink/60">
                  {done ? (delivery ? 'On its way, arriving around' : 'Ready now, collect by') : delivery ? 'Arriving around' : 'Ready around'}
                </div>
                <div className="poster mt-1 text-[2.75rem] tabular-nums text-ink md:text-[3.5rem]">{order.eta}</div>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, transform: 'translateY(8px)' }}
                    animate={{ opacity: 1, transform: 'translateY(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.3 }}
                    className="flex shrink-0 flex-col gap-2 sm:flex-row"
                  >
                    <button onClick={onExit} className="btn-ember h-12 px-5 text-lg">
                      Back to menu
                    </button>
                    <button
                      onClick={replay}
                      className="inline-flex h-12 items-center justify-center rounded-[12px] border-2 border-ink/25 px-5 font-display text-lg uppercase tracking-[0.02em] text-ink transition-[border-color,transform] duration-200 ease-out hover:border-blaze active:scale-[0.97]"
                    >
                      Replay
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="mode"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    className="flex shrink-0 items-center gap-2.5 rounded-[12px] bg-ink px-3.5 py-2.5 text-cream"
                  >
                    <ModeIcon className="h-6 w-6 text-ember" />
                    <span className="text-sm font-extrabold uppercase tracking-[0.06em]">{delivery ? 'Delivery' : 'Collection'}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 md:mt-7">
              <Track stages={stages} stage={stage} runKey={runKey} />
            </div>
            <p className="mt-5 text-center text-xs font-bold uppercase tracking-[0.08em] text-ink/60 md:hidden">
              {done ? 'Buon appetito.' : `Next: ${stages[stage + 1].short}`}
            </p>
          </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
