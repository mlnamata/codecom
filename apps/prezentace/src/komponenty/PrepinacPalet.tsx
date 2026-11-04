'use client'
import Image from 'next/image'
import { useState } from 'react'

interface Paleta {
  index: number
  nazev: string
  barvy: { nazev: string; hodnota: string }[]
  snimek: string
}

/** Přepínač 3 barevných variant: mění snímek, alt text a odkaz do živé ukázky. */
export function PrepinacPalet({ nazev, palety, odkazyDema, aplikace }: { nazev: string; palety: Paleta[]; odkazyDema: (string | null)[]; aplikace: string | null }) {
  const [vybrana, setVybrana] = useState(0)
  const p = palety[vybrana] ?? palety[0]!
  const demo = odkazyDema[vybrana] ?? null
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Barevná varianta" className="flex flex-wrap gap-2">
          {palety.map((x) => (
            <button
              key={x.index}
              type="button"
              aria-pressed={x.index === vybrana}
              onClick={() => setVybrana(x.index)}
              className={`inline-flex min-h-11 items-center gap-2 rounded border px-4 ${x.index === vybrana ? 'border-black bg-black text-white' : 'border-linka bg-white hover:border-black'}`}
            >
              <span className="size-4 rounded-full border border-[#999]" style={{ background: x.barvy[3]!.hodnota }} aria-hidden="true" />
              {x.nazev}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {demo ? (
            <a href={demo} className="tlacitko" rel="noopener noreferrer">
              Prohlédnout živou ukázku
            </a>
          ) : null}
          {aplikace ? (
            <a href={aplikace} className="tlacitko-obrys" rel="noopener noreferrer">
              Vyzkoušet aplikaci
            </a>
          ) : null}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Zobrazená varianta {p.nazev}
      </p>
      <div className="mt-6 border border-linka">
        <Image
          src={p.snimek}
          alt={`Úvodní stránka šablony ${nazev} pro obec Javoří Lhota, paleta ${p.nazev}.`}
          width={1280}
          height={900}
          sizes="(min-width: 1120px) 1056px, 100vw"
          priority
          className="block h-auto w-full"
        />
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-sediva" aria-label={`Barvy palety ${p.nazev}`}>
        {p.barvy.map((b) => (
          <li key={b.nazev} className="inline-flex items-center gap-2">
            <span className="size-5 rounded-sm border border-[#999]" style={{ background: b.hodnota }} aria-hidden="true" />
            {b.nazev} <span className="font-mono">{b.hodnota}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
