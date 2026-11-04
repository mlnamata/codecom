'use client'

import { useActionState } from 'react'
import { Pole, SouhrnChyb, Uspech } from '@/components/stranka/Formular'
import { odesliZavadu, type StavFormulare } from '../akce'

const POPISKY = {
  kategorie: 'Čeho se závada týká',
  popis: 'Popis závady',
  misto: 'Kde závada je',
  jmeno: 'Jméno',
  email: 'E-mail',
  telefon: 'Telefon',
}

export function FormularZavady({ kategorie }: { kategorie: { id: string; nazev: string }[] }) {
  const [stav, odeslat, odesila] = useActionState<StavFormulare, FormData>(odesliZavadu, { chyby: {}, hodnoty: {} })
  const h = stav.hodnoty
  const ch = stav.chyby

  if (stav.vysledek) {
    return (
      <Uspech nadpis="Závadu jsme přijali">
        <p>
          Číslo hlášení: <strong>{stav.vysledek.cislo}</strong>
          <br />
          Sledovací kód: <strong>{stav.vysledek.kod}</strong>
        </p>
        <p>Kód si poznamenejte. Podle něj zjistíte, jak hlášení řešíme.</p>
        <p>
          <a href={`/sluzby/nahlasit-zavadu?kod=${stav.vysledek.kod}#stav`}>Zobrazit stav hlášení</a>
        </p>
      </Uspech>
    )
  }

  return (
    <form action={odeslat} noValidate>
      <SouhrnChyb chyby={ch} popisky={POPISKY} />
      <Pole nazev="kategorie" popisek={POPISKY.kategorie} chyba={ch.kategorie}>
        {(p) => (
          <select {...p} defaultValue={h.kategorie ?? ''}>
            <option value="">Vyberte</option>
            {kategorie.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nazev}
              </option>
            ))}
          </select>
        )}
      </Pole>
      <Pole nazev="popis" popisek={POPISKY.popis} chyba={ch.popis} napoveda="Co se stalo. Aspoň deset znaků.">
        {(p) => <textarea {...p} defaultValue={h.popis ?? ''} maxLength={2000} />}
      </Pole>
      <Pole nazev="misto" popisek={POPISKY.misto} chyba={ch.misto} napoveda="Ulice, číslo domu nebo popis místa.">
        {(p) => <input {...p} type="text" defaultValue={h.misto ?? ''} maxLength={200} />}
      </Pole>
      <fieldset>
        <legend>Kontakt (nepovinné)</legend>
        <p className="napoveda">Bez kontaktu vám nemůžeme odpovědět. Kontakt nikdy nezveřejníme.</p>
        <Pole nazev="jmeno" popisek={POPISKY.jmeno} chyba={ch.jmeno}>
          {(p) => <input {...p} type="text" autoComplete="name" defaultValue={h.jmeno ?? ''} maxLength={100} />}
        </Pole>
        <Pole nazev="email" popisek={POPISKY.email} chyba={ch.email}>
          {(p) => <input {...p} type="email" autoComplete="email" defaultValue={h.email ?? ''} maxLength={100} />}
        </Pole>
        <Pole nazev="telefon" popisek={POPISKY.telefon} chyba={ch.telefon}>
          {(p) => <input {...p} type="tel" autoComplete="tel" defaultValue={h.telefon ?? ''} maxLength={20} />}
        </Pole>
      </fieldset>
      <button type="submit" disabled={odesila}>
        {odesila ? 'Odesílám' : 'Odeslat hlášení'}
      </button>
    </form>
  )
}
