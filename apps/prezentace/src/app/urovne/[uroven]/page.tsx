import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { STITEK_CENY, VELIKOSTI, kc } from '@/lib/cenik'
import { odkazAdministrace } from '@/lib/demo'
import { MATICE, UROVNE, najdiUroven } from '@/lib/urovne'

export const dynamicParams = false
export const generateStaticParams = () => UROVNE.map((u) => ({ uroven: u.klic }))

export async function generateMetadata({ params }: { params: Promise<{ uroven: string }> }): Promise<Metadata> {
  const u = najdiUroven((await params).uroven)
  if (!u) return {}
  return {
    title: `Úroveň ${u.nazev}: ${u.princip.toLowerCase()} – CodeKom`,
    description: `${u.popis} ${u.uzivatele}.`.slice(0, 155),
    alternates: { canonical: `/urovne/${u.klic}` },
  }
}

export default async function DetailUrovne({ params }: { params: Promise<{ uroven: string }> }) {
  const { uroven } = await params
  const i = UROVNE.findIndex((u) => u.klic === uroven)
  const u = UROVNE[i]
  if (!u) notFound()
  const vyssi = UROVNE[i + 1]
  const nizsi = UROVNE[i - 1]
  const admin = odkazAdministrace(u.klic)
  // Co přibude ve vyšší úrovni: řádky matice, kde se hodnota liší
  const navic = vyssi ? MATICE.filter((r) => r.hodnoty[i] !== r.hodnoty[i + 1]) : []

  return (
    <div className="obal pt-10">
      <nav aria-label="Drobečková navigace" className="text-[15px]">
        <Link href="/urovne" className="odkaz">
          Úrovně editoru
        </Link>
        <span className="mx-2 text-sediva" aria-hidden="true">
          /
        </span>
        <span aria-current="page">{u.nazev}</span>
      </nav>

      <div className="mt-6 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="stitek">Úroveň {i + 1} ze 3</p>
          <h1 className="mt-1 text-[34px] md:text-[52px]">{u.nazev}</h1>
          <p className="mt-2 text-[22px] text-sediva" style={{ fontFamily: 'var(--font-nadpis)' }}>
            „{u.princip}“
          </p>
          <p className="mt-6 max-w-[34em] text-[19px] text-[#333]">{u.popis}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {admin ? (
              <a href={admin} className="tlacitko" rel="noopener noreferrer">
                Vyzkoušet administraci {u.nazev}
              </a>
            ) : null}
            <Link href="/ukazky" className="tlacitko-obrys">
              Vybrat šablonu
            </Link>
          </div>
        </div>
        <aside aria-labelledby="cena" className="border-t border-black pt-6 lg:mt-10">
          <h2 id="cena" className="text-[20px]">
            Cena
          </h2>
          <dl className="mt-3">
            {VELIKOSTI.map((v, j) => (
              <div key={v.klic} className="flex justify-between gap-4 border-b border-linka py-3">
                <dt>{v.nazev}</dt>
                <dd className="font-medium">od {kc(u.ceny[j]!)}</dd>
              </div>
            ))}
          </dl>
          <p className="stitek mt-3">Měsíčně bez DPH. {STITEK_CENY}</p>
          <dl className="mt-6 grid gap-3 text-[16px]">
            <div>
              <dt className="text-sediva">Pro koho</dt>
              <dd>{u.proKoho}</dd>
            </div>
            <div>
              <dt className="text-sediva">Uživatelé</dt>
              <dd>{u.uzivatele}</dd>
            </div>
            <div>
              <dt className="text-sediva">Podpora</dt>
              <dd>{u.podpora}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <section aria-labelledby="co" className="mt-20">
        <h2 id="co" className="text-[28px] md:text-[36px]">
          Co v úrovni {u.nazev} uděláte
        </h2>
        <ol className="mt-8 grid gap-x-12 md:grid-cols-2">
          {u.coUdelate.map((t, j) => (
            <li key={t} className="grid grid-cols-[40px_1fr] gap-3 border-t border-linka py-4">
              <span className="text-[15px] text-sediva" aria-hidden="true">
                {String(j + 1).padStart(2, '0')}
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="obrazovky" className="na-tmave mt-20 bg-cerna px-6 py-12 text-white md:px-12">
        <h2 id="obrazovky" className="text-[28px]" style={{ color: '#fff' }}>
          Jak vypadá administrace
        </h2>
        <p className="mt-3 max-w-[40em] text-[#cfcfcf]">Tři obrazovky, na kterých je úroveň {u.nazev} nejlépe vidět. Všechny si můžete proklikat v ukázce bez přihlášení.</p>
        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {u.obrazovky.map((o) => (
            <li key={o.nazev} className="border-t border-[#444] pt-4">
              <h3 className="text-[20px]" style={{ color: '#fff' }}>
                {o.nazev}
              </h3>
              <p className="mt-2 text-[#e0e0e0]">{o.popis}</p>
            </li>
          ))}
        </ul>
        {admin ? (
          <a href={admin} className="tlacitko mt-10" rel="noopener noreferrer">
            Otevřít ukázku administrace
          </a>
        ) : null}
      </section>

      <section aria-labelledby="vse" className="mt-20">
        <h2 id="vse" className="text-[28px]">
          Co platí ve všech úrovních
        </h2>
        <ul className="mt-6 grid gap-x-12 md:grid-cols-2">
          {[
            'Úřední deska s archivem a záznamem o vyvěšení, který nejde smazat.',
            'Povinně zveřejňované informace, prohlášení o přístupnosti a GDPR.',
            'Kontrola přístupnosti před publikací, která chybu nepustí na web.',
            'Hlídání lhůt: rozpočet, závěrečný účet, sejmutí z desky.',
            'Aplikace pro občany s oznámeními a krizovými hlášeními.',
            'Přechod na vyšší úroveň kdykoli, obsah se zachová.',
          ].map((t) => (
            <li key={t} className="border-t border-linka py-4">
              {t}
            </li>
          ))}
        </ul>
      </section>

      {vyssi ? (
        <section aria-labelledby="navic" className="mt-20">
          <h2 id="navic" className="text-[28px]">
            Co přidá úroveň {vyssi.nazev}
          </h2>
          <div className="mt-6 overflow-x-auto" role="region" aria-label="Rozdíly úrovní, posuňte do strany" tabIndex={0}>
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                Rozdíly mezi úrovní {u.nazev} a {vyssi.nazev}
              </caption>
              <thead>
                <tr className="border-b border-black">
                  <th scope="col" className="py-3 pr-4 font-semibold">
                    Funkce
                  </th>
                  <th scope="col" className="py-3 pr-4 font-semibold">
                    {u.nazev}
                  </th>
                  <th scope="col" className="py-3 pr-4 font-semibold">
                    {vyssi.nazev}
                  </th>
                </tr>
              </thead>
              <tbody>
                {navic.map((r) => (
                  <tr key={r.funkce} className="border-b border-linka">
                    <th scope="row" className="py-3 pr-4 font-normal">
                      {r.funkce}
                    </th>
                    {[r.hodnoty[i]!, r.hodnoty[i + 1]!].map((h, k) => (
                      <td key={k} className="py-3 pr-4">
                        {h === true ? 'Ano' : h === false ? 'Ne' : h}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href={`/urovne/${vyssi.klic}`} className="odkaz mt-4 font-medium">
            Podrobně o úrovni {vyssi.nazev}
          </Link>
        </section>
      ) : null}

      <nav aria-label="Ostatní úrovně" className="mt-16 flex flex-wrap justify-between gap-4 border-t border-black pt-6">
        {nizsi ? (
          <Link href={`/urovne/${nizsi.klic}`} className="odkaz">
            Nižší úroveň: {nizsi.nazev}
          </Link>
        ) : (
          <span />
        )}
        <Link href="/urovne" className="odkaz">
          Porovnat všechny úrovně
        </Link>
      </nav>
    </div>
  )
}
