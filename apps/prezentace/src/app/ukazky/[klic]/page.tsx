import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FotoAi } from '@/komponenty/FotoAi'
import { PrepinacPalet } from '@/komponenty/PrepinacPalet'
import { odkazAplikace, odkazDema } from '@/lib/demo'
import { najdiSablonu, sablonyGalerie } from '@/lib/sablony'

export const dynamicParams = false
export const generateStaticParams = () => sablonyGalerie().map((s) => ({ klic: s.klic }))

export async function generateMetadata({ params }: { params: Promise<{ klic: string }> }): Promise<Metadata> {
  const s = najdiSablonu((await params).klic)
  if (!s) return {}
  return {
    title: `Šablona ${s.nazev} pro web obce – CodeKom`,
    description: `${s.proKoho} ${s.cimSeLisi}`.slice(0, 155),
    alternates: { canonical: `/ukazky/${s.klic}` },
  }
}

export default async function DetailSablony({ params }: { params: Promise<{ klic: string }> }) {
  const { klic } = await params
  const vse = sablonyGalerie()
  const i = vse.findIndex((s) => s.klic === klic)
  const s = vse[i]
  if (!s) notFound()
  const dalsi = vse[(i + 1) % vse.length]!
  const predchozi = vse[(i - 1 + vse.length) % vse.length]!
  const odkazy = s.palety.map((p) => odkazDema(s.klic, p.index))
  return (
    <div className="obal pt-10">
      <nav aria-label="Drobečková navigace" className="text-[15px]">
        <Link href="/ukazky" className="odkaz">
          Šablony
        </Link>
        <span className="mx-2 text-sediva" aria-hidden="true">
          /
        </span>
        <span aria-current="page">{s.nazev}</span>
      </nav>
      <p className="stitek mt-6">Šablona {s.cislo} z 20</p>
      <h1 className="mt-1 text-[34px] md:text-[48px]">{s.nazev}</h1>
      <p className="mt-3 max-w-[40em] text-[19px] text-[#333]">{s.proKoho}</p>

      <PrepinacPalet nazev={s.nazev} palety={s.palety} odkazyDema={odkazy} aplikace={odkazAplikace()} />

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <section aria-labelledby="cim">
          <h2 id="cim" className="text-[24px]">
            Čím se liší
          </h2>
          <p className="mt-3 text-[#333]">{s.cimSeLisi}</p>
          <p className="mt-4 text-[#333]">Všechny šablony mají úřední desku, rychlé úkony, kontakt na úřad, povinnou patičku a na telefonu sbalené menu.</p>
          <h2 className="mt-10 text-[24px]">Na telefonu</h2>
          <img
            src={s.snimekMobil}
            alt={`Úvodní stránka šablony ${s.nazev} na telefonu, paleta ${s.palety[0]!.nazev}.`}
            width={375}
            height={800}
            loading="lazy"
            className="mt-4 h-auto w-[240px] border border-linka"
          />
        </section>
        <section aria-labelledby="foto">
          <h2 id="foto" className="text-[24px]">
            Fotografie v úvodu
          </h2>
          <p className="mb-4 mt-3 text-[#333]">Obec do šablony dá vlastní fotky. V ukázce je ilustrační fotka.</p>
          <FotoAi src={s.foto} alt={`Fotografie z úvodu šablony ${s.nazev}.`} />
        </section>
      </div>

      <nav aria-label="Další šablony" className="mt-16 flex flex-wrap justify-between gap-4 border-t border-linka pt-6">
        <Link href={`/ukazky/${predchozi.klic}`} className="odkaz">
          Předchozí: {predchozi.nazev}
        </Link>
        <Link href={`/ukazky/${dalsi.klic}`} className="odkaz">
          Další: {dalsi.nazev}
        </Link>
      </nav>
      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/urovne" className="tlacitko">
          Vybrat úroveň editoru
        </Link>
        <Link href="/cenik" className="tlacitko-obrys">
          Spočítat cenu
        </Link>
      </div>
    </div>
  )
}
