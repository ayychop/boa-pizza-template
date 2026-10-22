const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const Flame = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M12 2.5c1.6 3.4 5.5 5.3 5.5 10.6A5.5 5.5 0 0 1 6.5 13c0-2.6 1.3-4 2.3-5.4.4 1.8 1.4 2.8 2.4 2.8-.9-2.8 0-5.4.8-7.9z" fill="currentColor" />
  </svg>
)
export const Plus = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} strokeWidth={2} {...p}><path d="M12 5v14M5 12h14" /></svg>
)
export const Minus = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} strokeWidth={2} {...p}><path d="M5 12h14" /></svg>
)
export const Close = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} strokeWidth={1.8} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
)
export const Check = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} strokeWidth={2.2} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
)
// Bag, Moto and Store are Lucide glyphs (shopping-bag, motorbike, store) generated via icon-mcp at the set's 1.6 stroke.
export const Bag = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <path d="M16 10a4 4 0 0 1-8 0" />
    <path d="M3.103 6.034h17.794" />
    <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
  </svg>
)
export const MenuIcon = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" /><path d="M12 3.5v17M4.6 7.7l14.8 8.6M4.6 16.3l14.8-8.6" opacity=".55" />
  </svg>
)
export const Pin = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.4" />
  </svg>
)
export const Phone = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <path d="M5 4h3.2l1.6 4-2 1.3a10 10 0 0 0 4.9 4.9l1.3-2 4 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
)
export const Moto = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <path d="m18 14-1-3" />
    <path d="m3 9 6 2a2 2 0 0 1 2-2h2a2 2 0 0 1 1.99 1.81" />
    <path d="M8 17h3a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 0 0 1-1v-.75A5 5 0 0 0 17 5" />
    <circle cx="19" cy="17" r="3" />
    <circle cx="5" cy="17" r="3" />
  </svg>
)
export const Store = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />
    <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" />
    <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />
  </svg>
)
export const Arrow = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const Clock = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
)
