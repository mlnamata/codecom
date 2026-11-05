'use client'

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type DragEvent, type ReactNode } from 'react'
import {
  VELIKOSTI,
  WIDGETY,
  jeVychozi,
  mimoPlochu,
  odeber,
  posun,
  presunK,
  prectiRozlozeni,
  pridej,
  zapisRozlozeni,
  zmenVelikost,
  type IdWidgetu,
  type PolozkaPlochy,
  type Velikost,
} from './rozlozeni'
import {
  WidgetCidla,
  WidgetEnergie,
  WidgetKamera,
  WidgetMapa,
  WidgetOdjezdy,
  WidgetParkovani,
  WidgetSouhrn,
  WidgetTeploty,
  WidgetZamky,
  WidgetZavady,
  cas,
  type DataPanelu,
  type ObjektMapy,
  type Zamky,
} from './Widgety'

/* ---------- Uložení rozložení ----------
 * V ukázce v localStorage prohlížeče. Když je úložiště zakázané (anonymní okno, blokovaná data),
 * rozložení drží jen paměť stránky a po obnovení se vrátí výchozí. Stránka funguje i tak.
 */
const KLIC = 'codekom-ukazka-ridici-panel'
let pamet: string | null | undefined
const posluchaci = new Set<() => void>()

function snimek(): string | null {
  if (pamet === undefined) {
    try {
      pamet = window.localStorage.getItem(KLIC)
    } catch {
      pamet = null
    }
  }
  return pamet
}

function uloz(hodnota: string | null) {
  pamet = hodnota
  try {
    if (hodnota === null) window.localStorage.removeItem(KLIC)
    else window.localStorage.setItem(KLIC, hodnota)
  } catch {
    // Úložiště není k dispozici, rozložení zůstane jen do obnovení stránky.
  }
  posluchaci.forEach((f) => f())
}

function odebirej(f: () => void) {
  posluchaci.add(f)
  return () => {
    posluchaci.delete(f)
  }
}

/* ---------- Plocha ---------- */

type Fokus = { id: IdWidgetu; akce: 'vys' | 'niz' | 'widget' } | { id: null; akce: 'pridat' }

