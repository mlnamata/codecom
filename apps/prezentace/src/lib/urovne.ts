/**
 * Tři úrovně editoru. Zdroj: docs/navrh-platformy/04-admin-editor.md (stav ke 4. 11. 2026).
 * Ceny jsou orientační „od“, viz cenik.ts.
 */
import { CENY_WEBU, type KlicUrovne } from './cenik'

export interface Uroven {
  klic: KlicUrovne
  nazev: string
  princip: string
  popis: string
  proKoho: string
  uzivatele: string
  ceny: [number, number, number]
  coUdelate: string[]
  obrazovky: { nazev: string; popis: string }[]
  podpora: string
}

export const UROVNE: Uroven[] = [
  {
    klic: 'zaklad',
    nazev: 'Základ',
    princip: 'Píšu obsah',
    popis:
      'Články, akce, úřední deska a dokumenty jdou do pevných míst šablony. Rozvržení se nemění, takže web nejde rozbít.',
    proKoho: 'Starosta nebo účetní, který má na web jednu až dvě hodiny týdně.',
    uzivatele: '3 uživatelé',
    ceny: CENY_WEBU.zaklad,
    coUdelate: [
      'Napíšete článek, akci nebo hlášení a vyberete, kam půjde: web, oznámení v aplikaci, e-mail.',
      'Vyvěsíte dokument na úřední desku. Datum sejmutí se dopočítá a záznam o vyvěšení se uloží.',
      'Naplánujete zveřejnění dopředu a obsah se po termínu sám skryje.',
      'Přejmenujete a přeskládáte položky hlavního menu.',
      'Zvolíte znak obce a jednu ze 3 barevných variant šablony.',
      'Vytvoříte až 30 podstránek ze 3 pevných typů: text, rozcestník, kontakt.',
      'Obnovíte starší verzi stránky až 30 dní zpátky.',
    ],
    obrazovky: [
      { nazev: 'Přehled', popis: 'Co se brzy sejme z desky, blížící se zákonné lhůty a skóre přístupnosti webu.' },
      { nazev: 'Editor článku', popis: 'Kontrola před zveřejněním zablokuje článek, dokud v něm je soukromé telefonní číslo.' },
      { nazev: 'Úřední deska', popis: 'Vyvěšení s automatickým datem sejmutí, archiv a záznam o vyvěšení.' },
    ],
    podpora: 'E-mail s odpovědí do 2 pracovních dnů, video kurz.',
  },
  {
    klic: 'pokrocily',
    nazev: 'Pokročilý',
    princip: 'Skládám stránky',
    popis:
      'Na stránky přidáváte a přeskládáte bloky z knihovny, upravujete menu, funguje schvalování před zveřejněním a podweby organizací obce.',
    proKoho: 'Obec s administrativou, spolky a školou, kde na webu pracuje víc lidí.',
    uzivatele: '10 uživatelů',
    ceny: CENY_WEBU.pokrocily,
    coUdelate: [
      'Vše ze Základu.',
      'Poskládáte úvodní stránku z bloků: přesunete je, skryjete nebo přidáte z knihovny.',
      'Přidáte do menu nové položky a vnoříte je do dvou úrovní.',
      'Zapnete schvalování: redaktor napíše, starosta schválí nebo vrátí s komentářem.',
      'Dáte škole, školce nebo hasičům vlastní podweb s jejich redaktorem (3 podweby).',
      'Nastavíte vlastní hlavní barvu. Editor hned spočítá kontrast a slabou barvu nepustí.',
      'Použijete opakované bloky, například kontakt na úřad na více stránkách najednou.',
      'Necháte AI navrhnout zkrácení článku nebo verzi v prostém jazyce.',
    ],
    obrazovky: [
      { nazev: 'Skladatel úvodní stránky', popis: 'Bloky jde přesouvat, skrývat a přidávat. Bloky z Advance jsou zamčené.' },
      { nazev: 'Ke schválení', popis: 'Fronta příspěvků, které čekají na schválení, s možností vrátit s komentářem.' },
      { nazev: 'Stránky a menu', popis: 'Strom stránek, pořadí a skrytí stránky z menu.' },
    ],
    podpora: 'E-mail a telefon s odpovědí do 1 pracovního dne, 1 hodina školení online.',
  },
  {
    klic: 'advance',
    nazev: 'Advance',
    princip: 'Upravuji skoro vše',
    popis:
      'Volné rozvržení sekcí a sloupců, vlastní typy stránek, barvy, písma a tvary, vlastní kód v pískovišti a AI asistent na webu.',
    proKoho: 'Město nebo obec s člověkem, který má na starosti komunikaci.',
    uzivatele: 'Neomezeně uživatelů',
    ceny: CENY_WEBU.advance,
    coUdelate: [
      'Vše z Pokročilého.',
      'Rozvrhnete sekce stránky do 1 až 4 sloupců s náhledem pro mobil, tablet a počítač.',
      'Upravíte všech 12 barev šablony, písmo, zaoblení a hustotu. Kontrast se počítá živě.',
      'Vložíte vlastní kód do pískoviště, ze kterého nemůže rozbít zbytek webu.',
      'Zapnete AI asistenta, který občanům odpovídá z dokumentů obce a cituje je.',
      'Nastavíte vlastní role a oprávnění po sekcích webu a vícestupňové schválení.',
      'Dáte podweb každé organizaci obce, bez omezení počtu.',
    ],
    obrazovky: [
      { nazev: 'Vzhled', popis: 'Živý náhled podle barvy, písma, zaoblení a hustoty. Žlutá ze znaku neprojde kontrolou kontrastu a editor nabídne tmavší.' },
      { nazev: 'Rozvržení sekcí', popis: 'Počet sloupců v sekcích a náhled pro tři velikosti obrazovky.' },
      { nazev: 'AI asistent', popis: 'Které dokumenty asistent čte, jak se představí a co odpověděl.' },
    ],
    podpora: 'Vlastní kontakt s odpovědí do 4 hodin, 2 hodiny školení na místě.',
  },
]

