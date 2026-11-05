import { demoTed, prazskyOkamzik } from '@codekom/demo-data'
import { aktivniHlaseni, pragueDayKey, stavDokumentu, UROVNE as UROVNE_KRIZE } from '@codekom/typy/pravidla'
import type { ReactNode } from 'react'
import { uloziste } from '@/lib/data/demo-pamet'
import { NAZEV_UROVNE, staci } from '@/ukazka/uroven'
import { urovenAdministrace } from '@/ukazka/uroven-server'
import { FRONTA } from './schvalovani/fronta'

export const dynamic = 'force-dynamic'

/*
 * Přehled administrace: co dnes čeká na vyřízení, pár čísel, jeden graf a poslední aktivita.
 * Všechno se počítá z dat ukázky v paměti serveru (obsah/javori-lhota a změny provedené v ukázce),
 * nic se nevymýšlí. Platby občanů ukázka neeviduje, proto na přehledu nejsou.
 */

const Z = '/ukazka/administrace'
const DEN_MS = 86_400_000
const TYDNU = 8
/** Kolik dní předem upozornit, že dokumentu končí vyvěšení. */
const BRZY_KONCI_DNI = 7

const den = (d: string) => Date.UTC(Number(d.slice(0, 4)), Number(d.slice(5, 7)) - 1, Number(d.slice(8, 10)))
/** Kolik dní je mezi dnem `d` a dneškem (0 = dnes, záporné = v budoucnu). */
const dniZpet = (d: string, dnes: string) => Math.round((den(dnes) - den(d)) / DEN_MS)
const posun = (dnes: string, o: number) => new Date(den(dnes) - o * DEN_MS).toISOString().slice(0, 10)

