'use client'

import { useId, useState, type ReactNode } from 'react'

/**
 * Boční navigace administrace. Na širokém displeji je vždy vidět, na telefonu se sbalí
 * pod tlačítko Menu s názvem otevřené stránky, aby obsah nebyl až pod dlouhým seznamem.
 */
export function RozbalovaciNavigace({ popisek, aktualni, children }: { popisek: string; aktualni?: string; children: ReactNode }) {
  const [otevreno, setOtevreno] = useState(false)
  const id = useId()
  return (
    <nav aria-label={popisek} className="admin__navigace">
      <button type="button" className="admin__menu" aria-expanded={otevreno} aria-controls={id} onClick={() => setOtevreno((o) => !o)}>
        <span className="admin__menu-titulek">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span>Menu</span>
        </span>
        {aktualni ? <span className="admin__menu-stranka">{aktualni}</span> : null}
        <svg className="admin__menu-sipka" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: otevreno ? 'rotate(180deg)' : undefined, transition: 'transform 0.15s ease' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div id={id} className="admin__navigace-obsah" data-otevreno={otevreno ? 'true' : 'false'}>
        {children}
      </div>
    </nav>
  )
}
