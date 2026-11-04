import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FotoAi } from '@/komponenty/FotoAi'
import { JsonLd } from '@/komponenty/JsonLd'
import { Odhaleni } from '@/komponenty/Odhaleni'
import { Snimek } from '@/komponenty/Snimek'
import { CENY_WEBU, STITEK_CENY, kc } from '@/lib/cenik'
import { odkazAplikace, odkazDema } from '@/lib/demo'
import { nactiStranku } from '@/lib/obsah'
import { sablonyGalerie } from '@/lib/sablony'
import { organizaceJsonLd } from '@/lib/seo'
import { UROVNE } from '@/lib/urovne'

const uvod = nactiStranku('uvod')

export const metadata: Metadata = {
  title: uvod.title,
  description: uvod.description,
  alternates: { canonical: '/' },
}

const AI = 'Ilustrační fotografie vytvořená umělou inteligencí'

/** Fotky z design/obrazky/foto a jejich popisy (podle zadání v design/obrazky/prompty.txt). */
const FOTO = {
  naves: { src: '/foto/sablona-01-naves.webp', alt: 'Náves vesnice v podhůří Šumavy s barokním kostelem, starou lípou a roubenými domy.' },
  starosta: { src: '/foto/prezentace-starosta.webp', alt: 'Starosta u dřevěného stolu na obecním úřadě se dívá do tabletu.' },
  urad: { src: '/foto/sablona-20-urad.webp', alt: 'Upravená přepážka malého obecního úřadu se stojanem na formuláře a květinami.' },
  radnice: { src: '/foto/sablona-11-radnice.webp', alt: 'Budova obecního úřadu s omítnutou fasádou, červenou střechou a českou vlajkou.' },
  zpravodaj: { src: '/foto/sablona-18-zpravodaj.webp', alt: 'Hromádka vytištěných obecních zpravodajů a šálek kávy na dřevěném stole u okna.' },
  zamek: { src: '/foto/prezentace-zamek.webp', alt: 'Vstupní dveře obecní budovy se zámkem a klávesnicí na kód.' },
  topeni: { src: '/foto/prezentace-topeni.webp', alt: 'Termostatická hlavice na radiátoru v obecním sále.' },
  mikroregion: { src: '/foto/sablona-19-mikroregion.webp', alt: 'Široké údolí v podhůří Šumavy se čtyřmi vesničkami spojenými silničkami, podzim.' },
}

const NA_UVODU = ['naves', 'lipa', 'lupa', 'urad']

const ZISK = [
  ['Web podle jedné z 20 šablon', 'Každá šablona ve 3 barevných variantách. Obsah se píše do připravených míst, takže web vypadá dobře i bez grafika.'],
  ['Elektronická úřední deska', 'Sama sundá dokument po uplynutí lhůty a uchová záznam o vyvěšení. Vyvěšený dokument nejde smazat.'],
  ['Aplikace pro občany', 'Oznámení a krizová hlášení v mobilu. Vždy je vidět jen to nejzávažnější hlášení.'],
  ['Cena viditelně a férové podmínky', 'Výpověď kdykoli i bez udání důvodu, 30 dní zkušební doba s vrácením celé ceny a export dat zdarma.'],
]

const DUVODY = [
  { rubrika: 'Čas', nadpis: 'Méně práce pro starostu a účetní', text: 'Základní úroveň editoru je navržená pro člověka, který má na web jednu až dvě hodiny týdně. Články, akce a dokumenty se píší do pevných míst šablony, rozvržení nejde rozbít. Lhůty hlídá systém.', foto: FOTO.starosta },
  { rubrika: 'Právní jistota', nadpis: 'Úřední deska, na kterou se dá spolehnout', text: 'Dokument, který už na desce visel, nejde smazat. Každá změna se uloží jako nová verze. Po posledním dni vyvěšení dokument přejde do archivu, nebo z webu zmizí, je-li označený „Po sejmutí nezveřejňovat“.', foto: FOTO.urad },
  { rubrika: 'Zákon a data', nadpis: 'Přístupnost podle zákona a data v EU', text: 'Web stavíme podle WCAG 2.2 AA, zákon o přístupnosti (č. 99/2019 Sb.) vyžaduje úroveň 2.1 AA. Editor nepustí do publikace změnu, která přístupnost rozbije. Data jsou v EU a AI asistent běží na serveru v ČR.', foto: FOTO.radnice },
  { rubrika: 'Podmínky', nadpis: 'Férové podmínky', text: 'Obec může smlouvu vypovědět kdykoli i bez udání důvodu. Prvních 30 dní je zkušební doba s vrácením celé ceny. Export dat je zdarma. Úřední deska běží i tehdy, když obec přestane platit.', foto: FOTO.zpravodaj },
]

