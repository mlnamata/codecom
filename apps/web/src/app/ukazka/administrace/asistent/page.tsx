import type { Metadata } from 'next'
import { staci } from '@/ukazka/uroven'
import { urovenAdministrace } from '@/ukazka/uroven-server'
import { asistentUkazka } from '@codekom/demo-data'
import { Asistent } from '../Obrazovky'
import { Zamceno } from '../Zamceno'

export const metadata: Metadata = { title: 'AI asistent' }
export const dynamic = 'force-dynamic'

export default async function Stranka() {
  const uroven = await urovenAdministrace()
  if (!staci(uroven, 'advance')) return (
    <>
      <h1>AI asistent</h1>
      <Zamceno od="advance" co="AI asistent" />
    </>
  )
  return (
    <>
      <h1>AI asistent</h1>
      <p>Asistent odpovídá občanům z dokumentů obce a u každé odpovědi uvede zdroj.</p>
      <Asistent upozorneni={asistentUkazka.upozorneni} otazky={asistentUkazka.otazky} />
    </>
  )
}
