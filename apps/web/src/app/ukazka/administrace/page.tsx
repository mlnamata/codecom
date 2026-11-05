import { demoTed, prazskyOkamzik } from '@codekom/demo-data'
import { aktivniHlaseni, pragueDayKey, stavDokumentu, UROVNE as UROVNE_KRIZE } from '@codekom/typy/pravidla'
import type { ReactNode } from 'react'
import { uloziste } from '@/lib/data/demo-pamet'

export const dynamic = 'force-dynamic'

/*
 * Přehled administrace jako dashboard. Všechna čísla se počítají z dat ukázky v paměti serveru
 * (obsah/javori-lhota a změny provedené v ukázce), nic se nevymýšlí. Platby občanů ukázka
 * neeviduje, proto na přehledu nejsou.
 */

const Z = '/ukazka/administrace'
const DEN_MS = 86_400_000
const TYDNU = 8

const den = (d: string) => Date.UTC(Number(d.slice(0, 4)), Number(d.slice(5, 7)) - 1, Number(d.slice(8, 10)))
/** Kolik dní je mezi dnem `d` a dneškem (0 = dnes). */
const dniZpet = (d: string, dnes: string) => Math.round((den(dnes) - den(d)) / DEN_MS)
const posun = (dnes: string, o: number) => new Date(den(dnes) - o * DEN_MS).toISOString().slice(0, 10)

