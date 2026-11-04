import type { Metadata } from 'next'
import Link from 'next/link'
import { KalkulackaCeniku } from '@/komponenty/KalkulackaCeniku'
import { Markdown } from '@/komponenty/Markdown'
import { casti, naHtml, nactiStranku } from '@/lib/obsah'

const stranka = nactiStranku('cenik')

export const metadata: Metadata = { title: stranka.title, description: stranka.description, alternates: { canonical: '/cenik' } }

const KALKULACKA = 'Spočítejte orientační cenu'

export default function Cenik() {
  const { uvod, casti: c } = casti(stranka.telo)
  const md = (x: { nadpis: string; telo: string }) => naHtml(`## ${x.nadpis}\n${x.telo}`)
  const i = c.findIndex((x) => x.nadpis === KALKULACKA)
  const pred = c.slice(0, i < 0 ? c.length : i)
  const po = i < 0 ? [] : c.slice(i + 1)
  return (
    <div className="obal pt-12">
      <Markdown html={naHtml(uvod)} />
      {pred.map((x) => (
        <Markdown key={x.nadpis} html={md(x)} />
      ))}
      <p className="prosa">
        <Link href="/urovne" className="odkaz font-medium">
          Podrobné porovnání tří úrovní
        </Link>
      </p>
      {i >= 0 ? (
        <section aria-labelledby="kalkulacka" className="max-w-[880px]">
          <h2 id="kalkulacka" className="mt-12 border-t border-linka pt-6 text-[28px]">
            {KALKULACKA}
          </h2>
          <KalkulackaCeniku />
        </section>
      ) : null}
      {po.map((x) => (
        <Markdown key={x.nadpis} html={md(x)} />
      ))}
    </div>
  )
}
