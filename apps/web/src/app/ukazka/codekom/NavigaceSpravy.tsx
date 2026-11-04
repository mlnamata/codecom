'use client'

import { usePathname } from 'next/navigation'

const POLOZKY = [
  { nazev: 'Přehled', href: '/ukazka/codekom' },
  { nazev: 'Obce a předplatné', href: '/ukazka/codekom/obce' },
  { nazev: 'Faktury', href: '/ukazka/codekom/faktury' },
]

export function NavigaceSpravy() {
  const cesta = usePathname()
  return (
    <nav aria-label="Správa CodeKom" className="admin__navigace">
      <ul>
        {POLOZKY.map((p) => {
          const aktivni = p.href === '/ukazka/codekom' ? cesta === p.href : cesta.startsWith(p.href)
          return (
            <li key={p.href}>
              <a href={p.href} aria-current={aktivni ? 'page' : undefined}>
                {p.nazev}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
