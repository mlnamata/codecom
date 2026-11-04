'use client'

import { useState } from 'react'

export interface ZapisOvereni {
  id: string
  poradoveCislo: string
  typ: 'legalizace' | 'vidimace'
  datum: string
  osoba: string
  dokladTotoznosti: string
  popisListiny: string
  poplatek: number
}

export interface TechnickaRevize {
  id: string
  objekt: string
  druhRevize: string
  posledniKontrola: string
  pristiTermin: string
  technik: string
  stav: 'platna' | 'blizi_se'
}

const VYCHOZI_OVERENI: ZapisOvereni[] = [
  {
    id: 'ov-1',
    poradoveCislo: 'OV-2026/086',
    typ: 'legalizace',
    datum: 'Dnes, 09:15',
    osoba: 'František Kříž, nar. 1951, Javoří Lhota č.p. 31',
    dokladTotoznosti: 'OP č. 214908312',
    popisListiny: 'Darovací smlouva na nemovitou věc (2× ověření podpisu)',
    poplatek: 100,
  },
  {
    id: 'ov-2',
    poradoveCislo: 'OV-2026/085',
    typ: 'vidimace',
    datum: '3. 11. 2026',
    osoba: 'Mgr. Alena Procházková, nar. 1984, Javoří Lhota č.p. 64',
    dokladTotoznosti: 'OP č. 209441820',
    popisListiny: 'Vysokoškolský diplom – ověření shody kopie (2 strany)',
    poplatek: 60,
  },
  {
    id: 'ov-3',
    poradoveCislo: 'OV-2026/084',
    typ: 'legalizace',
    datum: '1. 11. 2026',
    osoba: 'Ing. Jan Novák, nar. 1978, Javoří Lhota č.p. 45',
    dokladTotoznosti: 'OP č. 211093415',
    popisListiny: 'Plná moc k zastupování ve stavebním řízení (1× podpis)',
    poplatek: 50,
  },
]

const VYCHOZI_REVIZE: TechnickaRevize[] = [
  {
    id: 'rev-1',
    objekt: 'Hasičská zbrojnice a obecní úřad',
    druhRevize: 'Kontrola AED defibrilátoru, baterie a elektrod',
    posledniKontrola: '02. 11. 2026',
    pristiTermin: '02. 12. 2026',
    technik: 'Karel Vondráček (velitel SDH)',
    stav: 'platna',
  },
  {
    id: 'rev-2',
    objekt: 'Základní a mateřská škola Javoří Lhota',
    druhRevize: 'Revize plynové kotelny a spalinových cest (komíny)',
    posledniKontrola: '15. 09. 2026',
    pristiTermin: '15. 09. 2027',
    technik: 'Ing. Milan Bárta – revizní technik',
    stav: 'platna',
  },
  {
    id: 'rev-3',
    objekt: 'Kulturní dům a obecní sál',
    druhRevize: 'Kontrola přenosných hasicích přístrojů a nouzového osvětlení',
    posledniKontrola: '20. 11. 2025',
    pristiTermin: '20. 11. 2026',
    technik: 'PO Servis Klatovy s.r.o.',
    stav: 'blizi_se',
  },
  {
    id: 'rev-4',
    objekt: 'Dětské hřiště v parku u školy',
    druhRevize: 'Roční hlavní technická kontrola herních prvků dle ČSN EN 1176',
    posledniKontrola: '10. 04. 2026',
    pristiTermin: '10. 04. 2027',
    technik: 'Bezpečná hřiště ČR s.r.o.',
    stav: 'platna',
  },
]

