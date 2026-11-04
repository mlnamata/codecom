'use client'

import { usePathname } from 'next/navigation'
import { NAZEV_UROVNE, staci, type Uroven } from '@/ukazka/uroven'

const Z = '/ukazka/administrace'

const SKUPINY: { nadpis: string; id: string; polozky: { nazev: string; href: string; od: Uroven }[] }[] = [
  {
    nadpis: 'Obsah',
    id: 'sk-obsah',
    polozky: [
      { nazev: 'Přehled', href: Z, od: 'zaklad' },
      { nazev: 'Nová aktualita', href: `${Z}/aktuality`, od: 'zaklad' },
      { nazev: 'Úřední deska', href: `${Z}/deska`, od: 'zaklad' },
      { nazev: 'Krizová hlášení', href: `${Z}/krize`, od: 'zaklad' },
      { nazev: 'Hlášení závad', href: `${Z}/zavady`, od: 'zaklad' },
      { nazev: 'Ke schválení', href: `${Z}/schvalovani`, od: 'pokrocily' },
    ],
  },
  {
    nadpis: 'Web',
    id: 'sk-web',
    polozky: [
      { nazev: 'Stránky a menu', href: `${Z}/stranky`, od: 'zaklad' },
      { nazev: 'Skladatel úvodní stránky', href: `${Z}/skladatel`, od: 'pokrocily' },
      { nazev: 'Vzhled', href: `${Z}/vzhled`, od: 'zaklad' },
      { nazev: 'Podweby organizací', href: `${Z}/podweby`, od: 'pokrocily' },
      { nazev: 'AI asistent', href: `${Z}/asistent`, od: 'advance' },
    ],
  },
  {
    nadpis: 'Obec',
    id: 'sk-obec',
    polozky: [
      { nazev: 'Uživatelé a role', href: `${Z}/uzivatele`, od: 'zaklad' },
      { nazev: 'Předplatné a faktury', href: `${Z}/predplatne`, od: 'zaklad' },
    ],
  },
]

export function Navigace({ uroven }: { uroven: Uroven }) {
  const cesta = usePathname()
  return (
    <nav aria-label="Administrace" className="admin__navigace">
      {SKUPINY.map((s) => (
        <div key={s.id}>
          <p className="admin__skupina" id={s.id}>
            {s.nadpis}
          </p>
          <ul aria-labelledby={s.id}>
            {s.polozky.map((p) => {
              const odemceno = staci(uroven, p.od)
              return (
                <li key={p.href}>
                  <a href={p.href} aria-current={cesta === p.href ? 'page' : undefined} className={odemceno ? undefined : 'zamceno'}>
                    <span>{p.nazev}</span>
                    {odemceno ? null : <span className="admin__od">od {NAZEV_UROVNE[p.od]}</span>}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
