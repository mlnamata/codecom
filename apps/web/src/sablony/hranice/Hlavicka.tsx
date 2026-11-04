'use client'
/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S07-Hranice.html. */

import { Fragment } from 'react'
import { ZnakObce } from '../sdilene/ZnakObce'
import { useHodnoty } from './Interaktivni'

export function Hlavicka() {
  const v = useHodnoty()
  return (
    <header>
      <div className="on-primary" style={{ position: "relative", background: "var(--primary)", color: "var(--on-primary)", overflow: "hidden" }}>
        <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "48px clamp(16px, 4vw, 32px) 56px", display: "flex", alignItems: "center", gap: "20px" }}>
          <ZnakObce velikost={64} />
          {' '}
          <div>
            <p style={{ margin: "0", fontFamily: "var(--font-ibm-plex-serif), Georgia, serif", fontWeight: "500", fontSize: "clamp(32px, 4.4vw, 52px)", lineHeight: "1.1" }}>Obec Javoří Lhota</p>
            {' '}
            <p lang="de" style={{ margin: "4px 0 0", fontSize: "18px" }}>Gemeinde Javoří Lhota, 4 Kilometer bis zur Grenze</p>
          </div>
        </div>
      </div>
      {' '}
      <div className="deep" style={{ background: "var(--deep)", color: "var(--on-deep)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "8px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px 24px" }}>
          <p style={{ margin: "0", fontSize: "15px", display: "flex", flexWrap: "wrap", gap: "0 16px" }}>
            <span>Úřad dnes 8 až 17 hodin</span>
            <span lang="de">Gemeindeamt heute 8 bis 17 Uhr</span>
          </p>
          {' '}
          <div role="group" aria-label="Jazyk obsahu" style={{ display: "flex", gap: "4px", padding: "4px", borderRadius: "8px", boxShadow: "inset 0 0 0 1px var(--on-deep)" }}>
            {v.langs.map((l, i) => (
              <Fragment key={i}>
                <button type="button" onClick={l.pick} aria-pressed={l.pressed} lang={l.lang} style={{ minHeight: "40px", padding: "0 14px", borderRadius: "6px", border: "0", background: l.bg, color: l.ink, font: "inherit", fontSize: "15px", fontWeight: "500", cursor: "pointer" }}>{l.label}</button>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      {' '}
      <div style={{ background: "var(--bg)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "8px clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
          <nav className="nav-wide" aria-label="Hlavní menu" style={{ display: "flex", flexWrap: "wrap", gap: "0 28px", fontWeight: "500" }}>
            <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Obec</a>
            {' '}
            <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Úřad</a>
            {' '}
            <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Přes hranici</a>
            {' '}
            <a href="/akce" style={{ color: "var(--ink)", textDecoration: "none" }}>Akce</a>
            {' '}
            <a href="/obecni-urad" style={{ color: "var(--ink)", textDecoration: "none" }}>Kontakty</a>
          </nav>
          {' '}
          <details className="nav-narrow">
            <summary>
              <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
                <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="2"></path>
              </svg>
              Menu
            </summary>
            <nav aria-label="Hlavní menu">
              <a href="/obecni-urad">Obec</a>
              <a href="/obecni-urad">Úřad</a>
              <a href="/obecni-urad">Přes hranici</a>
              <a href="/akce">Akce</a>
              <a href="/obecni-urad">Kontakty</a>
            </nav>
          </details>
          {' '}
          <a href="/hledat" aria-label="Hledat" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "8px", background: "var(--primary)", color: "var(--on-primary)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7"></circle>
              <path d="M20 20l-3.5-3.5"></path>
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
