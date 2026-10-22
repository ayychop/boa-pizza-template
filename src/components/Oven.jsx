import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Photo from './Photo'
import Reveal from './Reveal'
import { PHOTOS } from '../data/menu'

// The process, set as copy: the figure leads in red, the line finishes the thought.
const steps = [
  ['48 hours', 'of cold proof on every dough ball.'],
  ['Four hours', 'to bring the oven up to heat.'],
  ['90 seconds', 'from peel to plate. No longer.'],
]

export default function Oven() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section id="oven" ref={ref} className="relative isolate mt-20 overflow-hidden md:mt-32">
      <div className="absolute inset-0 -z-10">
        <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
          <Photo src={PHOTOS.flames} alt="Oak logs burning with tall orange flames" className="h-full w-full" />
        </motion.div>
        <div className="absolute inset-0 z-[3] bg-gradient-to-r from-ink via-ink/70 to-ink/5" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-ink via-transparent to-ink" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
        <div className="max-w-4xl">
          <Reveal>
            <h2 className="poster text-[clamp(3rem,10.5vw,6rem)] leading-[1] md:leading-[0.9]">
              <span className="block">Two tonnes of brick.</span>
              <span className="text-glow mt-1 block text-ember md:mt-0">Lit at dawn.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-pretty text-[17px] font-medium leading-relaxed text-cream/80">
              Our oven was built by hand in Naples and shipped to Buckinghamshire in pieces. Every crust comes out blistered and leopard-spotted, the edge no electric oven can fake.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 max-w-3xl space-y-4 md:mt-16 md:space-y-5">
          {steps.map(([figure, line], i) => (
            <Reveal key={figure} as="li" delay={0.15 + i * 0.08} className="poster text-balance text-[2.1rem] leading-[1] md:text-[3.25rem]">
              <span className="text-ember">{figure}</span> {line}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
