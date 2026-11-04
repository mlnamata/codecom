'use client'

import { useEffect, useId, useRef, useState } from 'react'

type Stav = 'ok' | 'varovani' | 'porucha'

export interface Odjezd {
  linka: string
  smer: string
  stanice: string
  odjezd: string
  zpozdeniMin: number
  nizkopodlazni: boolean
  dopravce: string
}

export interface ObjektMapy {
  id: string
  druh: 'kamera' | 'cidlo' | 'zamek' | 'zastavka'
  nazev: string
  x: number
  y: number
  popis?: string
  stav?: Stav
  hodnoty?: { nazev: string; hodnota: string; pozn?: string }[]
  kamera?: { ucel: string; obnovaSec: number; gdpr: string; online: boolean }
  zamek?: { kdoMaKlic: string; baterie: number | null }
  odjezdy?: Odjezd[]
}

interface Props {
  obec: string
  telefon: string
  uredniHodiny: string
  stav: { teplota: number; ovzdusi: string; potok: string }
  objekty: ObjektMapy[]
  odjezdy: Odjezd[]
  parkovani: { id: string; nazev: string; kapacita: number; volno: number }[]
  zavady: { id: string; cislo: string; popis: string; stav: string }[]
  aktualizace: string
}

const VRSTVY: { druh: ObjektMapy['druh']; nazev: string }[] = [
  { druh: 'kamera', nazev: 'Kamery' },
  { druh: 'cidlo', nazev: 'Čidla a budovy' },
  { druh: 'zamek', nazev: 'Zámky' },
  { druh: 'zastavka', nazev: 'Zastávky' },
]

const NAZEV_STAVU: Record<Stav, string> = { ok: 'V pořádku', varovani: 'Varování', porucha: 'Porucha' }

const DUVODY = ['Servis nebo oprava', 'Nájemce zapomněl kód', 'Zásah hasičů', 'Jiný důvod']

const cas = () => new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Prague' })

/** Tvar značky na mapě podle druhu: stav i druh nikdy jen barvou. */
function Znacka({ o, vybrany }: { o: ObjektMapy; vybrany: boolean }) {
  const r = vybrany ? 26 : 22
  const tvar =
    o.druh === 'kamera' ? (
      <path d="M-8 -5h11l5 -3v16l-5 -3h-11z" fill="currentColor" />
    ) : o.druh === 'zamek' ? (
      <>
        <rect x="-6" y="-2" width="12" height="9" rx="1.5" fill="currentColor" />
        <path d="M-4 -2v-3a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="2" />
      </>
    ) : o.druh === 'zastavka' ? (
      <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="600" fill="currentColor">
        B
      </text>
    ) : (
      <path d="M-2 -8h4v10a5 5 0 1 1 -4 0z" fill="currentColor" />
    )
  return (
    <g className={`panel-znacka panel-znacka--${o.druh} panel-znacka--${o.stav ?? 'ok'}${vybrany ? ' je-vybrana' : ''}`}>
      <circle r={r} className="panel-znacka__kruh" />
      <g transform="scale(1.5)">{tvar}</g>
      {o.stav && o.stav !== 'ok' ? <circle cx={r - 4} cy={-r + 4} r="8" className="panel-znacka__vykricnik" /> : null}
    </g>
  )
}

