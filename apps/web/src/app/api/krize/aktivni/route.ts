import { demoTed } from '@codekom/demo-data'
import { KrizeAktivniOdpoved } from '@codekom/typy'
import { chyba, json, krizeVerejna, options, zakladUrl } from '@/lib/api'
import { zdroj } from '@/lib/data/zdroj'

export const dynamic = 'force-dynamic'
export const OPTIONS = options

/** Jedno nejzávažnější aktivní hlášení obce a počet dalších. Čte jen úložiště, nikdy přepínač ukázky. */
export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get('obec')?.trim()
  if (!slug || !/^[a-z0-9-]{1,64}$/.test(slug)) return chyba(request, 400, 'Chybí nebo je neplatný parametr obec.')
  const z = await zdroj()
  const obec = await z.obec(slug)
  if (!obec) return chyba(request, 404, 'Obec neexistuje.')
  const { hlavni, dalsich } = await z.krize(slug, demoTed())
  return json(request, KrizeAktivniOdpoved, { hlavni: hlavni ? krizeVerejna(hlavni, obec, zakladUrl(request)) : null, dalsich })
}