export type Hodnota = string | boolean

export interface RadekMatice {
  oblast: string
  funkce: string
  hodnoty: [Hodnota, Hodnota, Hodnota]
}

/** Matice funkcí z návrhu editoru. Každá vyšší úroveň obsahuje vše z nižší. */
export const MATICE: RadekMatice[] = [
  { oblast: 'Obsah', funkce: 'Články, akce, dokumenty, fotogalerie, zpravodaj', hodnoty: [true, true, true] },
  { oblast: 'Obsah', funkce: 'Naplánované zveřejnění a automatické skrytí', hodnoty: [true, true, true] },
  { oblast: 'Obsah', funkce: 'Historie verzí a obnovení', hodnoty: ['30 dní', '1 rok', 'neomezeně'] },
  { oblast: 'Obsah', funkce: 'Opakovaně použitelné bloky', hodnoty: [false, true, true] },
  { oblast: 'Stránky', funkce: 'Nové podstránky', hodnoty: ['do 30', 'neomezeně', 'neomezeně'] },
  { oblast: 'Stránky', funkce: 'Rozvržení stránky', hodnoty: ['3 pevné typy', 'bloky z knihovny pod sebou', 'volné sekce, 1–4 sloupce'] },
  { oblast: 'Stránky', funkce: 'Úprava hlavního menu', hodnoty: ['přejmenovat a přeskládat', 'přidat a vnořit, 2 úrovně', 'mega menu, 3 úrovně'] },
  { oblast: 'Stránky', funkce: 'Úvodní stránka', hodnoty: ['obsah do pevných bloků', 'přeskládat, skrýt a přidat bloky', 'volně'] },
  { oblast: 'Vzhled', funkce: 'Znak, barvy a fotky', hodnoty: ['znak a 1 ze 3 palet', 'vlastní hlavní barva', 'všech 12 barev'] },
  { oblast: 'Vzhled', funkce: 'Změna šablony', hodnoty: ['jednou ročně zdarma', 'kdykoli', 'kdykoli a vlastní varianta'] },
  { oblast: 'Vzhled', funkce: 'Vlastní CSS a HTML', hodnoty: [false, false, 'v pískovišti s kontrolou přístupnosti'] },
  { oblast: 'Povinné', funkce: 'Úřední deska s archivem a záznamem o vyvěšení', hodnoty: [true, true, true] },
  { oblast: 'Povinné', funkce: 'Povinné informace, prohlášení o přístupnosti, GDPR', hodnoty: [true, true, true] },
  { oblast: 'Povinné', funkce: 'Kontrola přístupnosti před publikací', hodnoty: ['blokuje', 'blokuje', 'blokuje'] },
  { oblast: 'Povinné', funkce: 'Hlídání lhůt (rozpočet, závěrečný účet, sejmutí z desky)', hodnoty: [true, true, true] },
  { oblast: 'Uživatelé', funkce: 'Počet uživatelů', hodnoty: ['3', '10', 'neomezeně'] },
  { oblast: 'Uživatelé', funkce: 'Role', hodnoty: ['správce, redaktor', 'a schvalovatel, deska, redaktor organizace', 'a vlastní role po sekcích'] },
  { oblast: 'Uživatelé', funkce: 'Schvalování před zveřejněním', hodnoty: [false, true, 'vícestupňové'] },
  { oblast: 'Uživatelé', funkce: 'Dvoufaktorové přihlášení', hodnoty: ['povinné pro správce', 'povinné pro správce a desku', 'a přihlášení účtem Microsoft nebo Google obce'] },
  { oblast: 'Organizace', funkce: 'Podweby (škola, MŠ, knihovna, hasiči)', hodnoty: [false, '3', 'neomezeně'] },
  { oblast: 'Komunikace', funkce: 'Oznámení v aplikaci a e-mail', hodnoty: [true, true, true] },
  { oblast: 'Komunikace', funkce: 'SMS', hodnoty: ['předplacené kredity', 'kredity', 'kredity a cílení podle části obce'] },
  { oblast: 'Komunikace', funkce: 'Ankety a participativní rozpočet', hodnoty: [false, 'ankety', 'obojí'] },
  { oblast: 'Jazyky', funkce: 'Jazykové verze', hodnoty: [false, '1 jazyk', 'neomezeně'] },
  { oblast: 'Data', funkce: 'Rozpočet z účetnictví', hodnoty: [false, true, true] },
  { oblast: 'Data', funkce: 'API a webhooky', hodnoty: [false, false, true] },
  { oblast: 'AI', funkce: 'Alt texty, kontrola osobních údajů, oprava pravopisu', hodnoty: [true, true, true] },
  { oblast: 'AI', funkce: 'Psaní a zkracování článků, verze v prostém jazyce', hodnoty: [false, true, true] },
  { oblast: 'AI', funkce: 'AI asistent na webu', hodnoty: [false, false, true] },
  { oblast: 'Podpora', funkce: 'Kanály a odezva', hodnoty: ['e-mail, 2 pracovní dny', 'a telefon, 1 den', 'vlastní kontakt, 4 hodiny'] },
  { oblast: 'Podpora', funkce: 'Školení', hodnoty: ['video kurz', '1 hodina online', '2 hodiny na místě'] },
]

