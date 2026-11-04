'use client'

import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { NAZEV_UROVNE, staci, type Uroven } from '@/ukazka/uroven'
import { RozbalovaciNavigace } from '../RozbalovaciNavigace'

const Z = '/ukazka/administrace'

const IKONY: Record<string, ReactNode> = {
  Přehled: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  'Obecní e-mail a pošta': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L1 7" />
    </svg>
  ),
  'Rozhlas, SMS a zpravodaj': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  ),
  'Nová aktualita': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>
  ),
  'Úřední deska': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  'Krizová hlášení': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  'Hlášení závad': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  'Ke schválení': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  'Poplatky a pokladna': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  'Smlouvy a faktury': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="m9 15 2 2 4-4" />
    </svg>
  ),
  'Přepážka, matrika a revize': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  'Stránky a menu': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  'Skladatel úvodní stránky': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  ),
  Vzhled: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z" />
    </svg>
  ),
  'Podweby organizací': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  'AI asistent': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
  'IoT čidla a živá data': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  ),
  'Komunita a půjčovna': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  'Majetek a energetika': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
    </svg>
  ),
  'Zastupitelský extranet': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  'Uživatelé a role': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <polyline points="17 11 19 13 23 9" />
    </svg>
  ),
  'Předplatné a faktury': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
}

const SKUPINY: { nadpis: string; id: string; polozky: { nazev: string; href: string; od: Uroven }[] }[] = [
  {
    nadpis: 'Obsah a komunikace',
    id: 'sk-obsah',
    polozky: [
      { nazev: 'Přehled', href: Z, od: 'zaklad' },
      { nazev: 'Obecní e-mail a pošta', href: `${Z}/posta`, od: 'zaklad' },
      { nazev: 'Rozhlas, SMS a zpravodaj', href: `${Z}/rozhlas`, od: 'zaklad' },
      { nazev: 'Nová aktualita', href: `${Z}/aktuality`, od: 'zaklad' },
      { nazev: 'Úřední deska', href: `${Z}/deska`, od: 'zaklad' },
      { nazev: 'Krizová hlášení', href: `${Z}/krize`, od: 'zaklad' },
      { nazev: 'Hlášení závad', href: `${Z}/zavady`, od: 'zaklad' },
      { nazev: 'Ke schválení', href: `${Z}/schvalovani`, od: 'pokrocily' },
    ],
  },
  {
    nadpis: 'Agenda úřadu a finance',
    id: 'sk-urad-finance',
    polozky: [
      { nazev: 'Poplatky a pokladna', href: `${Z}/poplatky`, od: 'zaklad' },
      { nazev: 'Smlouvy a faktury', href: `${Z}/smlouvy`, od: 'zaklad' },
      { nazev: 'Přepážka, matrika a revize', href: `${Z}/prepazka`, od: 'zaklad' },
    ],
  },
  {
    nadpis: 'Správa webu',
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
    nadpis: 'Chytrá obec a majetek',
    id: 'sk-chytra-obec',
    polozky: [
      { nazev: 'IoT čidla a živá data', href: `${Z}/chytra-obec`, od: 'zaklad' },
      { nazev: 'Komunita a půjčovna', href: `${Z}/komunita`, od: 'zaklad' },
      { nazev: 'Majetek a energetika', href: `${Z}/majetek`, od: 'pokrocily' },
      { nazev: 'Zastupitelský extranet', href: `${Z}/extranet`, od: 'pokrocily' },
    ],
  },
  {
    nadpis: 'Nastavení obce',
    id: 'sk-obec',
    polozky: [
      { nazev: 'Uživatelé a role', href: `${Z}/uzivatele`, od: 'zaklad' },
      { nazev: 'Předplatné a faktury', href: `${Z}/predplatne`, od: 'zaklad' },
    ],
  },
]

function Skupina({ skupina, uroven, cesta }: { skupina: (typeof SKUPINY)[number]; uroven: Uroven; cesta: string }) {
  const [otevrena, setOtevrena] = useState(true)
  const idSeznamu = `${skupina.id}-seznam`
  return (
    <div className="admin__sekce">
      <button
        type="button"
        id={skupina.id}
        className="admin__skupina"
        aria-expanded={otevrena}
        aria-controls={idSeznamu}
        onClick={() => setOtevrena((o) => !o)}
      >
        <span>{skupina.nadpis}</span>
        <svg className="admin__skupina-sipka" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <ul id={idSeznamu} aria-labelledby={skupina.id} hidden={!otevrena}>
        {skupina.polozky.map((p) => {
          const odemceno = staci(uroven, p.od)
          return (
            <li key={p.href}>
              <a href={p.href} aria-current={cesta === p.href ? 'page' : undefined} className={odemceno ? undefined : 'zamceno'}>
                <span className="admin__nav-ikona" aria-hidden="true">
                  {IKONY[p.nazev]}
                </span>
                <span className="admin__nav-nazev">{p.nazev}</span>
                {odemceno ? null : (
                  <span className="admin__od">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>od {NAZEV_UROVNE[p.od]}</span>
                  </span>
                )}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function Navigace({ uroven }: { uroven: Uroven }) {
  const cesta = usePathname()
  const aktualni = SKUPINY.flatMap((s) => s.polozky).find((p) => p.href === cesta)?.nazev
  return (
    <RozbalovaciNavigace popisek="Administrace" aktualni={aktualni}>
      {SKUPINY.map((s) => (
        <Skupina key={s.id} skupina={s} uroven={uroven} cesta={cesta} />
      ))}
    </RozbalovaciNavigace>
  )
}
