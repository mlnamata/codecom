'use client'

import { usePathname } from 'next/navigation'
import { RozbalovaciNavigace } from '../RozbalovaciNavigace'

const POLOZKY = [
  { nazev: 'Přehled', href: '/ukazka/codekom' },
  { nazev: 'Obce a předplatné', href: '/ukazka/codekom/obce' },
  { nazev: 'Faktury', href: '/ukazka/codekom/faktury' },
]

export function NavigaceSpravy() {
  const cesta = usePathname()
  const jeAktivni = (href: string) => (href === '/ukazka/codekom' ? cesta === href : cesta.startsWith(href))
  return (
    <RozbalovaciNavigace popisek="Správa CodeKom" aktualni={POLOZKY.find((p) => jeAktivni(p.href))?.nazev}>
      <ul>
        {POLOZKY.map((p) => {
          const aktivni = jeAktivni(p.href)
          return (
            <li key={p.href}>
              <a href={p.href} aria-current={aktivni ? 'page' : undefined}>
                {p.nazev}
              </a>
            </li>
          )
        })}
      </ul>
    </RozbalovaciNavigace>
  )
}
