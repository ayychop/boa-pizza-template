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
          <stop offset="0%" stopColor="#D62828" stopOpacity=".55" />
          <stop offset="100%" stopColor="#D62828" stopOpacity="0" />
        </radialGradient>
        <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="#F5EFE0" strokeOpacity=".04" />
        </pattern>
      </defs>
      <rect width="600" height="420" fill="#120F0D" />
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
      <circle cx="300" cy="182" r="9" fill="#D62828" stroke="#F5EFE0" strokeWidth="3" />
      <text x="318" y="170" fill="#F5EFE0" fontFamily="Bodoni Moda, Georgia, serif" fontStyle="italic" fontSize="20">Forno Rosso</text>
      <text x="318" y="190" fill="#F5EFE0" fillOpacity=".5" fontFamily="Manrope, sans-serif" fontSize="11" letterSpacing="2">HIGH WYCOMBE</text>
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
        <div className="eyebrow mb-4">Trovaci</div>
        <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] tracking-[-0.02em]">
          Find <span className="italic">us</span>
        </h2>
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr] lg:gap-5">
        <Reveal className="relative min-h-[300px] overflow-hidden rounded-[32px] ring-1 ring-cream/[0.07] lg:min-h-[480px]">
          <div className="absolute inset-0">
            <MapArt />
          </div>
          <div className="glass absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 rounded-2xl p-4 md:bottom-6 md:left-6 md:right-auto md:w-[340px]">
            <div className="flex items-start gap-3">
              <Pin className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
              <address className="not-italic text-sm leading-relaxed text-cream/80">
                {BUSINESS.address.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </address>
            </div>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream text-ink transition-transform hover:scale-105" aria-label="Get directions">
              <Arrow className="h-4 w-4 -rotate-45" />
            </a>
          </div>
        </Reveal>

        <div className="grid gap-4 lg:gap-5">
          <Reveal delay={0.08} className="rounded-[32px] bg-coal p-6 ring-1 ring-cream/[0.06] md:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-sm font-semibold">
                <Clock className="h-[18px] w-[18px] text-flame" /> Opening hours
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${open ? 'bg-emerald-400/10 text-emerald-300' : 'bg-ember/15 text-[#ff8a7a]'}`}>
                {open ? 'Open now' : 'Closed now'}
              </span>
            </div>
            <ul className="mt-5 divide-y divide-cream/[0.06] text-sm">
              {ORDER.map((d) => {
                const isOpen = BUSINESS.openDays.includes(d)
                const isToday = d === today
                return (
                  <li key={d} className={`flex justify-between py-2.5 ${isToday ? 'text-cream' : 'text-cream/55'}`}>
                    <span className="flex items-center gap-2">
                      {isToday && <span className="h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_10px_rgba(214,40,40,.9)]" />}
                      {DAYS[d]}
                    </span>
                    <span className="tabular-nums">{isOpen ? '12:00pm to 10:00pm' : 'Closed'}</span>
                  </li>
                )
              })}
            </ul>
          </Reveal>
          <Reveal delay={0.16}>
            <a href={BUSINESS.phoneHref} className="group flex items-center justify-between rounded-[32px] bg-ember/[0.1] p-6 ring-1 ring-ember/25 transition-colors hover:bg-ember/[0.16] md:p-8">
              <div>
                <div className="eyebrow text-cream/60">Call the shop</div>
                <div className="mt-2 font-display text-3xl tabular-nums md:text-4xl">{BUSINESS.phone}</div>
              </div>
              <span className="grid h-14 w-14 place-items-center rounded-full bg-ember text-cream shadow-[0_10px_30px_-8px_rgba(214,40,40,.8)] transition-transform duration-500 ease-expo group-hover:scale-110">
                <Phone className="h-5 w-5" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>

      <footer className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-cream/[0.08] pt-8 text-sm text-cream/40 md:flex-row md:items-center">
        <Logo />
        <p>Wood-fired Neapolitan pizza. Made to order, never before.</p>
        <p>&copy; {new Date().getFullYear()} Forno Rosso</p>
      </footer>
    </section>
  )
}
