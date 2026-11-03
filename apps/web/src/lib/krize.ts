/**
 * Crisis and information alerts shown site-wide.
 *
 * Rules taken from USWDS Site alert, GOV.UK Notification banner and the gov.cz Infobar:
 * - show one banner at a time, never a stack; the most serious active alert wins
 * - the level is always spelled out in text, colour is only a second cue
 * - an emergency cannot be dismissed; information and warnings can
 */
export type Uroven = 'info' | 'warning' | 'emergency'

export interface KrizoveHlaseni {
  id: number | string
  uroven: Uroven
  titulek: string
  text: string
  odkazText?: string | null
  odkazUrl?: string | null
  /** Optional, e.g. "Hájek a Na Rovném". Empty means the whole municipality. */
  tykaSe?: string | null
  platiOd: string
  /** Null means "until further notice". */
  platiDo?: string | null
  updatedAt: string
}

export const UROVNE: Record<Uroven, { nazev: string; poradi: number }> = {
  emergency: { nazev: 'Krizová situace', poradi: 0 },
  warning: { nazev: 'Výstraha', poradi: 1 },
  info: { nazev: 'Informace obce', poradi: 2 },
}

export const UROVEN_VOLBY = (Object.keys(UROVNE) as Uroven[])
  .sort((a, b) => UROVNE[a].poradi - UROVNE[b].poradi)
  .map((value) => ({ value, label: UROVNE[value].nazev }))

const time = (v: string | null | undefined): number => (v ? new Date(v).getTime() : Number.NaN)

/** True when `now` falls inside the alert's validity window. */
export function jeAktivni(h: Pick<KrizoveHlaseni, 'platiOd' | 'platiDo'>, now: Date): boolean {
  const od = time(h.platiOd)
  if (Number.isNaN(od) || od > now.getTime()) return false
  const doKdy = time(h.platiDo)
  return Number.isNaN(doKdy) || doKdy > now.getTime()
}

/** Active alerts, most serious first, newest first within a level. */
export function aktivniHlaseni(list: readonly KrizoveHlaseni[], now: Date): KrizoveHlaseni[] {
  return list
    .filter((h) => h.uroven in UROVNE && jeAktivni(h, now))
    .sort((a, b) => UROVNE[a.uroven].poradi - UROVNE[b.uroven].poradi || time(b.platiOd) - time(a.platiOd))
}

/** The one alert for the banner, plus how many other active alerts exist. */
export function vyberBanner(
  list: readonly KrizoveHlaseni[],
  now: Date,
): { hlavni: KrizoveHlaseni | null; dalsich: number } {
  const aktivni = aktivniHlaseni(list, now)
  return { hlavni: aktivni[0] ?? null, dalsich: Math.max(0, aktivni.length - 1) }
}

export const lzeSkryt = (h: Pick<KrizoveHlaseni, 'uroven'>): boolean => h.uroven !== 'emergency'

/**
 * Key under which a dismissal is remembered. It includes `updatedAt`, so editing an
 * alert (for example raising it or changing the text) shows it again to everyone.
 */
export const klicSkryti = (h: Pick<KrizoveHlaseni, 'id' | 'updatedAt'>): string => `krize:${h.id}:${h.updatedAt}`

/** Only same-site paths and http(s) links are rendered as links. */
export function bezpecnyOdkaz(url: string | null | undefined): string | null {
  if (!url) return null
  const u = url.trim()
  if (u.startsWith('/') && !u.startsWith('//')) return u
  try {
    const parsed = new URL(u)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.toString() : null
  } catch {
    return null
  }
}
