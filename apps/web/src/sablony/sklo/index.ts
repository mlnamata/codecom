// Skleněná šablona 21 Sklo. Psaná ručně, generátor design/generator/do-tsx.py ji zatím nezná ([DOPLNIT]).
import './styly.css'
import type { ModulSablony } from '../sdilene/typy'
import { tridyPisem } from './fonty'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'
import { Uvod } from './Uvod'

const modul: ModulSablony = {
  klic: 'sklo',
  tridyPisem,
  pismo: 'var(--font-plus-jakarta-sans), system-ui, sans-serif',
  temaHlavicky: 'bg',
  Hlavicka,
  Paticka,
  Uvod,
  foto: true,
}

export default modul
