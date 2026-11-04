'use server'

import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { NovaKrizeVstup, STAVY_ZAVADY, type StavZavady } from '@codekom/typy'
import { z } from 'zod'
import { ChybaPravidla, obnovUkazku, pridejAktualitu, publikujKoncept, smazDokument, ukonciKrizi, upravDokument, vydejKrizi, vyridZavadu, vyvesDokument } from '@/lib/data/zapis'
import { obnovVerejneStranky } from '@/lib/obnovit'
import { vynulujLimity } from '@/lib/omezeni'
import { COOKIE_UKAZKY, ocisti } from '@/ukazka/stav'
import { slugObce } from '@/lib/web'
import { najdiOsobniUdaje } from './osobni-udaje'

export interface Vysledek {
  ok: boolean
  zprava: string
  chyby: Record<string, string>
  hodnoty: Record<string, string>
  odkaz?: { text: string; href: string }
}

const PRAZDNY: Vysledek = { ok: false, zprava: '', chyby: {}, hodnoty: {} }

function hlidej(): void {
  if (process.env.NEXT_PUBLIC_UKAZKA !== '1') notFound()
}

const txt = (f: FormData, k: string): string => {
  const v = f.get(k)
  return typeof v === 'string' ? v.trim() : ''
}

const odstavce = (s: string): string[] =>
  s
    .split(/\n\s*\n|\r\n\s*\r\n/)
    .map((x) => x.replace(/\s+/g, ' ').trim())
    .filter(Boolean)

/* ------------------------------------------------------------ aktualita */

export async function zverejniAktualitu(_: Vysledek, f: FormData): Promise<Vysledek> {
  hlidej()
  const hodnoty = { titulek: txt(f, 'titulek'), perex: txt(f, 'perex'), obsah: txt(f, 'obsah'), alt: txt(f, 'alt') }
  const chyby: Record<string, string> = {}
  if (hodnoty.titulek.length < 5) chyby.titulek = 'Napište nadpis, aspoň 5 znaků.'
  if (hodnoty.perex.length < 10) chyby.perex = 'Napište perex, jednu až dvě věty.'
  if (hodnoty.obsah.length < 10) chyby.obsah = 'Napište text zprávy.'
  if (hodnoty.alt.length < 5) chyby.alt = 'Popište obrázek pro lidi, kteří ho nevidí.'
  if (/^#{1,6}\s|<h[1-6]/im.test(hodnoty.obsah)) chyby.obsah = 'Text nesmí obsahovat vlastní nadpisy. Nadpis zprávy je v poli Nadpis.'
  const nalezy = najdiOsobniUdaje(`${hodnoty.titulek}\n${hodnoty.perex}\n${hodnoty.obsah}`)
  if (nalezy.length > 0) chyby.obsah = `Text obsahuje osobní údaj (${nalezy.join(', ')}). Opravte ho, nebo ho nahraďte kontaktem úřadu.`
  if (Object.keys(chyby).length) return { ...PRAZDNY, chyby, hodnoty }
  const a = pridejAktualitu({ titulek: hodnoty.titulek, perex: hodnoty.perex, obsah: odstavce(hodnoty.obsah) })
  obnovVerejneStranky()
  return { ok: true, zprava: 'Aktualita je zveřejněná na webu ve všech šablonách.', chyby: {}, hodnoty: {}, odkaz: { text: 'Zobrazit aktualitu', href: `/aktuality/${a.slug}` } }
}

/* ------------------------------------------------------------ úřední deska */

const Den = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)

