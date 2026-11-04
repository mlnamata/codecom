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
      <h1>Skladatel úvodní stránky</h1>
      <p>Bloky úvodní stránky přesunete, skryjete nebo přidáte z knihovny. Výsledek je vždy přístupný a funguje na mobilu.</p>
      <Skladatel s={s} />
    </>
  )
}
