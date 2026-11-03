import type { CollectionConfig, DateFieldValidation, TextFieldValidation } from 'payload'
import { isAdmin, isStaff, publishedOr } from '../access/roles'
import { bezpecnyOdkaz, UROVEN_VOLBY } from '../lib/krize'
import { obnovit } from '../lib/revalidate'

const poZacatku: DateFieldValidation = (value, { siblingData }) => {
  const od = (siblingData as { platiOd?: string | null }).platiOd
  if (value && od && new Date(value as string).getTime() <= new Date(od).getTime()) {
    return 'Konec platnosti musí být později než začátek.'
  }
  return true
}

const platnyOdkaz: TextFieldValidation = (value, { siblingData }) => {
  const text = (siblingData as { odkazText?: string | null }).odkazText
  if (!value) return text ? 'Doplňte adresu odkazu, nebo smažte jeho text.' : true
  return bezpecnyOdkaz(value) ? true : 'Zadejte adresu začínající https:// nebo cestu na webu obce, například /voda.'
}

/**
 * One alert = one situation. The website shows only the most serious active alert,
 * so editors never have to manage several banners at once.
 */
export const KrizovaHlaseni: CollectionConfig = {
  slug: 'krizova-hlaseni',
  labels: { singular: 'Krizové hlášení', plural: 'Krizová hlášení' },
  admin: {
    group: 'Úřad',
    useAsTitle: 'titulek',
    defaultColumns: ['titulek', 'uroven', 'platiOd', 'platiDo', '_status'],
    description:
      'Na webu je vidět vždy jen jedno, to nejzávažnější. Krizovou situaci nejde na webu zavřít, informaci a výstrahu ano.',
  },
  defaultSort: '-platiOd',
  versions: { drafts: true, maxPerDoc: 50 },
  access: {
    read: publishedOr(),
    create: isStaff,
    update: isStaff,
    delete: isAdmin,
  },
  indexes: [{ fields: ['platiOd', 'platiDo'] }],
  fields: [
    {
      name: 'uroven',
      label: 'Závažnost',
      type: 'select',
      required: true,
      defaultValue: 'info',
      options: UROVEN_VOLBY,
      admin: { position: 'sidebar' },
    },
    {
      name: 'titulek',
      label: 'Co se děje (jedna věta)',
      type: 'text',
      required: true,
      maxLength: 90,
      admin: { description: 'Například: nepijte vodu z obecního vodovodu' },
    },
    {
      name: 'text',
      label: 'Co mají lidé udělat',
      type: 'textarea',
      required: true,
      maxLength: 300,
    },
    {
      type: 'row',
      fields: [
        { name: 'odkazText', label: 'Text odkazu', type: 'text', maxLength: 60, admin: { width: '40%' } },
        { name: 'odkazUrl', label: 'Adresa odkazu', type: 'text', validate: platnyOdkaz, admin: { width: '60%' } },
      ],
    },
    {
      name: 'tykaSe',
      label: 'Týká se jen části obce',
      type: 'text',
      maxLength: 120,
      admin: { description: 'Prázdné znamená celou obec.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'platiOd',
          label: 'Platí od',
          type: 'date',
          required: true,
          index: true,
          defaultValue: () => new Date().toISOString(),
          admin: { width: '50%', date: { pickerAppearance: 'dayAndTime', displayFormat: 'd. M. yyyy H:mm' } },
        },
        {
          name: 'platiDo',
          label: 'Platí do',
          type: 'date',
          index: true,
          validate: poZacatku,
          admin: {
            width: '50%',
            date: { pickerAppearance: 'dayAndTime', displayFormat: 'd. M. yyyy H:mm' },
            description: 'Prázdné znamená do odvolání. Až situace skončí, doplňte konec.',
          },
        },
      ],
    },
    {
      name: 'kanaly',
      label: 'Kam hlášení poslat',
      type: 'select',
      hasMany: true,
      defaultValue: ['web', 'aplikace'],
      options: [
        { label: 'Web', value: 'web' },
        { label: 'Mobilní aplikace', value: 'aplikace' },
        { label: 'SMS', value: 'sms' },
        { label: 'Rozhlas', value: 'rozhlas' },
      ],
      admin: { position: 'sidebar', description: 'SMS a rozhlas odesílá napojená služba po zveřejnění.' },
    },
  ],
  hooks: {
    afterChange: [() => obnovit(['krize'], ['/krizova-hlaseni'])],
    afterDelete: [() => obnovit(['krize'], ['/krizova-hlaseni'])],
  },
}
