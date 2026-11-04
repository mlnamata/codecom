import type { Metadata } from 'next'
import { schopnosti, staci } from '@/ukazka/uroven'
import { urovenAdministrace } from '@/ukazka/uroven-server'
import { Skladatel } from '../Obrazovky'
import { Zamceno } from '../Zamceno'

export const metadata: Metadata = { title: 'Skladatel úvodní stránky' }
export const dynamic = 'force-dynamic'

export default async function Stranka() {
  const uroven = await urovenAdministrace()
  const s = schopnosti(uroven)
  if (!staci(uroven, 'pokrocily')) return (
    <>
      <h1>Skladatel úvodní stránky</h1>
      <Zamceno od="pokrocily" co="Skladatel úvodní stránky" />
    </>
  )
  return (
    <>
      <h1>Skladatel úvodní stránky a částí webu</h1>
      <p>
        Šablony CodeKom se skládají z více částí (horní Hero zóna, hlavní sloupec, boční panel a spodní servisní pás) i různých podstránek. Jednotlivé widgety můžete libovolně přesouvat mezi částmi šablony.
      </p>
      <Skladatel s={s} />
    </>
  )
}
