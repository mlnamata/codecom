'use client'

import { useState } from 'react'

export interface Zprava {
  id: string
  ucet: string
  slozka: 'dorucene' | 'podatelna' | 'isds' | 'odeslane' | 'koncepty' | 'archiv'
  odesilatelJmeno: string
  odesilatelEmail: string
  prijemceEmail: string
  predmet: string
  datum: string
  cisloJednaci?: string
  spisovaZnacka?: string
  precteno: boolean
  stitek: string
  typPodani: 'email' | 'isds' | 'portal'
  text: string
  prilohy: { nazev: string; velikost: string }[]
}

const VYCHOZI_ZPRAVY: Zprava[] = [
  {
    id: 'm-1',
    ucet: 'podatelna@javorilhota.cz',
    slozka: 'podatelna',
    odesilatelJmeno: 'Ing. Jan Novák',
    odesilatelEmail: 'jan.novak@email.cz',
    prijemceEmail: 'podatelna@javorilhota.cz',
    predmet: 'Žádost o povolení kácení dřevin – lípa u pozemku č. 142',
    datum: 'Dnes, 08:30',
    cisloJednaci: 'OÚ-JL/2026/0841',
    spisovaZnacka: '280.1 / S 5 let',
    precteno: false,
    stitek: 'Elektronické podání',
    typPodani: 'email',
    text: `Dobrý den,\n\nv příloze zasílám řádně vyplněnou a podepsanou žádost o povolení kácení dřeviny rostoucí mimo les (lípa velkolistá na p.č. 142 v k.ú. Javoří Lhota). Strom byl výrazně poškozen při vichřici a hrozí pád suchých větví na obecní komunikaci a elektrické vedení nízkého napětí.\n\nK žádosti přikládám fotodokumentaci a situační nákres.\n\nS pozdravem,\nIng. Jan Novák\nNa Rovném 45, Javoří Lhota\ntelefon: 724 112 334`,
    prilohy: [
      { nazev: 'Zadost-kaceni-drevin-Novak.pdf', velikost: '240 kB' },
      { nazev: 'situacni-nakres-a-foto.pdf', velikost: '1,8 MB' },
    ],
  },
  {
    id: 'm-2',
    ucet: 'isds:4x8ab9c',
    slozka: 'isds',
    odesilatelJmeno: 'Krajský úřad Plzeňského kraje (ISDS: 582al75)',
    odesilatelEmail: 'posta@kr-plzensky.cz (ISDS)',
    prijemceEmail: '4x8ab9c (Datová schránka obce)',
    predmet: 'Veřejná vyhláška – Opatření obecné povahy č. 4/2026 k ochraně vod',
    datum: 'Dnes, 07:15',
    cisloJednaci: 'KÚPK/12984/2026',
    spisovaZnacka: '150.2 / A 10 let',
    precteno: false,
    stitek: 'Datová zpráva ISDS',
    typPodani: 'isds',
    text: `Vážená paní starostko, vážení radní,\n\nv příloze Vám zasíláme Veřejnou vyhlášku – Opatření obecné povahy č. 4/2026 Odboru životního prostředí Krajského úřadu Plzeňského kraje, kterou se stanovují ochranná pásma vodních zdrojů v povodí řeky Úhlavy.\n\nŽádáme o bezodkladné vyvěšení na úřední desce obce Javoří Lhota po zákonnou lhůtu 15 dnů a zaslání potvrzení o vyvěšení.\n\nElektronicky podepsáno kvalifikovaným certifikátem.\nČasové razítko ověřeno.`,
    prilohy: [{ nazev: 'Verejna-vyhlaska-OOP-4-2026.pdf', velikost: '420 kB' }],
  },
  {
    id: 'm-3',
    ucet: 'starosta@javorilhota.cz',
    slozka: 'dorucene',
    odesilatelJmeno: 'Petra Svobodová',
    odesilatelEmail: 'petra.svobodova@seznam.cz',
    prijemceEmail: 'starosta@javorilhota.cz',
    predmet: 'Dotaz na termín svozu nebezpečného odpadu a platbu za psa',
    datum: 'Včera, 16:40',
    cisloJednaci: 'OÚ-JL/2026/0839',
    spisovaZnacka: '102.4 / S 3 roky',
    precteno: true,
    stitek: 'Dotaz občana',
    typPodani: 'portal',
    text: `Dobrý den paní starostko,\n\nchtěla bych se zeptat, zda podzimní svoz nebezpečného odpadu a starých elektrospotřebičů proběhne i letos v areálu obecního dvora a od kolika hodin. Zároveň bych ráda uhradila poplatek za psa přes nový platební portál na webu obce, ale nejsem si jistá variabilním symbolem pro číslo popisné 12.\n\nPředem děkuji za odpověď.\n\nPetra Svobodová\nU Hřiště 12, Javoří Lhota`,
    prilohy: [],
  },
  {
    id: 'm-4',
    ucet: 'starosta@javorilhota.cz',
    slozka: 'dorucene',
    odesilatelJmeno: 'Velitel jednotky SDH',
    odesilatelEmail: 'hasici@javorilhota.cz',
    prijemceEmail: 'starosta@javorilhota.cz',
    predmet: 'Měsíční revize AED defibrilátoru a připravenost zimní techniky',
    datum: '3. 11. 2026',
    precteno: true,
    stitek: 'Hasiči a bezpečnost',
    typPodani: 'email',
    text: `Dobrý den,\n\nhlásím, že jsme o víkendu provedli pravidelnou technickou revizi AED defibrilátoru na stanici u hasičské zbrojnice. Baterie i elektrody jsou v plném pořádku, připraveno na zimní provoz.\n\nZároveň jsme překontrolovali hydrauliku na radlici obecního traktoru a posypové zařízení na sypači. Vše je funkční.\n\nZdraví,\nKarel Vondráček, velitel SDH`,
    prilohy: [{ nazev: 'Revizni-protokol-AED-listopad.pdf', velikost: '115 kB' }],
  },
  {
    id: 'm-5',
    ucet: 'ucetni@javorilhota.cz',
    slozka: 'dorucene',
    odesilatelJmeno: 'E.ON Energie, a.s.',
    odesilatelEmail: 'fakturace@eon.cz',
    prijemceEmail: 'ucetni@javorilhota.cz',
    predmet: 'Faktura č. 20268412 – Veřejné osvětlení a čerpadlo ČOV',
    datum: '2. 11. 2026',
    cisloJednaci: 'OÚ-JL/2026/0831',
    spisovaZnacka: '050.1 / V 10 let',
    precteno: true,
    stitek: 'Faktury a finance',
    typPodani: 'email',
    text: `Vážená paní Pokorná,\n\nv příloze Vám zasíláme daňový doklad – fakturu č. 20268412 za odběr elektrické energie pro odběrná místa obce Javoří Lhota (veřejné osvětlení a ČOV) za zúčtovací období říjen 2026.\n\nČástka k úhradě: 14 280 Kč.\nSplatnost: 16. 11. 2026.`,
    prilohy: [{ nazev: 'Faktura-20268412-EON.pdf', velikost: '190 kB' }],
  },
]

