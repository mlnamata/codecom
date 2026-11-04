// Vygenerováno skriptem design/generator/do-tsx.py.
import './styly.css'
import type { ModulSablony } from '../sdilene/typy'
import { tridyPisem } from './fonty'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'
import { Uvod } from './Uvod'

const modul: ModulSablony = {
  klic: 'rynek',
  tridyPisem,
  pismo: "var(--font-hanken-grotesk), system-ui, sans-serif",
  temaHlavicky: 'bg',
  Hlavicka,
  Paticka,
  Uvod: Uvod as ModulSablony['Uvod'],
  foto: true,
}

export default modul