const MODULY = [
  ['Web a úřední deska', 'Povinně zveřejňované informace ve struktuře podle vyhlášky č. 515/2020 Sb. a deska s evidencí vyvěšení a sejmutí.'],
  ['Aplikace pro občany', 'Oznámení a krizová hlášení v mobilu, vždy jen to nejzávažnější.'],
  ['Digitální úřad', 'Poplatky, rezervace sálu, hlášení závad a podání. Peníze jdou přímo na účet obce.'],
  ['Chytré budovy', 'Topení a zámky, které fungují i bez internetu.'],
  ['AI asistent', 'Odpovídá z dokumentů obce, cituje je a řekne, že je umělá inteligence.'],
]

/** Fotka přes celou plochu s povinnou poznámkou o umělé inteligenci ve skleněném štítku. */
function FotoPozadi({ foto, priorita = false, ztmaveni }: { foto: { src: string; alt: string }; priorita?: boolean; ztmaveni: string }) {
  return (
    <figure className="absolute inset-0 -z-10 m-0">
      <Image src={foto.src} alt={foto.alt} fill priority={priorita} sizes="100vw" className="object-cover" />
      <div className={`absolute inset-0 ${ztmaveni}`} aria-hidden="true" />
      <figcaption className="sklo-tmave absolute bottom-4 right-4 rounded-full px-3 py-1 text-[13px] text-white/90">{AI}</figcaption>
    </figure>
  )
}

