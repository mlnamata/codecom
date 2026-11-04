'use client'
/**
 * Záhlaví šablony Capella: jedna bílá plocha místo tří barevných pruhů.
 * Horní řádek nese znak, název obce a menu, spodní řádek za tenkou linkou úřední hodiny
 * a přepínač jazyka obsahu (česky, obojí, německy).
 */

import { ZnakObce } from '../sdilene/ZnakObce'
import { useHodnoty } from './Interaktivni'

const MENU: [string, string][] = [
  ['/obecni-urad', 'Obec'],
  ['/obecni-urad', 'Úřad'],
  ['/obecni-urad', 'Přes hranici'],
  ['/akce', 'Akce'],
  ['/obecni-urad', 'Kontakty'],
]

export function Hlavicka() {
  const v = useHodnoty()
  return (
    <header className="capella-hlavicka" style={{ background: 'var(--bg)', color: 'var(--ink)', borderBottom: '1px solid var(--line)' }}>
      <div className="capella-radek">
        <a href="/" className="capella-znacka" style={{ color: 'var(--ink)', textDecoration: 'none' }}>
          <ZnakObce velikost={44} />
          <span style={{ minWidth: 0 }}>
            <span className="capella-nazev">Obec Javoří Lhota</span>
            <span lang="de" style={{ display: 'block', fontSize: '15px', lineHeight: '1.4', color: 'var(--muted)' }}>
              Gemeinde Javoří Lhota, 4 Kilometer bis zur Grenze
            </span>
          </span>
        </a>
        <nav className="nav-wide" aria-label="Hlavní menu" style={{ display: 'flex', flexWrap: 'wrap', gap: '0 24px', fontWeight: '500' }}>
          {MENU.map(([href, nazev]) => (
            <a key={nazev} href={href} style={{ color: 'var(--ink)', textDecoration: 'none' }}>
              {nazev}
            </a>
          ))}
        </nav>
        <a
          href="/hledat"
          aria-label="Hledat"
          className="nav-wide"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', borderRadius: '4px', color: 'var(--ink)', boxShadow: 'inset 0 0 0 1px var(--line)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7"></circle>
            <path d="M20 20l-3.5-3.5"></path>
          </svg>
        </a>
        <details className="nav-narrow">
          <summary>
            <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
              <path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" strokeWidth="2"></path>
            </svg>
            Menu
          </summary>
          <nav aria-label="Hlavní menu">
            {MENU.map(([href, nazev]) => (
              <a key={nazev} href={href}>
                {nazev}
              </a>
            ))}
            <a href="/hledat">Hledat</a>
          </nav>
        </details>
      </div>
      <div style={{ borderTop: '1px solid var(--line)' }}>
        <div className="capella-radek capella-radek-maly">
          <p style={{ margin: '0', display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '15px', color: 'var(--muted)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ flex: '0 0 auto', marginTop: '4px' }}>
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M12 7v5l3 2"></path>
            </svg>
            <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0 16px' }}>
              <span>Úřad dnes 8 až 17 hodin</span>
              <span lang="de">Gemeindeamt heute 8 bis 17 Uhr</span>
            </span>
          </p>
          <div role="group" aria-label="Jazyk obsahu" className="capella-jazyk" style={{ boxShadow: 'inset 0 0 0 1px var(--line)' }}>
            {v.langs.map((l) => (
              <button
                key={l.label}
                type="button"
                onClick={l.pick}
                aria-pressed={l.pressed}
                lang={l.lang}
                style={{ background: l.bg, color: l.ink }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
