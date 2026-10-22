import { Flame } from './icons'

// compact: the wordmark steps aside below the sm breakpoint, leaving the flame tile.
export default function Logo({ className = '', compact = false }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-blaze shadow-[inset_0_1px_0_rgba(255,190,180,.45),0_0_24px_-4px_rgba(255,46,46,.7)]">
        <Flame className="h-[18px] w-[18px] text-white" />
      </span>
      <span className={`poster whitespace-nowrap text-[1.6rem] leading-none ${compact ? 'hidden sm:inline' : ''}`}>
        Forno <span className="neon neon-on">Rosso</span>
      </span>
    </span>
  )
}
