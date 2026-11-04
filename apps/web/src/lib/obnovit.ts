import { revalidatePath } from 'next/cache'

/** Po zápisu do ukázkového úložiště obnoví všechny veřejné stránky (web je dynamický, jde o jistotu). */
export function obnovVerejneStranky(): void {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // Mimo požadavek Next.js (testy) není co obnovovat.
  }
}
