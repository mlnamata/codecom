import { demoTed } from '@codekom/demo-data'
import { pragueDayKey, stavDokumentu } from '@codekom/typy/pravidla'
import { aktivniHlaseni } from '@codekom/typy/pravidla'
import { uloziste } from '@/lib/data/demo-pamet'

export const dynamic = 'force-dynamic'

export default function Prehled() {
  const u = uloziste()
  const dnes = pragueDayKey(demoTed())
  const visi = u.dokumenty.filter((d) => stavDokumentu(d.vyvesenoOd, d.vyvesenoDo, dnes) === 'visi').length
  const aktivni = aktivniHlaseni(
    u.krize.filter((h) => h.stav === 'vydano'),
    demoTed(),
  ).length
  const noveZavady = u.zavady.filter((z) => z.stav === 'nove').length
  const vyrizeneZavady = u.zavady.filter((z) => z.stav === 'vyrizeno').length

  return (
    <>
      <div className="admin-uvod-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>Pracoviště obecního úřadu Javoří Lhota</h1>
            <span className="admin-stitek-tag" style={{ background: '#eff6ff', color: '#1e40af', borderColor: '#bfdbfe' }}>
              Vše na jednom místě · Propojeno s MS Office
            </span>
          </div>
          <p className="vedlejsi" style={{ margin: '4px 0 0', fontSize: 13.5 }}>
            Jednotný informační systém obce · E-podatelna, ISDS, pokladna, smlouvy, rozhlas i správa webu · Pondělí 4. listopadu 2026
          </p>
        </div>
        <div className="admin-uvod-status">
          <span className="admin-uvod-dot" aria-hidden="true" />
          <span>Všechny obecní systémy a IoT v provozu</span>
        </div>
      </div>

      <section aria-labelledby="hlavni-metriky">
        <h2 id="hlavni-metriky" className="sr-only">
          Hlavní metriky obce
        </h2>
        <div className="admin-kpi-mrizka">
          <div className="admin-kpi-karta">
            <div className="admin-kpi-hlavicka">
              <span className="admin-kpi-popis">Pošta a datová schránka</span>
              <span className="admin-stitek-tag" style={{ background: '#eff6ff', color: '#1e40af', borderColor: '#bfdbfe' }}>
                2 nepřečtené
              </span>
            </div>
            <p className="admin-kpi-hodnota">5 zpráv</p>
            <div className="admin-kpi-paticka">
              <a href="/ukazka/administrace/posta">
                <span>Otevřít e-podatelnu a ISDS</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </div>
          </div>

          <div className="admin-kpi-karta">
            <div className="admin-kpi-hlavicka">
              <span className="admin-kpi-popis">Poplatky a pokladna</span>
              <span className="admin-stitek-tag" style={{ background: '#ecfdf5', color: '#065f46', borderColor: '#a7f3d0' }}>
                88 % vybráno
              </span>
            </div>
            <p className="admin-kpi-hodnota">15 450 Kč</p>
            <div className="admin-kpi-paticka">
              <span style={{ color: 'var(--muted)', fontSize: 12.5 }}>Hotovost v pokladně · </span>
              <a href="/ukazka/administrace/poplatky">
                <span>Pokladna a plátci</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </div>
          </div>

          <div className="admin-kpi-karta">
            <div className="admin-kpi-hlavicka">
              <span className="admin-kpi-popis">Úřední deska a smlouvy</span>
              <span className="admin-stitek-tag">DIA + ISRS</span>
            </div>
            <p className="admin-kpi-hodnota">{visi} vyvěšeno</p>
            <div className="admin-kpi-paticka">
              <a href="/ukazka/administrace/deska">
                <span>Úřední deska</span>
              </a>
              <span style={{ color: 'var(--muted)' }}> · </span>
              <a href="/ukazka/administrace/smlouvy">
                <span>Registr smluv</span>
              </a>
            </div>
          </div>

          <div className="admin-kpi-karta">
            <div className="admin-kpi-hlavicka">
              <span className="admin-kpi-popis">Závady a krizový stav</span>
              <span
                className="admin-stitek-tag"
                style={{
                  color: noveZavady > 0 ? '#703800' : '#0f5b28',
                  background: noveZavady > 0 ? '#fef7e0' : '#e6f4ea',
                }}
              >
                {noveZavady} {noveZavady >= 1 && noveZavady <= 4 ? 'nové' : 'nových'} · {aktivni} krizí
              </span>
            </div>
            <p className="admin-kpi-hodnota">{noveZavady}</p>
            <div className="admin-kpi-paticka">
              <span style={{ color: 'var(--muted)', fontSize: 12.5 }}>{vyrizeneZavady} vyřízeno · </span>
              <a href="/ukazka/administrace/zavady">
                <span>Hlášení závad</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="rychle-akce-titulek">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          <h2 id="rychle-akce-titulek" style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
            Rychlý rozcestník agend úřadu (bez opuštění aplikace)
          </h2>
          <span className="vedlejsi" style={{ fontSize: 12.5 }}>
            Všechny moduly generují podklady přímo pro Microsoft Word (.doc/.txt) a tabulky pro Microsoft Excel (.csv)
          </span>
        </div>
        <div className="admin-rychle-akce">
          <a href="/ukazka/administrace/posta" className="admin-akce-tlacitko">
            <span className="admin-akce-ikona" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <span className="admin-akce-text">
              <strong className="admin-akce-nazev">Obecní pošta a ISDS</strong>
              <span className="admin-akce-podtitul">E-podatelna, datové zprávy a spisy</span>
            </span>
          </a>

          <a href="/ukazka/administrace/poplatky" className="admin-akce-tlacitko">
            <span className="admin-akce-ikona" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </span>
            <span className="admin-akce-text">
              <strong className="admin-akce-nazev">Poplatky a pokladna</strong>
              <span className="admin-akce-podtitul">Odpad, psi, dlužníci a pokladní doklady</span>
            </span>
          </a>

          <a href="/ukazka/administrace/smlouvy" className="admin-akce-tlacitko">
            <span className="admin-akce-ikona" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="m9 15 2 2 4-4" />
              </svg>
            </span>
            <span className="admin-akce-text">
              <strong className="admin-akce-nazev">Smlouvy a faktury</strong>
              <span className="admin-akce-podtitul">Registr smluv MVČR, košilky a rozpočet</span>
            </span>
          </a>

          <a href="/ukazka/administrace/rozhlas" className="admin-akce-tlacitko">
            <span className="admin-akce-ikona" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            </span>
            <span className="admin-akce-text">
              <strong className="admin-akce-nazev">Rozhlas, SMS a zpravodaj</strong>
              <span className="admin-akce-podtitul">Hromadné zprávy, ankety a tisk zpravodaje</span>
            </span>
          </a>

          <a href="/ukazka/administrace/prepazka" className="admin-akce-tlacitko">
            <span className="admin-akce-ikona" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <span className="admin-akce-text">
              <strong className="admin-akce-nazev">Přepážka, matrika a revize</strong>
              <span className="admin-akce-podtitul">Vidimace, legalizace, lhůtník revizí a SPOZ</span>
            </span>
          </a>

          <a href="/ukazka/administrace/aktuality" className="admin-akce-tlacitko">
            <span className="admin-akce-ikona" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </span>
            <span className="admin-akce-text">
              <strong className="admin-akce-nazev">Blog a aktuality</strong>
              <span className="admin-akce-podtitul">Články, rubriky a widgetový editor</span>
            </span>
          </a>

          <a href="/ukazka/administrace/skladatel" className="admin-akce-tlacitko">
            <span className="admin-akce-ikona" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </span>
            <span className="admin-akce-text">
              <strong className="admin-akce-nazev">Skladatel šablon webu</strong>
              <span className="admin-akce-podtitul">Vícezónové rozvržení a živý náhled</span>
            </span>
          </a>

          <a href="/ukazka/administrace/chytra-obec" className="admin-akce-tlacitko">
            <span className="admin-akce-ikona" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
                <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
              </svg>
            </span>
            <span className="admin-akce-text">
              <strong className="admin-akce-nazev">Živá data a IoT čidla</strong>
              <span className="admin-akce-podtitul">Vodočet, ovzduší, GPS techniky a FVE</span>
            </span>
          </a>
        </div>
      </section>

      <div className="admin-prehled-sloupce">
        <section className="panel-bily" aria-labelledby="nedavna-aktivita">
          <h2 id="nedavna-aktivita" style={{ margin: '0 0 14px', fontSize: 16, fontWeight: 600 }}>
            Dnešní protokol událostí v obci a na úřadě
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 13.5 }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid var(--line)', display: 'flex', gap: 12 }}>
              <span className="admin-stitek-tag" style={{ flexShrink: 0 }}>
                14:15
              </span>
              <div>
                <strong>IoT radarový vodočet (LoRaWAN)</strong>
                <div className="vedlejsi" style={{ fontSize: 13, marginTop: 2 }}>
                  Javornický potok má stabilní hladinu 42 cm, průtok v normálu, baterie čidla 96 %.
                </div>
              </div>
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid var(--line)', display: 'flex', gap: 12 }}>
              <span className="admin-stitek-tag" style={{ flexShrink: 0 }}>
                11:20
              </span>
              <div>
                <strong>Ověřovací kniha a pokladna</strong>
                <div className="vedlejsi" style={{ fontSize: 13, marginTop: 2 }}>
                  Zapsána legalizace OV-2026/086, správní poplatek 100 Kč přijat dokladem PPD-2026/142.
                </div>
              </div>
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid var(--line)', display: 'flex', gap: 12 }}>
              <span className="admin-stitek-tag" style={{ flexShrink: 0 }}>
                08:30
              </span>
              <div>
                <strong>E-podatelna a datová schránka ISDS</strong>
                <div className="vedlejsi" style={{ fontSize: 13, marginTop: 2 }}>
                  Přijata veřejná vyhláška Krajského úřadu (KÚPK/12984/2026) a žádost o kácení dřevin (OÚ-JL/2026/0841).
                </div>
              </div>
            </li>
            <li style={{ padding: '10px 0', display: 'flex', gap: 12 }}>
              <span className="admin-stitek-tag" style={{ flexShrink: 0 }}>
                Včera
              </span>
              <div>
                <strong>Registr smluv MVČR</strong>
                <div className="vedlejsi" style={{ fontSize: 13, marginTop: 2 }}>
                  Zveřejněna smlouva o dílo SML-2026/018 (ISRS-9482014) na rekonstrukci chodníku Na Rovném.
                </div>
              </div>
            </li>
          </ul>
        </section>

        <section className="panel-bily" aria-labelledby="blizici-se-udalosti">
          <h2 id="blizici-se-udalosti" style={{ margin: '0 0 14px', fontSize: 16, fontWeight: 600 }}>
            Nejbližší úkoly, revize a termíny úřadu
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 13.5 }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <div>
                <strong>Schválení došlých faktur (E.ON a Svoz odpadu)</strong>
                <div className="vedlejsi" style={{ fontSize: 13, marginTop: 2 }}>
                  2 faktury čekají na elektronický podpis košilky (splatnost 16. 11.)
                </div>
              </div>
              <a href="/ukazka/administrace/smlouvy" className="admin-stitek-tag">
                Faktury
              </a>
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <div>
                <strong>Veřejné zasedání zastupitelstva obce</strong>
                <div className="vedlejsi" style={{ fontSize: 13, marginTop: 2 }}>
                  Pondělí 16. listopadu v 18:00 (zasedací síň úřadu)
                </div>
              </div>
              <a href="/ukazka/administrace/extranet" className="admin-stitek-tag">
                Extranet
              </a>
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <div>
                <strong>Kontrola hasicích přístrojů v kulturním domě</strong>
                <div className="vedlejsi" style={{ fontSize: 13, marginTop: 2 }}>
                  Termín roční revize: 20. listopadu 2026 (PO Servis Klatovy)
                </div>
              </div>
              <a href="/ukazka/administrace/prepazka" className="admin-stitek-tag">
                Revize
              </a>
            </li>
            <li style={{ padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <div>
                <strong>Podzimní svoz nebezpečného odpadu a větví</strong>
                <div className="vedlejsi" style={{ fontSize: 13, marginTop: 2 }}>
                  Sobota 21. listopadu od 8:00 do 12:00 (obecní dvůr)
                </div>
              </div>
              <a href="/ukazka/administrace/rozhlas" className="admin-stitek-tag">
                Rozhlas
              </a>
            </li>
          </ul>
        </section>
      </div>
    </>
  )
}
