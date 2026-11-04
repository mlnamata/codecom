import { CENY_WEBU } from './cenik'

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

/** Jen ověřené údaje. IČO, adresa a kontakty jsou [DOPLNIT], proto ve strukturovaných datech nejsou. */
export const organizaceJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CodeKom',
  url: SITE,
  logo: `${SITE}/brand-svg/logo-cerne.svg`,
  slogan: 'Tvoříme kódy pro lidi.',
})

/** Cena jen jako orientační „od“, bez označení za závaznou nabídku. */
export const sluzbaJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Web obce s elektronickou úřední deskou',
  provider: { '@type': 'Organization', name: 'CodeKom' },
  areaServed: { '@type': 'Country', name: 'Česká republika' },
  offers: {
    '@type': 'Offer',
    description: 'Orientační cena, přesnou pošleme v nabídce. Platí ke 4. 11. 2026.',
    priceSpecification: { '@type': 'UnitPriceSpecification', minPrice: CENY_WEBU.zaklad[0], priceCurrency: 'CZK', unitText: 'měsíc', valueAddedTaxIncluded: false },
  },
})

/** Otázky jsou nadpisy ### končící otazníkem, odpověď je text do dalšího nadpisu. */
export function otazky(md: string): { otazka: string; odpoved: string }[] {
  const vysledek: { otazka: string; odpoved: string }[] = []
  for (const blok of md.split(/^### /m).slice(1)) {
    const i = blok.indexOf('\n')
    const otazka = blok.slice(0, i).trim()
    if (!otazka.endsWith('?')) continue
    const odpoved = (blok.slice(i + 1).split(/^#{1,3} /m)[0] ?? '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_`]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    if (odpoved) vysledek.push({ otazka, odpoved })
  }
  return vysledek
}

export const faqJsonLd = (texty: string[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: texty.flatMap(otazky).map((q) => ({ '@type': 'Question', name: q.otazka, acceptedAnswer: { '@type': 'Answer', text: q.odpoved } })),
})
