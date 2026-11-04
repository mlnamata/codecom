'use client'
/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S04-Lipa.html. */

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
        <section style={{ background: "var(--surface)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px clamp(16px, 4vw, 32px) 64px", display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "flex-start" }}>
            <div style={{ flex: "999 1 560px", minWidth: "0" }}>
              <h1 style={{ margin: "0 0 24px", fontFamily: "var(--font-instrument-serif), Georgia, serif", fontWeight: "400", fontSize: "clamp(48px, 6vw, 76px)", lineHeight: "1.05" }}>Co potřebujete vyřídit?</h1>
              {' '}
              <label htmlFor="q" style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Napište, co hledáte</label>
              {' '}
              <input id="q" type="text" value={v.q} onChange={v.setQ} placeholder="např. pes, sál, odpad" style={{ width: "100%", maxWidth: "640px", height: "56px", padding: "0 20px", border: "1px solid var(--ink)", borderRadius: "12px", font: "inherit", fontSize: "20px", background: "var(--bg)", color: "var(--ink)" }} />
              {' '}
              <div role="group" aria-label="Rychlý výběr" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" }}>
                {v.verbs.map((vb, i) => (
                  <Fragment key={i}>
                    <button type="button" onClick={vb.pick} aria-pressed={vb.pressed} style={{ minHeight: "44px", padding: "0 16px", borderRadius: "8px", border: "1px solid var(--line)", background: vb.bg, color: vb.ink, font: "inherit", fontSize: "16px", cursor: "pointer" }}>{vb.label}</button>
                  </Fragment>
                ))}
              </div>
              {' '}
              <ul aria-live="polite" style={{ listStyle: "none", margin: "16px 0 0", padding: "0", maxWidth: "640px", display: "flex", flexDirection: "column", gap: "4px" }}>
                {v.hits.map((h, i) => (
                  <Fragment key={i}>
                    <li>
                      <a href={h.href} style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "4px 16px", padding: "12px 16px", borderRadius: "8px", background: "var(--bg)", color: "var(--ink)", textDecoration: "none", boxShadow: "inset 0 0 0 1px var(--line)" }}>
                        <span style={{ fontWeight: "600" }}>{h.title}</span>
                        <span style={{ color: "var(--muted)", fontSize: "15px" }}>{h.how}</span>
                      </a>
                    </li>
                  </Fragment>
                ))}
              </ul>
              {' '}
              {v.empty ? (
                <>
                  <div style={{ marginTop: "16px", maxWidth: "640px" }}>
                    <p style={{ margin: "0 0 8px", fontWeight: "600" }}>{"Na „"}{v.q}{"“ jsme nic nenašli"}</p>
                    <p style={{ margin: "0 0 12px" }}>Zkuste jiné slovo, nebo zavolejte na úřad, rádi poradíme: [TELEFON].</p>
                    <button type="button" onClick={v.clear} style={{ minHeight: "44px", padding: "0 16px", borderRadius: "8px", border: "1px solid var(--ink)", background: "var(--bg)", color: "var(--ink)", font: "inherit", fontSize: "16px", cursor: "pointer" }}>Vymazat hledání</button>
                  </div>
                </>
              ) : null}
            </div>
            {' '}
            <aside aria-labelledby="dnes" style={{ flex: "1 1 300px", minWidth: "0", display: "flex", flexDirection: "column", gap: "8px" }}>
              <h2 id="dnes" style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: "600" }}>{"Dnes v Javoří Lhotě"}</h2>
              {' '}
              <div style={{ padding: "16px 20px", borderRadius: "12px", background: "var(--bg)", boxShadow: "inset 0 0 0 1px var(--line)" }}>
                <p style={{ margin: "0", fontWeight: "600" }}>Úřad má otevřeno</p>
                <p style={{ margin: "0", color: "var(--muted)" }}>8 až 17 hodin, starostka od 15 hodin</p>
              </div>
              {' '}
              <div style={{ padding: "16px 20px", borderRadius: "12px", background: "var(--bg)", boxShadow: "inset 0 0 0 1px var(--line)" }}>
                <p style={{ margin: "0", fontWeight: "600" }}>Zítra svoz plastů</p>
                <p style={{ margin: "0", color: "var(--muted)" }}>{"žluté nádoby, ulice Za Humny a Polní"}</p>
              </div>
              {' '}
              <div style={{ padding: "16px 20px", borderRadius: "12px", background: "var(--bg)", boxShadow: "inset 0 0 0 1px var(--line)" }}>
                <p style={{ margin: "0", fontWeight: "600" }}>{"Rozhlas v 9:00"}</p>
                <p style={{ margin: "0", color: "var(--muted)" }}>
                  {"Ve čtvrtek nepoteče voda v Hlavní ulici. "}
                  <a href="/hlaseni-rozhlasu">Poslechnout</a>
                </p>
              </div>
            </aside>
          </div>
        </section>
        {' '}
        <section aria-labelledby="sluzba" style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px clamp(16px, 4vw, 32px) 0" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "32px 56px", padding: "32px clamp(20px, 3vw, 40px)", borderRadius: "16px", boxShadow: "inset 0 0 0 1px var(--line)" }}>
            <div style={{ flex: "1 1 280px", minWidth: "0" }}>
              <p style={{ margin: "0 0 4px", color: "var(--muted)" }}>{"Nejčastější služba v říjnu"}</p>
              {' '}
              <h2 id="sluzba" style={{ margin: "0 0 12px", fontFamily: "var(--font-instrument-serif), Georgia, serif", fontWeight: "400", fontSize: "40px", lineHeight: "1.1" }}>Poplatek za odpad</h2>
              {' '}
              <a href="/sluzby/platby" style={{ display: "inline-flex", alignItems: "center", minHeight: "48px", padding: "0 20px", borderRadius: "8px", background: "var(--primary)", color: "var(--on-primary)", textDecoration: "none", fontWeight: "600" }}>Zaplatit kartou online</a>
              {' '}
              <p style={{ margin: "16px 0 0", fontSize: "15px", color: "var(--muted)" }}>Stránku spravuje Jana Malá, účetní obce. Aktualizováno 26. 10. 2026.</p>
            </div>
            {' '}
            <dl style={{ flex: "2 1 420px", minWidth: "0", margin: "0", display: "grid", gridTemplateColumns: "minmax(120px, 180px) 1fr", borderTop: "1px solid var(--line)" }}>
              <dt style={{ padding: "12px 0", borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Kdo platí</dt>
              <dd style={{ margin: "0", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>{"každý s trvalým pobytem v obci a majitelé chalup"}</dd>
              <dt style={{ padding: "12px 0", borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Kolik</dt>
              <dd style={{ margin: "0", padding: "12px 0", borderBottom: "1px solid var(--line)", fontVariantNumeric: "tabular-nums" }}>{"900 Kč na osobu a rok, chalupa 900 Kč"}</dd>
              <dt style={{ padding: "12px 0", borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Do kdy</dt>
              <dd style={{ margin: "0", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>31. května</dd>
              <dt style={{ padding: "12px 0", borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Úleva</dt>
              <dd style={{ margin: "0", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>{"děti do 3 let a lidé starší 80 let neplatí"}</dd>
              <dt style={{ padding: "12px 0", borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>Jinak</dt>
              <dd style={{ margin: "0", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>převodem nebo hotově na úřadě</dd>
            </dl>
          </div>
        </section>
        {' '}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px clamp(16px, 4vw, 32px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "40px" }}>
          <div>
            <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-instrument-serif), Georgia, serif", fontWeight: "400", fontSize: "34px" }}>Aktuality</h2>
            {' '}
            <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
              <li style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: "12px", padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                <span style={{ color: "var(--muted)", fontSize: "15px", fontVariantNumeric: "tabular-nums" }}>26. 10.</span>
                <a className="hit" href="/aktuality/nove-hriste-za-skolou" style={{ fontWeight: "600", color: "var(--ink)", textDecoration: "none" }}>Nové hřiště za školou je otevřené</a>
              </li>
              <li style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: "12px", padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                <span style={{ color: "var(--muted)", fontSize: "15px", fontVariantNumeric: "tabular-nums" }}>21. 10.</span>
                <a className="hit" href="/aktuality/oprava-chodniku-v-lipove" style={{ fontWeight: "600", color: "var(--ink)", textDecoration: "none" }}>{"Oprava chodníku v Lipové začne v dubnu"}</a>
              </li>
              <li style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: "12px", padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                <span style={{ color: "var(--muted)", fontSize: "15px", fontVariantNumeric: "tabular-nums" }}>18. 10.</span>
                <a className="hit" href="/aktuality/hasici-vyhrali-okrskovou-soutez" style={{ fontWeight: "600", color: "var(--ink)", textDecoration: "none" }}>Hasiči vyhráli okrskovou soutěž</a>
              </li>
            </ul>
          </div>
          {' '}
          <div>
            <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-instrument-serif), Georgia, serif", fontWeight: "400", fontSize: "34px" }}>Úřední deska</h2>
            {' '}
            <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
              <li style={{ padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                <a className="hit" href="/uredni-deska/pozvanka-zasedani-9-11" style={{ fontWeight: "600", color: "var(--ink)", textDecoration: "none" }}>Pozvánka na zasedání zastupitelstva 9. 11.</a>
                <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>visí do 9. 11.</span>
              </li>
              <li style={{ padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                <a className="hit" href="/uredni-deska/navrh-rozpoctu-2027" style={{ fontWeight: "600", color: "var(--ink)", textDecoration: "none" }}>Návrh rozpočtu obce na rok 2027</a>
                <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>visí do 11. 11.</span>
              </li>
              <li style={{ padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                <a className="hit" href="/uredni-deska/uzavirka-mostu" style={{ fontWeight: "600", color: "var(--ink)", textDecoration: "none" }}>Uzavírka mostu přes Javornický potok</a>
                <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>visí do 30. 11.</span>
              </li>
            </ul>
          </div>
          {' '}
          <div>
            <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-instrument-serif), Georgia, serif", fontWeight: "400", fontSize: "34px" }}>Akce</h2>
            {' '}
            <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
              <li style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: "12px", padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                <span style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: "28px", lineHeight: "1.1" }}>7. 11.</span>
                <span>
                  <a className="hit" href="/akce#lampionovy-pruvod" style={{ fontWeight: "600", color: "var(--ink)", textDecoration: "none" }}>Lampionový průvod</a>
                  <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>{"od hasičárny v 17 hodin"}</span>
                </span>
              </li>
              <li style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: "12px", padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                <span style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: "28px", lineHeight: "1.1" }}>14. 11.</span>
                <span>
                  <a className="hit" href="/akce#vylov-mlynskeho-rybnika" style={{ fontWeight: "600", color: "var(--ink)", textDecoration: "none" }}>Výlov Mlýnského rybníka</a>
                  <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>od 9 hodin na hrázi</span>
                </span>
              </li>
              <li style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: "12px", padding: "12px 0", borderTop: "1px solid var(--line)" }}>
                <span style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontSize: "28px", lineHeight: "1.1" }}>28. 11.</span>
                <span>
                  <a className="hit" href="/akce#rozsviceni-vanocniho-stromu" style={{ fontWeight: "600", color: "var(--ink)", textDecoration: "none" }}>Rozsvícení stromu</a>
                  <span style={{ display: "block", color: "var(--muted)", fontSize: "15px" }}>pod lípou na návsi</span>
                </span>
              </li>
            </ul>
          </div>
        </section>
        {' '}
        <section aria-labelledby="spolky" style={{ borderTop: "1px solid var(--line)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px clamp(16px, 4vw, 32px) 56px", display: "flex", flexWrap: "wrap", gap: "4px 32px", alignItems: "baseline" }}>
            <h2 id="spolky" style={{ margin: "0 16px 0 0", fontFamily: "var(--font-instrument-serif), Georgia, serif", fontWeight: "400", fontSize: "34px" }}>Spolky</h2>
            {' '}
            <a className="hit" href="/obecni-urad" style={{ fontWeight: "600" }}>Hasiči</a>
            <a className="hit" href="/obecni-urad" style={{ fontWeight: "600" }}>TJ Sokol</a>
            <a className="hit" href="/obecni-urad" style={{ fontWeight: "600" }}>Myslivci</a>
            <a className="hit" href="/obecni-urad" style={{ fontWeight: "600" }}>Spolek rodičů</a>
            <a className="hit" href="/obecni-urad" style={{ fontWeight: "600" }}>Klub seniorů</a>
            <a className="hit" href="/obecni-urad" style={{ fontWeight: "600" }}>Knihovna</a>
          </div>
        </section>
      </main>
      <Paticka />
    </>
  )
}
