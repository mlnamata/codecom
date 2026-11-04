'use client'
/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S17-Magistrat.html. */

import type { ReactNode } from 'react'
import { Fragment } from 'react'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'
import { useHodnoty } from './Interaktivni'

export function Uvod({ banner }: { banner: ReactNode }) {
  const v = useHodnoty()
  return (
    <>
      {banner}
      <div className="deep" style={{ background: "var(--deep)", color: "var(--on-deep)" }}>
        <Hlavicka />
      </div>
      <main id="obsah" tabIndex={-1}>
        <section className="deep" aria-labelledby="ai17" style={{ background: "var(--deep)", color: "var(--on-deep)" }}>
          <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "56px clamp(16px, 4vw, 32px) 64px", display: "flex", flexWrap: "wrap", gap: "40px" }}>
            <div style={{ flex: "1 1 380px", minWidth: "0" }}>
              <h1 id="ai17" style={{ margin: "0", fontSize: "clamp(40px, 4.8vw, 64px)", lineHeight: "1.05", letterSpacing: "-0.02em" }}>{"Zeptejte se obce, odpoví i v neděli večer"}</h1>
              {' '}
              <p style={{ margin: "18px 0 24px", fontSize: "19px", maxWidth: "42ch", opacity: "0.9" }}>
                {"Asistent hledá jen v dokumentech obce: vyhláškách, svozovém kalendáři, úřední desce. U každé odpovědi uvidíte, odkud je."}
              </p>
              {' '}
              <p style={{ margin: "0 0 10px", fontWeight: "600" }}>Na co se lidé ptají nejčastěji</p>
              {' '}
              <div role="group" aria-label="Vyberte otázku" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                {v.suggest.map((s, i) => (
                  <Fragment key={i}>
                    <button type="button" onClick={s.pick} aria-pressed={s.pressed} style={{ minHeight: "44px", padding: "8px 16px", borderRadius: "10px", border: "1px solid var(--on-deep)", background: s.bg, color: s.ink, font: "inherit", textAlign: "left", cursor: "pointer" }}>{s.q}</button>
                  </Fragment>
                ))}
              </div>
            </div>
            {' '}
            <div style={{ flex: "1.2 1 440px", minWidth: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <label htmlFor="dotaz17" style={{ fontWeight: "600" }}>Vaše otázka</label>
              {' '}
              <div style={{ display: "flex", gap: "8px" }}>
                <input id="dotaz17" type="text" value={v.q} readOnly style={{ flex: "1", minWidth: "0", minHeight: "52px", padding: "0 16px", borderRadius: "10px", border: "2px solid var(--on-deep)", background: "var(--bg)", color: "var(--ink)", font: "inherit" }} />
                {' '}
                <button type="button" style={{ minHeight: "52px", padding: "0 20px", borderRadius: "10px", border: "0", background: "var(--accent)", color: "var(--on-accent)", font: "inherit", fontWeight: "600", cursor: "pointer" }}>Zeptat se</button>
              </div>
              {' '}
              <section className="on-light" aria-live="polite" aria-labelledby="odpoved17" style={{ padding: "24px", borderRadius: "16px", background: "var(--bg)", color: "var(--ink)" }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px", alignItems: "baseline" }}>
                  <h2 id="odpoved17" style={{ margin: "0", fontSize: "20px" }}>Odpověď</h2>
                  {' '}
                  <span style={{ padding: "2px 10px", borderRadius: "999px", background: "var(--surface)", fontSize: "14px" }}>připravil AI asistent obce</span>
                </div>
                {' '}
                <p style={{ margin: "12px 0 16px", fontSize: "18px", lineHeight: "1.55" }}>{v.answer}</p>
                {' '}
                <p style={{ margin: "0 0 6px", color: "var(--muted)", fontSize: "15px" }}>Zdroje</p>
                {' '}
                <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {v.sources.map((src, i) => (
                    <Fragment key={i}>
                      <li style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ flex: "none", color: "var(--muted)" }}>
                          <path d="M6 3h9l4 4v14H6z"></path>
                        </svg>
                        <a href={v.sourcesOdkazy[i] ?? '#'} style={{ color: "var(--link)" }}>{src}</a>
                      </li>
                    </Fragment>
                  ))}
                </ul>
                {' '}
                <p style={{ margin: "16px 0 0", paddingTop: "12px", borderTop: "1px solid var(--line)", color: "var(--muted)", fontSize: "15px" }}>
                  {"Asistent se může splést. U důležitých věcí zavolejte na úřad: [TELEFON]. Dotazy neukládáme ke jménu."}
                </p>
              </section>
            </div>
          </div>
        </section>
        {' '}
        <section aria-labelledby="casti17" style={{ maxWidth: "1240px", margin: "0 auto", padding: "56px clamp(16px, 4vw, 32px) 0" }}>
          <h2 id="casti17" style={{ margin: "0 0 20px", fontSize: "32px" }}>Části obce</h2>
          {' '}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "12px" }}>
            <a href="/" style={{ padding: "20px", borderRadius: "14px", background: "var(--surface)", color: "var(--ink)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontWeight: "600", fontSize: "19px" }}>Javoří Lhota</span>
              <span style={{ color: "var(--muted)" }}>412 obyvatel</span>
              <span>svoz plastů každou středu</span>
            </a>
            {' '}
            <a href="/obecni-urad" style={{ padding: "20px", borderRadius: "14px", background: "var(--surface)", color: "var(--ink)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontWeight: "600", fontSize: "19px" }}>Podjavoří</span>
              <span style={{ color: "var(--muted)" }}>138 obyvatel</span>
              <span>svoz plastů každou středu</span>
            </a>
            {' '}
            <a href="/obecni-urad" style={{ padding: "20px", borderRadius: "14px", background: "var(--surface)", color: "var(--ink)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontWeight: "600", fontSize: "19px" }}>Hájek</span>
              <span style={{ color: "var(--muted)" }}>86 obyvatel</span>
              <span>svoz plastů každou druhou středu</span>
            </a>
            {' '}
            <a href="/obecni-urad" style={{ padding: "20px", borderRadius: "14px", background: "var(--surface)", color: "var(--ink)", textDecoration: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontWeight: "600", fontSize: "19px" }}>Na Rovném</span>
              <span style={{ color: "var(--muted)" }}>48 obyvatel</span>
              <span>svoz plastů každou druhou středu</span>
            </a>
          </div>
        </section>
        {' '}
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "56px clamp(16px, 4vw, 32px) 72px", display: "flex", flexWrap: "wrap", gap: "40px" }}>
          <section aria-labelledby="situace17" style={{ flex: "1 1 340px", minWidth: "0" }}>
            <h2 id="situace17" style={{ margin: "0 0 12px", fontSize: "32px" }}>Životní situace</h2>
            {' '}
            <ul style={{ margin: "0", padding: "0", listStyle: "none" }}>
              <li style={{ padding: "6px 0", borderTop: "1px solid var(--line)" }}>
                <a href="/zivotni-situace/stehuji-se-do-obce" className="hit" style={{ color: "var(--link)", fontWeight: "500" }}>Stěhuji se do obce</a>
              </li>
              <li style={{ padding: "6px 0", borderTop: "1px solid var(--line)" }}>
                <a href="/zivotni-situace/narodilo-se-nam-dite" className="hit" style={{ color: "var(--link)", fontWeight: "500" }}>Narodilo se nám dítě</a>
              </li>
              <li style={{ padding: "6px 0", borderTop: "1px solid var(--line)" }}>
                <a href="/zivotni-situace/stavim-nebo-opravuji-dum" className="hit" style={{ color: "var(--link)", fontWeight: "500" }}>Stavím nebo opravuji dům</a>
              </li>
              <li style={{ padding: "6px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
                <a href="/zivotni-situace/zemrel-nam-blizky-clovek" className="hit" style={{ color: "var(--link)", fontWeight: "500" }}>Zemřel nám blízký člověk</a>
              </li>
            </ul>
          </section>
          {' '}
          <section aria-labelledby="zpravy17" style={{ flex: "2 1 480px", minWidth: "0" }}>
            <h2 id="zpravy17" style={{ margin: "0 0 12px", fontSize: "32px" }}>Zprávy</h2>
            {' '}
            <article style={{ padding: "16px 0", borderTop: "1px solid var(--line)" }}>
              <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>2. listopadu</p>
              <h3 style={{ margin: "4px 0", fontSize: "21px" }}>
                <a href="/aktuality/pitna-voda-cisterny" style={{ color: "var(--ink)" }}>{"Pitná voda: cisterny stojí na návsi a u hasičárny"}</a>
              </h3>
              <p style={{ margin: "0" }}>
                Načepujete si od 7 do 20 hodin. Seniorům nad 75 let vodu přivezou hasiči, stačí zavolat.
              </p>
            </article>
            {' '}
            <article style={{ padding: "16px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
              <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>30. října</p>
              <h3 style={{ margin: "4px 0", fontSize: "21px" }}>
                <a href="/uredni-deska/navrh-rozpoctu-2027" style={{ color: "var(--ink)" }}>Rozpočet na rok 2027 visí na úřední desce do 11. listopadu</a>
              </h3>
              <p style={{ margin: "0" }}>Připomínky přijímá úřad do zasedání 9. listopadu.</p>
            </article>
          </section>
        </div>
      </main>
      <Paticka />
    </>
  )
}
