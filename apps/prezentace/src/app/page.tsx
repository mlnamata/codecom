import type { Metadata } from 'next'
import Link from 'next/link'
import { FotoAi } from '@/komponenty/FotoAi'
import { JsonLd } from '@/komponenty/JsonLd'
import { Snimek } from '@/komponenty/Snimek'
import { CENY_WEBU, STITEK_CENY, kc } from '@/lib/cenik'
import { odkazAplikace, odkazDema } from '@/lib/demo'
import { nactiStranku } from '@/lib/obsah'
import { organizaceJsonLd } from '@/lib/seo'
import { sablonyGalerie } from '@/lib/sablony'
import { UROVNE } from '@/lib/urovne'

const uvod = nactiStranku('uvod')

export const metadata: Metadata = {
  title: uvod.title,
  description: uvod.description,
  alternates: { canonical: '/' },
}

const NA_UVODU = ['naves', 'lipa', 'lupa', 'urad']

const ZISK = [
  ['Web podle jedné z 20 šablon', 'Každá šablona ve 3 barevných variantách. Obsah se píše do připravených míst, takže web vypadá dobře i bez grafika.'],
  ['Elektronická úřední deska', 'Sama sundá dokument po uplynutí lhůty a uchová záznam o vyvěšení. Vyvěšený dokument nejde smazat.'],
  ['Aplikace pro občany', 'Oznámení a krizová hlášení v mobilu. Vždy je vidět jen to nejzávažnější hlášení.'],
  ['Cena viditelně a férové podmínky', 'Výpověď kdykoli i bez udání důvodu, 30 dní zkušební doba s vrácením celé ceny a export dat zdarma.'],
]

const DUVODY = [
  ['Méně práce pro starostu a účetní', 'Základní úroveň editoru je navržená pro člověka, který má na web jednu až dvě hodiny týdně. Rozvržení nejde rozbít a lhůty hlídá systém.'],
  ['Úřední deska, na kterou se dá spolehnout', 'Každá změna se uloží jako nová verze. Po posledním dni vyvěšení dokument přejde do archivu, nebo z webu zmizí, je-li označený „Po sejmutí nezveřejňovat“.'],
  ['Přístupnost podle zákona a data v EU', 'Web stavíme podle WCAG 2.2 AA, zákon č. 99/2019 Sb. vyžaduje 2.1 AA. Editor nepustí do publikace změnu, která přístupnost rozbije. Data jsou v EU, AI asistent běží v ČR.'],
  ['Férové podmínky', 'Smlouvu můžete vypovědět kdykoli. Úřední deska běží i tehdy, když obec přestane platit.'],
]

const MODULY = [
  ['Web a úřední deska', 'Povinně zveřejňované informace ve struktuře podle vyhlášky č. 515/2020 Sb. a deska s evidencí vyvěšení a sejmutí.'],
  ['Aplikace pro občany', 'Oznámení a krizová hlášení v mobilu, vždy jen to nejzávažnější.'],
  ['Digitální úřad', 'Poplatky, rezervace sálu, hlášení závad a podání. Peníze jdou přímo na účet obce.'],
  ['Chytré budovy', 'Topení a zámky, které fungují i bez internetu.'],
  ['AI asistent', 'Odpovídá z dokumentů obce, cituje je a řekne, že je umělá inteligence.'],
]

