import type { Uroven } from '@/lib/krize'

/** Decorative: the level is always written out in the heading next to the icon. */
export function IkonaUrovne({ uroven, className }: { uroven: Uroven; className?: string }) {
  const common = {
    'aria-hidden': true,
    focusable: false,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  }
  if (uroven === 'emergency') {
    return (
      <svg {...common}>
        <path d="M8 2.5h8l5.5 5.5v8L16 21.5H8L2.5 16V8z" />
        <path d="M12 7.5v5.5M12 16.5h.01" />
      </svg>
    )
  }
  if (uroven === 'warning') {
    return (
      <svg {...common}>
        <path d="M12 3l9.5 17h-19z" />
        <path d="M12 10v4.5M12 17.5h.01" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 11v5.5M12 7.5h.01" />
    </svg>
  )
}