function DetailKamery({ o }: { o: ObjektMapy }) {
  const [natoceni, setNatoceni] = useState(0)
  const [priblizeni, setPriblizeni] = useState(1)
  const [obnoveno, setObnoveno] = useState(cas)
  const k = o.kamera
  if (!k) return null
  const snimek = o.id === 'kamera-potok' ? '/demo/foto/sablona-13-mlyn.webp' : '/demo/foto/sablona-01-naves.webp'
  return (
    <>
      <figure className="panel-kamera">
        <div className="panel-kamera__obraz">
          <img
            src={snimek}
            alt={`Ukázkový snímek kamery ${o.nazev}`}
            style={{ transform: `scale(${priblizeni}) translateX(${-natoceni}%)` }}
          />
          <span className="panel-kamera__ai" aria-hidden="true">
            AI
          </span>
          <span className="panel-kamera__zive">{k.online ? 'Online' : 'Offline'}</span>
        </div>
        <figcaption>
          Ukázkový snímek vytvořený umělou inteligencí. Obnovení každých {k.obnovaSec} s, naposledy {obnoveno}.
        </figcaption>
      </figure>
      <div className="panel-ovladani" role="group" aria-label="Ovládání kamery">
        <button type="button" onClick={() => setNatoceni((n) => Math.max(-10, n - 5))} disabled={natoceni <= -10}>
          Natočit vlevo
        </button>
        <button type="button" onClick={() => setNatoceni((n) => Math.min(10, n + 5))} disabled={natoceni >= 10}>
          Natočit vpravo
        </button>
        <button type="button" onClick={() => setPriblizeni((p) => Math.min(2, p + 0.25))} disabled={priblizeni >= 2}>
          Přiblížit
        </button>
        <button type="button" onClick={() => setPriblizeni((p) => Math.max(1, p - 0.25))} disabled={priblizeni <= 1}>
          Oddálit
        </button>
        <button type="button" onClick={() => setObnoveno(cas())}>
          Obnovit snímek
        </button>
      </div>
      <p className="panel-pozn">
        Natočení {natoceni === 0 ? 'na střed' : `${Math.abs(natoceni * 3)}° ${natoceni < 0 ? 'vlevo' : 'vpravo'}`}, přiblížení {priblizeni.toLocaleString('cs-CZ')}×.
      </p>
      <dl className="panel-udaje">
        <dt>Účel</dt>
        <dd>{k.ucel}</dd>
        <dt>Ochrana soukromí</dt>
        <dd>{k.gdpr}</dd>
      </dl>
    </>
  )
}

