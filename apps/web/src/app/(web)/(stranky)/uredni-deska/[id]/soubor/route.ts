import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { NextRequest } from 'next/server'
import { formatDay } from '@codekom/typy/pravidla'
import { zdroj } from '@/lib/data/zdroj'
import { vytvorPdf } from '@/lib/pdf'
import { slugObce } from '@/lib/web'

const PISMA = ['noto-sans-latin-400.woff', 'noto-sans-latin-ext-400.woff'] as const

async function nactiPismo(soubor: string, origin: string): Promise<Uint8Array> {
  try {
    return await readFile(path.join(process.cwd(), 'public', 'demo', 'pismo', soubor))
  } catch {
    const r = await fetch(new URL(`/demo/pismo/${soubor}`, origin))
    if (!r.ok) throw new Error(`Písmo ${soubor} není dostupné`)
    return new Uint8Array(await r.arrayBuffer())
  }
}

/**
 * Soubor dokumentu úřední desky. Vrátí PDF jen u dokumentu, který visí, nebo je sejmutý
 * a smí zůstat v archivu. Jinak 404. Produkční soubory budou v privátním úložišti za tímto
 * handlerem (prompt 01); v ukázce se PDF vytváří z textu dokumentu.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const z = await zdroj()
  const obec = await z.obec(slugObce())
  const d = obec ? await z.dokument(obec.slug, id) : null
  if (!obec || !d) {
    return new Response('Dokument už není na úřední desce zveřejněn.', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
    })
  }
  const [latin, ext] = await Promise.all(PISMA.map((p) => nactiPismo(p, request.nextUrl.origin)))
  const pdf = await vytvorPdf(
    {
      obec: obec.nazev,
      nazev: d.nazev,
      cisloJednaci: d.cisloJednaci,
      puvodce: d.puvodce,
      vyveseno: `${formatDay(d.vyvesenoOd)} až ${d.vyvesenoDo ? formatDay(d.vyvesenoDo) : 'do odvolání'}`,
      odstavce: d.text,
    },
    { latin: latin!, ext: ext! },
  )
  return new Response(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${d.soubor.nazev.replace(/[^\w.-]/g, '_')}"`,
      'Cache-Control': 'no-store',
    },
  })
}
