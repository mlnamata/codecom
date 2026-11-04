#!/usr/bin/env node
/**
 * Kontrola odkazů nad běžícím webem (ODKAZY_URL, výchozí http://localhost:3300).
 * Interní odkazy a kotvy musí vracet 200, jinak chyba. Externí odkazy jen varují.
 */
const ZAKLAD = (process.env.ODKAZY_URL ?? 'http://localhost:3300').replace(/\/$/, '')
const sitemap = await (await fetch(`${ZAKLAD}/sitemap.xml`)).text()
const stranky = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
const html = new Map()
const chyby = []
const externi = new Set()

for (const s of stranky) {
  const r = await fetch(ZAKLAD + s)
  if (r.status !== 200) chyby.push(`${s}: ${r.status}`)
  html.set(s, await r.text())
}

const overeno = new Map()
for (const [s, h] of html) {
  for (const [, href] of h.matchAll(/<a [^>]*href="([^"]+)"/g)) {
    if (href.startsWith('mailto:') || href.startsWith('tel:')) continue
    if (/^https?:/.test(href) && !href.startsWith(ZAKLAD)) {
      if (!href.includes('localhost')) externi.add(href)
      continue
    }
    const url = new URL(href.replace(/&amp;/g, '&'), ZAKLAD + s)
    const cesta = url.pathname
    if (!overeno.has(cesta)) overeno.set(cesta, (await fetch(ZAKLAD + cesta)).status)
    if (overeno.get(cesta) !== 200) chyby.push(`${s} odkazuje na ${cesta}: ${overeno.get(cesta)}`)
    if (url.hash && /text\/html/.test('text/html')) {
      const cil = html.get(cesta) ?? (await (await fetch(ZAKLAD + cesta)).text())
      if (!cil.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) chyby.push(`${s} odkazuje na chybějící kotvu ${cesta}${url.hash}`)
    }
  }
}

let varovani = 0
for (const u of externi) {
  try {
    const r = await fetch(u, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(10_000) })
    if (r.status >= 400 && r.status !== 405) {
      console.warn(`varování: ${u} vrací ${r.status}`)
      varovani++
    }
  } catch {
    console.warn(`varování: ${u} nejde načíst`)
    varovani++
  }
}

for (const c of chyby) console.error(c)
console.log(`odkazy: ${stranky.length} stránek, ${overeno.size} interních cílů, ${externi.size} externích (${varovani} varování), ${chyby.length} chyb`)
process.exit(chyby.length ? 1 : 0)
