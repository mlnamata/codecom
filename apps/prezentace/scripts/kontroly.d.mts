export declare const HESLO: string
export declare const ZAKAZANA_SLOVA: string[]
export declare const KONKURENCE: string[]
export declare function citelnyText(md: string): string
export declare function zkontrolujText(text: string, registr?: string): { pravidlo: string; ukazka: string; radek: number }[]
export declare function radkyRegistru(md: string): { tvrzeni: string; stranka: string; zdroj: string; datum: string; stav: string }[]
export declare function chybyRegistru(radky: { tvrzeni: string; zdroj: string; datum: string; stav: string }[]): string[]
export declare function mistaDoplnit(text: string): { radek: number; text: string }[]
