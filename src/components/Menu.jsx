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
      className={`rounded-md px-2 py-1 text-[11px] font-extrabold uppercase leading-none tracking-[0.06em] ${
        hot ? 'bg-blaze text-white' : sig ? 'bg-cream text-ink' : 'bg-ink/75 text-cream backdrop-blur-sm'
      }`}
    >
      {t}
    </span>
  )
}

// The price is set as loud as the name: it is what people scan a board for.
function Price({ value, from, className = '' }) {
  return (
    <span className={`flex items-baseline gap-1.5 ${className}`}>
      {from && <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-cream/55">from</span>}
      <span className="poster tabular-nums">{money(value)}</span>
    </span>
  )
}

function AddBlock({ className = '' }) {
  return (
    <span
      className={`grid h-12 w-12 shrink-0 place-items-center rounded-[12px] bg-blaze text-white shadow-[inset_0_1px_0_rgba(255,190,180,.45),inset_0_-3px_0_rgba(120,0,0,.45),0_8px_24px_-8px_rgba(255,46,46,.7)] transition-transform duration-300 ease-out group-hover:rotate-90 ${className}`}
    >
      <Plus className="h-6 w-6" />
    </span>
  )
}

function PizzaCard({ item, onOpen, i, featured }) {
  return (
    <Reveal delay={(i % 3) * 0.08} className={`min-w-0 ${featured ? 'sm:col-span-2' : ''}`}>
      <button
        onClick={() => onOpen(item)}
        aria-label={`${item.name}, from ${money(item.price)}. Choose size and crust`}
        className="group block h-full w-full text-left transition-transform duration-150 ease-out active:scale-[0.985]"
      >
        <div className="board flex h-full flex-col overflow-hidden rounded-[22px] group-hover:-translate-y-1">
          <div className={`relative overflow-hidden ${featured ? 'aspect-[4/3] sm:aspect-[2/1]' : 'aspect-[4/3]'}`}>
            <Photo
              src={item.img}
              look={item.look}
              alt={item.name}
              className="absolute inset-0"
              imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            />
            <div className="absolute inset-x-0 bottom-0 z-[3] h-1/3 bg-gradient-to-t from-[#121111] to-transparent" />
            {item.tags.length > 0 && (
              <div className="absolute left-3 top-3 z-[4] flex gap-1.5">
                {item.tags.map((t) => (
                  <Tag key={t} t={t} />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col px-5 pb-5 pt-3 md:px-6 md:pb-6">
            <h3 className={`poster text-balance ${featured ? 'text-[2.75rem] md:text-[3.5rem]' : 'text-[2.15rem]'}`}>{item.name}</h3>
            <p className={`mt-2.5 text-pretty text-sm font-medium leading-relaxed text-cream/65 ${featured ? 'max-w-lg' : 'line-clamp-2 min-h-[2lh]'}`}>{item.desc}</p>
            <div className="mt-auto flex items-end justify-between gap-4 pt-5">
              <Price value={item.price} from className={featured ? 'text-[3.5rem]' : 'text-[2.75rem]'} />
              <AddBlock />
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
    <Reveal delay={(i % 2) * 0.08} className="min-w-0">
      <div className="board group flex items-center gap-4 rounded-[20px] p-3 pr-3.5">
        <button onClick={() => onOpen(item)} className="flex min-w-0 flex-1 items-center gap-4 text-left">
          <Photo
            src={item.img}
            look={item.look}
            alt={item.name}
            className="h-24 w-24 shrink-0 rounded-[12px]"
            imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="min-w-0">
            <h3 className="poster min-w-0 text-[1.5rem] sm:text-[1.6rem]">
              {item.name}
              {item.tags.map((t) => (
                <span key={t} className="ml-2 inline-block align-[0.3em] font-sans normal-case">
                  <Tag t={t} />
                </span>
              ))}
            </h3>
            <p className="mt-1 text-pretty text-[13px] font-medium leading-snug text-cream/65">{item.desc}</p>
            <Price value={item.price} className="mt-1.5 text-[1.9rem] text-ember" />
          </div>
        </button>
        <button
          onClick={() => {
            onQuickAdd(item)
            setAdded(true)
          }}
          aria-label={`Add ${item.name} to order`}
          className={`relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-[12px] transition-[background-color,color,transform,box-shadow] duration-200 ease-out active:scale-90 ${
            added
              ? 'bg-cream text-ink'
              : 'bg-blaze text-white shadow-[inset_0_1px_0_rgba(255,190,180,.45),inset_0_-3px_0_rgba(120,0,0,.45),0_8px_24px_-8px_rgba(255,46,46,.7)] hover:bg-[#ff1a1a]'
          }`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={added ? 'y' : 'n'}
              initial={{ transform: 'translateY(16px)', opacity: 0 }}
              animate={{ transform: 'translateY(0px)', opacity: 1 }}
              exit={{ transform: 'translateY(-16px)', opacity: 0 }}
              transition={{ type: 'spring', duration: 0.35, bounce: 0.15 }}
            >
              {added ? <Check className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </Reveal>
  )
}

function CategoryTabs({ active, onPick }) {
  return (
    <div className="sticky top-16 z-30 -mx-5 mb-6 px-5 py-3 md:top-[72px] md:-mx-8 md:px-8">
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black_75%,transparent)]" />
      <div className="no-scrollbar relative flex gap-2 overflow-x-auto">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => onPick(c.id)}
            aria-current={active === c.id ? 'true' : undefined}
            className={`relative shrink-0 rounded-[10px] px-5 py-2.5 text-sm font-extrabold uppercase tracking-[0.06em] transition-colors duration-200 ${
              active === c.id ? 'text-white' : 'text-cream/65 hover:text-cream'
            }`}
          >
            {active === c.id && (
              <motion.span
                layoutId="cat-pill"
                className="absolute inset-0 rounded-[10px] bg-blaze shadow-[inset_0_1px_0_rgba(255,190,180,.4),0_6px_20px_-6px_rgba(255,46,46,.7)]"
                transition={{ type: 'spring', duration: 0.4, bounce: 0.12 }}
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
    <section id="menu" className="grade-night relative mx-auto max-w-7xl px-5 pt-20 md:px-8 md:pt-28">
      <div className="mb-8 grid gap-5 md:mb-12 md:grid-cols-[1fr_auto] md:items-end">
        <Reveal>
          <h2 className="poster text-[clamp(4.25rem,13vw,10rem)] leading-[0.85]">
            The <span className="text-ember">menu</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-pretty text-base font-medium leading-relaxed text-cream/70 md:pb-3">
            Every pizza is stretched by hand when you order, never before. Choose a size, a crust and anything extra.
          </p>
        </Reveal>
      </div>

      <CategoryTabs active={active} onPick={(id) => onNav(`cat-${id}`, -132)} />

      <div className="space-y-16 pb-10 md:space-y-24">
        {CATEGORIES.map((cat) => {
          const items = MENU.filter((m) => m.cat === cat.id)
          const pizza = items[0]?.kind === 'pizza'
          return (
            <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-40">
              <Reveal className="mb-6 flex flex-col gap-2 md:mb-8 md:flex-row md:items-end md:justify-between md:gap-8">
                <h3 className="poster text-[3.25rem] md:text-[4.5rem]">{cat.label}</h3>
                <p className="max-w-sm text-pretty text-sm font-medium text-cream/60 md:pb-2 md:text-right">{cat.blurb}</p>
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
