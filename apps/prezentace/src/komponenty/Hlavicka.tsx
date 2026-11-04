import Link from 'next/link'
import { Logo } from './Logo'

export const NAVIGACE = [
  { href: '/ukazky', text: 'Šablony' },
  { href: '/urovne', text: 'Úrovně' },
  { href: '/cenik', text: 'Ceník' },
  { href: '/co-umime', text: 'Co umíme' },
  { href: '/pro-koho', text: 'Pro koho' },
  { href: '/prechod', text: 'Přechod' },
]

export function Hlavicka() {
  return (
    <header className="sticky top-0 z-20 border-b border-linka bg-white">
      <a href="#obsah" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:bg-white focus:p-3">
        Přeskočit na obsah
      </a>
      <div className="obal flex min-h-[72px] items-center justify-between gap-6">
        <Link href="/" className="inline-flex min-h-11 items-center" aria-label="CodeKom, úvodní stránka">
          <Logo />
        </Link>
        <nav aria-label="Hlavní" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAVIGACE.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-flex min-h-11 items-center px-3 text-[16px] no-underline hover:underline">
                  {n.text}
                </Link>
              </li>
            ))}
            <li className="ml-3">
              <Link href="/kontakt" className="tlacitko">
                Napište nám
              </Link>
            </li>
          </ul>
        </nav>
        <details className="relative lg:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center rounded border border-black px-4 font-medium">Menu</summary>
          <nav aria-label="Hlavní" className="absolute right-0 top-14 w-64 border border-linka bg-white p-2">
            <ul>
              {NAVIGACE.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="flex min-h-11 items-center px-3 no-underline hover:underline">
                    {n.text}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link href="/kontakt" className="tlacitko w-full">
                  Napište nám
                </Link>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  )
}
