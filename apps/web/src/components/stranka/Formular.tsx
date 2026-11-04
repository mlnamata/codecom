'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/** Souhrn chyb nahoře formuláře. Po odeslání s chybou dostane fokus. */
export function SouhrnChyb({ chyby, popisky }: { chyby: Record<string, string>; popisky: Record<string, string> }) {
  const ref = useRef<HTMLDivElement>(null)
  const pocet = Object.keys(chyby).length
  useEffect(() => {
    if (pocet > 0) ref.current?.focus()
  }, [chyby, pocet])
  if (pocet === 0) return null
  return (
    <div ref={ref} className="souhrn-chyb" tabIndex={-1} role="alert" aria-labelledby="souhrn-chyb-nadpis">
      <h2 id="souhrn-chyb-nadpis">Formulář obsahuje chyby</h2>
      <ul>
        {Object.entries(chyby).map(([pole, zprava]) => (
          <li key={pole}>
            {pole === 'formular' ? (
              zprava
            ) : (
              <a href={`#pole-${pole}`}>
                {popisky[pole] ?? pole}: {zprava}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

interface PoleProps {
  nazev: string
  popisek: string
  chyba?: string | undefined
  napoveda?: string
  children: (props: { id: string; name: string; 'aria-invalid'?: true; 'aria-describedby'?: string }) => ReactNode
}

/** Pole s viditelným popiskem, nápovědou a chybou propojenou přes aria-describedby. */
export function Pole({ nazev, popisek, chyba, napoveda, children }: PoleProps) {
  const id = `pole-${nazev}`
  const popis = [napoveda ? `${id}-napoveda` : null, chyba ? `${id}-chyba` : null].filter(Boolean).join(' ')
  return (
    <div className="pole">
      <label htmlFor={id}>{popisek}</label>
      {napoveda ? (
        <span id={`${id}-napoveda`} className="napoveda">
          {napoveda}
        </span>
      ) : null}
      {chyba ? (
        <span id={`${id}-chyba`} className="chyba-pole">
          Chyba: {chyba}
        </span>
      ) : null}
      {children({ id, name: nazev, ...(chyba ? { 'aria-invalid': true as const } : {}), ...(popis ? { 'aria-describedby': popis } : {}) })}
    </div>
  )
}

/** Hláška o úspěchu, dostane fokus. */
export function Uspech({ nadpis, children }: { nadpis: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    ref.current?.focus()
  }, [])
  return (
    <div ref={ref} className="uspech" tabIndex={-1} role="status" aria-labelledby="uspech-nadpis">
      <h2 id="uspech-nadpis" style={{ marginTop: 0 }}>
        {nadpis}
      </h2>
      {children}
    </div>
  )
}
