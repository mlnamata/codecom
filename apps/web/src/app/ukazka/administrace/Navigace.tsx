'use client'

import { usePathname } from 'next/navigation'

const POLOZKY = [
  { nazev: 'Přehled', href: '/ukazka/administrace' },
  { nazev: 'Obsah', href: '/ukazka/administrace/aktuality' },
  { nazev: 'Úřední deska', href: '/ukazka/administrace/deska' },
  { nazev: 'Krizová hlášení', href: '/ukazka/administrace/krize' },
  { nazev: 'Hlášení závad', href: '/ukazka/administrace/zavady' },
]

const ZAMCENE = ['Stránky a menu', 'Média', 'Vzhled', 'Uživatelé', 'Nastavení obce', 'Skladatel stránky', 'Schvalování', 'Podweby']

export function Navigace() {
  const cesta = usePathname()
  return (
    <nav aria-label="Administrace" className="admin__navigace">
      <ul>
        {POLOZKY.map((p) => (
          <li key={p.href}>
            <a href={p.href} aria-current={cesta === p.href ? 'page' : undefined}>
              {p.nazev}
            </a>
          </li>
        ))}
      </ul>
      <p className="admin__zamcene-nadpis" id="zamcene">
        Nejsou součástí ukázky
      </p>
      <ul aria-labelledby="zamcene" className="admin__zamcene">
        {ZAMCENE.map((z) => (
          <li key={z}>{z}</li>
        ))}
      </ul>
    </nav>
  )
}
