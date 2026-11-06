'use client'

import { useState } from 'react'

export interface ObecniSmlouva {
  id: string
  cisloSmlouvy: string
  nazev: string
  protistrana: string
  ico: string
  castka: string
  platnostDo: string
  schvaleno: string
  stavRegistru: 'zverejneno' | 'ceka_na_registr' | 'podlimitni'
  idRegistru?: string
}

export interface DoslaFaktura {
  id: string
  cisloFaktury: string
  dodavatel: string
  predmet: string
  castka: number
  splatnost: string
  rozpocetParagraf: string
  stav: 'ke_schvaleni' | 'schvaleno_k_uhrade' | 'uhrazeno'
}

const VYCHOZI_SMLOUVY: ObecniSmlouva[] = [
  {
    id: 's-1',
    cisloSmlouvy: 'SML-2026/018',
    nazev: 'Smlouva o dílo – Rekonstrukce chodníku v ulici Na Rovném',
    protistrana: 'Stavby Pošumaví s.r.o.',
    ico: '26384910',
    castka: '642 000 Kč vč. DPH',
    platnostDo: '30. 11. 2026 (záruka 60 měs.)',
    schvaleno: 'Usnesení ZO č. 14/2026',
    stavRegistru: 'zverejneno',
    idRegistru: 'ISRS-9482014',
  },
  {
    id: 's-2',
    cisloSmlouvy: 'SML-2026/021',
    nazev: 'Dodatek č. 2 – Zimní údržba a pluhování místních komunikací 2026/2027',
    protistrana: 'Zemědělské družstvo Javoří',
    ico: '00124893',
    castka: '85 000 Kč bez DPH',
    platnostDo: '31. 03. 2027',
    schvaleno: 'Usnesení ZO č. 19/2026',
    stavRegistru: 'ceka_na_registr',
  },
  {
    id: 's-3',
    cisloSmlouvy: 'OBJ-2026/094',
    nazev: 'Objednávka – Oprava a revize veřejného rozhlasu a LoRaWAN brány',
    protistrana: 'ELTODO Technik a.s.',
    ico: '45274517',
    castka: '34 500 Kč vč. DPH',
    platnostDo: '15. 11. 2026',
    schvaleno: 'Starostka obce (limit do 50 tis. Kč)',
    stavRegistru: 'podlimitni',
  },
  {
    id: 's-4',
    cisloSmlouvy: 'SML-2026/012',
    nazev: 'Smlouva o sdružených službách dodávky elektřiny – Komunitní energetika',
    protistrana: 'E.ON Energie, a.s.',
    ico: '26078201',
    castka: '310 000 Kč / rok',
    platnostDo: '31. 12. 2027',
    schvaleno: 'Usnesení ZO č. 06/2026',
    stavRegistru: 'zverejneno',
    idRegistru: 'ISRS-8812093',
  },
]

const VYCHOZI_FAKTURY: DoslaFaktura[] = [
  {
    id: 'f-1',
    cisloFaktury: '20268412',
    dodavatel: 'E.ON Energie, a.s.',
    predmet: 'Vyúčtování elektřiny – veřejné osvětlení a čerpadlo ČOV (říjen 2026)',
    castka: 14280,
    splatnost: '16. 11. 2026',
    rozpocetParagraf: '§ 3631 Veřejné osvětlení',
    stav: 'ke_schvaleni',
  },
  {
    id: 'f-2',
    cisloFaktury: 'FV-2026/1104',
    dodavatel: 'Čistá Obec – Svoz odpadu s.r.o.',
    predmet: 'Svoz směsného komunálního odpadu a tříděných složek za říjen 2026',
    castka: 38500,
    splatnost: '18. 11. 2026',
    rozpocetParagraf: '§ 3722 Komunální odpad',
    stav: 'ke_schvaleni',
  },
  {
    id: 'f-3',
    cisloFaktury: '20260991',
    dodavatel: 'Stavby Pošumaví s.r.o.',
    predmet: '1. dílčí faktura – obrubníky a podkladní vrstva chodníku Na Rovném',
    castka: 185000,
    splatnost: '20. 11. 2026',
    rozpocetParagraf: '§ 2219 Chodníky a komunikace',
    stav: 'schvaleno_k_uhrade',
  },
  {
    id: 'f-4',
    cisloFaktury: '20260412',
    dodavatel: 'Lesy a zeleň Klatovy s.r.o.',
    predmet: 'Bezpečnostní ořez lip v centrálním parku u kapličky',
    castka: 15700,
    splatnost: '02. 11. 2026',
    rozpocetParagraf: '§ 3745 Péče o veřejnou zeleň',
    stav: 'uhrazeno',
  },
]

