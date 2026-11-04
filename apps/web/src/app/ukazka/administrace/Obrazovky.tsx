'use client'

/**
 * Interaktivní obrazovky tří úrovní editoru. Stav se drží jen v prohlížeči: ukazují,
 * co která úroveň dovolí, a změny se na veřejný web nezapisují (kromě volby vzhledu,
 * kterou si návštěvník ukázky může zobrazit na webu).
 */
import { useState } from 'react'
import { kontrast } from '@codekom/tokeny'
import { NAZEV_UROVNE, pocet, type Schopnosti, type Uroven } from '@/ukazka/uroven'

const Hlaska = ({ text }: { text: string }) =>
  text ? (
    <p role="status" className="uspech" style={{ marginTop: 16 }}>
      {text}
    </p>
  ) : (
    <p role="status" className="sr-only" />
  )

/* ------------------------------------------------------------ stránky a menu */

interface PolozkaMenu {
  id: number
  nazev: string
  uroven: number
}

const MENU: PolozkaMenu[] = [
  { id: 1, nazev: 'Obecní úřad', uroven: 0 },
  { id: 2, nazev: 'Úřední deska', uroven: 1 },
  { id: 3, nazev: 'Zastupitelstvo', uroven: 1 },
  { id: 4, nazev: 'Život v obci', uroven: 0 },
  { id: 5, nazev: 'Akce', uroven: 1 },
  { id: 6, nazev: 'Služby', uroven: 0 },
  { id: 7, nazev: 'Kontakty', uroven: 0 },
]

