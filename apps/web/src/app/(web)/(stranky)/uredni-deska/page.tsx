import type { Metadata } from 'next'
import { demoTed } from '@codekom/demo-data'
import { parseDeskaParams, pragueDayKey } from '@codekom/typy/pravidla'
import { Drobecky } from '@/components/stranka/Casti'
import { TabulkaDesky } from '@/components/stranka/TabulkaDesky'
import { zdroj } from '@/lib/data/zdroj'
import { slugObce } from '@/lib/web'

export const metadata: Metadata = { title: 'Úřední deska' }

type SearchParams = Promise<Record<string, string | string[] | undefined>>

export default async function UredniDeska({ searchParams }: { searchParams: SearchParams }) {
  const z = await zdroj()
  const obec = slugObce()
  const kategorie = await z.kategorieDesky(obec)
  const filtry = parseDeskaParams(await searchParams, kategorie.map((k) => k.slug))
  const { polozky, celkem } = await z.deska(obec, filtry)
  return (
    <>
      <Drobecky polozky={[{ nazev: 'Úřední deska' }]} />
      <h1>Úřední deska</h1>
      <p>
        Dokumenty, které obec zveřejňuje. Každý dokument je veřejný od prvního dne vyvěšení. Sejmuté dokumenty najdete v{' '}
        <a href="/uredni-deska/archiv">archivu</a>, pokud po sejmutí smí zůstat zveřejněné.
      </p>
      <TabulkaDesky
        filtry={filtry}
        kategorie={kategorie}
        polozky={polozky}
        celkem={celkem}
        dnes={pragueDayKey(demoTed())}
        cesta="/uredni-deska"
      />
    </>
  )
}