export default function Uvod() {
  const sablony = sablonyGalerie()
  const vybrane = NA_UVODU.map((k) => sablony.find((s) => s.klic === k)!).filter(Boolean)
  const demo = odkazDema('naves', 0)
  const aplikace = odkazAplikace()

  return (
    <>
      <JsonLd data={organizaceJsonLd()} />

      {/* Úvod přes celou obrazovku */}
      <section className="na-tmave relative isolate flex min-h-[calc(100svh-72px)] items-end overflow-hidden bg-noc">
        <FotoPozadi foto={FOTO.naves} priorita ztmaveni="bg-[linear-gradient(90deg,rgba(7,8,12,0.94)_0%,rgba(7,8,12,0.78)_45%,rgba(7,8,12,0.25)_100%)]" />
        <div className="obal w-full pb-16 pt-24 md:pb-24">
          <p className="rubrika">Pro obce do 2 000 obyvatel</p>
          <div>
            <h1 className="mt-5 max-w-[14ch] text-[48px] font-extrabold md:text-[88px] lg:text-[104px]">
              Web, úřední deska a aplikace <span className="text-gradient">pro vaši obec</span>
            </h1>
          </div>
          <div>
            <p className="mt-6 max-w-[36em] text-[19px] text-white/85 md:text-[21px]">
              CodeKom je web pro obec s elektronickou úřední deskou, aplikací pro občany a hlášením obce do mobilu. Pro starosty a účetní malých obcí, kteří nemají na správu webu celý den.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/ukazky" className="tlacitko w-full sm:w-auto">
              Prohlédnout 20 šablon
            </Link>
            {demo ? (
              <a href={demo} className="tlacitko-obrys w-full sm:w-auto" rel="noopener noreferrer">
                Prohlédnout živou ukázku Javoří Lhoty
              </a>
            ) : null}
            {aplikace ? (
              <a href={aplikace} className="tlacitko-obrys w-full sm:w-auto" rel="noopener noreferrer">
                Vyzkoušet aplikaci
              </a>
            ) : null}
          </div>
          <div className="mt-14 grid max-w-[880px] gap-3 sm:grid-cols-3">
            {[
              [`od ${kc(CENY_WEBU.zaklad[0])}`, 'měsíčně bez DPH, orientačně'],
              ['20 šablon', 'každá ve 3 barevných variantách'],
              ['Výpověď kdykoli', 'a 30 dní zkušební doba'],
            ].map(([velke, male]) => (
              <div key={velke} className="sklo rounded-2xl px-5 py-4">
                <p className="text-[24px] font-bold tracking-tight">{velke}</p>
                <p className="text-[15px] text-white/75">{male}</p>
              </div>
            ))}
          </div>
          <p className="stitek mt-3">{STITEK_CENY}</p>
        </div>
      </section>

      {/* Šablony */}
      <section aria-labelledby="sablony" className="na-tmave zare relative bg-noc py-24">
        <p className="slovo-pozadi top-6 text-[180px] md:text-[260px]" aria-hidden="true">
          Šablony
        </p>
        <div className="obal">
          <Odhaleni className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[40em]">
              <p className="rubrika">20 šablon, 60 variant</p>
              <h2 id="sablony" className="mt-3 text-[40px] md:text-[60px]">
                Podívejte se, jak bude web vypadat
              </h2>
              <p className="mt-4 text-[18px] text-white/75">Úvodní stránky čtyř ze 20 šablon na smyšlené obci Javoří Lhota se 684 obyvateli. Obsah je ve všech stejný, liší se rozvržení, písmo a barvy.</p>
            </div>
            <Link href="/ukazky" className="tlacitko-obrys">
              Všech 20 šablon
            </Link>
          </Odhaleni>
          <ul className="-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
            {vybrane.map((s, i) => (
              <Odhaleni as="li" key={s.klic} zpozdeni={i * 90} className="w-[80%] shrink-0 snap-start sm:w-auto">
                <Link href={`/ukazky/${s.klic}`} className="sklo group block rounded-3xl p-2 no-underline transition-transform duration-300 hover:-translate-y-1">
                  <Snimek src={s.palety[0]!.snimek} alt={`Úvodní stránka šablony ${s.nazev} pro obec Javoří Lhota, paleta ${s.palety[0]!.nazev}.`} sizes="(min-width: 1240px) 290px, 50vw" />
                  <span className="block px-3 pb-3 pt-4">
                    <span className="block text-[13px] font-semibold text-akcent">Šablona {s.cislo}</span>
                    <span className="block text-[22px] font-bold tracking-tight">{s.nazev}</span>
                    <span className="block text-[15px] text-white/70">{s.proKoho}</span>
                  </span>
                </Link>
              </Odhaleni>
            ))}
          </ul>
        </div>
      </section>

      {/* Co obec získá, bento */}
      <section aria-labelledby="ziska" className="bg-plocha py-24">
        <div className="obal">
          <Odhaleni>
            <p className="rubrika">Co obec získá</p>
            <h2 id="ziska" className="mt-3 max-w-[16ch] text-[40px] md:text-[60px]">
              Všechno, co obec na webu potřebuje
            </h2>
          </Odhaleni>
          <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            <Odhaleni className="relative isolate min-h-[360px] overflow-hidden rounded-3xl lg:row-span-2">
              <figure className="absolute inset-0 -z-10 m-0">
                <Image src={FOTO.starosta.src} alt={FOTO.starosta.alt} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,12,0)_30%,rgba(7,8,12,0.88)_100%)]" aria-hidden="true" />
                <figcaption className="sklo-tmave absolute right-3 top-3 rounded-full px-3 py-1 text-[13px] text-white/90">{AI}</figcaption>
              </figure>
              <div className="na-tmave absolute inset-x-0 bottom-0 p-7">
                <p className="text-[56px] font-extrabold leading-none">1–2 h</p>
                <p className="mt-2 text-[18px] text-white/85">týdně, pro tolik času je navržená úroveň Základ</p>
              </div>
            </Odhaleni>
            {ZISK.map(([nadpis, text], i) => (
              <Odhaleni key={nadpis} zpozdeni={i * 80} className="sklo-svetle rounded-3xl p-7">
                <span className="text-[15px] font-bold text-akcent-tmavy">0{i + 1}</span>
                <h3 className="mt-3 text-[24px] tracking-tight">{nadpis}</h3>
                <p className="mt-2 text-[16px] text-sediva">{text}</p>
              </Odhaleni>
            ))}
          </div>
        </div>
      </section>

      {/* Úrovně */}
      <section aria-labelledby="urovne" className="na-tmave zare relative bg-noc py-24">
        <p className="slovo-pozadi bottom-4 text-right text-[180px] md:text-[260px]" aria-hidden="true">
          Úrovně
        </p>
        <div className="obal">
          <Odhaleni className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[40em]">
              <p className="rubrika">Editor ve třech úrovních</p>
              <h2 id="urovne" className="mt-3 text-[40px] md:text-[60px]">
                Podle toho, kolik času máte
              </h2>
              <p className="mt-4 text-[18px] text-white/75">Úroveň určuje, co obec smí na webu měnit. Přístupnost ani povinné části webu nejde rozbít v žádné z nich. Na vyšší úroveň přejdete kdykoli a obsah zůstane.</p>
            </div>
            <Link href="/urovne" className="tlacitko-obrys">
              Porovnat úrovně
            </Link>
          </Odhaleni>
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {UROVNE.map((u, i) => (
              <Odhaleni as="li" key={u.klic} zpozdeni={i * 100} className={`sklo flex flex-col rounded-3xl p-8 ${i === 1 ? 'border-akcent/50 md:-translate-y-4' : ''}`}>
                <p className="text-[14px] font-semibold text-akcent">{u.uzivatele}</p>
                <h3 className="mt-2 text-[40px] font-extrabold">{u.nazev}</h3>
                <p className="mt-1 text-[19px] text-white/80">„{u.princip}“</p>
                <p className="mt-5 flex-1 text-white/75">{u.popis}</p>
                <p className="mt-8 text-[34px] font-bold tracking-tight">
                  od {kc(u.ceny[0])}
                  <span className="block text-[14px] font-normal text-white/70">měsíčně bez DPH, obec do 500 obyvatel</span>
                </p>
                <Link href={`/urovne/${u.klic}`} className={`${i === 1 ? 'tlacitko' : 'tlacitko-obrys'} mt-6`}>
                  Co umí úroveň {u.nazev}
                </Link>
              </Odhaleni>
            ))}
          </ul>
          <p className="stitek mt-6">{STITEK_CENY} Další velikosti obcí jsou v ceníku.</p>
        </div>
      </section>

      {/* Čtyři důvody */}
      <section aria-labelledby="duvody" className="py-24">
        <div className="obal">
          <Odhaleni>
            <p className="rubrika">Proč CodeKom</p>
            <h2 id="duvody" className="mt-3 text-[40px] md:text-[60px]">
              Čtyři důvody
            </h2>
          </Odhaleni>
          <div className="mt-14 grid gap-20">
            {DUVODY.map((d, i) => (
              <Odhaleni key={d.nadpis} className="grid items-center gap-10 md:grid-cols-2">
                <FotoAi src={d.foto.src} alt={d.foto.alt} pomer="aspect-[4/3]" className={i % 2 ? 'md:order-2' : undefined} />
                <div>
                  <p className="rubrika">
                    <span className="text-[40px] font-extrabold leading-none tracking-tight text-cerna">0{i + 1}</span> {d.rubrika}
                  </p>
                  <h3 className="mt-4 text-[32px] md:text-[44px]">{d.nadpis}</h3>
                  <p className="mt-4 text-[18px] text-sediva">{d.text}</p>
                </div>
              </Odhaleni>
            ))}
          </div>
        </div>
      </section>

      {/* Moduly, bento s fotkami */}
      <section aria-labelledby="moduly" className="bg-plocha py-24">
        <div className="obal">
          <Odhaleni className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="rubrika">Jeden systém</p>
              <h2 id="moduly" className="mt-3 text-[40px] md:text-[60px]">
                Pět modulů
              </h2>
              <p className="mt-4 max-w-[36em] text-[18px] text-sediva">Místo několika dodavatelů jeden systém. Moduly přidáte, až je budete potřebovat.</p>
            </div>
            <Link href="/co-umime" className="tlacitko-obrys">
              Co umí a co nedělají
            </Link>
          </Odhaleni>
          <div className="mt-12 grid gap-4 md:grid-cols-6">
            {MODULY.map(([nazev, text], i) => (
              <Odhaleni key={nazev} zpozdeni={i * 70} className={`sklo-svetle rounded-3xl p-7 ${i < 2 ? 'md:col-span-3' : 'md:col-span-2'}`}>
                <span className="text-[15px] font-bold text-akcent-tmavy">0{i + 1}</span>
                <h3 className="mt-3 text-[24px] tracking-tight">{nazev}</h3>
                <p className="mt-2 text-[16px] text-sediva">{text}</p>
              </Odhaleni>
            ))}
            <Odhaleni className="md:col-span-3">
              <FotoAi src={FOTO.zamek.src} alt={FOTO.zamek.alt} pomer="aspect-[16/10]" />
            </Odhaleni>
            <Odhaleni className="md:col-span-3" zpozdeni={100}>
              <FotoAi src={FOTO.topeni.src} alt={FOTO.topeni.alt} pomer="aspect-[16/10]" />
            </Odhaleni>
          </div>
        </div>
      </section>

      {/* Výzva */}
      <section aria-labelledby="napiste" className="obal py-24">
        <div className="na-tmave relative isolate overflow-hidden rounded-[32px] px-6 py-16 md:px-16 md:py-24">
          <FotoPozadi foto={FOTO.mikroregion} ztmaveni="bg-[rgba(7,8,12,0.72)]" />
          <Odhaleni className="sklo max-w-[640px] rounded-3xl p-8 md:p-10">
            <h2 id="napiste" className="text-[40px] md:text-[56px]">
              Napište nám
            </h2>
            <p className="mt-4 text-[18px] text-white/85">Napište, jak se obec jmenuje a co se vám na dnešním webu nelíbí. Odpovíme a pošleme nabídku, kterou můžete předložit radě.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/kontakt" className="tlacitko">
                Kontakt a nabídka
              </Link>
              <Link href="/ke-stazeni" className="tlacitko-obrys">
                Podklady pro radu
              </Link>
            </div>
          </Odhaleni>
        </div>
      </section>
    </>
  )
}