export function EditorMenu({ s, uroven }: { s: Schopnosti; uroven: Uroven }) {
  const [menu, setMenu] = useState(MENU)
  const [novy, setNovy] = useState('')
  const [hlaska, setHlaska] = useState('')
  const posun = (i: number, o: number) => {
    const j = i + o
    if (j < 0 || j >= menu.length) return
    const m = [...menu]
    ;[m[i], m[j]] = [m[j]!, m[i]!]
    setMenu(m)
    setHlaska(`Položka ${m[j]!.nazev} je na ${j + 1}. místě.`)
  }
  const vnor = (i: number, o: number) => {
    const m = menu.map((x, k) => (k === i ? { ...x, uroven: Math.max(0, Math.min(s.urovniMenu - 1, x.uroven + o)) } : x))
    setMenu(m)
    setHlaska(`Položka ${m[i]!.nazev} je v ${m[i]!.uroven + 1}. úrovni menu.`)
  }
  return (
    <>
      <p>
        V úrovni {NAZEV_UROVNE[uroven]} menu {s.pridatDoMenu ? `upravujete, přidáváte a vnořujete do ${s.urovniMenu} úrovní` : 'přejmenujete a přeskládáte'}. Podstránek můžete mít {pocet(s.podstranky)}.
      </p>
      <ol className="seznam-bloku" aria-label="Hlavní menu">
        {menu.map((p, i) => (
          <li key={p.id} style={{ marginLeft: p.uroven * 32 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0, fontWeight: 500, flex: '1 1 240px' }}>
              <span className="sr-only">Název položky {i + 1}</span>
              <input
                type="text"
                value={p.nazev}
                onChange={(e) => setMenu(menu.map((x) => (x.id === p.id ? { ...x, nazev: e.target.value } : x)))}
                style={{ maxWidth: 320, margin: 0 }}
              />
            </label>
            <span className="radek-akci">
              <button type="button" className="mala" onClick={() => posun(i, -1)} disabled={i === 0} aria-label={`Posunout ${p.nazev} nahoru`}>
                Nahoru
              </button>
              <button type="button" className="mala" onClick={() => posun(i, 1)} disabled={i === menu.length - 1} aria-label={`Posunout ${p.nazev} dolů`}>
                Dolů
              </button>
              {s.urovniMenu > 1 ? (
                <>
                  <button type="button" className="mala" onClick={() => vnor(i, 1)} disabled={p.uroven >= s.urovniMenu - 1 || i === 0} aria-label={`Vnořit ${p.nazev}`}>
                    Vnořit
                  </button>
                  <button type="button" className="mala" onClick={() => vnor(i, -1)} disabled={p.uroven === 0} aria-label={`Vynořit ${p.nazev}`}>
                    Vynořit
                  </button>
                </>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
      {s.pridatDoMenu ? (
        <form
          className="radek-akci"
          onSubmit={(e) => {
            e.preventDefault()
            if (novy.trim().length < 2) return setHlaska('Napište název nové položky.')
            setMenu([...menu, { id: Date.now(), nazev: novy.trim(), uroven: 0 }])
            setHlaska(`Položka ${novy.trim()} je přidaná na konec menu.`)
            setNovy('')
          }}
        >
          <label htmlFor="nova-polozka" style={{ margin: 0 }}>
            Nová položka
          </label>
          <input id="nova-polozka" type="text" value={novy} onChange={(e) => setNovy(e.target.value)} style={{ maxWidth: 280, margin: 0 }} />
          <button type="submit" className="mala hlavni">
            Přidat do menu
          </button>
        </form>
      ) : (
        <p className="zamcena-stranka">Přidávat a vnořovat položky menu jde od úrovně Pokročilý. V Základu má menu pevné položky šablony.</p>
      )}
      <Hlaska text={hlaska} />
    </>
  )
}

/* ------------------------------------------------------------ skladatel úvodní stránky */

export type Zona = 'hlavni' | 'bocni' | 'hero' | 'spodni'
export type CastWebu = 'uvod' | 'deska' | 'blog' | 'urad' | 'sluzby'

interface Blok {
  id: string
  nazev: string
  kategorie?: string
  skryty: boolean
  sloupce: number
  od: Uroven
  styl?: 'karty' | 'seznam' | 'mrizka'
  pocetPolozek?: number
  zona: Zona
}

const NAZVY_ZON: Record<Zona, string> = {
  hlavni: 'Hlavní sloupec',
  bocni: 'Boční panel (Sidebar)',
  hero: 'Horní Hero pás',
  spodni: 'Spodní servisní pás',
}

const KNIHOVNA: Blok[] = [
  { id: 'hero-uvod', nazev: 'Uvítací pás a panorama', kategorie: 'Úvod', skryty: false, sloupce: 1, od: 'pokrocily', styl: 'karty', zona: 'hero' },
  { id: 'deska', nazev: 'Úřední deska', kategorie: 'Úřad', skryty: false, sloupce: 1, od: 'pokrocily', styl: 'seznam', pocetPolozek: 5, zona: 'hlavni' },
  { id: 'aktuality', nazev: 'Aktuality a blog', kategorie: 'Zprávy', skryty: false, sloupce: 1, od: 'pokrocily', styl: 'karty', pocetPolozek: 3, zona: 'hlavni' },
  { id: 'rozhlas', nazev: 'Hlášení rozhlasu', kategorie: 'Zprávy', skryty: false, sloupce: 1, od: 'pokrocily', styl: 'seznam', pocetPolozek: 3, zona: 'hlavni' },
  { id: 'ukony', nazev: 'Rychlé úkony a formuláře', kategorie: 'Úřad', skryty: false, sloupce: 1, od: 'pokrocily', styl: 'karty', pocetPolozek: 4, zona: 'bocni' },
  { id: 'pocasi', nazev: 'Počasí na návsi a radar', kategorie: 'Informace', skryty: false, sloupce: 1, od: 'pokrocily', styl: 'karty', pocetPolozek: 1, zona: 'bocni' },
  { id: 'akce', nazev: 'Kalendář akcí', kategorie: 'Zprávy', skryty: false, sloupce: 1, od: 'pokrocily', styl: 'seznam', pocetPolozek: 4, zona: 'bocni' },
  { id: 'urad', nazev: 'Úřední hodiny a kontakty', kategorie: 'Úřad', skryty: false, sloupce: 1, od: 'pokrocily', styl: 'karty', pocetPolozek: 1, zona: 'bocni' },
  { id: 'iot', nazev: 'Živá IoT data a vodočet potoka', kategorie: 'Chytrá obec', skryty: false, sloupce: 1, od: 'pokrocily', styl: 'karty', pocetPolozek: 4, zona: 'spodni' },
  { id: 'komunita', nazev: 'Obecní půjčovna a sousedský bazar', kategorie: 'Komunita', skryty: false, sloupce: 1, od: 'pokrocily', styl: 'karty', pocetPolozek: 3, zona: 'spodni' },
]

const PRIDAT: Blok[] = [
  { id: 'aed', nazev: 'AED defibrilátory a první pomoc', kategorie: 'Bezpečnost', skryty: false, sloupce: 1, od: 'pokrocily', styl: 'karty', zona: 'bocni' },
  { id: 'spolujizda', nazev: 'Sousedská spolujízda a dojíždění', kategorie: 'Komunita', skryty: false, sloupce: 1, od: 'pokrocily', styl: 'seznam', zona: 'spodni' },
  { id: 'mapa', nazev: 'Interaktivní mapa katastru', kategorie: 'Mapy', skryty: false, sloupce: 1, od: 'pokrocily', styl: 'karty', zona: 'spodni' },
  { id: 'faq', nazev: 'Časté dotazy občanů (FAQ)', kategorie: 'Úřad', skryty: false, sloupce: 1, od: 'pokrocily', styl: 'seznam', zona: 'hlavni' },
  { id: 'odpocet', nazev: 'Odpočet do obecní slavnosti', kategorie: 'Události', skryty: false, sloupce: 1, od: 'pokrocily', styl: 'karty', zona: 'hero' },
  { id: 'sekce', nazev: 'Sekce se sloupci a pozadím', kategorie: 'Rozvržení', skryty: false, sloupce: 2, od: 'advance', styl: 'mrizka', zona: 'hlavni' },
  { id: 'kod', nazev: 'Vložený kód a externí widget', kategorie: 'Kód', skryty: false, sloupce: 1, od: 'advance', styl: 'karty', zona: 'hlavni' },
]

export function Skladatel({ s }: { s: Schopnosti }) {
  const [castWebu, setCastWebu] = useState<CastWebu>('uvod')
  const [filtrZony, setFiltrZony] = useState<'vse' | Zona>('vse')
  const [bloky, setBloky] = useState(KNIHOVNA)
  const [zarizeni, setZarizeni] = useState<'desktop' | 'tablet' | 'mobil'>('desktop')
  const [hlaska, setHlaska] = useState('')

  const zmen = (id: string, z: Partial<Blok>) => setBloky(bloky.map((b) => (b.id === id ? { ...b, ...z } : b)))
  const posun = (i: number, o: number) => {
    const j = i + o
    if (j < 0 || j >= bloky.length) return
    const m = [...bloky]
    const docasny = m[i]
    const druhy = m[j]
    if (!docasny || !druhy) return
    m[i] = druhy
    m[j] = docasny
    setBloky(m)
    setHlaska(`Blok ${m[j]?.nazev ?? ''} je na ${j + 1}. místě.`)
  }

  const sirkaOkna = zarizeni === 'desktop' ? '100%' : zarizeni === 'tablet' ? '760px' : '375px'

  const filtrovaneBloky = filtrZony === 'vse' ? bloky : bloky.filter((b) => b.zona === filtrZony)
  const heroBloky = bloky.filter((b) => !b.skryty && b.zona === 'hero')
  const hlavniBloky = bloky.filter((b) => !b.skryty && b.zona === 'hlavni')
  const bocniBloky = bloky.filter((b) => !b.skryty && b.zona === 'bocni')
  const spodniBloky = bloky.filter((b) => !b.skryty && b.zona === 'spodni')

  return (
    <div className="admin-skladatel-kontejner">
      {/* Přepínač částí a podstránek šablony webu */}
      <div className="admin-zalozky" role="tablist" aria-label="Výběr části webu">
        <button
          type="button"
          role="tab"
          aria-selected={castWebu === 'uvod'}
          className="admin-zalozka-tlacitko"
          onClick={() => setCastWebu('uvod')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
          <span>Úvodní stránka (Vícesloupcový layout)</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={castWebu === 'deska'}
          className="admin-zalozka-tlacitko"
          onClick={() => setCastWebu('deska')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span>Úřední deska</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={castWebu === 'blog'}
          className="admin-zalozka-tlacitko"
          onClick={() => setCastWebu('blog')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
          </svg>
          <span>Článek a blog</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={castWebu === 'urad'}
          className="admin-zalozka-tlacitko"
          onClick={() => setCastWebu('urad')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          </svg>
          <span>Kontakty a úřad</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={castWebu === 'sluzby'}
          className="admin-zalozka-tlacitko"
          onClick={() => setCastWebu('sluzby')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="4" y="4" width="16" height="16" rx="2" />
          </svg>
          <span>Chytrá obec a IoT</span>
        </button>
      </div>

      {castWebu === 'uvod' ? (
        <div className="admin-skladatel-rozvrzeni">
          <div style={{ minWidth: 0 }}>
            {/* Přepínač zón úvodní šablony */}
            <div style={{ marginBottom: 16 }}>
              <span className="vedlejsi" style={{ display: 'block', fontSize: 13, marginBottom: 8 }}>
                Filtrovat zónu rozvržení šablony:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <button
                  type="button"
                  className="admin-kategorie-pilulka"
                  aria-pressed={filtrZony === 'vse'}
                  onClick={() => setFiltrZony('vse')}
                >
                  Všechny části ({bloky.length})
                </button>
                <button
                  type="button"
                  className="admin-kategorie-pilulka"
                  aria-pressed={filtrZony === 'hlavni'}
                  onClick={() => setFiltrZony('hlavni')}
                >
                  Hlavní sloupec ({bloky.filter((b) => b.zona === 'hlavni').length})
                </button>
                <button
                  type="button"
                  className="admin-kategorie-pilulka"
                  aria-pressed={filtrZony === 'bocni'}
                  onClick={() => setFiltrZony('bocni')}
                >
                  Boční panel ({bloky.filter((b) => b.zona === 'bocni').length})
                </button>
                <button
                  type="button"
                  className="admin-kategorie-pilulka"
                  aria-pressed={filtrZony === 'hero'}
                  onClick={() => setFiltrZony('hero')}
                >
                  Horní Hero pás ({bloky.filter((b) => b.zona === 'hero').length})
                </button>
                <button
                  type="button"
                  className="admin-kategorie-pilulka"
                  aria-pressed={filtrZony === 'spodni'}
                  onClick={() => setFiltrZony('spodni')}
                >
                  Spodní servisní pás ({bloky.filter((b) => b.zona === 'spodni').length})
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
              <h2>Bloky úvodní stránky</h2>
              <span className="vedlejsi" style={{ fontSize: 13.5 }}>
                Aktivních: {bloky.filter((b) => !b.skryty).length} z {bloky.length} widgetů ve více částech šablony
              </span>
            </div>

            <ol className="seznam-bloku" style={{ listStyle: 'none', padding: 0 }}>
              {filtrovaneBloky.map((b) => {
                const skutecnyIndex = bloky.findIndex((x) => x.id === b.id)
                return (
                  <li key={b.id} className={b.skryty ? 'skryty' : undefined} style={{ display: 'block', padding: '14px 16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                        <span className="admin-widget-kategorie-stitek">{b.kategorie || 'Widget'}</span>
                        <span className="admin-stitek-tag">{NAZVY_ZON[b.zona]}</span>
                        <strong style={{ fontSize: 15 }}>{b.nazev}</strong>
                        {b.skryty ? <span className="vedlejsi" style={{ fontSize: 13 }}>(skrytý)</span> : null}
                      </div>

                      <span className="radek-akci">
                        <button
                          type="button"
                          className="mala"
                          onClick={() => posun(skutecnyIndex, -1)}
                          disabled={skutecnyIndex === 0}
                          aria-label={`Posunout ${b.nazev} nahoru`}
                        >
                          Nahoru
                        </button>
                        <button
                          type="button"
                          className="mala"
                          onClick={() => posun(skutecnyIndex, 1)}
                          disabled={skutecnyIndex === bloky.length - 1}
                          aria-label={`Posunout ${b.nazev} dolů`}
                        >
                          Dolů
                        </button>
                        <button
                          type="button"
                          className="mala"
                          aria-pressed={b.skryty}
                          onClick={() => {
                            zmen(b.id, { skryty: !b.skryty })
                            setHlaska(`Blok ${b.nazev} je ${b.skryty ? 'zobrazený' : 'skrytý'}.`)
                          }}
                        >
                          {b.skryty ? 'Zobrazit' : 'Skrýt'}
                        </button>
                      </span>
                    </div>

                    <div className="admin-widget-nastaveni-radek">
                      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, margin: 0, fontWeight: 500 }}>
                        Část šablony:
                        <select
                          value={b.zona}
                          onChange={(e) => zmen(b.id, { zona: e.target.value as Zona })}
                          style={{ minHeight: 34, padding: '4px 8px', fontSize: 13 }}
                        >
                          <option value="hlavni">Hlavní sloupec</option>
                          <option value="bocni">Boční panel (Sidebar)</option>
                          <option value="hero">Horní Hero pás</option>
                          <option value="spodni">Spodní pás služeb</option>
                        </select>
                      </label>

                      {s.sloupce ? (
                        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, margin: 0, fontWeight: 400 }}>
                          Šířka:
                          <select
                            value={b.sloupce}
                            onChange={(e) => zmen(b.id, { sloupce: Number(e.target.value) })}
                            style={{ width: 110, margin: 0, minHeight: 34, padding: '4px 8px', fontSize: 13 }}
                          >
                            <option value={1}>1 sloupec</option>
                            <option value={2}>2 sloupce</option>
                            <option value={3}>3 sloupce</option>
                            <option value={4}>Plná šířka</option>
                          </select>
                        </label>
                      ) : null}

                      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, margin: 0, fontWeight: 400 }}>
                        Styl:
                        <select
                          value={b.styl || 'karty'}
                          onChange={(e) => zmen(b.id, { styl: e.target.value as 'karty' | 'seznam' | 'mrizka' })}
                          style={{ width: 130, margin: 0, minHeight: 34, padding: '4px 8px', fontSize: 13 }}
                        >
                          <option value="karty">Vizuální karty</option>
                          <option value="seznam">Kompaktní seznam</option>
                          <option value="mrizka">Mřížka s ikonami</option>
                        </select>
                      </label>

                      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, margin: 0, fontWeight: 400 }}>
                        Položek:
                        <select
                          value={b.pocetPolozek || 4}
                          onChange={(e) => zmen(b.id, { pocetPolozek: Number(e.target.value) })}
                          style={{ width: 70, margin: 0, minHeight: 34, padding: '4px 8px', fontSize: 13 }}
                        >
                          <option value={1}>1</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={8}>8</option>
                        </select>
                      </label>
                    </div>
                  </li>
                )
              })}
            </ol>

            <h2 style={{ marginTop: 28 }}>Přidat z knihovny</h2>
            <ul className="seznam-bloku">
              {PRIDAT.map((b) => {
                const zamceny = b.od === 'advance' && !s.sloupce
                const pridany = bloky.some((x) => x.id === b.id)
                return (
                  <li key={b.id}>
                    <div>
                      <span style={{ fontWeight: 600 }}>{b.nazev}</span>
                      <span className="admin-widget-kategorie-stitek" style={{ marginLeft: 8 }}>
                        {b.kategorie}
                      </span>
                      <span className="admin-stitek-tag" style={{ marginLeft: 6 }}>
                        {NAZVY_ZON[b.zona]}
                      </span>
                      {zamceny ? <span className="admin__od" style={{ marginLeft: 8 }}>od Advance</span> : null}
                    </div>
                    <button
                      type="button"
                      className="mala"
                      disabled={zamceny || pridany}
                      onClick={() => {
                        setBloky([...bloky, b])
                        setHlaska(`Blok ${b.nazev} je přidaný do šablony.`)
                      }}
                    >
                      {pridany ? 'Přidáno' : zamceny ? 'Zamčeno' : 'Přidat'}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Živý náhled vícedílné šablony */}
          <aside aria-label="Náhled pořadí" style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
              <h2 style={{ margin: 0 }}>Náhled rozvržení</h2>
              <div className="admin-zarizeni-lista" role="group" aria-label="Přepnout zařízení náhledu">
                <button
                  type="button"
                  className="admin-zarizeni-tlacitko"
                  aria-pressed={zarizeni === 'desktop'}
                  onClick={() => setZarizeni('desktop')}
                >
                  Počítač
                </button>
                <button
                  type="button"
                  className="admin-zarizeni-tlacitko"
                  aria-pressed={zarizeni === 'tablet'}
                  onClick={() => setZarizeni('tablet')}
                >
                  Tablet
                </button>
                <button
                  type="button"
                  className="admin-zarizeni-tlacitko"
                  aria-pressed={zarizeni === 'mobil'}
                  onClick={() => setZarizeni('mobil')}
                >
                  Mobil
                </button>
              </div>
            </div>

            <div
              className="admin-nahled-okno"
              style={{
                width: '100%',
                maxWidth: sirkaOkna,
                margin: '0 auto',
                background: 'var(--surface)',
                padding: 12,
              }}
            >
              {/* Náhled záhlaví */}
              <div style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: 6, padding: '8px 12px', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                <strong>Záhlaví obce Javoří Lhota</strong>
                <span className="vedlejsi">Menu a vyhledávání</span>
              </div>

              {/* Náhled Hero zóny */}
              {heroBloky.length > 0 ? (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', marginBottom: 4 }}>
                    HORNÍ HERO PÁS
                  </div>
                  {heroBloky.map((b) => (
                    <div
                      key={b.id}
                      style={{
                        background: '#ffffff',
                        border: '1px solid var(--line)',
                        borderRadius: 6,
                        padding: '8px 10px',
                        marginBottom: 6,
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
                      }}
                    >
                      <strong style={{ fontSize: 13 }}>{b.nazev}</strong>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Dvou/třísloupcové tělo: Hlavní sloupec + Boční panel */}
              <div
                style={{
                  display: zarizeni === 'desktop' ? 'grid' : 'flex',
                  gridTemplateColumns: zarizeni === 'desktop' ? '1.3fr 1fr' : undefined,
                  flexDirection: zarizeni === 'desktop' ? undefined : 'column',
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                {/* Hlavní sloupec */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', marginBottom: 4 }}>
                    HLAVNÍ SLOUPEC OBSAHU
                  </div>
                  {hlavniBloky.map((b) => (
                    <div
                      key={b.id}
                      style={{
                        background: '#ffffff',
                        border: '1px solid var(--line)',
                        borderRadius: 6,
                        padding: '8px 10px',
                        marginBottom: 6,
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <strong style={{ fontSize: 13 }}>{b.nazev}</strong>
                        <span className="vedlejsi" style={{ fontSize: 11 }}>{b.styl}</span>
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--muted)', background: 'var(--surface)', padding: '4px 6px', borderRadius: 4 }}>
                        {b.id === 'deska' ? 'Úřední dokumenty a vyhlášky' : b.id === 'aktuality' ? 'Články a novinky z radnice' : 'Hlášení rozhlasu'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Boční panel (Sidebar) */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', marginBottom: 4 }}>
                    BOČNÍ PANEL (SIDEBAR)
                  </div>
                  {bocniBloky.map((b) => (
                    <div
                      key={b.id}
                      style={{
                        background: '#ffffff',
                        border: '1px solid var(--line)',
                        borderRadius: 6,
                        padding: '8px 10px',
                        marginBottom: 6,
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <strong style={{ fontSize: 13 }}>{b.nazev}</strong>
                        <span className="vedlejsi" style={{ fontSize: 11 }}>boční</span>
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--muted)', background: 'var(--surface)', padding: '4px 6px', borderRadius: 4 }}>
                        {b.id === 'pocasi' ? 'Meteo: 9 °C · Polojasno' : b.id === 'akce' ? 'Kulturní a sportovní akce' : b.id === 'urad' ? 'Úřední hodiny: Po a St' : 'Rychlá navigace'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spodní servisní pás */}
              {spodniBloky.length > 0 ? (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', marginBottom: 4 }}>
                    SPODNÍ SERVISNÍ PÁS (CHYTRÁ OBEC A SLUŽBY)
                  </div>
                  {spodniBloky.map((b) => (
                    <div
                      key={b.id}
                      style={{
                        background: '#ffffff',
                        border: '1px solid var(--line)',
                        borderRadius: 6,
                        padding: '8px 10px',
                        marginBottom: 6,
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
                      }}
                    >
                      <strong style={{ fontSize: 13 }}>{b.nazev}</strong>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Náhled patičky */}
              <div style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: 6, padding: '8px 12px', fontSize: 11.5, color: 'var(--muted)', textAlign: 'center' }}>
                Zápatí webu · Kontakty, mapa stránek a povinné informace
              </div>
            </div>

            <p style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 12 }}>
              Šablony CodeKom skládají web z více částí (horní hero, hlavní sloupec, boční panel, spodní servisní pás a zápatí). Na mobilu se boční panel automaticky přizpůsobí.
            </p>
          </aside>
        </div>
      ) : (
        /* Správa ostatních částí a podstránek webu */
        <div className="panel-bily" style={{ maxWidth: 780 }}>
          <h2 style={{ marginTop: 0 }}>
            {castWebu === 'deska'
              ? 'Šablona úřední desky'
              : castWebu === 'blog'
                ? 'Šablona detailu článku a blogu'
                : castWebu === 'urad'
                  ? 'Šablona kontaktů a úředních hodin'
                  : 'Šablona portálu Chytrá obec'}
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>
            {castWebu === 'deska'
              ? 'Úřední deska obce má v každé šabloně vyhledávací panel, členění podle odborů a DIA standard.'
              : castWebu === 'blog'
                ? 'Články přebírají jednotnou typografii šablony, postranní infoboxy a související zprávy.'
                : castWebu === 'urad'
                  ? 'Stránka úřadu zobrazuje úřední hodiny s indikací otevřeno/zavřeno a kontaktní medailonky.'
                  : 'Modul chytré obce integruje živá IoT čidla, vodočet, obecní půjčovnu a mapu AED.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20 }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 14px', background: 'var(--surface)', borderRadius: 8 }}>
              <div>
                <strong>Režim zobrazení části webu</strong>
                <div className="vedlejsi" style={{ fontSize: 13 }}>Standardní zobrazení šablony přizpůsobené občanům</div>
              </div>
              <select style={{ width: 180, minHeight: 38 }}>
                <option>Vícesloupcový přehled</option>
                <option>Kompaktní tabulka</option>
                <option>Karty s filtrem</option>
              </select>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 14px', background: 'var(--surface)', borderRadius: 8 }}>
              <div>
                <strong>Umístění doplňkového bočního panelu</strong>
                <div className="vedlejsi" style={{ fontSize: 13 }}>Rychlé odkazy, úřední hodiny a související obsah</div>
              </div>
              <select style={{ width: 180, minHeight: 38 }}>
                <option>Vpravo od obsahu</option>
                <option>Vlevo od obsahu</option>
                <option>Vespod pod obsahem</option>
              </select>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 14px', background: 'var(--surface)', borderRadius: 8 }}>
              <div>
                <strong>Automatická integrace do vyhledávání</strong>
                <div className="vedlejsi" style={{ fontSize: 13 }}>Indexovat obsah této části pro fulltextové vyhledávání</div>
              </div>
              <input type="checkbox" defaultChecked style={{ width: 22, height: 22 }} />
            </label>
          </div>
        </div>
      )}

      <Hlaska text={hlaska} />
    </div>
  )
}

/* ------------------------------------------------------------ schvalování */

interface Prispevek {
  id: number
  nazev: string
  autor: string
  kde: string
  stav: 'ceka' | 'schvaleno' | 'vraceno'
  komentar?: string
}

const FRONTA: Prispevek[] = [
  { id: 1, nazev: 'Pozvánka na lampionový průvod', autor: 'Redaktorka, spolek Javořáček', kde: 'Akce', stav: 'ceka' },
  { id: 2, nazev: 'Zápis do mateřské školy 2027', autor: 'Ředitelka MŠ', kde: 'Podweb Mateřská škola', stav: 'ceka' },
  { id: 3, nazev: 'Výsledky sběru nebezpečného odpadu', autor: 'Účetní obce', kde: 'Aktuality', stav: 'ceka' },
]

export function Schvalovani({ vicestupnove }: { vicestupnove: boolean }) {
  const [fronta, setFronta] = useState(FRONTA)
  const [komentare, setKomentare] = useState<Record<number, string>>({})
  const [hlaska, setHlaska] = useState('')
  const zmen = (id: number, stav: Prispevek['stav']) => {
    const p = fronta.find((x) => x.id === id)!
    if (stav === 'vraceno' && !(komentare[id] ?? '').trim()) return setHlaska(`Napište komentář, proč příspěvek ${p.nazev} vracíte.`)
    setFronta(fronta.map((x) => (x.id === id ? { ...x, stav, komentar: komentare[id] } : x)))
    setHlaska(stav === 'schvaleno' ? `Příspěvek ${p.nazev} je schválený a zveřejněný.` : `Příspěvek ${p.nazev} je vrácený autorovi s komentářem.`)
  }
  return (
    <>
      <p>
        Redaktor napíše, schvalovatel schválí, nebo vrátí s komentářem.
        {vicestupnove ? ' V úrovni Advance můžete nastavit i dva stupně, například vedoucí odboru a potom starosta.' : ''}
      </p>
      <ul className="seznam-bloku">
        {fronta.map((p) => (
          <li key={p.id} style={{ display: 'block' }}>
            <p style={{ margin: 0, fontWeight: 600 }}>{p.nazev}</p>
            <p style={{ margin: '2px 0 8px', color: 'var(--muted)', fontSize: 15 }}>
              {p.autor}, {p.kde}
            </p>
            {p.stav === 'ceka' ? (
              <>
                <label htmlFor={`kom-${p.id}`} style={{ fontWeight: 500 }}>
                  Komentář pro autora
                </label>
                <input id={`kom-${p.id}`} type="text" value={komentare[p.id] ?? ''} onChange={(e) => setKomentare({ ...komentare, [p.id]: e.target.value })} style={{ maxWidth: 520 }} />
                <span className="radek-akci" style={{ marginTop: 8 }}>
                  <button type="button" className="mala hlavni" onClick={() => zmen(p.id, 'schvaleno')}>
                    Schválit a zveřejnit
                  </button>
                  <button type="button" className="mala" onClick={() => zmen(p.id, 'vraceno')}>
                    Vrátit s komentářem
                  </button>
                </span>
              </>
            ) : (
              <span className={`stav ${p.stav === 'schvaleno' ? 'dobre' : 'pozor'}`}>{p.stav === 'schvaleno' ? 'Schváleno' : `Vráceno: ${p.komentar}`}</span>
            )}
          </li>
        ))}
      </ul>
      <Hlaska text={hlaska} />
    </>
  )
}

/* ------------------------------------------------------------ vzhled */

type Tokeny = Record<string, string>

export function Vzhled({
  s,
  sablony,
  aktualni,
  palety,
}: {
  s: Schopnosti
  sablony: { klic: string; nazev: string }[]
  aktualni: string
  palety: Record<string, { nazev: string; tokeny: Tokeny }[]>
}) {
  const [sablona, setSablona] = useState(aktualni)
  const [paleta, setPaleta] = useState(0)
  const paletySablony = palety[sablona] ?? []
  const zaklad = paletySablony[paleta]?.tokeny ?? {}
  const [vlastni, setVlastni] = useState<Tokeny>({})
  const [zaobleni, setZaobleni] = useState(8)
  const [pismo, setPismo] = useState('system-ui, sans-serif')
  const t: Tokeny = { ...zaklad, ...vlastni }
  const k = kontrast(t.onPrimary ?? '#ffffff', t.primary ?? '#000000')
  const kText = kontrast(t.ink ?? '#000', t.bg ?? '#fff')
  const kOdkaz = kontrast(t.link ?? '#000', t.bg ?? '#fff')
  const projde = k >= 4.5 && kText >= 4.5 && kOdkaz >= 4.5
  const upravitelne = s.vsechnyTokeny ? ['bg', 'surface', 'ink', 'muted', 'line', 'primary', 'onPrimary', 'link', 'accent', 'onAccent', 'deep', 'onDeep'] : s.vlastniBarva ? ['primary'] : []
  const NAZVY: Record<string, string> = {
    bg: 'Pozadí',
    surface: 'Plocha',
    ink: 'Text',
    muted: 'Tlumený text',
    line: 'Linky',
    primary: 'Hlavní barva',
    onPrimary: 'Text na hlavní barvě',
    link: 'Odkazy',
    accent: 'Doplňková barva',
    onAccent: 'Text na doplňkové',
    deep: 'Tmavá plocha',
    onDeep: 'Text na tmavé ploše',
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
      <div style={{ flex: '1 1 320px', minWidth: 0 }}>
        <label htmlFor="sablona">Šablona</label>
        <select id="sablona" value={sablona} onChange={(e) => (setSablona(e.target.value), setPaleta(0), setVlastni({}))}>
          {sablony.map((x) => (
            <option key={x.klic} value={x.klic}>
              {x.nazev}
            </option>
          ))}
        </select>
        <p style={{ fontSize: 15, color: 'var(--muted)' }}>{s.vlastniBarva ? 'Šablonu můžete změnit kdykoli.' : 'V Základu jde šablonu změnit jednou ročně zdarma.'}</p>
        <fieldset>
          <legend>Barevná varianta</legend>
          {paletySablony.map((p, i) => (
            <label key={p.nazev} style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 400, minHeight: 44, margin: 0 }}>
              <input type="radio" name="paleta" checked={paleta === i} onChange={() => (setPaleta(i), setVlastni({}))} style={{ width: 22, height: 22 }} />
              <span className="vzorek" style={{ background: p.tokeny.primary }} aria-hidden="true" />
              {p.nazev}
            </label>
          ))}
        </fieldset>
        {upravitelne.length ? (
          <fieldset>
            <legend>{s.vsechnyTokeny ? 'Všech 12 barev' : 'Vlastní hlavní barva'}</legend>
            {upravitelne.map((klic) => (
              <label key={klic} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, fontWeight: 400, minHeight: 44, margin: 0 }}>
                {NAZVY[klic]}
                <input type="color" value={t[klic] ?? '#000000'} onChange={(e) => setVlastni({ ...vlastni, [klic]: e.target.value })} style={{ width: 56, height: 40, padding: 2, margin: 0 }} />
              </label>
            ))}
          </fieldset>
        ) : (
          <p className="zamcena-stranka">Vlastní hlavní barvu nastavíte od úrovně Pokročilý, všech 12 barev, písmo a zaoblení v úrovni Advance.</p>
        )}
        {s.vsechnyTokeny ? (
          <>
            <label htmlFor="pismo">Písmo</label>
            <select id="pismo" value={pismo} onChange={(e) => setPismo(e.target.value)}>
              <option value="system-ui, sans-serif">Systémové bezpatkové</option>
              <option value="Georgia, serif">Patkové</option>
              <option value="'Trebuchet MS', sans-serif">Humanistické</option>
            </select>
            <label htmlFor="zaobleni">Zaoblení rohů: {zaobleni} px</label>
            <input id="zaobleni" type="range" min={0} max={24} step={4} value={zaobleni} onChange={(e) => setZaobleni(Number(e.target.value))} />
          </>
        ) : null}
      </div>
      <div style={{ flex: '1.4 1 380px', minWidth: 0 }}>
        <h2 style={{ marginTop: 0 }}>Náhled</h2>
        <div className="nahled" style={{ background: t.bg, color: t.ink, fontFamily: pismo }} aria-label="Náhled vzhledu webu">
          <div style={{ background: t.primary, color: t.onPrimary, padding: '14px 20px', fontWeight: 600 }}>Obec Javoří Lhota</div>
          <div style={{ padding: 20 }}>
            <p style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 600 }}>Vítejte v Javoří Lhotě</p>
            <p style={{ margin: '0 0 12px', color: t.muted }}>684 obyvatel pod Javorníkem.</p>
            <p style={{ margin: '0 0 16px' }}>
              <span style={{ color: t.link, textDecoration: 'underline' }}>Úřední deska</span>
            </p>
            <span style={{ display: 'inline-block', padding: '10px 18px', borderRadius: zaobleni, background: t.primary, color: t.onPrimary }}>Zaplatit poplatky</span>
            <div style={{ marginTop: 16, padding: 16, borderRadius: zaobleni, background: t.surface, border: `1px solid ${t.line}` }}>Svoz plastů ve čtvrtek</div>
          </div>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0' }} aria-live="polite">
          <li>
            Text na hlavní barvě: {k.toFixed(1).replace('.', ',')} : 1 <span className={`stav ${k >= 4.5 ? 'dobre' : 'spatne'}`}>{k >= 4.5 ? 'projde' : 'neprojde, potřeba 4,5 : 1'}</span>
          </li>
          <li>
            Text na pozadí: {kText.toFixed(1).replace('.', ',')} : 1 <span className={`stav ${kText >= 4.5 ? 'dobre' : 'spatne'}`}>{kText >= 4.5 ? 'projde' : 'neprojde'}</span>
          </li>
          <li>
            Odkazy na pozadí: {kOdkaz.toFixed(1).replace('.', ',')} : 1 <span className={`stav ${kOdkaz >= 4.5 ? 'dobre' : 'spatne'}`}>{kOdkaz >= 4.5 ? 'projde' : 'neprojde'}</span>
          </li>
        </ul>
        {projde ? (
          Object.keys(vlastni).length === 0 ? (
            <a className="tlacitko" href={`/?sablona=${sablona}&paleta=${paleta}`}>
              Zobrazit na webu
            </a>
          ) : (
            <p className="uspech">Kontrast projde. V ostrém provozu se vlastní barvy uloží a zveřejní, v ukázce zůstávají jen v náhledu.</p>
          )
        ) : (
          <p className="souhrn-chyb" role="alert">
            Zveřejnění je zablokované: barvy nesplňují kontrast 4,5 : 1. Zvolte tmavší hlavní barvu nebo světlejší text.
          </p>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ uživatelé */

interface Uzivatel {
  jmeno: string
  email: string
  role: string
}

const UZIVATELE: Uzivatel[] = [
  { jmeno: 'Marie Šťastná', email: 'starostka@javori-lhota.example', role: 'Správce obce' },
  { jmeno: 'Účetní obce', email: 'ucetni@javori-lhota.example', role: 'Redaktor' },
]

export function Uzivatele({ s }: { s: Schopnosti }) {
  const [lide, setLide] = useState(UZIVATELE)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState(s.role[1] ?? 'Redaktor')
  const [hlaska, setHlaska] = useState('')
  const plno = lide.length >= s.uzivatele
  return (
    <>
      <p>
        Uživatelé: {lide.length} z {pocet(s.uzivatele)}. Dvoufaktorové přihlášení je povinné pro správce{s.role.includes('Úřední deska') ? ' a pro roli Úřední deska' : ''}.
      </p>
      <div className="posuvnik">
        <table className="tabulka-admin">
          <caption className="sr-only">Uživatelé administrace</caption>
          <thead>
            <tr>
              <th scope="col">Jméno</th>
              <th scope="col">E-mail</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {lide.map((u) => (
              <tr key={u.email}>
                <td data-popisek="Jméno">{u.jmeno}</td>
                <td data-popisek="E-mail">{u.email}</td>
                <td data-popisek="Role">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Pozvat uživatele</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (plno) return setHlaska(`Úroveň má limit ${pocet(s.uzivatele)} uživatelů. Přejděte na vyšší úroveň.`)
          if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setHlaska('Zadejte e-mail ve tvaru jmeno@obec.cz.')
          setLide([...lide, { jmeno: 'Pozvaný uživatel', email, role }])
          setHlaska(`Pozvánka pro ${email} je připravená. V ukázce se e-mail neodesílá.`)
          setEmail('')
        }}
      >
        <label htmlFor="pozvat-email">E-mail</label>
        <input id="pozvat-email" type="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} style={{ maxWidth: 420 }} />
        <label htmlFor="pozvat-role">Role</label>
        <select id="pozvat-role" value={role} onChange={(e) => setRole(e.target.value)} style={{ maxWidth: 420 }}>
          {s.role.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        <button type="submit" disabled={plno}>
          {plno ? `Limit ${pocet(s.uzivatele)} uživatelů je plný` : 'Pozvat'}
        </button>
      </form>
      <Hlaska text={hlaska} />
    </>
  )
}

/* ------------------------------------------------------------ podweby */

export function Podweby({ s }: { s: Schopnosti }) {
  const [weby, setWeby] = useState(['Mateřská škola Javoří Lhota', 'SDH Javoří Lhota'])
  const [novy, setNovy] = useState('')
  const [hlaska, setHlaska] = useState('')
  const plno = weby.length >= s.podweby
  return (
    <>
      <p>
        Podweby: {weby.length} z {pocet(s.podweby)}. Každý podweb má vlastní barvu ze šablony a vlastního redaktora, který píše jen do něj.
      </p>
      <ul className="seznam-bloku">
        {weby.map((w) => (
          <li key={w}>
            <span style={{ fontWeight: 500 }}>{w}</span>
            <span style={{ color: 'var(--muted)', fontSize: 15 }}>redaktor organizace</span>
          </li>
        ))}
      </ul>
      <form
        className="radek-akci"
        onSubmit={(e) => {
          e.preventDefault()
          if (plno) return setHlaska(`Limit ${pocet(s.podweby)} podwebů je plný. Neomezeně podwebů má úroveň Advance.`)
          if (novy.trim().length < 3) return setHlaska('Napište název organizace.')
          setWeby([...weby, novy.trim()])
          setHlaska(`Podweb ${novy.trim()} je založený.`)
          setNovy('')
        }}
      >
        <label htmlFor="podweb" style={{ margin: 0 }}>
          Nová organizace
        </label>
        <input id="podweb" type="text" value={novy} onChange={(e) => setNovy(e.target.value)} style={{ maxWidth: 320, margin: 0 }} />
        <button type="submit" className="mala hlavni" disabled={plno}>
          {plno ? 'Limit je plný' : 'Založit podweb'}
        </button>
      </form>
      <Hlaska text={hlaska} />
    </>
  )
}

/* ------------------------------------------------------------ AI asistent */

export function Asistent({ upozorneni, otazky }: { upozorneni: string; otazky: { id: string; otazka: string; odpoved: string; zdroje: { nazev: string }[] }[] }) {
  const [zapnuto, setZapnuto] = useState(true)
  const [vybrana, setVybrana] = useState(otazky[0]?.id ?? '')
  const o = otazky.find((x) => x.id === vybrana)
  return (
    <>
      <div className="panel-bily">
        <label className="zaskrtavatko" style={{ display: 'flex', gap: 12, alignItems: 'center', margin: 0 }}>
          <input type="checkbox" checked={zapnuto} onChange={(e) => setZapnuto(e.target.checked)} style={{ width: 24, height: 24 }} />
          Asistent je na webu zapnutý
        </label>
        <p style={{ margin: '12px 0 0' }}>Představení, které asistent ukáže vždy na začátku (čl. 50 AI Actu). Nejde vypnout:</p>
        <blockquote style={{ margin: '8px 0 0', paddingLeft: 16, borderLeft: '3px solid var(--line)' }}>{upozorneni}</blockquote>
      </div>
      <h2>Vyzkoušet odpověď</h2>
      <div role="group" aria-label="Vyberte otázku" className="radek-akci">
        {otazky.map((q) => (
          <button key={q.id} type="button" className="mala" aria-pressed={q.id === vybrana} onClick={() => setVybrana(q.id)}>
            {q.otazka}
          </button>
        ))}
      </div>
      {o ? (
        <div className="panel-bily" aria-live="polite" style={{ marginTop: 16 }}>
          <p style={{ margin: 0 }}>{o.odpoved}</p>
          <p style={{ margin: '12px 0 0', fontSize: 15, color: 'var(--muted)' }}>Zdroje: {o.zdroje.map((z) => z.nazev).join('; ')}</p>
        </div>
      ) : null}
      <p style={{ fontSize: 15, color: 'var(--muted)' }}>Asistent odpovídá jen z dokumentů obce, dotazy neukládá ke jménu a netrénuje se na nich. Model běží na serveru v ČR.</p>
    </>
  )
}
