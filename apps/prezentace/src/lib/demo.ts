/** Odkazy do živé ukázky (apps/web) a ukázky aplikace. Prázdná proměnná = žádný odkaz. */
const zaklad = (v: string | undefined) => (v?.trim() ? v.trim().replace(/\/$/, '') : null)

export const DEMO_URL = zaklad(process.env.NEXT_PUBLIC_DEMO_URL)
export const APP_DEMO_URL = zaklad(process.env.NEXT_PUBLIC_APP_DEMO_URL)

export function odkazDema(sablona?: string, paleta?: number): string | null {
  if (!DEMO_URL) return null
  if (!sablona) return `${DEMO_URL}/`
  return `${DEMO_URL}/?sablona=${sablona}&paleta=${paleta ?? 0}`
}

export const odkazAplikace = (): string | null => APP_DEMO_URL

/** Ukázka administrace dané úrovně editoru v apps/web. */
export function odkazAdministrace(uroven: string): string | null {
  return DEMO_URL ? `${DEMO_URL}/ukazka/administrace?uroven=${uroven}` : null
}
