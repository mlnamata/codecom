'use client'

import { useId, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { KrizeUkazky } from './stav'

export interface SablonaVPrepinaci {
  klic: string
  cislo: string
  nazev: string
  palety: { nazev: string; bg: string; primary: string; accent: string }[]
  foto: boolean
}

interface Props {
  sablony: SablonaVPrepinaci[]
  sablona: string
  paleta: number
  /** Co banner právě ukazuje (vynucené nebo podle dat). */
  krize: KrizeUkazky
  vynuceno: boolean
  foto: boolean
  appUrl: string | null
  /** Firemní web CodeKom, kam vede tlačítko Zpět. Bez adresy se tlačítko neukáže. */
  codekomUrl: string | null
}

const KRIZE: [KrizeUkazky, string][] = [
  ['off', 'Vypnuto'],
  ['info', 'Informace'],
  ['warning', 'Výstraha'],
  ['emergency', 'Krize'],
]

const nazevKrize = (k: KrizeUkazky) => KRIZE.find(([x]) => x === k)?.[1] ?? 'Vypnuto'

/**
 * Pruh „Ukázka CodeKom“: přepíná šablonu, paletu, krizový banner a úvodní obrázek.
 * Je to nástroj CodeKomu, ne součást webu obce, proto je tmavý a neutrální.
 * Na telefonu je sbalený do jednoho řádku se stavem slovy, na počítači je celý vidět.
 * Stav je v URL (dá se na něj odkázat) a v nezbytné cookie `ukazka`.
 */
export function PrepinacUkazky({ sablony, sablona, paleta, krize, vynuceno, foto, appUrl, codekomUrl }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [otevreno, setOtevreno] = useState(false)
  const id = useId()
  const aktualni = sablony.find((s) => s.klic === sablona) ?? sablony[0]
  const nazevPalety = aktualni?.palety[paleta]?.nazev ?? ''

  const nastav = (zmena: Record<string, string>) => {
    const p = new URLSearchParams(window.location.search)
    for (const [k, v] of Object.entries(zmena)) p.set(k, v)
    router.push(`${pathname}?${p.toString()}`, { scroll: false })
  }

  const stav = [
    aktualni ? `${aktualni.cislo} ${aktualni.nazev}` : '',
    nazevPalety ? `paleta ${nazevPalety}` : '',
    `banner ${vynuceno ? nazevKrize(krize) : 'podle dat obce'}`,
    aktualni?.foto ? (foto ? 'fotografie' : 'ilustrace') : '',
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <section className="pruh-ukazky" aria-labelledby={`${id}-nadpis`}>
      <div className="pruh-ukazky__obsah">
        <div className="pruh-ukazky__hlava">
          <div className="pruh-ukazky__znacka">
            <h2 id={`${id}-nadpis`} className="pruh-ukazky__nadpis">
              CodeKom
            </h2>
            <span className="pruh-ukazky__odznak">Ukázka</span>
          </div>
          <p className="pruh-ukazky__stav">{stav}</p>
          {codekomUrl ? (
            <a href={codekomUrl} className="pruh-ukazky__zpet">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Zpět na web CodeKom</span>
            </a>
          ) : null}
          <button
            type="button"
            className="pruh-ukazky__rozbalit"
            aria-expanded={otevreno}
            aria-controls={`${id}-panel`}
            onClick={() => setOtevreno((o) => !o)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {otevreno ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
              )}
            </svg>
            <span>{otevreno ? 'Skrýt nastavení' : 'Nastavit'}</span>
          </button>
        </div>

        <div id={`${id}-panel`} className="pruh-ukazky__panel" data-otevreno={otevreno}>
          <div className="pruh-ukazky__pole">
            <label htmlFor={`${id}-sablona`}>Šablona</label>
            <select id={`${id}-sablona`} value={sablona} onChange={(e) => nastav({ sablona: e.target.value, paleta: '0' })}>
              {sablony.map((s) => (
                <option key={s.klic} value={s.klic}>
                  {s.cislo} {s.nazev}
                </option>
              ))}
            </select>
          </div>

          <div role="group" aria-labelledby={`${id}-barvy`} className="pruh-ukazky__pole">
            <span id={`${id}-barvy`} className="pruh-ukazky__popisek">
              Barvy
            </span>
            <span className="pruh-ukazky__segment">
              {aktualni?.palety.map((p, i) => (
                <button key={p.nazev} type="button" aria-pressed={i === paleta} aria-label={p.nazev} title={p.nazev} onClick={() => nastav({ paleta: String(i) })}>
                  <span aria-hidden="true" className="pruh-ukazky__kapky">
                    <span style={{ background: p.bg }} />
                    <span style={{ background: p.primary }} />
                    <span style={{ background: p.accent }} />
                  </span>
                </button>
              ))}
            </span>
            <span className="pruh-ukazky__hodnota" aria-hidden="true">
              {nazevPalety}
            </span>
          </div>

          <div className="pruh-ukazky__pole">
            <label htmlFor={`${id}-banner`}>Banner</label>
            <select id={`${id}-banner`} value={vynuceno ? krize : 'auto'} onChange={(e) => nastav({ krize: e.target.value })}>
              <option value="auto">Podle dat obce</option>
              {KRIZE.map(([k, nazev]) => (
                <option key={k} value={k}>
                  {nazev}
                </option>
              ))}
            </select>
          </div>

          {aktualni?.foto ? (
            <div className="pruh-ukazky__pole">
              <label htmlFor={`${id}-obrazek`}>Obrázek</label>
              <select id={`${id}-obrazek`} value={foto ? '1' : '0'} onChange={(e) => nastav({ foto: e.target.value })}>
                <option value="0">Ilustrace</option>
                <option value="1">Fotografie</option>
              </select>
            </div>
          ) : null}

          <nav aria-label="Ukázka" className="pruh-ukazky__odkazy">
            <a href="/ukazka/administrace">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              <span>Administrace</span>
            </a>
            {appUrl ? (
              <a href={appUrl}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                <span>Aplikace</span>
              </a>
            ) : null}
          </nav>
        </div>
      </div>
    </section>
  )
}
