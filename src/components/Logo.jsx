import { Flame } from './icons'

export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-8 w-8 place-items-center rounded-full bg-ember/15 ring-1 ring-ember/40">
        <Flame className="h-4 w-4 text-ember" />
        <span className="absolute inset-0 rounded-full bg-ember/20 blur-md" />
      </span>
      <span className="whitespace-nowrap font-display text-[1.35rem] italic leading-none tracking-tight">
        Forno <span className="not-italic font-semibold">Rosso</span>
      </span>
    </span>
  )
}
