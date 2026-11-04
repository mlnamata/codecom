import { jeKlicSablony } from '@codekom/tokeny'

/** Stav pruhu „Ukázka CodeKom“. Hodnoty, které návštěvník nezvolil, bere layout z dat obce. */
export type KrizeUkazky = 'off' | 'info' | 'warning' | 'emergency'

export interface StavUkazky {
  sablona?: string
  paleta?: 0 | 1 | 2
  /** Vynucený stav banneru. Chybí-li, banner se řídí daty obce. */
  krize?: KrizeUkazky
  foto?: boolean
  /** Vlastní hlavní barva šablony (#rrggbb). */
  barva?: string
  /** Vlastní doplňková barva šablony (#rrggbb). */
  akcent?: string
  /** Vlastní písmo (klíč z PISMA_UKAZKY). */
  pismo?: KlicPisma
  /** Zvětšení celého webu. */
  velikost?: VelikostUkazky
}

export const PISMA_UKAZKY = ['inter', 'dmsans', 'atkinson', 'sourceserif', 'lora'] as const
export type KlicPisma = (typeof PISMA_UKAZKY)[number]
export const VELIKOSTI = ['bezna', 'vetsi', 'nejvetsi'] as const
export type VelikostUkazky = (typeof VELIKOSTI)[number]
const HEX = /^#[0-9a-f]{6}$/i

export const COOKIE_UKAZKY = 'ukazka'
export const HLAVICKA_UKAZKY = 'x-codekom-ukazka'
export const PARAMETRY = ['sablona', 'paleta', 'krize', 'foto', 'barva', 'akcent', 'pismo', 'velikost'] as const

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
  if (typeof v.barva === 'string' && HEX.test(v.barva)) s.barva = v.barva.toLowerCase()
  if (typeof v.akcent === 'string' && HEX.test(v.akcent)) s.akcent = v.akcent.toLowerCase()
  if (typeof v.pismo === 'string' && (PISMA_UKAZKY as readonly string[]).includes(v.pismo)) s.pismo = v.pismo as KlicPisma
  if (typeof v.velikost === 'string' && (VELIKOSTI as readonly string[]).includes(v.velikost)) s.velikost = v.velikost as VelikostUkazky
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
  // `vychozi` v URL vrátí vlastní vzhled na hodnoty šablony.
  for (const k of ['barva', 'akcent', 'pismo', 'velikost'] as const) if (url.get(k) === 'vychozi') delete vysledek[k]
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
  for (const k of ['barva', 'akcent', 'pismo', 'velikost'] as const) if (s[k]) p.set(k, s[k])
  return `${cesta}?${p.toString()}`
}

export const ukazkaZapnuta = (): boolean => process.env.NEXT_PUBLIC_UKAZKA === '1'
