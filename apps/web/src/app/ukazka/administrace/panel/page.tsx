import { budovy, hlaseniZavad, obec } from '@codekom/demo-data'
import type { Metadata } from 'next'
import bezpecnost from '../../../../../../../obsah/javori-lhota/bezpecnost.json'
import chytraObec from '../../../../../../../obsah/javori-lhota/chytra-obec.json'
import { Plocha } from './Plocha'
import { ROZMISTENI } from './rozmisteni'
import type { Budova, Cidlo, DataPanelu, ObjektMapy, Stav } from './Widgety'
import './panel.css'

export const metadata: Metadata = { title: 'Řídicí panel' }

const bod = (id: string) => ROZMISTENI[id] ?? null
const stavBudovy = (s: string): Stav => (s === 'alarm' ? 'porucha' : s === 'varovani' ? 'varovani' : 'ok')

/** Řídicí panel obce v administraci: plocha s widgety, kterou si uživatel uspořádá. Data jsou z ukázkové obce. */
export default function PanelPage() {
  const { senzory: s, odjezdy, parkovani } = chytraObec
  const objekty: ObjektMapy[] = []

  for (const k of bezpecnost.kamery) {
    const b = bod(k.id)
    if (b) objekty.push({ id: k.id, druh: 'kamera', nazev: k.nazev, ...b, popis: k.umisteni, kamera: { ucel: k.ucel, obnovaSec: k.obnovaSec, gdpr: k.gdprPoznamka, online: k.stav === 'online' } })
  }

  const seznamBudov: Budova[] = budovy.budovy.map((bud) => ({
    id: bud.id,
    nazev: bud.nazev,
    stav: stavBudovy(bud.stav),
    upozorneni: bud.upozorneni.map((u) => u.text),
    mistnosti: bud.mistnosti.map((m) => ({ nazev: m.nazev, teplota: m.teplota, cil: m.cilovaTeplota, cilText: m.cilText, oknoOtevrene: m.okno === 'otevreno' })),
    energie: bud.energie.map((e) => ({ den: e.den, kWh: e.kWh })),
  }))

  for (const bud of budovy.budovy) {
    const b = bod(bud.id)
    if (b)
      objekty.push({
        id: bud.id,
        druh: 'cidlo',
        nazev: bud.nazev,
        ...b,
        popis: bud.souhrn,
        stav: stavBudovy(bud.stav),
        hodnoty: bud.mistnosti.map((m) => ({ nazev: m.nazev, hodnota: `${m.teplota.toLocaleString('cs-CZ')} °C`, pozn: `cíl ${m.cilText}${m.okno === 'otevreno' ? ', okno otevřené' : ''}` })),
      })
  }

  const cidla: Cidlo[] = [
    {
      id: 'ovzdusi',
      nazev: 'Meteostanice a ovzduší',
      popis: s.ovzdusi.stanice,
      stav: 'ok',
      hodnoty: [
        { nazev: 'Teplota', hodnota: `${s.ovzdusi.teplota.toLocaleString('cs-CZ')} °C` },
        { nazev: 'Vlhkost', hodnota: `${s.ovzdusi.vlhkost} %` },
        { nazev: 'Kvalita ovzduší', hodnota: s.ovzdusi.aqiStav, pozn: `AQI ${s.ovzdusi.aqi}, PM2,5 ${s.ovzdusi.pm25.toLocaleString('cs-CZ')} µg/m³` },
      ],
    },
    {
      id: 'potok',
      nazev: 'Vodočet',
      popis: `${s.potok.tok}, ${s.potok.profil}`,
      stav: s.potok.varovaniAktivni ? 'varovani' : 'ok',
      hodnoty: [
        { nazev: 'Hladina', hodnota: `${s.potok.hladina} ${s.potok.jednotka}`, pozn: `bdělost od ${s.potok.stupne.bdelost} cm` },
        { nazev: 'Průtok', hodnota: `${s.potok.prutok.toLocaleString('cs-CZ')} ${s.potok.prutokJednotka}` },
        { nazev: 'Stav', hodnota: s.potok.stavNazev },
      ],
    },
    {
      id: 'vozovka',
      nazev: 'Čidlo vozovky',
      popis: s.vozovka.usek,
      stav: s.vozovka.rizikoNamrazy ? 'varovani' : 'ok',
      hodnoty: [
        { nazev: 'Povrch', hodnota: `${s.vozovka.teplotaPovrchu.toLocaleString('cs-CZ')} °C` },
        { nazev: 'Stav vozovky', hodnota: s.vozovka.stavVozovky },
        { nazev: 'Riziko náledí', hodnota: s.vozovka.rizikoNamrazy ? 'ano' : 'ne' },
      ],
    },
    {
      id: 'puda',
      nazev: 'Půdní čidlo',
      popis: s.puda.lokalita,
      stav: 'ok',
      hodnoty: [
        { nazev: 'Vlhkost půdy', hodnota: `${s.puda.vlhkostPudy} %` },
        { nazev: 'Riziko požáru', hodnota: s.puda.rizikoPozaru },
      ],
    },
  ]
  for (const c of cidla) {
    const b = bod(c.id)
    if (b) objekty.push({ id: c.id, druh: 'cidlo', nazev: c.nazev, ...b, popis: c.popis, hodnoty: c.hodnoty, stav: c.stav })
  }

  for (const p of budovy.prvky.filter((x) => x.typ === 'zamek')) {
    const b = bod(p.id)
    const bud = budovy.budovy.find((x) => x.id === p.budova)
    if (b && bud) objekty.push({ id: p.id, druh: 'zamek', nazev: `${p.nazev}, ${bud.nazev}`, ...b, popis: bud.adresa, zamek: { kdoMaKlic: bud.kdoMaKlic, baterie: p.baterie } })
  }

  for (const stanice of [...new Set(odjezdy.map((o) => o.stanice))]) {
    const b = bod(stanice)
    if (b) objekty.push({ id: stanice, druh: 'zastavka', nazev: stanice, ...b, odjezdy: odjezdy.filter((o) => o.stanice === stanice) })
  }

  const otevreneZavady = hlaseniZavad.hlaseni.filter((h) => h.stav !== 'vyrizeno' && h.stav !== 'zamitnuto')

  const data: DataPanelu = {
    obec: obec.nazev,
    telefon: obec.telefon,
    uredniHodiny: obec.uredniHodinyText,
    stav: { teplota: s.ovzdusi.teplota, ovzdusi: s.ovzdusi.aqiStav, potok: s.potok.stavNazev },
    objekty,
    budovy: seznamBudov,
    cidla,
    potok: { hladina: s.potok.hladina, jednotka: s.potok.jednotka, stupne: s.potok.stupne },
    odjezdy,
    parkovani: parkovani.map((p) => ({ id: p.id, nazev: p.nazev, kapacita: p.kapacita, volno: p.volno })),
    zavady: otevreneZavady.map((h) => ({ id: h.id, cislo: h.cislo, popis: h.popis, stav: hlaseniZavad.stavy.find((x) => x.id === h.stav)?.nazev ?? h.stav })),
    aktualizace: chytraObec.posledniAktualizace,
  }

  return <Plocha data={data} />
}
