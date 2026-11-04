import Link from 'next/link'
import { Logo } from './Logo'

const SLOUPCE = [
  {
    nadpis: 'Produkt',
    odkazy: [
      ['/ukazky', 'Šablony webů'],
      ['/urovne', 'Úrovně editoru'],
      ['/cenik', 'Ceník'],
      ['/co-umime', 'Co umíme'],
      ['/dotace', 'Dotace'],
    ],
  },
  {
    nadpis: 'Pro obce',
    odkazy: [
      ['/pro-koho', 'Pro koho'],
      ['/prechod', 'Přechod na CodeKom'],
      ['/ke-stazeni', 'Ke stažení'],
      ['/ke-stazeni#caste-otazky', 'Časté otázky'],
      ['/bezpecnost-a-pravo', 'Bezpečnost a právo'],
    ],
  },
  {
    nadpis: 'CodeKom',
    odkazy: [
      ['/o-nas', 'O nás'],
      ['/kontakt', 'Kontakt'],
      ['/pristupnost', 'Prohlášení o přístupnosti'],
      ['/zasady-osobnich-udaju', 'Osobní údaje'],
      ['/cookies', 'Cookies'],
    ],
  },
]

export function Paticka() {
  return (
    <footer className="na-tmave mt-24 bg-cerna text-white">
      <div className="obal grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo bile />
          <p className="mt-6 text-[20px] font-medium" style={{ fontFamily: 'var(--font-nadpis)' }}>
            Tvoříme kódy pro lidi.
          </p>
          <p className="mt-4 text-[15px] text-[#bdbdbd]">
            CodeKom s.r.o., IČO <mark className="doplnit">[DOPLNIT: IČO]</mark>
          </p>
        </div>
        {SLOUPCE.map((s) => (
          <nav key={s.nadpis} aria-label={s.nadpis}>
            <h2 className="mb-2 text-[15px] font-medium text-[#bdbdbd]" style={{ color: '#bdbdbd' }}>
              {s.nadpis}
            </h2>
            <ul>
              {s.odkazy.map(([href, text]) => (
                <li key={href}>
                  <Link href={href!} className="inline-flex min-h-11 items-center text-white no-underline hover:underline">
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="obal border-t border-[#333] py-6 text-[14px] text-[#bdbdbd]">
        Web nepoužívá cookies ani měření návštěvnosti. Fotografie na webu vytvořila umělá inteligence a jsou tak označené.
      </div>
    </footer>
  )
}
