import Link from 'next/link'

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
    <footer className="na-tmave zare mt-24 bg-noc text-white">
      <div className="obal grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <img src="/brand-svg/logo-bile.svg" alt="CodeKom, Tvoříme kódy pro lidi." width={941} height={630} className="h-auto w-[180px]" />
          <p className="mt-4 text-[15px] text-sediva-tma">
            CodeKom s.r.o., IČO <mark className="doplnit">[DOPLNIT: IČO]</mark>
          </p>
        </div>
        {SLOUPCE.map((s) => (
          <nav key={s.nadpis} aria-label={s.nadpis}>
            <h2 className="mb-2 text-[15px] font-medium text-sediva-tma" style={{ color: '#a9afbd' }}>
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
      <div className="obal border-t border-white/10 py-6 text-[14px] text-sediva-tma">
        Web nepoužívá cookies ani měření návštěvnosti. Fotografie na webu vytvořila umělá inteligence a jsou tak označené.
      </div>
    </footer>
  )
}
