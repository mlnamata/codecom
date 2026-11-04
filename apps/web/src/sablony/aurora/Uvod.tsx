/** Úvod šablony 23 Bellatrix: jemný barevný přechod a skleněné karty. Obsah z dat Javoří Lhoty. */
import type { ReactNode } from 'react'
import type { DataUvodu } from '../sdilene/typy'
import { Foto } from '../sdilene/Foto'
import { denCely, denSlovem } from '../sdilene/format'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'

const UKONY = [
  { text: 'Zaplatit poplatek za odpad', href: '/sluzby/platby', popis: '900 Kč na osobu a rok, splatný do 31. května' },
  { text: 'Nahlásit závadu', href: '/sluzby/nahlasit-zavadu', popis: 'lampa, výmol, rozbitá lavička, černá skládka' },
  { text: 'Zjistit termín svozu odpadu', href: '/sluzby#svoz-odpadu', popis: 'kalendář podle ulice, bioodpad do 20. listopadu' },
  { text: 'Objednat se na úřad', href: '/sluzby#objednat-se-na-urad', popis: 'Czech POINT, ověření podpisu, přihlášení k pobytu' },
]

export function Uvod({ banner, data, foto }: { banner: ReactNode; data: DataUvodu; foto: boolean }) {
  const kategorie = (slug: string) => data.kategorieDesky.find((k) => k.slug === slug)?.nazev ?? slug
  return (
    <>
      {banner}
      <div className="au-pozadi">
        <Hlavicka />
        <main id="obsah" tabIndex={-1} className="au-obal">
          <section className={foto ? 'au-hero' : 'au-hero au-bez-fotky'} aria-labelledby="au-nadpis">
            <div className="au-uvitani">
              <h1 id="au-nadpis">Obec Javoří Lhota</h1>
              <p className="au-perex">684 obyvatel, okres Klatovy. Tady najdete všechno, co obec zveřejňuje, a co se dá vyřídit bez cesty na úřad.</p>
              <p className="au-dnes au-sklo">
                {'Dnes, v pondělí, má úřad otevřeno '}
                <strong>od 8 do 17 hodin</strong>. Starostka Marie Šťastná přijímá občany od 15 hodin.
              </p>
            </div>
            {foto ? (
              <div className="au-ram au-sklo">
                <Foto sablona="aurora" soubor="sablona-19-mikroregion.webp" styl={{ width: '100%', aspectRatio: '4 / 3', borderRadius: '22px' }} />
              </div>
            ) : null}
          </section>

          <section className="au-sekce" aria-labelledby="au-ukony">
            <h2 id="au-ukony">Nejčastější úkony</h2>
            <ul className="au-ukony">
              {UKONY.map((u, i) => (
                <li key={u.text} className="au-sklo">
                  <span className={`au-tecka au-tecka-${i % 3}`} aria-hidden="true"></span>
                  <a href={u.href}>{u.text}</a>
                  <span className="au-tlumene">{u.popis}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="au-bento">
            <section className="au-sklo au-karta au-deska" aria-labelledby="au-deska">
              <div className="au-hlava">
                <h2 id="au-deska">Úřední deska</h2>
                <a href="/uredni-deska">Celá úřední deska</a>
              </div>
              <ul className="au-seznam">
                {data.deska.slice(0, 4).map((d) => (
                  <li key={d.id}>
                    <a href={d.href}>{d.nazev}</a>
                    <span className="au-tlumene">
                      {kategorie(d.kategorie)}, visí do {denCely(d.vyvesenoDo)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="au-sklo au-karta" aria-labelledby="au-akce">
              <h2 id="au-akce">Akce</h2>
              <ul className="au-seznam">
                {data.akce.slice(0, 3).map((a) => (
                  <li key={a.id}>
                    <span className="au-datum">{denSlovem(a.den)}</span>
                    <a href={a.href}>{a.nazev}</a>
                    <span className="au-tlumene">{a.misto}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="au-sklo au-karta" aria-labelledby="au-zpravy">
              <div className="au-hlava">
                <h2 id="au-zpravy">Zprávy z obce</h2>
                <a href="/aktuality">Všechny zprávy</a>
              </div>
              <ul className="au-seznam">
                {data.aktuality.slice(0, 3).map((x) => (
                  <li key={x.id}>
                    <span className="au-tlumene">{denSlovem(x.publikovanoDen)}</span>
                    <a href={x.href} className="au-titulek">
                      {x.titulek}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="au-sklo au-karta au-urad" aria-labelledby="au-urad">
              <h2 id="au-urad">Obecní úřad</h2>
              <dl className="au-kontakt">
                <dt>Úřední hodiny</dt>
                <dd>pondělí a středa 8 až 17, úterý a čtvrtek 8 až 12</dd>
                <dt>Adresa</dt>
                <dd>Náves 1, [PSČ] Javoří Lhota</dd>
                <dt>Telefon</dt>
                <dd>[TELEFON]</dd>
                <dt>E-mail</dt>
                <dd>
                  <a href="/obecni-urad">[E-MAIL]</a>
                </dd>
                <dt>Datová schránka</dt>
                <dd>[ID DS]</dd>
              </dl>
            </section>
          </div>
        </main>
      </div>
      <Paticka />
    </>
  )
}
