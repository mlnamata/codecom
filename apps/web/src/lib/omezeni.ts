/**
 * Jednoduché omezení počtu požadavků v paměti procesu (ukázka: jeden proces).
 * Výchozí 5 požadavků za minutu na klíč (IP adresu).
 */
const KLIC = Symbol.for('codekom.omezeni')
type Zaznamy = Map<string, number[]>
type G = typeof globalThis & { [KLIC]?: Zaznamy }

export function zkontrolujLimit(klic: string, limit = 5, oknoMs = 60_000, ted = Date.now()): { povoleno: boolean; zaSekund: number } {
  const g = globalThis as G
  g[KLIC] ??= new Map()
  const casy = (g[KLIC].get(klic) ?? []).filter((t) => ted - t < oknoMs)
  if (casy.length >= limit) {
    const nejstarsi = casy[0] ?? ted
    g[KLIC].set(klic, casy)
    return { povoleno: false, zaSekund: Math.max(1, Math.ceil((oknoMs - (ted - nejstarsi)) / 1000)) }
  }
  casy.push(ted)
  g[KLIC].set(klic, casy)
  return { povoleno: true, zaSekund: 0 }
}

export function vynulujLimity(): void {
  ;(globalThis as G)[KLIC]?.clear()
}

/** IP klienta z hlaviček proxy (Vercel nastavuje x-forwarded-for). */
export function ipKlienta(h: Headers): string {
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'neznama'
}
