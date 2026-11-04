/** Typy pro scripts/unslop.mjs. */
export const PRAVIDLA: { nazev: string; re: RegExp }[]
export function zkontrolujText(text: string, pripona: string): { pravidlo: string; index: number }[]
