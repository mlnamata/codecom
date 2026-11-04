'use client'
/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/S16-Kompas.html. */

import type { ReactNode } from 'react'
import { FotoDlazdice } from '../sdilene/FotoDlazdice'
import { POPISY_FOTEK } from '../sdilene/popisy-fotek'
import { Fragment } from 'react'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'
import { useHodnoty } from './Interaktivni'

export function Uvod({ banner }: { banner: ReactNode; foto: boolean }) {
  const v = useHodnoty()
  return (
    <>
      {banner}
      <Hlavicka />
      <main id="obsah" tabIndex={-1} style={{ maxWidth: "1360px", margin: "0 auto", padding: "28px clamp(16px, 3vw, 28px) 56px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "12px 32px", marginBottom: "20px" }}>
          <h1 style={{ margin: "0", fontFamily: "var(--font-red-hat-display), system-ui, sans-serif", fontSize: "clamp(32px, 3.4vw, 44px)", lineHeight: "1.1" }}>{"Kde co v obci najdete"}</h1>
          {' '}
          <p style={{ margin: "0", color: "var(--muted)", maxWidth: "52ch" }}>
            {"Vyberte vrstvy a klikněte na bod. Stejné údaje jsou pod mapou i jako seznam."}
          </p>
        </div>
        {' '}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "stretch" }}>
          <div style={{ flex: "1 1 320px", minWidth: "0", display: "flex", flexDirection: "column", gap: "16px" }}>
            <fieldset style={{ margin: "0", padding: "16px", border: "1px solid var(--line)", borderRadius: "14px" }}>
              <legend style={{ padding: "0 6px", fontWeight: "600" }}>Co ukázat na mapě</legend>
              {' '}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {v.layers.map((l, i) => (
                  <Fragment key={i}>
                    <button type="button" onClick={l.toggle} aria-pressed={l.pressed} style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "44px", padding: "0 14px", borderRadius: "999px", border: `2px solid ${l.color}`, background: l.bg, color: l.ink, font: "inherit", fontWeight: "500", cursor: "pointer" }}>
                      <span aria-hidden="true" style={{ width: "10px", height: "10px", borderRadius: "50%", background: l.dot }}></span>
                      {l.label}
                    </button>
                  </Fragment>
                ))}
              </div>
            </fieldset>
            {' '}
            <section aria-live="polite" aria-labelledby="vybrane16" style={{ padding: "20px", borderRadius: "14px", background: "var(--surface)", borderTop: `6px solid ${v.sel.color}` }}>
              <p style={{ margin: "0", color: "var(--muted)", fontSize: "15px" }}>{v.sel.layerLabel}</p>
              {' '}
              <h2 id="vybrane16" style={{ margin: "4px 0 8px", fontFamily: "var(--font-red-hat-display), system-ui, sans-serif", fontSize: "24px", lineHeight: "1.2" }}>{v.sel.title}</h2>
              {' '}
              <p style={{ margin: "0" }}>{v.sel.info}</p>
              {' '}
              <p style={{ margin: "12px 0 0", display: "flex", flexWrap: "wrap", gap: "0 20px" }}>
                <a href="/obecni-urad" className="hit" style={{ color: "var(--link)", fontWeight: "600" }}>Navigovat sem</a>
                <a href="/sluzby/nahlasit-zavadu" className="hit" style={{ color: "var(--link)", fontWeight: "600" }}>Nahlásit problém na tomto místě</a>
              </p>
            </section>
          </div>
          {' '}
          <div role="region" aria-label="Mapa obce Javoří Lhota" style={{ flex: "2.2 1 560px", minWidth: "0", position: "relative", minHeight: "520px", borderRadius: "14px", overflow: "hidden", background: "var(--land)", boxShadow: "inset 0 0 0 1px var(--line)" }}>
            <FotoDlazdice soubor="sablona-16-kompas.webp" alt={POPISY_FOTEK.kompas ?? ""} styl={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} />
            {' '}
            {v.pins.map((p, i) => (
              <Fragment key={i}>
                <button type="button" onClick={p.pick} aria-pressed={p.pressed} aria-label={p.title} style={{ position: "absolute", left: p.x, top: p.y, width: "44px", height: "44px", margin: "-22px 0 0 -22px", padding: "0", border: "0", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span aria-hidden="true" style={{ display: "block", width: p.size, height: p.size, borderRadius: "50%", background: p.color, boxShadow: `0 0 0 3px var(--pin-ring), 0 0 0 6px ${p.ring}` }}></span>
                </button>
              </Fragment>
            ))}
            {' '}
            <p style={{ position: "absolute", left: "12px", bottom: "12px", maxWidth: "calc(100% - 72px)", margin: "0", padding: "4px 10px", borderRadius: "6px", background: "var(--bg)", color: "var(--muted)", fontSize: "13px" }}>{"Podklad: ilustrační letecký snímek, v provozu mapa ČÚZK a OpenStreetMap"}</p>
          </div>
        </div>
        {' '}
        <section aria-labelledby="seznam16" style={{ marginTop: "32px" }}>
          <h2 id="seznam16" style={{ margin: "0 0 12px", fontFamily: "var(--font-red-hat-display), system-ui, sans-serif", fontSize: "26px" }}>Místa na mapě jako seznam</h2>
          {' '}
          <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: "0 28px" }}>
            {v.pins.map((p, i) => (
              <Fragment key={i}>
                <li style={{ borderTop: "1px solid var(--line)" }}>
                  <button type="button" onClick={p.pick} aria-pressed={p.pressed} style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", minHeight: "52px", padding: "8px 0", border: "0", background: "transparent", color: "var(--link)", font: "inherit", fontWeight: "500", textAlign: "left", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    <span aria-hidden="true" style={{ flex: "none", width: "12px", height: "12px", borderRadius: "50%", background: p.color }}></span>
                    {p.title}
                  </button>
                </li>
              </Fragment>
            ))}
          </ul>
        </section>
      </main>
      <Paticka />
    </>
  )
}
