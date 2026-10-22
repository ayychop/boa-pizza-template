import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Photo from './Photo'
import Reveal from './Reveal'
import { Check, Plus } from './icons'
import { CATEGORIES, MENU, money } from '../data/menu'

function Tag({ t }) {
  const hot = t === 'Hot'
  const sig = t === 'Signature'
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
        hot ? 'bg-ember/15 text-[#ff8a7a]' : sig ? 'bg-flame/15 text-flame' : 'bg-cream/[0.07] text-cream/60'
      }`}
    >
      {t}
    </span>
  )
}

function PizzaCard({ item, onOpen, i, featured }) {
  return (
    <Reveal delay={(i % 3) * 0.08} className={featured ? 'h-full sm:col-span-2' : ''}>
      <button
        onClick={() => onOpen(item)}
        className="group relative block h-full w-full overflow-hidden rounded-[28px] bg-coal text-left ring-1 ring-cream/[0.06] transition-[transform,box-shadow] duration-700 ease-expo hover:-translate-y-1.5 hover:shadow-[0_30px_80px_-30px_rgba(214,40,40,0.45)] hover:ring-cream/[0.12]"
      >
        <div className={`relative ${featured ? 'aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-full' : 'aspect-[4/5]'}`}>
          <Photo
            src={item.img}
            alt={item.name}
            className="absolute inset-0"
            imgClassName="transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 z-[3] bg-gradient-to-t from-ink via-ink/30 to-transparent" />
          <div className="absolute left-4 top-4 z-[4] flex gap-1.5">
            {item.tags.map((t) => (
              <Tag key={t} t={t} />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 z-[4] p-5 md:p-6">
            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0">
                <h3 className={`font-display leading-[1.02] tracking-tight ${featured ? 'text-4xl md:text-5xl' : 'text-[1.7rem]'}`}>
                  <span className="italic">{item.name}</span>
                </h3>
                <p className={`mt-2 text-pretty text-sm leading-relaxed text-cream/65 ${featured ? 'max-w-md' : 'line-clamp-2'}`}>{item.desc}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm text-cream/55">
                from <span className="font-semibold tabular-nums text-cream">{money(item.price)}</span>
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-cream text-ink transition-all duration-500 ease-expo group-hover:bg-ember group-hover:text-cream group-hover:rotate-90">
                <Plus className="h-5 w-5" />
              </span>
            </div>
          </div>
        </div>
      </button>
    </Reveal>
  )
}

function SimpleCard({ item, onOpen, onQuickAdd, i }) {
  const [added, setAdded] = useState(false)
  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(false), 1400)
    return () => clearTimeout(t)
  }, [added])

  return (
    <Reveal delay={(i % 2) * 0.08}>
      <div className="group relative flex items-center gap-4 rounded-3xl bg-coal p-3 pr-4 ring-1 ring-cream/[0.06] transition-colors duration-500 hover:bg-smoke hover:ring-cream/[0.1]">
        <button onClick={() => onOpen(item)} className="flex min-w-0 flex-1 items-center gap-4 text-left">
          <Photo
            src={item.img}
            alt={item.name}
            className="h-24 w-24 shrink-0 rounded-2xl"
            imgClassName="transition-transform duration-[1.2s] ease-expo group-hover:scale-110"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-display text-xl italic">{item.name}</h3>
              {item.tags.map((t) => (
                <Tag key={t} t={t} />
              ))}
            </div>
            <p className="mt-1 line-clamp-2 text-sm leading-snug text-cream/55">{item.desc}</p>
            <div className="mt-2 text-sm font-semibold tabular-nums">{money(item.price)}</div>
          </div>
        </button>
        <button
          onClick={() => {
            onQuickAdd(item)
            setAdded(true)
          }}
          aria-label={`Add ${item.name} to order`}
          className={`relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full transition-colors duration-300 ${
            added ? 'bg-ember text-cream' : 'bg-cream/[0.08] text-cream hover:bg-cream hover:text-ink'
          }`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={added ? 'y' : 'n'}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {added ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </Reveal>
  )
}

function CategoryTabs({ active, onPick }) {
  return (
    <div className="sticky top-16 z-30 -mx-5 mb-4 px-5 py-3 md:top-[72px] md:-mx-8 md:px-8">
      <div className="absolute inset-0 bg-ink/75 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black_70%,transparent)]" />
      <div className="no-scrollbar relative flex gap-1.5 overflow-x-auto">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => onPick(c.id)}
            className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
              active === c.id ? 'text-ink' : 'text-cream/60 hover:text-cream'
            }`}
          >
            {active === c.id && (
              <motion.span
                layoutId="cat-pill"
                className="absolute inset-0 rounded-full bg-cream"
                transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              />
            )}
            <span className="relative">{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Menu({ onOpen, onQuickAdd, onNav }) {
  const [active, setActive] = useState(CATEGORIES[0].id)

  // Scroll spy for the category tabs (this one keeps observing by design).
  useEffect(() => {
    const els = CATEGORIES.map((c) => document.getElementById(`cat-${c.id}`)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id.replace('cat-', '')))
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="menu" className="relative mx-auto max-w-7xl px-5 pt-20 md:px-8 md:pt-32">
      <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-[1fr_auto] md:items-end">
        <Reveal>
          <div className="eyebrow mb-4">La Carta</div>
          <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em]">
            Tonight&rsquo;s <span className="italic">menu</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-pretty text-[15px] leading-relaxed text-cream/60">
            Every pizza is stretched by hand when you order, never before. Choose a size, a crust and anything extra.
          </p>
        </Reveal>
      </div>

      <CategoryTabs active={active} onPick={(id) => onNav(`cat-${id}`, -132)} />

      <div className="space-y-20 pb-10 md:space-y-28">
        {CATEGORIES.map((cat, ci) => {
          const items = MENU.filter((m) => m.cat === cat.id)
          const pizza = items[0]?.kind === 'pizza'
          return (
            <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-40">
              <Reveal className="mb-8 flex items-baseline gap-5 border-b border-cream/[0.08] pb-5">
                <span className="font-display text-sm tabular-nums text-ember">0{ci + 1}</span>
                <h3 className="font-display text-3xl italic md:text-4xl">{cat.label}</h3>
                <p className="ml-auto hidden max-w-xs text-right text-sm text-cream/50 md:block">{cat.blurb}</p>
              </Reveal>
              {pizza ? (
                <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
                  {items.map((item, i) => (
                    <PizzaCard key={item.id} item={item} onOpen={onOpen} i={i} featured={item.featured} />
                  ))}
                </div>
              ) : (
                <div className="grid gap-3 md:grid-cols-2 md:gap-4">
                  {items.map((item, i) => (
                    <SimpleCard key={item.id} item={item} onOpen={onOpen} onQuickAdd={onQuickAdd} i={i} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
