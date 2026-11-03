import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cs } from '@payloadcms/translations/languages/cs'
import { buildConfig } from 'payload'
import { Aktuality } from './collections/Aktuality'
import { Dokumenty } from './collections/Dokumenty'
import { KategorieDesky } from './collections/KategorieDesky'
import { KrizovaHlaseni } from './collections/KrizovaHlaseni'
import { Media } from './collections/Media'
import { UredniDeska } from './collections/UredniDeska'
import { Users } from './collections/Users'
import { Zastupitele } from './collections/Zastupitele'

const dirname = path.dirname(fileURLToPath(import.meta.url))

function secret(): string {
  const value = process.env.PAYLOAD_SECRET
  if (!value && process.env.NODE_ENV === 'production') throw new Error('Chybí PAYLOAD_SECRET.')
  return value ?? 'jen-pro-vyvoj-nepouzivat'
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' | CodeKom' },
  },
  collections: [Aktuality, UredniDeska, KategorieDesky, KrizovaHlaseni, Zastupitele, Dokumenty, Media, Users],
  editor: lexicalEditor(),
  secret: secret(),
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? '',
  i18n: { supportedLanguages: { cs }, fallbackLanguage: 'cs' },
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? '',
      max: Number(process.env.DATABASE_POOL_MAX ?? 5),
    },
    // Own schema, not exposed through the Supabase Data API. Generated migrations name it
    // literally, so it is a constant, not an environment variable.
    schemaName: 'obec',
    migrationDir: path.resolve(dirname, 'migrations'),
    push: false,
  }),
})
