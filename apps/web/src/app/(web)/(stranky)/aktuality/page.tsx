import type { Metadata } from 'next'
import { formatDateTime } from '@codekom/typy/pravidla'
import { Drobecky } from '@/components/stranka/Casti'
import { zdroj } from '@/lib/data/zdroj'
import { slugObce } from '@/lib/web'

export const metadata: Metadata = { title: 'Aktuality' }

const RUBRIKY = { zpravy: 'Zprávy', oznameni: 'Oznámení', kultura: 'Kultura', zpravodaj: 'Zpravodaj' } as const

export default async function Aktuality() {
  const aktuality = await (await zdroj()).aktuality(slugObce())
  return (
    <>
      <Drobecky polozky={[{ nazev: 'Aktuality' }]} />
      <h1>Aktuality</h1>
      {aktuality.length === 0 ? <p>Zatím tu nejsou žádné zprávy.</p> : null}
      <ul className="seznam">
        {aktuality.map((a) => (
          <li key={a.id}>
            <h2 style={{ fontSize: 21 }}>
              <a href={`/aktuality/${a.slug}`}>{a.titulek}</a>
            </h2>
            <p className="vedlejsi">
              {RUBRIKY[a.rubrika]}, {formatDateTime(a.publikovano)}
            </p>
            <p>{a.perex}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
