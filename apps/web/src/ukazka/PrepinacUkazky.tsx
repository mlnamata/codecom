'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { KrizeUkazky, VelikostUkazky } from './stav'

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
  appUrl: string | null
  /** Vlastní vzhled obce (null = podle šablony). */
  vlastni: { barva: string | null; akcent: string | null; pismo: string | null; velikost: VelikostUkazky }
  vychoziBarvy: { primary: string; accent: string }
  pisma: { klic: string; nazev: string }[]
  /** Firemní web CodeKom, kam vede tlačítko Zpět. Bez adresy se tlačítko neukáže. */
  codekomUrl: string | null
}

const KRIZE: [KrizeUkazky | 'auto', string][] = [
  ['auto', 'Podle dat obce'],
  ['off', 'Vypnutý'],
  ['info', 'Informace'],
  ['warning', 'Výstraha'],
  ['emergency', 'Krize'],
]

const VELIKOSTI: [VelikostUkazky, string][] = [
  ['bezna', 'Běžná'],
  ['vetsi', 'Větší'],
  ['nejvetsi', 'Největší'],
]

/**
 * Lišta „Ukázka CodeKom“ nad náhledem webu obce. Je to nástroj CodeKomu, ne součást webu obce,
 * proto je tmavá a neutrální. Na počítači je to jeden řádek, na telefonu jedno tlačítko
 * „Upravit náhled“, které rozbalí všechna nastavení pod lištou. Vlastní barvy, písmo a velikost
 * jsou v rozbalovacím panelu „Vlastní vzhled“. Stav je v URL a v nezbytné cookie `ukazka`.
 */
