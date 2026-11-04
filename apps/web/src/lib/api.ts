import { UROVNE } from '@codekom/tokeny'
import type { KrizeVerejna, KrizoveHlaseni, Obec } from '@codekom/typy'
import { bezpecnyOdkaz, tykaSe } from '@codekom/typy/pravidla'
import type { z } from 'zod'

/** Jediný povolený původ pro CORS (aplikace v prohlížeči). [OVĚŘIT port Expo web] */
export const povolenyPuvod = (): string => process.env.CODEKOM_APP_ORIGIN?.trim() || 'http://localhost:8081'

export function corsHlavicky(request: Request): Record<string, string> {
  const origin = request.headers.get('origin')
  const h: Record<string, string> = { Vary: 'Origin' }
  if (origin && origin === povolenyPuvod()) {
    h['Access-Control-Allow-Origin'] = origin
    h['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, OPTIONS'
    h['Access-Control-Allow-Headers'] = 'Content-Type, X-Ukazka-Role'
    h['Access-Control-Max-Age'] = '600'
  }
  return h
}

export function options(request: Request): Response {
  return new Response(null, { status: 204, headers: corsHlavicky(request) })
}

/** JSON odpověď ověřená schématem: server nikdy nevrátí tvar, který neodpovídá kontraktu. */
export function json<S extends z.ZodType>(request: Request, schema: S, data: z.input<S>, init: { status?: number; cache?: string; hlavicky?: Record<string, string> } = {}): Response {
  const overeno = schema.parse(data)
  return Response.json(overeno, {
    status: init.status ?? 200,
    headers: { ...corsHlavicky(request), 'Cache-Control': init.cache ?? 'no-store', ...init.hlavicky },
  })
}

export function chyba(request: Request, status: number, zprava: string, pole?: Record<string, string[]>, hlavicky: Record<string, string> = {}): Response {
  return Response.json(pole ? { chyba: zprava, pole } : { chyba: zprava }, {
    status,
    headers: { ...corsHlavicky(request), 'Cache-Control': 'no-store', ...hlavicky },
  })
}

/** Základ absolutních URL: CODEKOM_VEREJNA_URL, jinak původ požadavku. */
export function zakladUrl(request: Request): string {
  return (process.env.CODEKOM_VEREJNA_URL?.trim() || new URL(request.url).origin).replace(/\/$/, '')
}

export function krizeVerejna(h: KrizoveHlaseni, obec: Obec, zaklad: string): KrizeVerejna {
  const odkaz = bezpecnyOdkaz(h.odkazUrl)
  return {
    ...h,
    odkazUrl: odkaz ? (odkaz.startsWith('/') ? `${zaklad}${odkaz}` : odkaz) : null,
    urovenNazev: UROVNE[h.uroven].nazev,
    castiNazvy: tykaSe(h.casti, obec.castiObce) ? h.casti.map((s) => obec.castiObce.find((c) => c.slug === s)?.nazev ?? s) : [],
  }
}

export const ukazkovyRezim = (): boolean => process.env.NEXT_PUBLIC_UKAZKA === '1'

/** Ukázková role z hlavičky X-Ukazka-Role. Není to zabezpečení, jen ukázka práv. */
export function roleUkazky(request: Request): 'spravce' | 'redaktor' | null {
  const r = request.headers.get('x-ukazka-role')
  return r === 'spravce' || r === 'redaktor' ? r : null
}

/** Načte JSON tělo s limitem velikosti. */
export async function teloJson(request: Request, maxBajtu: number): Promise<{ ok: true; data: unknown } | { ok: false; status: number; zprava: string }> {
  const delka = Number(request.headers.get('content-length') ?? '0')
  if (delka > maxBajtu) return { ok: false, status: 413, zprava: 'Požadavek je příliš velký.' }
  const text = await request.text()
  if (new TextEncoder().encode(text).byteLength > maxBajtu) return { ok: false, status: 413, zprava: 'Požadavek je příliš velký.' }
  try {
    return { ok: true, data: JSON.parse(text) as unknown }
  } catch {
    return { ok: false, status: 400, zprava: 'Tělo požadavku není platný JSON.' }
  }
}
