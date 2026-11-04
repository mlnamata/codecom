'use client'
/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S20-Urad.html. */

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
      <main id="obsah" tabIndex={-1} style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px clamp(16px, 4vw, 32px) 64px" }}>
        <nav aria-label="Drobečková navigace" style={{ fontSize: "15px", marginBottom: "16px" }}>
          <a href="/" style={{ color: "var(--link)" }}>Úvod</a>
          <span aria-hidden="true" style={{ margin: "0 8px", color: "var(--muted)" }}>/</span>
          <span aria-current="page">Životní situace</span>
        </nav>
        {' '}
        <h1 style={{ margin: "0 0 8px", fontSize: "clamp(32px, 3.6vw, 44px)", fontWeight: "500", lineHeight: "1.15" }}>Životní situace</h1>
        {' '}
        <p style={{ margin: "0 0 28px", maxWidth: "62ch", fontSize: "19px", color: "var(--muted)" }}>
          {"Vyberte, co se vám stalo. Ukážeme, co vyřídíte online, kdy musíte na úřad a co proběhne samo."}
        </p>
        {' '}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "flex-start" }}>
          <div role="group" aria-label="Vyberte životní situaci" style={{ flex: "1 1 280px", minWidth: "0", display: "flex", flexDirection: "column", borderTop: "1px solid var(--line)" }}>
            {v.situations.map((s, i) => (
              <Fragment key={i}>
                <button type="button" onClick={s.pick} aria-pressed={s.pressed} style={{ minHeight: "56px", padding: "12px 16px", border: "0", borderBottom: "1px solid var(--line)", borderLeft: `4px solid ${s.edge}`, background: s.bg, color: "var(--link)", font: "inherit", fontWeight: "500", textAlign: "left", cursor: "pointer" }}>{s.label}</button>
              </Fragment>
            ))}
          </div>
          {' '}
          <section aria-live="polite" aria-labelledby="situace20" style={{ flex: "2.4 1 520px", minWidth: "0", padding: "28px", borderRadius: "4px", background: "var(--bg)", boxShadow: "inset 0 0 0 1px var(--line)" }}>
            <h2 id="situace20" style={{ margin: "0 0 6px", fontSize: "28px", fontWeight: "500" }}>{v.cur.label}</h2>
            {' '}
            <p style={{ margin: "0 0 20px", color: "var(--muted)" }}>{v.cur.who}</p>
            {' '}
            <ol style={{ margin: "0", padding: "0", listStyle: "none" }}>
              {v.cur.steps.map((st, i) => (
                <Fragment key={i}>
                  <li style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: "16px", padding: "16px 0", borderTop: "1px solid var(--line)" }}>
                    <span aria-hidden="true" style={{ display: "inline-flex", width: "36px", height: "36px", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--primary)", color: "var(--on-primary)", fontWeight: "600" }}>{st.n}</span>
                    {' '}
                    <div>
                      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px" }}>
                        <h3 style={{ margin: "0", fontSize: "19px", fontWeight: "600" }}>{st.title}</h3>
                        <span style={{ padding: "2px 10px", borderRadius: "4px", background: st.tagBg, color: st.tagInk, boxShadow: `inset 0 0 0 1px ${st.tagLine}`, fontSize: "14px", fontWeight: "500" }}>{st.tag}</span>
                      </div>
                      {' '}
                      <p style={{ margin: "6px 0 0" }}>{st.text}</p>
                    </div>
                  </li>
                </Fragment>
              ))}
            </ol>
          </section>
        </div>
        {' '}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", marginTop: "48px" }}>
          <section aria-labelledby="deska20" style={{ flex: "2 1 480px", minWidth: "0" }}>
            <h2 id="deska20" style={{ margin: "0 0 12px", fontSize: "26px", fontWeight: "500" }}>Úřední deska</h2>
            {' '}
            <ul style={{ margin: "0", padding: "0", listStyle: "none", borderTop: "2px solid var(--primary)" }}>
              <li style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "4px 16px", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
                <a href="/uredni-deska/navrh-rozpoctu-2027" style={{ color: "var(--link)" }}>Návrh rozpočtu obce na rok 2027</a>
                <span style={{ color: "var(--muted)", fontSize: "15px" }}>Rozpočet, visí do 11. 11. 2026</span>
              </li>
              <li style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "4px 16px", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
                <a href="/uredni-deska/pozvanka-zasedani-9-11" style={{ color: "var(--link)" }}>Pozvánka na zasedání zastupitelstva 9. 11.</a>
                <span style={{ color: "var(--muted)", fontSize: "15px" }}>Zastupitelstvo, visí do 9. 11. 2026</span>
              </li>
              <li style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "4px 16px", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
                <a href="/uredni-deska/uzavirka-mostu" style={{ color: "var(--link)" }}>Veřejná vyhláška: uzavírka mostu</a>
                <span style={{ color: "var(--muted)", fontSize: "15px" }}>Doprava, visí do 30. 11. 2026</span>
              </li>
            </ul>
            {' '}
            <a href="/uredni-deska" style={{ display: "inline-block", marginTop: "12px", color: "var(--link)", fontWeight: "500" }}>Všechny dokumenty na úřední desce</a>
          </section>
          {' '}
          <section aria-labelledby="kontakt20" style={{ flex: "1 1 300px", minWidth: "0", padding: "24px", background: "var(--surface)", borderRadius: "4px" }}>
            <h2 id="kontakt20" style={{ margin: "0 0 12px", fontSize: "22px", fontWeight: "500" }}>Obecní úřad</h2>
            {' '}
            <dl style={{ margin: "0", display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 16px" }}>
              <dt style={{ color: "var(--muted)" }}>Adresa</dt>
              <dd style={{ margin: "0" }}>Náves 1, [PSČ] Javoří Lhota</dd>
              <dt style={{ color: "var(--muted)" }}>{"Po a St"}</dt>
              <dd style={{ margin: "0" }}>8 až 17 hodin</dd>
              <dt style={{ color: "var(--muted)" }}>{"Út a Čt"}</dt>
              <dd style={{ margin: "0" }}>8 až 12 hodin</dd>
              <dt style={{ color: "var(--muted)" }}>Datovka</dt>
              <dd style={{ margin: "0" }}>[ID DS]</dd>
              <dt style={{ color: "var(--muted)" }}>E-mail</dt>
              <dd style={{ margin: "0" }}>
                <a href="/obecni-urad" style={{ color: "var(--link)" }}>[E-MAIL]</a>
              </dd>
            </dl>
          </section>
        </div>
        {' '}
        <p style={{ margin: "40px 0 0", color: "var(--muted)", fontSize: "15px" }}>Stránku spravuje Jana Malá, aktualizováno 26. 10. 2026</p>
      </main>
      <Paticka />
    </>
  )
}
