'use server'

import { revalidatePath } from 'next/cache'
import { notFound, redirect } from 'next/navigation'
import { demoTed } from '@codekom/demo-data'
import { pragueDayKey } from '@codekom/typy/pravidla'
import { obnovPredplatne, vystavMesicniFaktury, zmenPredplatne, zmenStavFaktury, type Platba, type StavFaktury, type StavPredplatneho } from '@/lib/data/predplatne'
import { jeUroven } from '@/ukazka/uroven'

/** Akce interní správy. V ukázce bez přihlášení, v ostrém provozu jen pro role CodeKom. */
function hlidej(): void {
  if (process.env.NEXT_PUBLIC_UKAZKA !== '1') notFound()
}

const txt = (f: FormData, k: string): string => {
  const v = f.get(k)
  return typeof v === 'string' ? v : ''
}

const STAVY: StavPredplatneho[] = ['zkusebni', 'aktivni', 'jen-cteni', 'vypovezeno']
const STAVY_FAKTURY: StavFaktury[] = ['neuhrazena', 'zaplacena', 'po-splatnosti', 'upominka']

export async function ulozPredplatne(f: FormData): Promise<void> {
  hlidej()
  const slug = txt(f, 'slug')
  const uroven = txt(f, 'uroven')
  const stav = txt(f, 'stav') as StavPredplatneho
  const platba = txt(f, 'platba') as Platba
  const budovy = Math.max(0, Math.min(50, Number.parseInt(txt(f, 'budovy'), 10) || 0))
  if (!jeUroven(uroven) || !STAVY.includes(stav) || !['rocni', 'mesicni'].includes(platba)) redirect(`/ukazka/codekom/obce/${slug}?chyba=1`)
  zmenPredplatne(slug, { uroven, stav, platba, budovy, urad: f.get('urad') === 'ano' })
  revalidatePath('/ukazka', 'layout')
  redirect(`/ukazka/codekom/obce/${slug}?ulozeno=1`)
}

export async function zmenFakturu(f: FormData): Promise<void> {
  hlidej()
  const stav = txt(f, 'stav') as StavFaktury
  if (!STAVY_FAKTURY.includes(stav)) return
  zmenStavFaktury(txt(f, 'cislo'), stav, pragueDayKey(demoTed()))
  revalidatePath('/ukazka', 'layout')
  const zpet = txt(f, 'zpet')
  redirect(zpet.startsWith('/ukazka/codekom') ? zpet : '/ukazka/codekom/faktury')
}

export async function vystavFaktury(f: FormData): Promise<void> {
  hlidej()
  const mesic = txt(f, 'mesic')
  if (!/^\d{4}-\d{2}$/.test(mesic)) return
  const n = vystavMesicniFaktury(mesic)
  revalidatePath('/ukazka', 'layout')
  redirect(`/ukazka/codekom/faktury?vystaveno=${n}`)
}

export async function obnovSpravu(): Promise<void> {
  hlidej()
  obnovPredplatne()
  revalidatePath('/ukazka', 'layout')
  redirect('/ukazka/codekom')
}
