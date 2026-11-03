import type { CollectionConfig } from 'payload'
import { isAdmin, isStaff } from '../access/roles'

/** Files attached to úřední deska. In production store them in Supabase Storage (S3 API). */
export const Dokumenty: CollectionConfig = {
  slug: 'dokumenty',
  labels: { singular: 'Soubor', plural: 'Soubory' },
  admin: { group: 'Obsah', useAsTitle: 'filename' },
  access: { read: () => true, create: isStaff, update: isStaff, delete: isAdmin },
  upload: {
    mimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png',
    ],
  },
  fields: [
    {
      name: 'popis',
      label: 'Popis souboru',
      type: 'text',
      maxLength: 160,
      admin: { description: 'Například Mapa objížďky. Čte ho i odečítač obrazovky.' },
    },
  ],
}
