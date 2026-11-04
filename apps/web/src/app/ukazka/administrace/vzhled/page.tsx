import type { Metadata } from 'next'
import { schopnosti } from '@/ukazka/uroven'
import { urovenAdministrace } from '@/ukazka/uroven-server'
import { SABLONY, KLICE_TOKENU, type Paleta } from '@codekom/tokeny'
import { uloziste } from '@/lib/data/demo-pamet'
import { Vzhled } from '../Obrazovky'

const cssTokeny = (p: Paleta): Record<string, string> => Object.fromEntries(KLICE_TOKENU.map((k) => [k, p[k]]))

export const metadata: Metadata = { title: 'Vzhled' }
export const dynamic = 'force-dynamic'

export default async function Stranka() {
  const uroven = await urovenAdministrace()
  const s = schopnosti(uroven)
  const klic = uloziste().obec.sablona
  return (
    <>
      <h1>Vzhled</h1>
      <p>Šablona, barevná varianta a v Advance všech 12 barev webu. Kontrast se počítá hned a slabé barvy nejdou zveřejnit.</p>
      <Vzhled s={s} sablony={SABLONY.map((x) => ({ klic: x.klic, nazev: `${x.cislo} ${x.nazev}` }))} aktualni={klic} palety={Object.fromEntries(SABLONY.map((x) => [x.klic, x.palety.map((p) => ({ nazev: p.nazev, tokeny: cssTokeny(p) }))]))} />
    </>
  )
}
