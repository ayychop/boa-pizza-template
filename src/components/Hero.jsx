import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Photo from './Photo'
import { Arrow, Clock, Phone } from './icons'
import { BUSINESS, MENU, PHOTOS, isOpenNow, money } from '../data/menu'

const ease = [0.16, 1, 0.3, 1]
const line = {
  hidden: { y: '110%' },
  show: (i) => ({ y: '0%', transition: { duration: 1.2, ease, delay: 0.25 + i * 0.12 } }),
}

export default function Hero({ onOrder, onOpenItem }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const open = isOpenNow()
  const signature = MENU.find((m) => m.featured)

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-10">
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.14 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 2.8, ease }}
        >
          <Photo src={PHOTOS.hero} alt="A Neapolitan pizza resting in front of a burning wood-fired oven" eager className="h-full w-full" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />

      <motion.div style={{ opacity: fade }} className="mx-auto w-full max-w-7xl px-5 pb-28 pt-32 md:px-8 md:pb-20">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
              className="mb-7 flex flex-wrap items-center gap-3"
            >
              <span className="glass-soft inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-cream/85">
                <span className={`relative h-2 w-2 rounded-full ${open ? 'bg-emerald-400' : 'bg-ember'}`}>
                  <span className={`absolute inset-0 animate-ping rounded-full ${open ? 'bg-emerald-400' : 'bg-ember'} opacity-60`} />
                </span>
                {open ? 'Open now, ovens lit' : 'Closed now, ordering ahead'}
              </span>
              <span className="eyebrow">Wood-fired Neapolitan</span>
            </motion.div>

            <h1 className="font-display text-[clamp(3.1rem,10vw,8.5rem)] font-normal leading-[0.9] tracking-[-0.03em]">
              {['Fire, flour', 'and patience.'].map((t, i) => (
                <span key={t} className="block overflow-hidden pb-[0.08em]">
                  <motion.span custom={i} variants={line} initial="hidden" animate="show" className={`block ${i === 1 ? 'italic' : ''}`}>
                    {i === 1 ? (
                      <>
                        and <span className="ember-text">patience.</span>
                      </>
                    ) : (
                      t
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.7 }}
              className="mt-7 max-w-md text-pretty text-[15px] leading-relaxed text-cream/70 md:text-base"
            >
              Dough proved for forty-eight hours, then ninety seconds in an oak-fired oven at 485°C. Collection or delivery across High Wycombe, Tuesday to Sunday.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.85 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <button onClick={onOrder} className="btn-ember group h-14 px-8 text-[15px]">
                Start your order
                <Arrow className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-1" />
              </button>
              <a href={BUSINESS.phoneHref} className="btn-ghost h-14 px-7 text-[15px]">
                <Phone className="h-4 w-4" />
                {BUSINESS.phone}
              </a>
            </motion.div>
          </div>

          {signature && (
            <motion.button
              onClick={() => onOpenItem(signature)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease, delay: 1 }}
              className="glass group hidden w-[320px] items-center gap-4 rounded-3xl p-3 pr-5 text-left transition-transform duration-500 ease-expo hover:-translate-y-1 lg:flex"
            >
              <Photo src={signature.img} alt="" className="h-20 w-20 shrink-0 rounded-2xl" />
              <div className="min-w-0">
                <div className="eyebrow text-flame/90">House signature</div>
                <div className="mt-1 font-display text-xl italic">{signature.name}</div>
                <div className="mt-1 flex items-center gap-2 text-sm text-cream/60">
                  from {money(signature.price)}
                  <Arrow className="h-3.5 w-3.5 transition-transform duration-500 ease-expo group-hover:translate-x-1" />
                </div>
              </div>
            </motion.button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-14 hidden items-center gap-8 border-t border-cream/10 pt-6 text-sm text-cream/55 md:flex"
        >
          <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> Tue to Sun, 12:00pm to 10:00pm</span>
          <span>Delivery in 35 to 45 min</span>
          <span>Collection in 20 min</span>
          <span className="ml-auto">Free delivery over £35</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
