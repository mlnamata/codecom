'use client'

import { useId, useRef, useState } from 'react'

/**
 * Obsah widgetů řídicího panelu. Chování převzaté z dřívějšího samostatného panelu
 * (`/ukazka/panel`): odemčení zámku jen s důvodem a automatické zamčení po 5 minutách,
 * ovládání kamery, vrstvy mapy a přepnutí mapy na seznam.
 */

export type Stav = 'ok' | 'varovani' | 'porucha'

export interface Odjezd {
  linka: string
  smer: string
  stanice: string
  odjezd: string
  zpozdeniMin: number
  nizkopodlazni: boolean
  dopravce: string
}

export interface Hodnota {
  nazev: string
  hodnota: string
  pozn?: string
}

export interface ObjektMapy {
  id: string
  druh: 'kamera' | 'cidlo' | 'zamek' | 'zastavka'
  nazev: string
  x: number
  y: number
  popis?: string
  stav?: Stav
  hodnoty?: Hodnota[]
  kamera?: { ucel: string; obnovaSec: number; gdpr: string; online: boolean }
  zamek?: { kdoMaKlic: string; baterie: number | null }
  odjezdy?: Odjezd[]
}

export interface Budova {
  id: string
  nazev: string
  stav: Stav
  upozorneni: string[]
  mistnosti: { nazev: string; teplota: number; cil: number; cilText: string; oknoOtevrene: boolean }[]
  energie: { den: string; kWh: number }[]
}

export interface Cidlo {
  id: string
  nazev: string
  popis: string
  stav: Stav
  hodnoty: Hodnota[]
}

export interface Potok {
  hladina: number
  jednotka: string
  stupne: { bdelost: number; pohotovost: number; ohrozeni: number }
}

export interface DataPanelu {
  obec: string
  telefon: string
  uredniHodiny: string
  stav: { teplota: number; ovzdusi: string; potok: string }
  objekty: ObjektMapy[]
  budovy: Budova[]
  cidla: Cidlo[]
  potok: Potok
  odjezdy: Odjezd[]
  parkovani: { id: string; nazev: string; kapacita: number; volno: number }[]
  zavady: { id: string; cislo: string; popis: string; stav: string }[]
  aktualizace: string
}

/** Sdílený stav zámků: mapa i widget Zámky ovládají tytéž dveře a píší do jednoho záznamu. */
export interface Zamky {
  jeZamceno: (id: string) => boolean
  prepni: (o: ObjektMapy, zamknout: boolean, duvod: string) => void
  zaznam: { cas: string; text: string }[]
}

export const NAZEV_STAVU: Record<Stav, string> = { ok: 'V pořádku', varovani: 'Varování', porucha: 'Porucha' }

const VRSTVY: { druh: ObjektMapy['druh']; nazev: string }[] = [
  { druh: 'kamera', nazev: 'Kamery' },
  { druh: 'cidlo', nazev: 'Čidla a budovy' },
  { druh: 'zamek', nazev: 'Zámky' },
  { druh: 'zastavka', nazev: 'Zastávky' },
]

const DUVODY = ['Servis nebo oprava', 'Nájemce zapomněl kód', 'Zásah hasičů', 'Jiný důvod']

export const cas = () => new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Prague' })

const cislo = (n: number) => n.toLocaleString('cs-CZ')

function Stitek({ stav, children }: { stav?: Stav; children: React.ReactNode }) {
  return <span className={`rp-stitek${stav ? ` rp-stitek--${stav}` : ''}`}>{children}</span>
}

/* ---------- Stav obce ---------- */

