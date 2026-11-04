'use client'

import { useActionState, useId, useState } from 'react'
import { formatDateTime } from '@codekom/typy/pravidla'
import { Pole, SouhrnChyb } from '@/components/stranka/Formular'
import { zverejniAktualitu, type Vysledek } from '../akce'
import { nahradKontaktemUradu, najdiOsobniUdaje } from '../osobni-udaje'

export interface AktualitaPolozka {
  id: string
  slug: string
  titulek: string
  perex: string
  obsah: string[]
  rubrika: string
  autor: string
  publikovano: string
  stitky?: string[]
}

const RUBRIKY: Record<string, string> = {
  vse: 'Všechny rubriky',
  zpravy: 'Zprávy z radnice',
  oznameni: 'Oznámení a výluky',
  kultura: 'Kultura a spolky',
  zpravodaj: 'Zpravodaj a magazín',
}

export type TypBloku = 'odstavec' | 'infobox' | 'citace' | 'priloha' | 'fakta'

export interface ObsahovyBlok {
  id: string
  typ: TypBloku
  text: string
  autorCitace?: string
  dulezitost?: 'info' | 'varovani' | 'tip'
  nazevPrilohy?: string
  velikostPrilohy?: string
}

const VÝCHOZÍ_BLOKY: ObsahovyBlok[] = [
  {
    id: 'b-1',
    typ: 'odstavec',
    text: 'Od příštího pondělí začíná plánovaná oprava místní komunikace. Práce budou probíhat v pracovních dnech od 7 do 17 hodin.',
  },
  {
    id: 'b-2',
    typ: 'infobox',
    text: 'Autobusová linka 431 bude mít náhradní zastávku u hájovny. Jízdní řády zůstávají beze změny.',
    dulezitost: 'info',
  },
  {
    id: 'b-3',
    typ: 'citace',
    text: 'Děkujeme všem občanům za pochopení a trpělivost během nezbytných stavebních úprav.',
    autorCitace: 'Marie Šťastná, starostka obce',
  },
]

const START_VYSLEDEK: Vysledek = { ok: false, zprava: '', chyby: {}, hodnoty: {} }
const POPISKY_AKTUALITY = { titulek: 'Nadpis', perex: 'Perex', obsah: 'Text zprávy', alt: 'Popis obrázku' }

function odhadDobyCteni(slova: number): string {
  const min = Math.max(1, Math.ceil(slova / 160))
  return `${min} min čtení`
}