export function PrepinacUkazky({ sablony, sablona, paleta, krize, vynuceno, appUrl, codekomUrl, vlastni, vychoziBarvy, pisma }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const id = useId()
  const [otevreno, setOtevreno] = useState(false)
  const [vzhledOtevren, setVzhledOtevren] = useState(false)
  const vzhled = useRef<HTMLDivElement>(null)
  const tlacitkoVzhledu = useRef<HTMLButtonElement>(null)
  const odklad = useRef<ReturnType<typeof setTimeout> | null>(null)

  const aktualni = sablony.find((s) => s.klic === sablona) ?? sablony[0]
  const nazevPalety = aktualni?.palety[paleta]?.nazev ?? ''
  const maVlastni = Boolean(vlastni.barva || vlastni.akcent || vlastni.pismo || vlastni.velikost !== 'bezna')

  const nastav = (zmena: Record<string, string>) => {
    const p = new URLSearchParams(window.location.search)
    for (const [k, v] of Object.entries(zmena)) p.set(k, v)
    router.push(`${pathname}?${p.toString()}`, { scroll: false })
  }
  // Barvu z výběru posíláme až po krátké pauze, ne při každém pohybu ve výběru barvy.
  const nastavBarvu = (klic: 'barva' | 'akcent', hodnota: string) => {
    if (odklad.current) clearTimeout(odklad.current)
    odklad.current = setTimeout(() => nastav({ [klic]: hodnota }), 250)
  }
  useEffect(
    () => () => {
      if (odklad.current) clearTimeout(odklad.current)
    },
    [],
  )

  // Panel Vlastní vzhled zavře Esc nebo klik mimo něj; fokus se vrátí na tlačítko.
  useEffect(() => {
    if (!vzhledOtevren) return
    const priKlavese = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setVzhledOtevren(false)
        tlacitkoVzhledu.current?.focus()
      }
    }
    const priKliku = (e: MouseEvent) => {
      const cil = e.target as Node
      if (!vzhled.current?.contains(cil) && !tlacitkoVzhledu.current?.contains(cil)) setVzhledOtevren(false)
    }
    document.addEventListener('keydown', priKlavese)
    document.addEventListener('mousedown', priKliku)
    return () => {
      document.removeEventListener('keydown', priKlavese)
      document.removeEventListener('mousedown', priKliku)
    }
  }, [vzhledOtevren])

  const shrnuti = [aktualni ? `${aktualni.cislo} ${aktualni.nazev}` : '', nazevPalety, maVlastni ? 'vlastní vzhled' : ''].filter(Boolean).join(', ')

  return (
    <section className="lista" aria-labelledby={`${id}-nadpis`}>
      <div className="lista__radek">
        <p className="lista__znacka">
          <strong id={`${id}-nadpis`}>CodeKom</strong>
          <span className="lista__odznak">Ukázka</span>
        </p>

        <button
          type="button"
          className="lista__upravit"
          aria-expanded={otevreno}
          aria-controls={`${id}-ovladani`}
          onClick={() => setOtevreno((o) => !o)}
        >
          <span>{otevreno ? 'Skrýt úpravy' : 'Upravit náhled'}</span>
          <span className="lista__shrnuti">{shrnuti}</span>
        </button>

        <div id={`${id}-ovladani`} className="lista__ovladani" data-otevreno={otevreno}>
          <div className="lista__pole">
            <label htmlFor={`${id}-sablona`}>Šablona</label>
            <select id={`${id}-sablona`} value={sablona} onChange={(e) => nastav({ sablona: e.target.value, paleta: '0', barva: 'vychozi', akcent: 'vychozi' })}>
              {sablony.map((s) => (
                <option key={s.klic} value={s.klic}>
                  {s.cislo} {s.nazev}
                </option>
              ))}
            </select>
          </div>

          <div className="lista__pole" role="group" aria-labelledby={`${id}-barvy`}>
            <span id={`${id}-barvy`} className="lista__popisek">
              Barvy
            </span>
            <span className="lista__palety">
              {aktualni?.palety.map((p, i) => (
                <button
                  key={p.nazev}
                  type="button"
                  aria-pressed={i === paleta}
                  aria-label={`Paleta ${p.nazev}`}
                  title={p.nazev}
                  onClick={() => nastav({ paleta: String(i), barva: 'vychozi', akcent: 'vychozi' })}
                >
                  <span aria-hidden="true" className="lista__kapky">
                    <span style={{ background: p.bg }} />
                    <span style={{ background: p.primary }} />
                    <span style={{ background: p.accent }} />
                  </span>
                </button>
              ))}
            </span>
            <span className="lista__hodnota" aria-hidden="true">
              {nazevPalety}
            </span>
          </div>

          <div className="lista__pole">
            <label htmlFor={`${id}-banner`}>Banner</label>
            <select id={`${id}-banner`} value={vynuceno ? krize : 'auto'} onChange={(e) => nastav({ krize: e.target.value })}>
              {KRIZE.map(([k, nazev]) => (
                <option key={k} value={k}>
                  {nazev}
                </option>
              ))}
            </select>
          </div>

          <div className="lista__vzhled-obal">
            <button
              ref={tlacitkoVzhledu}
              type="button"
              className="lista__tlacitko"
              aria-expanded={vzhledOtevren}
              aria-controls={`${id}-vzhled`}
              onClick={() => setVzhledOtevren((o) => !o)}
            >
              Vlastní vzhled{maVlastni ? ' (zapnutý)' : ''}
            </button>
            <div ref={vzhled} id={`${id}-vzhled`} className="lista__vzhled" hidden={!vzhledOtevren}>
              <p className="lista__vzhled-nadpis">Barvy a písmo webu obce</p>
              <div className="lista__vzhled-mrizka">
                <div className="lista__pole lista__pole--sloupec">
                  <label htmlFor={`${id}-barva`}>Hlavní barva</label>
                  <input
                    id={`${id}-barva`}
                    type="color"
                    key={`b-${sablona}-${paleta}-${vlastni.barva ?? ''}`}
                    defaultValue={vlastni.barva ?? vychoziBarvy.primary.toLowerCase()}
                    onChange={(e) => nastavBarvu('barva', e.target.value)}
                  />
                </div>
                <div className="lista__pole lista__pole--sloupec">
                  <label htmlFor={`${id}-akcent`}>Doplňková barva</label>
                  <input
                    id={`${id}-akcent`}
                    type="color"
                    key={`a-${sablona}-${paleta}-${vlastni.akcent ?? ''}`}
                    defaultValue={vlastni.akcent ?? vychoziBarvy.accent.toLowerCase()}
                    onChange={(e) => nastavBarvu('akcent', e.target.value)}
                  />
                </div>
                <div className="lista__pole lista__pole--sloupec lista__pole--siroke">
                  <label htmlFor={`${id}-pismo`}>Písmo</label>
                  <select id={`${id}-pismo`} value={vlastni.pismo ?? 'vychozi'} onChange={(e) => nastav({ pismo: e.target.value })}>
                    <option value="vychozi">Podle šablony</option>
                    {pisma.map((p) => (
                      <option key={p.klic} value={p.klic}>
                        {p.nazev}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="lista__pole lista__pole--sloupec lista__pole--siroke" role="group" aria-labelledby={`${id}-velikost`}>
                  <span id={`${id}-velikost`} className="lista__popisek">
                    Velikost
                  </span>
                  <span className="lista__segment">
                    {VELIKOSTI.map(([k, nazev]) => (
                      <button key={k} type="button" aria-pressed={vlastni.velikost === k} onClick={() => nastav({ velikost: k === 'bezna' ? 'vychozi' : k })}>
                        {nazev}
                      </button>
                    ))}
                  </span>
                </div>
              </div>
              <p className="lista__poznamka">Text na barevných plochách se přizpůsobí, aby byl vždy čitelný.</p>
              {maVlastni ? (
                <button type="button" className="lista__tlacitko" onClick={() => nastav({ barva: 'vychozi', akcent: 'vychozi', pismo: 'vychozi', velikost: 'vychozi' })}>
                  Vrátit vzhled šablony
                </button>
              ) : null}
            </div>
          </div>

          <nav aria-label="Další části ukázky" className="lista__odkazy">
            <a href="/ukazka/administrace">Administrace</a>
            <a href="/ukazka/administrace/panel">Řídicí panel</a>
            {appUrl ? <a href={appUrl}>Aplikace</a> : null}
          </nav>
        </div>

        {codekomUrl ? (
          <a href={codekomUrl} className="lista__zpet" aria-label="Zpět na web CodeKom">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="lista__zpet-text">Web CodeKom</span>
          </a>
        ) : null}
      </div>
    </section>
  )
}