export function WidgetSouhrn({ data, zamky }: { data: DataPanelu; zamky: Zamky }) {
  const vPoradku = data.budovy.filter((b) => b.stav === 'ok').length
  const problem = data.budovy.length - vPoradku
  const zamkyNaMape = data.objekty.filter((o) => o.druh === 'zamek')
  const zamcenych = zamkyNaMape.filter((o) => zamky.jeZamceno(o.id)).length
  return (
    <dl className="rp-souhrn">
      <div>
        <dt>Venku</dt>
        <dd className="rp-cislo">{cislo(data.stav.teplota)} °C</dd>
        <dd className="rp-pozn">Ovzduší: {data.stav.ovzdusi}</dd>
      </div>
      <div>
        <dt>Javornický potok</dt>
        <dd className="rp-cislo">
          {data.potok.hladina} {data.potok.jednotka}
        </dd>
        <dd className="rp-pozn">{data.stav.potok}</dd>
      </div>
      <div>
        <dt>Budovy</dt>
        <dd className="rp-cislo">
          {vPoradku} z {data.budovy.length}
        </dd>
        <dd className="rp-pozn">{problem ? `v pořádku, ${problem} s upozorněním` : 'v pořádku'}</dd>
      </div>
      <div>
        <dt>Zámky</dt>
        <dd className="rp-cislo">
          {zamcenych} z {zamkyNaMape.length}
        </dd>
        <dd className="rp-pozn">zamčeno</dd>
      </div>
      <div>
        <dt>Otevřené závady</dt>
        <dd className="rp-cislo">{data.zavady.length}</dd>
        <dd className="rp-pozn">
          <a href="/ukazka/administrace/zavady">Hlášení závad</a>
        </dd>
      </div>
    </dl>
  )
}

/* ---------- Mapa ---------- */

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
    <g className={`rp-znacka rp-znacka--${o.stav ?? 'ok'}${vybrany ? ' je-vybrana' : ''}`}>
      <circle r={r} className="rp-znacka__kruh" />
      <g transform="scale(1.5)">{tvar}</g>
      {o.stav && o.stav !== 'ok' ? <circle cx={r - 4} cy={-r + 4} r="8" className="rp-znacka__vykricnik" /> : null}
    </g>
  )
}