export function SpravaBlogu({
  seznam,
  telefonUradu,
  emailUradu,
}: {
  seznam: AktualitaPolozka[]
  telefonUradu: string
  emailUradu: string
}) {
  const [zalozka, setZalozka] = useState<'prehled' | 'editor'>('prehled')
  const [vybranaRubrika, setVybranaRubrika] = useState('vse')
  const [vyhledavani, setVyhledavani] = useState('')

  // Stav blokového editoru
  const [titulek, setTitulek] = useState('Oprava komunikace v ulici Na Rovném')
  const [perex, setPerex] = useState('Stavební práce začnou v pondělí 9. listopadu a potrvají přibližně tři týdny.')
  const [rubrikaClanku, setRubrikaClanku] = useState('zpravy')
  const [stitkyText, setStitkyText] = useState('#doprava #opravy #investice')
  const [altObrazku, setAltObrazku] = useState('Stavební technika při zahájení rekonstrukce povrchu silnice')
  const [bloky, setBloky] = useState<ObsahovyBlok[]>(VÝCHOZÍ_BLOKY)
  const [aktivniRezimEditoru, setAktivniRezimEditoru] = useState<'bloky' | 'nahled'>('bloky')

  const searchInputId = useId()
  const [v, akce, odesila] = useActionState(zverejniAktualitu, START_VYSLEDEK)

  // Serializace bloků do jednoho textu pro odeslání a validaci
  const spojenyObsah = bloky
    .map((b) => {
      if (b.typ === 'infobox') return `[Upozornění: ${b.text}]`
      if (b.typ === 'citace') return `„${b.text}“ – ${b.autorCitace || 'Vedení obce'}`
      if (b.typ === 'priloha') return `Příloha ke stažení: ${b.nazevPrilohy || 'Dokument'} (${b.velikostPrilohy || 'PDF'})`
      if (b.typ === 'fakta') return `Klíčové informace: ${b.text}`
      return b.text
    })
    .join('\n\n')

  const celeSlova = `${titulek} ${perex} ${spojenyObsah}`.split(/\s+/).filter(Boolean).length
  const nalezy = najdiOsobniUdaje(`${titulek}\n${perex}\n${spojenyObsah}`)

  // Filtrování seznamu článků
  const filtrovaneClanky = seznam.filter((a) => {
    const shodaRubriky = vybranaRubrika === 'vse' || a.rubrika === vybranaRubrika
    const q = vyhledavani.toLowerCase().trim()
    const shodaHledani =
      !q ||
      a.titulek.toLowerCase().includes(q) ||
      a.perex.toLowerCase().includes(q) ||
      (a.stitky && a.stitky.some((s) => s.toLowerCase().includes(q)))
    return shodaRubriky && shodaHledani
  })

  const pridejBlok = (typ: TypBloku) => {
    const novyBlok: ObsahovyBlok = {
      id: `b-${Date.now()}`,
      typ,
      text:
        typ === 'odstavec'
          ? 'Nový odstavec textu zprávy pro občany.'
          : typ === 'infobox'
            ? 'Důležité upozornění nebo termín pro veřejnost.'
            : typ === 'citace'
              ? 'Vyjádření představitele obce k situaci.'
              : typ === 'priloha'
                ? 'Popis přiloženého materiálu.'
                : 'Místo konání a doplňující informace.',
      autorCitace: typ === 'citace' ? 'Marie Šťastná, starostka' : undefined,
      dulezitost: typ === 'infobox' ? 'info' : undefined,
      nazevPrilohy: typ === 'priloha' ? 'Harmonogram-praci.pdf' : undefined,
      velikostPrilohy: typ === 'priloha' ? '1,2 MB' : undefined,
    }
    setBloky([...bloky, novyBlok])
  }

  const posunBlok = (index: number, smer: -1 | 1) => {
    const novyIndex = index + smer
    if (novyIndex < 0 || novyIndex >= bloky.length) return
    const kopie = [...bloky]
    const docasny = kopie[index]
    const druhy = kopie[novyIndex]
    if (!docasny || !druhy) return
    kopie[index] = druhy
    kopie[novyIndex] = docasny
    setBloky(kopie)
  }

  const smazBlok = (id: string) => {
    setBloky(bloky.filter((b) => b.id !== id))
  }

  const zmenBlok = (id: string, zmeny: Partial<ObsahovyBlok>) => {
    setBloky(bloky.map((b) => (b.id === id ? { ...b, ...zmeny } : b)))
  }

  const nahradUdaje = () => {
    setTitulek(nahradKontaktemUradu(titulek, telefonUradu, emailUradu))
    setPerex(nahradKontaktemUradu(perex, telefonUradu, emailUradu))
    setBloky(
      bloky.map((b) => ({
        ...b,
        text: nahradKontaktemUradu(b.text, telefonUradu, emailUradu),
      })),
    )
  }

  return (
    <>
      <div className="admin-zalozky" role="tablist" aria-label="Režim správy blogu">
        <button
          type="button"
          role="tab"
          id="tab-prehled"
          aria-selected={zalozka === 'prehled'}
          aria-controls="panel-prehled"
          className="admin-zalozka-tlacitko"
          onClick={() => setZalozka('prehled')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          <span>Přehled článků blogu ({seznam.length})</span>
        </button>
        <button
          type="button"
          role="tab"
          id="tab-editor"
          aria-selected={zalozka === 'editor'}
          aria-controls="panel-editor"
          className="admin-zalozka-tlacitko"
          onClick={() => setZalozka('editor')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          <span>Widgetový editor příspěvku</span>
        </button>
      </div>

      {zalozka === 'prehled' ? (
        <section id="panel-prehled" role="tabpanel" aria-labelledby="tab-prehled">
          <div className="admin-blog-filtr-pruh">
            <div className="admin-blog-kategorie-filtr" role="group" aria-label="Filtrovat podle rubriky">
              {Object.entries(RUBRIKY).map(([klic, nazev]) => (
                <button
                  key={klic}
                  type="button"
                  className="admin-kategorie-pilulka"
                  aria-pressed={vybranaRubrika === klic}
                  onClick={() => setVybranaRubrika(klic)}
                >
                  {nazev}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label htmlFor={searchInputId} className="sr-only">
                Hledat v článcích
              </label>
              <input
                id={searchInputId}
                type="search"
                placeholder="Hledat v článcích a štítcích..."
                value={vyhledavani}
                onChange={(e) => setVyhledavani(e.target.value)}
                style={{ width: 260, minHeight: 40, margin: 0, fontSize: 14 }}
              />
              <button
                type="button"
                className="mala hlavni"
                onClick={() => setZalozka('editor')}
                style={{ whiteSpace: 'nowrap' }}
              >
                + Nový příspěvek
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtrovaneClanky.map((clanek) => {
              const pocetSlov = `${clanek.titulek} ${clanek.perex} ${clanek.obsah.join(' ')}`.split(/\s+/).length
              return (
                <article
                  key={clanek.id}
                  className="panel-bily"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    marginBottom: 0,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span className="admin-widget-kategorie-stitek">
                          {RUBRIKY[clanek.rubrika] || clanek.rubrika}
                        </span>
                        <span className="vedlejsi" style={{ fontSize: 13 }}>
                          {formatDateTime(clanek.publikovano)} · {odhadDobyCteni(pocetSlov)}
                        </span>
                      </div>
                      <h2 style={{ margin: 0, fontSize: 18 }}>
                        <a href={`/aktuality/${clanek.slug}`} style={{ textDecoration: 'none', color: 'var(--ink)' }}>
                          {clanek.titulek}
                        </a>
                      </h2>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <a
                        href={`/aktuality/${clanek.slug}`}
                        className="mala"
                        style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', fontSize: 13 }}
                      >
                        Zobrazit na webu
                      </a>
                    </div>
                  </div>

                  <p style={{ margin: 0, fontSize: 14.5, color: 'var(--muted)' }}>
                    {clanek.perex}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <span className="vedlejsi" style={{ fontSize: 13, marginRight: 4 }}>
                      Autor: {clanek.autor}
                    </span>
                    {clanek.stitky?.map((s) => (
                      <span key={s} className="admin-stitek-tag">
                        {s}
                      </span>
                    )) || (
                      <>
                        <span className="admin-stitek-tag">#obec</span>
                        <span className="admin-stitek-tag">#zpravy</span>
                      </>
                    )}
                  </div>
                </article>
              )
            })}

            {filtrovaneClanky.length === 0 ? (
              <div className="panel-bily" style={{ textAlign: 'center', padding: '32px 16px' }}>
                <p style={{ margin: 0, color: 'var(--muted)' }}>Žádné články neodpovídají zadanému filtru.</p>
              </div>
            ) : null}
          </div>
        </section>
      ) : (
        <section id="panel-editor" role="tabpanel" aria-labelledby="tab-editor">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 20 }}>Skládání příspěvku z bloků</h2>
              <p className="vedlejsi" style={{ margin: '2px 0 0', fontSize: 13.5 }}>
                Vytvořte článek složený z textových odstavců, upozornění pro občany, citací a příloh ke stažení.
              </p>
            </div>

            <div className="admin-zarizeni-lista" role="group" aria-label="Režim editoru">
              <button
                type="button"
                className="admin-zarizeni-tlacitko"
                aria-pressed={aktivniRezimEditoru === 'bloky'}
                onClick={() => setAktivniRezimEditoru('bloky')}
              >
                Editor bloků
              </button>
              <button
                type="button"
                className="admin-zarizeni-tlacitko"
                aria-pressed={aktivniRezimEditoru === 'nahled'}
                onClick={() => setAktivniRezimEditoru('nahled')}
              >
                Živý náhled ({odhadDobyCteni(celeSlova)})
              </button>
            </div>
          </div>

          <form action={akce} noValidate>
            <SouhrnChyb chyby={v.chyby} popisky={POPISKY_AKTUALITY} />

            <div className="panel-bily" style={{ marginBottom: 20 }}>
              <h3 style={{ margin: '0 0 14px', fontSize: 16 }}>Základní údaje článku</h3>
              <Pole nazev="titulek" popisek="Nadpis článku" chyba={v.chyby.titulek}>
                {(p) => (
                  <input
                    {...p}
                    type="text"
                    value={titulek}
                    onChange={(e) => setTitulek(e.target.value)}
                    maxLength={140}
                  />
                )}
              </Pole>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                <div className="pole">
                  <label htmlFor="blog-rubrika">Rubrika blogu</label>
                  <select
                    id="blog-rubrika"
                    value={rubrikaClanku}
                    onChange={(e) => setRubrikaClanku(e.target.value)}
                  >
                    <option value="zpravy">Zprávy z radnice</option>
                    <option value="oznameni">Oznámení a výluky</option>
                    <option value="kultura">Kultura a spolky</option>
                    <option value="zpravodaj">Zpravodaj a magazín</option>
                  </select>
                </div>

                <div className="pole">
                  <label htmlFor="blog-stitky">Štítky (oddělené mezerou)</label>
                  <input
                    id="blog-stitky"
                    type="text"
                    value={stitkyText}
                    onChange={(e) => setStitkyText(e.target.value)}
                    placeholder="#investice #doprava"
                  />
                </div>
              </div>

              <Pole nazev="perex" popisek="Perex článku" chyba={v.chyby.perex} napoveda="Jedna až dvě věty, které čtenáře uvedou do tématu.">
                {(p) => (
                  <textarea
                    {...p}
                    value={perex}
                    onChange={(e) => setPerex(e.target.value)}
                    maxLength={320}
                    style={{ minHeight: 70 }}
                  />
                )}
              </Pole>

              <Pole nazev="alt" popisek="Popis hlavní fotografie" chyba={v.chyby.alt} napoveda="Přístupný popis pro zrakově znevýhodněné občany a čtečky.">
                {(p) => (
                  <input
                    {...p}
                    type="text"
                    value={altObrazku}
                    onChange={(e) => setAltObrazku(e.target.value)}
                    maxLength={200}
                  />
                )}
              </Pole>
            </div>

            {/* Skryté pole s celým spojeným obsahem pro odeslání do serverové akce */}
            <input type="hidden" name="obsah" value={spojenyObsah} />

            {aktivniRezimEditoru === 'bloky' ? (
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                  <h3 style={{ margin: 0, fontSize: 17 }}>Obsahové bloky ({bloky.length})</h3>
                  <span className="vedlejsi" style={{ fontSize: 13 }}>
                    Počet slov: {celeSlova} · {odhadDobyCteni(celeSlova)}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {bloky.map((blok, i) => (
                    <div key={blok.id} className="admin-blok-karta">
                      <div className="admin-blok-hlavicka">
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                          <span className="admin-widget-kategorie-stitek">
                            {blok.typ === 'odstavec'
                              ? 'Odstavec'
                              : blok.typ === 'infobox'
                                ? 'Upozornění'
                                : blok.typ === 'citace'
                                  ? 'Citace'
                                  : blok.typ === 'priloha'
                                    ? 'Příloha ke stažení'
                                    : 'Fakta v kostce'}
                          </span>
                          <span>Blok {i + 1}</span>
                        </span>

                        <div className="radek-akci">
                          <button
                            type="button"
                            className="mala"
                            disabled={i === 0}
                            onClick={() => posunBlok(i, -1)}
                            aria-label={`Posunout blok ${i + 1} nahoru`}
                          >
                            Nahoru
                          </button>
                          <button
                            type="button"
                            className="mala"
                            disabled={i === bloky.length - 1}
                            onClick={() => posunBlok(i, 1)}
                            aria-label={`Posunout blok ${i + 1} dolů`}
                          >
                            Dolů
                          </button>
                          <button
                            type="button"
                            className="mala"
                            onClick={() => smazBlok(blok.id)}
                            aria-label={`Smazat blok ${i + 1}`}
                          >
                            Smazat
                          </button>
                        </div>
                      </div>

                      {blok.typ === 'citace' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <textarea
                            value={blok.text}
                            onChange={(e) => zmenBlok(blok.id, { text: e.target.value })}
                            aria-label="Text citace"
                            style={{ minHeight: 70 }}
                          />
                          <input
                            type="text"
                            value={blok.autorCitace || ''}
                            onChange={(e) => zmenBlok(blok.id, { autorCitace: e.target.value })}
                            placeholder="Jméno a funkce autora citátu"
                            aria-label="Autor citace"
                          />
                        </div>
                      ) : blok.typ === 'infobox' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <textarea
                            value={blok.text}
                            onChange={(e) => zmenBlok(blok.id, { text: e.target.value })}
                            aria-label="Text upozornění"
                            style={{ minHeight: 70 }}
                          />
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                            <span>Typ infoboxu:</span>
                            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 400 }}>
                              <input
                                type="radio"
                                name={`dulezitost-${blok.id}`}
                                checked={blok.dulezitost === 'info'}
                                onChange={() => zmenBlok(blok.id, { dulezitost: 'info' })}
                              />
                              Informace
                            </label>
                            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 400 }}>
                              <input
                                type="radio"
                                name={`dulezitost-${blok.id}`}
                                checked={blok.dulezitost === 'varovani'}
                                onChange={() => zmenBlok(blok.id, { dulezitost: 'varovani' })}
                              />
                              Důležité varování
                            </label>
                          </div>
                        </div>
                      ) : blok.typ === 'priloha' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <input
                            type="text"
                            value={blok.nazevPrilohy || ''}
                            onChange={(e) => zmenBlok(blok.id, { nazevPrilohy: e.target.value })}
                            placeholder="Název souboru (např. Harmonogram.pdf)"
                            aria-label="Název přílohy"
                          />
                          <input
                            type="text"
                            value={blok.text}
                            onChange={(e) => zmenBlok(blok.id, { text: e.target.value })}
                            placeholder="Stručný popis přílohy pro občany"
                            aria-label="Popis přílohy"
                          />
                        </div>
                      ) : (
                        <textarea
                          value={blok.text}
                          onChange={(e) => zmenBlok(blok.id, { text: e.target.value })}
                          aria-label="Text odstavce"
                          style={{ minHeight: 80 }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="panel-bily" style={{ marginTop: 16 }}>
                  <h4 style={{ margin: '0 0 8px', fontSize: 15 }}>Přidat nový obsahový blok</h4>
                  <div className="admin-blok-knihovna">
                    <button type="button" className="admin-blok-pridat-btn" onClick={() => pridejBlok('odstavec')}>
                      <span className="admin-blok-pridat-nazev">+ Odstavec textu</span>
                      <span className="vedlejsi">Běžný formátovaný odstavec zprávy</span>
                    </button>
                    <button type="button" className="admin-blok-pridat-btn" onClick={() => pridejBlok('infobox')}>
                      <span className="admin-blok-pridat-nazev">+ Upozornění</span>
                      <span className="vedlejsi">Zvýrazněný rámeček s důležitou informací</span>
                    </button>
                    <button type="button" className="admin-blok-pridat-btn" onClick={() => pridejBlok('citace')}>
                      <span className="admin-blok-pridat-nazev">+ Citace / Výrok</span>
                      <span className="vedlejsi">Výrok starostky či radního</span>
                    </button>
                    <button type="button" className="admin-blok-pridat-btn" onClick={() => pridejBlok('priloha')}>
                      <span className="admin-blok-pridat-nazev">+ Příloha ke stažení</span>
                      <span className="vedlejsi">PDF dokument z úřední desky</span>
                    </button>
                    <button type="button" className="admin-blok-pridat-btn" onClick={() => pridejBlok('fakta')}>
                      <span className="admin-blok-pridat-nazev">+ Fakta v kostce</span>
                      <span className="vedlejsi">Přehled termínů a kontaktů</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="admin-nahled-okno" style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span className="admin-widget-kategorie-stitek">{RUBRIKY[rubrikaClanku]}</span>
                  <span className="vedlejsi" style={{ fontSize: 13 }}>
                    Dnes · {odhadDobyCteni(celeSlova)}
                  </span>
                </div>

                <h2 style={{ margin: '0 0 12px', fontSize: 24 }}>{titulek}</h2>
                <p style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--muted)', margin: '0 0 20px', fontWeight: 500 }}>
                  {perex}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {bloky.map((b) => {
                    if (b.typ === 'citace') {
                      return (
                        <blockquote
                          key={b.id}
                          style={{
                            margin: '8px 0',
                            padding: '12px 20px',
                            borderLeft: '4px solid var(--primary)',
                            background: 'var(--surface)',
                            fontStyle: 'italic',
                          }}
                        >
                          <p style={{ margin: 0, fontSize: 16 }}>„{b.text}“</p>
                          <footer style={{ marginTop: 6, fontSize: 13, fontStyle: 'normal', color: 'var(--muted)' }}>
                            {b.autorCitace || 'Vedení obce'}
                          </footer>
                        </blockquote>
                      )
                    }
                    if (b.typ === 'infobox') {
                      return (
                        <aside
                          key={b.id}
                          style={{
                            padding: '14px 18px',
                            borderRadius: 8,
                            background: b.dulezitost === 'varovani' ? '#fff8e6' : '#e8f0fe',
                            border: `1px solid ${b.dulezitost === 'varovani' ? '#fae19c' : '#c2e7ff'}`,
                            fontSize: 15,
                          }}
                        >
                          <strong style={{ display: 'block', marginBottom: 4 }}>
                            {b.dulezitost === 'varovani' ? 'Důležité varování' : 'Informace pro občany'}
                          </strong>
                          {b.text}
                        </aside>
                      )
                    }
                    if (b.typ === 'priloha') {
                      return (
                        <div
                          key={b.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            background: 'var(--surface)',
                            border: '1px solid var(--line)',
                            borderRadius: 6,
                          }}
                        >
                          <div>
                            <strong>{b.nazevPrilohy || 'Dokument.pdf'}</strong>
                            <div className="vedlejsi" style={{ fontSize: 12 }}>
                              {b.text} ({b.velikostPrilohy || 'PDF'})
                            </div>
                          </div>
                          <span className="mala" style={{ fontSize: 13 }}>
                            Stáhnout PDF
                          </span>
                        </div>
                      )
                    }
                    return (
                      <p key={b.id} style={{ margin: 0, fontSize: 16, lineHeight: 1.6 }}>
                        {b.text}
                      </p>
                    )
                  })}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                  {stitkyText
                    .split(/\s+/)
                    .filter(Boolean)
                    .map((tag) => (
                      <span key={tag} className="admin-stitek-tag">
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {nalezy.length > 0 ? (
              <div className="souhrn-chyb" role="status" style={{ marginBottom: 20 }}>
                <p style={{ margin: '0 0 8px' }}>
                  Kontrola před zveřejněním: text obsahuje osobní údaj ({nalezy.join(', ')}). Zveřejnit půjde po opravě nebo po nahrazení kontaktem úřadu.
                </p>
                <button type="button" className="tlacitko druhe" onClick={nahradUdaje}>
                  Nahradit číslem a e-mailem úřadu
                </button>
              </div>
            ) : null}

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <button type="submit" disabled={odesila || nalezy.length > 0} className="hlavni">
                Zveřejnit článek na blogu
              </button>
              <button
                type="button"
                className="tlacitko druhe"
                onClick={() => setZalozka('prehled')}
              >
                Zpět na přehled článků
              </button>
            </div>

            {v.zprava ? (
              <div
                className={v.ok ? 'uspech' : 'souhrn-chyb'}
                role="status"
                style={{ marginTop: 16 }}
              >
                <p style={{ margin: 0 }}>{v.zprava}</p>
                {v.odkaz ? (
                  <p style={{ margin: '8px 0 0' }}>
                    <a href={v.odkaz.href}>{v.odkaz.text}</a>
                  </p>
                ) : null}
              </div>
            ) : null}
          </form>
        </section>
      )}
    </>
  )
}
