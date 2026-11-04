import type { Metadata } from 'next'
import Link from 'next/link'
import { STITEK_CENY, VELIKOSTI, kc } from '@/lib/cenik'
import { BLOKY, MATICE, ROLE, UROVNE, type Hodnota } from '@/lib/urovne'

export const metadata: Metadata = {
  title: 'Tři úrovně editoru webu obce – CodeKom',
  description: 'Základ: píšu obsah. Pokročilý: skládám stránky. Advance: upravuji skoro vše. Porovnání funkcí, rolí a cen všech tří úrovní editoru.',
  alternates: { canonical: '/urovne' },
}

function Bunka({ h }: { h: Hodnota }) {
  if (h === true) return <span>Ano</span>
  if (h === false) return <span className="text-sediva">Ne</span>
  return <span>{h}</span>
}

export default function Urovne() {
  return (
    <div className="obal pt-12">
      <h1 className="text-[34px] md:text-[48px]">Tři úrovně editoru</h1>
      <p className="mt-4 max-w-[40em] text-[19px] text-[#333]">
        Úroveň určuje, co obec smí na webu změnit. Všechny tři jsou jedna aplikace, úroveň jen zapíná funkce. Ani v nejvyšší úrovni nejde rozbít přístupnost ani povinné části webu: editor takovou změnu nepustí do publikace.
      </p>

      <ul className="mt-12 grid border-t border-black md:grid-cols-3">
        {UROVNE.map((u) => (
          <li key={u.klic} className="flex flex-col border-b border-linka py-8 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0">
            <h2 className="text-[28px]">{u.nazev}</h2>
            <p className="mt-1 text-sediva">„{u.princip}“</p>
            <p className="mt-4">{u.popis}</p>
            <p className="mt-4 text-[15px] text-sediva">{u.proKoho}</p>
            <p className="mt-6 text-[22px] font-medium" style={{ fontFamily: 'var(--font-nadpis)' }}>
              od {kc(u.ceny[0])}
              <span className="block text-[14px] font-normal text-sediva" style={{ fontFamily: 'var(--font-sans)' }}>
                měsíčně bez DPH, obec do 500 obyvatel
              </span>
            </p>
            <Link href={`/urovne/${u.klic}`} className="tlacitko-obrys mt-6 self-start">
              Podrobně o úrovni {u.nazev}
            </Link>
          </li>
        ))}
      </ul>
      <p className="stitek mt-4">{STITEK_CENY}</p>

      <section aria-labelledby="ceny" className="mt-16">
        <h2 id="ceny" className="text-[28px]">
          Cena podle velikosti obce
        </h2>
        <div className="mt-6 overflow-x-auto" role="region" aria-label="Tabulka cen, posuňte do strany" tabIndex={0}>
          <table className="w-full min-w-[560px] border-collapse text-left">
            <caption className="sr-only">Orientační ceny úrovní editoru měsíčně bez DPH</caption>
            <thead>
              <tr className="border-b border-black">
                <th scope="col" className="py-3 pr-4 font-semibold">
                  Úroveň
                </th>
                {VELIKOSTI.map((v) => (
                  <th key={v.klic} scope="col" className="py-3 pr-4 font-semibold">
                    {v.nazev}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {UROVNE.map((u) => (
                <tr key={u.klic} className="border-b border-linka">
                  <th scope="row" className="py-3 pr-4 font-medium">
                    {u.nazev}
                  </th>
                  {u.ceny.map((c, i) => (
                    <td key={i} className="py-3 pr-4">
                      od {kc(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="stitek mt-3">Měsíčně bez DPH. {STITEK_CENY} Digitální úřad a Chytré budovy jdou přikoupit ke kterékoli úrovni.</p>
      </section>

      <section aria-labelledby="matice" className="mt-16">
        <h2 id="matice" className="text-[28px]">
          Porovnání funkcí
        </h2>
        <p className="mt-3 max-w-[40em] text-[#333]">Každá vyšší úroveň obsahuje vše z nižší. Matice vychází z návrhu platformy ke 4. 11. 2026 a hlavní obrazovky si můžete proklikat v ukázce administrace.</p>
        <div className="mt-6 overflow-x-auto" role="region" aria-label="Porovnání funkcí, posuňte do strany" tabIndex={0}>
          <table className="w-full min-w-[720px] border-collapse text-left text-[16px]">
            <caption className="sr-only">Funkce editoru v úrovních Základ, Pokročilý a Advance</caption>
            <thead className="sticky top-0 bg-white">
              <tr className="border-b border-black">
                <th scope="col" className="w-[34%] py-3 pr-4 font-semibold">
                  Funkce
                </th>
                {UROVNE.map((u) => (
                  <th key={u.klic} scope="col" className="py-3 pr-4 font-semibold">
                    {u.nazev}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATICE.map((r, i) => {
                const novaOblast = r.oblast !== MATICE[i - 1]?.oblast
                return [
                  novaOblast ? (
                    <tr key={`o-${r.oblast}`}>
                      <th scope="colgroup" colSpan={4} className="bg-plocha px-3 py-2 text-[15px] font-semibold">
                        {r.oblast}
                      </th>
                    </tr>
                  ) : null,
                  <tr key={r.funkce} className="border-b border-linka">
                    <th scope="row" className="py-3 pr-4 font-normal">
                      {r.funkce}
                    </th>
                    {r.hodnoty.map((h, i) => (
                      <td key={i} className="py-3 pr-4 align-top">
                        <Bunka h={h} />
                      </td>
                    ))}
                  </tr>,
                ]
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="role" className="mt-16 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 id="role" className="text-[28px]">
            Role a schvalování
          </h2>
          <p className="mt-3 text-[#333]">Starosta schvaluje, účetní vyvěšuje na desku, ředitelka školy píše jen na svůj podweb. Záznam o vyvěšení na úřední desce nejde smazat ani upravit.</p>
          <dl className="mt-6">
            {ROLE.map((r) => (
              <div key={r.role} className="border-t border-linka py-3">
                <dt className="flex justify-between gap-4 font-medium">
                  {r.role} <span className="text-[14px] font-normal text-sediva">od úrovně {r.od}</span>
                </dt>
                <dd className="text-[#333]">{r.coSmi}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="text-[28px]">Bloky do stránek</h2>
          <p className="mt-3 text-[#333]">Každý blok má pevné schéma, takže výsledek je přístupný a funguje i na mobilu.</p>
          <dl className="mt-6">
            {BLOKY.map((b) => (
              <div key={b.nazev} className="border-t border-linka py-3">
                <dt className="flex justify-between gap-4 font-medium">
                  {b.nazev} <span className="text-[14px] font-normal text-sediva">od úrovně {b.od}</span>
                </dt>
                <dd className="text-[#333]">{b.k}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mt-16 flex flex-wrap gap-3 border-t border-black pt-8">
        <Link href="/ukazky" className="tlacitko">
          Vybrat šablonu
        </Link>
        <Link href="/cenik" className="tlacitko-obrys">
          Spočítat cenu
        </Link>
      </div>
    </div>
  )
}
