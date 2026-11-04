import type { Paleta } from '@codekom/tokeny'
import type { ComponentType, ReactNode } from 'react'

export interface PolozkaDesky {
  id: string
  nazev: string
  anotace: string
  kategorie: string
  vyvesenoOd: string
  vyvesenoDo: string | null
  href: string
}

/** Položky seznamů na úvodu. Šablona z nich vyplní vzor první položky návrhu. */
export interface DataUvodu {
  aktuality: { id: string; titulek: string; perex: string; publikovanoDen: string; href: string }[]
  deska: PolozkaDesky[]
  /** Sejmuté dokumenty, které smí do archivu (ne „Po sejmutí nezveřejňovat“). */
  deskaArchiv: PolozkaDesky[]
  kategorieDesky: { slug: string; nazev: string }[]
  akce: { id: string; nazev: string; popis: string; den: string; misto: string; href: string }[]
  rozhlas: { id: string; titulek: string; text: string; casDen: string; href: string }[]
  /** Předpřipravené odpovědi AI asistenta (ukázka, model se nevolá). */
  asistent: { otazka: string; odpoved: string; zdroje: { nazev: string; href: string }[] }[]
}

export interface PropsUvodu {
  banner: ReactNode
  data: DataUvodu
  foto: boolean
}

export interface ModulSablony {
  klic: string
  /** Třídy next/font s CSS proměnnými písem. */
  tridyPisem: string
  /** Hodnota font-family kořene šablony. */
  pismo: string
  /** Pozadí pásu s hlavičkou na vnitřních stránkách. */
  temaHlavicky: 'bg' | 'deep' | 'primary'
  Hlavicka: ComponentType
  Paticka: ComponentType
  Uvod: ComponentType<PropsUvodu>
  /** Má šablona úvodní ilustraci, kterou může nahradit fotografie? */
  foto: boolean
  /** Interaktivní šablony drží stav v kontextu pro hlavičku, úvod i patičku. */
  Stav?: ComponentType<{ paleta: Paleta; data: DataUvodu; children: ReactNode }>
}
