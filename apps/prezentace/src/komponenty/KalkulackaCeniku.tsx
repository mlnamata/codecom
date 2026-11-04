'use client'
import { useState } from 'react'
import { STITEK_CENY, VELIKOSTI, kc, spocitej, type KlicUrovne } from '@/lib/cenik'

const UROVNE: { klic: KlicUrovne; nazev: string }[] = [
  { klic: 'zaklad', nazev: 'Základ' },
  { klic: 'pokrocily', nazev: 'Pokročilý' },
  { klic: 'advance', nazev: 'Advance' },
]

const pole = 'mt-2 block min-h-12 w-full rounded border border-black bg-white px-3'

export function KalkulackaCeniku() {
  const [velikost, setVelikost] = useState(0)
  const [uroven, setUroven] = useState<KlicUrovne>('zaklad')
  const [urad, setUrad] = useState(false)
  const [budovy, setBudovy] = useState(0)
  const cena = spocitej(velikost, uroven, urad, budovy)
  return (
    <div className="my-8 grid gap-8 border border-black p-6 md:grid-cols-2">
      <div className="grid gap-5">
        <label className="block font-medium">
          Velikost obce
          <select className={pole} value={velikost} onChange={(e) => setVelikost(Number(e.target.value))}>
            {VELIKOSTI.map((v, i) => (
              <option key={v.klic} value={i}>
                {v.nazev}
              </option>
            ))}
          </select>
        </label>
        <label className="block font-medium">
          Úroveň webu
          <select className={pole} value={uroven} onChange={(e) => setUroven(e.target.value as KlicUrovne)}>
            {UROVNE.map((u) => (
              <option key={u.klic} value={u.klic}>
                {u.nazev}
              </option>
            ))}
          </select>
        </label>
        <fieldset>
          <legend className="font-medium">Digitální úřad</legend>
          <div className="mt-2 flex gap-6">
            {[
              [false, 'Ne'],
              [true, 'Ano'],
            ].map(([h, t]) => (
              <label key={String(t)} className="inline-flex min-h-11 items-center gap-2">
                <input type="radio" name="urad" className="size-5 accent-black" checked={urad === h} onChange={() => setUrad(h as boolean)} />
                {t}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block font-medium">
          Počet budov s modulem Chytré budovy
          <input type="number" min={0} max={50} inputMode="numeric" className={pole} value={budovy} onChange={(e) => setBudovy(Math.max(0, Math.min(50, Number(e.target.value) || 0)))} />
        </label>
      </div>
      <div className="flex flex-col justify-end bg-plocha p-6">
        <p aria-live="polite">
          <span className="block text-sediva">Orientačně od</span>
          <span className="block text-[40px] font-semibold leading-tight" style={{ fontFamily: 'var(--font-nadpis)' }}>
            {kc(cena)}
          </span>
          <span className="block">měsíčně bez DPH</span>
        </p>
        <p className="stitek mt-4">{STITEK_CENY}</p>
      </div>
    </div>
  )
}