export default function Uvod() {
  const sablony = sablonyGalerie()
  const vybrane = NA_UVODU.map((k) => sablony.find((s) => s.klic === k)!).filter(Boolean)
  const demo = odkazDema('naves', 0)
  const aplikace = odkazAplikace()

  return (
    <>
      <JsonLd data={organizaceJsonLd()} />
      {/* První obrazovka: pro koho to je a co obec získá */}
      <section className="obal grid items-center gap-12 pb-16 pt-12 md:pt-20 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="stitek mb-4">Pro obce do 2 000 obyvatel</p>
          <h1 className="text-[34px] md:text-[52px]">Web, úřední deska a aplikace pro vaši obec</h1>
          <p className="mt-6 max-w-[34em] text-[19px] text-[#333]">
            CodeKom je web pro obec s elektronickou úřední deskou, aplikací pro občany a hlášením obce do mobilu. Je pro starosty a účetní malých obcí, kteří nemají na správu webu celý den.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/ukazky" className="tlacitko">
              Prohlédnout 20 šablon
            </Link>
            {demo ? (
              <a href={demo} className="tlacitko-obrys" rel="noopener noreferrer">
                Prohlédnout živou ukázku Javoří Lhoty
              </a>
            ) : null}
            {aplikace ? (
              <a href={aplikace} className="tlacitko-obrys" rel="noopener noreferrer">
                Vyzkoušet aplikaci
              </a>
            ) : null}
          </div>
          <p className="mt-8 text-[15px] text-sediva">
            Od {kc(CENY_WEBU.zaklad[0])} měsíčně bez DPH. {STITEK_CENY}
          </p>
        </div>
        <FotoAi
          src="/foto/prezentace-starosta.webp"
          alt="Starosta u dřevěného stolu na obecním úřadě se dívá do tabletu."
          priorita
          pomer="aspect-[4/3]"
        />
      </section>

      {/* Šablony */}
      <section aria-labelledby="sablony" className="border-y border-linka bg-plocha py-16">
        <div className="obal">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-[40em]">
              <h2 id="sablony" className="text-[28px] md:text-[36px]">
                Podívejte se, jak bude web vypadat
              </h2>
              <p className="mt-3 text-sediva">Úvodní stránky čtyř ze 20 šablon na smyšlené obci Javoří Lhota se 684 obyvateli. Obsah je ve všech stejný, liší se rozvržení, písmo a barvy.</p>
            </div>
            <Link href="/ukazky" className="odkaz font-medium">
              Všech 20 šablon
            </Link>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vybrane.map((s, i) => (
              <li key={s.klic}>
                <Link href={`/ukazky/${s.klic}`} className="group block no-underline">
                  <Snimek src={s.palety[0]!.snimek} alt={`Úvodní stránka šablony ${s.nazev} pro obec Javoří Lhota, paleta ${s.palety[0]!.nazev}.`} priorita={i === 0} />
                  <span className="mt-3 block font-medium group-hover:underline" style={{ fontFamily: 'var(--font-nadpis)' }}>
                    {s.nazev}
                  </span>
                  <span className="block text-[15px] text-sediva">{s.proKoho}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Co obec získá */}
      <section aria-labelledby="ziska" className="obal py-20">
        <h2 id="ziska" className="max-w-[18em] text-[28px] md:text-[36px]">
          Co obec získá
        </h2>
        <ol className="mt-10 grid gap-x-12 md:grid-cols-2">
          {ZISK.map(([nadpis, text], i) => (
            <li key={nadpis} className="grid grid-cols-[48px_1fr] gap-4 border-t border-black py-6">
              <span className="text-[15px] font-medium text-sediva" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[20px]">{nadpis}</h3>
                <p className="mt-2 text-[#333]">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Úrovně */}
      <section aria-labelledby="urovne" className="na-tmave bg-cerna py-20 text-white">
        <div className="obal">
          <h2 id="urovne" className="text-[28px] text-white md:text-[36px]" style={{ color: '#fff' }}>
            Tři úrovně editoru, podle toho, kolik času máte
          </h2>
          <p className="mt-3 max-w-[40em] text-[#cfcfcf]">Úroveň určuje, co obec smí na webu měnit. Přístupnost ani povinné části webu nejde rozbít v žádné z nich. Na vyšší úroveň přejdete kdykoli a obsah zůstane.</p>
          <ul className="mt-12 grid md:grid-cols-3">
            {UROVNE.map((u) => (
              <li key={u.klic} className="flex flex-col border-t border-[#444] py-8 md:border-l md:border-t-0 md:px-8 md:first:border-l-0 md:first:pl-0">
                <h3 className="text-[24px]" style={{ color: '#fff' }}>
                  {u.nazev}
                </h3>
                <p className="mt-1 text-[#cfcfcf]">„{u.princip}“</p>
                <p className="mt-4 flex-1">{u.popis}</p>
                <p className="mt-6 text-[15px] text-[#cfcfcf]">{u.uzivatele}</p>
                <p className="mt-1 text-[22px] font-medium" style={{ fontFamily: 'var(--font-nadpis)' }}>
                  od {kc(u.ceny[0])} <span className="text-[15px] font-normal text-[#cfcfcf]">měsíčně bez DPH</span>
                </p>
                <Link href={`/urovne/${u.klic}`} className="odkaz mt-4 text-white">
                  Co umí úroveň {u.nazev}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[14px] text-[#cfcfcf]">{STITEK_CENY} Ceny platí pro obce do 500 obyvatel, další velikosti jsou v ceníku.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/urovne" className="tlacitko">
              Porovnat úrovně
            </Link>
            <Link href="/cenik" className="tlacitko-obrys">
              Spočítat cenu
            </Link>
          </div>
        </div>
      </section>

      {/* Důvody */}
      <section aria-labelledby="duvody" className="obal py-20">
        <h2 id="duvody" className="text-[28px] md:text-[36px]">
          Čtyři důvody, proč CodeKom
        </h2>
        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {DUVODY.map(([nadpis, text]) => (
            <div key={nadpis} className="border-t border-linka pt-6">
              <h3 className="text-[20px]">{nadpis}</h3>
              <p className="mt-2 text-[#333]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Moduly */}
      <section aria-labelledby="moduly" className="border-t border-linka bg-plocha py-20">
        <div className="obal grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 id="moduly" className="text-[28px] md:text-[36px]">
              Pět modulů v jednom systému
            </h2>
            <p className="mt-3 text-sediva">Místo několika dodavatelů jeden systém. Moduly přidáte, až je budete potřebovat.</p>
            <dl className="mt-8">
              {MODULY.map(([nazev, text]) => (
                <div key={nazev} className="grid gap-1 border-t border-linka py-4 sm:grid-cols-[200px_1fr] sm:gap-6">
                  <dt className="font-medium">{nazev}</dt>
                  <dd className="text-[#333]">{text}</dd>
                </div>
              ))}
            </dl>
            <Link href="/co-umime" className="odkaz mt-4 font-medium">
              Co umí jednotlivé moduly a co nedělají
            </Link>
          </div>
          <div className="grid content-start gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <FotoAi src="/foto/prezentace-zamek.webp" alt="Vstupní dveře obecní budovy se zámkem a klávesnicí na kód." pomer="aspect-[4/5]" />
            <FotoAi src="/foto/prezentace-topeni.webp" alt="Termostatická hlavice na radiátoru v obecním sále." pomer="aspect-[4/5]" />
          </div>
        </div>
      </section>

      {/* Výzva */}
      <section aria-labelledby="napiste" className="obal py-20">
        <div className="grid gap-8 border-t border-black pt-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 id="napiste" className="text-[28px] md:text-[36px]">
              Napište nám
            </h2>
            <p className="mt-4 max-w-[34em] text-[19px] text-[#333]">
              Napište, jak se obec jmenuje a co se vám na dnešním webu nelíbí. Odpovíme a pošleme nabídku, kterou můžete předložit radě.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end md:justify-end">
            <Link href="/kontakt" className="tlacitko">
              Kontakt a nabídka
            </Link>
            <Link href="/ke-stazeni" className="odkaz">
              Podklady pro radu ke stažení
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
