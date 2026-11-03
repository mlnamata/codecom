import type { CollectionConfig } from 'payload'
import { isStaff } from '../access/roles'

/** Images for news and portraits. Alternative text is required for accessibility. */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Obrázek', plural: 'Obrázky' },
  admin: { group: 'Obsah', useAsTitle: 'alt' },
  access: { read: () => true, create: isStaff, update: isStaff, delete: isStaff },
  upload: { mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] },
  fields: [
    {
      name: 'alt',
      label: 'Co je na obrázku',
      type: 'text',
      required: true,
      maxLength: 200,
      admin: { description: 'Popis pro nevidomé, například Starostka Marie Šťastná na návsi.' },
    },
  ],
}
