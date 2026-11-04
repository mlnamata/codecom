import type { Metadata } from 'next'
import { demoTed } from '@codekom/demo-data'
import { pragueDayKey } from '@codekom/typy/pravidla'
import { Drobecky, VyriditeNaUrade } from '@/components/stranka/Casti'
import { zdroj } from '@/lib/data/zdroj'
import { denSlovemRok } from '@/sablony/sdilene/format'
import { nactiObec, slugObce } from '@/lib/web'
import { FormularRezervace } from './FormularRezervace'

export const metadata: Metadata = { title: 'Pronájem sálu' }

const kc = (n: number): string => `${n.toLocaleString('cs-CZ').replace(/\s/g, ' ')} Kč`

function pridejDny(den: string, n: number): string {
  const d = new Date(`${den}T12:00:00.000Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

/** Sál a hasičárna: obsazené termíny na nejbližších 8 týdnů a žádost o rezervaci. */
export default async function Rezervace() {
  const obec = await nactiObec()
  const z = await zdroj()
  const prostory = await z.prostory(slugObce())
  const dnes = pragueDayKey(demoTed())
  const konec = pridejDny(dnes, 56)
  const obsazeno = await Promise.all(prostory.map((p) => z.rezervace(slugObce(), p.id)))

  return (
    <>
      <Drobecky polozky={[{ nazev: 'Služby', href: '/sluzby' }, { nazev: 'Pronájem sálu' }]} />
      <h1>Pronájem sálu</h1>
      {prostory.map((p, i) => {
        const terminy = (obsazeno[i] ?? []).filter((r) => r.den >= dnes && r.den <= konec).sort((a, b) => (a.den + a.od).localeCompare(b.den + b.od))
        return (
          <section key={p.id} aria-labelledby={`prostor-${p.id}`}>
            <h2 id={`prostor-${p.id}`}>{p.nazev}</h2>
            <p>
              {p.popis} Kapacita {p.kapacita} osob, {kc(p.cenaZaBlok)} za blok, kauce {kc(p.kauce)}. Bloky:{' '}
              {p.bloky.map((b) => `${b.od} až ${b.do}`).join(', ')}.
            </p>
            <h3>Obsazené termíny do {denSlovemRok(konec)}</h3>
            {terminy.length === 0 ? (
              <p>Všechny termíny jsou volné.</p>
            ) : (
              <>
                <ul>
                  {terminy.map((t) => (
                    <li key={`${t.den}-${t.od}`}>
                      {denSlovemRok(t.den)}, {t.od} až {t.do} ({t.stav === 'ceka' ? 'čeká na schválení' : 'obsazeno'})
                    </li>
                  ))}
                </ul>
                <p>Ostatní termíny jsou volné.</p>
              </>
            )}
          </section>
        )
      })}

      <h2>Žádost o rezervaci</h2>
      <FormularRezervace prostory={prostory.map((p) => ({ id: p.id, nazev: p.nazev }))} minDen={dnes} maxDen={konec} />

      <VyriditeNaUrade obec={obec}>{prostory[0]?.uradCesta}</VyriditeNaUrade>
    </>
  )
}
