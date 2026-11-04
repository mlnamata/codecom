'use client'
/**
 * Úvod šablony Capella: velká fotka hraničního kamene přes celou šířku a přes její spodní
 * okraj dvojjazyčný panel (česky a německy vedle sebe, mezi nimi jen tenká linka).
 * Text leží vždy na plné ploše, ne přímo na fotce. Štítek AI je v pravém horním rohu fotky.
 */

import type { ReactNode } from 'react'
import { Foto } from '../sdilene/Foto'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'
import { useHodnoty } from './Interaktivni'

const SERIF = 'var(--font-ibm-plex-serif), Georgia, serif'

const AKCE = [
  { den: '11', mesic: 'lis', href: '/obecni-urad', nazev: 'Svatomartinský průvod přes hranici', popis: 'od hraničního kamene v 17 hodin', de: 'Martinsumzug über die Grenze' },
  { den: '29', mesic: 'lis', href: '/akce', nazev: 'Adventní trh obou obcí', popis: 'náves Javoří Lhoty, od 14 hodin', de: 'Gemeinsamer Adventsmarkt' },
  { den: '1', mesic: 'pro', href: '/obecni-urad', nazev: 'Zimní uzávěra cesty k hraničnímu přechodu', popis: 'pěší přechod zůstává otevřený', de: 'Wintersperre des Weges' },
]

export function Uvod({ banner }: { banner: ReactNode; foto: boolean }) {
  const v = useHodnoty()
  return (
    <>
      {banner}
      <Hlavicka />
      <main id="obsah" tabIndex={-1}>
        <h1 className="sr">Obec Javoří Lhota, Gemeinde Javoří Lhota</h1>
        <div className="capella-foto">
          <Foto sablona="hranice" styl={{ width: '100%', height: 'clamp(320px, 46vw, 600px)' }} />
        </div>
        <div className="capella-pod">
          <section
            className="capella-panel"
            aria-label="Úvod obce, česky a německy"
            data-oba={v.showBoth ? '' : undefined}
            style={{ background: 'var(--bg)', boxShadow: '0 0 0 1px var(--line)' }}
          >
            {v.showCs ? (
              <div lang="cs" className="capella-sloupec">
                <p className="capella-jazyk-popis" style={{ color: 'var(--muted)' }}>Česky</p>
                <h2 className="capella-titulek" style={{ fontFamily: SERIF }}>Obec, ze které je to do Bavorska 4 kilometry</h2>
                <p style={{ margin: '0 0 16px', maxWidth: '46ch' }}>
                  {'Žijeme u hranice s Bavorskem. Co platí u nás, co za hranicí a co děláme společně s obcí Waldkirchen am Grenzbach.'}
                </p>
                <p style={{ margin: '0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <a className="hit" href="/sluzby/platby">Zaplatit poplatky</a>
                  <a className="hit" href="/uredni-deska">Úřední deska</a>
                  <a className="hit" href="/obecni-urad">{'Práce a lékař v Německu'}</a>
                </p>
              </div>
            ) : null}
            {v.showDe ? (
              <div lang="de" className="capella-sloupec">
                <p className="capella-jazyk-popis" style={{ color: 'var(--muted)' }}>Deutsch</p>
                <h2 className="capella-titulek" style={{ fontFamily: SERIF }}>Ein Dorf, vier Kilometer von Bayern entfernt</h2>
                <p style={{ margin: '0 0 16px', maxWidth: '46ch' }}>
                  Wir leben an der Grenze zu Bayern. Was bei uns gilt, was drüben gilt und was wir gemeinsam mit Waldkirchen am Grenzbach machen.
                </p>
                <p style={{ margin: '0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <a className="hit" href="/obecni-urad">Wanderwege und Radwege</a>
                  <a className="hit" href="/obecni-urad">Unterkunft im Dorf</a>
                  <a className="hit" href="/obecni-urad">Notdienst und Ärzte</a>
                </p>
              </div>
            ) : null}
          </section>
          <section aria-labelledby="deska" className="capella-deska">
            <h2 id="deska" style={{ margin: '0 0 8px', fontFamily: SERIF, fontSize: '28px' }}>Úřední deska</h2>
            <p style={{ margin: '0 0 8px', color: 'var(--muted)', fontSize: '15px' }}>
              {'Úřední dokumenty jsou česky. '}
              <span lang="de">Amtliche Dokumente erscheinen auf Tschechisch.</span>
            </p>
            <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
              <li style={{ borderTop: '1px solid var(--line)', padding: '4px 0' }}>
                <a className="hit" href="/uredni-deska/navrh-rozpoctu-2027">Návrh rozpočtu obce na rok 2027</a>
              </li>
              <li style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '4px 0' }}>
                <a className="hit" href="/uredni-deska/uzavirka-mostu">Uzavírka mostu přes Javornický potok</a>
              </li>
            </ul>
          </section>
        </div>
        <section aria-labelledby="spolecne" style={{ background: 'var(--surface)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px clamp(16px, 4vw, 32px)' }}>
            <h2 id="spolecne" style={{ margin: '0 0 24px', fontFamily: SERIF, fontSize: 'clamp(28px, 3vw, 34px)' }}>
              {'Společně '}
              <span lang="de" style={{ color: 'var(--muted)' }}>/ Gemeinsam</span>
            </h2>
            <ul className="capella-akce" style={{ listStyle: 'none', margin: '0', padding: '0' }}>
              {AKCE.map((a) => (
                <li key={a.nazev} style={{ borderTop: '1px solid var(--ink)', paddingTop: '16px', display: 'flex', gap: '16px' }}>
                  <span style={{ flex: '0 0 48px', fontFamily: SERIF, lineHeight: '1.1', color: 'var(--ink)' }}>
                    <span style={{ display: 'block', fontSize: '32px', fontVariantNumeric: 'tabular-nums' }}>{a.den}</span>
                    <span style={{ display: 'block', fontSize: '15px', color: 'var(--muted)' }}>{a.mesic}</span>
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <a className="hit" href={a.href} style={{ fontWeight: '600', color: 'var(--ink)' }}>
                      {a.nazev}
                    </a>
                    <span style={{ display: 'block', fontSize: '15px', color: 'var(--muted)' }}>{a.popis}</span>
                    <span lang="de" style={{ display: 'block', fontSize: '15px', color: 'var(--muted)' }}>
                      {a.de}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px clamp(16px, 4vw, 32px) 72px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '40px' }}>
          <section aria-labelledby="pres-hranici">
            <h2 id="pres-hranici" style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: '600' }}>Přes hranici</h2>
            <p style={{ margin: '0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <a className="hit" href="/obecni-urad">{'Práce v Bavorsku a pojištění'}</a>
              <a className="hit" href="/obecni-urad">Lékařská pohotovost na obou stranách</a>
              <a className="hit" href="/obecni-urad">Autobus do Waldkirchenu</a>
            </p>
          </section>
          <section aria-labelledby="napiste">
            <h2 id="napiste" style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: '600' }}>
              {'Napište nám '}
              <span lang="de" style={{ color: 'var(--muted)', fontWeight: '500' }}>/ Schreiben Sie uns</span>
            </h2>
            <p style={{ margin: '0' }}>
              Náves 1, Javoří Lhota
              <br />
              [TELEFON]
              <br />
              <a className="hit" href="/obecni-urad">[E-MAIL]</a>
              <br />
              {'Mluvíme česky a německy.'}
            </p>
          </section>
        </div>
      </main>
      <Paticka />
    </>
  )
}
