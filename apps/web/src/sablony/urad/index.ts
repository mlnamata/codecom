// Vygenerováno skriptem design/generator/do-tsx.py.
import './styly.css'
import type { ModulSablony } from '../sdilene/typy'
import { tridyPisem } from './fonty'
import { Hlavicka } from './Hlavicka'
import { Paticka } from './Paticka'
import { Uvod } from './Uvod'
import { StavSablony } from './Interaktivni'

const modul: ModulSablony = {
  klic: 'urad',
  tridyPisem,
  pismo: "var(--font-roboto), Arial, sans-serif",
  temaHlavicky: 'bg',
  Hlavicka,
  Paticka,
  Uvod: Uvod as ModulSablony['Uvod'],
  foto: true,
  Stav: StavSablony,
}

export default modul
