/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S05-Majka.html. */
import type { ReactNode } from 'react'
import { FotoDlazdice } from '../sdilene/FotoDlazdice'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'

export function Uvod({ banner }: { banner: ReactNode; foto: boolean }) {
  return (
    <>
      <div aria-hidden="true" style={{ display: "flex", height: "8px" }}>
        <span style={{ flex: "1", background: "var(--r1)" }}></span>
        <span style={{ flex: "1", background: "var(--r2)" }}></span>
        <span style={{ flex: "1", background: "var(--r3)" }}></span>
        <span style={{ flex: "1", background: "var(--r4)" }}></span>
      </div>
      {banner}
      <Hlavicka />
      <main id="obsah" tabIndex={-1}>
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px clamp(16px, 4vw, 32px) 64px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "12px 24px", marginBottom: "24px" }}>
            <h1 style={{ margin: "0", fontFamily: "var(--font-big-shoulders), 'Arial Narrow', sans-serif", fontWeight: "600", fontSize: "clamp(52px, 7vw, 96px)", lineHeight: "1.05" }}>{"Co se v Javoří Lhotě chystá"}</h1>
            {' '}
            <a className="hit" href="/obecni-urad" style={{ fontWeight: "600" }}>Přidat akci spolku</a>
          </div>
          {' '}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <a href="/akce#lampionovy-pruvod" style={{ flex: "1 1 440px", minWidth: "0", minHeight: "440px", padding: "32px", background: "var(--r1)", color: "var(--r1i)", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "24px" }}>
              <span style={{ fontWeight: "600" }}>Sbor dobrovolných hasičů zve</span>
              {' '}
              <span>
                <span style={{ display: "block", fontFamily: "var(--font-big-shoulders), 'Arial Narrow', sans-serif", fontWeight: "600", fontSize: "clamp(88px, 10vw, 140px)", lineHeight: "1" }}>7. 11.</span>
                <span style={{ display: "block", fontFamily: "var(--font-big-shoulders), 'Arial Narrow', sans-serif", fontWeight: "600", fontSize: "clamp(40px, 4vw, 56px)", lineHeight: "1.05" }}>Lampionový průvod</span>
              </span>
              {' '}
              <span style={{ maxWidth: "40ch" }}>
                {"Sraz v 17 hodin u hasičárny, průvod jde ke kapli svaté Anny. Lampiony a čaj zdarma."}
              </span>
            </a>
            {' '}
            <div style={{ flex: "1 1 440px", minWidth: "0", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "16px" }}>
              <a href="/akce#vylov-mlynskeho-rybnika" style={{ padding: "20px", minHeight: "212px", background: "var(--r3)", color: "var(--r3i)", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-big-shoulders), 'Arial Narrow', sans-serif", fontWeight: "600", fontSize: "52px", lineHeight: "1" }}>14. 11.</span>
                <span>
                  <span style={{ display: "block", fontSize: "20px", fontWeight: "600", lineHeight: "1.25" }}>Výlov Mlýnského rybníka</span>
                  <span style={{ display: "block", fontSize: "15px" }}>od 9 hodin, rybáři</span>
                </span>
              </a>
              {' '}
              <a href="/akce#myslivecka-zabava" style={{ padding: "20px", minHeight: "212px", background: "var(--r2)", color: "var(--r2i)", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-big-shoulders), 'Arial Narrow', sans-serif", fontWeight: "600", fontSize: "52px", lineHeight: "1" }}>21. 11.</span>
                <span>
                  <span style={{ display: "block", fontSize: "20px", fontWeight: "600", lineHeight: "1.25" }}>Myslivecká zábava</span>
                  <span style={{ display: "block", fontSize: "15px" }}>sokolovna, myslivci</span>
                </span>
              </a>
              {' '}
              <a href="/akce#rozsviceni-vanocniho-stromu" style={{ padding: "20px", minHeight: "212px", background: "var(--r4)", color: "var(--r4i)", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-big-shoulders), 'Arial Narrow', sans-serif", fontWeight: "600", fontSize: "52px", lineHeight: "1" }}>28. 11.</span>
                <span>
                  <span style={{ display: "block", fontSize: "20px", fontWeight: "600", lineHeight: "1.25" }}>Rozsvícení stromu</span>
                  <span style={{ display: "block", fontSize: "15px" }}>pod lípou, Spolek rodičů</span>
                </span>
              </a>
              {' '}
              <a href="/akce#mikulasska-nadilka" style={{ padding: "20px", minHeight: "212px", background: "var(--surface)", color: "var(--ink)", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "inset 0 0 0 2px var(--r1)" }}>
                <span style={{ fontFamily: "var(--font-big-shoulders), 'Arial Narrow', sans-serif", fontWeight: "600", fontSize: "52px", lineHeight: "1", color: "var(--r1)" }}>5. 12.</span>
                <span>
                  <span style={{ display: "block", fontSize: "20px", fontWeight: "600", lineHeight: "1.25" }}>Mikulášská nadílka</span>
                  <span style={{ display: "block", fontSize: "15px" }}>kulturní dům, TJ Sokol</span>
                </span>
              </a>
            </div>
          </div>
        </section>
        {' '}
        <section aria-labelledby="zpravy" style={{ background: "var(--surface)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", gap: "32px" }}>
            <div style={{ flex: "1 1 220px", minWidth: "0" }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" strokeWidth="1" aria-hidden="true" style={{ stroke: "var(--line)" }}>
                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                <path d="M7 8h10M7 12h10M7 16h6"></path>
              </svg>
              {' '}
              <h2 id="zpravy" style={{ margin: "8px 0 8px", fontFamily: "var(--font-big-shoulders), 'Arial Narrow', sans-serif", fontWeight: "600", fontSize: "52px", lineHeight: "1.05" }}>Zprávy</h2>
              {' '}
              <p style={{ margin: "0 0 12px", color: "var(--muted)" }}>{"Ze spolků, školy a z obce"}</p>
              {' '}
              <a className="hit" href="/aktuality" style={{ fontWeight: "600" }}>Všechny zprávy</a>
            </div>
            {' '}
            <div style={{ flex: "4 1 600px", minWidth: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: "16px" }}>
              <article style={{ padding: "20px", background: "var(--bg)", borderTop: "6px solid var(--r1)" }}>
                <p style={{ margin: "0 0 4px", color: "var(--muted)", fontSize: "15px" }}>SDH, 18. října</p>
                <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: "600", lineHeight: "1.3" }}>
                  <a href="/aktuality/hasici-vyhrali-okrskovou-soutez" style={{ color: "var(--ink)", textDecoration: "none" }}>Hasiči vyhráli okrskovou soutěž potřetí za sebou</a>
                </h3>
                <p style={{ margin: "0" }}>{"Útok za 17,8 sekundy. Pohár je vystavený v hasičárně."}</p>
              </article>
              {' '}
              <article style={{ padding: "20px", background: "var(--bg)", borderTop: "6px solid var(--r3)" }}>
                <p style={{ margin: "0 0 4px", color: "var(--muted)", fontSize: "15px" }}>TJ Sokol, 15. října</p>
                <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: "600", lineHeight: "1.3" }}>
                  <a href="/aktuality/cviceni-rodicu-s-detmi" style={{ color: "var(--ink)", textDecoration: "none" }}>{"Cvičení rodičů s dětmi se vrací do sokolovny"}</a>
                </h3>
                <p style={{ margin: "0" }}>Každé úterý od 16:30, prvních 15 dětí zdarma.</p>
              </article>
              {' '}
              <article style={{ padding: "20px", background: "var(--bg)", borderTop: "6px solid var(--r4)" }}>
                <p style={{ margin: "0 0 4px", color: "var(--muted)", fontSize: "15px" }}>Obec, 26. října</p>
                <h3 style={{ margin: "0 0 8px", fontSize: "20px", fontWeight: "600", lineHeight: "1.3" }}>
                  <a href="/aktuality/nove-hriste-za-skolou" style={{ color: "var(--ink)", textDecoration: "none" }}>Nové hřiště za školou je otevřené</a>
                </h3>
                <p style={{ margin: "0" }}>Hřiště je pro děti od 3 do 12 let, otevřeno denně.</p>
              </article>
            </div>
          </div>
        </section>
        {' '}
        <section aria-labelledby="spolky" style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px clamp(16px, 4vw, 32px) 72px" }}>
          <FotoDlazdice soubor="sablona-05-majka.webp" alt="Stavění máje na vesnické slavnosti, stuhy a věnec, lidé jsou vidět zezadu." styl={{ width: "100%", aspectRatio: "16 / 6", borderRadius: "4px", marginBottom: "32px" }} />
          {' '}
          <h2 id="spolky" style={{ position: "relative", margin: "0 0 24px", fontFamily: "var(--font-big-shoulders), 'Arial Narrow', sans-serif", fontWeight: "600", fontSize: "52px" }}>{"Spolky v obci"}</h2>
          {' '}
          <ul style={{ position: "relative", listStyle: "none", margin: "0", padding: "0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: "0 40px" }}>
            <li style={{ display: "flex", gap: "16px", padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
              <span aria-hidden="true" style={{ flex: "0 0 8px", background: "var(--r1)" }}></span>
              <span>
                <a className="hit" href="/obecni-urad" style={{ fontWeight: "600", color: "var(--ink)" }}>Sbor dobrovolných hasičů</a>
                <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>42 členů, schůze každý první pátek</span>
              </span>
            </li>
            <li style={{ display: "flex", gap: "16px", padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
              <span aria-hidden="true" style={{ flex: "0 0 8px", background: "var(--r2)" }}></span>
              <span>
                <a className="hit" href="/obecni-urad" style={{ fontWeight: "600", color: "var(--ink)" }}>TJ Sokol Javoří Lhota</a>
                <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>{"fotbal, cvičení rodičů s dětmi"}</span>
              </span>
            </li>
            <li style={{ display: "flex", gap: "16px", padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
              <span aria-hidden="true" style={{ flex: "0 0 8px", background: "var(--r3)" }}></span>
              <span>
                <a className="hit" href="/obecni-urad" style={{ fontWeight: "600", color: "var(--ink)" }}>Myslivecký spolek Javorník</a>
                <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>{"honitba Javorník, zábavy a hony"}</span>
              </span>
            </li>
            <li style={{ display: "flex", gap: "16px", padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
              <span aria-hidden="true" style={{ flex: "0 0 8px", background: "var(--r4)" }}></span>
              <span>
                <a className="hit" href="/obecni-urad" style={{ fontWeight: "600", color: "var(--ink)" }}>{"Spolek rodičů při ZŠ a MŠ"}</a>
                <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>{"akce pro děti ze školy a školky"}</span>
              </span>
            </li>
          </ul>
        </section>
        {' '}
        <section style={{ background: "var(--deep)", padding: "64px clamp(16px, 4vw, 32px)" }}>
          <nav aria-label="Rychlé odkazy" style={{ maxWidth: "1040px", margin: "0 auto", padding: "32px", background: "var(--surface)", color: "var(--ink)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "24px" }}>
            <div>
              <h2 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "600" }}>Obecní úřad</h2>
              <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
                <a className="hit" href="/uredni-deska">Úřední deska</a>
                <a className="hit" href="/obecni-urad">Úřední hodiny</a>
              </p>
            </div>
            {' '}
            <div>
              <h2 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "600" }}>Vyřídit</h2>
              <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
                <a className="hit" href="/sluzby/rezervace">Pronajmout sokolovnu</a>
                <a className="hit" href="/sluzby/platby">Zaplatit poplatky</a>
              </p>
            </div>
            {' '}
            <div>
              <h2 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "600" }}>Pro spolky</h2>
              <p style={{ margin: "0", display: "flex", flexDirection: "column" }}>
                <a className="hit" href="/obecni-urad">Dotace na činnost</a>
                <a className="hit" href="/akce">Přidat akci do kalendáře</a>
              </p>
            </div>
            {' '}
            <div>
              <h2 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "600" }}>Kontakt</h2>
              <p style={{ margin: "0" }}>
                [TELEFON]
                <br />
                <a href="/obecni-urad">[E-MAIL]</a>
              </p>
            </div>
          </nav>
        </section>
      </main>
      <Paticka />
    </>
  )
}