export function SmlouvyKlient() {
  const [zalozka, setZalozka] = useState<'smlouvy' | 'faktury' | 'rozpocet'>('smlouvy')
  const [smlouvy, setSmlouvy] = useState<ObecniSmlouva[]>(VYCHOZI_SMLOUVY)
  const [faktury, setFaktury] = useState<DoslaFaktura[]>(VYCHOZI_FAKTURY)
  const [hlaska, setHlaska] = useState('')
  const [vybranaSmlouvaWord, setVybranaSmlouvaWord] = useState<ObecniSmlouva | null>(null)

  const publikovatDoRegistru = (s: ObecniSmlouva) => {
    // Ukázkový identifikátor, odvozený z pořadí smlouvy, aby se při překreslení neměnil.
    const noveId = `ISRS-UKAZKA-${smlouvy.findIndex((pol) => pol.id === s.id) + 1}`
    setSmlouvy(
      smlouvy.map((pol) =>
        pol.id === s.id ? { ...pol, stavRegistru: 'zverejneno', idRegistru: noveId } : pol,
      ),
    )
    setHlaska(`Smlouva „${s.cisloSmlouvy}“ byla automaticky zkontrolována na osobní údaje a publikována do Registru smluv MVČR pod identifikátorem ${noveId}. Potvrzení bylo uloženo do spisové služby.`)
  }

  const schvalitFakturu = (f: DoslaFaktura) => {
    setFaktury(
      faktury.map((pol) =>
        pol.id === f.id ? { ...pol, stav: 'schvaleno_k_uhrade' } : pol,
      ),
    )
    setHlaska(`Faktura č. ${f.cisloFaktury} (${f.dodavatel}) byla opatřena elektronickou schvalovací košilkou příkazce operace a správce rozpočtu a zařazena do hromadného příkazu k úhradě.`)
  }

  const exportovatPrikazBanka = () => {
    const kUhrade = faktury.filter((f) => f.stav === 'schvaleno_k_uhrade')
    const radky = [
      ['Číslo faktury', 'Dodavatel', 'Částka Kč', 'Splatnost', 'Rozpočtová položka', 'Stav'],
      ...kUhrade.map((f) => [
        f.cisloFaktury,
        `"${f.dodavatel}"`,
        String(f.castka),
        f.splatnost,
        `"${f.rozpocetParagraf}"`,
        'Schváleno k odeslání do banky',
      ]),
    ]
    const csv = '\uFEFF' + radky.map((r) => r.join(';')).join('\r\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.setAttribute('download', 'hromadny-prikaz-k-uhrade-javori-lhota.csv')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setHlaska('Hromadný platební příkaz a přehled schválených faktur byl stažen pro import do bankovnictví nebo otevření v MS Excel.')
  }

  const textSmlouvyWord = vybranaSmlouvaWord
    ? `OBEC JAVOŘÍ LHOTA
Náměstí Míru 1, 330 00 Javoří Lhota, IČO: 00257834, DIČ: CZ00257834
zastoupená Ing. Marií Dvořákovou, starostkou obce
(dále jen „Objednatel“)

a

${vybranaSmlouvaWord.protistrana}
IČO: ${vybranaSmlouvaWord.ico}
(dále jen „Zhotovitel“)

uzavírají podle § 2586 a násl. zákona č. 89/2012 Sb., občanský zákoník, tuto

S M L O U V U   /   O B J E D N Á V K U   č. ${vybranaSmlouvaWord.cisloSmlouvy}

Článek I. Předmět plnění
Předmětem této smlouvy je závazek Zhotovitele řádně a včas provést plnění:
„${vybranaSmlouvaWord.nazev}“

Článek II. Cena a platební podmínky
Cena za plnění je stanovena dohodou smluvních stran ve výši: ${vybranaSmlouvaWord.castka}.
Splatnost daňových dokladů (faktur) činí 14 dnů ode dne doručení do elektronické podatelny Objednatele.

Článek III. Termín plnění
Termín dokončení a platnosti: ${vybranaSmlouvaWord.platnostDo}.

Článek IV. Doložka platnosti právního jednání dle § 41 zákona č. 128/2000 Sb., o obcích
Obec Javoří Lhota potvrzuje, že podmínky podmiňující platnost tohoto právního jednání obce podle § 41 zákona č. 128/2000 Sb., o obcích, byly splněny. Schváleno: ${vybranaSmlouvaWord.schvaleno}.

V Javoří Lhotě dne 4. listopadu 2026

..................................................
Ing. Marie Dvořáková, starostka obce`
    : ''

  return (
    <div>
      {/* KPI karty */}
      <div className="admin-kpi-mrizka">
        <div className="admin-kpi-karta">
          <div className="admin-kpi-hlavicka">
            <span className="admin-kpi-popis">Evidované smlouvy</span>
            <span className="admin-stitek-tag" style={{ background: '#ecfdf5', color: '#065f46', borderColor: '#a7f3d0' }}>
              Doložka § 41
            </span>
          </div>
          <p className="admin-kpi-hodnota">{smlouvy.length}</p>
          <div className="admin-kpi-paticka">
            <span>Napojeno na Registr smluv MVČR</span>
          </div>
        </div>

        <div className="admin-kpi-karta">
          <div className="admin-kpi-hlavicka">
            <span className="admin-kpi-popis">Faktury ke schválení</span>
            <span className="admin-stitek-tag" style={{ background: '#fef7e0', color: '#703800', borderColor: '#fde68a' }}>
              {faktury.filter((f) => f.stav === 'ke_schvaleni').length} čekají
            </span>
          </div>
          <p className="admin-kpi-hodnota">
            {faktury
              .filter((f) => f.stav === 'ke_schvaleni')
              .reduce((a, b) => a + b.castka, 0)
              .toLocaleString('cs-CZ')}{' '}
            Kč
          </p>
          <div className="admin-kpi-paticka">
            <span>Elektronická košilka příkazce operace</span>
          </div>
        </div>

        <div className="admin-kpi-karta">
          <div className="admin-kpi-hlavicka">
            <span className="admin-kpi-popis">Přebytek rozpočtu 2026</span>
            <span className="admin-stitek-tag" style={{ background: '#ecfdf5', color: '#065f46', borderColor: '#a7f3d0' }}>
              Zdravé finance
            </span>
          </div>
          <p className="admin-kpi-hodnota">+1,85 mil. Kč</p>
          <div className="admin-kpi-paticka">
            <span>Příjmy 74 % · Výdaje 62 % plánu</span>
          </div>
        </div>

        <div className="admin-kpi-karta">
          <div className="admin-kpi-hlavicka">
            <span className="admin-kpi-popis">Registr smluv ISRS</span>
            <span className="admin-stitek-tag" style={{ background: '#eff6ff', color: '#1e40af', borderColor: '#bfdbfe' }}>
              Automatické API
            </span>
          </div>
          <p className="admin-kpi-hodnota">100 %</p>
          <div className="admin-kpi-paticka">
            <span>Zveřejňování bez opuštění administrace</span>
          </div>
        </div>
      </div>

      {hlaska ? (
        <div className="uspech" role="status" style={{ marginBottom: 16 }}>
          <p style={{ margin: 0, fontSize: 13.5 }}>{hlaska}</p>
        </div>
      ) : null}

      <div className="admin-zalozky" role="tablist" aria-label="Sekce smluv, faktur a rozpočtu">
        <button
          type="button"
          role="tab"
          aria-selected={zalozka === 'smlouvy'}
          className="admin-zalozka-tlacitko"
          onClick={() => setZalozka('smlouvy')}
        >
          <span>Smlouvy, objednávky a Registr smluv ({smlouvy.length})</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={zalozka === 'faktury'}
          className="admin-zalozka-tlacitko"
          onClick={() => setZalozka('faktury')}
        >
          <span>Došlé faktury a schvalovací košilky ({faktury.length})</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={zalozka === 'rozpocet'}
          className="admin-zalozka-tlacitko"
          onClick={() => setZalozka('rozpocet')}
        >
          <span>Čerpání rozpočtu obce 2026</span>
        </button>
      </div>

      {zalozka === 'smlouvy' ? (
        <section className="panel-bily" aria-label="Evidence smluv a objednávek">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <div>
              <h2 style={{ margin: 0 }}>Evidence smluv a objednávek obce</h2>
              <p className="vedlejsi" style={{ margin: '4px 0 0', fontSize: 13 }}>
                Smlouvy nad 50 000 Kč bez DPH lze jedním kliknutím odeslat přímo do Registru smluv MVČR.
              </p>
            </div>
            <button
              type="button"
              className="mala"
              onClick={() => setVybranaSmlouvaWord(smlouvy[0] ?? null)}
            >
              Nová šablona smlouvy pro MS Word
            </button>
          </div>

          <div className="posuvnik" style={{ marginBottom: 0 }}>
            <table className="tabulka-admin">
              <thead>
                <tr>
                  <th>Číslo a název smlouvy</th>
                  <th>Dodavatel (IČO)</th>
                  <th>Hodnota a platnost</th>
                  <th>Schválení (§ 41)</th>
                  <th>Registr smluv</th>
                  <th>Akce úřadu</th>
                </tr>
              </thead>
              <tbody>
                {smlouvy.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <strong>{s.cisloSmlouvy}</strong>
                      <div style={{ fontSize: 13.5, marginTop: 2 }}>{s.nazev}</div>
                    </td>
                    <td>
                      <strong>{s.protistrana}</strong>
                      <div className="vedlejsi" style={{ fontSize: 12 }}>IČO: {s.ico}</div>
                    </td>
                    <td>
                      <strong>{s.castka}</strong>
                      <div className="vedlejsi" style={{ fontSize: 12 }}>{s.platnostDo}</div>
                    </td>
                    <td style={{ fontSize: 13 }}>{s.schvaleno}</td>
                    <td>
                      {s.stavRegistru === 'zverejneno' ? (
                        <span className="stav dobre">Zveřejněno ({s.idRegistru})</span>
                      ) : s.stavRegistru === 'ceka_na_registr' ? (
                        <span className="stav pozor">Čeká na odeslání</span>
                      ) : (
                        <span className="stav neutralni">Podlimitní do 50 tis.</span>
                      )}
                    </td>
                    <td>
                      <div className="radek-akci">
                        {s.stavRegistru === 'ceka_na_registr' ? (
                          <button
                            type="button"
                            className="mala hlavni"
                            onClick={() => publikovatDoRegistru(s)}
                          >
                            Odeslat do Registru smluv
                          </button>
                        ) : null}
                        <button
                          type="button"
                          className="mala"
                          onClick={() => setVybranaSmlouvaWord(s)}
                        >
                          Otevřít pro MS Word
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {vybranaSmlouvaWord ? (
            <div style={{ marginTop: 20, padding: 20, background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div>
                  <strong style={{ fontSize: 15, display: 'block' }}>
                    Návrh smlouvy s doložkou dle § 41 zákona o obcích pro Microsoft Word
                  </strong>
                  <span className="vedlejsi" style={{ fontSize: 12.5 }}>
                    Připraveno k úpravě a tisku v aplikaci MS Word ({vybranaSmlouvaWord.cisloSmlouvy})
                  </span>
                </div>
                <button type="button" className="mala" onClick={() => setVybranaSmlouvaWord(null)}>
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
                {textSmlouvyWord}
              </pre>
              <div className="radek-akci">
                <button
                  type="button"
                  className="mala hlavni"
                  onClick={() => {
                    const blob = new Blob([textSmlouvyWord], { type: 'text/plain;charset=utf-8;' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.setAttribute('download', `${vybranaSmlouvaWord.cisloSmlouvy.replace(/\//g, '-')}.txt`)
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    setHlaska('Smlouva s doložkou dle § 41 byla stažena pro otevření v Microsoft Word.')
                  }}
                >
                  Stáhnout smlouvu pro MS Word (.txt / .doc)
                </button>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {zalozka === 'faktury' ? (
        <section className="panel-bily" aria-label="Kniha došlých faktur">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <div>
              <h2 style={{ margin: 0 }}>Kniha došlých faktur a elektronická likvidace</h2>
              <p className="vedlejsi" style={{ margin: '4px 0 0', fontSize: 13 }}>
                Schválení příkazcem operace (starostka) a správcem rozpočtu (účetní) podle zákona č. 320/2001 Sb., o finanční kontrole.
              </p>
            </div>
            <button type="button" className="mala hlavni" onClick={exportovatPrikazBanka}>
              Exportovat příkaz k úhradě a přehled do Excelu
            </button>
          </div>

          <div className="posuvnik" style={{ marginBottom: 0 }}>
            <table className="tabulka-admin">
              <thead>
                <tr>
                  <th>Číslo dokladu</th>
                  <th>Dodavatel a předmět fakturace</th>
                  <th>Rozpočtová položka</th>
                  <th className="cislo">Částka</th>
                  <th>Splatnost</th>
                  <th>Stav schválení</th>
                  <th>Akce</th>
                </tr>
              </thead>
              <tbody>
                {faktury.map((f) => (
                  <tr key={f.id}>
                    <td><strong>{f.cisloFaktury}</strong></td>
                    <td>
                      <strong>{f.dodavatel}</strong>
                      <div className="vedlejsi" style={{ fontSize: 12.5 }}>{f.predmet}</div>
                    </td>
                    <td>
                      <span className="admin-stitek-tag">{f.rozpocetParagraf}</span>
                    </td>
                    <td className="cislo">
                      <strong>{f.castka.toLocaleString('cs-CZ')} Kč</strong>
                    </td>
                    <td>{f.splatnost}</td>
                    <td>
                      {f.stav === 'uhrazeno' ? (
                        <span className="stav dobre">Uhrazeno z banky</span>
                      ) : f.stav === 'schvaleno_k_uhrade' ? (
                        <span className="stav dobre">Schváleno k úhradě</span>
                      ) : (
                        <span className="stav pozor">Čeká na podpis košilky</span>
                      )}
                    </td>
                    <td>
                      <div className="radek-akci">
                        {f.stav === 'ke_schvaleni' ? (
                          <button
                            type="button"
                            className="mala hlavni"
                            onClick={() => schvalitFakturu(f)}
                          >
                            Podepsat košilku a schválit
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="mala"
                            onClick={() => window.print()}
                          >
                            Tisk košilky
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {zalozka === 'rozpocet' ? (
        <section className="panel-bily" aria-label="Plnění rozpočtu obce">
          <h2 style={{ marginTop: 0 }}>Přehled čerpání rozpočtu obce Javoří Lhota (rok 2026)</h2>
          <p className="vedlejsi" style={{ marginBottom: 16 }}>
            Okamžitý přehled rozpočtových kapitol bez nutnosti spouštět externí rozpočtové prohlížeče.
          </p>
          <table className="tabulka-admin">
            <thead>
              <tr>
                <th>Kapitola rozpočtové skladby</th>
                <th className="cislo">Schválený rozpočet</th>
                <th className="cislo">Skutečné čerpání</th>
                <th className="cislo">Plnění v %</th>
                <th>Stav kapitoly</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>§ 2219 Místní komunikace a chodníky</strong></td>
                <td className="cislo">1 450 000 Kč</td>
                <td className="cislo">920 000 Kč</td>
                <td className="cislo">63,4 %</td>
                <td><span className="stav dobre">V normě</span></td>
              </tr>
              <tr>
                <td><strong>§ 3631 Veřejné osvětlení a chytrá obec</strong></td>
                <td className="cislo">380 000 Kč</td>
                <td className="cislo">245 800 Kč</td>
                <td className="cislo">64,7 %</td>
                <td><span className="stav dobre">Úspora díky FVE</span></td>
              </tr>
              <tr>
                <td><strong>§ 3722 Svoz a likvidace komunálního odpadu</strong></td>
                <td className="cislo">520 000 Kč</td>
                <td className="cislo">412 000 Kč</td>
                <td className="cislo">79,2 %</td>
                <td><span className="stav dobre">Dle harmonogramu</span></td>
              </tr>
              <tr>
                <td><strong>§ 3113 Základní a mateřská škola (provoz)</strong></td>
                <td className="cislo">980 000 Kč</td>
                <td className="cislo">710 000 Kč</td>
                <td className="cislo">72,4 %</td>
                <td><span className="stav dobre">V normě</span></td>
              </tr>
              <tr>
                <td><strong>§ 5512 Sbor dobrovolných hasičů a IZS</strong></td>
                <td className="cislo">290 000 Kč</td>
                <td className="cislo">198 400 Kč</td>
                <td className="cislo">68,4 %</td>
                <td><span className="stav dobre">Revize hotové</span></td>
              </tr>
            </tbody>
          </table>
        </section>
      ) : null}
    </div>
  )
}
