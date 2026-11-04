'use client'

import { useState } from 'react'

export interface PlatcePoplatku {
  id: string
  jmeno: string
  cisloPopisne: string
  variabilniSymbol: string
  typ: 'odpad' | 'pes' | 'hrob' | 'stocne'
  nazevPoplatku: string
  castka: number
  splatnost: string
  stav: 'uhrazeno' | 'ceka' | 'po_splatnosti'
  email: string
  telefon: string
}

export interface PokladniDoklad {
  id: string
  cisloDokladu: string
  typ: 'prijem' | 'vydaj'
  datum: string
  osoba: string
  ucel: string
  castka: number
}

const VYCHOZI_PLATCI: PlatcePoplatku[] = [
  {
    id: 'p-1',
    jmeno: 'Ing. Jan Novák (4 osoby)',
    cisloPopisne: 'č.p. 45',
    variabilniSymbol: '20260045',
    typ: 'odpad',
    nazevPoplatku: 'Komunální odpad 2026 (4× 700 Kč)',
    castka: 2800,
    splatnost: '30. 06. 2026',
    stav: 'uhrazeno',
    email: 'jan.novak@email.cz',
    telefon: '724 112 334',
  },
  {
    id: 'p-2',
    jmeno: 'Petra Svobodová',
    cisloPopisne: 'č.p. 12',
    variabilniSymbol: '20261012',
    typ: 'pes',
    nazevPoplatku: 'Poplatek ze psů (1 pes – německý ovčák)',
    castka: 200,
    splatnost: '15. 11. 2026',
    stav: 'ceka',
    email: 'petra.svobodova@seznam.cz',
    telefon: '603 881 219',
  },
  {
    id: 'p-3',
    jmeno: 'Miroslav Krátký (2 osoby)',
    cisloPopisne: 'č.p. 88',
    variabilniSymbol: '20260088',
    typ: 'odpad',
    nazevPoplatku: 'Komunální odpad 2026 (2× 700 Kč)',
    castka: 1400,
    splatnost: '30. 06. 2026',
    stav: 'po_splatnosti',
    email: 'm.kratky88@centrum.cz',
    telefon: '777 904 112',
  },
  {
    id: 'p-4',
    jmeno: 'Rodina Černých',
    cisloPopisne: 'č.p. 19',
    variabilniSymbol: '20263019',
    typ: 'hrob',
    nazevPoplatku: 'Nájem hrobového místa č. A-14 (období 2026–2031)',
    castka: 1500,
    splatnost: '30. 09. 2026',
    stav: 'po_splatnosti',
    email: 'cerny.josef@email.cz',
    telefon: '608 442 710',
  },
  {
    id: 'p-5',
    jmeno: 'Václav Horák (3 osoby)',
    cisloPopisne: 'č.p. 104',
    variabilniSymbol: '20262104',
    typ: 'stocne',
    nazevPoplatku: 'Stočné – paušál za 2. pololetí 2026',
    castka: 1800,
    splatnost: '30. 11. 2026',
    stav: 'ceka',
    email: 'horak.vaclav@seznam.cz',
    telefon: '731 502 890',
  },
  {
    id: 'p-6',
    jmeno: 'Božena Veselá (seniorka)',
    cisloPopisne: 'č.p. 7',
    variabilniSymbol: '20260007',
    typ: 'odpad',
    nazevPoplatku: 'Komunální odpad 2026 – sazba senior nad 70 let',
    castka: 350,
    splatnost: '30. 06. 2026',
    stav: 'uhrazeno',
    email: 'bez e-mailu (přepážka)',
    telefon: '721 004 512',
  },
]

const VYCHOZI_DOKLADY: PokladniDoklad[] = [
  {
    id: 'd-1',
    cisloDokladu: 'PPD-2026/142',
    typ: 'prijem',
    datum: 'Dnes, 09:15',
    osoba: 'František Kříž (č.p. 31)',
    ucel: 'Správní poplatek – ověření 2 podpisů (legalizace)',
    castka: 100,
  },
  {
    id: 'd-2',
    cisloDokladu: 'PPD-2026/141',
    typ: 'prijem',
    datum: 'Včera, 14:20',
    osoba: 'Božena Veselá (č.p. 7)',
    ucel: 'Místní poplatek za komunální odpad 2026',
    castka: 350,
  },
  {
    id: 'd-3',
    cisloDokladu: 'VPD-2026/058',
    typ: 'vydaj',
    datum: '2. 11. 2026',
    osoba: 'Karel Vondráček (SDH)',
    ucel: 'Proplacení drobného nákupu – žárovky a pojistky do zbrojnice',
    castka: 420,
  },
  {
    id: 'd-4',
    cisloDokladu: 'PPD-2026/140',
    typ: 'prijem',
    datum: '1. 11. 2026',
    osoba: 'TJ Sokol Javoří Lhota',
    ucel: 'Pronájem obecního sálu na výroční schůzi',
    castka: 1200,
  },
]

