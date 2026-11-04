'use client'
/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S15-Lupa.html. */

import { Fragment } from 'react'
import { ZnakObce } from '../sdilene/ZnakObce'
import { useHodnoty } from './Interaktivni'

export function Hlavicka() {
  const v = useHodnoty()
  return (
    <header className="deep" style={{ background: "var(--deep)", color: "var(--on-deep)" }}>
      <a className="skip" href="#obsah15">Přeskočit na obsah</a>
      {' '}
      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "0.8em clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.6em 1.2em" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.6em", color: "var(--on-deep)", textDecoration: "none", fontWeight: "600", fontSize: "1.2em" }}>
          <ZnakObce velikost={36} />
          Javoří Lhota
        </a>
        {' '}
        <div role="group" aria-label="Velikost písma" style={{ display: "flex", alignItems: "center", gap: "0.4em" }}>
          <span aria-hidden="true" style={{ fontSize: "0.85em" }}>Písmo</span>
          {' '}
          {v.sizes.map((z, i) => (
            <Fragment key={i}>
              <button type="button" onClick={z.pick} aria-pressed={z.pressed} style={{ minWidth: "48px", minHeight: "48px", padding: "0 0.6em", border: "2px solid var(--on-deep)", borderRadius: "4px", background: z.bg, color: z.ink, font: "inherit", fontWeight: "600", cursor: "pointer" }}>
                {z.label}
                <span className="sr">{z.name}</span>
              </button>
            </Fragment>
          ))}
        </div>
      </div>
      {' '}
      <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.3)" }}>
        <nav className="nav-wide" aria-label="Hlavní menu" style={{ maxWidth: "1040px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)", display: "flex", flexWrap: "wrap", gap: "0 1.4em", fontWeight: "500" }}>
          <a href="/sluzby" style={{ color: "var(--on-deep)", padding: "0.6em 0" }}>Co chci vyřídit</a>
          {' '}
          <a href="/obecni-urad" style={{ color: "var(--on-deep)", padding: "0.6em 0" }}>{"Úřad a kontakty"}</a>
          {' '}
          <a href="/hlaseni-rozhlasu" style={{ color: "var(--on-deep)", padding: "0.6em 0" }}>Hlášení rozhlasu</a>
          {' '}
          <a href="/uredni-deska" style={{ color: "var(--on-deep)", padding: "0.6em 0" }}>Úřední deska</a>
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
            <a href="/sluzby">Co chci vyřídit</a>
            <a href="/obecni-urad">{"Úřad a kontakty"}</a>
            <a href="/hlaseni-rozhlasu">Hlášení rozhlasu</a>
            <a href="/uredni-deska">Úřední deska</a>
          </nav>
        </details>
      </div>
    </header>
  )
}
