// Vygenerováno skriptem design/generator/do-tsx.py.
import './styly.css'
import type { ModulSablony } from '../sdilene/typy'
import { tridyPisem } from './fonty'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'
import { Uvod } from './Uvod'

const modul: ModulSablony = {
  klic: 'mlyn',
  tridyPisem,
  pismo: "var(--font-barlow), system-ui, sans-serif",
  temaHlavicky: 'deep',
  Hlavicka,
  Paticka,
  Uvod: Uvod as ModulSablony['Uvod'],
  foto: false,
}

export default modul
