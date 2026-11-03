import type { CollectionConfig, DateFieldValidation } from 'payload'
import { hasRole, isStaff, publishedOr } from '../access/roles'
import { dayKeyOf, noonUtc, pragueDayKey, toStoredDay } from '../lib/datum'
import { obnovit } from '../lib/revalidate'

const poVyveseni: DateFieldValidation = (value, { siblingData }) => {
  const od = dayKeyOf((siblingData as { vyvesenoOd?: string | null }).vyvesenoOd)
  const doKdy = dayKeyOf(value as string | Date | null | undefined)
  if (od && doKdy && doKdy < od) return 'Poslední den vyvěšení nesmí být dřív než první den.'
  return true
}

/**
 * Elektronická úřední deska (§ 26 správního řádu). Documents are never hard-deleted by
 * editors: the municipality must be able to prove what hung on the board and when.
 * Versions keep the history of every change.
 */
export const UredniDeska: CollectionConfig = {
  slug: 'uredni-deska',
  labels: { singular: 'Dokument na úřední desce', plural: 'Úřední deska' },
  admin: {
    group: 'Úřad',
    useAsTitle: 'nazev',
    defaultColumns: ['nazev', 'kategorie', 'vyvesenoOd', 'vyvesenoDo', '_status'],
    listSearchableFields: ['nazev', 'cisloJednaci'],
    description: 'Dokumenty se zveřejní první den vyvěšení a po posledním dni se přesunou do archivu.',
  },
  defaultSort: '-vyvesenoOd',
  versions: { drafts: true, maxPerDoc: 50 },
  access: {
    // The public sees published documents from their first day on the board.
    read: publishedOr(() => ({ vyvesenoOd: { less_than_equal: noonUtc(pragueDayKey()) } })),
    create: isStaff,
    update: isStaff,
    // Only drafts can be deleted. A published document is ended, not erased; the database
    // refuses to delete anything that already hung on the board.
    delete: ({ req }) => (hasRole(req.user, 'admin') ? { _status: { equals: 'draft' } } : false),
  },
  indexes: [{ fields: ['vyvesenoOd', 'vyvesenoDo'] }],
  fields: [
    { name: 'nazev', label: 'Název dokumentu', type: 'text', required: true, maxLength: 300 },
    {
      type: 'row',
      fields: [
        {
          name: 'kategorie',
          label: 'Kategorie',
          type: 'relationship',
          relationTo: 'kategorie-desky',
          required: true,
          index: true,
          admin: { width: '50%' },
        },
        {
          name: 'cisloJednaci',
          label: 'Číslo jednací nebo spisová značka',
          type: 'text',
          maxLength: 80,
          index: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'puvodce',
      label: 'Kdo dokument vydal',
      type: 'text',
      required: true,
      maxLength: 160,
      admin: { description: 'Například Obec Javoří Lhota nebo Krajský úřad Plzeňského kraje.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'vyvesenoOd',
          label: 'Visí od',
          type: 'date',
          required: true,
          index: true,
          defaultValue: () => noonUtc(pragueDayKey()),
          admin: { width: '50%', date: { pickerAppearance: 'dayOnly', displayFormat: 'd. M. yyyy' } },
        },
        {
          name: 'vyvesenoDo',
          label: 'Visí do (včetně)',
          type: 'date',
          index: true,
          validate: poVyveseni,
          admin: {
            width: '50%',
            date: { pickerAppearance: 'dayOnly', displayFormat: 'd. M. yyyy' },
            description: 'Prázdné znamená do odvolání. Veřejná vyhláška musí viset nejméně 15 dní.',
          },
        },
      ],
    },
    {
      name: 'soubor',
      label: 'Dokument',
      type: 'upload',
      relationTo: 'dokumenty',
      required: true,
    },
    {
      name: 'prilohy',
      label: 'Přílohy',
      type: 'upload',
      relationTo: 'dokumenty',
      hasMany: true,
    },
    {
      name: 'anotace',
      label: 'Krátký popis pro občany',
      type: 'textarea',
      maxLength: 500,
    },
    {
      name: 'skrytPoSejmuti',
      label: 'Po sejmutí nezveřejňovat v archivu',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Zaškrtněte u dokumentů s osobními údaji. Po posledním dni zmizí z webu, v administraci zůstanou.',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if ('vyvesenoOd' in data) data.vyvesenoOd = toStoredDay(data.vyvesenoOd)
        if ('vyvesenoDo' in data) data.vyvesenoDo = toStoredDay(data.vyvesenoDo)
        if ('skrytPoSejmuti' in data) data.skrytPoSejmuti = data.skrytPoSejmuti === true
        return data
      },
    ],
    afterChange: [() => obnovit(['deska'], ['/uredni-deska'])],
    afterDelete: [() => obnovit(['deska'], ['/uredni-deska'])],
  },
}
