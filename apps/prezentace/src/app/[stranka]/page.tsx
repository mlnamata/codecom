import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Markdown } from '@/komponenty/Markdown'
import { naHtml, nactiStranku, vsechnyStranky } from '@/lib/obsah'

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

export default async function Stranka({ params }: { params: Promise<{ stranka: string }> }) {
  const { stranka } = await params
  const s = stranky().find((x) => x.adresa === `/${stranka}`)
  if (!s) notFound()
  return (
    <div className="obal pt-12">
      <Markdown html={naHtml(s.telo)} />
      {s.soubor === 'ke-stazeni' ? (
        <section id="caste-otazky" aria-label="Časté otázky" className="mt-16">
          <Markdown html={naHtml(nactiStranku('faq').telo.replace(/^# /m, '## '))} />
        </section>
      ) : null}
    </div>
  )
}
