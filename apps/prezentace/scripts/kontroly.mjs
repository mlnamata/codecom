/**
 * Kontroly textů prezentačního webu (prompt 06, sekce pravidla). Čisté funkce bez I/O,
 * používají je skripty kontrola-obsahu, kontrola-doplnit, tvrzeni-z-obsahu a testy.
 */

export const HESLO = 'Tvoříme kódy pro lidi.'

export const ZAKAZANA_SLOVA = ['revoluční', 'inovativní', 'nejlepší', 'komplexní řešení', 'pokuta', 'pokuty', 'pokutu', 'sankce', 'penále', 'garantujeme', 'zaručujeme dotaci']

export const KONKURENCE = ['Munipolis', 'Mobilní rozhlas', 'Vismo', 'WEBHOUSE', 'Galileo', 'Antee', 'Obce na webu']

/** Text bez kódu v backtickách, odkazů v závorkách a HTML značek: jen to, co čte člověk. */
export function citelnyText(md) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/\]\([^)]*\)/g, ']')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
}

/**
 * Nálezy porušení pravidel v jednom textu. `registr` je text registru tvrzení,
 * proti kterému se kontrolují procenta.
 * @returns {{ pravidlo: string, ukazka: string, radek: number }[]}
 */
export function zkontrolujText(text, registr = '') {
  const nalezy = []
  const radky = citelnyText(text).split('\n')
  radky.forEach((r, i) => {
    const pridej = (pravidlo, m) => nalezy.push({ pravidlo, ukazka: (m ?? r).trim().slice(0, 80), radek: i + 1 })
    if (/\p{L}[!](\s|$|["“”)])/u.test(r)) pridej('vykřičník')
    if (/\p{Extended_Pictographic}/u.test(r)) pridej('emoji')
    if (r.includes('→')) pridej('šipka →')
    if (/\S · \S/.test(r)) pridej('řetězec A · B')
    const nadpis = /^#{1,6}\s+(.+)$/.exec(r)
    if (nadpis) {
      // Bez míst [DOPLNIT] a zkratek do 3 písmen (EU, AI, ČR)
      const bez = nadpis[1]
        .replace(/\[[^\]]*\]/g, '')
        .split(/\s+/)
        .filter((slovo) => !/^\p{Lu}{1,3}[.,)]?$/u.test(slovo))
        .join(' ')
      if (/\p{Lu}{4,}/u.test(bez) && bez === bez.toUpperCase() && /\p{L}/u.test(bez)) pridej('nadpis velkými písmeny', nadpis[1])
    }
    const male = r.toLowerCase()
    for (const s of ZAKAZANA_SLOVA) if (new RegExp(`(^|[^\\p{L}])${s}([^\\p{L}]|$)`, 'u').test(male)) pridej(`zakázané slovo „${s}“`, s)
    for (const k of KONKURENCE) if (r.includes(k)) pridej(`jméno konkurence ${k}`, k)
    for (const m of r.matchAll(/tvoříme\s+kód\w*\s+pro\s+lidi\.?/giu)) if (m[0] !== HESLO) pridej('heslo upravené', m[0])
    for (const m of r.matchAll(/(\d+(?:[,.]\d+)?)\s?%/g)) if (!registr.includes(`${m[1]} %`) && !registr.includes(`${m[1]}%`)) pridej('procento bez záznamu v registru', m[0])
    if (r.includes('CENIK_ZVEREJNIT')) pridej('proměnná CENIK_ZVEREJNIT', 'CENIK_ZVEREJNIT')
  })
  return nalezy
}

/** Řádky registru tvrzení z tabulek v Markdownu. */
export function radkyRegistru(md) {
  return md
    .split('\n')
    .filter((r) => r.startsWith('|') && !/^\|\s*-/.test(r) && !/^\|\s*Tvrzení\s*\|/.test(r))
    .map((r) => r.split('|').slice(1, -1).map((x) => x.trim()))
    .filter((b) => b.length === 5)
    .map(([tvrzeni, stranka, zdroj, datum, stav]) => ({ tvrzeni, stranka, zdroj, datum, stav }))
}

const STAVY = new Set(['overeno', 'orientacni', 'hypoteza', 'neovereno'])

/** Chyby registru: neznámý stav, `overeno` a `orientacni` bez zdroje nebo data. */
export function chybyRegistru(radky) {
  const chyby = []
  for (const r of radky) {
    if (!STAVY.has(r.stav)) chyby.push(`neznámý stav „${r.stav}“: ${r.tvrzeni}`)
    if ((r.stav === 'overeno' || r.stav === 'orientacni') && (!r.zdroj || !/^\d{4}-\d{2}-\d{2}$/.test(r.datum))) chyby.push(`${r.stav} bez zdroje nebo data: ${r.tvrzeni}`)
  }
  return chyby
}

/** Zbylá místa k doplnění: [DOPLNIT…] a [OVĚŘIT…]. */
export function mistaDoplnit(text) {
  const vysledek = []
  text.split('\n').forEach((r, i) => {
    for (const m of r.matchAll(/\[(DOPLNIT|OVĚŘIT)[^\]]*\]/g)) vysledek.push({ radek: i + 1, text: m[0] })
  })
  return vysledek
}
