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
      <h1>Aktuality a obecní blog</h1>
      <p className="vedlejsi" style={{ marginTop: 0, marginBottom: 24 }}>
        Zprávy z radnice, oznámení o uzavírkách a investicích, pozvánky spolků i obecní magazín.
      </p>
      {aktuality.length === 0 ? <p>Zatím tu nejsou žádné zprávy.</p> : null}
      <ul className="seznam" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {aktuality.map((a) => {
          const pocetSlov = `${a.titulek} ${a.perex} ${a.obsah.join(' ')}`.split(/\s+/).length
          const minuty = Math.max(1, Math.ceil(pocetSlov / 160))
          return (
            <li key={a.id} style={{ paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <span className="stitek" style={{ fontSize: 13 }}>
                  {RUBRIKY[a.rubrika]}
                </span>
                <span className="vedlejsi" style={{ fontSize: 14 }}>
                  {formatDateTime(a.publikovano)} · {minuty} min čtení
                </span>
              </div>
              <h2 style={{ fontSize: 22, margin: '4px 0 8px' }}>
                <a href={`/aktuality/${a.slug}`}>{a.titulek}</a>
              </h2>
              <p style={{ margin: 0, fontSize: 16 }}>{a.perex}</p>
            </li>
          )
        })}
      </ul>
    </>
  )
}
