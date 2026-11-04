import type { Metadata } from 'next'
import Link from 'next/link'
import { Markdown } from '@/komponenty/Markdown'
import { Snimek } from '@/komponenty/Snimek'
import { casti, naHtml, nactiStranku } from '@/lib/obsah'
import { sablonyGalerie } from '@/lib/sablony'

const stranka = nactiStranku('ukazky')

export const metadata: Metadata = { title: stranka.title, description: stranka.description, alternates: { canonical: '/ukazky' } }

export default function Ukazky() {
  const { uvod, casti: c } = casti(stranka.telo)
  const vyber = c.find((x) => x.nadpis === 'Jak šablonu vybrat')
  return (
    <>
      <div className="obal pt-12">
        <Markdown html={naHtml(uvod)} />
      </div>
      <section aria-labelledby="sablony" className="obal mt-12">
        <h2 id="sablony" className="text-[28px]">
          Šablony
        </h2>
        <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {sablonyGalerie().map((s, i) => (
            <li key={s.klic}>
              <Link href={`/ukazky/${s.klic}`} className="group block no-underline">
                <Snimek
                  src={s.palety[0]!.snimek}
                  alt={`Úvodní stránka šablony ${s.nazev} pro obec Javoří Lhota, paleta ${s.palety[0]!.nazev}.`}
                  priorita={i < 3}
                  sizes="(min-width: 1120px) 360px, (min-width: 640px) 50vw, 100vw"
                />
                <span className="mt-4 flex items-baseline gap-3">
                  <span className="text-[14px] text-sediva">{s.cislo}</span>
                  <span className="text-[20px] font-semibold group-hover:underline" style={{ fontFamily: 'var(--font-nadpis)' }}>
                    {s.nazev}
                  </span>
                </span>
                <span className="mt-1 block text-[#333]">{s.proKoho}</span>
                <span className="mt-3 flex gap-1.5" aria-hidden="true">
                  {s.palety.map((p) => (
                    <span key={p.index} className="size-4 rounded-full border border-linka" style={{ background: p.barvy[3]!.hodnota }} />
                  ))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      {vyber ? (
        <div className="obal mt-16">
          <Markdown html={naHtml(`## ${vyber.nadpis}\n${vyber.telo}`)} />
        </div>
      ) : null}
    </>
  )
}
