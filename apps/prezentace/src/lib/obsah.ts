import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { Marked } from 'marked'
import { odkazDema, odkazAplikace } from './demo'

/** Texty webu jsou hotové v obsah/prezentace. Tady se jen převádějí na HTML. */
const SLOZKA = resolve(process.cwd(), '..', '..', 'obsah', 'prezentace')

export interface Stranka {
  soubor: string
  title: string
  description: string
  adresa: string
  telo: string
}

function frontmatter(text: string): { meta: Record<string, string>; telo: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text)
  if (!m) return { meta: {}, telo: text }
  const meta: Record<string, string> = {}
  for (const radek of (m[1] ?? '').split(/\r?\n/)) {
    const r = /^(\w+):\s*"?(.*?)"?\s*$/.exec(radek)
    if (r?.[1]) meta[r[1]] = r[2] ?? ''
  }
  return { meta, telo: text.slice(m[0].length) }
}

export function nactiStranku(soubor: string): Stranka {
  const text = readFileSync(join(SLOZKA, `${soubor}.md`), 'utf8')
  const { meta, telo } = frontmatter(text)
  return {
    soubor,
    title: meta.title ?? soubor,
    description: meta.description ?? '',
    adresa: meta.adresa ?? `/${soubor}`,
    telo: telo.replace(/\{\/\*[\s\S]*?\*\/\}\s*/g, ''),
  }
}

export const vsechnyStranky = (): Stranka[] =>
  readdirSync(SLOZKA)
    .filter((f) => f.endsWith('.md') && f !== 'tvrzeni.md')
    .map((f) => nactiStranku(f.slice(0, -3)))

/** Rozdělí text na části podle nadpisů druhé úrovně. Klíč je text nadpisu. */
export function casti(telo: string): { uvod: string; casti: { nadpis: string; telo: string }[] } {
  const kusy = telo.split(/^## /m)
  const uvod = kusy.shift() ?? ''
  return {
    uvod,
    casti: kusy.map((k) => {
      const i = k.indexOf('\n')
      return { nadpis: k.slice(0, i).trim(), telo: k.slice(i + 1) }
    }),
  }
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

const POZNAMKA_AI = 'Ilustrační fotografie vytvořená umělou inteligencí'

/** Řádky „Fotka `x`. Alt text: …“ a „Snímek `x`. Alt text: …“ jsou v textech popisy obrázků. */
function obrazky(md: string): string {
  let vystup = md.replace(/^- Fotka `([\w-]+)`\. Alt text: (.+?)\. Popisek: .+$/gm, (_, f: string, alt: string) =>
    `<figure class="foto"><img src="/foto/${f}.webp" alt="${esc(alt)}." width="1344" height="768" loading="lazy"><figcaption>${POZNAMKA_AI}</figcaption></figure>`,
  )
  vystup = vystup.replace(/^- Snímek `([\w-]+)`\. Alt text: (.+)$/gm, (_, f: string, alt: string) =>
    `<figure class="snimek"><img src="/sablony/${f}.webp" alt="${esc(alt)}" width="1280" height="900" loading="lazy"></figure>`,
  )
  return vystup
}

/** Odkazy #demo a #aplikace vedou do živé ukázky, jen když je nastavená. */
function odkazyUkazky(md: string): string {
  return md
    .split('\n')
    .flatMap((radek) => {
      if (radek.includes('](#demo)')) {
        const url = odkazDema()
        return url ? [radek.replace('](#demo)', `](${url})`)] : []
      }
      if (radek.includes('](#aplikace)')) {
        const url = odkazAplikace()
        return url ? [radek.replace('](#aplikace)', `](${url})`)] : []
      }
      return [radek]
    })
    .join('\n')
}

/** Zbylé [DOPLNIT: …] a [OVĚŘIT] zvýrazní, ale jen v textu, ne v atributech. */
function zvyrazni(html: string): string {
  return html
    .split(/(<[^>]+>)/)
    .map((kus) => (kus.startsWith('<') ? kus : kus.replace(/\[(DOPLNIT[^\]]*|OVĚŘIT[^\]]*)\]/g, '<mark class="doplnit">[$1]</mark>')))
    .join('')
}

const marked = new Marked({ gfm: true })

export function naHtml(md: string, { bezH1 = false } = {}): string {
  let zdroj = odkazyUkazky(obrazky(md))
  if (bezH1) zdroj = zdroj.replace(/^# .+$/m, '')
  let html = marked.parse(zdroj, { async: false })
  html = html.replace(/<a href="(https?:[^"]+)"/g, '<a href="$1" rel="noopener noreferrer"')
  // Každá tabulka dostane popisek podle nadpisu nad ní (unikátní oblasti pro čtečky).
  let nadpis = 'Tabulka'
  html = html.replace(/<h[1-4][^>]*>([^<]+)<\/h[1-4]>|<table>/g, (m: string, t?: string) => {
    if (t) {
      nadpis = t
      return m
    }
    return `<div class="tabulka" role="region" aria-label="${esc(nadpis)}, tabulka" tabindex="0"><table>`
  })
  html = html.replace(/<\/table>/g, '</table></div>')
  html = html.replace(/<h([2-4])>([^<]+)<\/h\1>/g, (_, u: string, t: string) => `<h${u} id="${kotva(t)}">${t}</h${u}>`)
  return zvyrazni(html)
}

export function kotva(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
