/** Formáty dne, jak je píšou návrhy šablon. Vstup je kalendářní den `YYYY-MM-DD`. */
const MESICE = ['ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince']

function casti(den: string | null): [number, number, number] | null {
  if (!den) return null
  const [y, m, d] = den.split('-').map(Number)
  return y && m && d ? [y, m, d] : null
}

/** `4. 11. 2026`, prázdný den je „do odvolání“. */
export function denCely(den: string | null): string {
  const c = casti(den)
  return c ? `${c[2]}. ${c[1]}. ${c[0]}` : 'do odvolání'
}

/** `4. 11.` */
export function denKratce(den: string | null): string {
  const c = casti(den)
  return c ? `${c[2]}. ${c[1]}.` : 'do odvolání'
}

/** `4. listopadu` */
export function denSlovem(den: string | null): string {
  const c = casti(den)
  return c ? `${c[2]}. ${MESICE[c[1] - 1]}` : 'do odvolání'
}

/** `4. listopadu 2026` */
export function denSlovemRok(den: string | null): string {
  const c = casti(den)
  return c ? `${c[2]}. ${MESICE[c[1] - 1]} ${c[0]}` : 'do odvolání'
}
