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

interface Blok {
  id: string
  nazev: string
  skryty: boolean
  sloupce: number
  od: Uroven
}

const KNIHOVNA: Blok[] = [
  { id: 'ukony', nazev: 'Rychlé úkony', skryty: false, sloupce: 1, od: 'pokrocily' },
  { id: 'deska', nazev: 'Úřední deska', skryty: false, sloupce: 1, od: 'pokrocily' },
  { id: 'aktuality', nazev: 'Aktuality', skryty: false, sloupce: 1, od: 'pokrocily' },
  { id: 'akce', nazev: 'Kalendář akcí', skryty: false, sloupce: 1, od: 'pokrocily' },
  { id: 'rozhlas', nazev: 'Hlášení rozhlasu', skryty: false, sloupce: 1, od: 'pokrocily' },
  { id: 'urad', nazev: 'Kontakt na úřad', skryty: false, sloupce: 1, od: 'pokrocily' },
]

const PRIDAT: Blok[] = [
  { id: 'faq', nazev: 'Otázky a odpovědi', skryty: false, sloupce: 1, od: 'pokrocily' },
  { id: 'mapa', nazev: 'Mapa s body', skryty: false, sloupce: 1, od: 'pokrocily' },
  { id: 'odpocet', nazev: 'Odpočet do akce', skryty: false, sloupce: 1, od: 'pokrocily' },
  { id: 'sekce', nazev: 'Sekce se sloupci a pozadím', skryty: false, sloupce: 2, od: 'advance' },
  { id: 'kod', nazev: 'Vložený kód', skryty: false, sloupce: 1, od: 'advance' },
]

export function Skladatel({ s }: { s: Schopnosti }) {
  const [bloky, setBloky] = useState(KNIHOVNA)
  const [hlaska, setHlaska] = useState('')
  const zmen = (id: string, z: Partial<Blok>) => setBloky(bloky.map((b) => (b.id === id ? { ...b, ...z } : b)))
  const posun = (i: number, o: number) => {
    const j = i + o
    if (j < 0 || j >= bloky.length) return
    const m = [...bloky]
    ;[m[i], m[j]] = [m[j]!, m[i]!]
    setBloky(m)
    setHlaska(`Blok ${m[j]!.nazev} je na ${j + 1}. místě.`)
  }
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ flex: '2 1 420px', minWidth: 0 }}>
          <h2>Bloky úvodní stránky</h2>
          <ol className="seznam-bloku">
            {bloky.map((b, i) => (
              <li key={b.id} className={b.skryty ? 'skryty' : undefined}>
                <span style={{ fontWeight: 500 }}>
                  {b.nazev}
                  {b.skryty ? ' (skrytý)' : ''}
                  {s.sloupce ? `, ${b.sloupce} ${b.sloupce === 1 ? 'sloupec' : b.sloupce < 5 ? 'sloupce' : 'sloupců'}` : ''}
                </span>
                <span className="radek-akci">
                  <button type="button" className="mala" onClick={() => posun(i, -1)} disabled={i === 0} aria-label={`Posunout ${b.nazev} nahoru`}>
                    Nahoru
                  </button>
                  <button type="button" className="mala" onClick={() => posun(i, 1)} disabled={i === bloky.length - 1} aria-label={`Posunout ${b.nazev} dolů`}>
                    Dolů
                  </button>
                  <button type="button" className="mala" aria-pressed={b.skryty} onClick={() => (zmen(b.id, { skryty: !b.skryty }), setHlaska(`Blok ${b.nazev} je ${b.skryty ? 'zobrazený' : 'skrytý'}.`))}>
                    {b.skryty ? 'Zobrazit' : 'Skrýt'}
                  </button>
                  {s.sloupce ? (
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, margin: 0, fontWeight: 400 }}>
                      Sloupce
                      <select value={b.sloupce} onChange={(e) => zmen(b.id, { sloupce: Number(e.target.value) })} style={{ width: 72, margin: 0 }}>
                        {[1, 2, 3, 4].map((n) => (
                          <option key={n}>{n}</option>
                        ))}
                      </select>
                    </label>
                  ) : null}
                </span>
              </li>
            ))}
          </ol>
          <h2>Přidat z knihovny</h2>
          <ul className="seznam-bloku">
            {PRIDAT.map((b) => {
              const zamceny = b.od === 'advance' && !s.sloupce
              const pridany = bloky.some((x) => x.id === b.id)
              return (
                <li key={b.id}>
                  <span>
                    {b.nazev}
                    {zamceny ? <span className="admin__od" style={{ marginLeft: 8 }}>od Advance</span> : null}
                  </span>
                  <button
                    type="button"
                    className="mala"
                    disabled={zamceny || pridany}
                    onClick={() => (setBloky([...bloky, b]), setHlaska(`Blok ${b.nazev} je přidaný na konec stránky.`))}
                  >
                    {pridany ? 'Přidáno' : zamceny ? 'Zamčeno' : 'Přidat'}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <aside aria-label="Náhled pořadí" style={{ flex: '1 1 260px', minWidth: 0 }}>
          <h2>Náhled</h2>
          <div className="nahled" style={{ background: 'var(--bg)', padding: 12 }}>
            {bloky
              .filter((b) => !b.skryty)
              .map((b) => (
                <div key={b.id} style={{ display: 'grid', gridTemplateColumns: `repeat(${b.sloupce}, 1fr)`, gap: 6, marginBottom: 6 }} aria-hidden="true">
                  {Array.from({ length: b.sloupce }, (_, k) => (
                    <div key={k} style={{ border: '1px solid var(--line)', borderRadius: 4, padding: '8px 10px', fontSize: 14, background: 'var(--surface)' }}>
                      {k === 0 ? b.nazev : ''}
                    </div>
                  ))}
                </div>
              ))}
          </div>
          <p style={{ fontSize: 15, color: 'var(--muted)' }}>Povinné části (úřední deska, kontakt na úřad a patička) nejde z webu odebrat, jen přesunout.</p>
        </aside>
      </div>
      <Hlaska text={hlaska} />
    </>
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
