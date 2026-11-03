import type { CollectionConfig } from 'payload'
import { hasRole, isAdmin, isAdminField } from '../access/roles'

/** Staff accounts. Citizens do not sign in to the website admin. */
export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Uživatel', plural: 'Uživatelé' },
  admin: { group: 'Nastavení', useAsTitle: 'email', defaultColumns: ['jmeno', 'email', 'roles'] },
  auth: { tokenExpiration: 60 * 60 * 8, maxLoginAttempts: 5, lockTime: 15 * 60 * 1000 },
  access: {
    admin: ({ req }) => hasRole(req.user, 'admin', 'redaktor'),
    read: ({ req }) => (hasRole(req.user, 'admin') ? true : req.user ? { id: { equals: req.user.id } } : false),
    update: ({ req }) => (hasRole(req.user, 'admin') ? true : req.user ? { id: { equals: req.user.id } } : false),
    create: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'jmeno', label: 'Jméno a příjmení', type: 'text', required: true, maxLength: 120 },
    {
      name: 'roles',
      label: 'Role',
      type: 'select',
      hasMany: true,
      required: true,
      saveToJWT: true,
      defaultValue: ['redaktor'],
      options: [
        { label: 'Správce', value: 'admin' },
        { label: 'Redaktor', value: 'redaktor' },
      ],
      access: { create: isAdminField, update: isAdminField },
    },
  ],
}
