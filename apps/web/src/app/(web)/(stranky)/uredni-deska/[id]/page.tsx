import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { demoTed } from '@codekom/demo-data'
import { formatDateTime, formatDay, formatVelikost, pragueDayKey, stavDokumentu, typSouboru } from '@codekom/typy/pravidla'
import { Drobecky } from '@/components/stranka/Casti'
import { zdroj } from '@/lib/data/zdroj'
import { slugObce } from '@/lib/web'

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const d = await (await zdroj()).dokument(slugObce(), (await params).id)
  return { title: d ? d.nazev : 'Dokument není zveřejněn' }
}

const STAV = { pripraveno: 'Připraveno k vyvěšení', visi: 'Visí na úřední desce', sejmuto: 'Sejmuto' } as const

export default async function DetailDokumentu({ params }: { params: Params }) {
  const { id } = await params
  const z = await zdroj()
  const obec = slugObce()
  const d = await z.dokument(obec, id)
  if (!d) notFound()
  const kategorie = (await z.kategorieDesky(obec)).find((k) => k.slug === d.kategorie)
  const stav = stavDokumentu(d.vyvesenoOd, d.vyvesenoDo, pragueDayKey(demoTed()))
  const velikost = formatVelikost(d.soubor.velikost)

  return (
    <>
      <Drobecky polozky={[{ nazev: 'Úřední deska', href: '/uredni-deska' }, { nazev: d.nazev }]} />
      <h1>{d.nazev}</h1>
      <dl className="udaje">
        <dt>Stav</dt>
        <dd>{STAV[stav]}</dd>
        <dt>Kategorie</dt>
        <dd>{kategorie?.nazev ?? d.kategorie}</dd>
        <dt>Číslo jednací</dt>
        <dd>{d.cisloJednaci}</dd>
        <dt>Původce</dt>
        <dd>{d.puvodce}</dd>
        <dt>Vyvěšeno</dt>
        <dd>{formatDay(d.vyvesenoOd)}</dd>
        <dt>Sejmutí</dt>
        <dd>{d.vyvesenoDo ? formatDay(d.vyvesenoDo) : 'do odvolání'}</dd>
        <dt>Soubor</dt>
        <dd>
          <a href={`/uredni-deska/${d.id}/soubor`}>
            Otevřít dokument ({typSouboru(d.soubor.typ)}
            {velikost ? `, ${velikost}` : ''})
          </a>
        </dd>
      </dl>

      <h2>Obsah dokumentu</h2>
      {d.text.map((odstavec) => (
        <p key={odstavec}>{odstavec}</p>
      ))}

      <h2>Záznam o vyvěšení</h2>
      <ol>
        {(d.verze ?? []).map((v) => (
          <li key={v.cislo}>
            Verze {v.cislo}, {formatDateTime(v.cas)}: {v.popis}
          </li>
        ))}
      </ol>
      <p className="vedlejsi">Zveřejněný dokument, který už visel, nejde smazat. Každá změna se ukládá jako nová verze.</p>
    </>
  )
}
