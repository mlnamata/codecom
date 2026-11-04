import type { Metadata } from 'next'
import { uloziste } from '@/lib/data/demo-pamet'
import { SpravaBlogu } from './SpravaBlogu'

export const metadata: Metadata = { title: 'Blog a aktuality | Administrace' }
export const dynamic = 'force-dynamic'

export default function NovaAktualita() {
  const { obec, aktuality } = uloziste()
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <h1>Správa blogu a zpráv obce</h1>
        <a href="/aktuality" className="mala" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
          Zobrazit veřejný blog
        </a>
      </div>
      <p style={{ marginTop: 0, marginBottom: 20 }}>
        Kompletní redakční systém pro obecní zprávy, magazín a aktuality. Skládejte články z obsahových widgetů, filtrujte podle rubrik a chraňte osobní údaje.
      </p>

      <SpravaBlogu
        seznam={aktuality.map((a) => ({
          id: a.id,
          slug: a.slug,
          titulek: a.titulek,
          perex: a.perex,
          obsah: a.obsah,
          rubrika: a.rubrika,
          autor: a.autor,
          publikovano: a.publikovano,
          stitky: ['#obec', `#${a.rubrika}`],
        }))}
        telefonUradu={obec.telefon}
        emailUradu={obec.email}
      />
    </>
  )
}
