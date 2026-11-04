/**
 * QR Platba (formát SPD České bankovní asociace) a převod čísla účtu na IBAN.
 * [OVĚŘIT] Pole a omezení podle aktuální specifikace QR Platby ČBA (verze 1.2).
 * Peníze jdou vždy přímo na účet obce, CodeKom nic nedrží (pravidlo 3).
 */

/** Zjevně neplatný IBAN pro ukázku, když obec nemá platné číslo účtu. */
export const NEPLATNY_IBAN = 'CZ0000000000000000000000'

const VAHY = [6, 3, 7, 9, 10, 5, 8, 4, 2, 1]

/** Kontrola modulo 11 pro předčíslí (6 číslic) i číslo účtu (10 číslic). */
function modulo11(cislice: string): boolean {
  const s = cislice.padStart(10, '0')
  let soucet = 0
  for (let i = 0; i < 10; i++) soucet += Number(s[i]) * (VAHY[i] ?? 0)
  return soucet % 11 === 0
}

function mod97(cislo: string): number {
  let zbytek = 0
  for (const znak of cislo) zbytek = (zbytek * 10 + Number(znak)) % 97
  return zbytek
}

/**
 * `19-2000145399/0800` na `CZ6508000000192000145399`. Neplatné číslo (formát nebo
 * kontrola modulo 11) vrátí null.
 */
export function ibanZCislaUctu(cislo: string): string | null {
  const m = cislo.replace(/\s+/g, '').match(/^(?:(\d{1,6})-)?(\d{2,10})\/(\d{4})$/)
  if (!m) return null
  const predcisli = (m[1] ?? '').padStart(6, '0')
  const ucet = (m[2] ?? '').padStart(10, '0')
  const banka = m[3] ?? ''
  if (!modulo11(predcisli) || !modulo11(ucet) || Number(ucet) === 0) return null
  const bban = `${banka}${predcisli}${ucet}`
  // CZ = 12 35, kontrolní číslice 00 na konec
  const kontrola = String(98 - mod97(`${bban}123500`)).padStart(2, '0')
  return `CZ${kontrola}${bban}`
}

/** Variabilní symbol ukázky: rok, číslo popisné na 4 místa, pořadí poplatku na 2 místa. [DOPLNIT: pravidlo obce] */
export function variabilniSymbol(rok: number, cisloPopisne: number, poradi: number): string {
  return `${rok}${String(cisloPopisne).padStart(4, '0')}${String(poradi).padStart(2, '0')}`
}

const bezHvezdicky = (s: string): string =>
  s
    .replace(/\*/g, ' ')
    .normalize('NFC')
    .replace(/\s+/g, ' ')
    .trim()

export interface Platba {
  iban: string
  castka: number
  vs: string
  zprava: string
}

/** Řetězec SPD: `SPD*1.0*ACC:…*AM:900.00*CC:CZK*X-VS:…*MSG:…` */
export function spd(p: Platba): string {
  const casti = ['SPD', '1.0', `ACC:${p.iban}`, `AM:${p.castka.toFixed(2)}`, 'CC:CZK', `X-VS:${p.vs}`, `MSG:${bezHvezdicky(p.zprava).slice(0, 60)}`]
  return casti.join('*')
}
