// Skleněná šablona 22 Achernar. Psaná ručně, generátor design/generator/do-tsx.py ji zatím nezná ([DOPLNIT]).
import './styly.css'
import type { ModulSablony } from '../sdilene/typy'
import { tridyPisem } from './fonty'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'
import { Uvod } from './Uvod'

const modul: ModulSablony = {
  klic: 'noc',
  tridyPisem,
  pismo: 'var(--font-inter), system-ui, sans-serif',
  temaHlavicky: 'bg',
  Hlavicka,
  Paticka,
  Uvod,
  foto: true,
}

export default modul
