import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Photo from './Photo'
import Reveal from './Reveal'
import { PHOTOS } from '../data/menu'

const stats = [
  ['485°C', 'Floor of the oven, fed with seasoned oak'],
  ['48h', 'Cold proof on every dough ball'],
  ['90s', 'From peel to plate, no longer'],
]

export default function Oven() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="oven" ref={ref} className="relative mx-auto mt-20 max-w-7xl px-5 md:mt-32 md:px-8">
      <div className="grid gap-10 overflow-hidden rounded-[36px] bg-coal ring-1 ring-cream/[0.06] lg:grid-cols-2">
        <div className="relative min-h-[380px] overflow-hidden lg:min-h-[620px]">
          <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
            <Photo src={PHOTOS.flames} alt="A pizzaiolo working beside open flames" className="h-full w-full" />
          </motion.div>
          <div className="absolute inset-0 z-[3] bg-gradient-to-t from-coal via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-coal" />
        </div>
        <div className="flex flex-col justify-center px-6 pb-10 lg:py-16 lg:pl-4 lg:pr-14">
          <Reveal>
            <div className="eyebrow mb-5">Il Forno</div>
            <h2 className="text-balance font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98] tracking-[-0.02em]">
              Two tonnes of brick, <span className="italic">lit at dawn.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-pretty text-[15px] leading-relaxed text-cream/60">
              Our oven was built by hand in Naples and shipped to Buckinghamshire in pieces. It takes four hours to come up to heat, and it gives every crust the blistered, leopard-spotted cornicione that no electric oven can fake.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-cream/[0.08] pt-8">
            {stats.map(([n, l], i) => (
              <Reveal key={n} delay={0.15 + i * 0.08}>
                <div className="font-display text-3xl md:text-5xl">{n}</div>
                <div className="mt-2 text-xs leading-snug text-cream/50 md:text-sm">{l}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
