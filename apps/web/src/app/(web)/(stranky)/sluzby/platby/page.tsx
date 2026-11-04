import type { Metadata } from 'next'
import QRCode from 'qrcode'
import { demoTed } from '@codekom/demo-data'
import { Drobecky, VyriditeNaUrade } from '@/components/stranka/Casti'
import { zdroj } from '@/lib/data/zdroj'
import { ibanZCislaUctu, NEPLATNY_IBAN, spd, variabilniSymbol } from '@/lib/platby'
import { nactiObec, slugObce } from '@/lib/web'

export const metadata: Metadata = { title: 'Zaplatit poplatky' }

type SearchParams = Promise<Record<string, string | string[] | undefined>>

const prvni = (v: string | string[] | undefined): string => (Array.isArray(v) ? (v[0] ?? '') : (v ?? ''))
const kc = (n: number): string => `${n.toLocaleString('cs-CZ').replace(/\s/g, ' ')} Kč`

/**
 * Poplatky obce a QR platba. Peníze jdou přímo na účet obce (pravidlo 3).
 * Ukázková obec nemá platné číslo účtu, proto QR kód nejde zaplatit.
 */
export default async function Platby({ searchParams }: { searchParams: SearchParams }) {
  const obec = await nactiObec()
  const poplatky = await (await zdroj()).poplatky(slugObce())
  const sp = await searchParams
  const zvoleny = poplatky.find((p) => p.id === prvni(sp.poplatek)) ?? null
  const cpText = prvni(sp.cp).trim()
  const cp = /^\d{1,4}$/.test(cpText) ? Number(cpText) : null
  const chybaCp = cpText && cp === null ? 'Zadejte číslo popisné, jen číslice, nejvýš 4.' : null

  let qr: { svg: string; iban: string; platny: boolean; vs: string; zprava: string; castka: number } | null = null
  if (zvoleny && cp !== null && cp > 0) {
    const iban = ibanZCislaUctu(obec.cisloUctu)
    const vs = variabilniSymbol(demoTed().getUTCFullYear(), cp, zvoleny.poradiVs)
    const zprava = `Ukazka, neplatte. ${zvoleny.nazev}, cp ${cp}`
    const retezec = spd({ iban: iban ?? NEPLATNY_IBAN, castka: zvoleny.castka, vs, zprava })
    const svg = await QRCode.toString(retezec, { type: 'svg', errorCorrectionLevel: 'M', margin: 2 })
    qr = { svg, iban: iban ?? NEPLATNY_IBAN, platny: iban !== null, vs, zprava, castka: zvoleny.castka }
  }

  return (
    <>
      <Drobecky polozky={[{ nazev: 'Služby', href: '/sluzby' }, { nazev: 'Zaplatit poplatky' }]} />
      <h1>Zaplatit poplatky</h1>
      <p>Poplatky platíte přímo na účet obce. Obec ani CodeKom za vás peníze nedrží.</p>

      <div className="tabulka-obal">
        <table>
          <caption>Místní poplatky</caption>
          <thead>
            <tr>
              <th scope="col">Poplatek</th>
              <th scope="col">Částka</th>
              <th scope="col">Splatnost</th>
              <th scope="col">Kdo platí</th>
              <th scope="col">Úlevy</th>
            </tr>
          </thead>
          <tbody>
            {poplatky.map((p) => (
              <tr key={p.id}>
                <th scope="row" style={{ fontWeight: 400 }}>
                  {p.nazev}
                </th>
                <td>
                  {kc(p.castka)} {p.jednotka}
                </td>
                <td>{p.splatnostText}</td>
                <td>{p.kdoPlati}</td>
                <td>{p.ulevy ?? 'bez úlev'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>QR platba</h2>
      <form method="get" action="/sluzby/platby#qr" className="panel">
        <div className="mrizka">
          <div className="pole">
            <label htmlFor="poplatek">Poplatek</label>
            <select id="poplatek" name="poplatek" defaultValue={zvoleny?.id ?? poplatky[0]?.id}>
              {poplatky.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nazev}, {kc(p.castka)}
                </option>
              ))}
            </select>
          </div>
          <div className="pole">
            <label htmlFor="cp">Číslo popisné</label>
            <span id="cp-napoveda" className="napoveda">
              Podle něj poznáme, za koho platíte.
            </span>
            {chybaCp ? (
              <span id="cp-chyba" className="chyba-pole">
                Chyba: {chybaCp}
              </span>
            ) : null}
            <input
              id="cp"
              name="cp"
              type="text"
              inputMode="numeric"
              defaultValue={cpText}
              maxLength={4}
              aria-invalid={chybaCp ? true : undefined}
              aria-describedby={chybaCp ? 'cp-napoveda cp-chyba' : 'cp-napoveda'}
            />
          </div>
        </div>
        <button type="submit">Vytvořit QR kód</button>
      </form>

      {qr ? (
        <section id="qr" aria-labelledby="qr-nadpis" className="panel">
          <h3 id="qr-nadpis" style={{ marginTop: 0 }}>
            QR kód pro {zvoleny?.nazev.toLowerCase()}
          </h3>
          <p className="ukazka-neplatte">Ukázka, neplaťte</p>
          {qr.platny ? null : <p>Ukázková obec nemá platné číslo účtu. Kód má zjevně neplatný IBAN a nejde zaplatit.</p>}
          <div className="qr" role="img" aria-label="QR kód platby, ukázka, nejde zaplatit" dangerouslySetInnerHTML={{ __html: qr.svg }} />
          <dl className="udaje">
            <dt>Částka</dt>
            <dd>{kc(qr.castka)}</dd>
            <dt>Účet</dt>
            <dd>{obec.cisloUctu}</dd>
            <dt>IBAN v kódu</dt>
            <dd>{qr.iban}</dd>
            <dt>Variabilní symbol</dt>
            <dd>{qr.vs}</dd>
            <dt>Zpráva</dt>
            <dd>{qr.zprava}</dd>
          </dl>
        </section>
      ) : null}

      <VyriditeNaUrade obec={obec}>Poplatky zaplatíte i hotově nebo kartou na úřadě.</VyriditeNaUrade>
    </>
  )
}
