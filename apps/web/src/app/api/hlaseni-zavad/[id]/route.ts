import { ZavadaOdpoved, ZmenaZavadyVstup } from '@codekom/typy'
import { chyba, json, options, roleUkazky, teloJson, ukazkovyRezim } from '@/lib/api'
import { ChybaPravidla, vyridZavadu } from '@/lib/data/zapis'
import { obnovVerejneStranky } from '@/lib/obnovit'

export const dynamic = 'force-dynamic'
export const OPTIONS = options

/**
 * Změna stavu a veřejné odpovědi (role správce nebo redaktor). Role v hlavičce
 * X-Ukazka-Role je jen ukázka, ne zabezpečení. Bez NEXT_PUBLIC_UKAZKA=1 vrací 404.
 */
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!ukazkovyRezim()) return chyba(request, 404, 'Nenalezeno.')
  if (!roleUkazky(request)) return chyba(request, 403, 'Změnit hlášení smí jen správce nebo redaktor.')
  const telo = await teloJson(request, 8 * 1024)
  if (!telo.ok) return chyba(request, telo.status, telo.zprava)
  const r = ZmenaZavadyVstup.safeParse(telo.data)
  if (!r.success) {
    const pole: Record<string, string[]> = {}
    for (const i of r.error.issues) (pole[i.path.join('.') || 'telo'] ??= []).push(i.message)
    return chyba(request, 400, 'Změna obsahuje chyby.', pole)
  }
  try {
    const h = vyridZavadu((await params).id, r.data.stav, r.data.verejnaOdpoved)
    obnovVerejneStranky()
    return json(request, ZavadaOdpoved, { id: h.id, cislo: h.cislo, sledovaciKod: h.sledovaciKod, stav: h.stav })
  } catch (e) {
    if (e instanceof ChybaPravidla) return chyba(request, 404, e.message)
    throw e
  }
}