function Hodnoty({ hodnoty }: { hodnoty: Hodnota[] }) {
  return (
    <dl className="rp-hodnoty">
      {hodnoty.map((h) => (
        <div key={h.nazev}>
          <dt>{h.nazev}</dt>
          <dd>
            {h.hodnota}
            {h.pozn ? <span className="rp-pozn"> {h.pozn}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function Zaznam({ zaznam }: { zaznam: Zamky['zaznam'] }) {
  if (!zaznam.length) return null
  return (
    <div className="rp-zaznam">
      <h3>Záznam ovládání</h3>
      <ul>
        {zaznam.map((z, i) => (
          <li key={i}>
            <span className="rp-pozn">{z.cas}</span> {z.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function WidgetMapa({ data, zamky }: { data: DataPanelu; zamky: Zamky }) {
  const [vrstvy, setVrstvy] = useState<Set<ObjektMapy['druh']>>(() => new Set(VRSTVY.map((v) => v.druh)))
  const [vybranyId, setVybranyId] = useState<string | null>(null)
  const [jakoSeznam, setJakoSeznam] = useState(false)
  const detail = useRef<HTMLDivElement>(null)
  const id = useId()
  const vybrany = data.objekty.find((o) => o.id === vybranyId) ?? null
  const viditelne = data.objekty.filter((o) => vrstvy.has(o.druh))
  const aktualizovano = new Date(data.aktualizace).toLocaleString('cs-CZ', { timeZone: 'Europe/Prague', day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' })

  const vyber = (oid: string) => {
    setVybranyId(oid)
    requestAnimationFrame(() => detail.current?.focus())
  }
  const prepniVrstvu = (druh: ObjektMapy['druh']) =>
    setVrstvy((v) => {
      const n = new Set(v)
      if (n.has(druh)) n.delete(druh)
      else n.add(druh)
      return n
    })
  const popisek = (o: ObjektMapy) =>
    `${o.nazev}${o.stav && o.stav !== 'ok' ? `, ${NAZEV_STAVU[o.stav]}` : ''}${o.druh === 'zamek' ? `, ${zamky.jeZamceno(o.id) ? 'zamčeno' : 'odemčeno'}` : ''}`

  return (
    <>
      <p className="rp-pozn">Data k {aktualizovano}. Klikněte na kameru, čidlo nebo zámek.</p>
      <div className="rp-vrstvy">
        <fieldset className="rp-vrstvy__volby">
          <legend className="sr-only">Vrstvy mapy</legend>
          {VRSTVY.map((v) => (
            <label key={v.druh}>
              <input type="checkbox" checked={vrstvy.has(v.druh)} onChange={() => prepniVrstvu(v.druh)} />
              {v.nazev}
            </label>
          ))}
        </fieldset>
        <button type="button" className="rp-vrstvy__seznam" aria-pressed={jakoSeznam} onClick={() => setJakoSeznam((s) => !s)}>
          Zobrazit jako seznam
        </button>
      </div>
      <div className="rp-mapa-rozvrzeni">
        {jakoSeznam ? (
          <ul className="rp-seznam">
            {viditelne.map((o) => (
              <li key={o.id}>
                <button type="button" aria-pressed={o.id === vybranyId} onClick={() => vyber(o.id)}>
                  <span>{o.nazev}</span>
                  <span className="rp-pozn">
                    {VRSTVY.find((v) => v.druh === o.druh)?.nazev}
                    {o.stav ? `, ${NAZEV_STAVU[o.stav]}` : ''}
                    {o.druh === 'zamek' ? `, ${zamky.jeZamceno(o.id) ? 'zamčeno' : 'odemčeno'}` : ''}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <svg className="rp-mapa" viewBox="0 0 1000 600" role="group" aria-label={`Schematická mapa obce ${data.obec}`}>
            <rect width="1000" height="600" className="rp-mapa__pozadi" />
            <path d="M0 520 C150 470 220 560 120 600 H0z M60 420 q80 -60 170 10 q-40 90 -170 60z" className="rp-mapa__les" />
            <path d="M880 0 q-40 90 40 160 q60 40 80 0 V0z" className="rp-mapa__les" />
            <path d="M560 0 C600 160 700 250 760 420 S860 560 900 600" className="rp-mapa__potok" />
            <path d="M0 300 H1000 M500 0 V600 M500 300 L880 120 M500 300 L880 540" className="rp-mapa__silnice" />
            <circle cx="480" cy="290" r="70" className="rp-mapa__naves" />
            <text x="480" y="372" textAnchor="middle" className="rp-mapa__popisek">
              Náves
            </text>
            <text x="600" y="60" className="rp-mapa__popisek">
              Javornický potok
            </text>
            <text x="760" y="110" className="rp-mapa__popisek">
              III/171 Podjavoří
            </text>
            {viditelne.map((o) => (
              <g key={o.id} transform={`translate(${o.x} ${o.y})`}>
                <a
                  href={`#${id}-detail`}
                  role="button"
                  aria-label={popisek(o)}
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
        <div id={`${id}-detail`} ref={detail} tabIndex={-1} className="rp-detail" aria-labelledby={`${id}-detail-nadpis`}>
          {vybrany ? (
            <>
              <p className="rp-pozn">{VRSTVY.find((v) => v.druh === vybrany.druh)?.nazev}</p>
              <h3 id={`${id}-detail-nadpis`}>{vybrany.nazev}</h3>
              {vybrany.popis ? <p className="rp-pozn">{vybrany.popis}</p> : null}
              {vybrany.stav ? (
                <p>
                  <Stitek stav={vybrany.stav}>{NAZEV_STAVU[vybrany.stav]}</Stitek>
                </p>
              ) : null}
              {vybrany.druh === 'kamera' ? <DetailKamery key={vybrany.id} o={vybrany} /> : null}
              {vybrany.druh === 'zamek' ? <DetailZamku key={vybrany.id} o={vybrany} zamky={zamky} /> : null}
              {vybrany.hodnoty ? <Hodnoty hodnoty={vybrany.hodnoty} /> : null}
              {vybrany.odjezdy ? (
                <ul className="rp-odjezdy">
                  {vybrany.odjezdy.map((o) => (
                    <li key={`${o.linka}-${o.odjezd}`}>
                      <strong>{o.odjezd}</strong> {o.linka} směr {o.smer}
                      {o.zpozdeniMin > 0 ? <Stitek stav="varovani">zpoždění {o.zpozdeniMin} min</Stitek> : null}
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          ) : (
            <p id={`${id}-detail-nadpis`}>Vyberte objekt na mapě.</p>
          )}
        </div>
      </div>
      <Zaznam zaznam={zamky.zaznam} />
    </>
  )
}

/* ---------- Kamera ---------- */

function DetailKamery({ o }: { o: ObjektMapy }) {
  const [natoceni, setNatoceni] = useState(0)
  const [priblizeni, setPriblizeni] = useState(1)
  const [obnoveno, setObnoveno] = useState(cas)
  const k = o.kamera
  if (!k) return null
  const snimek = o.id === 'kamera-potok' ? '/demo/foto/sablona-13-mlyn.webp' : '/demo/foto/sablona-01-naves.webp'
  return (
    <>
      <figure className="rp-kamera">
        <div className="rp-kamera__obraz">
          <img src={snimek} alt={`Ukázkový snímek kamery ${o.nazev}, ilustrační fotografie vytvořená umělou inteligencí`} style={{ transform: `scale(${priblizeni}) translateX(${-natoceni}%)` }} />
          <span className="rp-kamera__ai" aria-hidden="true">
            AI
          </span>
          <span className="rp-kamera__zive">{k.online ? 'Online' : 'Offline'}</span>
        </div>
        <figcaption>
          Obnovení každých {k.obnovaSec} s, naposledy {obnoveno}.
        </figcaption>
      </figure>
      <div className="rp-ovladani" role="group" aria-label="Ovládání kamery">
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
      <p className="rp-pozn">
        Natočení {natoceni === 0 ? 'na střed' : `${Math.abs(natoceni * 3)}° ${natoceni < 0 ? 'vlevo' : 'vpravo'}`}, přiblížení {priblizeni.toLocaleString('cs-CZ')}×.
      </p>
      <dl className="rp-udaje">
        <dt>Účel</dt>
        <dd>{k.ucel}</dd>
        <dt>Ochrana soukromí</dt>
        <dd>{k.gdpr}</dd>
      </dl>
    </>
  )
}

export function WidgetKamera({ data }: { data: DataPanelu }) {
  const kamery = data.objekty.filter((o) => o.druh === 'kamera')
  const [vybrana, setVybrana] = useState(kamery[0]?.id ?? '')
  const id = useId()
  const k = kamery.find((o) => o.id === vybrana)
  if (!k) return <p>V obci není žádná kamera.</p>
  return (
    <>
      {kamery.length > 1 ? (
        <div className="rp-pole">
          <label htmlFor={`${id}-kamera`}>Vybraná kamera</label>
          <select id={`${id}-kamera`} value={vybrana} onChange={(e) => setVybrana(e.target.value)}>
            {kamery.map((o) => (
              <option key={o.id} value={o.id}>
                {o.nazev}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      {k.popis ? <p className="rp-pozn">{k.popis}</p> : null}
      <DetailKamery key={k.id} o={k} />
    </>
  )
}

/* ---------- Zámky ---------- */

function DetailZamku({ o, zamky }: { o: ObjektMapy; zamky: Zamky }) {
  const [duvod, setDuvod] = useState('')
  const id = useId()
  const z = o.zamek
  if (!z) return null
  const zamceno = zamky.jeZamceno(o.id)
  return (
    <>
      <p className="rp-velky-stav">
        <Stitek stav={zamceno ? 'ok' : 'varovani'}>{zamceno ? 'Zamčeno' : 'Odemčeno'}</Stitek>
        {z.baterie !== null ? <span className="rp-pozn">Baterie {z.baterie} %</span> : null}
      </p>
      <p className="rp-klic">Dveře lze vždy otevřít klíčem. Klíč má: {z.kdoMaKlic}.</p>
      {zamceno ? (
        <div className="rp-pole">
          <label htmlFor={`${id}-duvod`}>Důvod odemčení</label>
          <select id={`${id}-duvod`} value={duvod} onChange={(e) => setDuvod(e.target.value)}>
            <option value="">Vyberte důvod</option>
            {DUVODY.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <button type="button" className="rp-tlacitko" disabled={!duvod} onClick={() => zamky.prepni(o, false, duvod)}>
            Odemknout na 5 minut
          </button>
        </div>
      ) : (
        <button type="button" className="rp-tlacitko" onClick={() => zamky.prepni(o, true, 'Ruční zamčení')}>
          Zamknout
        </button>
      )}
      <p className="rp-pozn">V ostrém provozu smí dveře otevřít jen uživatel s právem Dveře po dvoufázovém ověření a každý pokus se zapíše do záznamu vstupů.</p>
    </>
  )
}

export function WidgetZamky({ data, zamky }: { data: DataPanelu; zamky: Zamky }) {
  const seznam = data.objekty.filter((o) => o.druh === 'zamek')
  return (
    <>
      <ul className="rp-zamky">
        {seznam.map((o) => (
          <li key={o.id}>
            <h3>{o.nazev}</h3>
            {o.popis ? <p className="rp-pozn">{o.popis}</p> : null}
            <DetailZamku o={o} zamky={zamky} />
          </li>
        ))}
      </ul>
      <Zaznam zaznam={zamky.zaznam} />
    </>
  )
}

/* ---------- Grafy ---------- */

const DNY = ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so']
const denTydne = (den: string) => DNY[new Date(`${den}T12:00:00Z`).getUTCDay()] ?? den

/** Sloupcový graf spotřeby. Čísla jsou i v tabulce pro čtečky, graf je jen doplněk. */
export function WidgetEnergie({ data }: { data: DataPanelu }) {
  const dny = data.budovy[0]?.energie.map((e) => e.den) ?? []
  const soucty = dny.map((den) => data.budovy.reduce((s, b) => s + (b.energie.find((e) => e.den === den)?.kWh ?? 0), 0))
  const max = Math.max(1, ...soucty)
  const posledni = soucty.at(-1) ?? 0
  const celkem = soucty.reduce((a, b) => a + b, 0)
  const id = useId()
  const v = 160
  const sirka = 100 / Math.max(1, soucty.length)
  return (
    <>
      <div className="rp-velka-cisla">
        <p>
          <span className="rp-cislo">{cislo(posledni)} kWh</span>
          <span className="rp-pozn">dnes, všechny budovy</span>
        </p>
        <p>
          <span className="rp-cislo rp-cislo--mensi">{cislo(celkem)} kWh</span>
          <span className="rp-pozn">za 7 dní</span>
        </p>
      </div>
      <svg className="rp-graf" viewBox={`0 0 100 ${v + 20}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
        {[0.25, 0.5, 0.75].map((c) => (
          <line key={c} x1="0" x2="100" y1={v - v * c} y2={v - v * c} className="rp-graf__mrizka" />
        ))}
        {soucty.map((s, i) => {
          const h = (s / max) * (v - 8)
          return <rect key={dny[i]} x={i * sirka + sirka * 0.2} width={sirka * 0.6} y={v - h} height={h} rx="1.5" className={i === soucty.length - 1 ? 'rp-graf__sloupec rp-graf__sloupec--dnes' : 'rp-graf__sloupec'} />
        })}
      </svg>
      <div className="rp-graf__osa" aria-hidden="true">
        {dny.map((d) => (
          <span key={d}>{denTydne(d)}</span>
        ))}
      </div>
      <table className="rp-tabulka">
        <caption className="sr-only">Spotřeba energie podle budov za posledních 7 dní v kWh</caption>
        <thead>
          <tr>
            <th scope="col">Budova</th>
            <th scope="col">Dnes</th>
            <th scope="col">7 dní</th>
          </tr>
        </thead>
        <tbody>
          {data.budovy.map((b) => (
            <tr key={b.id}>
              <th scope="row">{b.nazev}</th>
              <td>{cislo(b.energie.at(-1)?.kWh ?? 0)}</td>
              <td>{cislo(b.energie.reduce((s, e) => s + e.kWh, 0))}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="sr-only" id={`${id}-dny`}>
        Součet po dnech: {dny.map((d, i) => `${denTydne(d)} ${soucty[i]} kWh`).join(', ')}.
      </p>
    </>
  )
}

export function WidgetTeploty({ data }: { data: DataPanelu }) {
  return (
    <ul className="rp-budovy">
      {data.budovy.map((b) => (
        <li key={b.id}>
          <div className="rp-budovy__hlava">
            <h3>{b.nazev}</h3>
            <Stitek stav={b.stav}>{NAZEV_STAVU[b.stav]}</Stitek>
          </div>
          {b.upozorneni.map((u) => (
            <p key={u} className="rp-upozorneni">
              {u}
            </p>
          ))}
          <ul className="rp-mistnosti">
            {b.mistnosti.map((m) => {
              const pod = m.teplota < m.cil - 1
              return (
                <li key={m.nazev}>
                  <span>{m.nazev}</span>
                  <span className="rp-mistnosti__teplota">{cislo(m.teplota)} °C</span>
                  <span className="rp-pruh" aria-hidden="true">
                    <span className={pod ? 'je-pod' : undefined} style={{ width: `${Math.min(100, Math.round((m.teplota / 25) * 100))}%` }} />
                    <span className="rp-pruh__cil" style={{ left: `${Math.min(100, Math.round((m.cil / 25) * 100))}%` }} />
                  </span>
                  <span className="rp-pozn">
                    cíl {m.cilText}
                    {m.oknoOtevrene ? ', okno otevřené' : ''}
                  </span>
                </li>
              )
            })}
          </ul>
        </li>
      ))}
    </ul>
  )
}

/* ---------- Čidla ---------- */

export function WidgetCidla({ data }: { data: DataPanelu }) {
  const p = data.potok
  const strop = p.stupne.ohrozeni
  const proc = (x: number) => `${Math.min(100, Math.round((x / strop) * 100))}%`
  return (
    <>
      <div className="rp-vodocet">
        <p>
          <span className="rp-cislo">
            {p.hladina} {p.jednotka}
          </span>
          <span className="rp-pozn">hladina potoka, bdělost od {p.stupne.bdelost} cm</span>
        </p>
        <span className="rp-pruh rp-pruh--vodocet" aria-hidden="true">
          <span style={{ width: proc(p.hladina) }} />
          <span className="rp-pruh__cil" style={{ left: proc(p.stupne.bdelost) }} />
          <span className="rp-pruh__cil" style={{ left: proc(p.stupne.pohotovost) }} />
        </span>
      </div>
      <ul className="rp-cidla">
        {data.cidla.map((c) => (
          <li key={c.id}>
            <div className="rp-budovy__hlava">
              <h3>{c.nazev}</h3>
              <Stitek stav={c.stav}>{NAZEV_STAVU[c.stav]}</Stitek>
            </div>
            <p className="rp-pozn">{c.popis}</p>
            <Hodnoty hodnoty={c.hodnoty} />
          </li>
        ))}
      </ul>
      <a className="rp-odkaz" href="/ukazka/administrace/chytra-obec">
        Nastavit čidla a limity varování
      </a>
    </>
  )
}

/* ---------- Doprava, parkování, závady ---------- */

export function WidgetOdjezdy({ data }: { data: DataPanelu }) {
  return (
    <>
      <ul className="rp-odjezdy rp-odjezdy--velke">
        {data.odjezdy.map((o) => (
          <li key={`${o.linka}-${o.odjezd}-${o.stanice}`}>
            <span className="rp-odjezdy__cas">{o.odjezd}</span>
            <span>
              <strong>{o.linka}</strong> směr {o.smer}
              <span className="rp-pozn">
                {o.stanice}, {o.dopravce}
                {o.nizkopodlazni ? ', nízkopodlažní' : ''}
              </span>
            </span>
            <Stitek stav={o.zpozdeniMin > 0 ? 'varovani' : 'ok'}>{o.zpozdeniMin > 0 ? `+${o.zpozdeniMin} min` : 'včas'}</Stitek>
          </li>
        ))}
      </ul>
      <p className="rp-pozn">Ukázková data. Ostrý provoz čte jízdní řády a zpoždění z dat kraje a dopravců [OVĚŘIT zdroj].</p>
    </>
  )
}

export function WidgetParkovani({ data }: { data: DataPanelu }) {
  const kapacita = data.parkovani.reduce((s, p) => s + p.kapacita, 0)
  const volno = data.parkovani.reduce((s, p) => s + p.volno, 0)
  return (
    <>
      {/* Souhrn číslem, obsazenost jednotlivých parkovišť ukazují pruhy pod ním. */}
      <p className="rp-souhrn-parkovani">
        <span className="rp-cislo">{volno}</span>
        <span className="rp-pozn">volných míst z {kapacita}</span>
      </p>
      <ul className="rp-parkovani">
        {data.parkovani.map((p) => (
          <li key={p.id}>
            <span>{p.nazev}</span>
            <strong>
              {p.volno} z {p.kapacita} volných
            </strong>
            <span className="rp-pruh" aria-hidden="true">
              <span style={{ width: `${Math.round(((p.kapacita - p.volno) / p.kapacita) * 100)}%` }} />
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}

export function WidgetZavady({ data }: { data: DataPanelu }) {
  return (
    <>
      <p>
        <span className="rp-cislo">{data.zavady.length}</span> <span className="rp-pozn">čeká na vyřízení</span>
      </p>
      <ul className="rp-zavady">
        {data.zavady.map((z) => (
          <li key={z.id}>
            <span className="rp-pozn">{z.cislo}</span>
            <span>{z.popis}</span>
            <Stitek>{z.stav}</Stitek>
          </li>
        ))}
      </ul>
      <a href="/ukazka/administrace/zavady" className="rp-tlacitko">
        Vyřídit závady
      </a>
    </>
  )
}