const SABLONY_ODPOVEDI = [
  {
    nazev: 'Potvrzení přijetí podání (podatelna)',
    text: `Dobrý den,\n\npotvrzujeme přijetí Vašeho podání ze dne [DATUM], které bylo zaevidováno pod číslem jednacím [CISLO_JEDNACI].\n\nVěc byla postoupena k věcnému posouzení příslušnému odboru. O výsledku vyřízení Vás budeme informovat ve lhůtě stanovené správním řádem.\n\nS pozdravem,\nObecní úřad Javoří Lhota\nElektronická podatelna`,
  },
  {
    nazev: 'Informace k místním poplatkům a svozu',
    text: `Dobrý den,\n\nděkujeme za Váš dotaz. Podzimní svoz nebezpečného odpadu a bioodpadu proběhne v sobotu 21. listopadu od 8:00 do 12:00 na obecním dvoře.\n\nMístní poplatky můžete pohodlně uhradit přes platební portál na webu obce (/sluzby/platby). Jako variabilní symbol uveďte číslo popisné Vašeho domu.\n\nS pozdravem,\nObecní úřad Javoří Lhota`,
  },
  {
    nazev: 'Oznámení o vyřešení podnětu / závady',
    text: `Dobrý den,\n\nděkujeme za nahlášení podnětu. Závada byla předána pracovníkům technických služeb obce a v současné době je úspěšně odstraněna.\n\nDěkujeme za spolupráci na údržbě naší obce.\n\nS pozdravem,\nVedení obce Javoří Lhota`,
  },
]

