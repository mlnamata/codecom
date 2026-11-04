/** Úvod šablony 21 Sklo: fotka přes celou šířku, nad ní matné skleněné panely. Obsah z dat Javoří Lhoty. */
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
      <div className={foto ? 'sk-scena' : 'sk-scena sk-bez-fotky'}>
        <Hlavicka />
        <main id="obsah" tabIndex={-1}>
          <section className="sk-hero" aria-labelledby="sk-nadpis">
            {foto ? <Foto sablona="sklo" soubor="sablona-09-hreben.webp" styl={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} /> : null}
            <div className="sk-obal sk-hero-mrizka">
              <div className="sk-sklo sk-panel sk-uvitani">
                <h1 id="sk-nadpis">Obec Javoří Lhota</h1>
                <p className="sk-perex">684 obyvatel, okres Klatovy. Tady najdete všechno, co obec zveřejňuje, a co se dá vyřídit bez cesty na úřad.</p>
                <p className="sk-dnes">
                  {'Dnes, v pondělí, má úřad otevřeno '}
                  <strong>od 8 do 17 hodin</strong>. Starostka Marie Šťastná přijímá občany od 15 hodin.
                </p>
              </div>
              <section className="sk-sklo sk-panel" aria-labelledby="sk-ukony">
                <h2 id="sk-ukony">Nejčastější úkony</h2>
                <ul className="sk-ukony">
                  {UKONY.map((u) => (
                    <li key={u.text}>
                      <a href={u.href}>{u.text}</a>
                      <span>{u.popis}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </section>

          <div className="sk-obal sk-mrizka">
            <section className="sk-karta sk-deska" aria-labelledby="sk-deska">
              <div className="sk-hlava-karty">
                <h2 id="sk-deska">Úřední deska</h2>
                <a href="/uredni-deska">Celá úřední deska</a>
              </div>
              <ul className="sk-seznam">
                {data.deska.slice(0, 4).map((d) => (
                  <li key={d.id}>
                    <a href={d.href}>{d.nazev}</a>
                    <span className="sk-tlumene">
                      {kategorie(d.kategorie)}, visí do {denCely(d.vyvesenoDo)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="sk-karta" aria-labelledby="sk-zpravy">
              <div className="sk-hlava-karty">
                <h2 id="sk-zpravy">Zprávy z obce</h2>
                <a href="/aktuality">Všechny zprávy</a>
              </div>
              <ul className="sk-seznam">
                {data.aktuality.slice(0, 3).map((x) => (
                  <li key={x.id}>
                    <span className="sk-tlumene">{denSlovem(x.publikovanoDen)}</span>
                    <a href={x.href} className="sk-titulek">
                      {x.titulek}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="sk-karta" aria-labelledby="sk-akce">
              <h2 id="sk-akce">Akce</h2>
              <ul className="sk-seznam">
                {data.akce.slice(0, 3).map((a) => (
                  <li key={a.id}>
                    <span className="sk-datum">{denSlovem(a.den)}</span>
                    <a href={a.href}>{a.nazev}</a>
                    <span className="sk-tlumene">{a.misto}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="sk-karta" aria-labelledby="sk-urad">
              <h2 id="sk-urad">Obecní úřad</h2>
              <dl className="sk-kontakt">
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