function DetailZamku({ o, zamceno, prepni }: { o: ObjektMapy; zamceno: boolean; prepni: (zamknout: boolean, duvod: string) => void }) {
  const [duvod, setDuvod] = useState('')
  const id = useId()
  const z = o.zamek
  if (!z) return null
  return (
    <>
      <p className="panel-velky-stav">
        <span className={`panel-stitek ${zamceno ? 'panel-stitek--ok' : 'panel-stitek--varovani'}`}>{zamceno ? 'Zamčeno' : 'Odemčeno'}</span>
        {z.baterie !== null ? <span className="panel-pozn">Baterie {z.baterie} %</span> : null}
      </p>
      <p className="panel-klic">Dveře lze vždy otevřít klíčem. Klíč má: {z.kdoMaKlic}.</p>
      {zamceno ? (
        <div className="panel-formular">
          <label htmlFor={`${id}-duvod`}>Důvod odemčení</label>
          <select id={`${id}-duvod`} value={duvod} onChange={(e) => setDuvod(e.target.value)}>
            <option value="">Vyberte důvod</option>
            {DUVODY.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <button type="button" className="panel-tlacitko" disabled={!duvod} onClick={() => prepni(false, duvod)}>
            Odemknout na 5 minut
          </button>
        </div>
      ) : (
        <button type="button" className="panel-tlacitko" onClick={() => prepni(true, 'Ruční zamčení')}>
          Zamknout
        </button>
      )}
      <p className="panel-pozn">V ostrém provozu smí dveře otevřít jen uživatel s právem Dveře po dvoufázovém ověření a každý pokus se zapíše do záznamu vstupů.</p>
    </>
  )
}

export function PanelObce({ obec, telefon, uredniHodiny, stav, objekty, odjezdy, parkovani, zavady, aktualizace }: Props) {
  const [vrstvy, setVrstvy] = useState<Set<ObjektMapy['druh']>>(() => new Set(VRSTVY.map((v) => v.druh)))
  const [vybranyId, setVybranyId] = useState<string | null>('kamera-naves')
  const [jakoSeznam, setJakoSeznam] = useState(false)
  const [zamceno, setZamceno] = useState<Record<string, boolean>>({})
  const [zaznam, setZaznam] = useState<{ cas: string; text: string }[]>([])
  const [oznameni, setOznameni] = useState('')
  const casovace = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const detail = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const c = casovace.current
    return () => Object.values(c).forEach(clearTimeout)
  }, [])

  const vybrany = objekty.find((o) => o.id === vybranyId) ?? null
  const viditelne = objekty.filter((o) => vrstvy.has(o.druh))
  const jeZamceno = (id: string) => zamceno[id] ?? true

  const vyber = (id: string) => {
    setVybranyId(id)
    requestAnimationFrame(() => detail.current?.focus())
  }

  const prepniVrstvu = (druh: ObjektMapy['druh']) =>
    setVrstvy((v) => {
      const n = new Set(v)
      if (n.has(druh)) n.delete(druh)
      else n.add(druh)
      return n
    })

  const prepniZamek = (o: ObjektMapy, zamknout: boolean, duvod: string) => {
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
  }

  const aktualizovano = new Date(aktualizace).toLocaleString('cs-CZ', { timeZone: 'Europe/Prague', day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' })

  return (
    <div className="panel">
      <a className="preskocit" href="#panel-obsah">
        Přeskočit na obsah
      </a>
      <header className="panel-hlavicka">
        <p className="panel-nazev">
          <span className="panel-nazev__male">Řídicí panel obce</span>
          <span className="panel-nazev__obec">{obec}</span>
        </p>
        <ul className="panel-stavy" aria-label="Stav obce">
          <li>{stav.teplota.toLocaleString('cs-CZ')} °C</li>
          <li>Ovzduší: {stav.ovzdusi}</li>
          <li>Potok: {stav.potok}</li>
        </ul>
        <nav aria-label="Ukázka" className="panel-odkazy">
          <a href="/ukazka/administrace">Administrace</a>
          <a href="/" className="panel-tlacitko">
            Zobrazit web
          </a>
        </nav>
      </header>

      <div className="panel-telo">
        <nav aria-label="Řídicí panel" className="panel-menu">
          <ul>
            <li>
              <a href="#mapa" aria-current="true">
                Mapa obce
              </a>
            </li>
            <li>
              <a href="#doprava">Doprava a jízdní řády</a>
            </li>
            <li>
              <a href="#parkovani">Parkování</a>
            </li>
            <li>
              <a href="#zavady">Hlášení závad</a>
            </li>
            <li>
              <a href="/ukazka/administrace/chytra-obec">IoT čidla a technika</a>
            </li>
          </ul>
        </nav>

        <main id="panel-obsah" tabIndex={-1} className="panel-obsah">
          <p className="sr-only" aria-live="polite">
            {oznameni}
          </p>

          <section id="mapa" aria-labelledby="mapa-nadpis" className="panel-karta panel-karta--mapa">
            <div className="panel-karta__hlava">
              <h1 id="mapa-nadpis">Mapa obce</h1>
              <p className="panel-pozn">Data k {aktualizovano}. Klikněte na kameru, čidlo nebo zámek.</p>
            </div>
            <div className="panel-vrstvy" role="group" aria-label="Vrstvy mapy">
              {VRSTVY.map((v) => (
                <button key={v.druh} type="button" aria-pressed={vrstvy.has(v.druh)} onClick={() => prepniVrstvu(v.druh)}>
                  {v.nazev}
                </button>
              ))}
              <button type="button" className="panel-vrstvy__seznam" aria-pressed={jakoSeznam} onClick={() => setJakoSeznam((s) => !s)}>
                Zobrazit jako seznam
              </button>
            </div>

            <div className="panel-mapa-rozvrzeni">
              {jakoSeznam ? (
                <ul className="panel-seznam">
                  {viditelne.map((o) => (
                    <li key={o.id}>
                      <button type="button" aria-pressed={o.id === vybranyId} onClick={() => vyber(o.id)}>
                        <span>{o.nazev}</span>
                        <span className="panel-pozn">
                          {VRSTVY.find((v) => v.druh === o.druh)?.nazev}
                          {o.stav ? `, ${NAZEV_STAVU[o.stav]}` : ''}
                          {o.druh === 'zamek' ? `, ${jeZamceno(o.id) ? 'zamčeno' : 'odemčeno'}` : ''}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <svg className="panel-mapa" viewBox="0 0 1000 600" role="group" aria-label={`Schematická mapa obce ${obec}`}>
                  <rect width="1000" height="600" className="panel-mapa__pozadi" />
                  <path d="M0 520 C150 470 220 560 120 600 H0z M60 420 q80 -60 170 10 q-40 90 -170 60z" className="panel-mapa__les" />
                  <path d="M880 0 q-40 90 40 160 q60 40 80 0 V0z" className="panel-mapa__les" />
                  <path d="M560 0 C600 160 700 250 760 420 S860 560 900 600" className="panel-mapa__potok" />
                  <path d="M0 300 H1000 M500 0 V600 M500 300 L880 120 M500 300 L880 540" className="panel-mapa__silnice" />
                  <circle cx="480" cy="290" r="70" className="panel-mapa__naves" />
                  <text x="480" y="372" textAnchor="middle" className="panel-mapa__popisek">
                    Náves
                  </text>
                  <text x="600" y="60" className="panel-mapa__popisek">
                    Javornický potok
                  </text>
                  <text x="760" y="110" className="panel-mapa__popisek">
                    III/171 Podjavoří
                  </text>
                  {viditelne.map((o) => (
                    <g key={o.id} transform={`translate(${o.x} ${o.y})`}>
                    <a
                      href={`#detail`}
                      role="button"
                      aria-label={`${o.nazev}${o.stav && o.stav !== 'ok' ? `, ${NAZEV_STAVU[o.stav]}` : ''}${o.druh === 'zamek' ? `, ${jeZamceno(o.id) ? 'zamčeno' : 'odemčeno'}` : ''}`}
                      aria-pressed={o.id === vybranyId}
                      onClick={(e) => {
                        e.preventDefault()
                        vyber(o.id)
                      }}
                      onKeyDown={(e) => {
                        if (e.key === ' ') {
                          e.preventDefault()
                          vyber(o.id)
                        }
                      }}
                    >
                      <Znacka o={o} vybrany={o.id === vybranyId} />
                    </a>
                    </g>
                  ))}
                </svg>
              )}

              <div id="detail" ref={detail} tabIndex={-1} className="panel-detail" aria-labelledby="detail-nadpis">
                {vybrany ? (
                  <>
                    <p className="panel-pozn">{VRSTVY.find((v) => v.druh === vybrany.druh)?.nazev}</p>
                    <h2 id="detail-nadpis">{vybrany.nazev}</h2>
                    {vybrany.popis ? <p className="panel-pozn">{vybrany.popis}</p> : null}
                    {vybrany.stav ? <p><span className={`panel-stitek panel-stitek--${vybrany.stav}`}>{NAZEV_STAVU[vybrany.stav]}</span></p> : null}
                    {vybrany.druh === 'kamera' ? <DetailKamery key={vybrany.id} o={vybrany} /> : null}
                    {vybrany.druh === 'zamek' ? <DetailZamku key={vybrany.id} o={vybrany} zamceno={jeZamceno(vybrany.id)} prepni={(z, d) => prepniZamek(vybrany, z, d)} /> : null}
                    {vybrany.hodnoty ? (
                      <dl className="panel-hodnoty">
                        {vybrany.hodnoty.map((h) => (
                          <div key={h.nazev}>
                            <dt>{h.nazev}</dt>
                            <dd>
                              {h.hodnota}
                              {h.pozn ? <span className="panel-pozn"> {h.pozn}</span> : null}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                    {vybrany.odjezdy ? (
                      <ul className="panel-odjezdy">
                        {vybrany.odjezdy.map((o) => (
                          <li key={`${o.linka}-${o.odjezd}`}>
                            <strong>{o.odjezd}</strong> {o.linka} směr {o.smer}
                            {o.zpozdeniMin > 0 ? <span className="panel-stitek panel-stitek--varovani">zpoždění {o.zpozdeniMin} min</span> : null}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </>
                ) : (
                  <p>Vyberte objekt na mapě.</p>
                )}
              </div>
            </div>
            {zaznam.length ? (
              <section aria-labelledby="zaznam-nadpis" className="panel-zaznam">
                <h2 id="zaznam-nadpis">Záznam ovládání</h2>
                <ul>
                  {zaznam.map((z, i) => (
                    <li key={i}>
                      <span className="panel-pozn">{z.cas}</span> {z.text}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </section>

          <div className="panel-mrizka">
            <section id="doprava" aria-labelledby="doprava-nadpis" className="panel-karta">
              <div className="panel-karta__hlava">
                <h2 id="doprava-nadpis">Nejbližší odjezdy</h2>
              </div>
              <ul className="panel-odjezdy panel-odjezdy--velke">
                {odjezdy.map((o) => (
                  <li key={`${o.linka}-${o.odjezd}`}>
                    <span className="panel-odjezdy__cas">{o.odjezd}</span>
                    <span>
                      <strong>{o.linka}</strong> směr {o.smer}
                      <span className="panel-pozn">
                        {o.stanice}, {o.dopravce}
                        {o.nizkopodlazni ? ', nízkopodlažní' : ''}
                      </span>
                    </span>
                    <span className={`panel-stitek ${o.zpozdeniMin > 0 ? 'panel-stitek--varovani' : 'panel-stitek--ok'}`}>{o.zpozdeniMin > 0 ? `+${o.zpozdeniMin} min` : 'včas'}</span>
                  </li>
                ))}
              </ul>
              <p className="panel-pozn">Ukázková data. Ostrý provoz čte jízdní řády a zpoždění z dat kraje a dopravců [OVĚŘIT zdroj].</p>
            </section>

            <section id="parkovani" aria-labelledby="parkovani-nadpis" className="panel-karta">
              <div className="panel-karta__hlava">
                <h2 id="parkovani-nadpis">Parkování</h2>
              </div>
              <ul className="panel-parkovani">
                {parkovani.map((p) => (
                  <li key={p.id}>
                    <span>{p.nazev}</span>
                    <strong>
                      {p.volno} z {p.kapacita} volných
                    </strong>
                    <span className="panel-pruh" aria-hidden="true">
                      <span style={{ width: `${Math.round(((p.kapacita - p.volno) / p.kapacita) * 100)}%` }} />
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="zavady" aria-labelledby="zavady-nadpis" className="panel-karta">
              <div className="panel-karta__hlava">
                <h2 id="zavady-nadpis">Otevřená hlášení závad</h2>
              </div>
              <ul className="panel-zavady">
                {zavady.map((z) => (
                  <li key={z.id}>
                    <span className="panel-pozn">{z.cislo}</span>
                    <span>{z.popis}</span>
                    <span className="panel-stitek">{z.stav}</span>
                  </li>
                ))}
              </ul>
              <a href="/ukazka/administrace/zavady" className="panel-tlacitko">
                Vyřídit závady
              </a>
            </section>
          </div>

          <p className="panel-fallback">
            Když něco nefunguje, volejte obecní úřad: {telefon}, úřední hodiny {uredniHodiny}.
          </p>
        </main>
      </div>
    </div>
  )
}
