import * as semeno from '@codekom/demo-data'
import type {
  Akce,
  Aktualita,
  DokumentDesky,
  HlaseniRozhlasu,
  HlaseniZavad,
  KategorieDesky,
  KrizoveHlaseni,
  Obec,
  Poplatek,
  Prostor,
  Rezervace,
  Sluzba,
  ZivotniSituace,
  Zastupitel,
} from '@codekom/typy'
import velikosti from './generovano/velikosti.json'

/**
 * Ukázkové úložiště v paměti procesu. Semínko je obsah z obsah/javori-lhota.
 * Omezení: jeden proces; po restartu (na serverless i po studeném startu) se vrátí semínko.
 */
export interface KrizeVUlozisti extends KrizoveHlaseni {
  stav: 'vydano' | 'koncept' | 'ukonceno'
}

export interface DokumentVUlozisti extends DokumentDesky {
  verze: NonNullable<DokumentDesky['verze']>
  /** Dokument přidaný v ukázce administrace: PDF se vytváří za běhu. */
  pridany?: boolean
}

export interface Uloziste {
  obec: Obec
  aktuality: Aktualita[]
  akce: Akce[]
  kategorie: KategorieDesky[]
  dokumenty: DokumentVUlozisti[]
  krize: KrizeVUlozisti[]
  rozhlas: HlaseniRozhlasu[]
  zastupitele: Zastupitel[]
  situace: ZivotniSituace[]
  sluzby: Sluzba[]
  poplatky: Poplatek[]
  prostory: Prostor[]
  rezervace: Rezervace[]
  zavady: HlaseniZavad[]
  kategorieZavad: { id: string; nazev: string }[]
  stavyZavad: { id: HlaseniZavad['stav']; nazev: string }[]
  /** Pořadové číslo dalšího hlášení závady v roce. */
  dalsiZavada: number
}

const VELIKOSTI = velikosti as Record<string, number>

function vytvorSemeno(): Uloziste {
  const k = <T,>(v: T): T => structuredClone(v)
  const cisla = semeno.hlaseniZavad.hlaseni.map((h) => Number(h.cislo.slice(-4)))
  return {
    obec: k(semeno.obec),
    aktuality: k(semeno.aktuality),
    akce: k(semeno.akce),
    kategorie: k(semeno.uredniDeska.kategorie),
    dokumenty: semeno.uredniDeska.dokumenty.map((d) => ({
      ...k(d),
      soubor: { ...d.soubor, url: `/uredni-deska/${d.id}/soubor`, velikost: VELIKOSTI[d.id] ?? null },
      verze: d.verze ?? [{ cislo: 1, cas: `${d.vyvesenoOd}T07:00:00.000Z`, zmena: 'vyveseno', popis: 'Dokument vyvěšen na úřední desku' }],
    })),
    krize: semeno.krizovaHlaseni.map((h) => ({ ...k(h), stav: 'vydano' as const })),
    rozhlas: k(semeno.rozhlas),
    zastupitele: k(semeno.zastupitele),
    situace: k(semeno.zivotniSituace),
    sluzby: k(semeno.sluzby.sluzby),
    poplatky: k(semeno.sluzby.poplatky),
    prostory: k(semeno.prostory.prostory),
    rezervace: k(semeno.prostory.rezervace),
    zavady: k(semeno.hlaseniZavad.hlaseni),
    kategorieZavad: k(semeno.hlaseniZavad.kategorie),
    stavyZavad: k(semeno.hlaseniZavad.stavy),
    dalsiZavada: Math.max(0, ...cisla) + 1,
  }
}

const KLIC = Symbol.for('codekom.demo.uloziste')
type GlobalSUlozistem = typeof globalThis & { [KLIC]?: Uloziste }

/** Úložiště žije na globalThis, aby ho nerozbil hot reload. */
export function uloziste(): Uloziste {
  const g = globalThis as GlobalSUlozistem
  g[KLIC] ??= vytvorSemeno()
  return g[KLIC]
}

/** Vrátí úložiště do stavu semínka (tlačítko „Obnovit ukázku“). */
export function obnovUloziste(): void {
  ;(globalThis as GlobalSUlozistem)[KLIC] = vytvorSemeno()
}