export function Plocha({ data }: { data: DataPanelu }) {
  const ulozene = useSyncExternalStore(odebirej, snimek, () => null)
  const plocha = useMemo(() => prectiRozlozeni(ulozene), [ulozene])
  const [upravuje, setUpravuje] = useState(false)
  const [oznameni, setOznameni] = useState('')
  const [tazeny, setTazeny] = useState<IdWidgetu | null>(null)
  const [cil, setCil] = useState<{ id: IdWidgetu; za: boolean } | null>(null)
  const fokusPo = useRef<Fokus | null>(null)
  const koren = useRef<HTMLDivElement>(null)

  /* Zámky sdílí mapa i widget Zámky. */
  const [zamceno, setZamceno] = useState<Record<string, boolean>>({})
  const [zaznam, setZaznam] = useState<Zamky['zaznam']>([])
  const casovace = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  useEffect(() => {
    const c = casovace.current
    return () => Object.values(c).forEach(clearTimeout)
  }, [])
  const zamky: Zamky = {
    jeZamceno: (id) => zamceno[id] ?? true,
    zaznam,
    prepni: (o: ObjektMapy, zamknout, duvod) => {
      setZamceno((z) => ({ ...z, [o.id]: zamknout }))
      setZaznam((z) => [{ cas: cas(), text: `${zamknout ? 'Zamčeno' : 'Odemčeno'}: ${o.nazev} (${duvod})` }, ...z].slice(0, 6))
      setOznameni(`${o.nazev}: ${zamknout ? 'zamčeno' : 'odemčeno na 5 minut'}.`)
      const c = casovace.current[o.id]
      if (c) clearTimeout(c)
      if (!zamknout) {
        casovace.current[o.id] = setTimeout(() => {
          setZamceno((z) => ({ ...z, [o.id]: true }))
          setZaznam((z) => [{ cas: cas(), text: `Zamčeno automaticky po 5 minutách: ${o.nazev}` }, ...z].slice(0, 6))
        }, 5 * 60 * 1000)
      }
    },
  }

  /* Po přesunu nebo odebrání vrátí fokus tam, kde uživatel pokračuje (přesun v DOM fokus ztrácí). */
  useEffect(() => {
    const f = fokusPo.current
    if (!f || !koren.current) return
    fokusPo.current = null
    const k = koren.current
    if (f.id === null) {
      k.querySelector<HTMLElement>('#rp-pridat-nadpis')?.focus()
      return
    }
    const w = k.querySelector<HTMLElement>(`[data-widget="${f.id}"]`)
    if (!w) return
    if (f.akce === 'widget') {
      w.focus()
      return
    }
    const tlacitko = w.querySelector<HTMLButtonElement>(`[data-akce="${f.akce}"]`)
    const nahrada = w.querySelector<HTMLButtonElement>(`[data-akce="${f.akce === 'vys' ? 'niz' : 'vys'}"]`)
    ;(tlacitko && !tlacitko.disabled ? tlacitko : nahrada)?.focus()
  }, [plocha])

  const nastav = (nova: PolozkaPlochy[], zprava: string) => {
    uloz(zapisRozlozeni(nova))
    setOznameni(zprava)
  }

  const posunWidget = (id: IdWidgetu, smer: -1 | 1) => {
    const nova = posun(plocha, id, smer)
    const pozice = nova.findIndex((p) => p.id === id) + 1
    fokusPo.current = { id, akce: smer < 0 ? 'vys' : 'niz' }
    nastav(nova, `Widget ${WIDGETY[id].nazev} je na pozici ${pozice} z ${nova.length}.`)
  }

  const odeberWidget = (id: IdWidgetu) => {
    const i = plocha.findIndex((p) => p.id === id)
    const nova = odeber(plocha, id)
    const dalsi = nova[i] ?? nova[i - 1]
    fokusPo.current = dalsi ? { id: dalsi.id, akce: 'vys' } : { id: null, akce: 'pridat' }
    nastav(nova, `Widget ${WIDGETY[id].nazev} je odebraný z plochy. Vrátíte ho v nabídce Přidat widget.`)
  }

  const pridejWidget = (id: IdWidgetu) => {
    const nova = pridej(plocha, id)
    fokusPo.current = { id, akce: 'widget' }
    nastav(nova, `Widget ${WIDGETY[id].nazev} je přidaný na konec plochy.`)
  }

  const velikostWidgetu = (id: IdWidgetu, v: Velikost) => nastav(zmenVelikost(plocha, id, v), `Widget ${WIDGETY[id].nazev} má velikost ${VELIKOSTI[v]}.`)

  const obnov = () => {
    uloz(null)
    setOznameni('Plocha má zase výchozí rozložení.')
  }

  const prepniUpravy = () => {
    setUpravuje((u) => !u)
    setOznameni(
      upravuje
        ? 'Úpravy plochy jsou hotové, rozložení je uložené.'
        : 'Režim úprav. U každého widgetu jsou tlačítka pro posun, velikost a odebrání. Pod plochou je nabídka Přidat widget.',
    )
  }

  /* Přetažení myší: horní levá polovina cíle vloží před něj, dolní pravá za něj. */
  const priPretazeni = (e: DragEvent<HTMLElement>, id: IdWidgetu) => {
    if (!tazeny || tazeny === id) return
    e.preventDefault()
    const r = e.currentTarget.getBoundingClientRect()
    const za = (e.clientX - r.left) / r.width + (e.clientY - r.top) / r.height > 1
    if (cil?.id !== id || cil.za !== za) setCil({ id, za })
  }
  const priPusteni = (e: DragEvent<HTMLElement>, id: IdWidgetu) => {
    e.preventDefault()
    if (tazeny && tazeny !== id && cil) {
      const nova = presunK(plocha, tazeny, id, cil.za)
      nastav(nova, `Widget ${WIDGETY[tazeny].nazev} je na pozici ${nova.findIndex((p) => p.id === tazeny) + 1} z ${nova.length}.`)
    }
    setTazeny(null)
    setCil(null)
  }

  const obsah = (id: IdWidgetu): ReactNode => {
    switch (id) {
      case 'souhrn':
        return <WidgetSouhrn data={data} zamky={zamky} />
      case 'mapa':
        return <WidgetMapa data={data} zamky={zamky} />
      case 'kamera':
        return <WidgetKamera data={data} />
      case 'energie':
        return <WidgetEnergie data={data} />
      case 'teploty':
        return <WidgetTeploty data={data} />
      case 'cidla':
        return <WidgetCidla data={data} />
      case 'zamky':
        return <WidgetZamky data={data} zamky={zamky} />
      case 'odjezdy':
        return <WidgetOdjezdy data={data} />
      case 'parkovani':
        return <WidgetParkovani data={data} />
      case 'zavady':
        return <WidgetZavady data={data} />
    }
  }

  const chybi = mimoPlochu(plocha)

  return (
    <div className={`rp${upravuje ? ' rp--upravy' : ''}`} ref={koren}>
      <div className="rp-zahlavi">
        <div>
          <h1>Řídicí panel</h1>
          <p className="rp-pozn">
            {data.obec}. Kamery, čidla, zámky, doprava a závady na jedné ploše, kterou si uspořádáte.
          </p>
        </div>
        <div className="rp-zahlavi__akce">
          {upravuje ? (
            <button type="button" className="rp-tlacitko rp-tlacitko--vedlejsi" onClick={obnov} disabled={jeVychozi(plocha)}>
              Obnovit výchozí rozložení
            </button>
          ) : null}
          <button type="button" className="rp-tlacitko" onClick={prepniUpravy}>
            {upravuje ? 'Hotovo' : 'Upravit plochu'}
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite" role="status">
        {oznameni}
      </p>

      {upravuje ? (
        <p className="rp-napoveda">
          Widgety přesunete tažením myší za úchyt nebo tlačítky Posunout výš a Posunout níž. Pořadí jde zleva doprava a shora dolů. Rozložení se ukládá v tomto prohlížeči.
        </p>
      ) : null}

      {plocha.length === 0 ? <p className="rp-prazdna">Plocha je prázdná. Widgety přidáte tlačítkem Upravit plochu.</p> : null}

      <div className="rp-plocha">
        {plocha.map((p, i) => {
          const w = WIDGETY[p.id]
          const nadpis = `rp-${p.id}-nadpis`
          const tridaCile = cil?.id === p.id ? (cil.za ? ' je-cil-za' : ' je-cil-pred') : ''
          return (
            <section
              key={p.id}
              data-widget={p.id}
              tabIndex={-1}
              aria-labelledby={nadpis}
              className={`rp-widget rp-widget--${p.velikost}${tazeny === p.id ? ' je-tazeny' : ''}${tridaCile}`}
              onDragOver={upravuje ? (e) => priPretazeni(e, p.id) : undefined}
              onDragLeave={upravuje ? () => setCil((c) => (c?.id === p.id ? null : c)) : undefined}
              onDrop={upravuje ? (e) => priPusteni(e, p.id) : undefined}
            >
              <div className="rp-widget__hlava">
                <h2 id={nadpis}>{w.nazev}</h2>
                {upravuje ? (
                  <span
                    className="rp-uchop"
                    draggable
                    title="Přetáhnout myší"
                    aria-hidden="true"
                    onDragStart={(e) => {
                      e.dataTransfer.effectAllowed = 'move'
                      e.dataTransfer.setData('text/plain', p.id)
                      const sekce = e.currentTarget.closest('section')
                      if (sekce) e.dataTransfer.setDragImage(sekce, 24, 24)
                      setTazeny(p.id)
                    }}
                    onDragEnd={() => {
                      setTazeny(null)
                      setCil(null)
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="9" cy="6" r="1.6" />
                      <circle cx="15" cy="6" r="1.6" />
                      <circle cx="9" cy="12" r="1.6" />
                      <circle cx="15" cy="12" r="1.6" />
                      <circle cx="9" cy="18" r="1.6" />
                      <circle cx="15" cy="18" r="1.6" />
                    </svg>
                    Přetáhnout
                  </span>
                ) : null}
              </div>
              {upravuje ? (
                <div className="rp-upravy" role="group" aria-label={`Úpravy widgetu ${w.nazev}`}>
                  <button type="button" data-akce="vys" aria-label={`Posunout výš, ${w.nazev}`} disabled={i === 0} onClick={() => posunWidget(p.id, -1)}>
                    Posunout výš
                  </button>
                  <button type="button" data-akce="niz" aria-label={`Posunout níž, ${w.nazev}`} disabled={i === plocha.length - 1} onClick={() => posunWidget(p.id, 1)}>
                    Posunout níž
                  </button>
                  <label className="rp-upravy__velikost">
                    <span>Velikost</span>
                    <select value={p.velikost} onChange={(e) => velikostWidgetu(p.id, e.target.value as Velikost)}>
                      {(Object.keys(VELIKOSTI) as Velikost[]).map((v) => (
                        <option key={v} value={v}>
                          {VELIKOSTI[v]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button type="button" data-akce="odebrat" aria-label={`Odebrat widget ${w.nazev}`} className="rp-upravy__odebrat" onClick={() => odeberWidget(p.id)}>
                    Odebrat
                  </button>
                </div>
              ) : null}
              <div className="rp-widget__telo" inert={upravuje}>
                {obsah(p.id)}
              </div>
            </section>
          )
        })}
      </div>

      {upravuje ? (
        <section className="rp-pridat" aria-labelledby="rp-pridat-nadpis">
          <h2 id="rp-pridat-nadpis" tabIndex={-1}>
            Přidat widget
          </h2>
          {chybi.length ? (
            <ul>
              {chybi.map((id) => (
                <li key={id}>
                  <span>
                    <strong>{WIDGETY[id].nazev}</strong>
                    <span className="rp-pozn">{WIDGETY[id].popis}</span>
                  </span>
                  <button type="button" aria-label={`Přidat widget ${WIDGETY[id].nazev}`} className="rp-tlacitko rp-tlacitko--vedlejsi" onClick={() => pridejWidget(id)}>
                    Přidat
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rp-pozn">Všechny widgety už na ploše jsou.</p>
          )}
        </section>
      ) : null}

      <p className="rp-fallback">
        Když něco nefunguje, volejte obecní úřad: {data.telefon}, úřední hodiny {data.uredniHodiny}.
      </p>
    </div>
  )
}
