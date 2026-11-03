import type { CollectionConfig, TextFieldValidation } from 'payload'
import { hasRole, isStaff } from '../access/roles'
import { obnovit } from '../lib/revalidate'

const telefon: TextFieldValidation = (value) =>
  !value || /^\+?[\d\s]{9,17}$/.test(value) ? true : 'Telefon zadejte jako 376 123 456 nebo +420 376 123 456.'

export const FUNKCE = [
  { label: 'Starosta nebo starostka', value: 'starosta' },
  { label: 'Místostarosta nebo místostarostka', value: 'mistostarosta' },
  { label: 'Člen rady', value: 'radni' },
  { label: 'Zastupitel nebo zastupitelka', value: 'zastupitel' },
] as const

/** Members of the municipal council. Publish only official contacts, never private ones. */
export const Zastupitele: CollectionConfig = {
  slug: 'zastupitele',
  labels: { singular: 'Zastupitel', plural: 'Zastupitelé' },
  admin: {
    group: 'Úřad',
    useAsTitle: 'jmeno',
    defaultColumns: ['jmeno', 'funkce', 'email', 'aktivni'],
    description: 'Uvádějte jen služební e-mail a telefon. Soukromé kontakty na web nepatří.',
  },
  defaultSort: 'poradi',
  access: {
    read: ({ req }) => (hasRole(req.user, 'admin', 'redaktor') ? true : { aktivni: { equals: true } }),
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'titulPred', label: 'Titul před', type: 'text', maxLength: 30, admin: { width: '20%' } },
        { name: 'jmeno', label: 'Jméno a příjmení', type: 'text', required: true, maxLength: 120, admin: { width: '60%' } },
        { name: 'titulZa', label: 'Titul za', type: 'text', maxLength: 30, admin: { width: '20%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'funkce', label: 'Funkce', type: 'select', required: true, defaultValue: 'zastupitel', options: [...FUNKCE], admin: { width: '50%' } },
        { name: 'vybory', label: 'Výbory a komise', type: 'text', maxLength: 160, admin: { width: '50%', description: 'Například předseda kontrolního výboru' } },
      ],
    },
    { name: 'zvolenZa', label: 'Zvolen za', type: 'text', maxLength: 160 },
    {
      type: 'row',
      fields: [
        { name: 'email', label: 'Služební e-mail', type: 'email', admin: { width: '50%' } },
        { name: 'telefon', label: 'Služební telefon', type: 'text', validate: telefon, admin: { width: '50%' } },
      ],
    },
    { name: 'uredniHodiny', label: 'Kdy je k zastižení', type: 'text', maxLength: 160 },
    { name: 'foto', label: 'Fotografie', type: 'upload', relationTo: 'media' },
    {
      type: 'row',
      fields: [
        { name: 'obdobi', label: 'Volební období', type: 'text', defaultValue: '2026–2030', maxLength: 20, admin: { width: '33%' } },
        { name: 'poradi', label: 'Pořadí na webu', type: 'number', defaultValue: 100, min: 0, max: 1000, admin: { width: '33%' } },
        { name: 'aktivni', label: 'Ve funkci', type: 'checkbox', defaultValue: true, index: true, admin: { width: '33%' } },
      ],
    },
  ],
  hooks: {
    afterChange: [() => obnovit(['zastupitele'], ['/obec/zastupitelstvo'])],
    afterDelete: [() => obnovit(['zastupitele'], ['/obec/zastupitelstvo'])],
  },
}
