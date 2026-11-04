import type { Metadata } from 'next'
import { schopnosti, staci } from '@/ukazka/uroven'
import { urovenAdministrace } from '@/ukazka/uroven-server'
import { Podweby } from '../Obrazovky'
import { Zamceno } from '../Zamceno'

export const metadata: Metadata = { title: 'Podweby organizací' }
export const dynamic = 'force-dynamic'

export default async function Stranka() {
  const uroven = await urovenAdministrace()
  const s = schopnosti(uroven)
  if (!staci(uroven, 'pokrocily')) return (
    <>
      <h1>Podweby organizací</h1>
      <Zamceno od="pokrocily" co="Podweby organizací" />
    </>
  )
  return (
    <>
      <h1>Podweby organizací</h1>
      <p>Škola, školka, knihovna nebo hasiči mají podweb ze stejné šablony.</p>
      <Podweby s={s} />
    </>
  )
}
