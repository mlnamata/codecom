'use client'

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
}

const KRIZE: [KrizeUkazky, string][] = [
  ['off', 'Vypnuto'],
  ['info', 'Informace'],
  ['warning', 'Výstraha'],
  ['emergency', 'Krize'],
]

/**
 * Pruh „Ukázka CodeKom“: přepíná šablonu, paletu, krizový banner a úvodní obrázek.
 * Stav je v URL (dá se na něj odkázat) a v nezbytné cookie `ukazka`.
 */
export function PrepinacUkazky({ sablony, sablona, paleta, krize, vynuceno, foto, appUrl }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const aktualni = sablony.find((s) => s.klic === sablona) ?? sablony[0]

  const nastav = (zmena: Record<string, string>) => {
    const p = new URLSearchParams(window.location.search)
    for (const [k, v] of Object.entries(zmena)) p.set(k, v)
    router.push(`${pathname}?${p.toString()}`, { scroll: false })
  }

  return (
    <section className="pruh-ukazky" aria-labelledby="pruh-ukazky-nadpis">
      <div className="pruh-ukazky__obsah">
        <h2 id="pruh-ukazky-nadpis" className="pruh-ukazky__nadpis">
          Ukázka CodeKom
        </h2>
        <div className="pruh-ukazky__skupina">
          <label htmlFor="pruh-sablona">Šablona</label>
          <select id="pruh-sablona" value={sablona} onChange={(e) => nastav({ sablona: e.target.value, paleta: '0' })}>
            {sablony.map((s) => (
              <option key={s.klic} value={s.klic}>
                {s.cislo} {s.nazev}
              </option>
            ))}
          </select>
        </div>
        <div role="group" aria-label="Barevná varianta" className="pruh-ukazky__skupina">
          <span className="pruh-ukazky__popisek" aria-hidden="true">
            Barvy
          </span>
          {aktualni?.palety.map((p, i) => (
            <button key={p.nazev} type="button" aria-pressed={i === paleta} onClick={() => nastav({ paleta: String(i) })}>
              <span aria-hidden="true" className="pruh-ukazky__kapky">
                <span style={{ background: p.bg }} />
                <span style={{ background: p.primary }} />
                <span style={{ background: p.accent }} />
              </span>
              {p.nazev}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Krizový banner" className="pruh-ukazky__skupina">
          <span className="pruh-ukazky__popisek" aria-hidden="true">
            Banner
          </span>
          {KRIZE.map(([k, nazev]) => (
            <button key={k} type="button" aria-pressed={krize === k} onClick={() => nastav({ krize: k })}>
              {nazev}
            </button>
          ))}
          {vynuceno ? (
            <button type="button" className="pruh-ukazky__odkaz" onClick={() => nastav({ krize: 'auto' })}>
              Zobrazit podle dat obce
            </button>
          ) : null}
        </div>
        {aktualni?.foto ? (
          <div role="group" aria-label="Úvodní obrázek" className="pruh-ukazky__skupina">
            <button type="button" aria-pressed={!foto} onClick={() => nastav({ foto: '0' })}>
              Ilustrace
            </button>
            <button type="button" aria-pressed={foto} onClick={() => nastav({ foto: '1' })}>
              Fotografie
            </button>
          </div>
        ) : null}
        <nav aria-label="Ukázka" className="pruh-ukazky__skupina">
          <a href="/ukazka/administrace">Ukázka administrace</a>
          {appUrl ? <a href={appUrl}>Aplikace</a> : null}
        </nav>
      </div>
    </section>
  )
}
