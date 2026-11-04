'use client'
/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S19-Mikroregion.html. */

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
      <Hlavicka />
      <main id="obsah" tabIndex={-1}>
        <section aria-labelledby="casti19" style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px clamp(16px, 4vw, 32px) 0" }}>
          <h1 id="casti19" style={{ margin: "0", fontSize: "clamp(36px, 4.4vw, 60px)", lineHeight: "1.05", letterSpacing: "-0.02em", maxWidth: "18ch" }}>{"Javoří Lhota, Podjavoří, Hájek a Na Rovném"}</h1>
          {' '}
          <p style={{ margin: "14px 0 28px", maxWidth: "56ch", fontSize: "19px", color: "var(--muted)" }}>
            {"Jedna obec, čtyři části, 684 obyvatel. Vyberte svou část a uvidíte, co se v ní teď děje a kdo vám v ní poradí."}
          </p>
          {' '}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "stretch" }}>
            <div style={{ flex: "1.3 1 480px", minWidth: "0", borderRadius: "20px", background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--line)", padding: "16px" }}>
              <svg viewBox="40 40 480 390" aria-hidden="true" style={{ display: "block", width: "100%", height: "auto" }}>
                {v.shapes.map((sh, i) => (
                  <Fragment key={i}>
                    <g onClick={sh.pick} style={{ cursor: "pointer" }}>
                      <path d={sh.d} style={{ fill: sh.fill, stroke: "var(--surface)" }} strokeWidth="4" strokeLinejoin="round"></path>
                      <text x={sh.lx} y={sh.ly} textAnchor="middle" style={{ fill: sh.ink, fontFamily: "var(--font-familjen-grotesk), sans-serif", fontSize: "17px", fontWeight: "600" }}>{sh.name}</text>
                    </g>
                  </Fragment>
                ))}
              </svg>
            </div>
            {' '}
            <div style={{ flex: "1 1 340px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div role="group" aria-label="Vyberte část obce" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px" }}>
                {v.parts.map((pt, i) => (
                  <Fragment key={i}>
                    <button type="button" onClick={pt.pick} aria-pressed={pt.pressed} style={{ minHeight: "52px", padding: "0 14px", borderRadius: "12px", border: "1px solid var(--line)", background: pt.bg, color: pt.ink, font: "inherit", fontWeight: "600", textAlign: "left", cursor: "pointer" }}>{pt.name}</button>
                  </Fragment>
                ))}
              </div>
              {' '}
              <section aria-live="polite" aria-labelledby="cast19" style={{ flex: "1", padding: "24px", borderRadius: "20px", background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--line)" }}>
                <h2 id="cast19" style={{ margin: "0", fontSize: "30px" }}>{v.cur.name}</h2>
                {' '}
                <p style={{ margin: "6px 0 16px", color: "var(--muted)" }}>{v.cur.facts}</p>
                {' '}
                <p style={{ margin: "0", padding: "14px 16px", borderRadius: "12px", background: "var(--accent)", color: "var(--on-accent)" }}>
                  <span style={{ display: "block", fontWeight: "600" }}>Teď se tu děje</span>
                  {v.cur.now}
                </p>
                {' '}
                <p style={{ margin: "16px 0 0", display: "flex", flexWrap: "wrap", gap: "0 20px" }}>
                  <a href="/sluzby#svoz-odpadu" style={{ color: "var(--link)", fontWeight: "600" }}>{"Svoz odpadu v této části"}</a>
                  <a href="/zastupitelstvo" style={{ color: "var(--link)", fontWeight: "600" }}>Osadní výbor</a>
                </p>
              </section>
            </div>
          </div>
        </section>
        {' '}
        <section aria-labelledby="vybory19" style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px clamp(16px, 4vw, 32px) 0" }}>
          <h2 id="vybory19" style={{ margin: "0 0 20px", fontSize: "34px" }}>{"Kdo vám v části poradí"}</h2>
          {' '}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(270px, 100%), 1fr))", borderTop: "1px solid var(--line)", borderLeft: "1px solid var(--line)" }}>
            <div style={{ padding: "24px", borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--surface)" }}>
              <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>Javoří Lhota</p>
              <h3 style={{ margin: "4px 0 6px", fontSize: "21px" }}>Marie Šťastná</h3>
              <p style={{ margin: "0" }}>{"starostka, Út a Čt 8 až 12 na úřadě"}</p>
              <a href="/obecni-urad" style={{ display: "inline-block", marginTop: "8px", color: "var(--link)" }}>[E-MAIL]</a>
            </div>
            {' '}
            <div style={{ padding: "24px", borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--surface)" }}>
              <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>Podjavoří</p>
              <h3 style={{ margin: "4px 0 6px", fontSize: "21px" }}>Tomáš Brož</h3>
              <p style={{ margin: "0" }}>{"předseda osadního výboru, sraz první úterý v měsíci"}</p>
              <a href="/obecni-urad" style={{ display: "inline-block", marginTop: "8px", color: "var(--link)" }}>[E-MAIL]</a>
            </div>
            {' '}
            <div style={{ padding: "24px", borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--surface)" }}>
              <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>Hájek</p>
              <h3 style={{ margin: "4px 0 6px", fontSize: "21px" }}>Alena Krejčí</h3>
              <p style={{ margin: "0" }}>předsedkyně osadního výboru, hájovna</p>
              <a href="/obecni-urad" style={{ display: "inline-block", marginTop: "8px", color: "var(--link)" }}>[E-MAIL]</a>
            </div>
            {' '}
            <div style={{ padding: "24px", borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "var(--surface)" }}>
              <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>Na Rovném</p>
              <h3 style={{ margin: "4px 0 6px", fontSize: "21px" }}>Josef Vávra</h3>
              <p style={{ margin: "0" }}>{"předseda osadního výboru a kronikář"}</p>
              <a href="/obecni-urad" style={{ display: "inline-block", marginTop: "8px", color: "var(--link)" }}>[E-MAIL]</a>
            </div>
          </div>
        </section>
        {' '}
        <section aria-labelledby="spolecne19" style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px clamp(16px, 4vw, 32px) 72px" }}>
          <h2 id="spolecne19" style={{ margin: "0 0 12px", fontSize: "34px" }}>Pro celou obec</h2>
          {' '}
          <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "0 32px" }}>
            <li style={{ padding: "6px 0", borderTop: "1px solid var(--line)" }}>
              <a href="/sluzby/platby" className="hit" style={{ color: "var(--link)", fontWeight: "500" }}>Zaplatit poplatek za odpad</a>
            </li>
            <li style={{ padding: "6px 0", borderTop: "1px solid var(--line)" }}>
              <a href="/uredni-deska/pozvanka-zasedani-9-11" className="hit" style={{ color: "var(--link)", fontWeight: "500" }}>Zasedání zastupitelstva 9. 11.</a>
            </li>
            <li style={{ padding: "6px 0", borderTop: "1px solid var(--line)" }}>
              <a href="/akce" className="hit" style={{ color: "var(--link)", fontWeight: "500" }}>{"Spolkový autobus na akce v částech"}</a>
            </li>
            <li style={{ padding: "6px 0", borderTop: "1px solid var(--line)" }}>
              <a href="/hlaseni-rozhlasu" className="hit" style={{ color: "var(--link)", fontWeight: "500" }}>Hlášení rozhlasu ve všech částech</a>
            </li>
            <li style={{ padding: "6px 0", borderTop: "1px solid var(--line)" }}>
              <a href="/uredni-deska" className="hit" style={{ color: "var(--link)", fontWeight: "500" }}>Úřední deska</a>
            </li>
            <li style={{ padding: "6px 0", borderTop: "1px solid var(--line)" }}>
              <a href="/sluzby/nahlasit-zavadu" className="hit" style={{ color: "var(--link)", fontWeight: "500" }}>Nahlásit závadu</a>
            </li>
          </ul>
        </section>
      </main>
      <Paticka />
    </>
  )
}
