import type { Metadata } from 'next'
import { Drobecky, VyriditeNaUrade } from '@/components/stranka/Casti'
import { zdroj } from '@/lib/data/zdroj'
import { nactiObec, slugObce } from '@/lib/web'

export const metadata: Metadata = { title: 'Životní situace' }

export default async function ZivotniSituace() {
  const obec = await nactiObec()
  const situace = await (await zdroj()).zivotniSituace(slugObce())
  return (
    <>
      <Drobecky polozky={[{ nazev: 'Životní situace' }]} />
      <h1>Životní situace</h1>
      <p>Co dělat, když se stěhujete, narodí se vám dítě nebo stavíte. Krok za krokem, s tím, co jde online a co na úřadě.</p>
      <ul className="seznam">
        {situace.map((s) => (
          <li key={s.id}>
            <h2 style={{ fontSize: 21 }}>
              <a href={`/zivotni-situace/${s.slug}`}>{s.nazev}</a>
            </h2>
            <p style={{ margin: 0 }}>{s.kroky.length} kroků. {s.kdoPoradi}</p>
          </li>
        ))}
      </ul>
      <VyriditeNaUrade obec={obec} />
    </>
  )
}