export function PoplatkyKlient() {
  const [zalozka, setZalozka] = useState<'platci' | 'pokladna' | 'vyhlaska'>('platci')
  const [platci, setPlatci] = useState<PlatcePoplatku[]>(VYCHOZI_PLATCI)
  const [doklady, setDoklady] = useState<PokladniDoklad[]>(VYCHOZI_DOKLADY)
  const [filtrTyp, setFiltrTyp] = useState<string>('vse')
  const [filtrStav, setFiltrStav] = useState<string>('vse')
  const [hledani, setHledani] = useState('')
  const [hlaska, setHlaska] = useState('')
  const [vybranyProVymer, setVybranyProVymer] = useState<PlatcePoplatku | null>(null)

  // Formulář nového pokladního dokladu
  const [typDokladu, setTypDokladu] = useState<'prijem' | 'vydaj'>('prijem')
  const [osobaDokladu, setOsobaDokladu] = useState('')
  const [ucelDokladu, setUcelDokladu] = useState('')
  const [castkaDokladu, setCastkaDokladu] = useState('')

  const filtrovaniPlatci = platci.filter((p) => {
    const shodaTyp = filtrTyp === 'vse' || p.typ === filtrTyp
    const shodaStav = filtrStav === 'vse' || p.stav === filtrStav
    const q = hledani.toLowerCase().trim()
    const shodaText =
      !q ||
      p.jmeno.toLowerCase().includes(q) ||
      p.cisloPopisne.toLowerCase().includes(q) ||
      p.variabilniSymbol.includes(q) ||
      p.nazevPoplatku.toLowerCase().includes(q)
    return shodaTyp && shodaStav && shodaText
  })

  const uhraditHotove = (p: PlatcePoplatku) => {
    setPlatci(platci.map((pol) => (pol.id === p.id ? { ...pol, stav: 'uhrazeno' } : pol)))
    const novyDoklad: PokladniDoklad = {
      id: `d-${Date.now()}`,
      cisloDokladu: `PPD-2026/${143 + doklady.length}`,
      typ: 'prijem',
      datum: 'Právě teď',
      osoba: `${p.jmeno} (${p.cisloPopisne})`,
      ucel: `Úhrada v hotovosti: ${p.nazevPoplatku} (VS ${p.variabilniSymbol})`,
      castka: p.castka,
    }
    setDoklady([novyDoklad, ...doklady])
    setHlaska(`Poplatek od „${p.jmeno}“ ve výši ${p.castka} Kč byl označen jako uhrazený a automaticky zapsán do obecní pokladny pod dokladem ${novyDoklad.cisloDokladu}.`)
  }

  const odeslatUpominku = (p: PlatcePoplatku) => {
    setHlaska(`Plátci „${p.jmeno}“ byla odeslána e-mailová a SMS upomínka s platebním QR kódem (účet obce 19-4829100287/0100, VS ${p.variabilniSymbol}, částka ${p.castka} Kč).`)
  }

  const pridatPokladniDoklad = (e: React.FormEvent) => {
    e.preventDefault()
    const hodnota = Number(castkaDokladu)
    if (!osobaDokladu || !ucelDokladu || !hodnota || hodnota <= 0) {
      setHlaska('Vyplňte plátce/příjemce, účel platby a kladnou částku v Kč.')
      return
    }
    const prefix = typDokladu === 'prijem' ? 'PPD' : 'VPD'
    const novy: PokladniDoklad = {
      id: `d-${Date.now()}`,
      cisloDokladu: `${prefix}-2026/${143 + doklady.length}`,
      typ: typDokladu,
      datum: 'Právě teď',
      osoba: osobaDokladu,
      ucel: ucelDokladu,
      castka: hodnota,
    }
    setDoklady([novy, ...doklady])
    setOsobaDokladu('')
    setUcelDokladu('')
    setCastkaDokladu('')
    setHlaska(`Pokladní doklad ${novy.cisloDokladu} na částku ${hodnota} Kč byl vystaven a zaúčtován do pokladní knihy.`)
  }

  const exportovatExcelPlatce = () => {
    const radky = [
      ['Jméno plátce', 'Číslo popisné', 'Variabilní symbol', 'Předpis poplatku', 'Částka Kč', 'Splatnost', 'Stav úhrady'],
      ...platci.map((p) => [
        `"${p.jmeno}"`,
        p.cisloPopisne,
        p.variabilniSymbol,
        `"${p.nazevPoplatku}"`,
        String(p.castka),
        p.splatnost,
        p.stav === 'uhrazeno' ? 'Uhrazeno' : p.stav === 'po_splatnosti' ? 'Po splatnosti' : 'Čeká na úhradu',
      ]),
    ]
    const csv = '\uFEFF' + radky.map((r) => r.join(';')).join('\r\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.setAttribute('download', 'evidence-mistnich-poplatku-2026.csv')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setHlaska('Evidence místních poplatků byla vyexportována pro otevření v Microsoft Excel.')
  }

  const stavPokladny =
    14020 +
    doklady.reduce((acc, d) => (d.typ === 'prijem' ? acc + d.castka : acc - d.castka), 0)

  const celkemNedoplatky = platci
    .filter((p) => p.stav === 'po_splatnosti')
    .reduce((acc, p) => acc + p.castka, 0)

  const textPlatebniVymer = vybranyProVymer
    ? `OBECNÍ ÚŘAD JAVOŘÍ LHOTA
Správce místních poplatků
Náměstí Míru 1, 330 00 Javoří Lhota, IČ: 00257834

Číslo jednací: OÚ-JL/POP/2026/${vybranyProVymer.variabilniSymbol.slice(-4)}
Datum vystavení: 4. listopadu 2026

Poplatník:
${vybranyProVymer.jmeno}
Javoří Lhota ${vybranyProVymer.cisloPopisne}, 330 00 Javoří Lhota

P L A T E B N Í   V Ý M Ě R
na místní poplatek dle zákona č. 565/1990 Sb., o místních poplatcích

Obecní úřad Javoří Lhota jako věcně a místně příslušný správce poplatku podle § 11 zákona č. 565/1990 Sb., o místních poplatcích, a v souladu s Obecně závaznou vyhláškou obce Javoří Lhota č. 1/2026 Vám vyměřuje:

Předmět poplatku: ${vybranyProVymer.nazevPoplatku}
Vyměřená částka k úhradě: ${vybranyProVymer.castka} Kč
Původní datum splatnosti: ${vybranyProVymer.splatnost}

Platební údaje pro bezhotovostní převod:
Číslo účtu obce: 19-4829100287/0100 (Komerční banka)
Variabilní symbol: ${vybranyProVymer.variabilniSymbol}

Náhradní lhůta splatnosti činí 15 dnů ode dne doručení tohoto platebního výměru. Poplatek lze uhradit rovněž v hotovosti nebo platební kartou v pokladně Obecního úřadu Javoří Lhota.

Ing. Marie Dvořáková
starostka obce Javoří Lhota`
    : ''

  return (
    <div>
      {/* Přehledové karty poplatků a pokladny */}
      <div className="admin-kpi-mrizka">
        <div className="admin-kpi-karta">
          <div className="admin-kpi-hlavicka">
            <span className="admin-kpi-popis">Vybráno na poplatcích</span>
            <span className="admin-stitek-tag" style={{ background: '#ecfdf5', color: '#065f46', borderColor: '#a7f3d0' }}>
              88 % předpisu
            </span>
          </div>
          <p className="admin-kpi-hodnota">418 600 Kč</p>
          <div className="admin-kpi-paticka">
            <span>Komunální odpad, psi, stočné a nájmy</span>
          </div>
        </div>

        <div className="admin-kpi-karta">
          <div className="admin-kpi-hlavicka">
            <span className="admin-kpi-popis">Hotovost v pokladně</span>
            <span className="admin-stitek-tag">Pokladna č. 1</span>
          </div>
          <p className="admin-kpi-hodnota">{stavPokladny.toLocaleString('cs-CZ')} Kč</p>
          <div className="admin-kpi-paticka">
            <span>{doklady.length} pokladních dokladů v knize</span>
          </div>
        </div>

        <div className="admin-kpi-karta">
          <div className="admin-kpi-hlavicka">
            <span className="admin-kpi-popis">Nedoplatky po splatnosti</span>
            <span className="admin-stitek-tag" style={{ background: '#fef2f2', color: '#991b1b', borderColor: '#fecaca' }}>
              {platci.filter((p) => p.stav === 'po_splatnosti').length} dlužníci
            </span>
          </div>
          <p className="admin-kpi-hodnota">{celkemNedoplatky.toLocaleString('cs-CZ')} Kč</p>
          <div className="admin-kpi-paticka">
            <span>Připraveno k rozeslání QR upomínek</span>
          </div>
        </div>

        <div className="admin-kpi-karta">
          <div className="admin-kpi-hlavicka">
            <span className="admin-kpi-popis">Bankovní párování</span>
            <span className="admin-stitek-tag" style={{ background: '#eff6ff', color: '#1e40af', borderColor: '#bfdbfe' }}>
              Online výpisy
            </span>
          </div>
          <p className="admin-kpi-hodnota">100 %</p>
          <div className="admin-kpi-paticka">
            <span>Automatické párování přes variabilní symbol</span>
          </div>
        </div>
      </div>

      {hlaska ? (
        <div className="uspech" role="status" style={{ marginBottom: 16 }}>
          <p style={{ margin: 0, fontSize: 13.5 }}>{hlaska}</p>
        </div>
      ) : null}

      {/* Přepínač záložek */}
      <div className="admin-zalozky" role="tablist" aria-label="Sekce místních poplatků a pokladny">
        <button
          type="button"
          role="tab"
          aria-selected={zalozka === 'platci'}
          className="admin-zalozka-tlacitko"
          onClick={() => setZalozka('platci')}
        >
          <span>Evidence plátců a nedoplatků ({platci.length})</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={zalozka === 'pokladna'}
          className="admin-zalozka-tlacitko"
          onClick={() => setZalozka('pokladna')}
        >
          <span>Obecní pokladna a doklady ({doklady.length})</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={zalozka === 'vyhlaska'}
          className="admin-zalozka-tlacitko"
          onClick={() => setZalozka('vyhlaska')}
        >
          <span>Sazebník dle obecní vyhlášky</span>
        </button>
      </div>

      {zalozka === 'platci' ? (
        <section className="panel-bily" aria-label="Evidence plátců poplatků">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                type="search"
                placeholder="Hledat jméno, č.p. nebo variabilní symbol..."
                value={hledani}
                onChange={(e) => setHledani(e.target.value)}
                style={{ width: 280, minHeight: 36, margin: 0 }}
              />
              <select
                aria-label="Filtrovat podle druhu poplatku"
                value={filtrTyp}
                onChange={(e) => setFiltrTyp(e.target.value)}
                style={{ minHeight: 36, width: 200, margin: 0 }}
              >
                <option value="vse">Všechny druhy poplatků</option>
                <option value="odpad">Komunální odpad</option>
                <option value="pes">Poplatek ze psů</option>
                <option value="hrob">Hrobová místa</option>
                <option value="stocne">Stočné a vodné</option>
              </select>
              <select
                aria-label="Filtrovat podle stavu úhrady"
                value={filtrStav}
                onChange={(e) => setFiltrStav(e.target.value)}
                style={{ minHeight: 36, width: 180, margin: 0 }}
              >
                <option value="vse">Všechny stavy</option>
                <option value="po_splatnosti">Po splatnosti (dlužníci)</option>
                <option value="ceka">Čeká na úhradu</option>
                <option value="uhrazeno">Uhrazeno</option>
              </select>
            </div>

            <button type="button" className="mala" onClick={exportovatExcelPlatce}>
              Exportovat seznam do MS Excel (.csv)
            </button>
          </div>

          <div className="posuvnik" style={{ marginBottom: 0 }}>
            <table className="tabulka-admin">
              <thead>
                <tr>
                  <th>Poplatník a č.p.</th>
                  <th>Variabilní symbol</th>
                  <th>Předpis poplatku</th>
                  <th className="cislo">Částka</th>
                  <th>Splatnost</th>
                  <th>Stav</th>
                  <th>Akce úřadu</th>
                </tr>
              </thead>
              <tbody>
                {filtrovaniPlatci.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <strong>{p.jmeno}</strong>
                      <div className="vedlejsi" style={{ fontSize: 12 }}>
                        {p.cisloPopisne} · {p.telefon}
                      </div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: 13 }}>{p.variabilniSymbol}</td>
                    <td>{p.nazevPoplatku}</td>
                    <td className="cislo">
                      <strong>{p.castka} Kč</strong>
                    </td>
                    <td>{p.splatnost}</td>
                    <td>
                      {p.stav === 'uhrazeno' ? (
                        <span className="stav dobre">Uhrazeno</span>
                      ) : p.stav === 'po_splatnosti' ? (
                        <span className="stav spatne">Po splatnosti</span>
                      ) : (
                        <span className="stav pozor">Před splatností</span>
                      )}
                    </td>
                    <td>
                      <div className="radek-akci">
                        {p.stav !== 'uhrazeno' ? (
                          <>
                            <button
                              type="button"
                              className="mala hlavni"
                              onClick={() => uhraditHotove(p)}
                              title="Přijmout hotovost na přepážce a automaticky vystavit příjmový pokladní doklad"
                            >
                              Uhradit v pokladně
                            </button>
                            <button
                              type="button"
                              className="mala"
                              onClick={() => odeslatUpominku(p)}
                            >
                              QR upomínka
                            </button>
                            <button
                              type="button"
                              className="mala"
                              onClick={() => setVybranyProVymer(p)}
                            >
                              Výměr do MS Word
                            </button>
                          </>
                        ) : (
                          <span className="vedlejsi" style={{ fontSize: 12.5 }}>Vyrovnáno</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {vybranyProVymer ? (
            <div style={{ marginTop: 20, padding: 20, background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div>
                  <strong style={{ fontSize: 15, display: 'block' }}>
                    Platební výměr připravený pro Microsoft Word ({vybranyProVymer.jmeno})
                  </strong>
                  <span className="vedlejsi" style={{ fontSize: 12.5 }}>
                    Oficiální rozhodnutí správce poplatku dle zákona č. 565/1990 Sb.
                  </span>
                </div>
                <button type="button" className="mala" onClick={() => setVybranyProVymer(null)}>
                  Zavřít
                </button>
              </div>
              <pre
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--line)',
                  borderRadius: 6,
                  padding: 14,
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                  margin: '0 0 12px',
                }}
              >
                {textPlatebniVymer}
              </pre>
              <div className="radek-akci">
                <button
                  type="button"
                  className="mala hlavni"
                  onClick={() => {
                    const blob = new Blob([textPlatebniVymer], { type: 'text/plain;charset=utf-8;' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.setAttribute('download', `platebni-vymer-${vybranyProVymer.variabilniSymbol}.txt`)
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    setHlaska('Platební výměr byl stažen pro úpravu a tisk v aplikaci Microsoft Word.')
                  }}
                >
                  Stáhnout podklad pro MS Word (.txt / .doc)
                </button>
                <button
                  type="button"
                  className="mala"
                  onClick={() => window.print()}
                >
                  Vytisknout platební výměr
                </button>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {zalozka === 'pokladna' ? (
        <div className="admin-prehled-sloupce">
          <section className="panel-bily" aria-labelledby="novy-doklad-nadpis">
            <h2 id="novy-doklad-nadpis" style={{ marginTop: 0 }}>
              Vystavit pokladní doklad na přepážce
            </h2>
            <p className="vedlejsi" style={{ fontSize: 13, marginBottom: 16 }}>
              Okamžité zaúčtování hotovostního příjmu (PPD) nebo výdaje (VPD) bez nutnosti externího účetního programu.
            </p>
            <form onSubmit={pridatPokladniDoklad} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label htmlFor="doklad-typ">Druh pokladního dokladu</label>
                <select
                  id="doklad-typ"
                  value={typDokladu}
                  onChange={(e) => setTypDokladu(e.target.value as 'prijem' | 'vydaj')}
                >
                  <option value="prijem">Příjmový pokladní doklad (PPD)</option>
                  <option value="vydaj">Výdajový pokladní doklad (VPD)</option>
                </select>
              </div>
              <div>
                <label htmlFor="doklad-osoba">Plátce / Příjemce hotovosti</label>
                <input
                  id="doklad-osoba"
                  type="text"
                  placeholder="např. Jan Dvořák, č.p. 24"
                  value={osobaDokladu}
                  onChange={(e) => setOsobaDokladu(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="doklad-ucel">Účel platby</label>
                <input
                  id="doklad-ucel"
                  type="text"
                  placeholder="např. Poplatek ze psů 2026 nebo Ověření podpisu"
                  value={ucelDokladu}
                  onChange={(e) => setUcelDokladu(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="doklad-castka">Částka v Kč</label>
                <input
                  id="doklad-castka"
                  type="number"
                  min={1}
                  placeholder="200"
                  value={castkaDokladu}
                  onChange={(e) => setCastkaDokladu(e.target.value)}
                  required
                />
              </div>
              <div style={{ paddingTop: 4 }}>
                <button type="submit" className="mala hlavni">
                  Vystavit doklad a započítat do pokladny
                </button>
              </div>
            </form>
          </section>

          <section className="panel-bily" aria-labelledby="kniha-dokladu-nadpis">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h2 id="kniha-dokladu-nadpis" style={{ margin: 0 }}>
                Pokladní kniha obce
              </h2>
              <button
                type="button"
                className="mala"
                onClick={() => window.print()}
              >
                Vytisknout pokladní deník
              </button>
            </div>
            <div className="posuvnik" style={{ marginBottom: 0 }}>
              <table className="tabulka-admin">
                <thead>
                  <tr>
                    <th>Doklad</th>
                    <th>Osoba a účel</th>
                    <th className="cislo">Částka</th>
                  </tr>
                </thead>
                <tbody>
                  {doklady.map((d) => (
                    <tr key={d.id}>
                      <td>
                        <strong>{d.cisloDokladu}</strong>
                        <div className="vedlejsi" style={{ fontSize: 12 }}>{d.datum}</div>
                      </td>
                      <td>
                        <strong>{d.osoba}</strong>
                        <div className="vedlejsi" style={{ fontSize: 12.5 }}>{d.ucel}</div>
                      </td>
                      <td className="cislo">
                        <strong style={{ color: d.typ === 'prijem' ? '#065f46' : '#991b1b' }}>
                          {d.typ === 'prijem' ? `+${d.castka} Kč` : `-${d.castka} Kč`}
                        </strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      ) : null}

      {zalozka === 'vyhlaska' ? (
        <section className="panel-bily" aria-labelledby="sazebnik-nadpis">
          <h2 id="sazebnik-nadpis" style={{ marginTop: 0 }}>
            Platný sazebník místních poplatků (OZV č. 1/2026)
          </h2>
          <p className="vedlejsi" style={{ marginBottom: 16 }}>
            Automatické výpočty předpisů vycházejí ze schválené Obecně závazné vyhlášky obce Javoří Lhota.
          </p>
          <table className="tabulka-admin">
            <thead>
              <tr>
                <th>Druh místního poplatku</th>
                <th>Základní sazba</th>
                <th>Úlevy a osvobození</th>
                <th>Termín splatnosti</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Poplatek za obecní systém odpadového hospodářství</strong></td>
                <td><strong>700 Kč / osoba / rok</strong></td>
                <td>Senioři nad 70 let a děti do 6 let: 350 Kč</td>
                <td>30. června</td>
              </tr>
              <tr>
                <td><strong>Poplatek ze psů</strong></td>
                <td><strong>200 Kč / 1. pes / rok</strong></td>
                <td>Druhý a každý další pes: 400 Kč, důchodci: 100 Kč</td>
                <td>31. května</td>
              </tr>
              <tr>
                <td><strong>Nájem hrobového místa (pohřebiště Javoří Lhota)</strong></td>
                <td><strong>300 Kč / rok (1500 Kč na 5 let)</strong></td>
                <td>Urnové místo: 150 Kč / rok</td>
                <td>Dle smlouvy</td>
              </tr>
              <tr>
                <td><strong>Stočné – obecní kanalizace a ČOV</strong></td>
                <td><strong>1 200 Kč / osoba / rok</strong></td>
                <td>Chataři a rekreační objekty: 1 500 Kč / objekt</td>
                <td> Pololetně (31. 5. a 30. 11.)</td>
              </tr>
            </tbody>
          </table>
        </section>
      ) : null}
    </div>
  )
}