export function PrepazkaKlient() {
  const [zalozka, setZalozka] = useState<'overovani' | 'revize' | 'jubilea'>('overovani')
  const [overeni, setOvereni] = useState<ZapisOvereni[]>(VYCHOZI_OVERENI)
  const [revize, setRevize] = useState<TechnickaRevize[]>(VYCHOZI_REVIZE)
  const [hlaska, setHlaska] = useState('')
  const [vybranaDolozka, setVybranaDolozka] = useState<ZapisOvereni | null>(null)
  const [vybraneJubileum, setVybraneJubileum] = useState<{ jmeno: string; vek: string; adresa: string } | null>(null)

  // Formulář nového ověření
  const [typUkonu, setTypUkonu] = useState<'legalizace' | 'vidimace'>('legalizace')
  const [pocetJednotek, setPocetJednotek] = useState(1)
  const [jmenoZadatele, setJmenoZadatele] = useState('')
  const [cisloOp, setCisloOp] = useState('')
  const [listina, setListina] = useState('')

  const sazba = typUkonu === 'legalizace' ? 50 : 30
  const vypoctenyPoplatek = sazba * pocetJednotek

  const zapsatOvereni = (e: React.FormEvent) => {
    e.preventDefault()
    if (!jmenoZadatele || !cisloOp || !listina) return
    const nove: ZapisOvereni = {
      id: `ov-${Date.now()}`,
      poradoveCislo: `OV-2026/0${87 + overeni.length}`,
      typ: typUkonu,
      datum: 'Právě teď',
      osoba: jmenoZadatele,
      dokladTotoznosti: cisloOp,
      popisListiny: `${listina} (${pocetJednotek}×)`,
      poplatek: vypoctenyPoplatek,
    }
    setOvereni([nove, ...overeni])
    setVybranaDolozka(nove)
    setJmenoZadatele('')
    setCisloOp('')
    setListina('')
    setHlaska(`Úkon ${nove.poradoveCislo} byl zapsán do ověřovací knihy. Správní poplatek ${vypoctenyPoplatek} Kč byl připraven k tisku doložky.`)
  }

  const potvrditRevizi = (r: TechnickaRevize) => {
    setRevize(
      revize.map((pol) =>
        pol.id === r.id
          ? { ...pol, posledniKontrola: '04. 11. 2026', pristiTermin: '04. 11. 2027', stav: 'platna' }
          : pol,
      ),
    )
    setHlaska(`Revize „${r.druhRevize}“ na objektu ${r.objekt} byla označena jako splněná a termín prodloužen o 12 měsíců.`)
  }

  const textDolozkyWord = vybranaDolozka
    ? `OVĚŘOVACÍ DOLOŽKA (${vybranaDolozka.typ === 'legalizace' ? 'LEGALIZACE – OVĚŘENÍ PODPISU' : 'VIDIMACE – OVĚŘENÍ SHODY KOPIE'})
podle zákona č. 21/2006 Sb., o ověřování shody opisu nebo kopie s listinou a o ověřování pravosti podpisu

Pořadové číslo ověřovací knihy: ${vybranaDolozka.poradoveCislo}
Úřad: Obecní úřad Javoří Lhota

Potvrzuji, že:
Žadatel / podepisující osoba: ${vybranaDolozka.osoba}
Průkaz totožnosti: ${vybranaDolozka.dokladTotoznosti}
Označení listiny: ${vybranaDolozka.popisListiny}

${
  vybranaDolozka.typ === 'legalizace'
    ? 'tuto listinu před ověřující osobou vlastnoručně podepsal(a), případně podpis na listině uznal(a) za vlastní.'
    : 'tento opis / kopie se doslovně shoduje s předloženou prvopisnou listinou.'
}

Správní poplatek uhrazen v hotovosti dle pol. 4 / pol. 5 zákona č. 634/2004 Sb.: ${vybranaDolozka.poplatek} Kč.

V Javoří Lhotě dne 4. listopadu 2026
Ověřující úřední osoba: Ing. Marie Dvořáková
(Otisk kulatého úředního razítka a podpis)`
    : ''

  const textBlahopraniWord = vybraneJubileum
    ? `OBEC JAVOŘÍ LHOTA
Starostka obce a Sbor pro občanské záležitosti (SPOZ)
Náměstí Míru 1, 330 00 Javoří Lhota

Vážená paní / Vážený pane
${vybraneJubileum.jmeno}
${vybraneJubileum.adresa}

V Javoří Lhotě dne 4. listopadu 2026

BLAHOPŘÁNÍ K VÝZNAMNÉMU ŽIVOTNÍMU JUBILEU (${vybraneJubileum.vek})

Vážená paní / Vážený pane,

dovolte mi, abych Vám jménem zastupitelstva obce Javoří Lhota, Sboru pro občanské záležitosti i jménem svým co nejsrdečněji poblahopřála k Vašemu krásnému životnímu jubileu – ${vybraneJubileum.vek}.

Vážíme si Vašeho celoživotního přínosu pro naši obec a sousedské soužití. Do dalších let Vám přejeme především pevné zdraví, duševní svěžest, radost v kruhu Vašich blízkých a mnoho spokojených dnů v naší obci.

S úctou a přáním všeho dobrého,

Ing. Marie Dvořáková
starostka obce Javoří Lhota`
    : ''

  return (
    <div>
      <div className="admin-kpi-mrizka">
        <div className="admin-kpi-karta">
          <div className="admin-kpi-hlavicka">
            <span className="admin-kpi-popis">Ověřovací kniha 2026</span>
            <span className="admin-stitek-tag" style={{ background: '#ecfdf5', color: '#065f46', borderColor: '#a7f3d0' }}>
              Zákon č. 21/2006 Sb.
            </span>
          </div>
          <p className="admin-kpi-hodnota">{83 + overeni.length} úkonů</p>
          <div className="admin-kpi-paticka">
            <span>Vidimace listin a legalizace podpisů</span>
          </div>
        </div>

        <div className="admin-kpi-karta">
          <div className="admin-kpi-hlavicka">
            <span className="admin-kpi-popis">Technické revize budov</span>
            <span
              className="admin-stitek-tag"
              style={{
                background: revize.some((r) => r.stav === 'blizi_se') ? '#fef7e0' : '#ecfdf5',
                color: revize.some((r) => r.stav === 'blizi_se') ? '#703800' : '#065f46',
              }}
            >
              {revize.filter((r) => r.stav === 'blizi_se').length} blíží se termín
            </span>
          </div>
          <p className="admin-kpi-hodnota">{revize.length} objektů</p>
          <div className="admin-kpi-paticka">
            <span>Škola, úřad, hasičárna, hřiště a AED</span>
          </div>
        </div>

        <div className="admin-kpi-karta">
          <div className="admin-kpi-hlavicka">
            <span className="admin-kpi-popis">Jubilea a obřady (SPOZ)</span>
            <span className="admin-stitek-tag">Listopad 2026</span>
          </div>
          <p className="admin-kpi-hodnota">4 výročí</p>
          <div className="admin-kpi-paticka">
            <span>Šablony blahopřání přímo do MS Word</span>
          </div>
        </div>

        <div className="admin-kpi-karta">
          <div className="admin-kpi-hlavicka">
            <span className="admin-kpi-popis">Czech POINT a přepážka</span>
            <span className="admin-stitek-tag" style={{ background: '#eff6ff', color: '#1e40af', borderColor: '#bfdbfe' }}>
              Přepážka otevřena
            </span>
          </div>
          <p className="admin-kpi-hodnota">Po a St</p>
          <div className="admin-kpi-paticka">
            <span>Úřední hodiny 8:00–12:00 a 13:00–17:00</span>
          </div>
        </div>
      </div>

      {hlaska ? (
        <div className="uspech" role="status" style={{ marginBottom: 16 }}>
          <p style={{ margin: 0, fontSize: 13.5 }}>{hlaska}</p>
        </div>
      ) : null}

      <div className="admin-zalozky" role="tablist" aria-label="Sekce přepážky, matriky a revizí">
        <button
          type="button"
          role="tab"
          aria-selected={zalozka === 'overovani'}
          className="admin-zalozka-tlacitko"
          onClick={() => setZalozka('overovani')}
        >
          <span>Ověřovací kniha – Vidimace a Legalizace ({overeni.length})</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={zalozka === 'revize'}
          className="admin-zalozka-tlacitko"
          onClick={() => setZalozka('revize')}
        >
          <span>Lhůtník technických revizí obecních budov ({revize.length})</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={zalozka === 'jubilea'}
          className="admin-zalozka-tlacitko"
          onClick={() => setZalozka('jubilea')}
        >
          <span>Jubilea občanů a SPOZ (Blahopřání do MS Word)</span>
        </button>
      </div>

      {zalozka === 'overovani' ? (
        <div className="admin-prehled-sloupce">
          <section className="panel-bily" aria-labelledby="novy-zapis-overeni">
            <h2 id="novy-zapis-overeni" style={{ marginTop: 0 }}>
              Zapsat ověření podpisu nebo kopie listiny
            </h2>
            <p className="vedlejsi" style={{ fontSize: 13, marginBottom: 14 }}>
              Systém automaticky přidělí pořadové číslo v ověřovací knize, vypočte správní poplatek a připraví ověřovací doložku pro tisk štítku nebo otevření v MS Word.
            </p>
            <form onSubmit={zapsatOvereni} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label htmlFor="ov-typ">Druh ověřovacího úkonu</label>
                <select
                  id="ov-typ"
                  value={typUkonu}
                  onChange={(e) => setTypUkonu(e.target.value as 'legalizace' | 'vidimace')}
                >
                  <option value="legalizace">Legalizace – úřední ověření pravosti podpisu (50 Kč / podpis)</option>
                  <option value="vidimace">Vidimace – úřední ověření shody kopie s listinou (30 Kč / strana)</option>
                </select>
              </div>
              <div>
                <label htmlFor="ov-pocet">Počet ověřovaných podpisů / stran</label>
                <input
                  id="ov-pocet"
                  type="number"
                  min={1}
                  max={50}
                  value={pocetJednotek}
                  onChange={(e) => setPocetJednotek(Math.max(1, Number(e.target.value)))}
                />
              </div>
              <div>
                <label htmlFor="ov-jmeno">Jméno, příjmení, rok narození a bydliště žadatele</label>
                <input
                  id="ov-jmeno"
                  type="text"
                  placeholder="např. Josef Černý, nar. 1965, Javoří Lhota č.p. 19"
                  value={jmenoZadatele}
                  onChange={(e) => setJmenoZadatele(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="ov-op">Číslo občanského průkazu nebo pasu</label>
                <input
                  id="ov-op"
                  type="text"
                  placeholder="např. OP č. 215884102"
                  value={cisloOp}
                  onChange={(e) => setCisloOp(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="ov-listina">Označení ověřované listiny</label>
                <input
                  id="ov-listina"
                  type="text"
                  placeholder="např. Kupní smlouva na pozemek p.č. 142"
                  value={listina}
                  onChange={(e) => setListina(e.target.value)}
                  required
                />
              </div>

              <div style={{ padding: '10px 14px', background: '#f8fafc', borderRadius: 8, border: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13.5 }}>Vypočtený správní poplatek dle zákona:</span>
                <strong style={{ fontSize: 16, color: 'var(--primary)' }}>{vypoctenyPoplatek} Kč</strong>
              </div>

              <div>
                <button type="submit" className="mala hlavni">
                  Zapsat do ověřovací knihy a vygenerovat doložku
                </button>
              </div>
            </form>
          </section>

          <section className="panel-bily" aria-labelledby="historie-overeni">
            <h2 id="historie-overeni" style={{ marginTop: 0 }}>
              Poslední zápisy v ověřovací knize
            </h2>
            <div className="posuvnik" style={{ marginBottom: 0 }}>
              <table className="tabulka-admin">
                <thead>
                  <tr>
                    <th>Poř. číslo</th>
                    <th>Žadatel a listina</th>
                    <th className="cislo">Poplatek</th>
                    <th>Doložka</th>
                  </tr>
                </thead>
                <tbody>
                  {overeni.map((o) => (
                    <tr key={o.id}>
                      <td>
                        <strong>{o.poradoveCislo}</strong>
                        <div className="vedlejsi" style={{ fontSize: 12 }}>{o.datum}</div>
                      </td>
                      <td>
                        <strong>{o.osoba}</strong>
                        <div className="vedlejsi" style={{ fontSize: 12.5 }}>{o.popisListiny}</div>
                      </td>
                      <td className="cislo"><strong>{o.poplatek} Kč</strong></td>
                      <td>
                        <button
                          type="button"
                          className="mala"
                          onClick={() => setVybranaDolozka(o)}
                        >
                          Doložka do Wordu
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {vybranaDolozka ? (
              <div style={{ marginTop: 16, padding: 16, background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <strong>Ověřovací doložka {vybranaDolozka.poradoveCislo} pro MS Word / štítek</strong>
                  <button type="button" className="mala" onClick={() => setVybranaDolozka(null)}>
                    Zavřít
                  </button>
                </div>
                <pre style={{ background: '#ffffff', padding: 12, borderRadius: 6, border: '1px solid var(--line)', fontSize: 12, whiteSpace: 'pre-wrap', margin: '0 0 10px' }}>
                  {textDolozkyWord}
                </pre>
                <div className="radek-akci">
                  <button
                    type="button"
                    className="mala hlavni"
                    onClick={() => {
                      const blob = new Blob([textDolozkyWord], { type: 'text/plain;charset=utf-8;' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.setAttribute('download', `dolozka-${vybranaDolozka.poradoveCislo.replace(/\//g, '-')}.txt`)
                      document.body.appendChild(a)
                      a.click()
                      document.body.removeChild(a)
                      setHlaska('Ověřovací doložka byla stažena pro tisk štítku v aplikaci Microsoft Word.')
                    }}
                  >
                    Stáhnout doložku pro MS Word
                  </button>
                  <button type="button" className="mala" onClick={() => window.print()}>
                    Vytisknout štítek
                  </button>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      ) : null}

      {zalozka === 'revize' ? (
        <section className="panel-bily" aria-labelledby="lhutnik-revizi">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <div>
              <h2 id="lhutnik-revizi" style={{ margin: 0 }}>
                Lhůtník zákonných revizí a kontrol obecních objektů
              </h2>
              <p className="vedlejsi" style={{ margin: '4px 0 0', fontSize: 13 }}>
                Automatické sledování termínů revizí kotelen, komínů, hasicích přístrojů, dětských hřišť a AED defibrilátorů.
              </p>
            </div>
          </div>

          <div className="posuvnik" style={{ marginBottom: 0 }}>
            <table className="tabulka-admin">
              <thead>
                <tr>
                  <th>Obecní budova / zařízení</th>
                  <th>Předmět revize a norma</th>
                  <th>Poslední kontrola</th>
                  <th>Příští termín</th>
                  <th>Revizní technik</th>
                  <th>Stav</th>
                  <th>Akce</th>
                </tr>
              </thead>
              <tbody>
                {revize.map((r) => (
                  <tr key={r.id}>
                    <td><strong>{r.objekt}</strong></td>
                    <td>{r.druhRevize}</td>
                    <td>{r.posledniKontrola}</td>
                    <td><strong>{r.pristiTermin}</strong></td>
                    <td style={{ fontSize: 13 }}>{r.technik}</td>
                    <td>
                      {r.stav === 'platna' ? (
                        <span className="stav dobre">Platná revize</span>
                      ) : (
                        <span className="stav pozor">Blíží se termín</span>
                      )}
                    </td>
                    <td>
                      {r.stav === 'blizi_se' ? (
                        <button
                          type="button"
                          className="mala hlavni"
                          onClick={() => potvrditRevizi(r)}
                        >
                          Zapsat novou revizi
                        </button>
                      ) : (
                        <span className="vedlejsi" style={{ fontSize: 12.5 }}>V pořádku</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {zalozka === 'jubilea' ? (
        <section className="panel-bily" aria-labelledby="jubilea-nadpis">
          <h2 id="jubilea-nadpis" style={{ marginTop: 0 }}>
            Společenská kronika, životní jubilea a Sbor pro občanské záležitosti (SPOZ)
          </h2>
          <p className="vedlejsi" style={{ marginBottom: 16 }}>
            Přehled nadcházejících kulatých výročí obyvatel obce s okamžitým vygenerováním blahopřejného dopisu starostky pro Microsoft Word.
          </p>

          <table className="tabulka-admin">
            <thead>
              <tr>
                <th>Jméno a příjmení občana</th>
                <th>Adresa v obci</th>
                <th>Významné výročí</th>
                <th>Termín návštěvy SPOZ</th>
                <th>Akce</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Božena Veselá</strong></td>
                <td>Javoří Lhota č.p. 7</td>
                <td><span className="stav dobre">80 let (životní jubileum)</span></td>
                <td>18. 11. 2026</td>
                <td>
                  <button
                    type="button"
                    className="mala hlavni"
                    onClick={() =>
                      setVybraneJubileum({
                        jmeno: 'Božena Veselá',
                        vek: '80. narozeninám',
                        adresa: 'Javoří Lhota č.p. 7',
                      })
                    }
                  >
                    Blahopřání do MS Word
                  </button>
                </td>
              </tr>
              <tr>
                <td><strong>František Kříž</strong></td>
                <td>Javoří Lhota č.p. 31</td>
                <td><span className="stav dobre">75 let (životní jubileum)</span></td>
                <td>25. 11. 2026</td>
                <td>
                  <button
                    type="button"
                    className="mala hlavni"
                    onClick={() =>
                      setVybraneJubileum({
                        jmeno: 'František Kříž',
                        vek: '75. narozeninám',
                        adresa: 'Javoří Lhota č.p. 31',
                      })
                    }
                  >
                    Blahopřání do MS Word
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          {vybraneJubileum ? (
            <div style={{ marginTop: 20, padding: 20, background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <strong>Blahopřejný dopis starostky obce pro MS Word ({vybraneJubileum.jmeno})</strong>
                <button type="button" className="mala" onClick={() => setVybraneJubileum(null)}>
                  Zavřít
                </button>
              </div>
              <pre style={{ background: '#ffffff', padding: 14, borderRadius: 6, border: '1px solid var(--line)', fontSize: 12.5, whiteSpace: 'pre-wrap', margin: '0 0 12px' }}>
                {textBlahopraniWord}
              </pre>
              <button
                type="button"
                className="mala hlavni"
                onClick={() => {
                  const blob = new Blob([textBlahopraniWord], { type: 'text/plain;charset=utf-8;' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.setAttribute('download', `blahoprani-${vybraneJubileum.jmeno.replace(/\s+/g, '-')}.txt`)
                  document.body.appendChild(a)
                  a.click()
                  document.body.removeChild(a)
                  setHlaska('Blahopřejný dopis byl stažen pro otevření a tisk na hlavičkový papír v Microsoft Word.')
                }}
              >
                Stáhnout blahopřání pro MS Word (.txt / .doc)
              </button>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  )
}