export async function vyves(_: Vysledek, f: FormData): Promise<Vysledek> {
  hlidej()
  const hodnoty = {
    nazev: txt(f, 'nazev'),
    kategorie: txt(f, 'kategorie'),
    cisloJednaci: txt(f, 'cisloJednaci'),
    puvodce: txt(f, 'puvodce'),
    vyvesenoOd: txt(f, 'vyvesenoOd'),
    vyvesenoDo: txt(f, 'vyvesenoDo'),
    text: txt(f, 'text'),
    skryt: f.get('skrytPoSejmuti') === 'on' ? 'on' : '',
    bezOsobnichUdaju: f.get('bezOsobnichUdaju') === 'on' ? 'on' : '',
  }
  const chyby: Record<string, string> = {}
  if (hodnoty.nazev.length < 5) chyby.nazev = 'Napište název dokumentu.'
  if (!hodnoty.kategorie) chyby.kategorie = 'Vyberte kategorii.'
  if (!hodnoty.cisloJednaci) chyby.cisloJednaci = 'Napište číslo jednací.'
  if (!hodnoty.puvodce) chyby.puvodce = 'Napište, kdo dokument vydal.'
  if (!Den.safeParse(hodnoty.vyvesenoOd).success) chyby.vyvesenoOd = 'Vyberte den vyvěšení.'
  if (hodnoty.vyvesenoDo && !Den.safeParse(hodnoty.vyvesenoDo).success) chyby.vyvesenoDo = 'Vyberte den sejmutí, nebo nechte prázdné.'
  if (hodnoty.text.length < 10) chyby.text = 'Napište text dokumentu.'
  if (!hodnoty.bezOsobnichUdaju) chyby.bezOsobnichUdaju = 'Potvrďte, že dokument neobsahuje osobní údaje.'
  if (Object.keys(chyby).length) return { ...PRAZDNY, chyby, hodnoty }
  try {
    const d = vyvesDokument({
      nazev: hodnoty.nazev,
      kategorie: hodnoty.kategorie,
      cisloJednaci: hodnoty.cisloJednaci,
      puvodce: hodnoty.puvodce,
      vyvesenoOd: hodnoty.vyvesenoOd,
      vyvesenoDo: hodnoty.vyvesenoDo || null,
      text: odstavce(hodnoty.text),
      skrytPoSejmuti: hodnoty.skryt === 'on',
    })
    obnovVerejneStranky()
    const zaznam = d.verze[0]
    return {
      ok: true,
      zprava: `Dokument je vyvěšený. Záznam o vyvěšení: verze ${zaznam?.cislo ?? 1}, ${zaznam?.popis ?? ''}.`,
      chyby: {},
      hodnoty: {},
      odkaz: { text: 'Zobrazit dokument na webu', href: `/uredni-deska/${d.id}` },
    }
  } catch (e) {
    if (e instanceof ChybaPravidla) return { ...PRAZDNY, chyby: { vyvesenoDo: e.message }, hodnoty }
    throw e
  }
}

export async function zmenSejmuti(_: Vysledek, f: FormData): Promise<Vysledek> {
  hlidej()
  const id = txt(f, 'id')
  const doKdy = txt(f, 'vyvesenoDo')
  if (doKdy && !Den.safeParse(doKdy).success) return { ...PRAZDNY, chyby: { vyvesenoDo: 'Vyberte den sejmutí.' }, hodnoty: { vyvesenoDo: doKdy } }
  try {
    upravDokument(id, { vyvesenoDo: doKdy || null }, `Změněn den sejmutí na ${doKdy || 'do odvolání'}`)
    obnovVerejneStranky()
    return { ok: true, zprava: 'Změna je uložená jako nová verze dokumentu.', chyby: {}, hodnoty: {} }
  } catch (e) {
    if (e instanceof ChybaPravidla) return { ...PRAZDNY, zprava: e.message }
    throw e
  }
}

export async function smaz(_: Vysledek, f: FormData): Promise<Vysledek> {
  hlidej()
  try {
    smazDokument(txt(f, 'id'))
    obnovVerejneStranky()
    return { ok: true, zprava: 'Připravený dokument je smazaný.', chyby: {}, hodnoty: {} }
  } catch (e) {
    if (e instanceof ChybaPravidla) return { ...PRAZDNY, zprava: e.message }
    throw e
  }
}

/* ------------------------------------------------------------ krizová hlášení */

async function zrusVynucenyBanner(): Promise<void> {
  const c = await cookies()
  const puvodni = c.get(COOKIE_UKAZKY)?.value
  if (!puvodni) return
  try {
    const stav = ocisti(JSON.parse(puvodni) as Record<string, unknown>)
    delete stav.krize
    c.set(COOKIE_UKAZKY, JSON.stringify(stav), { path: '/', httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 30 })
  } catch {
    c.delete(COOKIE_UKAZKY)
  }
}

