import type { Metadata } from 'next'
import { demoTed } from '@codekom/demo-data'
import { parseDeskaParams, pragueDayKey } from '@codekom/typy/pravidla'
import { Drobecky } from '@/components/stranka/Casti'
import { TabulkaDesky } from '@/components/stranka/TabulkaDesky'
import { zdroj } from '@/lib/data/zdroj'
import { slugObce } from '@/lib/web'

export const metadata: Metadata = { title: 'Archiv úřední desky' }

type SearchParams = Promise<Record<string, string | string[] | undefined>>

/** Jen sejmuté dokumenty, které nejsou označené „Po sejmutí nezveřejňovat“. */
export default async function Archiv({ searchParams }: { searchParams: SearchParams }) {
  const z = await zdroj()
  const obec = slugObce()
  const kategorie = await z.kategorieDesky(obec)
  const filtry = { ...parseDeskaParams(await searchParams, kategorie.map((k) => k.slug)), stav: 'sejmuto' as const }
  const { polozky, celkem } = await z.deska(obec, filtry)
  return (
    <>
      <Drobecky polozky={[{ nazev: 'Úřední deska', href: '/uredni-deska' }, { nazev: 'Archiv' }]} />
      <h1>Archiv úřední desky</h1>
      <p>Sejmuté dokumenty, které smí zůstat zveřejněné. Dokumenty s osobními údaji po sejmutí z webu odstraňujeme.</p>
      <TabulkaDesky
        filtry={filtry}
        kategorie={kategorie}
        polozky={polozky}
        celkem={celkem}
        dnes={pragueDayKey(demoTed())}
        cesta="/uredni-deska/archiv"
        archiv
      />
    </>
  )
}
