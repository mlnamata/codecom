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

/** Skleněná tmavá lišta nahoře. Na telefonu menu v `<details>`, funguje i bez JavaScriptu. */
export function Hlavicka() {
  return (
    <header className="na-tmave sklo-tmave sticky top-0 z-30 border-x-0 border-t-0">
      <a href="#obsah" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-40 focus:rounded-lg focus:bg-white focus:p-3 focus:text-black">
        Přeskočit na obsah
      </a>
      <div className="obal flex min-h-[72px] items-center justify-between gap-6">
        <Link href="/" className="inline-flex min-h-11 items-center" aria-label="CodeKom, úvodní stránka">
          <Logo bile />
        </Link>
        <nav aria-label="Hlavní" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            {NAVIGACE.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-flex min-h-11 items-center rounded-full px-4 text-[15px] font-medium text-white/85 no-underline transition-colors hover:bg-white/10 hover:text-white">
                  {n.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/kontakt" className="tlacitko hidden !min-h-11 lg:inline-flex">
          Napište nám
        </Link>
        <details className="relative lg:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-full border border-white/25 px-5 font-medium">Menu</summary>
          <nav aria-label="Hlavní" className="sklo-tmave absolute right-0 top-14 w-64 rounded-2xl p-2">
            <ul>
              {NAVIGACE.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="flex min-h-11 items-center rounded-xl px-3 no-underline hover:bg-white/10">
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