export const ROLE: { role: string; coSmi: string; od: string }[] = [
  { role: 'Správce obce', coSmi: 'vše včetně uživatelů, vzhledu a nastavení', od: 'Základ' },
  { role: 'Redaktor', coSmi: 'psát a upravovat obsah; v Základu i zveřejnit', od: 'Základ' },
  { role: 'Schvalovatel', coSmi: 'schválit, vrátit s komentářem, zveřejnit', od: 'Pokročilý' },
  { role: 'Úřední deska', coSmi: 'vyvěšovat a snímat dokumenty (v Základu to dělá správce)', od: 'Pokročilý' },
  { role: 'Redaktor organizace', coSmi: 'jen obsah svého podwebu (škola, hasiči)', od: 'Pokročilý' },
  { role: 'Vlastní role', coSmi: 'libovolná kombinace oprávnění po sekcích', od: 'Advance' },
]

export const BLOKY: { nazev: string; k: string; od: string }[] = [
  { nazev: 'Text s nadpisy a odkazy', k: 'základ každé stránky', od: 'Základ' },
  { nazev: 'Obrázek s popiskem', k: 'fotka s povinným alt textem', od: 'Základ' },
  { nazev: 'Galerie', k: 'alba z akcí', od: 'Základ' },
  { nazev: 'Seznam dokumentů', k: 'PDF a DOCX s velikostí a datem', od: 'Základ' },
  { nazev: 'Kontaktní karta', k: 'osoba nebo odbor, telefon, e-mail, hodiny', od: 'Základ' },
  { nazev: 'Upozornění', k: 'rámeček info, varování, důležité', od: 'Základ' },
  { nazev: 'Tabulka', k: 'jednoduchá tabulka se záhlavím', od: 'Základ' },
  { nazev: 'Otázky a odpovědi', k: 'rozbalovací seznam', od: 'Pokročilý' },
  { nazev: 'Tlačítko s výzvou', k: 'Objednat se, Zaplatit, Podat žádost', od: 'Pokročilý' },
  { nazev: 'Mapa s body', k: 'místo nebo trasa z mapových vrstev obce', od: 'Pokročilý' },
  { nazev: 'Formulář', k: 'přihláška, podnět, s ochranou proti spamu', od: 'Pokročilý' },
  { nazev: 'Časová osa', k: 'historie obce, postup stavby', od: 'Pokročilý' },
  { nazev: 'Odpočet', k: 'do akce nebo uzávěrky', od: 'Pokročilý' },
  { nazev: 'Sloupce a sekce s pozadím', k: 'obsah ve 2 až 4 sloupcích', od: 'Advance' },
  { nazev: 'Vložený kód', k: 'HTML třetí strany po kontrole', od: 'Advance' },
]

export const najdiUroven = (klic: string) => UROVNE.find((u) => u.klic === klic)