export function PostaKlient() {
  const [ucet, setUcet] = useState('vse')
  const [slozka, setSlozka] = useState<'dorucene' | 'podatelna' | 'isds' | 'odeslane' | 'archiv'>('dorucene')
  const [zpravy, setZpravy] = useState<Zprava[]>(VYCHOZI_ZPRAVY)
  const [vybranaZpravaId, setVybranaZpravaId] = useState<string>('m-1')
  const [hledanyText, setHledanyText] = useState('')
  const [novyEmailRezim, setNovyEmailRezim] = useState(false)
  const [zobrazitWordDialog, setZobrazitWordDialog] = useState(false)
  const [akcniHlaska, setAkcniHlaska] = useState('')

  // Formulář nové zprávy / odpovědi
  const [komu, setKomu] = useState('')
  const [predmet, setPredmet] = useState('')
  const [teloZpravy, setTeloZpravy] = useState('')

  const filtrovaneZpravy = zpravy.filter((z) => {
    const shodaUctu = ucet === 'vse' || z.ucet === ucet
    const shodaSlozky =
      slozka === 'dorucene'
        ? z.slozka === 'dorucene' || z.slozka === 'podatelna' || z.slozka === 'isds'
        : z.slozka === slozka
    const q = hledanyText.toLowerCase().trim()
    const shodaHledani =
      !q ||
      z.predmet.toLowerCase().includes(q) ||
      z.odesilatelJmeno.toLowerCase().includes(q) ||
      z.odesilatelEmail.toLowerCase().includes(q) ||
      z.text.toLowerCase().includes(q)

    return shodaUctu && shodaSlozky && shodaHledani
  })

  const vybranaZprava = zpravy.find((z) => z.id === vybranaZpravaId) || filtrovaneZpravy[0]

  const otevriZpravu = (id: string) => {
    setVybranaZpravaId(id)
    setNovyEmailRezim(false)
    setZpravy(zpravy.map((z) => (z.id === id ? { ...z, precteno: true } : z)))
  }

  const zahajitOdpoved = (z: Zprava) => {
    setKomu(z.odesilatelEmail)
    setPredmet(z.predmet.startsWith('Re: ') ? z.predmet : `Re: ${z.predmet}`)
    setTeloZpravy(`\n\n--- Původní zpráva ---\nOd: ${z.odesilatelJmeno} <${z.odesilatelEmail}>\n${z.text}`)
    setNovyEmailRezim(true)
  }

  const odeslatZpravu = (e: React.FormEvent) => {
    e.preventDefault()
    if (!komu || !predmet || !teloZpravy) {
      setAkcniHlaska('Vyplňte příjemce, předmět i text zprávy.')
      return
    }

    const odesilaciAdresa = ucet === 'vse' ? 'podatelna@javorilhota.cz' : ucet
    const nova: Zprava = {
      id: `m-${Date.now()}`,
      ucet: odesilaciAdresa,
      slozka: 'odeslane',
      odesilatelJmeno: 'Obec Javoří Lhota',
      odesilatelEmail: odesilaciAdresa,
      prijemceEmail: komu,
      predmet,
      datum: 'Právě teď',
      precteno: true,
      stitek: 'Odesláno',
      typPodani: 'email',
      text: teloZpravy,
      prilohy: [],
    }

    setZpravy([nova, ...zpravy])
    setNovyEmailRezim(false)
    setAkcniHlaska(`Zpráva pro ${komu} byla úspěšně odeslána z adresy ${odesilaciAdresa}.`)
    setKomu('')
    setPredmet('')
    setTeloZpravy('')
  }

  const vyvesitNaDesku = (nazevSouboru: string) => {
    setAkcniHlaska(`Dokument „${nazevSouboru}“ byl úspěšně zařazen na elektronickou úřední desku obce.`)
  }

  const vytvoritZavadu = (z: Zprava) => {
    setAkcniHlaska(`Podnět od ${z.odesilatelJmeno} byl zaevidován do modulu Hlášení závad pod číslem Z-2026-44.`)
  }

  const exportovatDoExcelu = () => {
    const radky = [
      ['Číslo jednací', 'Spisová značka', 'Datum', 'Odesílatel', 'E-mail / ISDS', 'Věc', 'Stav'],
      ...zpravy.map((z) => [
        z.cisloJednaci || 'Bez č.j.',
        z.spisovaZnacka || 'Nezařazeno',
        z.datum,
        z.odesilatelJmeno,
        z.odesilatelEmail,
        `"${z.predmet.replace(/"/g, '""')}"`,
        z.precteno ? 'Vyřízeno / Přečteno' : 'Nové podání',
      ]),
    ]
    const csvContent = '\uFEFF' + radky.map((e) => e.join(';')).join('\r\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `podaci-denik-javori-lhota-2026.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setAkcniHlaska('Podací deník byl stažen jako tabulka pro Microsoft Excel.')
  }

  const pocetNeprectenych = zpravy.filter((z) => !z.precteno).length
  const pocetIsds = zpravy.filter((z) => z.typPodani === 'isds').length

  // Šablona pro generování podkladu do Microsoft Word
  const textProWord = vybranaZprava
    ? `OBECNÍ ÚŘAD JAVOŘÍ LHOTA
Odbor správy majetku a životního prostředí
Náměstí Míru 1, 330 00 Javoří Lhota, IČ: 00257834, DIČ: CZ00257834
ID datové schránky: 4x8ab9c, e-mail: podatelna@javorilhota.cz

Číslo jednací: ${vybranaZprava.cisloJednaci || 'OÚ-JL/2026/0841'}
Spisová značka: ${vybranaZprava.spisovaZnacka || '280.1 / S 5 let'}
Vyřizuje: Ing. Marie Dvořáková, starostka obce
Datum: 4. listopadu 2026

Adresát:
${vybranaZprava.odesilatelJmeno}
${vybranaZprava.odesilatelEmail}

R O Z H O D N U T Í
ve věci: ${vybranaZprava.predmet}

Výrok:
Obecní úřad Javoří Lhota jako příslušný správní orgán podle § 76 zákona č. 114/1992 Sb., o ochraně přírody a krajiny, ve znění pozdějších předpisů, na základě podané žádosti ze dne ${vybranaZprava.datum}

R O Z H O D L   T A K T O :

Žadateli se za stanovených podmínek vyhovuje.

Odůvodnění:
Dne ${vybranaZprava.datum} obdržel Obecní úřad Javoří Lhota podání žadatele ve věci „${vybranaZprava.predmet}“. Správní orgán po místním šetření a ověření skutečností neshledal žádné zákonné překážky pro vydání tohoto rozhodnutí.

Poučení o odvolání:
Proti tomuto rozhodnutí lze podat odvolání ke Krajskému úřadu Plzeňského kraje do 15 dnů ode dne jeho oznámení, a to podáním učiněným u Obecního úřadu Javoří Lhota.

Ing. Marie Dvořáková
starostka obce Javoří Lhota
(Otisk úředního razítka)`
    : ''

  const stahnoutPodkladWord = () => {
    const blob = new Blob([textProWord], { type: 'text/plain;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `rozhodnuti-${vybranaZprava?.cisloJednaci?.replace(/\//g, '-') || 'spis'}.txt`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setAkcniHlaska('Úřední text byl stažen jako podklad pro otevření v aplikaci Microsoft Word.')
  }

  const zkopirovatTextWord = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(textProWord)
      setAkcniHlaska('Kompletní úřední rozhodnutí s hlavičkou obce bylo zkopírováno do schránky (vložte do Wordu pomocí Ctrl+V).')
    }
  }

  return (
    <div className="admin-posta-kontejner">
      {/* Horní ovládací pruh */}
      <div className="admin-posta-lista">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <label htmlFor="vyber-uctu" style={{ margin: 0, fontWeight: 500, fontSize: 13.5 }}>
            Aktivní schránka:
          </label>
          <select
            id="vyber-uctu"
            value={ucet}
            onChange={(e) => setUcet(e.target.value)}
            style={{ minHeight: 36, padding: '4px 10px', fontSize: 13.5, width: 280 }}
          >
            <option value="vse">Všechny schránky a podatelny úřadu</option>
            <option value="podatelna@javorilhota.cz">podatelna@javorilhota.cz (E-podatelna)</option>
            <option value="starosta@javorilhota.cz">starosta@javorilhota.cz (Starostka)</option>
            <option value="ucetni@javorilhota.cz">ucetni@javorilhota.cz (Hospodářství)</option>
            <option value="isds:4x8ab9c">ISDS: 4x8ab9c (Datová schránka obce)</option>
          </select>

          <span className="admin-stitek-tag" style={{ background: '#ecfdf5', color: '#065f46', borderColor: '#a7f3d0' }}>
            Doména: @javorilhota.cz · Pošta a ISDS aktivní
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <button
            type="button"
            className="mala"
            onClick={exportovatDoExcelu}
            title="Exportovat přehled doručených podání a spisů do tabulky pro Microsoft Excel"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginRight: 6 }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="8" y1="13" x2="16" y2="13" />
              <line x1="8" y1="17" x2="16" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>Export podacího deníku do Excelu</span>
          </button>

          <button
            type="button"
            className="mala hlavni"
            onClick={() => {
              setKomu('')
              setPredmet('')
              setTeloZpravy('')
              setNovyEmailRezim(true)
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginRight: 6 }}>
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span>Nová zpráva</span>
          </button>
        </div>
      </div>

      {akcniHlaska ? (
        <div className="uspech" role="status" style={{ margin: '12px 18px 0' }}>
          <p style={{ margin: 0, fontSize: 13.5 }}>{akcniHlaska}</p>
        </div>
      ) : null}

      {/* Třípanelové rozvržení webmailu */}
      <div className="admin-posta-mrizka">
        {/* Sloupec 1: Složky pošty */}
        <nav aria-label="Složky pošty" className="admin-posta-slozky">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <button
                type="button"
                className={`admin-posta-slozka-btn ${slozka === 'dorucene' ? 'aktivni' : ''}`}
                onClick={() => {
                  setSlozka('dorucene')
                  setNovyEmailRezim(false)
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                  </svg>
                  <span>Doručená pošta</span>
                </span>
                {pocetNeprectenych > 0 ? (
                  <span className="admin-posta-pocet-odznak">{pocetNeprectenych}</span>
                ) : null}
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`admin-posta-slozka-btn ${slozka === 'podatelna' ? 'aktivni' : ''}`}
                onClick={() => {
                  setSlozka('podatelna')
                  setNovyEmailRezim(false)
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>E-podatelna</span>
                </span>
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`admin-posta-slozka-btn ${slozka === 'isds' ? 'aktivni' : ''}`}
                onClick={() => {
                  setSlozka('isds')
                  setNovyEmailRezim(false)
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>Datové zprávy ISDS</span>
                </span>
                {pocetIsds > 0 ? (
                  <span className="admin-posta-pocet-odznak" style={{ background: '#0284c7' }}>{pocetIsds}</span>
                ) : null}
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`admin-posta-slozka-btn ${slozka === 'odeslane' ? 'aktivni' : ''}`}
                onClick={() => {
                  setSlozka('odeslane')
                  setNovyEmailRezim(false)
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  <span>Odeslané</span>
                </span>
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`admin-posta-slozka-btn ${slozka === 'archiv' ? 'aktivni' : ''}`}
                onClick={() => {
                  setSlozka('archiv')
                  setNovyEmailRezim(false)
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="21 8 21 21 3 21 3 8" />
                    <rect x="1" y="3" width="22" height="5" />
                    <line x1="10" y1="12" x2="14" y2="12" />
                  </svg>
                  <span>Archiv a skartace</span>
                </span>
              </button>
            </li>
          </ul>

          <div style={{ marginTop: 24, padding: '12px 10px', background: 'var(--surface)', borderRadius: 8, fontSize: 12 }}>
            <span style={{ display: 'block', fontWeight: 600, color: 'var(--ink)' }}>Kapacita pošty úřadu</span>
            <div style={{ background: 'var(--line)', height: 6, borderRadius: 3, margin: '6px 0 4px', overflow: 'hidden' }}>
              <div style={{ width: '12%', height: '100%', background: 'var(--primary)' }} />
            </div>
            <span className="vedlejsi">Využito 1,2 GB z 10 GB</span>
          </div>

          <div style={{ marginTop: 16, padding: '12px 10px', background: '#eff6ff', borderRadius: 8, fontSize: 12, border: '1px solid #bfdbfe', color: '#1e40af' }}>
            <strong style={{ display: 'block', marginBottom: 2 }}>Pracoviště úředníka</strong>
            <span>Všechny podání občanů, ISDS zprávy a úřední spisy jsou na jednom místě bez nutnosti přepínat do externích aplikací.</span>
          </div>
        </nav>

        {/* Sloupec 2: Seznam zpráv ve složce */}
        <section aria-label="Seznam e-mailů" className="admin-posta-seznam">
          <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--line)' }}>
            <input
              type="search"
              placeholder="Hledat v poště, ISDS a podáních..."
              value={hledanyText}
              onChange={(e) => setHledanyText(e.target.value)}
              style={{ width: '100%', minHeight: 34, fontSize: 13, margin: 0 }}
            />
          </div>

          <div style={{ overflowY: 'auto', maxHeight: '680px' }}>
            {filtrovaneZpravy.length === 0 ? (
              <p style={{ padding: 20, margin: 0, textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
                Žádné zprávy neodpovídají zadanému filtru.
              </p>
            ) : (
              filtrovaneZpravy.map((z) => (
                <button
                  key={z.id}
                  type="button"
                  className={`admin-posta-radek ${vybranaZprava?.id === z.id && !novyEmailRezim ? 'aktivni' : ''} ${!z.precteno ? 'neprecteno' : ''}`}
                  onClick={() => otevriZpravu(z.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                    <strong style={{ fontSize: 13.5, color: z.precteno ? 'var(--ink)' : 'var(--primary)' }}>
                      {z.odesilatelJmeno}
                    </strong>
                    <span style={{ fontSize: 11.5, color: 'var(--muted)' }}>{z.datum}</span>
                  </div>

                  <div style={{ fontSize: 13, fontWeight: z.precteno ? 500 : 600, color: 'var(--ink)', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {z.predmet}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span className="admin-stitek-tag" style={{ fontSize: 11 }}>
                      {z.stitek}
                    </span>
                    {z.cisloJednaci ? (
                      <span className="admin-stitek-tag" style={{ fontSize: 11 }}>
                        {z.cisloJednaci}
                      </span>
                    ) : null}
                    {z.prilohy.length > 0 ? (
                      <span className="vedlejsi" style={{ fontSize: 11, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                        </svg>
                        {z.prilohy.length}
                      </span>
                    ) : null}
                  </div>
                </button>
              ))
            )}
          </div>
        </section>

        {/* Sloupec 3: Detail zprávy nebo editor nové zprávy */}
        <section aria-label="Obsah e-mailu" className="admin-posta-detail">
          {novyEmailRezim ? (
            /* Formulář pro novou zprávu */
            <form onSubmit={odeslatZpravu} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: 10 }}>
                <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>Nová zpráva ze schránky úřadu</h2>
                <button
                  type="button"
                  className="mala"
                  onClick={() => setNovyEmailRezim(false)}
                >
                  Zavřít
                </button>
              </div>

              <div>
                <label htmlFor="posta-od" style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
                  Odesílatel:
                </label>
                <input
                  id="posta-od"
                  type="text"
                  value={ucet === 'vse' ? 'podatelna@javorilhota.cz' : ucet}
                  readOnly
                  style={{ background: 'var(--surface)', color: 'var(--muted)' }}
                />
              </div>

              <div>
                <label htmlFor="posta-komu" style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
                  Komu (příjemce):
                </label>
                <input
                  id="posta-komu"
                  type="email"
                  placeholder="např. obcan@email.cz nebo urad@kraj.cz"
                  value={komu}
                  onChange={(e) => setKomu(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="posta-predmet" style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
                  Předmět e-mailu:
                </label>
                <input
                  id="posta-predmet"
                  type="text"
                  placeholder="Předmět zprávy..."
                  value={predmet}
                  onChange={(e) => setPredmet(e.target.value)}
                  required
                />
              </div>

              <div>
                <span className="vedlejsi" style={{ display: 'block', fontSize: 12.5, marginBottom: 6 }}>
                  Vložit úřední šablonu odpovědi:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {SABLONY_ODPOVEDI.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="admin-stitek-tag"
                      style={{ cursor: 'pointer', background: '#ffffff', color: 'var(--ink)' }}
                      onClick={() => setTeloZpravy(s.text)}
                    >
                      {s.nazev}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="posta-telo" style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
                  Text zprávy:
                </label>
                <textarea
                  id="posta-telo"
                  rows={10}
                  value={teloZpravy}
                  onChange={(e) => setTeloZpravy(e.target.value)}
                  placeholder="Napište text zprávy občanovi či instituci..."
                  style={{ width: '100%', minHeight: 180 }}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingTop: 8 }}>
                <button type="submit" className="mala hlavni">
                  Odeslat e-mail
                </button>
                <button
                  type="button"
                  className="mala"
                  onClick={() => setNovyEmailRezim(false)}
                >
                  Zrušit
                </button>
              </div>
            </form>
          ) : vybranaZprava ? (
            /* Zobrazení přijatého e-mailu / ISDS */
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, paddingBottom: 14, borderBottom: '1px solid var(--line)', marginBottom: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span className="admin-stitek-tag">{vybranaZprava.stitek}</span>
                    {vybranaZprava.cisloJednaci ? (
                      <span className="admin-stitek-tag">Č.j.: {vybranaZprava.cisloJednaci}</span>
                    ) : null}
                    {vybranaZprava.spisovaZnacka ? (
                      <span className="admin-stitek-tag" style={{ background: '#f8fafc', borderColor: '#cbd5e1' }}>
                        Spis: {vybranaZprava.spisovaZnacka}
                      </span>
                    ) : null}
                  </div>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{vybranaZprava.predmet}</h2>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
                    Od: <strong>{vybranaZprava.odesilatelJmeno}</strong> &lt;{vybranaZprava.odesilatelEmail}&gt; · {vybranaZprava.datum}
                  </div>
                </div>

                {/* Rychlé obecní akce - vše na jednom místě */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  <button
                    type="button"
                    className="mala hlavni"
                    onClick={() => zahajitOdpoved(vybranaZprava)}
                  >
                    Odpovědět
                  </button>

                  <button
                    type="button"
                    className="mala"
                    onClick={() => setZobrazitWordDialog(true)}
                    title="Vystavit úřední rozhodnutí a podklad pro Microsoft Word"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ marginRight: 6 }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span>Vystavit pro MS Word</span>
                  </button>

                  {vybranaZprava.prilohy.length > 0 ? (
                    <button
                      type="button"
                      className="mala"
                      onClick={() => vyvesitNaDesku(vybranaZprava.prilohy[0]?.nazev || 'Dokument')}
                      title="Přenést přílohu e-mailu přímo na úřední desku obce"
                    >
                      Vyvěsit na úřední desku
                    </button>
                  ) : null}

                  <button
                    type="button"
                    className="mala"
                    onClick={() => vytvoritZavadu(vybranaZprava)}
                    title="Zaevidovat podnět do hlášení závad"
                  >
                    Založit závadu
                  </button>
                </div>
              </div>

              {/* Tělo e-mailu */}
              <div style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-line', color: 'var(--ink)', marginBottom: 20 }}>
                {vybranaZprava.text}
              </div>

              {/* Přílohy e-mailu */}
              {vybranaZprava.prilohy.length > 0 ? (
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                  <strong style={{ display: 'block', fontSize: 13, marginBottom: 8, color: 'var(--muted)' }}>
                    Přílohy zprávy ({vybranaZprava.prilohy.length}):
                  </strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {vybranaZprava.prilohy.map((p, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '8px 12px',
                          background: 'var(--surface)',
                          border: '1px solid var(--line)',
                          borderRadius: 6,
                          fontSize: 13,
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <strong>{p.nazev}</strong>
                        <span className="vedlejsi" style={{ fontSize: 11.5 }}>({p.velikost})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Dialog pro vygenerování úředního rozhodnutí do MS Word */}
              {zobrazitWordDialog ? (
                <div
                  style={{
                    marginTop: 24,
                    padding: 20,
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: 10,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <strong style={{ fontSize: 15, display: 'block' }}>
                        Předpřipravené rozhodnutí a úřední dopis pro Microsoft Word
                      </strong>
                      <span className="vedlejsi" style={{ fontSize: 12.5 }}>
                        Systém automaticky vyplnil hlavičku obce, číslo jednací, spisový znak i odůvodnění podle došlého podání.
                      </span>
                    </div>
                    <button
                      type="button"
                      className="mala"
                      onClick={() => setZobrazitWordDialog(false)}
                    >
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
                      maxHeight: 240,
                      overflowY: 'auto',
                      fontFamily: 'monospace',
                      whiteSpace: 'pre-wrap',
                      margin: '0 0 14px',
                    }}
                  >
                    {textProWord}
                  </pre>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="mala hlavni"
                      onClick={stahnoutPodkladWord}
                    >
                      Stáhnout podklad pro Word (.txt / .doc)
                    </button>
                    <button
                      type="button"
                      className="mala"
                      onClick={zkopirovatTextWord}
                    >
                      Kopírovat do schránky (Ctrl+V)
                    </button>
                    <button
                      type="button"
                      className="mala"
                      onClick={() => window.print()}
                    >
                      Vytisknout spisový lístek
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <p style={{ color: 'var(--muted)', textAlign: 'center', padding: 40 }}>
              Vyberte zprávu ze seznamu vlevo pro její zobrazení.
            </p>
          )}
        </section>
      </div>
    </div>
  )
}
