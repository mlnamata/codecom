import type { DokumentDesky, KrizoveHlaseni, ObecVerejna } from '@codekom/typy'
import { aktivniHlaseni, filtrujDesku, jeVerejny, NA_STRANU, pragueDayKey } from '@codekom/typy/pravidla'
import { demoTed } from '@codekom/demo-data'
import { uloziste, type DokumentVUlozisti, type KrizeVUlozisti } from './demo-pamet'
import type { ZdrojDat } from './zdroj'

const bezStavu = ({ stav: _stav, ...h }: KrizeVUlozisti): KrizoveHlaseni => h
const bezPridani = ({ pridany: _p, ...d }: DokumentVUlozisti): DokumentDesky => d

function prava(slug: string): boolean {
  return uloziste().obec.slug === slug
}

/** Implementace `ZdrojDat` nad úložištěm v paměti. Čas bere vždy z `demoTed()`. */
export const demoZdroj: ZdrojDat = {
  async obec(slug) {
    return prava(slug) ? uloziste().obec : null
  },

  async seznamObci(): Promise<ObecVerejna[]> {
    const o = uloziste().obec
    if (!o.moduly.includes('aplikace')) return []
    return [
      {
        slug: o.slug,
        nazev: o.nazev,
        okres: o.okres,
        znakUrl: o.znakUrl ?? '/demo/znak.svg',
        castiObce: o.castiObce.map(({ nazev, slug }) => ({ nazev, slug })),
      },
    ]
  },

  async aktuality(obec, o) {
    if (!prava(obec)) return []
    const ted = demoTed().getTime()
    const list = uloziste()
      .aktuality.filter((a) => new Date(a.publikovano).getTime() <= ted)
      .sort((a, b) => b.publikovano.localeCompare(a.publikovano))
    return o?.limit ? list.slice(0, o.limit) : list
  },

  async aktualita(obec, slug) {
    if (!prava(obec)) return null
    return uloziste().aktuality.find((a) => a.slug === slug) ?? null
  },

  async akce(obec, o) {
    if (!prava(obec)) return []
    const od = o?.odDne ?? pragueDayKey(demoTed())
    return uloziste()
      .akce.filter((a) => a.den >= od)
      .sort((a, b) => a.den.localeCompare(b.den) || (a.od ?? '').localeCompare(b.od ?? ''))
  },

  async kategorieDesky(obec) {
    if (!prava(obec)) return []
    return [...uloziste().kategorie].sort((a, b) => a.poradi - b.poradi)
  },

  async deska(obec, f) {
    if (!prava(obec)) return { polozky: [], celkem: 0 }
    const vse = filtrujDesku(uloziste().dokumenty, f, pragueDayKey(demoTed()))
    const od = (f.strana - 1) * NA_STRANU
    return { polozky: vse.slice(od, od + NA_STRANU).map(bezPridani), celkem: vse.length }
  },

  async dokument(obec, id) {
    if (!prava(obec)) return null
    const d = uloziste().dokumenty.find((x) => x.id === id)
    return d && jeVerejny(d, pragueDayKey(demoTed())) ? bezPridani(d) : null
  },

  async krize(obec, ted) {
    if (!prava(obec)) return { hlavni: null, dalsich: 0 }
    const aktivni = aktivniHlaseni(vydana(), ted)
    return { hlavni: aktivni[0] ?? null, dalsich: Math.max(0, aktivni.length - 1) }
  },

  async vsechnaKrize(obec, ted) {
    if (!prava(obec)) return { aktivni: [], archiv: [] }
    const vse = uloziste().krize.filter((h) => h.stav !== 'koncept')
    const aktivni = aktivniHlaseni(vydana(), ted)
    const ids = new Set(aktivni.map((h) => h.id))
    const archiv = vse
      .filter((h) => !ids.has(h.id) && new Date(h.platiOd).getTime() <= ted.getTime())
      .map(bezStavu)
      .sort((a, b) => b.platiOd.localeCompare(a.platiOd))
    return { aktivni, archiv }
  },

  async rozhlas(obec) {
    if (!prava(obec)) return []
    return [...uloziste().rozhlas].sort((a, b) => b.cas.localeCompare(a.cas))
  },

  async zastupitele(obec) {
    if (!prava(obec)) return []
    return uloziste()
      .zastupitele.filter((z) => z.aktivni)
      .sort((a, b) => a.poradi - b.poradi)
  },

  async zivotniSituace(obec) {
    return prava(obec) ? uloziste().situace : []
  },

  async sluzby(obec) {
    return prava(obec) ? uloziste().sluzby : []
  },

  async poplatky(obec) {
    return prava(obec) ? uloziste().poplatky : []
  },

  async prostory(obec) {
    return prava(obec) ? uloziste().prostory : []
  },

  async rezervace(obec, prostor) {
    if (!prava(obec)) return []
    return uloziste()
      .rezervace.filter((r) => r.prostor === prostor && r.stav !== 'zamitnuto')
      .map(({ den, od, do: doKdy, stav }) => ({ den, od, do: doKdy, stav }))
  },

  async hlaseniZavad(obec, kod) {
    if (!prava(obec)) return null
    const k = kod.trim().toUpperCase()
    return uloziste().zavady.find((z) => z.sledovaciKod === k) ?? null
  },

  async kategorieZavad(obec) {
    return prava(obec) ? uloziste().kategorieZavad : []
  },
}

function vydana(): KrizoveHlaseni[] {
  return uloziste()
    .krize.filter((h) => h.stav === 'vydano')
    .map(bezStavu)
}
