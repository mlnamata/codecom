import 'server-only'
import { cache } from 'react'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { asistentUkazka, demoTed } from '@codekom/demo-data'
import { paleta as najdiPaletu, sablona as najdiSablonu } from '@codekom/tokeny'
import type { DokumentDesky, Obec } from '@codekom/typy'
import { pragueDayKey } from '@codekom/typy/pravidla'
import { nactiSablonu } from '@/sablony'
import type { DataUvodu, PolozkaDesky } from '@/sablony/sdilene/typy'
import { zdroj } from './data/zdroj'
import { HLAVICKA_UKAZKY, precti, type StavUkazky } from '@/ukazka/stav'

/** Obec, kterou web obsluhuje. Prompt 01 ji bude brát z hostitele (`sites/[obec]`). */
export const slugObce = (): string => process.env.CODEKOM_OBEC?.trim() || 'javori-lhota'

export const nactiObec = cache(async (): Promise<Obec> => {
  const obec = await (await zdroj()).obec(slugObce())
  if (!obec) notFound()
  return obec
})

export const stavUkazky = cache(async (): Promise<StavUkazky> => precti((await headers()).get(HLAVICKA_UKAZKY)))

/** Efektivní vzhled: volba z ukázky, jinak výchozí hodnoty obce. */
export const vzhled = cache(async () => {
  const obec = await nactiObec()
  const stav = await stavUkazky()
  const klic = stav.sablona ?? obec.sablona
  const sablona = najdiSablonu(klic)
  const indexPalety = stav.paleta ?? (klic === obec.sablona ? obec.paleta : 0)
  const paleta = najdiPaletu(klic, indexPalety)
  const modul = await nactiSablonu(klic)
  return { obec, stav, sablona, paleta, indexPalety, modul, foto: stav.foto === true && modul.foto }
})

const polozkaDesky = (d: DokumentDesky): PolozkaDesky => ({
  id: d.id,
  nazev: d.nazev,
  anotace: d.anotace,
  kategorie: d.kategorie,
  vyvesenoOd: d.vyvesenoOd,
  vyvesenoDo: d.vyvesenoDo,
  href: `/uredni-deska/${d.id}`,
})

export const dataUvodu = cache(async (): Promise<DataUvodu> => {
  const z = await zdroj()
  const obec = slugObce()
  const dnes = pragueDayKey(demoTed())
  const [aktuality, deska, archiv, kategorie, akce, rozhlas] = await Promise.all([
    z.aktuality(obec, { limit: 12 }),
    z.deska(obec, { kategorie: null, stav: 'visi', q: '', strana: 1 }),
    z.deska(obec, { kategorie: null, stav: 'sejmuto', q: '', strana: 1 }),
    z.kategorieDesky(obec),
    z.akce(obec, { odDne: dnes }),
    z.rozhlas(obec),
  ])
  return {
    aktuality: aktuality.map((a) => ({
      id: a.id,
      titulek: a.titulek,
      perex: a.perex,
      publikovanoDen: pragueDayKey(new Date(a.publikovano)),
      href: `/aktuality/${a.slug}`,
    })),
    deska: deska.polozky.map(polozkaDesky),
    deskaArchiv: archiv.polozky.map(polozkaDesky),
    kategorieDesky: kategorie.map((k) => ({ slug: k.slug, nazev: k.nazev })),
    akce: akce.map((a) => ({ id: a.id, nazev: a.nazev, popis: a.popis, den: a.den, misto: a.misto, href: `/akce#${a.slug}` })),
    rozhlas: rozhlas.map((r) => ({ id: r.id, titulek: r.titulek, text: r.text, casDen: pragueDayKey(new Date(r.cas)), href: `/hlaseni-rozhlasu#${r.id}` })),
    asistent: asistentUkazka.otazky.map((o) => ({
      otazka: o.otazka,
      odpoved: o.odpoved,
      zdroje: o.zdroje.map((z) => ({ nazev: z.nazev, href: `/uredni-deska/${z.dokument}` })),
    })),
  }
})
