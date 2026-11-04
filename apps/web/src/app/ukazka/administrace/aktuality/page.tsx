import type { Metadata } from 'next'
import { uloziste } from '@/lib/data/demo-pamet'
import { FormAktualita } from '../Formulare'

export const metadata: Metadata = { title: 'Nová aktualita' }
export const dynamic = 'force-dynamic'

export default function NovaAktualita() {
  const { obec, aktuality } = uloziste()
  return (
    <>
      <h1>Nová aktualita</h1>
      <p>Před zveřejněním kontrolujeme popis obrázku, nadpisy a osobní údaje v textu.</p>
      <FormAktualita telefon={obec.telefon} email={obec.email} />
      <h2>Poslední zveřejněné</h2>
      <ul>
        {aktuality.slice(0, 5).map((a) => (
          <li key={a.id}>
            <a href={`/aktuality/${a.slug}`}>{a.titulek}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
