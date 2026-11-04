import type { Metadata } from 'next'
import { schopnosti } from '@/ukazka/uroven'
import { urovenAdministrace } from '@/ukazka/uroven-server'
import { Uzivatele } from '../Obrazovky'

export const metadata: Metadata = { title: 'Uživatelé a role' }
export const dynamic = 'force-dynamic'

export default async function Stranka() {
  const uroven = await urovenAdministrace()
  const s = schopnosti(uroven)
  return (
    <>
      <h1>Uživatelé a role</h1>
      <p>Kdo může do administrace a co v ní smí.</p>
      <Uzivatele s={s} />
    </>
  )
}
