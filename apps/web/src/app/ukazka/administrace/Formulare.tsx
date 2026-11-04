'use client'

import { useActionState, useState, type ReactNode } from 'react'
import { Pole, SouhrnChyb } from '@/components/stranka/Formular'
import { obnov, smaz, ukonci, vydej, vydejKoncept, vyves, zmenSejmuti, zmenZavadu, zverejniAktualitu, type Vysledek } from './akce'
import { nahradKontaktemUradu, najdiOsobniUdaje } from './osobni-udaje'

const START: Vysledek = { ok: false, zprava: '', chyby: {}, hodnoty: {} }

function Zprava({ v }: { v: Vysledek }) {
  if (!v.zprava) return null
  return (
    <div className={v.ok ? 'uspech' : 'souhrn-chyb'} role="status" style={{ marginTop: 16 }}>
      <p style={{ margin: 0 }}>{v.zprava}</p>
      {v.odkaz ? (
        <p style={{ margin: '8px 0 0' }}>
          <a href={v.odkaz.href}>{v.odkaz.text}</a>
        </p>
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------ aktualita */

const POPISKY_AKTUALITY = { titulek: 'Nadpis', perex: 'Perex', obsah: 'Text zprávy', alt: 'Popis obrázku' }

export function FormAktualita({ telefon, email }: { telefon: string; email: string }) {
  const [v, akce, odesila] = useActionState(zverejniAktualitu, START)
  const [obsah, setObsah] = useState(v.hodnoty.obsah ?? '')
  const nalezy = najdiOsobniUdaje(obsah)
  return (
    <form action={akce} noValidate key={v.ok ? 'hotovo' : 'rozpracovano'}>
      <SouhrnChyb chyby={v.chyby} popisky={POPISKY_AKTUALITY} />
      <Pole nazev="titulek" popisek="Nadpis" chyba={v.chyby.titulek}>
        {(p) => <input {...p} type="text" defaultValue={v.hodnoty.titulek ?? ''} maxLength={120} />}
      </Pole>
      <Pole nazev="perex" popisek="Perex" chyba={v.chyby.perex} napoveda="Jedna až dvě věty, které se ukážou ve výpisu.">
        {(p) => <textarea {...p} defaultValue={v.hodnoty.perex ?? ''} maxLength={300} style={{ minHeight: 80 }} />}
      </Pole>
      <Pole nazev="obsah" popisek="Text zprávy" chyba={v.chyby.obsah} napoveda="Odstavce oddělte prázdným řádkem.">
        {(p) => <textarea {...p} value={obsah} onChange={(e) => setObsah(e.target.value)} maxLength={5000} />}
      </Pole>
      {nalezy.length > 0 ? (
        <div className="souhrn-chyb" role="status">
          <p style={{ margin: '0 0 8px' }}>
            Kontrola před zveřejněním: text obsahuje osobní údaj ({nalezy.join(', ')}). Zveřejnit půjde, až ho opravíte.
          </p>
          <button type="button" className="tlacitko druhe" onClick={() => setObsah(nahradKontaktemUradu(obsah, telefon, email))}>
            Nahradit číslem úřadu
          </button>
        </div>
      ) : null}
      <Pole nazev="alt" popisek="Popis obrázku" chyba={v.chyby.alt} napoveda="Co je na obrázku. Čte ho čtečka obrazovky.">
        {(p) => <input {...p} type="text" defaultValue={v.hodnoty.alt ?? ''} maxLength={200} />}
      </Pole>
      <button type="submit" disabled={odesila || nalezy.length > 0}>
        Zveřejnit
      </button>
      <Zprava v={v} />
    </form>
  )
}

/* ------------------------------------------------------------ deska */

const POPISKY_DESKY = {
  nazev: 'Název',
  kategorie: 'Kategorie',
  cisloJednaci: 'Číslo jednací',
  puvodce: 'Původce',
  vyvesenoOd: 'Vyvěšeno od',
  vyvesenoDo: 'Sejmout',
  text: 'Text dokumentu',
  bezOsobnichUdaju: 'Potvrzení',
}

export function FormDeska({ kategorie, dnes }: { kategorie: { slug: string; nazev: string }[]; dnes: string }) {
  const [v, akce, odesila] = useActionState(vyves, START)
  const h = v.hodnoty
  return (
    <form action={akce} noValidate key={v.ok ? `hotovo-${v.zprava}` : 'rozpracovano'}>
      <SouhrnChyb chyby={v.chyby} popisky={POPISKY_DESKY} />
      <Pole nazev="nazev" popisek="Název" chyba={v.chyby.nazev}>
        {(p) => <input {...p} type="text" defaultValue={h.nazev ?? ''} maxLength={200} />}
      </Pole>
      <div className="mrizka">
        <Pole nazev="kategorie" popisek="Kategorie" chyba={v.chyby.kategorie}>
          {(p) => (
            <select {...p} defaultValue={h.kategorie ?? ''}>
              <option value="">Vyberte</option>
              {kategorie.map((k) => (
                <option key={k.slug} value={k.slug}>
                  {k.nazev}
                </option>
              ))}
            </select>
          )}
        </Pole>
        <Pole nazev="cisloJednaci" popisek="Číslo jednací" chyba={v.chyby.cisloJednaci}>
          {(p) => <input {...p} type="text" defaultValue={h.cisloJednaci ?? ''} maxLength={60} />}
        </Pole>
        <Pole nazev="puvodce" popisek="Původce" chyba={v.chyby.puvodce}>
          {(p) => <input {...p} type="text" defaultValue={h.puvodce ?? 'Obecní úřad'} maxLength={120} />}
        </Pole>
        <Pole nazev="vyvesenoOd" popisek="Vyvěšeno od" chyba={v.chyby.vyvesenoOd}>
          {(p) => <input {...p} type="date" defaultValue={h.vyvesenoOd ?? dnes} />}
        </Pole>
        <Pole nazev="vyvesenoDo" popisek="Sejmout" chyba={v.chyby.vyvesenoDo} napoveda="Prázdné znamená do odvolání.">
          {(p) => <input {...p} type="date" defaultValue={h.vyvesenoDo ?? ''} />}
        </Pole>
      </div>
      <Pole nazev="text" popisek="Text dokumentu" chyba={v.chyby.text} napoveda="Z textu vznikne ukázkové PDF. Odstavce oddělte prázdným řádkem.">
        {(p) => <textarea {...p} defaultValue={h.text ?? ''} maxLength={8000} />}
      </Pole>
      <div className="zaskrtavatko">
        <input id="pole-skrytPoSejmuti" name="skrytPoSejmuti" type="checkbox" defaultChecked={h.skryt === undefined ? true : h.skryt === 'on'} />
        <label htmlFor="pole-skrytPoSejmuti">Po sejmutí nezveřejňovat</label>
      </div>
      <div className="zaskrtavatko">
        <input
          id="pole-bezOsobnichUdaju"
          name="bezOsobnichUdaju"
          type="checkbox"
          defaultChecked={h.bezOsobnichUdaju === 'on'}
          aria-invalid={v.chyby.bezOsobnichUdaju ? true : undefined}
          aria-describedby={v.chyby.bezOsobnichUdaju ? 'pole-bezOsobnichUdaju-chyba' : undefined}
        />
        <label htmlFor="pole-bezOsobnichUdaju">Dokument neobsahuje osobní údaje</label>
      </div>
      {v.chyby.bezOsobnichUdaju ? (
        <span id="pole-bezOsobnichUdaju-chyba" className="chyba-pole">
          Chyba: {v.chyby.bezOsobnichUdaju}
        </span>
      ) : null}
      <p>
        <button type="submit" disabled={odesila}>
          Vyvěsit na úřední desku
        </button>
      </p>
      <Zprava v={v} />
    </form>
  )
}

export function FormSejmuti({ id, nazev, vyvesenoDo }: { id: string; nazev: string; vyvesenoDo: string | null }) {
  const [v, akce, odesila] = useActionState(zmenSejmuti, START)
  return (
    <form action={akce} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'flex-end' }}>
      <input type="hidden" name="id" value={id} />
      <div>
        <label htmlFor={`sejmuti-${id}`}>
          Sejmout<span className="sr-only">: {nazev}</span>
        </label>
        <input id={`sejmuti-${id}`} name="vyvesenoDo" type="date" defaultValue={vyvesenoDo ?? ''} />
      </div>
      <button type="submit" className="tlacitko druhe" disabled={odesila}>
        Uložit novou verzi<span className="sr-only">: {nazev}</span>
      </button>
      <Zprava v={v} />
    </form>
  )
}

export function FormSmazat({ id, nazev }: { id: string; nazev: string }) {
  const [v, akce] = useActionState(smaz, START)
  return (
    <form action={akce}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="tlacitko druhe">
        Smazat připravený dokument<span className="sr-only">: {nazev}</span>
      </button>
      <Zprava v={v} />
    </form>
  )
}

/* ------------------------------------------------------------ krize */

const POPISKY_KRIZE = { uroven: 'Úroveň', titulek: 'Titulek', text: 'Text', odkazText: 'Text odkazu', odkazUrl: 'Adresa odkazu' }

export function FormKrize({ casti }: { casti: { slug: string; nazev: string }[] }) {
  const [v, akce, odesila] = useActionState(vydej, START)
  const [role, setRole] = useState<'spravce' | 'redaktor'>('spravce')
  const h = v.hodnoty
  return (
    <form action={akce} noValidate key={v.ok ? `hotovo-${v.zprava}` : 'rozpracovano'}>
      <SouhrnChyb chyby={v.chyby} popisky={POPISKY_KRIZE} />
      <fieldset>
        <legend>Kdo hlášení vydává (ukázka role)</legend>
        <div className="zaskrtavatko">
          <input id="role-spravce" type="radio" name="role" value="spravce" checked={role === 'spravce'} onChange={() => setRole('spravce')} />
          <label htmlFor="role-spravce">Správce, může hlášení vydat</label>
        </div>
        <div className="zaskrtavatko">
          <input id="role-redaktor" type="radio" name="role" value="redaktor" checked={role === 'redaktor'} onChange={() => setRole('redaktor')} />
          <label htmlFor="role-redaktor">Redaktor, uloží jen koncept</label>
        </div>
      </fieldset>
      <fieldset id="pole-uroven" aria-describedby={v.chyby.uroven ? 'pole-uroven-chyba' : undefined}>
        <legend>Úroveň</legend>
        {v.chyby.uroven ? (
          <span id="pole-uroven-chyba" className="chyba-pole">
            Chyba: {v.chyby.uroven}
          </span>
        ) : null}
        {[
          ['info', 'Informace obce'],
          ['warning', 'Výstraha'],
          ['emergency', 'Krizová situace'],
        ].map(([k, n]) => (
          <div className="zaskrtavatko" key={k}>
            <input id={`uroven-${k}`} type="radio" name="uroven" value={k} defaultChecked={(h.uroven ?? 'info') === k} />
            <label htmlFor={`uroven-${k}`}>{n}</label>
          </div>
        ))}
      </fieldset>
      <Pole nazev="titulek" popisek="Titulek" chyba={v.chyby.titulek} napoveda="Začněte malým písmenem, zobrazí se za úrovní: „Výstraha: silný vítr“.">
        {(p) => <input {...p} type="text" defaultValue={h.titulek ?? ''} maxLength={120} />}
      </Pole>
      <Pole nazev="text" popisek="Text" chyba={v.chyby.text}>
        {(p) => <textarea {...p} defaultValue={h.text ?? ''} maxLength={600} style={{ minHeight: 90 }} />}
      </Pole>
      <div className="mrizka">
        <Pole nazev="odkazText" popisek="Text odkazu" chyba={v.chyby.odkazText}>
          {(p) => <input {...p} type="text" defaultValue={h.odkazText ?? ''} maxLength={60} />}
        </Pole>
        <Pole nazev="odkazUrl" popisek="Adresa odkazu" chyba={v.chyby.odkazUrl} napoveda="https:// nebo cesta na webu, například /voda.">
          {(p) => <input {...p} type="text" defaultValue={h.odkazUrl ?? ''} maxLength={300} />}
        </Pole>
      </div>
      <fieldset>
        <legend>Části obce</legend>
        <p className="napoveda">Nic nezaškrtnuté znamená celou obec.</p>
        {casti.map((c) => (
          <div className="zaskrtavatko" key={c.slug}>
            <input id={`cast-${c.slug}`} type="checkbox" name="casti" value={c.slug} />
            <label htmlFor={`cast-${c.slug}`}>{c.nazev}</label>
          </div>
        ))}
      </fieldset>
      <button type="submit" disabled={odesila}>
        {role === 'spravce' ? 'Vydat hlášení' : 'Uložit koncept'}
      </button>
      <Zprava v={v} />
    </form>
  )
}

export function FormUkoncit({ id, titulek }: { id: string; titulek: string }) {
  const [v, akce] = useActionState(ukonci, START)
  return (
    <form action={akce}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="tlacitko druhe">
        Ukončit<span className="sr-only"> hlášení {titulek}</span>
      </button>
      <Zprava v={v} />
    </form>
  )
}

export function FormKoncept({ id, titulek }: { id: string; titulek: string }) {
  const [v, akce] = useActionState(vydejKoncept, START)
  return (
    <form action={akce}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="role" value="spravce" />
      <button type="submit" className="tlacitko druhe">
        Vydat jako správce<span className="sr-only">: {titulek}</span>
      </button>
      <Zprava v={v} />
    </form>
  )
}

/* ------------------------------------------------------------ závady */

export function FormZavada({
  id,
  cislo,
  stav,
  odpoved,
  stavy,
}: {
  id: string
  cislo: string
  stav: string
  odpoved: string | null
  stavy: { id: string; nazev: string }[]
}) {
  const [v, akce, odesila] = useActionState(zmenZavadu, START)
  return (
    <form action={akce}>
      <input type="hidden" name="id" value={id} />
      <div className="mrizka">
        <div className="pole">
          <label htmlFor={`stav-${id}`}>Stav hlášení {cislo}</label>
          <select id={`stav-${id}`} name="stav" defaultValue={stav}>
            {stavy.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nazev}
              </option>
            ))}
          </select>
        </div>
        <div className="pole">
          <label htmlFor={`odpoved-${id}`}>Veřejná odpověď</label>
          <textarea id={`odpoved-${id}`} name="verejnaOdpoved" defaultValue={odpoved ?? ''} maxLength={1000} style={{ minHeight: 80 }} />
        </div>
      </div>
      <button type="submit" disabled={odesila}>
        Uložit<span className="sr-only"> hlášení {cislo}</span>
      </button>
      <Zprava v={v} />
    </form>
  )
}

/* ------------------------------------------------------------ obnovení */

export function FormObnovit() {
  const [v, akce] = useActionState(obnov, START)
  const [potvrdit, setPotvrdit] = useState(false)
  let obsah: ReactNode
  if (!potvrdit) {
    obsah = (
      <button type="button" className="tlacitko druhe" onClick={() => setPotvrdit(true)}>
        Obnovit ukázku
      </button>
    )
  } else {
    obsah = (
      <form action={akce} onSubmit={() => setPotvrdit(false)} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <span role="status">Všechny změny se smažou a data se vrátí do výchozího stavu.</span>
        <input type="hidden" name="potvrzeni" value="ano" />
        <button type="submit">Ano, obnovit</button>
        <button type="button" className="tlacitko druhe" onClick={() => setPotvrdit(false)}>
          Zrušit
        </button>
      </form>
    )
  }
  return (
    <div>
      {obsah}
      <Zprava v={v} />
    </div>
  )
}