const datum = new Intl.DateTimeFormat('cs-CZ', { timeZone: 'Europe/Prague', day: 'numeric', month: 'numeric' })
const cas = new Intl.DateTimeFormat('cs-CZ', { timeZone: 'Europe/Prague', hour: 'numeric', minute: '2-digit' })
const plneDatum = new Intl.DateTimeFormat('cs-CZ', { timeZone: 'Europe/Prague', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
const kratkyDen = (d: string) => datum.format(prazskyOkamzik(d))

/** České tvary podle počtu: 1 dokument, 2 dokumenty, 5 dokumentů. */
const tvar = (n: number, jeden: string, dva: string, pet: string) => (n === 1 ? jeden : n >= 2 && n <= 4 ? dva : pet)

/** Absolutní změna slovy, bez procent: „o 2 víc než před týdnem“. */
function rozdil(ted: number, pred: number, oCem: string): string {
  if (ted === pred) return `stejně jako ${oCem}`
  return `o ${Math.abs(ted - pred)} ${ted > pred ? 'víc' : 'méně'} než ${oCem}`
}

function Oddil({ nadpis, id, popis, children }: { nadpis: string; id: string; popis?: string; children: ReactNode }) {
  return (
    <section className="oddil" aria-labelledby={id}>
      <div className="oddil__hlava">
        <h2 id={id}>{nadpis}</h2>
        {popis ? <p>{popis}</p> : null}
      </div>
      {children}
    </section>
  )
}

interface Ukol {
  pocet: number
  nazev: string
  popis: string
  odkaz: { text: string; href: string } | null
}

/**
 * Čárový graf jedné řady po dnech, bez výplně. Osy a popisky jsou v HTML, aby zůstaly čitelné
 * při roztažení SVG. Čtečkám graf shrne aria-label a data jsou v tabulce pod ním.
 */
function CarovyGraf({ dny, hodnoty, popis }: { dny: string[]; hodnoty: number[]; popis: string }) {
  const krok = Math.max(1, Math.ceil(Math.max(1, ...hodnoty) / 4))
  const max = krok * 4
  const n = hodnoty.length
  const x = (i: number) => (i / (n - 1)) * 600
  const y = (h: number) => 180 - (h / max) * 180
  // Počet visících dokumentů se mění skokem, proto schodová čára.
  const cara = hodnoty.map((h, i) => (i ? `H${x(i).toFixed(1)} V${y(h).toFixed(1)}` : `M0,${y(h).toFixed(1)}`)).join(' ')
  const popisky = dny.map((d, i) => ({ d, i })).filter(({ i }) => i % 7 === 0)
  return (
    <div className="graf-obal">
      <div className="graf-obal__osa-y" aria-hidden="true">
        {[4, 3, 2, 1, 0].map((k) => (
          <span key={k}>{k * krok}</span>
        ))}
      </div>
      <div className="graf-obal__plocha">
        <svg className="graf" viewBox="0 0 600 180" preserveAspectRatio="none" role="img" aria-label={popis}>
          {[0, 1, 2, 3].map((k) => (
            <line key={k} className="graf__mrizka" x1="0" x2="600" y1={k * 45} y2={k * 45} vectorEffect="non-scaling-stroke" />
          ))}
          <path d={cara} className="graf__cara" vectorEffect="non-scaling-stroke" />
          {hodnoty.map((h, i) => (
            <rect key={i} className="graf__zasah" x={Math.max(0, x(i) - 300 / (n - 1))} width={600 / (n - 1)} y="0" height="180">
              <title>{`${kratkyDen(dny[i] ?? '')}: ${h}`}</title>
            </rect>
          ))}
        </svg>
        <div className="graf-obal__osa-x" aria-hidden="true">
          {popisky.map(({ d, i }) => (
            <span key={d} style={{ left: `${(i / (n - 1)) * 100}%` }}>
              {kratkyDen(d)}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

type Stav = 'dobre' | 'pozor' | 'spatne' | 'neutralni'
interface Udalost {
  kdy: Date
  jenDen: boolean
  druh: 'deska' | 'zavada' | 'rezervace' | 'aktualita' | 'krize'
  nazev: string
  popis: string
  href: string | null
  stav: string
  tridaStavu: Stav
}

export default async function Prehled() {
  const u = uloziste()
  const ted = demoTed()
  const dnes = pragueDayKey(ted)
  const uroven = await urovenAdministrace()

  // Úřední deska
  const visi = u.dokumenty.filter((d) => stavDokumentu(d.vyvesenoOd, d.vyvesenoDo, dnes) === 'visi')
  const dnyGrafu = Array.from({ length: TYDNU * 7 }, (_, i) => posun(dnes, TYDNU * 7 - 1 - i))
  const naDesce = dnyGrafu.map((d) => u.dokumenty.filter((x) => stavDokumentu(x.vyvesenoOd, x.vyvesenoDo, d) === 'visi').length)
  const predTydnem = naDesce[naDesce.length - 8] ?? 0
  const brzyKonci = visi
    .filter((d): d is typeof d & { vyvesenoDo: string } => d.vyvesenoDo !== null && -dniZpet(d.vyvesenoDo, dnes) <= BRZY_KONCI_DNI)
    .sort((a, b) => a.vyvesenoDo.localeCompare(b.vyvesenoDo))

  // Hlášení závad
  const otevrene = u.zavady.filter((z) => z.stav === 'nove' || z.stav === 'prijato' || z.stav === 'v_reseni')
  const nove = u.zavady.filter((z) => z.stav === 'nove').sort((a, b) => a.vytvoreno.localeCompare(b.vytvoreno))
  const nazevStavu = (s: string) => u.stavyZavad.find((x) => x.id === s)?.nazev ?? s
  const nazevKategorie = (k: string) => u.kategorieZavad.find((x) => x.id === k)?.nazev ?? k

  // Rezervace prostor
  const nadchazejici = u.rezervace.filter((r) => r.stav === 'schvaleno' && r.den >= dnes).length
  const cekajiciRezervace = u.rezervace.filter((r) => r.stav === 'ceka').sort((a, b) => a.den.localeCompare(b.den))
  const nazevProstoru = (id: string) => u.prostory.find((p) => p.id === id || p.slug === id)?.nazev ?? id

  // Aktuality
  const publikovane = u.aktuality.map((a) => pragueDayKey(new Date(a.publikovano))).filter((d) => d <= dnes)
  const za30 = publikovane.filter((d) => dniZpet(d, dnes) < 30).length
  const predchozich30 = publikovane.filter((d) => dniZpet(d, dnes) >= 30 && dniZpet(d, dnes) < 60).length

  // Příspěvky ke schválení (od úrovně Pokročilý)
  const kSchvaleni = FRONTA.filter((p) => p.stav === 'ceka')

  // Krizová hlášení: na přehledu jen to nejzávažnější, úroveň slovem
  const krize = aktivniHlaseni(
    u.krize.filter((h) => h.stav === 'vydano'),
    ted,
  )[0]

  const prvniNova = nove[0]
  const prvniRezervace = cekajiciRezervace[0]
  const prvniKonci = brzyKonci[0]
  const ukoly: Ukol[] = [
    {
      pocet: nove.length,
      nazev: `${tvar(nove.length, 'Nové hlášení', 'Nová hlášení', 'Nových hlášení')} závad k převzetí`,
      popis: prvniNova ? `Nejstarší: ${nazevKategorie(prvniNova.kategorie)}, ${prvniNova.misto}, nahlášeno ${datum.format(new Date(prvniNova.vytvoreno))}` : 'Všechna hlášení jsou převzatá',
      odkaz: { text: 'Hlášení závad', href: `${Z}/zavady` },
    },
    {
      pocet: cekajiciRezervace.length,
      nazev: `${tvar(cekajiciRezervace.length, 'Žádost', 'Žádosti', 'Žádostí')} o rezervaci prostoru`,
      popis: prvniRezervace ? `Nejbližší: ${nazevProstoru(prvniRezervace.prostor)}, ${kratkyDen(prvniRezervace.den)}` : 'Žádná žádost nečeká',
      // Obrazovka rezervací v ukázce administrace zatím není.
      odkaz: null,
    },
    ...(staci(uroven, 'pokrocily')
      ? [
          {
            pocet: kSchvaleni.length,
            nazev: `${tvar(kSchvaleni.length, 'Příspěvek', 'Příspěvky', 'Příspěvků')} ke schválení`,
            popis: kSchvaleni.length ? kSchvaleni.map((p) => p.nazev).join(', ') : 'Nic nečeká na schválení',
            odkaz: { text: 'Ke schválení', href: `${Z}/schvalovani` },
          },
        ]
      : []),
    {
      pocet: brzyKonci.length,
      nazev: `${tvar(brzyKonci.length, 'Dokumentu', 'Dokumentům', 'Dokumentům')} do ${BRZY_KONCI_DNI} dní končí vyvěšení`,
      popis: prvniKonci ? `Nejdřív: ${prvniKonci.nazev}, visí do ${kratkyDen(prvniKonci.vyvesenoDo)}` : `Žádnému dokumentu nekončí vyvěšení v příštích ${BRZY_KONCI_DNI} dnech`,
      odkaz: { text: 'Úřední deska', href: `${Z}/deska` },
    },
  ]

  const tydny = Array.from({ length: TYDNU }, (_, i) => posun(dnes, (TYDNU - i) * 7 - 1))

  const skupinyZavad = [
    { nazev: 'Nová', pocet: nove.length, barva: 'var(--a-zluta)' },
    { nazev: 'Přijatá a v řešení', pocet: u.zavady.filter((z) => z.stav === 'prijato' || z.stav === 'v_reseni').length, barva: 'var(--a-graf-2)' },
    { nazev: 'Vyřízená a zamítnutá', pocet: u.zavady.filter((z) => z.stav === 'vyrizeno' || z.stav === 'zamitnuto').length, barva: 'var(--a-zelena)' },
  ]
  const celkemZavad = skupinyZavad.reduce((s, c) => s + c.pocet, 0)

  const udalosti: Udalost[] = [
    ...u.dokumenty
      .filter((d) => d.vyvesenoOd <= dnes)
      .map((d): Udalost => {
        const s = stavDokumentu(d.vyvesenoOd, d.vyvesenoDo, dnes)
        return { kdy: prazskyOkamzik(d.vyvesenoOd, '00:00'), jenDen: true, druh: 'deska', nazev: d.nazev, popis: 'Vyvěšeno na úřední desku', href: `${Z}/deska`, stav: s === 'visi' ? 'Visí' : 'Sejmuto', tridaStavu: 'neutralni' }
      }),
    ...u.zavady.map(
      (z): Udalost => ({
        kdy: new Date(z.vytvoreno),
        jenDen: false,
        druh: 'zavada',
        nazev: `${nazevKategorie(z.kategorie)}, ${z.misto}`,
        popis: `Hlášení závady ${z.cislo}`,
        href: `${Z}/zavady`,
        stav: nazevStavu(z.stav),
        tridaStavu: z.stav === 'nove' ? 'pozor' : z.stav === 'vyrizeno' ? 'dobre' : 'neutralni',
      }),
    ),
    ...u.rezervace.map(
      (r): Udalost => ({
        kdy: new Date(r.vytvoreno),
        jenDen: false,
        druh: 'rezervace',
        nazev: `${nazevProstoru(r.prostor)}, ${kratkyDen(r.den)}`,
        popis: 'Žádost o rezervaci prostoru',
        href: null,
        stav: r.stav === 'ceka' ? 'Čeká' : r.stav === 'schvaleno' ? 'Schváleno' : 'Zamítnuto',
        tridaStavu: r.stav === 'ceka' ? 'pozor' : r.stav === 'schvaleno' ? 'dobre' : 'neutralni',
      }),
    ),
    ...u.aktuality.map(
      (a): Udalost => ({ kdy: new Date(a.publikovano), jenDen: false, druh: 'aktualita', nazev: a.titulek, popis: 'Aktualita na webu', href: `${Z}/aktuality`, stav: 'Zveřejněno', tridaStavu: 'neutralni' }),
    ),
    ...u.krize
      .filter((h) => h.stav === 'vydano')
      .map(
        (h): Udalost => ({
          kdy: new Date(h.platiOd),
          jenDen: false,
          druh: 'krize',
          nazev: h.titulek,
          popis: 'Krizové hlášení',
          href: `${Z}/krize`,
          stav: UROVNE_KRIZE[h.uroven].nazev,
          tridaStavu: h.uroven === 'emergency' ? 'spatne' : h.uroven === 'warning' ? 'pozor' : 'neutralni',
        }),
      ),
  ]
    .filter((x) => x.kdy.getTime() <= ted.getTime())
    .sort((a, b) => b.kdy.getTime() - a.kdy.getTime())
    .slice(0, 8)

  const kdyText = (x: Udalost) => {
    const d = pragueDayKey(x.kdy)
    const z = dniZpet(d, dnes)
    const denText = z === 0 ? 'dnes' : z === 1 ? 'včera' : datum.format(x.kdy)
    return x.jenDen ? denText : `${denText} ${cas.format(x.kdy)}`
  }

  return (
    <>
      <div className="prehled-hlava">
        <h1>Přehled</h1>
        <p>Obec Javoří Lhota, {plneDatum.format(ted)}</p>
      </div>

      {krize ? (
        <p className="prehled-krize">
          <span>
            Platí krizové hlášení, úroveň <strong>{UROVNE_KRIZE[krize.uroven].nazev}</strong>: {krize.titulek}
          </span>
          <a href={`${Z}/krize`}>Krizová hlášení</a>
        </p>
      ) : null}

      <Oddil nadpis="K vyřízení" id="k-vyrizeni" popis={`Úroveň editoru ${NAZEV_UROVNE[uroven]}`}>
        <ul className="vyrizeni">
          {ukoly.map((k) => (
            <li key={k.nazev} className={k.pocet === 0 ? 'je-nula' : undefined}>
              <span className="vyrizeni__pocet">{k.pocet}</span>
              <span className="vyrizeni__text">
                <strong>{k.nazev}</strong>
                <span>{k.popis}</span>
              </span>
              {k.odkaz ? (
                <a href={k.odkaz.href}>
                  {k.odkaz.text}
                  <span className="sr-only">: {k.nazev.toLowerCase()}</span>
                </a>
              ) : (
                <span className="vyrizeni__chybi">[DOPLNIT: obrazovka rezervací]</span>
              )}
            </li>
          ))}
        </ul>

        <h2 className="sr-only">Hlavní čísla</h2>
        <dl className="souhrn">
          <div>
            <dt>Visí na úřední desce</dt>
            <dd>
              <span className="souhrn__cislo">{visi.length}</span>
              <span className="souhrn__pozn">{rozdil(visi.length, predTydnem, 'před týdnem')}</span>
            </dd>
          </div>
          <div>
            <dt>Otevřená hlášení závad</dt>
            <dd>
              <span className="souhrn__cislo">{otevrene.length}</span>
              <span className="souhrn__pozn">
                z toho {nove.length} {tvar(nove.length, 'nové', 'nová', 'nových')}
              </span>
            </dd>
          </div>
          <div>
            <dt>Nadcházející rezervace</dt>
            <dd>
              <span className="souhrn__cislo">{nadchazejici}</span>
              <span className="souhrn__pozn">
                {cekajiciRezervace.length ? `${cekajiciRezervace.length} ${tvar(cekajiciRezervace.length, 'žádost čeká', 'žádosti čekají', 'žádostí čeká')}` : 'žádná žádost nečeká'}
              </span>
            </dd>
          </div>
          <div>
            <dt>Aktuality za 30 dní</dt>
            <dd>
              <span className="souhrn__cislo">{za30}</span>
              <span className="souhrn__pozn">{rozdil(za30, predchozich30, 'předchozích 30 dní')}</span>
            </dd>
          </div>
        </dl>
      </Oddil>

      <div className="prehled-sloupce">
        <div>
          <Oddil nadpis="Dokumenty na úřední desce" id="graf-deska" popis={`Počet visících dokumentů po dnech, posledních ${TYDNU} týdnů`}>
            <CarovyGraf
              dny={dnyGrafu}
              hodnoty={naDesce}
              popis={`Čárový graf: počet dokumentů visících na úřední desce po dnech od ${kratkyDen(dnyGrafu[0] ?? dnes)} do dneška. Dnes ${visi.length}, nejvíc ${Math.max(...naDesce)}. Data po týdnech jsou v tabulce pod grafem.`}
            />
            <p className="graf-popis">
              Dnes visí {visi.length}, nejvíc za období {Math.max(...naDesce)}.
            </p>
            <div className="sr-only">
              <table>
                <caption>Dokumenty na úřední desce po týdnech (stav na konci týdne)</caption>
                <thead>
                  <tr>
                    <th scope="col">Týden od</th>
                    <th scope="col">Visících dokumentů</th>
                  </tr>
                </thead>
                <tbody>
                  {tydny.map((t, i) => (
                    <tr key={t}>
                      <th scope="row">{kratkyDen(t)}</th>
                      <td>{naDesce[i * 7 + 6] ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Oddil>

          <Oddil nadpis="Poslední aktivita" id="aktivita">
            <ol className="aktivita">
              {udalosti.map((x) => (
                <li key={`${x.druh}-${x.nazev}-${x.kdy.toISOString()}`}>
                  <time dateTime={x.kdy.toISOString()}>{kdyText(x)}</time>
                  <div className="aktivita__text">
                    {x.href ? <a href={x.href}>{x.nazev}</a> : <span className="aktivita__nazev">{x.nazev}</span>}
                    <span>{x.popis}</span>
                  </div>
                  <span className={`stav ${x.tridaStavu}`}>{x.stav}</span>
                </li>
              ))}
            </ol>
          </Oddil>
        </div>

        <div>
          <Oddil nadpis="Hlášení závad podle stavu" id="zavady-stav" popis={`Celkem ${celkemZavad}`}>
            <div
              className="rozdeleni"
              role="img"
              aria-label={`Hlášení závad celkem ${celkemZavad}: ${skupinyZavad.map((s) => `${s.nazev.toLowerCase()} ${s.pocet}`).join(', ')}.`}
            >
              {skupinyZavad.map((s) => (s.pocet ? <span key={s.nazev} style={{ width: `${(s.pocet / Math.max(1, celkemZavad)) * 100}%`, background: s.barva }} /> : null))}
            </div>
            <table className="tabulka-stavu">
              <caption className="sr-only">Hlášení závad podle stavu</caption>
              <tbody>
                {skupinyZavad.map((s) => (
                  <tr key={s.nazev}>
                    <th scope="row">
                      <span className="tecka" style={{ background: s.barva }} aria-hidden="true" />
                      {s.nazev}
                    </th>
                    <td>{s.pocet}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Celkem</th>
                  <td>{celkemZavad}</td>
                </tr>
              </tfoot>
            </table>
          </Oddil>

          <Oddil nadpis="Rychlé odkazy" id="rozcestnik">
            <ul className="odkazy">
              {[
                ['Vyvěsit na úřední desku', `${Z}/deska`],
                ['Napsat aktualitu', `${Z}/aktuality`],
                ['Vydat krizové hlášení', `${Z}/krize`],
                ['Obecní e-mail a pošta', `${Z}/posta`],
                ['Poplatky a pokladna', `${Z}/poplatky`],
                ['Řídicí panel', `${Z}/panel`],
              ].map(([nazev, href]) => (
                <li key={href}>
                  <a href={href}>{nazev}</a>
                </li>
              ))}
            </ul>
          </Oddil>
        </div>
      </div>
    </>
  )
}
