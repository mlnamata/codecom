import type { Metadata } from 'next'
import { demoTed } from '@codekom/demo-data'
import { NA_STRANU, obsahujeText, pragueDayKey } from '@codekom/typy/pravidla'
import { Drobecky, KontaktUradu } from '@/components/stranka/Casti'
import { zdroj } from '@/lib/data/zdroj'
import { nactiObec, slugObce } from '@/lib/web'

export const metadata: Metadata = { title: 'Hledat' }

type SearchParams = Promise<Record<string, string | string[] | undefined>>

interface Nalez {
  druh: string
  nazev: string
  popis: string
  href: string
}

async function vsechnyVerejneDokumenty(obec: string) {
  const z = await zdroj()
  const prvni = await z.deska(obec, { kategorie: null, stav: 'vse', q: '', strana: 1 })
  const stran = Math.ceil(prvni.celkem / NA_STRANU)
  const dalsi = await Promise.all(
    Array.from({ length: Math.max(0, stran - 1) }, (_, i) => z.deska(obec, { kategorie: null, stav: 'vse', q: '', strana: i + 2 })),
  )
  return [prvni, ...dalsi].flatMap((x) => x.polozky)
}

/**
 * Hledání bez ohledu na diakritiku a velikost písmen. Dokumenty desky jen veřejné
 * (visí, nebo sejmuté a smí do archivu); skryté po sejmutí se nikdy nenajdou.
 */
export default async function Hledat({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q)?.replace(/\s+/g, ' ').trim().slice(0, 100) ?? ''
  const obec = await nactiObec()
  const z = await zdroj()
  const s = slugObce()

  let nalezy: Nalez[] = []
  if (q) {
    const [aktuality, akce, deska, zastupitele, sluzby, situace] = await Promise.all([
      z.aktuality(s),
      z.akce(s, { odDne: pragueDayKey(demoTed()) }),
      vsechnyVerejneDokumenty(s),
      z.zastupitele(s),
      z.sluzby(s),
      z.zivotniSituace(s),
    ])
    const vse: Nalez[] = [
      ...aktuality.map((a) => ({ druh: 'Aktualita', nazev: a.titulek, popis: a.perex, href: `/aktuality/${a.slug}`, text: [a.titulek, a.perex, ...a.obsah].join(' ') })),
      ...akce.map((a) => ({ druh: 'Akce', nazev: a.nazev, popis: a.popis, href: `/akce#${a.slug}`, text: [a.nazev, a.popis, a.misto].join(' ') })),
      ...deska.map((d) => ({ druh: 'Úřední deska', nazev: d.nazev, popis: d.anotace, href: `/uredni-deska/${d.id}`, text: [d.nazev, d.anotace, d.cisloJednaci].join(' ') })),
      ...zastupitele.map((p) => ({ druh: 'Zastupitel', nazev: p.jmeno, popis: p.funkceText, href: '/zastupitelstvo', text: [p.jmeno, p.funkceText, p.vybory ?? ''].join(' ') })),
      ...sluzby.map((x) => ({ druh: 'Služba', nazev: x.nazev, popis: x.popis, href: x.odkaz ?? `/sluzby#${x.slug}`, text: [x.nazev, x.popis, ...x.klicovaSlova].join(' ') })),
      ...situace.map((x) => ({ druh: 'Životní situace', nazev: x.nazev, popis: x.kdoPoradi, href: `/zivotni-situace/${x.slug}`, text: [x.nazev, ...x.kroky.map((k) => `${k.nazev} ${k.text}`)].join(' ') })),
    ]
      .filter((x) => obsahujeText(x.text, q))
      .map(({ druh, nazev, popis, href }) => ({ druh, nazev, popis, href }))
    nalezy = vse
  }

  return (
    <>
      <Drobecky polozky={[{ nazev: 'Hledat' }]} />
      <h1>Hledat na webu obce</h1>
      <form method="get" action="/hledat" role="search" className="panel">
        <div className="pole">
          <label htmlFor="hledat-q">Co hledáte</label>
          <span id="hledat-napoveda" className="napoveda">
            Například odpad, pes nebo sál. Diakritiku psát nemusíte.
          </span>
          <input id="hledat-q" name="q" type="search" defaultValue={q} maxLength={100} aria-describedby="hledat-napoveda" />
        </div>
        <button type="submit">Hledat</button>
      </form>
      {q ? (
        <>
          <h2 role="status">
            {nalezy.length === 0 ? `Na „${q}“ jsme nic nenašli` : `Výsledky pro „${q}“: ${nalezy.length}`}
          </h2>
          {nalezy.length === 0 ? (
            <KontaktUradu obec={obec} />
          ) : (
            <ul className="seznam">
              {nalezy.map((n) => (
                <li key={`${n.druh}-${n.href}-${n.nazev}`}>
                  <p className="vedlejsi" style={{ margin: 0 }}>
                    {n.druh}
                  </p>
                  <h3 style={{ marginTop: 0 }}>
                    <a href={n.href}>{n.nazev}</a>
                  </h3>
                  <p style={{ margin: 0 }}>{n.popis}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : null}
    </>
  )
}
