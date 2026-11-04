import { KrizoveHlaseni, NovaKrizeVstup } from '@codekom/typy'
import { chyba, json, options, roleUkazky, teloJson, ukazkovyRezim } from '@/lib/api'
import { ChybaPravidla, vydejKrizi } from '@/lib/data/zapis'
import { zdroj } from '@/lib/data/zdroj'
import { obnovVerejneStranky } from '@/lib/obnovit'

export const dynamic = 'force-dynamic'
export const OPTIONS = options

/**
 * Vydání krizového hlášení z ukázkové aplikace. Správce publikuje (201), redaktor uloží
 * jen koncept (202). Role v hlavičce X-Ukazka-Role je ukázka, ne zabezpečení.
 */
export async function POST(request: Request) {
  if (!ukazkovyRezim()) return chyba(request, 404, 'Nenalezeno.')
  const role = roleUkazky(request)
  if (!role) return chyba(request, 403, 'Hlášení smí vytvořit jen správce nebo redaktor.')
  const telo = await teloJson(request, 8 * 1024)
  if (!telo.ok) return chyba(request, telo.status, telo.zprava)
  const r = NovaKrizeVstup.safeParse(telo.data)
  if (!r.success) {
    const pole: Record<string, string[]> = {}
    for (const i of r.error.issues) (pole[i.path.join('.') || 'telo'] ??= []).push(i.message)
    return chyba(request, 400, 'Hlášení obsahuje chyby.', pole)
  }
  if (!(await (await zdroj()).obec(r.data.obec))) return chyba(request, 404, 'Obec neexistuje.')
  try {
    const { stav: _stav, ...h } = vydejKrizi(r.data, role)
    obnovVerejneStranky()
    return json(request, KrizoveHlaseni, h, { status: role === 'spravce' ? 201 : 202 })
  } catch (e) {
    if (e instanceof ChybaPravidla) return chyba(request, 400, e.message, { odkazUrl: [e.message] })
    throw e
  }
}
