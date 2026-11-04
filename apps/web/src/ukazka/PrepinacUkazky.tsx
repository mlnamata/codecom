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
          <h2 id={`${id}-nadpis`} className="pruh-ukazky__nadpis">
            Ukázka CodeKom
          </h2>
          <p className="pruh-ukazky__stav">{stav}</p>
          {codekomUrl ? (
            <a href={codekomUrl} className="pruh-ukazky__zpet">
              Zpět na web CodeKom
            </a>
          ) : null}
          <button
            type="button"
            className="pruh-ukazky__rozbalit"
            aria-expanded={otevreno}
            aria-controls={`${id}-panel`}
            onClick={() => setOtevreno((o) => !o)}
          >
            {otevreno ? 'Skrýt nastavení' : 'Nastavit'}
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
            <a href="/ukazka/administrace">Administrace</a>
            {appUrl ? <a href={appUrl}>Aplikace</a> : null}
          </nav>
        </div>
      </div>
    </section>
  )
}
