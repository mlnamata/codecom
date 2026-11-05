'use client'

import { createContext, useContext, useId, useState, useSyncExternalStore, type ReactNode } from 'react'

/**
 * Sdílený stav rámu administrace: hledání v menu (pole je v horní liště, filtruje boční menu)
 * a přepínač světlého a tmavého vzhledu.
 */

const KontextHledani = createContext<{ dotaz: string; setDotaz: (d: string) => void }>({ dotaz: '', setDotaz: () => {} })

export function RamAdministrace({ children }: { children: ReactNode }) {
  const [dotaz, setDotaz] = useState('')
  return <KontextHledani.Provider value={{ dotaz, setDotaz }}>{children}</KontextHledani.Provider>
}

export const useHledani = () => useContext(KontextHledani)

/** Malá písmena bez diakritiky, aby „uredni“ našlo „Úřední deska“. */
export const normalizuj = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()

/** Pole hledání v administraci. Filtruje položky menu, Enter otevře první nalezenou. */
export function HledaniVMenu({ nazvy }: { nazvy: { nazev: string; href: string }[] }) {
  const { dotaz, setDotaz } = useHledani()
  const id = useId()
  const n = normalizuj(dotaz)
  const nalezene = n ? nazvy.filter((p) => normalizuj(p.nazev).includes(n)) : []
  return (
    <form
      role="search"
      className="admin__hledani"
      onSubmit={(e) => {
        e.preventDefault()
        const prvni = nalezene[0]
        if (prvni) window.location.assign(prvni.href)
      }}
    >
      <label htmlFor={id} className="sr-only">
        Hledat v administraci
      </label>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        id={id}
        type="search"
        placeholder="Hledat v administraci"
        autoComplete="off"
        value={dotaz}
        onChange={(e) => setDotaz(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setDotaz('')
        }}
      />
      <span className="sr-only" aria-live="polite">
        {n ? (nalezene.length ? `V menu ${nalezene.length === 1 ? 'je 1 položka' : `je ${nalezene.length} položek`}, Enter otevře první: ${nalezene[0]?.nazev}` : 'V menu nic neodpovídá') : ''}
      </span>
    </form>
  )
}

type Vzhled = 'tmavy' | 'svetly'
const KLIC = 'codekom-admin-vzhled'
const UDALOST = 'codekom-admin-vzhled'

/**
 * Skript před prvním vykreslením: uložená volba, jinak systémové nastavení, bez JS tmavý vzhled.
 * Atribut se zapisuje na rám administrace (suppressHydrationWarning), React ho nespravuje.
 */
export const SKRIPT_VZHLEDU = `(function(){var r=document.currentScript&&document.currentScript.parentElement;if(!r)return;var v=null;try{v=localStorage.getItem('${KLIC}')}catch(e){}if(v!=='svetly'&&v!=='tmavy'){v=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'svetly':'tmavy'}r.setAttribute('data-vzhled',v)})()`

const ram = () => document.querySelector<HTMLElement>('.admin-obec')
const ctiVzhled = (): Vzhled => (ram()?.getAttribute('data-vzhled') === 'svetly' ? 'svetly' : 'tmavy')
const odebirej = (zmena: () => void) => {
  window.addEventListener(UDALOST, zmena)
  return () => window.removeEventListener(UDALOST, zmena)
}

export function PrepinacVzhledu() {
  const vzhled = useSyncExternalStore(odebirej, ctiVzhled, () => 'tmavy' as Vzhled)
  const tmavy = vzhled === 'tmavy'
  return (
    <button
      type="button"
      className="admin__ikona-tlacitko"
      aria-pressed={tmavy}
      title={tmavy ? 'Přepnout na světlý vzhled' : 'Přepnout na tmavý vzhled'}
      onClick={() => {
        const novy: Vzhled = tmavy ? 'svetly' : 'tmavy'
        ram()?.setAttribute('data-vzhled', novy)
        try {
          localStorage.setItem(KLIC, novy)
        } catch {
          // Bez úložiště (soukromé okno) platí volba jen do obnovení stránky.
        }
        window.dispatchEvent(new Event(UDALOST))
      }}
    >
      <span className="sr-only">Tmavý vzhled</span>
      {tmavy ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )}
    </button>
  )
}
