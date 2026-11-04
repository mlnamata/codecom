'use client'

import { usePathname } from 'next/navigation'
import { RozbalovaciNavigace } from '../RozbalovaciNavigace'

const IKONA = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }

const POLOZKY = [
  {
    nazev: 'Přehled',
    href: '/ukazka/codekom',
    ikona: (
      <svg {...IKONA}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    nazev: 'Obce a předplatné',
    href: '/ukazka/codekom/obce',
    ikona: (
      <svg {...IKONA}>
        <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    nazev: 'Faktury',
    href: '/ukazka/codekom/faktury',
    ikona: (
      <svg {...IKONA}>
        <path d="M6 2h12v20l-3-2-3 2-3-2-3 2z" />
        <path d="M9 7h6M9 11h6M9 15h4" />
      </svg>
    ),
  },
]

export function NavigaceSpravy() {
  const cesta = usePathname()
  const jeAktivni = (href: string) => (href === '/ukazka/codekom' ? cesta === href : cesta.startsWith(href))
  return (
    <RozbalovaciNavigace popisek="Správa CodeKom" aktualni={POLOZKY.find((p) => jeAktivni(p.href))?.nazev}>
      <ul className="admin__sekce">
        {POLOZKY.map((p) => {
          const aktivni = jeAktivni(p.href)
          return (
            <li key={p.href}>
              <a href={p.href} aria-current={aktivni ? 'page' : undefined}>
                <span className="admin__nav-ikona">{p.ikona}</span>
                <span className="admin__nav-nazev">{p.nazev}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </RozbalovaciNavigace>
  )
}
