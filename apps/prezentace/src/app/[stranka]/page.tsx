import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/komponenty/JsonLd'
import { Markdown } from '@/komponenty/Markdown'
import soubory from '@/data/ke-stazeni.json'
import { casti, naHtml, nactiStranku, vsechnyStranky } from '@/lib/obsah'
import { faqJsonLd } from '@/lib/seo'

/** Stránky, které nemají vlastní rozvržení: text z obsah/prezentace beze změny. */
const VLASTNI = new Set(['/', '/ukazky', '/cenik'])
const stranky = () => vsechnyStranky().filter((s) => !VLASTNI.has(s.adresa) && /^\/[\w-]+$/.test(s.adresa))

export const dynamicParams = false
export const generateStaticParams = () => stranky().map((s) => ({ stranka: s.adresa.slice(1) }))

export async function generateMetadata({ params }: { params: Promise<{ stranka: string }> }): Promise<Metadata> {
  const { stranka } = await params
  const s = stranky().find((x) => x.adresa === `/${stranka}`)
  return s ? { title: s.title, description: s.description, alternates: { canonical: s.adresa } } : {}
}

/** Odrážky „**Název.** popis“ v oddílu Dokumenty přiřazené k PDF podle pořadí. */
function KeStazeni() {
  const s = nactiStranku('ke-stazeni')
  const { uvod, casti: c } = casti(s.telo)
  const dokumenty = c.find((x) => x.nadpis === 'Dokumenty')
  const popisy = (dokumenty?.telo ?? '').split('\n').filter((r) => r.startsWith('- '))
  const ostatni = c.filter((x) => x !== dokumenty)
  const faq = nactiStranku('faq').telo.replace(/^# /m, '## ')
  return (
    <>
      <Markdown html={naHtml(uvod)} />
      <section aria-labelledby="dokumenty" className="prosa">
        <h2 id="dokumenty">Dokumenty</h2>
        <ul className="!list-none !pl-0">
          {soubory.map((f, i) => {
            const popis = (popisy[i] ?? '').replace(/^- \*\*[^*]+\*\*\s*/, '')
            return (
              <li key={f.soubor} className="border-t border-linka py-4">
                <a href={`/ke-stazeni/${f.soubor}`} className="font-medium" download>
                  {f.nazev}
                </a>
                <span className="stitek ml-2">PDF, {f.velikostKb} kB</span>
                {popis ? <p className="mb-0 mt-1" dangerouslySetInnerHTML={{ __html: naHtml(popis).replace(/^<p>|<\/p>\s*$/g, '') }} /> : null}
              </li>
            )
          })}
        </ul>
      </section>
      {ostatni.map((x) => (
        <Markdown key={x.nadpis} html={naHtml(`## ${x.nadpis}\n${x.telo}`)} />
      ))}
      <section id="caste-otazky" aria-label="Časté otázky" className="mt-16">
        <Markdown html={naHtml(faq)} />
      </section>
      <JsonLd data={faqJsonLd([s.telo, faq])} />
    </>
  )
}

export default async function Stranka({ params }: { params: Promise<{ stranka: string }> }) {
  const { stranka } = await params
  const s = stranky().find((x) => x.adresa === `/${stranka}`)
  if (!s) notFound()
  return <div className="obal pt-12">{s.soubor === 'ke-stazeni' ? <KeStazeni /> : <Markdown html={naHtml(s.telo)} />}</div>
}
