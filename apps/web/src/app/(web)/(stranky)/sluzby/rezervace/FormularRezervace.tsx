'use client'

import { useActionState } from 'react'
import { Pole, SouhrnChyb, Uspech } from '@/components/stranka/Formular'
import { odesliRezervaci, type StavFormulare } from '../akce'

const POPISKY = {
  prostor: 'Prostor',
  den: 'Den',
  od: 'Od',
  do: 'Do',
  ucel: 'Účel',
  jmeno: 'Jméno nebo spolek',
  kontakt: 'Telefon nebo e-mail',
}

export function FormularRezervace({ prostory, minDen, maxDen }: { prostory: { id: string; nazev: string }[]; minDen: string; maxDen: string }) {
  const [stav, odeslat, odesila] = useActionState<StavFormulare, FormData>(odesliRezervaci, { chyby: {}, hodnoty: {} })
  const h = stav.hodnoty
  const ch = stav.chyby

  if (stav.vysledek) {
    return (
      <Uspech nadpis="Žádost čeká na schválení">
        <p>
          Termín {stav.vysledek.den} od {stav.vysledek.od} do {stav.vysledek.do} jsme pro vás podrželi. Ozveme se vám s potvrzením.
        </p>
        <p>
          <a href="/sluzby/rezervace">Podat další žádost</a>
        </p>
      </Uspech>
    )
  }

  return (
    <form action={odeslat} noValidate>
      <SouhrnChyb chyby={ch} popisky={POPISKY} />
      <Pole nazev="prostor" popisek={POPISKY.prostor} chyba={ch.prostor}>
        {(p) => (
          <select {...p} defaultValue={h.prostor ?? prostory[0]?.id}>
            {prostory.map((x) => (
              <option key={x.id} value={x.id}>
                {x.nazev}
              </option>
            ))}
          </select>
        )}
      </Pole>
      <Pole nazev="den" popisek={POPISKY.den} chyba={ch.den}>
        {(p) => <input {...p} type="date" min={minDen} max={maxDen} defaultValue={h.den ?? ''} />}
      </Pole>
      <div className="mrizka">
        <Pole nazev="od" popisek={POPISKY.od} chyba={ch.od} napoveda="Například 14:00">
          {(p) => <input {...p} type="time" step={900} defaultValue={h.od ?? '14:00'} />}
        </Pole>
        <Pole nazev="do" popisek={POPISKY.do} chyba={ch.do} napoveda="Například 18:00">
          {(p) => <input {...p} type="time" step={900} defaultValue={h.do ?? '18:00'} />}
        </Pole>
      </div>
      <Pole nazev="ucel" popisek={POPISKY.ucel} chyba={ch.ucel} napoveda="Například oslava narozenin nebo schůze spolku.">
        {(p) => <input {...p} type="text" defaultValue={h.ucel ?? ''} maxLength={200} />}
      </Pole>
      <Pole nazev="jmeno" popisek={POPISKY.jmeno} chyba={ch.jmeno}>
        {(p) => <input {...p} type="text" autoComplete="name" defaultValue={h.jmeno ?? ''} maxLength={100} />}
      </Pole>
      <Pole nazev="kontakt" popisek={POPISKY.kontakt} chyba={ch.kontakt}>
        {(p) => <input {...p} type="text" defaultValue={h.kontakt ?? ''} maxLength={100} />}
      </Pole>
      <button type="submit" disabled={odesila}>
        {odesila ? 'Odesílám' : 'Poslat žádost'}
      </button>
    </form>
  )
}