export async function vydej(_: Vysledek, f: FormData): Promise<Vysledek> {
  hlidej()
  const hodnoty = {
    uroven: txt(f, 'uroven'),
    titulek: txt(f, 'titulek'),
    text: txt(f, 'text'),
    odkazText: txt(f, 'odkazText'),
    odkazUrl: txt(f, 'odkazUrl'),
    role: txt(f, 'role'),
  }
  const casti = f.getAll('casti').filter((x): x is string => typeof x === 'string')
  const r = NovaKrizeVstup.safeParse({
    obec: slugObce(),
    uroven: hodnoty.uroven,
    titulek: hodnoty.titulek,
    text: hodnoty.text,
    odkazText: hodnoty.odkazText || null,
    odkazUrl: hodnoty.odkazUrl || null,
    casti,
  })
  if (!r.success) {
    const chyby: Record<string, string> = {}
    for (const i of r.error.issues) chyby[String(i.path[0] ?? 'formular')] ??= i.path[0] === 'uroven' ? 'Vyberte úroveň.' : i.message
    return { ...PRAZDNY, chyby, hodnoty }
  }
  const role = hodnoty.role === 'redaktor' ? 'redaktor' : 'spravce'
  try {
    const h = vydejKrizi(r.data, role)
    if (role === 'redaktor') {
      return { ok: true, zprava: 'Redaktor uložil koncept. Vydat ho smí jen správce.', chyby: {}, hodnoty: {} }
    }
    await zrusVynucenyBanner()
    obnovVerejneStranky()
    return {
      ok: true,
      zprava: `Hlášení „${h.titulek}“ je vydané. Je vidět na webu a v /api/krize/aktivni. Vynucený stav banneru v ukázce je zrušený.`,
      chyby: {},
      hodnoty: {},
      odkaz: { text: 'Zobrazit web', href: '/?krize=auto' },
    }
  } catch (e) {
    if (e instanceof ChybaPravidla) return { ...PRAZDNY, chyby: { odkazUrl: e.message }, hodnoty }
    throw e
  }
}

export async function ukonci(_: Vysledek, f: FormData): Promise<Vysledek> {
  hlidej()
  try {
    ukonciKrizi(txt(f, 'id'))
    obnovVerejneStranky()
    return { ok: true, zprava: 'Hlášení je ukončené a přesunuté do archivu.', chyby: {}, hodnoty: {} }
  } catch (e) {
    if (e instanceof ChybaPravidla) return { ...PRAZDNY, zprava: e.message }
    throw e
  }
}

export async function vydejKoncept(_: Vysledek, f: FormData): Promise<Vysledek> {
  hlidej()
  if (txt(f, 'role') !== 'spravce') return { ...PRAZDNY, zprava: 'Koncept smí vydat jen správce.' }
  try {
    publikujKoncept(txt(f, 'id'))
    await zrusVynucenyBanner()
    obnovVerejneStranky()
    return { ok: true, zprava: 'Koncept je vydaný a je vidět na webu.', chyby: {}, hodnoty: {} }
  } catch (e) {
    if (e instanceof ChybaPravidla) return { ...PRAZDNY, zprava: e.message }
    throw e
  }
}

/* ------------------------------------------------------------ závady */

export async function zmenZavadu(_: Vysledek, f: FormData): Promise<Vysledek> {
  hlidej()
  const stav = txt(f, 'stav')
  if (!(STAVY_ZAVADY as readonly string[]).includes(stav)) return { ...PRAZDNY, chyby: { stav: 'Vyberte stav.' } }
  try {
    const h = vyridZavadu(txt(f, 'id'), stav as StavZavady, txt(f, 'verejnaOdpoved') || null)
    obnovVerejneStranky()
    return { ok: true, zprava: `Hlášení ${h.cislo} je uložené.`, chyby: {}, hodnoty: {} }
  } catch (e) {
    if (e instanceof ChybaPravidla) return { ...PRAZDNY, zprava: e.message }
    throw e
  }
}

/* ------------------------------------------------------------ obnovení */

export async function obnov(_: Vysledek, f: FormData): Promise<Vysledek> {
  hlidej()
  if (f.get('potvrzeni') !== 'ano') return { ...PRAZDNY, zprava: 'Obnovení jste nepotvrdili.' }
  obnovUkazku()
  vynulujLimity()
  obnovVerejneStranky()
  return { ok: true, zprava: 'Ukázka je obnovená do výchozího stavu.', chyby: {}, hodnoty: {} }
}
