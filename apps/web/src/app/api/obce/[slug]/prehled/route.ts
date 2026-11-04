import { demoTed } from '@codekom/demo-data'
import { PrehledOdpoved } from '@codekom/typy'
import { chyba, json, krizeVerejna, options, zakladUrl } from '@/lib/api'
import { zdroj } from '@/lib/data/zdroj'

export const dynamic = 'force-dynamic'
export const OPTIONS = options

/** Souhrn pro úvod aplikace: krize, 5 aktualit, 5 visících dokumentů desky a rozhlas. */
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const z = await zdroj()
  const obec = await z.obec(slug)
  if (!obec) return chyba(request, 404, 'Obec neexistuje.')
  const zaklad = zakladUrl(request)
  const [krize, aktuality, deska, rozhlas] = await Promise.all([
    z.krize(slug, demoTed()),
    z.aktuality(slug, { limit: 5 }),
    z.deska(slug, { kategorie: null, stav: 'visi', q: '', strana: 1 }),
    z.rozhlas(slug),
  ])
  return json(request, PrehledOdpoved, {
    obec: {
      slug: obec.slug,
      nazev: obec.nazev,
      okres: obec.okres,
      znakUrl: `${zaklad}${obec.znakUrl ?? '/demo/znak.svg'}`,
      castiObce: obec.castiObce.map(({ nazev, slug: s }) => ({ nazev, slug: s })),
    },
    krize: { hlavni: krize.hlavni ? krizeVerejna(krize.hlavni, obec, zaklad) : null, dalsich: krize.dalsich },
    aktuality: aktuality.map((a) => ({
      id: a.id,
      slug: a.slug,
      titulek: a.titulek,
      perex: a.perex,
      publikovano: a.publikovano,
      url: `${zaklad}/aktuality/${a.slug}`,
    })),
    deska: deska.polozky.slice(0, 5).map((d) => ({
      id: d.id,
      nazev: d.nazev,
      kategorie: d.kategorie,
      vyvesenoOd: d.vyvesenoOd,
      vyvesenoDo: d.vyvesenoDo,
      url: `${zaklad}/uredni-deska/${d.id}`,
    })),
    rozhlas: rozhlas.slice(0, 5),
  })
}
