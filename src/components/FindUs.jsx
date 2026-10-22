import Reveal from './Reveal'
import Logo from './Logo'
import { Arrow, Clock, Phone, Pin } from './icons'
import { BUSINESS, isOpenNow } from '../data/menu'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const ORDER = [2, 3, 4, 5, 6, 0, 1]

function MapArt() {
  return (
    <svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label="Stylised map showing Forno Rosso">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF2E2E" stopOpacity=".55" />
          <stop offset="100%" stopColor="#FF2E2E" stopOpacity="0" />
        </radialGradient>
        <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="#F5EFE0" strokeOpacity=".04" />
        </pattern>
      </defs>
      <rect width="600" height="420" fill="#111010" />
      <rect width="600" height="420" fill="url(#grid)" />
      <path d="M-20 300 C120 260 200 330 330 280 S520 200 640 240" stroke="#2b5a6b" strokeOpacity=".5" strokeWidth="26" fill="none" />
      <g stroke="#F5EFE0" fill="none" strokeLinecap="round">
        <path d="M0 120 L600 170" strokeOpacity=".12" strokeWidth="10" />
        <path d="M180 -10 L250 430" strokeOpacity=".12" strokeWidth="9" />
        <path d="M420 -10 C400 120 440 260 380 430" strokeOpacity=".09" strokeWidth="7" />
        <path d="M0 40 L320 70 L600 20" strokeOpacity=".06" strokeWidth="4" />
        <path d="M60 430 L140 200 L300 210 L520 380" strokeOpacity=".06" strokeWidth="4" />
        <path d="M320 70 L300 210" strokeOpacity=".06" strokeWidth="4" />
      </g>
      <rect x="260" y="88" width="70" height="44" rx="6" fill="#F5EFE0" fillOpacity=".03" />
      <rect x="90" y="140" width="60" height="80" rx="6" fill="#F5EFE0" fillOpacity=".03" />
      <rect x="450" y="190" width="90" height="56" rx="6" fill="#F5EFE0" fillOpacity=".03" />
      <circle cx="300" cy="182" r="90" fill="url(#glow)">
        <animate attributeName="r" values="70;100;70" dur="3.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="300" cy="182" r="10" fill="#E60000" stroke="#F5EFE0" strokeWidth="3" />
      <text x="320" y="172" fill="#F5EFE0" fontFamily="Anton, Impact, sans-serif" fontSize="24" letterSpacing="0.5">FORNO ROSSO</text>
      <text x="320" y="192" fill="#F5EFE0" fillOpacity=".65" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="11" letterSpacing="1.5">HIGH WYCOMBE</text>
    </svg>
  )
}

export default function FindUs() {
  const today = new Date().getDay()
  const open = isOpenNow()
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address.join(', '))}`

  return (
    <section id="find" className="relative mx-auto max-w-7xl px-5 pb-16 pt-20 md:px-8 md:pb-24 md:pt-32">
      <Reveal className="mb-10 md:mb-14">
        <h2 className="poster text-[clamp(4.25rem,13vw,10rem)] leading-[0.85]">
          Find <span className="text-ember">us</span>
        </h2>
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr] lg:gap-5">
        <Reveal className="board relative min-h-[320px] overflow-hidden rounded-[22px] lg:min-h-[480px]">
          <div className="absolute inset-0">
            <MapArt />
          </div>
          <div className="glass absolute bottom-3 left-3 right-3 flex items-center justify-between gap-4 rounded-[16px] p-4 md:bottom-5 md:left-5 md:right-auto md:w-[340px]">
            <div className="flex items-start gap-3">
              <Pin className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
              <address className="not-italic text-sm font-semibold leading-relaxed text-cream/85">
                {BUSINESS.address.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </address>
            </div>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px] bg-cream text-ink transition-transform duration-200 ease-out hover:scale-105 active:scale-95" aria-label="Get directions">
              <Arrow className="h-4 w-4 -rotate-45" />
            </a>
          </div>
        </Reveal>

        <div className="grid gap-4 lg:gap-5">
          <Reveal delay={0.08} className="board rounded-[22px] p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div className="poster flex items-center gap-2.5 text-[1.75rem]">
                <Clock className="h-6 w-6 text-ember" /> Opening hours
              </div>
              <span className={`rounded-md px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.06em] ${open ? 'bg-blaze text-white' : 'bg-cream/10 text-cream/75'}`}>
                {open ? 'Open now' : 'Closed now'}
              </span>
            </div>
            <ul className="mt-5 divide-y divide-cream/[0.06] text-sm">
              {ORDER.map((d) => {
                const isOpen = BUSINESS.openDays.includes(d)
                const isToday = d === today
                return (
                  <li key={d} className={`flex justify-between py-2.5 font-medium ${isToday ? 'font-bold text-cream' : 'text-cream/60'}`}>
                    <span className="flex items-center gap-2">
                      {isToday && <span className="h-2 w-2 rounded-full bg-ember shadow-[0_0_10px_rgba(255,46,46,.9)]" />}
                      {DAYS[d]}
                    </span>
                    <span className="tabular-nums">{isOpen ? '12:00pm to 10:00pm' : 'Closed'}</span>
                  </li>
                )
              })}
            </ul>
          </Reveal>
          <Reveal delay={0.16}>
            <a href={BUSINESS.phoneHref} aria-label={`Call the shop on ${BUSINESS.phone}`} className="group flex items-center justify-between gap-4 rounded-[22px] bg-blaze p-6 text-white shadow-[inset_0_1px_0_rgba(255,190,180,.4),inset_0_-4px_0_rgba(120,0,0,.4),var(--glow-red)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-[#ff1a1a] hover:shadow-[inset_0_1px_0_rgba(255,190,180,.5),inset_0_-4px_0_rgba(120,0,0,.4),var(--glow-red-hot)] active:scale-[0.98] md:p-8">
              <div>
                <div className="poster text-[2.4rem] tabular-nums md:text-[3rem]">{BUSINESS.phone}</div>
              </div>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[14px] bg-white text-blaze transition-transform duration-300 ease-out group-hover:scale-105">
                <Phone className="h-5 w-5" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>

      <footer className="mt-20 flex flex-col items-start justify-between gap-6 border-t-2 border-cream/[0.08] pt-8 text-sm font-medium text-cream/55 md:flex-row md:items-center">
        <Logo />
        <p>Wood-fired Neapolitan pizza. Made to order, never before.</p>
        <p>
          &copy; {new Date().getFullYear()} Forno Rosso
          <span className="mt-1 block text-xs text-cream/40">
            Fire photograph:{' '}
            <a href="https://commons.wikimedia.org/wiki/File:Fire_fire_flames.jpg" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-cream">
              Jon Sullivan
            </a>
            , public domain, via Wikimedia Commons
          </span>
        </p>
      </footer>
    </section>
  )
}
