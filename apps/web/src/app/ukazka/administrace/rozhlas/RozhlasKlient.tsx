'use client'

import { useState } from 'react'

export interface OdeslaneHlaseni {
  id: string
  titulek: string
  text: string
  datum: string
  kanaly: string[]
  dosah: string
}

export interface AnketaObce {
  id: string
  otazka: string
  terminDo: string
  celkemHlasu: number
  moznosti: { nazev: string; hlasy: number }[]
}

const VYCHOZI_HLASENI: OdeslaneHlaseni[] = [
  {
    id: 'r-1',
    titulek: 'Svoz nebezpečného odpadu a elektrospotřebičů v sobotu 21. 11.',
    text: 'Upozorňujeme občany, že v sobotu 21. listopadu od 8:00 do 12:00 proběhne v areálu obecního dvora podzimní svoz nebezpečného odpadu, starých barev, pneumatik a elektrospotřebičů.',
    datum: 'Dnes, 10:00',
    kanaly: ['Obecní rozhlas (14 hlásičů)', 'SMS brána (384 čísel)', 'Web obce'],
    dosah: '384 domácností',
  },
  {
    id: 'r-2',
    titulek: 'Krátkodobá odstávka pitné vody v horní části obce',
    text: 'Z důvodu výměny hlavního uzávěru vodovodu u kapličky nepoteče ve středu 6. listopadu od 9:00 do 12:00 pitná voda v ulicích Na Rovném a U Hřiště. Náhradní cisterna bude přistavena.',
    datum: '2. 11. 2026',
    kanaly: ['SMS brána (ulice Na Rovném)', 'E-mailový zpravodaj', 'Web obce'],
    dosah: '92 domácností',
  },
  {
    id: 'r-3',
    titulek: 'Prodej čerstvých ryb a drůbeže na návsi',
    text: 'Rybářství Klatovy bude v pátek od 10:00 do 11:30 u obecního úřadu prodávat živé kapry, pstruhy a čerstvou chlazenou drůbež.',
    datum: '30. 10. 2026',
    kanaly: ['Obecní rozhlas (14 hlásičů)', 'Web obce'],
    dosah: 'Celá obec',
  },
]

const VYCHOZI_ANKETY: AnketaObce[] = [
  {
    id: 'a-1',
    otazka: 'Který projekt má obec zrealizovat z participativního rozpočtu 2027 (250 000 Kč)?',
    terminDo: '30. 11. 2026',
    celkemHlasu: 184,
    moznosti: [
      { nazev: 'Obnova herních prvků a altánu v parku u školy', hlasy: 89 },
      { nazev: 'Pítko, lavičky a solární nabíječka u cyklostezky', hlasy: 57 },
      { nazev: 'Venkovní posilovací stroje (workout) u hřiště', hlasy: 38 },
    ],
  },
  {
    id: 'a-2',
    otazka: 'Jaký čas veřejného zasedání zastupitelstva Vám nejvíce vyhovuje?',
    terminDo: '15. 12. 2026',
    celkemHlasu: 112,
    moznosti: [
      { nazev: 'Pondělí od 18:00 hodin (stávající termín)', hlasy: 68 },
      { nazev: 'Středa od 18:30 hodin', hlasy: 31 },
      { nazev: 'Čtvrtek od 17:30 hodin', hlasy: 13 },
    ],
  },
]

