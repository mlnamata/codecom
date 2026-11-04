import { jeKlicSablony } from '@codekom/tokeny'

/** Stav pruhu „Ukázka CodeKom“. Hodnoty, které návštěvník nezvolil, bere layout z dat obce. */
export type KrizeUkazky = 'off' | 'info' | 'warning' | 'emergency'

export interface StavUkazky {
  sablona?: string
  paleta?: 0 | 1 | 2
  /** Vynucený stav banneru. Chybí-li, banner se řídí daty obce. */
  krize?: KrizeUkazky
  foto?: boolean
}

export const COOKIE_UKAZKY = 'ukazka'
export const HLAVICKA_UKAZKY = 'x-codekom-ukazka'
export const PARAMETRY = ['sablona', 'paleta', 'krize', 'foto'] as const

const KRIZE: readonly string[] = ['off', 'info', 'warning', 'emergency']

/** Zvaliduje surové hodnoty; neplatné zahodí. `krize=auto` a `foto=0` jsou platné volby. */
export function ocisti(v: Record<string, unknown>): StavUkazky {
  const s: StavUkazky = {}
  if (jeKlicSablony(v.sablona)) s.sablona = v.sablona
  const p = typeof v.paleta === 'number' ? v.paleta : Number.parseInt(String(v.paleta ?? ''), 10)
  if (p === 0 || p === 1 || p === 2) s.paleta = p
  if (typeof v.krize === 'string' && KRIZE.includes(v.krize)) s.krize = v.krize as KrizeUkazky
  if (v.foto === true || v.foto === '1') s.foto = true
  if (v.foto === false || v.foto === '0') s.foto = false
  return s
}

/** Priorita: URL, potom cookie. `krize=auto` z URL zruší vynucený banner z cookie. */
export function sloucit(url: URLSearchParams, cookie: string | undefined): StavUkazky {
  let zCookie: StavUkazky = {}
  if (cookie) {
    try {
      zCookie = ocisti(JSON.parse(cookie) as Record<string, unknown>)
    } catch {
      zCookie = {}
    }
  }
  const zUrl = ocisti(Object.fromEntries(PARAMETRY.map((k) => [k, url.get(k) ?? undefined])))
  const vysledek: StavUkazky = { ...zCookie, ...zUrl }
  if (url.get('krize') === 'auto') delete vysledek.krize
  return vysledek
}

export function precti(hlavicka: string | null): StavUkazky {
  if (!hlavicka) return {}
  try {
    return ocisti(JSON.parse(hlavicka) as Record<string, unknown>)
  } catch {
    return {}
  }
}

/** Adresa stavu ukázky, například `/?sablona=lipa&paleta=1&krize=warning&foto=1`. */
export function adresaStavu(cesta: string, s: StavUkazky): string {
  const p = new URLSearchParams()
  if (s.sablona) p.set('sablona', s.sablona)
  if (s.paleta !== undefined) p.set('paleta', String(s.paleta))
  p.set('krize', s.krize ?? 'auto')
  if (s.foto !== undefined) p.set('foto', s.foto ? '1' : '0')
  return `${cesta}?${p.toString()}`
}

export const ukazkaZapnuta = (): boolean => process.env.NEXT_PUBLIC_UKAZKA === '1'
