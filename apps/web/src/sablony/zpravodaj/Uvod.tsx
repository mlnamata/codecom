/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S18-Zpravodaj.html. */
import type { ReactNode } from 'react'
import { FotoDlazdice } from '../sdilene/FotoDlazdice'
import { POPISY_FOTEK } from '../sdilene/popisy-fotek'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'

export function Uvod({ banner }: { banner: ReactNode; foto: boolean }) {
  return (
    <>
      {banner}
      <Hlavicka />
      <main id="obsah" tabIndex={-1} style={{ maxWidth: "1200px", margin: "0 auto", padding: "28px clamp(16px, 4vw, 32px) 64px" }}>
        <h1 className="sr">Javořílhotský zpravodaj, listopad 2026</h1>
        {' '}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "32px" }}>
          <article style={{ flex: "2.2 1 560px", minWidth: "0" }}>
            <FotoDlazdice soubor="sablona-13-mlyn.webp" alt={POPISY_FOTEK.mlyn ?? ""} styl={{ width: "100%", aspectRatio: "720 / 300", background: "var(--paper)" }} />
            {' '}
            <p style={{ margin: "14px 0 4px", fontSize: "14px", color: "var(--muted)" }}>Doprava, 2. listopadu</p>
            {' '}
            <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-newsreader), Georgia, serif", fontWeight: "500", fontSize: "clamp(32px, 3.6vw, 48px)", lineHeight: "1.08" }}>
              <a href="/aktuality/most-zavreny-do-konce-listopadu" style={{ color: "var(--ink)", textDecoration: "none" }}>
                {"Most přes potok je do konce listopadu zavřený. Kudy jezdit a kde staví autobus"}
              </a>
            </h2>
            {' '}
            <div style={{ columns: "2 260px", columnGap: "28px", columnRule: "1px solid var(--line)" }}>
              <p style={{ margin: "0 0 12px" }}>
                {"Od pondělí 2. listopadu opravuje kraj nosnou konstrukci mostu. Auta jezdí objížďkou přes Hájek, je delší asi o tři kilometry."}
              </p>
              {' '}
              <p style={{ margin: "0 0 12px" }}>
                {"Linka 431 do Klatov jezdí ve stejných časech. Zastávka Javoří Lhota, most se ruší, náhradní je u hájovny."}
              </p>
              {' '}
              <p style={{ margin: "0" }}>
                {"Pěší a cyklisté mohou přes lávku vedle mostu. Most se otevře nejpozději 30. listopadu, napsala starostka Marie Šťastná."}
              </p>
            </div>
          </article>
          {' '}
          <aside aria-labelledby="formulare18" className="z-boky" style={{ flex: "1 1 280px", minWidth: "0", paddingLeft: "28px", borderLeft: "1px solid var(--line)" }}>
            <h2 id="formulare18" style={{ margin: "0 0 4px", fontFamily: "var(--font-newsreader), Georgia, serif", fontWeight: "500", fontSize: "28px" }}>Formuláře</h2>
            {' '}
            <p style={{ margin: "0 0 12px", color: "var(--muted)", fontSize: "14px" }}>Vyplníte online, nebo si je vytiskněte</p>
            {' '}
            <ul style={{ margin: "0", padding: "0", listStyle: "none" }}>
              <li style={{ padding: "10px 0", borderTop: "1px solid var(--line)" }}>
                <a href="/sluzby/platby" className="hit" style={{ color: "var(--link)", fontWeight: "600" }}>{"Přihláška k poplatku za odpad"}</a>
                <span style={{ display: "block", fontSize: "14px", color: "var(--muted)" }}>online, nebo PDF 84 kB</span>
              </li>
              <li style={{ padding: "10px 0", borderTop: "1px solid var(--line)" }}>
                <a href="/sluzby#prihlasit-psa" className="hit" style={{ color: "var(--link)", fontWeight: "600" }}>{"Přihlášení psa k poplatku"}</a>
                <span style={{ display: "block", fontSize: "14px", color: "var(--muted)" }}>online, nebo PDF 62 kB</span>
              </li>
              <li style={{ padding: "10px 0", borderTop: "1px solid var(--line)" }}>
                <a href="/sluzby/rezervace" className="hit" style={{ color: "var(--link)", fontWeight: "600" }}>{"Žádost o pronájem sálu v hasičárně"}</a>
                <span style={{ display: "block", fontSize: "14px", color: "var(--muted)" }}>PDF 71 kB</span>
              </li>
              <li style={{ padding: "10px 0", borderTop: "1px solid var(--line)" }}>
                <a href="/sluzby#ohlasit-zabor" className="hit" style={{ color: "var(--link)", fontWeight: "600" }}>Ohlášení záboru veřejného prostranství</a>
                <span style={{ display: "block", fontSize: "14px", color: "var(--muted)" }}>online, nebo PDF 90 kB</span>
              </li>
              <li style={{ padding: "10px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
                <a href="/zivotni-situace/narodilo-se-nam-dite" className="hit" style={{ color: "var(--link)", fontWeight: "600" }}>{"Souhlas s vítáním občánků"}</a>
                <span style={{ display: "block", fontSize: "14px", color: "var(--muted)" }}>PDF 48 kB</span>
              </li>
            </ul>
            {' '}
            <div style={{ marginTop: "24px", background: "var(--paper)" }}>
              <FotoDlazdice soubor="sablona-18-zpravodaj.webp" alt={POPISY_FOTEK.zpravodaj ?? ""} styl={{ width: "100%", aspectRatio: "16 / 9" }} />
              {' '}
              <div style={{ padding: "16px" }}>
              <p style={{ margin: "0", fontWeight: "600" }}>Zpravodaj e-mailem</p>
              {' '}
              <p style={{ margin: "4px 0 8px", fontSize: "15px" }}>{"Pošleme ho první den v měsíci. Odhlásit se jde jedním klikem."}</p>
              {' '}
              <a href="/aktuality" className="hit" style={{ color: "var(--link)", fontWeight: "600" }}>Chci zpravodaj e-mailem</a>
              </div>
            </div>
          </aside>
        </div>
        {' '}
        <section aria-labelledby="dalsi18" style={{ marginTop: "40px", borderTop: "3px double var(--ink)" }}>
          <h2 id="dalsi18" className="sr">Další zprávy</h2>
          {' '}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))", gap: "0" }}>
            <article style={{ padding: "20px 24px 20px 0", borderBottom: "1px solid var(--line)" }}>
              <p style={{ margin: "0 0 4px", fontSize: "14px", color: "var(--muted)" }}>Úřad, 30. října</p>
              <h3 style={{ margin: "0 0 6px", fontFamily: "var(--font-newsreader), Georgia, serif", fontWeight: "500", fontSize: "24px", lineHeight: "1.15" }}>
                <a href="/aktuality/rozpocet-2027-vic-na-cesty" style={{ color: "var(--ink)", textDecoration: "none" }}>Rozpočet na příští rok: víc peněz na cesty, škola beze změny</a>
              </h3>
              <p style={{ margin: "0" }}>{"Návrh visí do 11. listopadu, o rozpočtu se hlasuje 9. prosince."}</p>
            </article>
            {' '}
            <article style={{ padding: "20px 24px 20px 0", borderBottom: "1px solid var(--line)" }}>
              <p style={{ margin: "0 0 4px", fontSize: "14px", color: "var(--muted)" }}>Odpady, 27. října</p>
              <h3 style={{ margin: "0 0 6px", fontFamily: "var(--font-newsreader), Georgia, serif", fontWeight: "500", fontSize: "24px", lineHeight: "1.15" }}>
                <a href="/aktuality/bioodpad-naposledy-20-listopadu" style={{ color: "var(--ink)", textDecoration: "none" }}>{"Bioodpad naposledy 20. listopadu, nebezpečný odpad v sobotu"}</a>
              </h3>
              <p style={{ margin: "0" }}>{"Barvy, oleje a baterie bereme 7. listopadu u hasičárny."}</p>
            </article>
            {' '}
            <article style={{ padding: "20px 24px 20px 0", borderBottom: "1px solid var(--line)" }}>
              <p style={{ margin: "0 0 4px", fontSize: "14px", color: "var(--muted)" }}>Spolky, 25. října</p>
              <h3 style={{ margin: "0 0 6px", fontFamily: "var(--font-newsreader), Georgia, serif", fontWeight: "500", fontSize: "24px", lineHeight: "1.15" }}>
                <a href="/akce#lampionovy-pruvod" style={{ color: "var(--ink)", textDecoration: "none" }}>{"Hasiči zvou na lampionový průvod a myslivci na zábavu"}</a>
              </h3>
              <p style={{ margin: "0" }}>{"Průvod jde 7. listopadu, zábava je 21. listopadu v sále."}</p>
            </article>
            {' '}
            <article style={{ padding: "20px 24px 20px 0", borderBottom: "1px solid var(--line)" }}>
              <p style={{ margin: "0 0 4px", fontSize: "14px", color: "var(--muted)" }}>{"Z historie"}</p>
              <h3 style={{ margin: "0 0 6px", fontFamily: "var(--font-newsreader), Georgia, serif", fontWeight: "500", fontSize: "24px", lineHeight: "1.15" }}>
                <a href="/aktuality" style={{ color: "var(--ink)", textDecoration: "none" }}>Jak se před sto lety stavěl most, který teď opravujeme</a>
              </h3>
              <p style={{ margin: "0" }}>{"Kronikář Josef Vávra našel původní plány z roku 1926."}</p>
            </article>
          </div>
        </section>
      </main>
      <Paticka />
    </>
  )
}
