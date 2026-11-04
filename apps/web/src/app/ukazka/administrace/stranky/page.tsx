import type { Metadata } from 'next'
import { schopnosti } from '@/ukazka/uroven'
import { urovenAdministrace } from '@/ukazka/uroven-server'
import { EditorMenu } from '../Obrazovky'

export const metadata: Metadata = { title: 'Stránky a menu' }
export const dynamic = 'force-dynamic'

export default async function Stranka() {
  const uroven = await urovenAdministrace()
  const s = schopnosti(uroven)
  return (
    <>
      <h1>Stránky a menu</h1>
      <p>Hlavní menu webu a jeho pořadí. Změny se v ukázce drží jen v tomto okně.</p>
      <EditorMenu s={s} uroven={uroven} />
    </>
  )
}
