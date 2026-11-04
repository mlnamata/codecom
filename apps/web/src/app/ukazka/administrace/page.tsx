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
          <h1 style={{ margin: 0, fontSize: 26 }}>Přehled a řízení obce</h1>
          <p className="vedlejsi" style={{ margin: '4px 0 0', fontSize: 14 }}>
            Javoří Lhota · Integrovaný obecní systém CodeKom · Dnes je pondělí 4. listopadu 2026
          </p>
        </div>
        <div className="admin-uvod-status">
          <span className="admin-uvod-dot" aria-hidden="true" />
          <span>Všechny obecní systémy v provozu</span>
        </div>
      </div>

      <section aria-labelledby="hlavni-metriky">
        <h2 id="hlavni-metriky" className="sr-only">
          Hlavní metriky obce
        </h2>
        <div className="admin-kpi-mrizka">
          <div className="admin-kpi-karta">
            <div className="admin-kpi-hlavicka">
              <span className="admin-kpi-popis">Úřední deska</span>
              <span className="admin-stitek-tag">DIA standard</span>
            </div>
            <p className="admin-kpi-hodnota">{visi}</p>
            <div className="admin-kpi-paticka">
              <a href="/uredni-deska">Zobrazit vyvěšené dokumenty</a>
            </div>
          </div>

          <div className="admin-kpi-karta">
            <div className="admin-kpi-hlavicka">
              <span className="admin-kpi-popis">Blog a aktuality</span>
              <span className="admin-stitek-tag">4 rubriky</span>
            </div>
            <p className="admin-kpi-hodnota">{u.aktuality.length}</p>
            <div className="admin-kpi-paticka">
              <a href="/ukazka/administrace/aktuality">Spravovat články a blog</a>
            </div>
          </div>

          <div className="admin-kpi-karta">
            <div className="admin-kpi-hlavicka">
              <span className="admin-kpi-popis">Hlášení závad občanů</span>
              <span
                className="admin-stitek-tag"
                style={{
                  color: noveZavady > 0 ? '#703800' : '#0f5b28',
                  background: noveZavady > 0 ? '#fef7e0' : '#e6f4ea',
                }}
              >
                {noveZavady} nových
              </span>
            </div>
            <p className="admin-kpi-hodnota">{noveZavady}</p>
            <div className="admin-kpi-paticka">
              <span>{vyrizeneZavady} vyřešeno tento měsíc · </span>
              <a href="/ukazka/administrace/zavady">Vyřídit</a>
            </div>
          </div>

          <div className="admin-kpi-karta">
            <div className="admin-kpi-hlavicka">
              <span className="admin-kpi-popis">Krizové řízení</span>
              <span className="admin-stitek-tag" style={{ color: '#0f5b28', background: '#e6f4ea' }}>
                Klidový stav
              </span>
            </div>
            <p className="admin-kpi-hodnota">{aktivni}</p>
            <div className="admin-kpi-paticka">
              <a href="/ukazka/administrace/krize">Hlášení a krizové varování</a>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="rychle-akce-titulek">
        <h2 id="rychle-akce-titulek" style={{ fontSize: 18, marginBottom: 12 }}>
          Rychlé akce úřadu
        </h2>
        <div className="admin-rychle-akce">
          <a href="/ukazka/administrace/aktuality" className="admin-akce-tlacitko">
            <span className="admin-akce-ikona" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </span>
            <span>Napsat článek na blog</span>
          </a>

          <a href="/ukazka/administrace/deska" className="admin-akce-tlacitko">
            <span className="admin-akce-ikona" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </span>
            <span>Vyvěsit na úřední desku</span>
          </a>

          <a href="/ukazka/administrace/skladatel" className="admin-akce-tlacitko">
            <span className="admin-akce-ikona" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </span>
            <span>Widgetový skladatel webu</span>
          </a>

          <a href="/ukazka/administrace/chytra-obec" className="admin-akce-tlacitko">
            <span className="admin-akce-ikona" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </span>
            <span>Živá data a IoT senzory</span>
          </a>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginTop: 8 }}>
        <section className="panel-bily" aria-labelledby="nedavna-aktivita">
          <h2 id="nedavna-aktivita" style={{ margin: '0 0 12px', fontSize: 18 }}>
            Nedávná aktivita v obci
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14 }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid var(--line)', display: 'flex', gap: 12 }}>
              <span className="admin-stitek-tag" style={{ flexShrink: 0 }}>
                14:15
              </span>
              <div>
                <strong>IoT radarový vodočet</strong>
                <div className="vedlejsi" style={{ fontSize: 13 }}>
                  Javornický potok má stabilní hladinu 42 cm, průtok v normálu.
                </div>
              </div>
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid var(--line)', display: 'flex', gap: 12 }}>
              <span className="admin-stitek-tag" style={{ flexShrink: 0 }}>
                11:20
              </span>
              <div>
                <strong>Úřední deska</strong>
                <div className="vedlejsi" style={{ fontSize: 13 }}>
                  Zveřejněn dokument: Informace o rekonstrukci chodníku Na Rovném.
                </div>
              </div>
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid var(--line)', display: 'flex', gap: 12 }}>
              <span className="admin-stitek-tag" style={{ flexShrink: 0 }}>
                09:40
              </span>
              <div>
                <strong>Hlášení závady od občana</strong>
                <div className="vedlejsi" style={{ fontSize: 13 }}>
                  Nahlášena nesvítící lampa veřejného osvětlení v ulici U Školy.
                </div>
              </div>
            </li>
            <li style={{ padding: '10px 0', display: 'flex', gap: 12 }}>
              <span className="admin-stitek-tag" style={{ flexShrink: 0 }}>
                Včera
              </span>
              <div>
                <strong>Obecní půjčovna nářadí</strong>
                <div className="vedlejsi" style={{ fontSize: 13 }}>
                  Rezervace štípače dřeva Lumag na nadcházející víkend potvrzena.
                </div>
              </div>
            </li>
          </ul>
        </section>

        <section className="panel-bily" aria-labelledby="blizici-se-udalosti">
          <h2 id="blizici-se-udalosti" style={{ margin: '0 0 12px', fontSize: 18 }}>
            Důležité termíny a úkoly
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14 }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>Zasedání zastupitelstva obce</strong>
                <div className="vedlejsi" style={{ fontSize: 13 }}>
                  Pondělí 16. listopadu v 18:00 (zasedací síň úřadu)
                </div>
              </div>
              <a href="/ukazka/administrace/extranet" className="admin-stitek-tag">
                Podklady
              </a>
            </li>
            <li style={{ padding: '10px 0', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>Svoz nebezpečného odpadu a bioodpadu</strong>
                <div className="vedlejsi" style={{ fontSize: 13 }}>
                  Sobota 21. listopadu od 8:00 do 12:00
                </div>
              </div>
              <span className="admin-stitek-tag">Obecní dvůr</span>
            </li>
            <li style={{ padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>Ověření funkčnosti AED defibrilátorů</strong>
                <div className="vedlejsi" style={{ fontSize: 13 }}>
                  Pravidelná měsíční technická revize hasičů
                </div>
              </div>
              <a href="/bezpecnost" className="admin-stitek-tag">
                Stav AED
              </a>
            </li>
          </ul>
        </section>
      </div>
    </>
  )
}
