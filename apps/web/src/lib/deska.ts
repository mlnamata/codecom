import type { Where } from 'payload'
import { noonUtc } from './datum'
import type { DeskaFiltry } from './deska-pravidla'

// Čisté funkce žijí v @codekom/typy. Tady zůstává jen dotaz pro Payload (prompt 01).
export * from './deska-pravidla'

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

