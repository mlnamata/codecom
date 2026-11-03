import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Expire cached pages after an editor changes content. Crisis alerts must show at once,
 * so tags expire immediately instead of serving stale data while revalidating.
 * Outside a Next.js request (CLI, migrations, seed scripts) there is nothing to purge.
 */
export function obnovit(tags: string[], paths: string[] = []): void {
  try {
    for (const tag of tags) revalidateTag(tag, { expire: 0 })
    for (const path of paths) revalidatePath(path)
  } catch (error) {
    if (process.env.NODE_ENV !== 'test') {
      console.warn('[obnovit] mezipaměť nebyla obnovena:', (error as Error).message)
    }
  }
}
