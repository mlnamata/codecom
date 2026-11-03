import type { CollectionConfig, FieldHook } from 'payload'
import { isStaff, publishedOr } from '../access/roles'
import { obnovit } from '../lib/revalidate'
import { slugify } from '../lib/slug'

const slugZTitulku: FieldHook = ({ value, data, operation }) => {
  if (typeof value === 'string' && value.trim()) return slugify(value)
  if (operation === 'create' && typeof data?.titulek === 'string') return slugify(data.titulek)
  return value
}

/** News and blog posts. Published posts appear from their publication time. */
export const Aktuality: CollectionConfig = {
  slug: 'aktuality',
  labels: { singular: 'Aktualita', plural: 'Aktuality' },
  admin: {
    group: 'Obsah',
    useAsTitle: 'titulek',
    defaultColumns: ['titulek', 'rubrika', 'publikovano', '_status'],
  },
  defaultSort: '-publikovano',
  versions: { drafts: true, maxPerDoc: 30 },
  access: {
    read: publishedOr(() => ({ publikovano: { less_than_equal: new Date().toISOString() } })),
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    { name: 'titulek', label: 'Titulek', type: 'text', required: true, maxLength: 120 },
    {
      name: 'slug',
      label: 'Adresa článku',
      type: 'text',
      unique: true,
      index: true,
      hooks: { beforeValidate: [slugZTitulku] },
      admin: { position: 'sidebar', description: 'Vyplní se sama z titulku.' },
    },
    { name: 'perex', label: 'Perex', type: 'textarea', required: true, maxLength: 300 },
    { name: 'obsah', label: 'Text článku', type: 'richText', required: true },
    { name: 'obrazek', label: 'Obrázek', type: 'upload', relationTo: 'media' },
    {
      name: 'rubrika',
      label: 'Rubrika',
      type: 'select',
      required: true,
      defaultValue: 'zpravy',
      index: true,
      options: [
        { label: 'Zprávy z obce', value: 'zpravy' },
        { label: 'Oznámení', value: 'oznameni' },
        { label: 'Kultura a spolky', value: 'kultura' },
        { label: 'Zpravodaj', value: 'zpravodaj' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publikovano',
      label: 'Zveřejnit od',
      type: 'date',
      required: true,
      index: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime', displayFormat: 'd. M. yyyy H:mm' } },
    },
    {
      name: 'autor',
      label: 'Autor',
      type: 'relationship',
      relationTo: 'users',
      defaultValue: ({ user }) => user?.id,
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    afterChange: [({ doc }) => obnovit(['aktuality'], ['/', '/aktuality', `/aktuality/${doc.slug}`])],
    afterDelete: [() => obnovit(['aktuality'], ['/', '/aktuality'])],
  },
}
