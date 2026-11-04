/**
 * Kontrola osobních údajů v textu před zveřejněním. Hledá jen podle vzorů (telefon,
 * e-mail, rodné číslo); AI se nevolá. Kontakty úřadu v hranatých závorkách nevadí.
 */
const VZORY: { nazev: string; re: RegExp }[] = [
  { nazev: 'rodné číslo', re: /\b\d{2}[0-35-8]\d[0-3]\d\s?\/?\s?\d{3,4}\b/g },
  { nazev: 'e-mail', re: /[\w.+-]+@[\w-]+\.[\w.-]+/g },
  { nazev: 'telefon', re: /(?:\+420\s?)?\b\d{3}\s?\d{3}\s?\d{3}\b/g },
]

export function najdiOsobniUdaje(text: string): string[] {
  const nalezy = new Set<string>()
  for (const v of VZORY) if (text.match(v.re)) nalezy.add(v.nazev)
  return [...nalezy]
}

/** Nahradí telefony a e-maily kontaktem úřadu. Rodné číslo je potřeba smazat ručně. */
export function nahradKontaktemUradu(text: string, telefon: string, email: string): string {
  return text.replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, email).replace(/(?:\+420\s?)?\b\d{3}\s?\d{3}\s?\d{3}\b/g, telefon)
}
