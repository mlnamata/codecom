// Skleněná šablona 23 Bellatrix. Psaná ručně, generátor design/generator/do-tsx.py ji zatím nezná ([DOPLNIT]).
import './styly.css'
import type { ModulSablony } from '../sdilene/typy'
import { tridyPisem } from './fonty'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'
import { Uvod } from './Uvod'

const modul: ModulSablony = {
  klic: 'aurora',
  tridyPisem,
  pismo: 'var(--font-manrope), system-ui, sans-serif',
  temaHlavicky: 'bg',
  Hlavicka,
  Paticka,
  Uvod,
  foto: true,
}

export default modul
