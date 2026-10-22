import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Photo from './Photo'
import Logo from './Logo'
import { Check, Close } from './icons'
import { PHOTOS, money } from '../data/menu'

const ease = [0.16, 1, 0.3, 1]
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
      Array.from({ length: 26 }, (_, i) => ({
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
          style={{ left: `${e.left}%`, width: e.size, height: e.size, boxShadow: `0 0 ${e.size * 4}px ${e.size}px rgba(244,115,42,.55)` }}
          initial={{ y: 0, x: 0, opacity: 0 }}
          animate={{ y: '-110vh', x: e.drift, opacity: [0, 1, 0.8, 0] }}
          transition={{ duration: e.dur, delay: e.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

function CoreNode({ stage, done }) {
  return (
    <div className="relative grid h-36 w-36 place-items-center md:h-48 md:w-48">
      {[0, 0.8, 1.6].map((d) => (
        <motion.span
          key={d}
          className="absolute inset-0 rounded-full border border-ember/70"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: [1, 2.3], opacity: [0.7, 0] }}
          transition={{ duration: 2.4, delay: d, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(214,40,40,.55) 0%, rgba(214,40,40,0) 70%)' }}
        animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="relative grid h-[72%] w-[72%] place-items-center rounded-full ring-1 ring-cream/25"
        style={{ background: 'radial-gradient(circle at 35% 30%, #f4732a 0%, #d62828 45%, #7a1414 100%)' }}
        animate={{
          boxShadow: [
            '0 0 40px 6px rgba(214,40,40,.55), inset 0 2px 10px rgba(255,220,190,.35)',
            '0 0 90px 22px rgba(214,40,40,.75), inset 0 2px 10px rgba(255,220,190,.35)',
            '0 0 40px 6px rgba(214,40,40,.55), inset 0 2px 10px rgba(255,220,190,.35)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={done ? 'done' : stage}
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 0.6, ease }}
            className="font-display text-5xl italic leading-none text-cream md:text-6xl"
          >
            {done ? <Check className="h-12 w-12 md:h-14 md:w-14" /> : `0${stage + 1}`}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function Track({ stages, stage, runKey }) {
  const last = stages.length - 1
  return (
    <div className="relative mx-auto w-full max-w-4xl px-8 md:px-12">
      <div className="relative h-[3px] rounded-full bg-cream/10">
        {stage < last && (
          <motion.div
            key={`pending-${runKey}-${stage}`}
            className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-flame/35"
            initial={{ scaleX: stage / last }}
            animate={{ scaleX: (stage + 1) / last }}
            transition={{ duration: STAGE_MS / 1000, ease: 'linear' }}
          />
        )}
        <motion.div
          className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-flame via-ember to-ember shadow-[0_0_18px_rgba(214,40,40,.9)]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: stage / last }}
          transition={{ type: 'spring', stiffness: 70, damping: 18 }}
        />
        {stages.map((s, i) => {
          const reached = i <= stage
          const active = i === stage
          return (
            <div key={s.title} className="absolute top-1/2 h-0 w-0" style={{ left: `${(i / last) * 100}%` }}>
              {active && (
                <motion.span
                  className="absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember"
                  animate={{ scale: [1, 3], opacity: [0.7, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <motion.span
                className="absolute left-0 top-0 block -translate-x-1/2 -translate-y-1/2 rounded-full"
                animate={{
                  width: active ? 18 : 12,
                  height: active ? 18 : 12,
                  backgroundColor: reached ? '#D62828' : '#0C0A09',
                  borderColor: reached ? '#F5EFE0' : 'rgba(245,239,224,0.28)',
                  boxShadow: reached ? '0 0 22px 4px rgba(214,40,40,.75)' : '0 0 0 0 rgba(0,0,0,0)',
                }}
                transition={{ duration: 0.6, ease, delay: reached ? 0.25 : 0 }}
                style={{ borderWidth: 2, borderStyle: 'solid' }}
              />
              <span
                className={`absolute left-0 top-5 hidden -translate-x-1/2 whitespace-nowrap text-xs font-medium transition-colors duration-500 md:block ${
                  active ? 'text-cream' : reached ? 'text-cream/70' : 'text-cream/35'
                }`}
              >
                {s.title}
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

  return (
    <motion.div
      className="fixed inset-0 z-[60] overflow-hidden bg-ink"
      initial={{ clipPath: 'circle(0% at 50% 100%)' }}
      animate={{ clipPath: 'circle(150% at 50% 100%)' }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label="Order tracker"
    >
      {/* Cinematic background, crossfading per stage with a slow push-in */}
      <AnimatePresence>
        <motion.div
          key={current.img}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.18 }}
          animate={{ opacity: 1, scale: 1.04 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.6, ease: 'easeInOut' }, scale: { duration: 9, ease: 'linear' } }}
        >
          <Photo src={current.img} alt="" eager className="h-full w-full" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(12,10,9,.25) 0%, rgba(12,10,9,.92) 100%)' }} />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      <Embers />

      <div className="relative flex h-full flex-col" style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        {/* Top bar */}
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 py-5 md:px-8">
          <Logo />
          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={() => setReceipt((r) => !r)} className="glass-soft flex h-11 items-center gap-2 whitespace-nowrap rounded-full px-4 text-sm" aria-expanded={receipt}>
                <span className="hidden text-cream/50 sm:inline">#{order.number}</span>
                <span className="tabular-nums">
                  {count} {count === 1 ? 'item' : 'items'} · {money(order.total)}
                </span>
              </button>
              <AnimatePresence>
                {receipt && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.35, ease }}
                    className="glass absolute right-0 top-[calc(100%+10px)] z-10 w-[min(320px,calc(100vw-2.5rem))] origin-top-right rounded-2xl p-5"
                  >
                    <div className="eyebrow">Order #{order.number}</div>
                    <ul className="mt-3 space-y-2.5 text-sm">
                      {order.lines.map((l) => (
                        <li key={l.key} className="flex justify-between gap-3">
                          <span className="min-w-0">
                            <span className="text-cream/50">{l.qty}×</span> {l.name}
                            {l.summary && <span className="block truncate text-xs text-cream/40">{l.summary}</span>}
                          </span>
                          <span className="tabular-nums text-cream/80">{money(l.unit * l.qty)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="hairline my-4" />
                    <div className="flex justify-between text-sm">
                      <span className="text-cream/60">{order.mode === 'delivery' ? 'Delivery' : 'Collection'}</span>
                      <span className="tabular-nums">{order.fee > 0 ? money(order.fee) : 'Free'}</span>
                    </div>
                    <div className="mt-1 flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="tabular-nums">{money(order.total)}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={onExit} aria-label="Close tracker and return to menu" className="glass-soft grid h-11 w-11 place-items-center rounded-full hover:bg-cream/15">
              <Close className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Centre stage */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <motion.div
            className="eyebrow mb-8 text-cream/60"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease }}
          >
            Stage <span className="tabular-nums text-cream">0{stage + 1}</span> of 0{stages.length}
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 1, ease }}>
            <CoreNode stage={stage} done={done} />
          </motion.div>

          <div className="mt-10 min-h-[9.5rem] md:mt-12 md:min-h-[11rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${runKey}-${stage}`}
                initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -16, filter: 'blur(8px)', transition: { duration: 0.35, ease: 'easeIn' } }}
                transition={{ duration: 0.7, ease }}
              >
                <h1 className="text-balance font-display text-[clamp(2.4rem,7.5vw,6rem)] italic leading-[0.95] tracking-[-0.02em]">{current.title}</h1>
                <p className="mx-auto mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-cream/65 md:text-base">{current.copy}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 h-14">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.4 }}
                  className="flex flex-wrap justify-center gap-3"
                >
                  <button onClick={onExit} className="btn-ember h-12 text-sm">
                    Back to menu
                  </button>
                  <button onClick={replay} className="btn-ghost h-12 text-sm">
                    Replay tracker
                  </button>
                </motion.div>
              ) : (
                <motion.div key="eta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-soft inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm text-cream/75">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flame" />
                  {order.mode === 'delivery' ? 'Arriving around' : 'Ready around'} <span className="font-semibold tabular-nums text-cream">{order.eta}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress line */}
        <motion.div
          className="pb-10 pt-6 md:pb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9, ease }}
        >
          <Track stages={stages} stage={stage} runKey={runKey} />
          <p className="mt-6 text-center text-xs text-cream/45 md:hidden">
            {done ? 'Buon appetito.' : `Next: ${stages[stage + 1].title}`}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
