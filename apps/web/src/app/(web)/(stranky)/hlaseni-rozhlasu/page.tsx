import type { Metadata } from 'next'
import { formatDateTime, tykaSe } from '@codekom/typy/pravidla'
import { Drobecky } from '@/components/stranka/Casti'
import { zdroj } from '@/lib/data/zdroj'
import { nactiObec, slugObce } from '@/lib/web'

export const metadata: Metadata = { title: 'Hlášení rozhlasu' }

export default async function HlaseniRozhlasu() {
  const obec = await nactiObec()
  const hlaseni = await (await zdroj()).rozhlas(slugObce())
  return (
    <>
      <Drobecky polozky={[{ nazev: 'Hlášení rozhlasu' }]} />
      <h1>Hlášení obecního rozhlasu</h1>
      <p>Co zaznělo z rozhlasu, přepsané do textu.</p>
      <ul className="seznam">
        {hlaseni.map((h) => {
          const casti = tykaSe(h.casti, obec.castiObce)
          return (
            <li key={h.id} id={h.id}>
              <h2 style={{ fontSize: 21 }}>{h.titulek}</h2>
              <p className="vedlejsi">
                {formatDateTime(h.cas)}
                {casti ? `, ${casti}` : ', celá obec'}
              </p>
              <p>{h.text}</p>
            </li>
          )
        })}
      </ul>
    </>
  )
}
