import type {
  Akce,
  Aktualita,
  DokumentDesky,
  HlaseniRozhlasu,
  HlaseniZavad,
  KategorieDesky,
  KrizoveHlaseni,
  Obec,
  ObecVerejna,
  Poplatek,
  Prostor,
  Rezervace,
  Sluzba,
  ZivotniSituace,
  Zastupitel,
} from '@codekom/typy'
import type { DeskaFiltry } from '@codekom/typy/pravidla'

/**
 * Jediné rozhraní, přes které veřejné stránky a endpointy čtou data. Prompt 01 přidá
 * implementaci `payload`; UI se tím nemění. Obec je vždy parametr, nikdy konstanta.
 */
export interface ZdrojDat {
  obec(slug: string): Promise<Obec | null>
  seznamObci(): Promise<ObecVerejna[]>
  aktuality(obec: string, o?: { limit?: number }): Promise<Aktualita[]>
  aktualita(obec: string, slug: string): Promise<Aktualita | null>
  akce(obec: string, o?: { odDne?: string }): Promise<Akce[]>
  kategorieDesky(obec: string): Promise<KategorieDesky[]>
  deska(obec: string, f: DeskaFiltry): Promise<{ polozky: DokumentDesky[]; celkem: number }>
  /** Dokument, který je veřejný (visí, nebo je sejmutý a smí do archivu). Jinak null. */
  dokument(obec: string, id: string): Promise<DokumentDesky | null>
  krize(obec: string, ted: Date): Promise<{ hlavni: KrizoveHlaseni | null; dalsich: number }>
  /** Aktivní hlášení (nejzávažnější první) a archiv ukončených. */
  vsechnaKrize(obec: string, ted: Date): Promise<{ aktivni: KrizoveHlaseni[]; archiv: KrizoveHlaseni[] }>
  rozhlas(obec: string): Promise<HlaseniRozhlasu[]>
  zastupitele(obec: string): Promise<Zastupitel[]>
  zivotniSituace(obec: string): Promise<ZivotniSituace[]>
  sluzby(obec: string): Promise<Sluzba[]>
  poplatky(obec: string): Promise<Poplatek[]>
  prostory(obec: string): Promise<Prostor[]>
  rezervace(obec: string, prostor: string): Promise<Pick<Rezervace, 'den' | 'od' | 'do' | 'stav'>[]>
  hlaseniZavad(obec: string, kod: string): Promise<HlaseniZavad | null>
  kategorieZavad(obec: string): Promise<{ id: string; nazev: string }[]>
  stavyZavad(obec: string): Promise<{ id: HlaseniZavad['stav']; nazev: string }[]>
}

export type Zdroj = 'demo' | 'payload'

/** `demo`, pokud chybí DATABASE_URI nebo je CODEKOM_ZDROJ=demo. */
export function zvolenyZdroj(): Zdroj {
  const z = process.env.CODEKOM_ZDROJ?.trim()
  if (z === 'payload') return 'payload'
  if (z === 'demo') return 'demo'
  return process.env.DATABASE_URI ? 'payload' : 'demo'
}

export async function zdroj(): Promise<ZdrojDat> {
  if (zvolenyZdroj() === 'payload') {
    throw new Error('Zdroj dat „payload“ zatím neexistuje, dodá ho prompt 01. Nastavte CODEKOM_ZDROJ=demo.')
  }
  const { demoZdroj } = await import('./demo')
  return demoZdroj
}
