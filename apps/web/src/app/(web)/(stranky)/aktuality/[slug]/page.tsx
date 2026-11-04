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
  const pocetSlov = `${a.titulek} ${a.perex} ${a.obsah.join(' ')}`.split(/\s+/).length
  const minuty = Math.max(1, Math.ceil(pocetSlov / 160))
  return (
    <>
      <Drobecky polozky={[{ nazev: 'Aktuality', href: '/aktuality' }, { nazev: a.titulek }]} />
      <article>
        <h1>{a.titulek}</h1>
        <p className="vedlejsi">
          {a.autor}, {formatDateTime(a.publikovano)} · {minuty} min čtení
        </p>
        <p style={{ fontSize: '1.1em', fontWeight: 500, lineHeight: 1.6 }}>{a.perex}</p>
        {a.obsah.map((o) => (
          <p key={o} style={{ fontSize: 17, lineHeight: 1.6 }}>{o}</p>
        ))}
        {dokumenty.length > 0 ? (
          <div style={{ marginTop: 28, padding: 16, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 8 }}>
            <h2 style={{ fontSize: 19, margin: '0 0 10px' }}>Související dokumenty na úřední desce</h2>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {dokumenty.map((d) => (
                <li key={d.id} style={{ marginBottom: 4 }}>
                  <a href={`/uredni-deska/${d.id}`}>{d.nazev}</a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>
      <p>
        <a href="/aktuality">Všechny aktuality</a>
      </p>
    </>
  )
}
