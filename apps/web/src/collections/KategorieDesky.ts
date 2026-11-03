import type { CollectionConfig, TextFieldValidation } from 'payload'
import { isAdmin, isStaff } from '../access/roles'
import { obnovit } from '../lib/revalidate'

const slugTvar: TextFieldValidation = (value) =>
  !value || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? true : 'Jen malá písmena bez diakritiky, číslice a pomlčky.'

/** Categories for the filter on úřední deska, e.g. Rozpočet, Vyhlášky, Doprava. */
export const KategorieDesky: CollectionConfig = {
  slug: 'kategorie-desky',
  labels: { singular: 'Kategorie desky', plural: 'Kategorie desky' },
  admin: { group: 'Nastavení', useAsTitle: 'nazev', defaultColumns: ['nazev', 'slug', 'poradi'] },
  defaultSort: 'poradi',
  access: { read: () => true, create: isStaff, update: isStaff, delete: isAdmin },
  fields: [
    { name: 'nazev', label: 'Název', type: 'text', required: true, unique: true, maxLength: 60 },
    { name: 'slug', label: 'Adresa ve filtru', type: 'text', required: true, unique: true, maxLength: 60, validate: slugTvar },
    { name: 'poradi', label: 'Pořadí', type: 'number', defaultValue: 100, min: 0, max: 1000 },
  ],
  hooks: { afterChange: [() => obnovit(['deska'], ['/uredni-deska'])] },
}
