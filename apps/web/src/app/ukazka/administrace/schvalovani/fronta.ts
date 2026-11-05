/**
 * Výchozí fronta příspěvků ke schválení v ukázce. Obrazovka Ke schválení ji mění jen v prohlížeči,
 * přehled z ní počítá, kolik příspěvků čeká.
 */
export interface Prispevek {
  id: number
  nazev: string
  autor: string
  kde: string
  stav: 'ceka' | 'schvaleno' | 'vraceno'
  komentar?: string
}

export const FRONTA: Prispevek[] = [
  { id: 1, nazev: 'Pozvánka na lampionový průvod', autor: 'Redaktorka, spolek Javořáček', kde: 'Akce', stav: 'ceka' },
  { id: 2, nazev: 'Zápis do mateřské školy 2027', autor: 'Ředitelka MŠ', kde: 'Podweb Mateřská škola', stav: 'ceka' },
  { id: 3, nazev: 'Výsledky sběru nebezpečného odpadu', autor: 'Účetní obce', kde: 'Aktuality', stav: 'ceka' },
]
