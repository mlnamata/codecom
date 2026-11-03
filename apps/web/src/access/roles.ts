import type { Access, FieldAccess, Where } from 'payload'

/** Roles of people who sign in to the admin. Citizens never sign in here. */
export type Role = 'admin' | 'redaktor'

/** `req.user` is typed per collection; only the `roles` array matters here. */
export const hasRole = (user: unknown, ...roles: Role[]): boolean => {
  const own = (user as { roles?: unknown } | null | undefined)?.roles
  return Array.isArray(own) && own.some((r) => roles.includes(r as Role))
}

/** Signed-in staff (admin or redaktor). */
export const isStaff: Access = ({ req }) => hasRole(req.user, 'admin', 'redaktor')

export const isAdmin: Access = ({ req }) => hasRole(req.user, 'admin')

export const isAdminField: FieldAccess = ({ req }) => hasRole(req.user, 'admin')

/**
 * Staff see everything, including drafts. The public sees only published documents,
 * optionally narrowed by an extra condition (for example "already posted").
 */
export const publishedOr =
  (extra?: () => Where): Access =>
  ({ req }) => {
    if (hasRole(req.user, 'admin', 'redaktor')) return true
    const published: Where = { _status: { equals: 'published' } }
    return extra ? { and: [published, extra()] } : published
  }
