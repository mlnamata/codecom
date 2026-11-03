import type { Where } from 'payload'
import { noonUtc } from './datum'

/** Which documents the list shows. */
export type DeskaStav = 'visi' | 'sejmuto' | 'vse'

/** State of a single document on a given day. */
export type StavDokumentu = 'pripraveno' | 'visi' | 'sejmuto'

export interface DeskaFiltry {
  /** Category slug, or null for all categories. */
  kategorie: string | null
  stav: DeskaStav
  /** Free-text search in title and reference number. Empty string when not searching. */
  q: string
  /** 1-based page number. */
  strana: number
}

export const NA_STRANU = 25
export const MAX_DELKA_HLEDANI = 100
export const VYCHOZI_FILTRY: DeskaFiltry = { kategorie: null, stav: 'visi', q: '', strana: 1 }

export const STAV_POPIS: Record<DeskaStav, string> = {
  visi: 'Visí na desce',
  sejmuto: 'Sejmuté (archiv)',
  vse: 'Všechny',
}

type SearchParams = Record<string, string | string[] | undefined>

const first = (v: string | string[] | undefined): string | undefined => (Array.isArray(v) ? v[0] : v)

/**
 * Reads filters from the URL. Anything unknown or malformed falls back to the default,
 * so a hand-edited or stale link always shows a sensible list instead of an error.
 */
export function parseDeskaParams(sp: SearchParams, kategorieSlugs: readonly string[]): DeskaFiltry {
  const kat = first(sp.kategorie)?.trim()
  const stav = first(sp.stav)
  const q = (first(sp.q) ?? '').replace(/\s+/g, ' ').trim().slice(0, MAX_DELKA_HLEDANI)
  const strana = Number.parseInt(first(sp.strana) ?? '1', 10)
  return {
    kategorie: kat && kategorieSlugs.includes(kat) ? kat : null,
    stav: stav === 'sejmuto' || stav === 'vse' ? stav : 'visi',
    q,
    strana: Number.isFinite(strana) && strana >= 1 && strana <= 10_000 ? strana : 1,
  }
}

/** Builds the query string for a filter state, leaving out defaults so URLs stay short. */
export function deskaHref(f: DeskaFiltry, path = '/uredni-deska'): string {
  const p = new URLSearchParams()
  if (f.kategorie) p.set('kategorie', f.kategorie)
  if (f.stav !== 'visi') p.set('stav', f.stav)
  if (f.q) p.set('q', f.q)
  if (f.strana > 1) p.set('strana', String(f.strana))
  const s = p.toString()
  return s ? `${path}?${s}` : path
}

export function jeVychozi(f: DeskaFiltry): boolean {
  return !f.kategorie && f.stav === 'visi' && !f.q
}

/**
 * `vyvesenoDo` is the last day the document hangs (inclusive). Null means "do odvolání".
 * All arguments are Prague calendar days as `YYYY-MM-DD`.
 */
export function stavDokumentu(vyvesenoOd: string, vyvesenoDo: string | null, dnes: string): StavDokumentu {
  if (dnes < vyvesenoOd) return 'pripraveno'
  if (vyvesenoDo !== null && dnes > vyvesenoDo) return 'sejmuto'
  return 'visi'
}

/**
 * Payload `where` for the public list. Access control already limits the public to
 * published documents; this adds the time window, category and search.
 */
export function deskaWhere(f: DeskaFiltry, dnes: string, kategorieId?: number | string | null): Where {
  const today = noonUtc(dnes)
  const and: Where[] = [{ vyvesenoOd: { less_than_equal: today } }]
  // `not_equals: true` would drop rows where the checkbox is NULL, so spell both cases out.
  const archivovatelne: Where = { or: [{ skrytPoSejmuti: { equals: false } }, { skrytPoSejmuti: { exists: false } }] }

  if (f.stav === 'visi') {
    and.push({ or: [{ vyvesenoDo: { exists: false } }, { vyvesenoDo: { greater_than_equal: today } }] })
  } else if (f.stav === 'sejmuto') {
    and.push({ vyvesenoDo: { less_than: today } }, archivovatelne)
  } else {
    and.push({
      or: [
        { vyvesenoDo: { exists: false } },
        { vyvesenoDo: { greater_than_equal: today } },
        ...(archivovatelne.or ?? []),
      ],
    })
  }

  if (kategorieId != null) and.push({ kategorie: { equals: kategorieId } })
  if (f.q) and.push({ or: [{ nazev: { like: f.q } }, { cisloJednaci: { like: f.q } }] })
  return { and }
}

/** Sort order: newest posting first; archive by most recently taken down. */
export function deskaSort(f: DeskaFiltry): string[] {
  return f.stav === 'sejmuto' ? ['-vyvesenoDo', '-vyvesenoOd'] : ['-vyvesenoOd', 'nazev']
}

/** Czech plural: 1 dokument, 2 dokumenty, 5 dokumentů. */
export function pocetDokumentu(n: number): string {
  if (n === 1) return '1 dokument'
  if (n >= 2 && n <= 4) return `${n} dokumenty`
  return `${n.toLocaleString('cs-CZ').replace(/ /g, ' ')} dokumentů`
}

/** One-sentence summary of the active filters, used in the table caption and status line. */
export function popisFiltru(f: DeskaFiltry, kategorieNazev: string | null): string {
  const casti = [STAV_POPIS[f.stav]]
  if (kategorieNazev) casti.push(`kategorie ${kategorieNazev}`)
  if (f.q) casti.push(`hledáte „${f.q}“`)
  return casti.join(', ')
}

/** `84 kB`, `1,2 MB` */
export function formatVelikost(bytes: number | null | undefined): string | null {
  if (bytes == null || !Number.isFinite(bytes) || bytes < 0) return null
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} kB`
  return `${(bytes / (1024 * 1024)).toLocaleString('cs-CZ', { maximumFractionDigits: 1 })} MB`
}

/** Short file type label from a MIME type. */
export function typSouboru(mime: string | null | undefined): string {
  if (!mime) return 'soubor'
  if (mime === 'application/pdf') return 'PDF'
  if (mime.includes('wordprocessingml') || mime === 'application/msword') return 'Word'
  if (mime.includes('spreadsheetml') || mime === 'application/vnd.ms-excel') return 'Excel'
  if (mime.startsWith('image/')) return 'obrázek'
  return 'soubor'
}
