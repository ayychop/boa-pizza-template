import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Photo from './Photo'
import { Arrow, Flame } from './icons'
import { MENU, PHOTOS, doorTime, isOpenNow, money } from '../data/menu'
import { EASE_OUT, EXPO } from '../motion'

const line = {
  hidden: { transform: 'translateY(105%)' },
  show: (i) => ({ transform: 'translateY(0%)', transition: { duration: 0.9, ease: EXPO, delay: 0.15 + i * 0.1 } }),
}
const rise = (delay) => ({
  initial: { opacity: 0, transform: 'translateY(16px)' },
  animate: { opacity: 1, transform: 'translateY(0px)' },
  transition: { duration: 0.7, ease: EASE_OUT, delay },
})

const FACTS = [
  'Wood-fired at 485°C',
  '90 seconds in the oven',
  '48-hour dough',
  'Free delivery over £35',
  'Tue to Sun, 12pm to 10pm',
  'High Wycombe',
]

// The door time ticks with the clock, so the promise on the first screen is always tonight's.
function useNow(ms = 30000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), ms)
    return () => clearInterval(id)
  }, [ms])
  return now
}

function Ticker() {
  const row = (hidden) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {FACTS.map((f) => (
        <span key={f} className="poster flex items-center gap-6 whitespace-nowrap px-6 text-[1.35rem] md:text-[1.6rem]">
          {f}
          <Flame className="h-4 w-4 text-ink/70" />
        </span>
      ))}
    </div>
  )
  return (
    <div className="ticker-wrap absolute inset-x-0 bottom-0 z-10 overflow-hidden bg-blaze py-3 text-white">
      <div className="ticker">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}

export default function Hero({ mode, onOrder, onOpenItem }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const now = useNow()
  const open = isOpenNow(new Date(now))
  const signature = MENU.find((m) => m.featured)
  const delivery = mode === 'delivery'
  const [revealed, setRevealed] = useState(false)

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[calc(100svh-var(--nav-h)-var(--safe-b))] items-end overflow-hidden md:min-h-[100svh]">
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-10">
        <motion.div
          className="h-full w-full"
          initial={{ transform: 'scale(1.12)' }}
          animate={{ transform: 'scale(1.02)' }}
          transition={{ duration: 2.4, ease: EXPO }}
        >
          <Photo src={PHOTOS.hero} alt="A pizza in front of a blazing wood-fired oven" eager className="h-full w-full" />
        </motion.div>
      </motion.div>
      {/* Scrims only where the type sits (left and bottom), so the pizza on the right stays a pizza. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/35 via-45% to-transparent" />

      <motion.div style={{ opacity: fade }} className="mx-auto w-full max-w-7xl px-5 pb-32 pt-28 md:px-8 md:pb-36">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="min-w-0">
            <h1 className="poster text-[clamp(5rem,23vw,13.5rem)] leading-[0.84]">
              {['Fired at', '485°C.'].map((t, i) => (
                // The mask only exists while the line rises; once it lands the glow is free to spill.
                <span key={t} className={`block pb-[0.04em] ${revealed ? '' : 'overflow-hidden'}`}>
                  <motion.span
                    custom={i}
                    variants={line}
                    initial="hidden"
                    animate="show"
                    onAnimationComplete={() => i === 1 && setRevealed(true)}
                    className={`block ${i === 1 ? 'text-glow text-ember' : ''}`}
                  >
                    {t}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p {...rise(0.45)} className="mt-6 max-w-md text-pretty text-[17px] font-medium leading-relaxed text-cream/85 md:text-lg">
              Hand-stretched 48-hour dough, ninety seconds in a wood-fired oven. Delivery and collection across High Wycombe, Tuesday to Sunday.
            </motion.p>

            <motion.div {...rise(0.6)} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <button onClick={onOrder} className="btn-ember group h-[88px] w-full whitespace-nowrap px-6 text-[1.95rem] sm:w-auto sm:px-12 sm:text-[2.2rem] md:h-24 md:px-14 md:text-[2.5rem]">
                Start your order
                <Arrow className="h-8 w-8 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
              </button>
              {/* The promise: when an order placed now lands. Closed, it counts from the next opening. */}
              <div className="flex items-center justify-between gap-4 sm:block">
                <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-cream/70">
                  <span className={`relative h-2.5 w-2.5 shrink-0 rounded-full ${open ? 'bg-ember' : 'bg-cream/35'}`}>
                    {open && <span className="absolute inset-0 animate-ping rounded-full bg-ember opacity-60" />}
                  </span>
                  {open ? (delivery ? 'Ovens lit. At your door by' : 'Ovens lit. Ready to collect at') : delivery ? 'Closed now. Order ahead, at your door' : 'Closed now. Order ahead, ready at'}
                </div>
                <div className="poster mt-1 whitespace-nowrap text-[2.4rem] tabular-nums text-cream">{doorTime(mode, new Date(now))}</div>
              </div>
            </motion.div>
          </div>

          {signature && (
            <motion.button
              onClick={() => onOpenItem(signature)}
              {...rise(0.8)}
              className="grade-night group hidden w-[340px] text-left lg:block"
            >
              <div className="board overflow-hidden rounded-[20px] p-3 group-active:scale-[0.98]">
                <Photo src={signature.img} alt="" className="aspect-[16/10] w-full rounded-[12px]" imgClassName="transition-transform duration-700 ease-out group-hover:scale-105" />
                <div className="flex items-end justify-between gap-3 px-2 pb-1 pt-4">
                  <div className="min-w-0">
                    <div className="poster truncate text-[2rem]">{signature.name}</div>
                  </div>
                  <div className="poster text-[2.6rem] text-ember">{money(signature.price)}</div>
                </div>
              </div>
            </motion.button>
          )}
        </div>
      </motion.div>

      <Ticker />
    </section>
  )
}
