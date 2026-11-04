import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { formatDateTime } from '@codekom/typy/pravidla'
import { Drobecky } from '@/components/stranka/Casti'
import { zdroj } from '@/lib/data/zdroj'
import { slugObce } from '@/lib/web'

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const a = await (await zdroj()).aktualita(slugObce(), (await params).slug)
  return { title: a?.titulek ?? 'Zpráva nenalezena', description: a?.perex }
}

export default async function Aktualita({ params }: { params: Params }) {
  const z = await zdroj()
  const obec = slugObce()
  const a = await z.aktualita(obec, (await params).slug)
  if (!a) notFound()
  const dokumenty = (await Promise.all(a.dokumentyDesky.map((id) => z.dokument(obec, id)))).filter((d) => d !== null)
  return (
    <>
      <Drobecky polozky={[{ nazev: 'Aktuality', href: '/aktuality' }, { nazev: a.titulek }]} />
      <article>
        <h1>{a.titulek}</h1>
        <p className="vedlejsi">
          {a.autor}, {formatDateTime(a.publikovano)}
        </p>
        <p style={{ fontSize: '1.1em' }}>{a.perex}</p>
        {a.obsah.map((o) => (
          <p key={o}>{o}</p>
        ))}
        {dokumenty.length > 0 ? (
          <>
            <h2>Na úřední desce</h2>
            <ul>
              {dokumenty.map((d) => (
                <li key={d.id}>
                  <a href={`/uredni-deska/${d.id}`}>{d.nazev}</a>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </article>
      <p>
        <a href="/aktuality">Všechny aktuality</a>
      </p>
    </>
  )
}
