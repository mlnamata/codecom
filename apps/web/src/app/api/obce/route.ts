import { ObceSeznamOdpoved } from '@codekom/typy'
import { json, options, zakladUrl } from '@/lib/api'
import { zdroj } from '@/lib/data/zdroj'

export const dynamic = 'force-dynamic'
export const OPTIONS = options

/** Veřejný seznam obcí s modulem aplikace. */
export async function GET(request: Request) {
  const zaklad = zakladUrl(request)
  const obce = (await (await zdroj()).seznamObci()).map((o) => ({
    ...o,
    znakUrl: o.znakUrl.startsWith('/') ? `${zaklad}${o.znakUrl}` : o.znakUrl,
  }))
  return json(request, ObceSeznamOdpoved, { obce }, { cache: 'public, max-age=300' })
}
