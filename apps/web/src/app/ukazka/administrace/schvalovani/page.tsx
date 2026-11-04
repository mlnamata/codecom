import type { Metadata } from 'next'
import { staci } from '@/ukazka/uroven'
import { urovenAdministrace } from '@/ukazka/uroven-server'
import { Schvalovani } from '../Obrazovky'
import { Zamceno } from '../Zamceno'

export const metadata: Metadata = { title: 'Ke schválení' }
export const dynamic = 'force-dynamic'

export default async function Stranka() {
  const uroven = await urovenAdministrace()
  if (!staci(uroven, 'pokrocily')) return (
    <>
      <h1>Ke schválení</h1>
      <Zamceno od="pokrocily" co="Ke schválení" />
    </>
  )
  return (
    <>
      <h1>Ke schválení</h1>
      <p>Příspěvky, které čekají na schválení před zveřejněním.</p>
      <Schvalovani vicestupnove={uroven === 'advance'} />
    </>
  )
}
