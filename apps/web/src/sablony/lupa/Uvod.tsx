/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S15-Lupa.html. */
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
      <main id="obsah" tabIndex={-1} style={{ maxWidth: "1040px", margin: "0 auto", padding: "2em clamp(16px, 4vw, 32px) 3em" }}>
        <h1 style={{ margin: "0 0 0.3em", fontSize: "2.2em", lineHeight: "1.15", fontWeight: "600" }}>Obec Javoří Lhota</h1>
        {' '}
        <p style={{ margin: "0 0 1.6em", fontSize: "1.15em", maxWidth: "40ch" }}>
          {"Na tomto webu najdete, co potřebujete vyřídit, kdy jezdí popelnice a co hlásil rozhlas."}
        </p>
        {' '}
        <FotoDlazdice soubor="sablona-15-lupa.webp" alt={POPISY_FOTEK.lupa ?? ""} styl={{ width: "100%", height: "clamp(200px, 30vw, 340px)", margin: "0 0 1.6em", borderRadius: "0.4em" }} />
        {' '}
        <div style={{ padding: "1em 1.2em", marginBottom: "2em", borderLeft: "0.4em solid var(--primary)", background: "var(--surface)", color: "var(--ink)" }}>
          <p style={{ margin: "0", fontWeight: "600" }}>Úřad je dnes otevřený od 8 do 17 hodin</p>
          {' '}
          <p style={{ margin: "0.3em 0 0" }}>
            {"Zavolejte nám: "}
            <a href="/obecni-urad" style={{ color: "inherit", fontWeight: "600" }}>[TELEFON]</a>
            {". Telefon bereme i mimo úřední hodiny, od 7 do 18."}
          </p>
        </div>
        {' '}
        <section aria-labelledby="ukoly15">
          <h2 id="ukoly15" style={{ margin: "0 0 0.5em", fontSize: "1.6em", fontWeight: "600" }}>Co chcete udělat?</h2>
          {' '}
          <ul style={{ margin: "0 0 2.4em", padding: "0", listStyle: "none", borderTop: "2px solid var(--ink)" }}>
            <li style={{ borderBottom: "2px solid var(--line)" }}>
              <a href="/sluzby/platby" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1em", padding: "0.8em 0", color: "var(--link)", fontWeight: "600", fontSize: "1.1em" }}>
                Zaplatit poplatek za odpad
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
                  <path d="M9 6l6 6-6 6"></path>
                </svg>
              </a>
            </li>
            <li style={{ borderBottom: "2px solid var(--line)" }}>
              <a href="/sluzby#svoz-odpadu" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1em", padding: "0.8em 0", color: "var(--link)", fontWeight: "600", fontSize: "1.1em" }}>
                Zjistit, kdy se vyváží popelnice
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
                  <path d="M9 6l6 6-6 6"></path>
                </svg>
              </a>
            </li>
            <li style={{ borderBottom: "2px solid var(--line)" }}>
              <a href="/sluzby#objednat-se-na-urad" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1em", padding: "0.8em 0", color: "var(--link)", fontWeight: "600", fontSize: "1.1em" }}>
                Objednat se na úřad
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
                  <path d="M9 6l6 6-6 6"></path>
                </svg>
              </a>
            </li>
            <li style={{ borderBottom: "2px solid var(--line)" }}>
              <a href="/sluzby/nahlasit-zavadu" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1em", padding: "0.8em 0", color: "var(--link)", fontWeight: "600", fontSize: "1.1em" }}>
                {"Nahlásit, že nesvítí lampa nebo je díra v cestě"}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
                  <path d="M9 6l6 6-6 6"></path>
                </svg>
              </a>
            </li>
            <li style={{ borderBottom: "2px solid var(--line)" }}>
              <a href="/obecni-urad" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1em", padding: "0.8em 0", color: "var(--link)", fontWeight: "600", fontSize: "1.1em" }}>
                {"Objednat odvoz k lékaři obecním autem"}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}>
                  <path d="M9 6l6 6-6 6"></path>
                </svg>
              </a>
            </li>
          </ul>
        </section>
        {' '}
        <section aria-labelledby="rozhlas15" style={{ marginBottom: "2.4em" }}>
          <h2 id="rozhlas15" style={{ margin: "0 0 0.3em", fontSize: "1.6em", fontWeight: "600" }}>Co hlásil rozhlas</h2>
          {' '}
          <p style={{ margin: "0 0 0.8em", color: "var(--muted)" }}>{"Každé hlášení tu je i napsané. Nemusíte stát u okna."}</p>
          {' '}
          <ol style={{ margin: "0", padding: "0", listStyle: "none" }}>
            <li style={{ display: "grid", gridTemplateColumns: "minmax(5.5em, auto) 1fr", gap: "0.2em 1em", padding: "0.8em 0", borderTop: "1px solid var(--line)" }}>
              <span style={{ fontWeight: "600", fontVariantNumeric: "tabular-nums" }}>Dnes 9:00</span>
              <span>
                {"Ve čtvrtek 5. listopadu od 8 do 14 hodin nepoteče voda v ulicích Hlavní a K Javorníku. Cisterna s pitnou vodou bude stát na návsi."}
              </span>
            </li>
            <li style={{ display: "grid", gridTemplateColumns: "minmax(5.5em, auto) 1fr", gap: "0.2em 1em", padding: "0.8em 0", borderTop: "1px solid var(--line)" }}>
              <span style={{ fontWeight: "600", fontVariantNumeric: "tabular-nums" }}>Dnes 8:00</span>
              <span>
                {"Most přes Javornický potok je zavřený do 30. listopadu. Autobus 431 staví u hájovny."}
              </span>
            </li>
            <li style={{ display: "grid", gridTemplateColumns: "minmax(5.5em, auto) 1fr", gap: "0.2em 1em", padding: "0.8em 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
              <span style={{ fontWeight: "600", fontVariantNumeric: "tabular-nums" }}>Pá 17:00</span>
              <span>
                {"V sobotu 7. listopadu od 9 do 11 hodin se u hasičárny sbírá nebezpečný odpad: barvy, oleje, baterie a léky."}
              </span>
            </li>
          </ol>
          {' '}
          <p style={{ margin: "0.8em 0 0" }}>
            <a href="/hlaseni-rozhlasu" className="hit" style={{ color: "var(--link)", fontWeight: "600" }}>Chci hlášení dostávat SMS zprávou</a>
          </p>
        </section>
        {' '}
        <section aria-labelledby="pomoc15" style={{ padding: "1.2em", border: "2px solid var(--ink)", borderRadius: "4px" }}>
          <h2 id="pomoc15" style={{ margin: "0 0 0.3em", fontSize: "1.3em", fontWeight: "600" }}>{"Nevíte si s webem rady?"}</h2>
          {' '}
          <p style={{ margin: "0" }}>
            {"Zavolejte paní Janě Malé na "}
            <a href="/obecni-urad" style={{ color: "var(--link)", fontWeight: "600" }}>[TELEFON]</a>
            {". Provede vás krok za krokem, nebo to vyřídí s vámi na úřadě."}
          </p>
        </section>
      </main>
      <Paticka />
    </>
  )
}
