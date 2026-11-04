import { budovy, hlaseniZavad, obec } from '@codekom/demo-data'
import bezpecnost from '../../../../../../../obsah/javori-lhota/bezpecnost.json'
import chytraObec from '../../../../../../../obsah/javori-lhota/chytra-obec.json'
import type { Metadata } from 'next'
import { PanelObce, type ObjektMapy } from './PanelObce'
import { ROZMISTENI } from './rozmisteni'
import './panel.css'

export const metadata: Metadata = { title: 'Řídicí panel' }

const bod = (id: string) => ROZMISTENI[id] ?? null

export default function PanelPage() {
  const { senzory, odjezdy, parkovani } = chytraObec
  const objekty: ObjektMapy[] = []

  for (const k of bezpecnost.kamery) {
    const b = bod(k.id)
    if (b) objekty.push({ id: k.id, druh: 'kamera', nazev: k.nazev, ...b, popis: k.umisteni, kamera: { ucel: k.ucel, obnovaSec: k.obnovaSec, gdpr: k.gdprPoznamka, online: k.stav === 'online' } })
  }

  for (const bud of budovy.budovy) {
    const b = bod(bud.id)
    if (b)
      objekty.push({
        id: bud.id,
        druh: 'cidlo',
        nazev: bud.nazev,
        ...b,
        popis: bud.souhrn,
        stav: bud.stav === 'alarm' ? 'porucha' : bud.stav === 'varovani' ? 'varovani' : 'ok',
        hodnoty: bud.mistnosti.map((m) => ({ nazev: m.nazev, hodnota: `${m.teplota.toLocaleString('cs-CZ')} °C`, pozn: `cíl ${m.cilText}${m.okno === 'otevreno' ? ', okno otevřené' : ''}` })),
      })
  }

  const s = senzory
  const cidla: [string, string, string, { nazev: string; hodnota: string; pozn?: string }[], 'ok' | 'varovani' | 'porucha'][] = [
    ['ovzdusi', 'Meteostanice a ovzduší', s.ovzdusi.stanice, [
      { nazev: 'Teplota', hodnota: `${s.ovzdusi.teplota.toLocaleString('cs-CZ')} °C` },
      { nazev: 'Vlhkost', hodnota: `${s.ovzdusi.vlhkost} %` },
      { nazev: 'Kvalita ovzduší', hodnota: s.ovzdusi.aqiStav, pozn: `AQI ${s.ovzdusi.aqi}, PM2,5 ${s.ovzdusi.pm25.toLocaleString('cs-CZ')} µg/m³` },
    ], 'ok'],
    ['potok', 'Vodočet', `${s.potok.tok}, ${s.potok.profil}`, [
      { nazev: 'Hladina', hodnota: `${s.potok.hladina} ${s.potok.jednotka}`, pozn: `bdělost od ${s.potok.stupne.bdelost} cm` },
      { nazev: 'Průtok', hodnota: `${s.potok.prutok.toLocaleString('cs-CZ')} ${s.potok.prutokJednotka}` },
      { nazev: 'Stav', hodnota: s.potok.stavNazev },
    ], s.potok.varovaniAktivni ? 'varovani' : 'ok'],
    ['vozovka', 'Čidlo vozovky', s.vozovka.usek, [
      { nazev: 'Povrch', hodnota: `${s.vozovka.teplotaPovrchu.toLocaleString('cs-CZ')} °C` },
      { nazev: 'Stav vozovky', hodnota: s.vozovka.stavVozovky },
      { nazev: 'Riziko náledí', hodnota: s.vozovka.rizikoNamrazy ? 'ano' : 'ne' },
    ], s.vozovka.rizikoNamrazy ? 'varovani' : 'ok'],
    ['puda', 'Půdní čidlo', s.puda.lokalita, [
      { nazev: 'Vlhkost půdy', hodnota: `${s.puda.vlhkostPudy} %` },
      { nazev: 'Riziko požáru', hodnota: s.puda.rizikoPozaru },
    ], 'ok'],
  ]
  for (const [id, nazev, popis, hodnoty, stav] of cidla) {
    const b = bod(id)
    if (b) objekty.push({ id, druh: 'cidlo', nazev, ...b, popis, hodnoty, stav })
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

  return (
    <PanelObce
      obec={obec.nazev}
      telefon={obec.telefon}
      uredniHodiny={obec.uredniHodinyText}
      stav={{ teplota: s.ovzdusi.teplota, ovzdusi: s.ovzdusi.aqiStav, potok: s.potok.stavNazev }}
      objekty={objekty}
      odjezdy={odjezdy}
      parkovani={parkovani.map((p) => ({ id: p.id, nazev: p.nazev, kapacita: p.kapacita, volno: p.volno }))}
      zavady={otevreneZavady.map((h) => ({ id: h.id, cislo: h.cislo, popis: h.popis, stav: hlaseniZavad.stavy.find((x) => x.id === h.stav)?.nazev ?? h.stav }))}
      aktualizace={chytraObec.posledniAktualizace}
    />
  )
}
