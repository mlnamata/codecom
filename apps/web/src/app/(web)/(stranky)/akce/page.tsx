import type { Metadata } from 'next'
import { demoTed } from '@codekom/demo-data'
import { pragueDayKey, tykaSe } from '@codekom/typy/pravidla'
import { Drobecky } from '@/components/stranka/Casti'
import { zdroj } from '@/lib/data/zdroj'
import { denSlovemRok } from '@/sablony/sdilene/format'
import { nactiObec, slugObce } from '@/lib/web'

export const metadata: Metadata = { title: 'Akce' }

const DNY = ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota']
const den = (d: string): string => DNY[new Date(`${d}T12:00:00.000Z`).getUTCDay()] ?? ''
const cas = (od: string | null, doKdy: string | null): string =>
  od ? (doKdy ? `${od.replace(/^0/, '')} až ${doKdy.replace(/^0/, '')}` : `od ${od.replace(/^0/, '')}`) : 'celý den'

export default async function Akce() {
  const obec = await nactiObec()
  const akce = await (await zdroj()).akce(slugObce(), { odDne: pragueDayKey(demoTed()) })
  return (
    <>
      <Drobecky polozky={[{ nazev: 'Akce' }]} />
      <h1>Akce v obci</h1>
      {akce.length === 0 ? <p>V nejbližší době se nic nekoná.</p> : null}
      <ul className="seznam">
        {akce.map((a) => {
          const casti = tykaSe(a.casti, obec.castiObce)
          return (
            <li key={a.id} id={a.slug} tabIndex={-1}>
              <h2 style={{ fontSize: 21 }}>{a.nazev}</h2>
              <p className="vedlejsi">
                {den(a.den)} {denSlovemRok(a.den)}, {cas(a.od, a.do)}, {a.misto}
              </p>
              <p>{a.popis}</p>
              <p className="vedlejsi">
                Pořádá: {a.poradatel}
                {casti ? `. Týká se: ${casti}` : ''}
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}
