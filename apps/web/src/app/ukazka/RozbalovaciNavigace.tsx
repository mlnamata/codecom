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
        <span>Menu</span>
        {aktualni ? <span className="admin__menu-stranka">{aktualni}</span> : null}
      </button>
      <div id={id} className="admin__navigace-obsah" data-otevreno={otevreno ? 'true' : 'false'}>
        {children}
      </div>
    </nav>
  )
}
