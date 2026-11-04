'use server'

import { headers } from 'next/headers'
import { NovaZavadaVstup, CasDne, Den } from '@codekom/typy'
import { z } from 'zod'
import { ipKlienta, zkontrolujLimit } from '@/lib/omezeni'
import { obnovVerejneStranky } from '@/lib/obnovit'
import { ChybaPravidla, pridejRezervaci, pridejZavadu } from '@/lib/data/zapis'
import { slugObce } from '@/lib/web'

export interface StavFormulare {
  chyby: Record<string, string>
  hodnoty: Record<string, string>
  vysledek?: Record<string, string>
}

const text = (f: FormData, k: string): string => {
  const v = f.get(k)
  return typeof v === 'string' ? v : ''
}

function chybyZod(e: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {}
  for (const i of e.issues) {
    const k = String(i.path[i.path.length - 1] ?? 'formular')
    out[k] ??= i.message
  }
  return out
}

async function limit(): Promise<string | null> {
  const r = zkontrolujLimit(`formular:${ipKlienta(await headers())}`)
  return r.povoleno ? null : `Odeslali jste příliš mnoho formulářů. Zkuste to znovu za ${r.zaSekund} s.`
}

export async function odesliZavadu(_: StavFormulare, f: FormData): Promise<StavFormulare> {
  const hodnoty = Object.fromEntries(['kategorie', 'popis', 'misto', 'jmeno', 'email', 'telefon'].map((k) => [k, text(f, k)]))
  const omezeno = await limit()
  if (omezeno) return { chyby: { formular: omezeno }, hodnoty }
  const vstup = {
    obec: slugObce(),
    kategorie: hodnoty.kategorie,
    popis: hodnoty.popis,
    misto: hodnoty.misto,
    kontakt: { jmeno: hodnoty.jmeno, email: hodnoty.email, telefon: hodnoty.telefon },
  }
  const r = NovaZavadaVstup.safeParse(vstup)
  if (!r.success) return { chyby: chybyZod(r.error), hodnoty }
  try {
    const zavada = pridejZavadu(r.data)
    obnovVerejneStranky()
    return { chyby: {}, hodnoty: {}, vysledek: { cislo: zavada.cislo, kod: zavada.sledovaciKod } }
  } catch (e) {
    if (e instanceof ChybaPravidla) return { chyby: { kategorie: e.message }, hodnoty }
    throw e
  }
}

const RezervaceVstup = z
  .object({
    prostor: z.string().min(1, 'Vyberte prostor'),
    den: Den,
    od: CasDne,
    do: CasDne,
    ucel: z.string().trim().min(3, 'Napište, k čemu prostor potřebujete').max(200, 'Účel je delší než 200 znaků'),
    jmeno: z.string().trim().min(2, 'Napište jméno nebo název spolku').max(100),
    kontakt: z.string().trim().min(5, 'Napište telefon nebo e-mail').max(100),
  })
  .refine((v) => v.od < v.do, { path: ['do'], message: 'Konec musí být později než začátek' })

export async function odesliRezervaci(_: StavFormulare, f: FormData): Promise<StavFormulare> {
  const hodnoty = Object.fromEntries(['prostor', 'den', 'od', 'do', 'ucel', 'jmeno', 'kontakt'].map((k) => [k, text(f, k)]))
  const omezeno = await limit()
  if (omezeno) return { chyby: { formular: omezeno }, hodnoty }
  const r = RezervaceVstup.safeParse(hodnoty)
  if (!r.success) {
    const chyby = chybyZod(r.error)
    if (chyby.den) chyby.den = 'Vyberte den'
    if (chyby.od) chyby.od = 'Zadejte čas začátku, například 14:00'
    if (chyby.do && !chyby.do.startsWith('Konec')) chyby.do = 'Zadejte čas konce, například 18:00'
    return { chyby, hodnoty }
  }
  try {
    const v = r.data
    const rez = pridejRezervaci({ prostor: v.prostor, den: v.den, od: v.od, do: v.do, ucel: v.ucel, zadatel: { jmeno: v.jmeno, kontakt: v.kontakt } })
    obnovVerejneStranky()
    return { chyby: {}, hodnoty: {}, vysledek: { id: rez.id, den: rez.den, od: rez.od, do: rez.do } }
  } catch (e) {
    if (e instanceof ChybaPravidla) return { chyby: { den: e.message }, hodnoty }
    throw e
  }
}