export function RozhlasKlient() {
  const [zalozka, setZalozka] = useState<'rozesilka' | 'zpravodaj' | 'ankety'>('rozesilka')
  const [hlaseni, setHlaseni] = useState<OdeslaneHlaseni[]>(VYCHOZI_HLASENI)
  const [ankety, setAnkety] = useState<AnketaObce[]>(VYCHOZI_ANKETY)
  const [hlaska, setHlaska] = useState('')

  // Nové hlášení
  const [titulek, setTitulek] = useState('')
  const [text, setText] = useState('')
  const [kanalRozhlas, setKanalRozhlas] = useState(true)
  const [kanalSms, setKanalSms] = useState(true)
  const [kanalEmail, setKanalEmail] = useState(true)
  const [kanalWeb, setKanalWeb] = useState(true)

  // Nová anketa
  const [novaOtazka, setNovaOtazka] = useState('')
  const [moznost1, setMoznost1] = useState('')
  const [moznost2, setMoznost2] = useState('')

  const odeslatHlaseni = (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulek || !text) {
      setHlaska('Vyplňte nadpis i samotný text hlášení pro občany.')
      return
    }
    const vybraneKanaly: string[] = []
    if (kanalRozhlas) vybraneKanaly.push('Obecní rozhlas (14 hlásičů)')
    if (kanalSms) vybraneKanaly.push('SMS brána (384 čísel)')
    if (kanalEmail) vybraneKanaly.push('E-mailový zpravodaj')
    if (kanalWeb) vybraneKanaly.push('Web obce')

    const nove: OdeslaneHlaseni = {
      id: `r-${Date.now()}`,
      titulek,
      text,
      datum: 'Právě teď',
      kanaly: vybraneKanaly,
      dosah: '384 domácností',
    }
    setHlaseni([nove, ...hlaseni])
    setTitulek('')
    setText('')
    setHlaska(`Hlášení „${nove.titulek}“ bylo okamžitě rozesláno přes zvolené kanály (${vybraneKanaly.join(', ')}).`)
  }

  const vytvoritAnketu = (e: React.FormEvent) => {
    e.preventDefault()
    if (!novaOtazka || !moznost1 || !moznost2) return
    const nova: AnketaObce = {
      id: `a-${Date.now()}`,
      otazka: novaOtazka,
      terminDo: '31. 12. 2026',
      celkemHlasu: 1,
      moznosti: [
        { nazev: moznost1, hlasy: 1 },
        { nazev: moznost2, hlasy: 0 },
      ],
    }
    setAnkety([nova, ...ankety])
    setNovaOtazka('')
    setMoznost1('')
    setMoznost2('')
    setHlaska('Nová obecní anketa byla zveřejněna pro hlasování občanů.')
  }

  const rukopisZpravodaje = `JAVOŘANSKÝ ZPRAVODAJ – LISTOPAD / PROSINEC 2026
Čtvrtletník Obecního úřadu Javoří Lhota (Ročník XVIII., číslo 4/2026)
Náklad: 320 výtisků do všech schránek v obci · Neprodejné

======================================================================
1. ÚVODNÍ SLOVO STAROSTKY OBCE
======================================================================
Vážení spoluobčané, milí sousedé,
přinášíme Vám podzimní vydání našeho obecního zpravodaje. V uplynulých týdnech jsme úspěšně zahájili opravu chodníku v ulici Na Rovném a uvedli do plného provozu nová hladinová a meteorologická čidla na Javornickém potoce, která můžete sledovat přímo na webu obce.

Ing. Marie Dvořáková, starostka obce

======================================================================
2. DŮLEŽITÉ OZNÁMENÍ Z OBECNÍHO ÚŘADU A ROZHLASU
======================================================================
${hlaseni.map((h, i) => `${i + 1}) ${h.titulek} (${h.datum})\n   ${h.text}`).join('\n\n')}

======================================================================
3. KALENDÁŘ KULTURNÍCH A SPOLEČENSKÝCH AKCÍ
======================================================================
• Pondělí 16. 11. v 18:00 – Veřejné zasedání zastupitelstva obce (zasedací síň OÚ)
• Sobota 21. 11. od 8:00 – Podzimní svoz nebezpečného odpadu a větví (obecní dvůr)
• Neděle 29. 11. v 17:00 – Slavnostní rozsvícení vánočního stromu na návsi a zpívání dětí ze ZŠ

======================================================================
4. SPOLEČENSKÁ KRONIKA A JUBILEA
======================================================================
V měsíci listopadu oslaví významné životní jubileum naši spoluobčané:
• paní Božena Veselá (č.p. 7) – 80 let
• pan František Kříž (č.p. 31) – 75 let
Všem oslavencům přejeme pevné zdraví, spokojenost a pohodu.

Vydavatel: Obec Javoří Lhota, Náměstí Míru 1, IČO 00257834.`

  return (
    <div>
      <div className="admin-kpi-mrizka">
        <div className="admin-kpi-karta">
          <div className="admin-kpi-hlavicka">
            <span className="admin-kpi-popis">Odběratelé SMS a e-mailů</span>
            <span className="admin-stitek-tag" style={{ background: '#ecfdf5', color: '#065f46', borderColor: '#a7f3d0' }}>
              78 % domácností
            </span>
          </div>
          <p className="admin-kpi-hodnota">384</p>
          <div className="admin-kpi-paticka">
            <span>Integrovaná obecní SMS a e-mail brána</span>
          </div>
        </div>

        <div className="admin-kpi-karta">
          <div className="admin-kpi-hlavicka">
            <span className="admin-kpi-popis">Bezdrátový rozhlas</span>
            <span className="admin-stitek-tag" style={{ background: '#ecfdf5', color: '#065f46', borderColor: '#a7f3d0' }}>
              Online vysílání
            </span>
          </div>
          <p className="admin-kpi-hodnota">14 hlásičů</p>
          <div className="admin-kpi-paticka">
            <span>Převod psaného textu na hlas do tlampačů</span>
          </div>
        </div>

        <div className="admin-kpi-karta">
          <div className="admin-kpi-hlavicka">
            <span className="admin-kpi-popis">Tištěný zpravodaj</span>
            <span className="admin-stitek-tag">Číslo 4/2026</span>
          </div>
          <p className="admin-kpi-hodnota">320 ks</p>
          <div className="admin-kpi-paticka">
            <span>Automatický export podkladu do MS Word</span>
          </div>
        </div>

        <div className="admin-kpi-karta">
          <div className="admin-kpi-hlavicka">
            <span className="admin-kpi-popis">Obecní ankety</span>
            <span className="admin-stitek-tag" style={{ background: '#eff6ff', color: '#1e40af', borderColor: '#bfdbfe' }}>
              {ankety.length} aktivní
            </span>
          </div>
          <p className="admin-kpi-hodnota">
            {ankety.reduce((a, b) => a + b.celkemHlasu, 0)} hlasů
          </p>
          <div className="admin-kpi-paticka">
            <span>Participativní rozpočet a dotazníky</span>
          </div>
        </div>
      </div>

      {hlaska ? (
        <div className="uspech" role="status" style={{ marginBottom: 16 }}>
          <p style={{ margin: 0, fontSize: 13.5 }}>{hlaska}</p>
        </div>
      ) : null}

      <div className="admin-zalozky" role="tablist" aria-label="Sekce rozhlasu, SMS a zpravodaje">
        <button
          type="button"
          role="tab"
          aria-selected={zalozka === 'rozesilka'}
          className="admin-zalozka-tlacitko"
          onClick={() => setZalozka('rozesilka')}
        >
          <span>Rozhlas, SMS brána a hromadné zprávy</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={zalozka === 'zpravodaj'}
          className="admin-zalozka-tlacitko"
          onClick={() => setZalozka('zpravodaj')}
        >
          <span>Sestavení tištěného zpravodaje pro MS Word</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={zalozka === 'ankety'}
          className="admin-zalozka-tlacitko"
          onClick={() => setZalozka('ankety')}
        >
          <span>Obecní ankety a participativní rozpočet ({ankety.length})</span>
        </button>
      </div>

      {zalozka === 'rozesilka' ? (
        <div className="admin-prehled-sloupce">
          <section className="panel-bily" aria-labelledby="nova-rozesilka-nadpis">
            <h2 id="nova-rozesilka-nadpis" style={{ marginTop: 0 }}>
              Vyslat nové hlášení občanům (vše v jednom)
            </h2>
            <p className="vedlejsi" style={{ fontSize: 13, marginBottom: 14 }}>
              Napište zprávu jednou a odešlete ji současně do bezdrátového rozhlasu, SMS brány i na web obce.
            </p>

            <div style={{ marginBottom: 14 }}>
              <span className="vedlejsi" style={{ display: 'block', fontSize: 12, marginBottom: 6 }}>
                Rychlé předlohy hlášení:
              </span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="admin-stitek-tag"
                  style={{ cursor: 'pointer', background: '#ffffff', color: 'var(--ink)' }}
                  onClick={() => {
                    setTitulek('Krátkodobá odstávka elektrické energie / vody')
                    setText('Upozorňujeme občany, že zítra v době od 8:00 do 13:00 proběhne plánovaná odstávka v horní části obce z důvodu údržby sítě.')
                  }}
                >
                  Odstávka vody / elektřiny
                </button>
                <button
                  type="button"
                  className="admin-stitek-tag"
                  style={{ cursor: 'pointer', background: '#ffffff', color: 'var(--ink)' }}
                  onClick={() => {
                    setTitulek('Pozvánka na veřejné zasedání zastupitelstva')
                    setText('Obecní úřad Javoří Lhota zve všechny občany na veřejné zasedání zastupitelstva obce, které se koná v pondělí od 18:00 v zasedací síni úřadu.')
                  }}
                >
                  Pozvánka na zastupitelstvo
                </button>
              </div>
            </div>

            <form onSubmit={odeslatHlaseni} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label htmlFor="rozhlas-titulek">Předmět / Nadpis hlášení</label>
                <input
                  id="rozhlas-titulek"
                  type="text"
                  placeholder="např. Mimořádný svoz bioodpadu..."
                  value={titulek}
                  onChange={(e) => setTitulek(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="rozhlas-text">Plný text zprávy (pro SMS i hlasové přečtení v rozhlase)</label>
                <textarea
                  id="rozhlas-text"
                  rows={4}
                  placeholder="Zadejte srozumitelný text pro občany..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
              </div>

              <fieldset style={{ border: '1px solid var(--line)', borderRadius: 8, padding: 12, margin: 0 }}>
                <legend style={{ fontSize: 13, fontWeight: 600, padding: '0 6px' }}>
                  Cílové kanály odeslání
                </legend>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0, fontWeight: 400 }}>
                    <input type="checkbox" checked={kanalRozhlas} onChange={(e) => setKanalRozhlas(e.target.checked)} />
                    <span>Bezdrátový rozhlas (14 hlásičů)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0, fontWeight: 400 }}>
                    <input type="checkbox" checked={kanalSms} onChange={(e) => setKanalSms(e.target.checked)} />
                    <span>SMS brána (384 občanů)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0, fontWeight: 400 }}>
                    <input type="checkbox" checked={kanalEmail} onChange={(e) => setKanalEmail(e.target.checked)} />
                    <span>E-mailový newsletter</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0, fontWeight: 400 }}>
                    <input type="checkbox" checked={kanalWeb} onChange={(e) => setKanalWeb(e.target.checked)} />
                    <span>Publikovat na web obce</span>
                  </label>
                </div>
              </fieldset>

              <div>
                <button type="submit" className="mala hlavni">
                  Odeslat hlášení do vybraných kanálů
                </button>
              </div>
            </form>
          </section>

          <section className="panel-bily" aria-labelledby="historie-rozhlasu-nadpis">
            <h2 id="historie-rozhlasu-nadpis" style={{ marginTop: 0 }}>
              Archiv odvysílaných hlášení a SMS
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {hlaseni.map((h) => (
                <li key={h.id} style={{ padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                    <strong style={{ fontSize: 14 }}>{h.titulek}</strong>
                    <span className="vedlejsi" style={{ fontSize: 12 }}>{h.datum}</span>
                  </div>
                  <p style={{ margin: '6px 0 8px', fontSize: 13.5, color: 'var(--ink)' }}>{h.text}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {h.kanaly.map((k, idx) => (
                      <span key={idx} className="admin-stitek-tag" style={{ fontSize: 11.5 }}>
                        {k}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : null}

      {zalozka === 'zpravodaj' ? (
        <section className="panel-bily" aria-labelledby="zpravodaj-nadpis">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
            <div>
              <h2 id="zpravodaj-nadpis" style={{ margin: 0 }}>
                Automaticky sestavený rukopis Obecního zpravodaje pro MS Word
              </h2>
              <p className="vedlejsi" style={{ margin: '4px 0 0', fontSize: 13 }}>
                Systém automaticky spojil úvodní slovo starostky, odvysílaná hlášení rozhlasu, kalendář akcí a společenskou kroniku do jednoho dokumentu pro tisk.
              </p>
            </div>
            <div className="radek-akci">
              <button
                type="button"
                className="mala hlavni"
                onClick={() => {
                  const blob = new Blob([rukopisZpravodaje], { type: 'text/plain;charset=utf-8;' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.setAttribute('download', 'javoransky-zpravodaj-4-2026.txt')
                  document.body.appendChild(a)
                  a.click()
                  document.body.removeChild(a)
                  setHlaska('Rukopis Javořanského zpravodaje byl stažen pro otevření a úpravu v aplikaci Microsoft Word.')
                }}
              >
                Stáhnout rukopis zpravodaje pro MS Word (.txt / .doc)
              </button>
              <button type="button" className="mala" onClick={() => window.print()}>
                Vytisknout náhled zpravodaje
              </button>
            </div>
          </div>

          <pre
            style={{
              background: '#f8fafc',
              border: '1px solid var(--line)',
              borderRadius: 8,
              padding: 18,
              fontSize: 13,
              lineHeight: 1.55,
              whiteSpace: 'pre-wrap',
              margin: 0,
            }}
          >
            {rukopisZpravodaje}
          </pre>
        </section>
      ) : null}

      {zalozka === 'ankety' ? (
        <div className="admin-prehled-sloupce">
          <section className="panel-bily" aria-labelledby="seznam-anket-nadpis">
            <h2 id="seznam-anket-nadpis" style={{ marginTop: 0 }}>
              Probíhající obecní ankety a hlasování
            </h2>
            {ankety.map((a) => (
              <div key={a.id} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <strong style={{ fontSize: 14.5 }}>{a.otazka}</strong>
                  <span className="admin-stitek-tag">Do {a.terminDo} · {a.celkemHlasu} hlasů</span>
                </div>
                {a.moznosti.map((m, idx) => {
                  const proc = a.celkemHlasu > 0 ? Math.round((m.hlasy / a.celkemHlasu) * 100) : 0
                  return (
                    <div key={idx} style={{ marginBottom: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 3 }}>
                        <span>{m.nazev}</span>
                        <strong>{m.hlasy} hlasů ({proc} %)</strong>
                      </div>
                      <div style={{ background: '#f1f5f9', height: 8, borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: `${proc}%`, height: '100%', background: 'var(--primary)' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </section>

          <section className="panel-bily" aria-labelledby="nova-anketa-nadpis">
            <h2 id="nova-anketa-nadpis" style={{ marginTop: 0 }}>
              Vypsat novou anketu pro občany
            </h2>
            <form onSubmit={vytvoritAnketu} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label htmlFor="anketa-otazka">Otázka ankety</label>
                <input
                  id="anketa-otazka"
                  type="text"
                  placeholder="např. Souhlasíte s rozšířením veřejného osvětlení k rybníku?"
                  value={novaOtazka}
                  onChange={(e) => setNovaOtazka(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="anketa-m1">Možnost 1</label>
                <input
                  id="anketa-m1"
                  type="text"
                  placeholder="Ano, prioritně v roce 2027"
                  value={moznost1}
                  onChange={(e) => setMoznost1(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="anketa-m2">Možnost 2</label>
                <input
                  id="anketa-m2"
                  type="text"
                  placeholder="Ne, upřednostnit opravu místní cesty"
                  value={moznost2}
                  onChange={(e) => setMoznost2(e.target.value)}
                  required
                />
              </div>
              <div>
                <button type="submit" className="mala hlavni">
                  Zveřejnit anketu na webu obce
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </div>
  )
}
