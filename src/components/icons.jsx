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
export const Bag = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
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
export const Scooter = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <circle cx="6" cy="17" r="2.5" /><circle cx="18" cy="17" r="2.5" /><path d="M8.5 17h6.8l1.7-6H13M17 11l-1.5-4H13M3.5 13H10l1.5 4" />
  </svg>
)
export const Store = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}>
    <path d="M4 9.5V20h16V9.5M3 9.5 5 4h14l2 5.5a2.6 2.6 0 0 1-4.5 1.6 2.6 2.6 0 0 1-4.5 0 2.6 2.6 0 0 1-4.5 0A2.6 2.6 0 0 1 3 9.5z" /><path d="M10 20v-5h4v5" />
  </svg>
)
export const Arrow = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const Clock = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
)
