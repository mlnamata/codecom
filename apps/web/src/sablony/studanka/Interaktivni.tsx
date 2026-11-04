'use client'

// Vygenerováno skriptem design/generator/do-tsx.py. Logika je v logika.ts (ručně upravená z tpls.py).
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Paleta } from '@codekom/tokeny'
import type { DataUvodu } from '../sdilene/typy'
import { hodnoty, POCATECNI_STAV, type Hodnoty, type Stav } from './logika'

const Kontext = createContext<Hodnoty | null>(null)

/** Drží stav interaktivní šablony studanka pro hlavičku, úvod i patičku. */
export function StavSablony({ paleta, data, children }: { paleta: Paleta; data: DataUvodu; children: ReactNode }) {
  const [stav, nastavStav] = useState<Stav>(POCATECNI_STAV)
  const self = { state: stav, setState: (z: Partial<Stav>) => nastavStav((s) => ({ ...s, ...z })) }
  const c = { ...paleta, x: paleta.extra }
  const v = hodnoty(self, c, data)
  const fs = 'fs' in v ? String(v.fs) : null
  return <Kontext.Provider value={v}>{fs ? <div style={{ fontSize: fs }}>{children}</div> : children}</Kontext.Provider>
}

export function useHodnoty(): Hodnoty {
  const v = useContext(Kontext)
  if (!v) throw new Error('Šablona studanka potřebuje StavSablony')
  return v
}