const datum = new Intl.DateTimeFormat('cs-CZ', { timeZone: 'Europe/Prague', day: 'numeric', month: 'numeric' })
const cas = new Intl.DateTimeFormat('cs-CZ', { timeZone: 'Europe/Prague', hour: 'numeric', minute: '2-digit' })
const plneDatum = new Intl.DateTimeFormat('cs-CZ', { timeZone: 'Europe/Prague', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
const kratkyDen = (d: string) => datum.format(prazskyOkamzik(d))

/** Počty po týdnech, poslední prvek je týden končící dneškem. */
function poTydnech(dny: string[], dnes: string): number[] {
  const t = Array.from({ length: TYDNU }, () => 0)
  for (const d of dny) {
    const z = dniZpet(d, dnes)
    if (z < 0 || z >= TYDNU * 7) continue
    const i = TYDNU - 1 - Math.floor(z / 7)
    t[i] = (t[i] ?? 0) + 1
  }
  return t
}
const zacatkyTydnu = (dnes: string) => Array.from({ length: TYDNU }, (_, i) => posun(dnes, (TYDNU - i) * 7 - 1))

/** Změna za posledních 14 dní proti předchozím 14 dnům. */
function zmena(dny: string[], dnes: string): { text: string; popis: string; roste: boolean } {
  const ted = dny.filter((d) => dniZpet(d, dnes) >= 0 && dniZpet(d, dnes) < 14).length
  const pred = dny.filter((d) => dniZpet(d, dnes) >= 14 && dniZpet(d, dnes) < 28).length
  if (pred === 0) return { text: ted ? `+${ted}` : '0', popis: `${ted} za posledních 14 dní, předchozích 14 dní žádné`, roste: ted > 0 }
  const p = Math.round(((ted - pred) / pred) * 100)
  return { text: `${p > 0 ? '+' : ''}${p} %`, popis: `${ted} za posledních 14 dní proti ${pred} za předchozích 14 dní`, roste: p > 0 }
}

function Krivka({ hodnoty }: { hodnoty: number[] }) {
  const max = Math.max(1, ...hodnoty)
  const body = hodnoty.map((h, i) => `${(i / (hodnoty.length - 1)) * 96},${34 - (h / max) * 30}`)
  return (
    <svg className="kpi__krivka" viewBox="0 0 96 36" aria-hidden="true" focusable="false">
      <polyline points={body.join(' ')} fill="none" stroke="var(--a-zelena)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

function Kpi({ popis, hodnota, href, zmenaText, krivka, poznamka }: { popis: string; hodnota: number; href: string; zmenaText: ReturnType<typeof zmena>; krivka: number[]; poznamka: string }) {
  return (
    <li>
      <p className="kpi__popis">
        <a href={href}>{popis}</a>
      </p>
      <div className="kpi__radek">
        <p className="kpi__hodnota">{hodnota}</p>
        <Krivka hodnoty={krivka} />
      </div>
      <p className="kpi__zmena">
        <span className={`kpi__trend${zmenaText.roste ? ' kpi__trend--roste' : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {zmenaText.roste ? <path d="m5 15 7-7 7 7" /> : <path d="M5 12h14" />}
          </svg>
          <span aria-hidden="true">{zmenaText.text}</span>
          <span className="sr-only">{zmenaText.popis}.</span>
        </span>{' '}
        {poznamka}
      </p>
    </li>
  )
}

function Karta({ nadpis, id, obdobi, sirka, children }: { nadpis: string; id: string; obdobi?: string; sirka: 4 | 5 | 7 | 8 | 12; children: ReactNode }) {
  return (
    <section className={`karta-grafu karta-grafu--${sirka}`} aria-labelledby={id}>
      <div className="karta-grafu__hlava">
        <h2 id={id}>{nadpis}</h2>
        {obdobi ? <p className="karta-grafu__obdobi">{obdobi}</p> : null}
      </div>
      {children}
    </section>
  )
}

/** Plošný graf jedné řady po dnech. SVG se roztahuje, popisky os jsou v HTML, aby zůstaly čitelné. */
function PlosnyGraf({ dny, hodnoty, popis }: { dny: string[]; hodnoty: number[]; popis: string }) {
  const krok = Math.max(2, Math.ceil(Math.max(1, ...hodnoty) / 4))
  const max = krok * 4
  const n = hodnoty.length
  const x = (i: number) => (i / (n - 1)) * 600
  const y = (h: number) => 200 - (h / max) * 200
  const cara = hodnoty.map((h, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(h).toFixed(1)}`).join(' ')
  const plocha = `${cara} L600,200 L0,200 Z`
  const popisky = dny.filter((_, i) => i % 7 === 0)
  return (
    <div className="plocha">
      <div className="plocha__osa-y" aria-hidden="true">
        {[4, 3, 2, 1, 0].map((k) => (
          <span key={k}>{k * krok}</span>
        ))}
      </div>
      <div className="plocha__graf">
        <svg className="graf" viewBox="0 0 600 200" preserveAspectRatio="none" role="img" aria-label={popis}>
          <defs>
            <linearGradient id="plocha-vypln" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--a-graf-1)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--a-graf-1)" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3, 4].map((k) => (
            <line key={k} className="graf__mrizka" x1="0" x2="600" y1={k * 50} y2={k * 50} vectorEffect="non-scaling-stroke" />
          ))}
          <path d={plocha} fill="url(#plocha-vypln)" />
          <path d={cara} className="graf__cara" vectorEffect="non-scaling-stroke" />
          {hodnoty.map((h, i) => (
            <rect key={i} className="graf__zasah" x={Math.max(0, x(i) - 300 / (n - 1))} width={600 / (n - 1)} y="0" height="200">
              <title>{`${kratkyDen(dny[i] ?? '')}: ${h}`}</title>
            </rect>
          ))}
        </svg>
        <div className="plocha__osa-x" aria-hidden="true">
          {popisky.map((d) => (
            <span key={d}>{kratkyDen(d)}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Sloupcový graf jedné řady. Sloupce jsou v HTML, výška v procentech. */
function Sloupce({ popisky, hodnoty, popis, jednotka }: { popisky: string[]; hodnoty: number[]; popis: string; jednotka: string }) {
  const max = Math.max(1, ...hodnoty)
  return (
    <div className="sloupce" role="img" aria-label={popis}>
      {hodnoty.map((h, i) => (
        <div key={i} className="sloupce__sloupec" title={`Týden od ${popisky[i]}: ${h} ${jednotka}`}>
          <span className="sloupce__hodnota">{h}</span>
          <span className="sloupce__pruh" style={{ height: `${Math.max(2, (h / max) * 100)}%` }} />
          <span className="sloupce__popisek">{popisky[i]}</span>
        </div>
      ))}
    </div>
  )
}

function Prstenec({ casti, popis }: { casti: { nazev: string; pocet: number; barva: string }[]; popis: string }) {
  const celkem = casti.reduce((s, c) => s + c.pocet, 0)
  const r = 42
  const obvod = 2 * Math.PI * r
  const mezera = celkem > 1 ? 2 : 0
  const delky = casti.map((c) => (celkem ? (c.pocet / celkem) * obvod : 0))
  const starty = delky.map((_, i) => delky.slice(0, i).reduce((s, d) => s + d, 0))
  return (
    <div className="prstenec">
      <div className="prstenec__kruh">
        <svg viewBox="0 0 100 100" role="img" aria-label={popis}>
          <circle cx="50" cy="50" r={r} fill="none" stroke="var(--a-karta-2)" strokeWidth="12" />
          {casti.map((c, i) =>
            c.pocet ? (
              <circle
                key={c.nazev}
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke={c.barva}
                strokeWidth="12"
                strokeDasharray={`${Math.max(0, (delky[i] ?? 0) - mezera)} ${obvod}`}
                strokeDashoffset={-(starty[i] ?? 0)}
              >
                <title>{`${c.nazev}: ${c.pocet}`}</title>
              </circle>
            ) : null,
          )}
        </svg>
        <div className="prstenec__stred" aria-hidden="true">
          <strong>{celkem}</strong>
          <span>hlášení</span>
        </div>
      </div>
      <ul className="legenda">
        {casti.map((c) => (
          <li key={c.nazev}>
            <span className="legenda__barva" style={{ background: c.barva }} aria-hidden="true" />
            {c.nazev}
            <strong>{c.pocet}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TabulkaDat({ popis, sloupce, radky }: { popis: string; sloupce: [string, string]; radky: [string, number][] }) {
  // Obal nese sr-only, protože tabulka s width: 100 % ze .stranka by ho přebila a rozšířila stránku.
  return (
    <div className="sr-only">
      <table>
        <caption>{popis}</caption>
        <thead>
          <tr>
            <th scope="col">{sloupce[0]}</th>
            <th scope="col">{sloupce[1]}</th>
          </tr>
        </thead>
        <tbody>
          {radky.map(([a, b]) => (
            <tr key={a}>
              <th scope="row">{a}</th>
              <td>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
  href: string
  stav: string
  tridaStavu: Stav
}

const IKONY_AKTIVITY: Record<Udalost['druh'], ReactNode> = {
  deska: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8" />,
  zavada: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z" />,
  rezervace: <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />,
  aktualita: <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2M18 14h-8M15 18h-5M10 6h8v4h-8z" />,
  krize: <path d="m21.7 18-8-14a2 2 0 0 0-3.5 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3ZM12 9v4M12 17h.01" />,
}

export default function Prehled() {
  const u = uloziste()
  const ted = demoTed()
  const dnes = pragueDayKey(ted)

  // Úřední deska
  const visi = u.dokumenty.filter((d) => stavDokumentu(d.vyvesenoOd, d.vyvesenoDo, dnes) === 'visi')
  const vyveseni = u.dokumenty.map((d) => d.vyvesenoOd).filter((d) => d <= dnes)
  const dnyGrafu = Array.from({ length: TYDNU * 7 }, (_, i) => posun(dnes, TYDNU * 7 - 1 - i))
  const naDesce = dnyGrafu.map((d) => u.dokumenty.filter((x) => stavDokumentu(x.vyvesenoOd, x.vyvesenoDo, d) === 'visi').length)

  // Hlášení závad
  const otevrene = u.zavady.filter((z) => z.stav === 'nove' || z.stav === 'prijato' || z.stav === 'v_reseni')
  const nove = u.zavady.filter((z) => z.stav === 'nove').length
  const nahlaseni = u.zavady.map((z) => pragueDayKey(new Date(z.vytvoreno)))
  const nazevStavu = (s: string) => u.stavyZavad.find((x) => x.id === s)?.nazev ?? s
  const nazevKategorie = (k: string) => u.kategorieZavad.find((x) => x.id === k)?.nazev ?? k

  // Rezervace prostor
  const nadchazejici = u.rezervace.filter((r) => r.stav === 'schvaleno' && r.den >= dnes).length
  const cekaji = u.rezervace.filter((r) => r.stav === 'ceka').length
  const podane = u.rezervace.map((r) => pragueDayKey(new Date(r.vytvoreno)))
  const nazevProstoru = (id: string) => u.prostory.find((p) => p.id === id || p.slug === id)?.nazev ?? id

  // Aktuality
  const publikovane = u.aktuality.map((a) => pragueDayKey(new Date(a.publikovano))).filter((d) => d <= dnes)
  const za30 = publikovane.filter((d) => dniZpet(d, dnes) < 30).length

  // Krizová hlášení: na přehledu jen to nejzávažnější, úroveň slovem
  const krize = aktivniHlaseni(
    u.krize.filter((h) => h.stav === 'vydano'),
    ted,
  )[0]

  const tydny = zacatkyTydnu(dnes)
  const tydnyText = tydny.map(kratkyDen)
  const aktualityTydne = poTydnech(publikovane, dnes)

  const skupinyZavad = [
    { nazev: 'Nová', pocet: nove, barva: 'var(--a-graf-1)' },
    { nazev: 'Přijatá a v řešení', pocet: u.zavady.filter((z) => z.stav === 'prijato' || z.stav === 'v_reseni').length, barva: 'var(--a-graf-2)' },
    { nazev: 'Vyřízená a zamítnutá', pocet: u.zavady.filter((z) => z.stav === 'vyrizeno' || z.stav === 'zamitnuto').length, barva: 'var(--a-graf-3)' },
  ]

  const udalosti: Udalost[] = [
    ...u.dokumenty
      .filter((d) => d.vyvesenoOd <= dnes)
      .map((d): Udalost => {
        const s = stavDokumentu(d.vyvesenoOd, d.vyvesenoDo, dnes)
        return { kdy: prazskyOkamzik(d.vyvesenoOd, '00:00'), jenDen: true, druh: 'deska', nazev: d.nazev, popis: 'Vyvěšeno na úřední desku', href: `${Z}/deska`, stav: s === 'visi' ? 'Visí' : 'Sejmuto', tridaStavu: s === 'visi' ? 'dobre' : 'neutralni' }
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
        href: `${Z}/schvalovani`,
        stav: r.stav === 'ceka' ? 'Čeká' : r.stav === 'schvaleno' ? 'Schváleno' : 'Zamítnuto',
        tridaStavu: r.stav === 'ceka' ? 'pozor' : r.stav === 'schvaleno' ? 'dobre' : 'spatne',
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
    .slice(0, 6)

  const kdyText = (x: Udalost) => {
    const d = pragueDayKey(x.kdy)
    const z = dniZpet(d, dnes)
    const denText = z === 0 ? 'dnes' : z === 1 ? 'včera' : datum.format(x.kdy)
    return x.jenDen ? denText : `${denText} ${cas.format(x.kdy)}`
  }

  return (
    <>
      <div className="prehled-hlava">
        <div>
          <h1>Přehled</h1>
          <p>Obec Javoří Lhota, {plneDatum.format(ted)}</p>
        </div>
      </div>

      {krize ? (
        <p className="prehled-krize">
          <span>
            Platí krizové hlášení, úroveň <strong>{UROVNE_KRIZE[krize.uroven].nazev}</strong>: {krize.titulek}
          </span>
          <a href={`${Z}/krize`}>Krizová hlášení</a>
        </p>
      ) : null}

      <h2 className="sr-only">Hlavní čísla</h2>
      <ul className="kpi">
        <Kpi popis="Visí na úřední desce" hodnota={visi.length} href={`${Z}/deska`} zmenaText={zmena(vyveseni, dnes)} krivka={poTydnech(vyveseni, dnes)} poznamka="vyvěšeno za 14 dní" />
        <Kpi popis="Otevřená hlášení závad" hodnota={otevrene.length} href={`${Z}/zavady`} zmenaText={zmena(nahlaseni, dnes)} krivka={poTydnech(nahlaseni, dnes)} poznamka={`nahlášeno za 14 dní, ${nove} ${nove === 1 ? 'nové' : 'nových'}`} />
        <Kpi popis="Nadcházející rezervace prostor" hodnota={nadchazejici} href={`${Z}/schvalovani`} zmenaText={zmena(podane, dnes)} krivka={poTydnech(podane, dnes)} poznamka={`žádostí za 14 dní, ${cekaji} čeká`} />
        <Kpi popis="Aktuality za 30 dní" hodnota={za30} href={`${Z}/aktuality`} zmenaText={zmena(publikovane, dnes)} krivka={aktualityTydne} poznamka="zveřejněno za 14 dní" />
      </ul>

      <div className="prehled-mrizka">
        <Karta nadpis="Dokumenty na úřední desce" id="graf-deska" obdobi={`Posledních ${TYDNU} týdnů`} sirka={8}>
          <p className="karta-grafu__souhrn">
            <strong>{visi.length}</strong> visí dnes, nejvíc {Math.max(...naDesce)} za období
          </p>
          <PlosnyGraf dny={dnyGrafu} hodnoty={naDesce} popis={`Počet dokumentů visících na úřední desce po dnech od ${kratkyDen(dnyGrafu[0] ?? dnes)} do dneška. Dnes ${visi.length}, nejvíc ${Math.max(...naDesce)}. Data jsou v tabulce pod grafem.`} />
          <TabulkaDat popis="Dokumenty na úřední desce po týdnech (stav na konci týdne)" sloupce={['Týden od', 'Visících dokumentů']} radky={tydny.map((t, i) => [kratkyDen(t), naDesce[i * 7 + 6] ?? 0])} />
        </Karta>

        <Karta nadpis="Hlášení závad podle stavu" id="graf-zavady" sirka={4}>
          <Prstenec casti={skupinyZavad} popis={`Hlášení závad celkem ${u.zavady.length}: ${skupinyZavad.map((s) => `${s.nazev.toLowerCase()} ${s.pocet}`).join(', ')}.`} />
        </Karta>

        <Karta nadpis="Poslední aktivita" id="aktivita" sirka={7}>
          <ul className="aktivita">
            {udalosti.map((x) => (
              <li key={`${x.druh}-${x.nazev}-${x.kdy.toISOString()}`}>
                <span className="aktivita__ikona" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {IKONY_AKTIVITY[x.druh]}
                  </svg>
                </span>
                <div className="aktivita__text">
                  <a href={x.href}>{x.nazev}</a>
                  <span>{x.popis}</span>
                </div>
                <div className="aktivita__cas">
                  <span className={`stav ${x.tridaStavu}`}>{x.stav}</span>
                  <time dateTime={x.kdy.toISOString()}>{kdyText(x)}</time>
                </div>
              </li>
            ))}
          </ul>
        </Karta>

        <Karta nadpis="Zveřejněné aktuality" id="graf-aktuality" obdobi="Po týdnech" sirka={5}>
          <p className="karta-grafu__souhrn">
            <strong>{aktualityTydne.reduce((s, h) => s + h, 0)}</strong> za {TYDNU} týdnů
          </p>
          <Sloupce
            popisky={tydnyText}
            hodnoty={aktualityTydne}
            jednotka="aktualit"
            popis={`Zveřejněné aktuality po týdnech: ${aktualityTydne.map((h, i) => `týden od ${tydnyText[i]} ${h}`).join(', ')}.`}
          />
        </Karta>

        <Karta nadpis="Rychlé odkazy" id="rozcestnik" sirka={12}>
          <ul className="rozcestnik">
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
        </Karta>
      </div>
    </>
  )
}
