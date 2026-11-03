# Prompt: Digitální úřad

Použití: vlož celý tento soubor do Claude Code v kořeni repozitáře /home/claude/codecom.
Závisí na: 01 Web obce a CMS (multi-tenant, kolekce `obce`, `users` s rolemi, úřední deska), 02 Mobilní aplikace (kolekce `obcane`, přihlášení e-mailem a kódem, klient API z tohoto promptu), 04 IoT budovy (kolekce `budovy`, `planyVytapeni`, `pristupy`). Pokud některá závislost v repu ještě není, postav jen úzké rozhraní popsané níže a označ ho `[DOPLNIT: napojit na prompt 0X]`.

<kontext>
Samosprávné služby obce (poplatky, pronájem sálu, hlášení závad, obecný dotaz) obec poskytovat digitálně nemusí. Podle § 14 odst. 3 zákona č. 12/2020 Sb. (ZoPDS) je to její právo, ne povinnost. Povinnost digitálních služeb (od 1. 2. 2025, ověř) dopadá hlavně na přenesenou působnost, kde obec nabízí státní služby z Katalogu služeb. Prodejní argument modulu proto není „musíte“, ale: občan vyřídí věc z domova, referent nepřepisuje papír a služby jdou zařadit do katalogu služeb. Malá obec do 2 000 obyvatel takový nástroj sama nepostaví.

Modul Úřad je volitelný modul `urad` v kolekci `obce`. Běží v `apps/web`: kolekce Payloadu, administrace pro úředníky, stránky webu obce a REST API. `apps/mobile` stejné API používá, žádnou vlastní logiku úřadu v aplikaci nepostav.

Co si přečíst, než začneš:
- `CLAUDE.md` (pravidla domény, zejména 3 Peníze a 6 Úřad je fallback)
- `docs/navrh-platformy/05-digitalizace-uradu.md` (agendy, napojení, zavedení v obci)
- `research/poznamky/digitalni_urad.md` (právní a integrační podklady, vše v sekcích Inferences a Gaps je NEOVĚŘENO)
- `research/zprava-podklady-pro-prompty.md`, sekce 3 a 7
- `design/prototypy/S20-Urad.dc.html` (životní situace: kroky označené Online, Na úřadě, Proběhne samo)
- `docs/pravni-dokumenty.md`, části A (smlouva), B (zpracování, příloha B1 se lhůtami) a C (informace pro občany)
- `docs/rozhodnuti.md` (nové rozhodnutí tam zapisuj)

Ukázková obec je Javoří Lhota (684 obyvatel, okres Klatovy). Všechny demo data a testy používají ji.
</kontext>

<cil>
Na konci má v `apps/web` fungovat modul Úřad pro tenanta s `moduly: urad`. Občan na webu obce vybere životní situaci, vyplní verzovaný formulář s identifikací přesně podle toho, co služba vyžaduje, a dostane číslo podání, potvrzení e-mailem a stav, který se mění podle práce úředníka. Poplatek zaplatí QR platbou přímo na účet obce, sál si rezervuje se schválením a po zaplacení dostane časově omezený kód a předtopení. Závadu nahlásí z webu i z aplikace přes stejné API. Úředník vidí vše v administraci Payloadu, podání mu chodí do elektronické podatelny e-mailem a obec může zapnout další kanály (ISDS, export do spisové služby, platební brána), když na ně má vlastní smlouvy.
</cil>

<vychozi_stav>
V `apps/web` je Payload 3.91 s kolekcemi `aktuality`, `uredni-deska`, `kategorie-desky`, `krizova-hlaseni`, `zastupitele`, `dokumenty`, `media`, `users`; pomocné soubory `src/access/roles.ts` (helpery `isStaff`, `isAdmin`, `publishedOr`), `src/lib/revalidate.ts` (`obnovit`), `src/lib/datum.ts`, migrace v `src/migrations`, Vitest a PGlite. Převezmi styl kolekcí (`labels`, `admin.group: 'Úřad'`, verze, indexy, přístupová funkce v samostatném souboru) a pravidlo, že změna schématu = nová migrace, nasazené migrace se nemění.

Prompt 01 (web obce) mezitím zavádí multi-tenant a role superadmin, spravce, redaktor. Dokud to v repu není, piš přístupové funkce proti `hasRole` a tenantovi přes pole `obec`, ať jde přepnout na finální role jedním místem. Co prompt 01 nedodá, dodělej minimálně a zapiš do `docs/rozhodnuti.md`.

Co z prototypu S20 převzít: stránku Životní situace (výběr situace, seznam kroků se štítkem Online, Na úřadě, Proběhne samo, údaj „Poradí“), texty a čtyři ukázkové situace (stěhování, narození dítěte, stavba, úmrtí) jako seed. Šablona S20 je referenční vzhled; komponenty piš tak, aby fungovaly ve všech 20 šablonách přes tokeny (`packages/tokeny`), ne přes pevné barvy.
</vychozi_stav>

<rozsah>
Postav:
1. Konstruktor formulářů (kolekce `formulare`) s verzovaným schématem, knihovnou šesti vzorových formulářů a vykreslením na webu.
2. Podání (`podani`): přijetí, číslo podání, JSON a PDF/A souhrn, potvrzení e-mailem, stavy, předání do podatelny e-mailem, adaptér ISDS a export pro spisovky jako rozhraní s referenčním exportem.
3. Úrovně identifikace včetně obecného OIDC klienta pro NIA (konfigurace per obec) a pokynů pro podání z datové schránky.
4. Platby (`platby`): QR platba SPD, variabilní symboly, ruční a automatické párování z výpisu, volitelná platební brána (jeden referenční adaptér), webhook.
5. Místní poplatky (`poplatky` + sazebník): konfigurovatelné sazby, výpočet, připomínky splatnosti.
6. Rezervace prostor (`prostory`, `rezervace`): kalendář, schválení, cena, platba, napojení na IoT.
7. Hlášení závad (`hlaseni-zavad`): web i API, fotky, poloha, moderace, volitelná veřejná mapa.
8. Životní situace (`zivotni-situace`) jako obsahový typ a stránky.
9. Ochrana proti spamu, validace příloh, audit, lhůty uložení, seed Javoří Lhota, testy.

Mimo rozsah:
- Vlastní spisová služba, účetnictví, evidence obyvatel (CodeKom k ní nemá přístup; vstupem je CSV od obce).
- Čtení datové schránky obce. V MVP CodeKom DS neče; ISDS je jen odesílací adaptér za příznakem a v tomto promptu se neimplementuje proti produkci.
- Držení nebo převod peněz, iniciace platby z účtu plátce (PSD2), vlastní platební brána.
- Rozhodování ve správním řízení. Modul podání přijme a předá; rozhodnutí dělá úředník mimo CodeKom.
- Mobilní obrazovky (prompt 02), řídicí logika IoT (prompt 04), AI odpovědi (prompt 05).
- Státní formuláře z DIA (§ 4 odst. 3 ZoPDS). Pro přenesenou působnost jen odkaz z životní situace.
</rozsah>

<architektura>
Složky v `apps/web/src`:

```
collections/urad/     Formulare, Podani, Platby, Poplatky, SazebnikyPoplatku, Prostory,
                      Rezervace, HlaseniZavad, ZivotniSituace, Integrace, AuditUradu
lib/urad/formular/    schema.ts (typy definice), zod.ts (překlad definice na zod), podminky.ts
lib/urad/podani/      prijmi.ts, stavy.ts, cislo.ts, pdfa.ts, predani/{email,isds,spisovka}.ts
lib/urad/identita/    index.ts (rozhraní), email.ts, nia-oidc.ts
lib/urad/platby/      spd.ts, vs.ts, parovani/{gpc,abo,fio}.ts, brany/{index,comgate}.ts
lib/urad/poplatky/    vypocet.ts (čisté funkce), pripominky.ts
lib/urad/rezervace/   dostupnost.ts, iot.ts
lib/urad/ochrana/     spam.ts, prilohy.ts, antivir.ts
app/(web)/urad/       formulare, zivotni-situace, hlaseni-zavad, rezervace, moje-podani
app/(payload)/api/urad/...  koncové body (viz níže)
packages/typy         zod schémata definice formuláře a veřejné DTO (sdílí web i aplikace)
```

Kolekce mají pole `obec` (tenant) a izolaci řeší plugin multi-tenant. Kolekce `Integrace` drží tajemství obce (API klíče brány, token banky, OIDC klient, certifikát NIA, přístup ISDS). Tajemství ukládej šifrovaně (AES-256-GCM, klíč z `.env`, nebo Supabase Vault, rozhodni a zapiš), nikdy je nevracej v API ani v admin výpisu, čtení jen z kódu na serveru.

Koncové body pro `apps/mobile` a web (všechny tenant podle `?obec=<slug>` nebo domény; zod validace vstupu; chyby jako `{chyba: {kod, zprava}}` česky):

| Metoda a cesta | Účel | Identita |
|---|---|---|
| GET /api/urad/formulare?obec= | seznam zveřejněných formulářů (klic, nazev, uroven, typPodani) | žádná |
| GET /api/urad/formulare/<klic>?obec= | aktuální zveřejněná verze definice | žádná |
| POST /api/urad/podani | odeslání podání (multipart: `data` JSON, `prilohy[]`) → `{cislo, stav, platba?}` | podle formuláře |
| GET /api/urad/podani/<cislo> | stav podání pro občana | sledovací kód nebo účet občana |
| GET /api/urad/moje-podani | seznam podání přihlášeného občana | účet občana |
| POST /api/hlaseni-zavad | nové hlášení závady (sdílené rozhraní) → `{cislo, sledovaciKod}` | žádná, nebo účet |
| GET /api/urad/hlaseni-zavad/mapa?obec= | vyřešená hlášení pro veřejnou mapu, bez osobních údajů | žádná |
| GET /api/urad/prostory?obec= | pronajímatelné prostory | žádná |
| GET /api/urad/prostory/<id>/dostupnost?od=&do= | obsazené intervaly | žádná |
| POST /api/urad/rezervace | žádost o rezervaci → `{cislo, stav}` | ověřený e-mail |
| GET /api/urad/platby/<id> | údaje k platbě (částka, VS, SPD řetězec, stav) | vlastník platby |
| POST /api/urad/platby/webhook/<poskytovatel> | notifikace brány, ověřený podpis | podpis |
| GET /api/urad/zivotni-situace?obec= | situace s kroky | žádná |

Identita občana pro mobil: použij autentizaci kolekce `obcane` z promptu 02. Pokud v repu ještě není, napiš `ziskejObcana(req): Promise<{id: string} | null>` jako jediné místo a v testech ho mockuj.

Rozhraní adaptérů (krátké ukázky, další si odvoď):

```ts
interface PredaniPodani { id: 'email' | 'isds' | 'spisovka-export'
  predej(podani: PodaniDTO, priloha: { json: Buffer; pdfa: Buffer; soubory: Soubor[] }): Promise<{ ok: boolean; reference?: string; chyba?: string }> }
interface PlatebniBrana { id: string
  vytvor(platba: PlatbaDTO, navrat: URL): Promise<{ platbaUrl: string; idBrany: string }>
  overWebhook(req: Request): Promise<{ idBrany: string; stav: 'zaplacena' | 'zrusena' | 'ceka'; castka: number }> }
interface PoskytovatelIdentity { uroven: 'email_verified' | 'nia'
  zacni(obec: ObecDTO, navrat: URL): Promise<URL>; dokonci(req: Request): Promise<{ klic: string; atributy: Record<string, string> }> }
interface IotRezervace { vytvorPristupAPlan(r: RezervaceDTO): Promise<{ pristupId: string; planId?: string }>; zrus(r: RezervaceDTO): Promise<void> }
```

Tok podání: formulář → kontrola spamu → ověření identity podle úrovně → validace zod na serveru (stejné schéma jako v prohlížeči) → kontrola příloh → zápis `podani` (číslo, snapshot verze formuláře, data) → PDF/A souhrn a JSON → předání adaptérem (fronta s opakováním, stav předání se eviduje) → e-mail občanovi → případná platba.

Hranice mezi moduly: IoT a mobilní aplikace nikdy nesahají do tabulek `podani`, `platby`, `rezervace`; používají jen API a rozhraní výše. Rezervace volá IoT jen přes `IotRezervace`; když modul `iot` obec nemá zapnutý, rezervace funguje bez kódu a předtopení a UI to neslibuje.
</architektura>

<datovy_model>
Všechny kolekce: pole `obec` (povinné, index), časové značky, přístup podle pravidel dole. Názvy polí česky bez diakritiky. Nové kolekce mimo sdílený seznam (`sazebniky-poplatku`, `integrace`, `audit-uradu`, pomocná tabulka `variabilni_symboly`) zapiš do `docs/rozhodnuti.md`.

### formulare
| Pole | Typ | Pozn. |
|---|---|---|
| klic | text, povinné | unikátní v obci, slug |
| nazev, popis | text | |
| agenda | select | poplatky, rezervace, hlaseni, dotaz, ostatni |
| typPodani | select, povinné | `podnet`, `spravni_podani`, `soukromopravni` |
| uroven | select, povinné | `none`, `email_verified`, `nia`, `ds_or_uep` |
| duvodUrovne | textarea | povinné, když uroven není `none`; zobrazí se občanovi („Vyžadujeme ověření, protože …“) |
| alternativaPotvrzeni | checkbox | u `nia`, `ds_or_uep`: obec dovolí podání bez ověření a vyzve k potvrzení podepsaným podáním (§ 37 odst. 4 SŘ, lhůta [OVĚŘIT] dnů) |
| definice | json, povinné | verzované schéma, viz níže |
| verze | number, auto | zvýší se při každém zveřejnění; starší verze zůstávají (Payload versions), podání drží snapshot |
| predani | group | kanaly[] (`email`, `isds`, `spisovka-export`), emailPodatelny, predmetSablona |
| platba | group | zapnuto, druh (`poplatek`, `rezervace`, `jina`), castkaPevna nebo vzorec, brana (nepovinná) |
| lhutaUlozeniRoky | number | podle skartačního plánu obce (zák. č. 499/2004 Sb.), výchozí 2 od vyřízení dle přílohy B1 |
| stav | draft / published | |

Definice formuláře (typy v `packages/typy`, zod schéma definice se validuje při uložení):

```ts
type PoleDef = { klic: string; typ: 'text'|'dlouhyText'|'cislo'|'datum'|'email'|'telefon'|'vyber'|'vicenasobnyVyber'|'ano_ne'|'adresa'|'poloha'|'soubor'
  popisek: string; napoveda?: string; povinne: boolean
  validace?: { min?: number; max?: number; delka?: [number, number]; vzor?: string; format?: 'psc'|'cp'|'cip_psa' }
  podminka?: { pole: string; operator: 'rovno'|'nerovno'|'vyplneno'; hodnota?: string }
  ucelUdaje: string          // proč údaj sbíráme, zobrazí se pod polem; bez účelu pole nejde zveřejnit
  soubor?: { typy: string[]; maxMB: number; maxPocet: number } }
type DefiniceFormulare = { sekce: { nazev: string; pole: PoleDef[] }[] }
```

`zod.ts` přeloží definici na zod schéma včetně podmíněných polí (skrytá pole se nevalidují ani neukládají). Stejnou funkci použije prohlížeč i server.

### podani
cislo (unikátní v obci, formát `<kodObce>-<rok>-<pořadí 6 číslic>`, pořadí z atomické sekvence per obec a rok), formular (vztah), verzeFormulare, snapshotDefinice (json), data (json, šifrované pole nebo šifrování na úrovni sloupce), prilohy (vztah na soukromá media), uroven (dosažená), identita (group: druh, klicOverenehoSubjektu, e-mail; jen co je nutné), stav (`ceka_na_overeni`, `prijato`, `v_reseni`, `vyrizeno`, `zamitnuto`, `stazeno`), duvodZamitnuti (povinné při `zamitnuto`, zobrazí se občanovi), verejnaOdpoved, internPoznamka (jen staff), prirazenoUzivateli, predani (pole pokusů: kanal, cas, ok, reference, chyba), platba (vztah), sledovaciKodHash, vyrizenoDne, smazatDo (z lhůty uložení), obcan (vztah, nepovinný). Indexy: (obec, stav), (obec, cislo), (smazatDo).

Přechody stavů jsou v `stavy.ts` jako čistá funkce: `ceka_na_overeni → prijato → v_reseni → vyrizeno | zamitnuto`, `prijato | v_reseni → stazeno` (občan, nebo úředník na žádost). Zpět do předchozího stavu jen správce se zápisem do auditu. Každý přechod pošle občanovi e-mail a zapíše audit.

### platby
cislo, podani/rezervace/poplatek (vztah na zdroj), castka (celé haléře jako integer), mena (CZK), vs (≤ 10 číslic), ss, kodBanky nepovinné, ucetObce (snapshot IBAN z `obce.cisloUctu` v čase vytvoření), spd (řetězec), zpusob (`qr`, `brana`), brana (klic adaptéru), idBrany, stav (`vytvorena`, `ceka`, `zaplacena`, `nesedi_castka`, `zrusena`, `expirovana`, `vracena`), zaplacenoDne, zdrojParovani (`vypis`, `webhook`, `rucne`), splatnostDo. Záznam z výpisu: tabulka `pohyby_banky` (obec, zdroj, datum, castka, vs, protiucet, zprava, sparovanoNa), aby šlo párování zopakovat a doložit.

Variabilní symbol: tabulka `variabilni_symboly` s unikátním (obec, vs). Poplatky: VS stabilní per poplatník a druh poplatku (obec ho může importovat ze svého účetnictví; jinak se generuje: 1 číslice druh, 2 číslice rok založení, 7 číslic pořadí). Podání a rezervace: VS nový per platba. Při kolizi se generuje nový, nikdy se nepřepisuje.

### sazebniky-poplatku a poplatky
`sazebniky-poplatku`: druh (`odpad`, `pes`, `verejne_prostranstvi`, `jiny`), nazevOZV, cisloOZV, platnostOd, platnostDo, sazby (json: sazba, jednotka, snizenaSazba, kategorie), uleva (pole: klic, popis, typ `osvobozeni`|`sleva`|`procento`, hodnota, podminka), splatnost (pravidlo: den v roce / lhůta ve dnech, podle OZV), lhutaOhlaseni (dny), zaokrouhleni, odkazNaOZV (url na sbirkapp.gov.cz nebo web obce), overenoDne. Při výpočtu se bere sazebník platný k rozhodnému dni; změna sazby = nový sazebník, starý se nepřepisuje. Aplikace nenese žádnou sazbu v kódu kromě testovacích fixtures.

`poplatky` (předpis konkrétnímu poplatníkovi): druh, sazebnik, poplatnik (jmeno, adresa, kontakt; minimálně), obdobi (rok), parametry (json: osoby, psi, m², dny), vypocteno (castka, rozpis), stav (`predepsano`, `zaplaceno`, `po_splatnosti`, `odepsano`), splatnostDo, vs, platba, pripominky (odeslané: kdy, kanál), zdrojImportu. Import z CSV od obce (poplatníci a předpisy) jako skript i tlačítko v administraci s náhledem před zápisem.

### prostory a rezervace
`prostory`: nazev, typ (sal, hriste, ucebna, jiny), kapacita, popis, fotky, budova (vztah na IoT `budovy`, nepovinný), cenik (pole: nazev, jednotka hodina|den|akce, cena, platnost, kategorieNajemce), kauce, minDelka, maxDelka, otevreno (dny a hodiny), pravidla (richText), schvalovani (`vzdy`, `automaticky`), vyzadujePlatbuPredKodem, predtopeniMinut, cilovaTeplota, kodPlatiPredMinut, kodPlatiPoMinut.
`rezervace`: cislo, prostor, od, do (datumčas v UTC, zobrazení Europe/Prague), zadatel (jmeno, email, telefon, organizace), ucel, pocetOsob, stav (`zadana`, `schvalena`, `zamitnuta`, `zaplacena`, `probehla`, `zrusena`), duvod, cena (rozpis), platba, iot (pristupId, planId). V databázi exkluzivní omezení (btree_gist, `tstzrange(od, do)`) proti překryvu schválených a zaplacených rezervací stejného prostoru; zadaná rezervace blokuje termín [DOPLNIT: obec zvolí, zda žádost termín drží].

### hlaseni-zavad
cislo, kategorie (vztah na pevný číselník: osvetleni, komunikace, odpad, zelen, voda, mobiliar, jine; obec může doplnit), popis (5–1000 znaků), poloha (lat, lng, presnostM, popisMista), fotky (pole: media, stavModerace `ceka`|`schvalena`|`zakryta`, verejna), stav (`nove`, `prijato`, `v_reseni`, `vyreseno`, `zamitnuto`), prirazenoUzivateli, internPoznamka, verejnaOdpoved, kontakt (email nepovinný, telefon nepovinný), obcan (vztah nepovinný), zdroj (`web`, `aplikace`), sledovaciKodHash, souhlasSPublikaci (checkbox), vyreseno (datum), zverejnitNaMape (checkbox, výchozí vypnuto), smazatDo.

### zivotni-situace
nazev, slug, kdo (text „Poradí …“, telefon a kancelář jako `[DOPLNIT]`), kroky (pole: nazev, typ `online`|`urad`|`samo`, text, odkaz: druh `formular`|`stranka`|`externi`, formular (vztah), url (jen https, allowlist hostů domén státu a obce), terminDni), poradi, publikovano. Typ kroku určuje štítek: Online, Na úřadě, Proběhne samo.

### audit-uradu
Jen přidávání: kdo (uživatel nebo systém), co, na čem, před/po (bez obsahu příloh), čas. Databázový trigger zakáže UPDATE a DELETE, stejně jako u úřední desky.
</datovy_model>

<funkce>
### 1. Web: životní situace a formuláře
- `/urad/zivotni-situace`: výběr situace, kroky se štítky podle S20, odkaz u kroku „Online“ vede na formulář, u „Na úřadě“ ukáže kancelář, hodiny a telefon z `obce.uredniHodiny` a `kontakty`. Prázdný stav: obec zatím nemá žádnou situaci, ukaž hodiny a telefon úřadu.
- `/urad/formulare` a `/urad/formulare/<klic>`: formulář vykreslený z definice. Nahoře blok „Co potřebujete“: úroveň identifikace jednou větou a `duvodUrovne` (například „Ověříme vás Identitou občana, protože jde o ohlášení poplatku“). Pod ním vždy offline cesta: adresa, hodiny, telefon, text „Formulář můžete také podat osobně nebo datovou schránkou [ID DS]“.
- Stavy: načítání (kostra, ne točící kolečko), chyba validace u pole (text i `aria-describedby`, shrnutí chyb nahoře s fokusem), chyba serveru (zachová vyplněná data, nabídne e-mail a telefon úřadu), úspěch (číslo podání, co bude dál, odkaz na stav). Neodeslaný koncept se drží jen v `sessionStorage` bez příloh.
- `/urad/moje-podani` a `/urad/podani/<cislo>`: stav, historie přechodů, veřejná odpověď, důvod zamítnutí, stažení PDF/A svého podání. Bez účtu vstup přes číslo a sledovací kód z potvrzení.

### 2. Úrovně identifikace
| Úroveň | Použití | Mechanismus |
|---|---|---|
| `none` | hlášení závady, obecný dotaz | bez ověření; e-mail nepovinný |
| `email_verified` | přihlášky k poplatkům (pokud obec nežádá víc), rezervace | jednorázový kód na e-mail, stav `ceka_na_overeni` do zadání kódu, platnost 15 minut, 5 pokusů; přihlášený občan ze `obcane` se bere jako ověřený |
| `nia` | kde zákon vyžaduje ověření totožnosti | OIDC klient proti Identitě občana, konfigurace per obec v `integrace` (client_id, redirect URI, šifrovací certifikát, atributy). Žádej minimum atributů, klíč subjektu je `PersonIdentifier` |
| `ds_or_uep` | podání se silným účinkem | formulář neověřuje; zobrazí pokyn „podejte z datové schránky“ (podání z DS má účinky podepsaného podání, § 18 zákona č. 300/2008 Sb.; z cizí DS je nutný uznávaný podpis přílohy) a údaje DS obce. Je-li zapnutá `alternativaPotvrzeni`, nabídne podání bez ověření s výzvou k potvrzení |

NIA: SeP registruje obec jako OVM přes svou datovou schránku, CodeKom ji pouze technicky připojí přes SAML2/OIDC (test `tnia.identita.gov.cz`, produkce `nia.identita.gov.cz`). Produkční připojení je možné jen pro subjekt s povinností ověřovat identitu, proto žadatelem je vždy obec. V kódu nesmí být žádná výjimka „CodeKom jako SeP“. Postav OIDC klienta obecně a otestuj ho proti lokálnímu mock poskytovateli. V administraci `integrace` ukaž obci kontrolní seznam registrace (co má udělat, co jí připravíme) a stav: nenastaveno, test, produkce. Dokud obec nemá produkci, formulář s úrovní `nia` ukáže offline cestu a, je-li zapnutá, alternativu s potvrzením. Serverová i klientská část musí fungovat s PKCE; jestli ho NIA vyžaduje, ověř [OVĚŘIT].

### 3. Vzorové formuláře
Dodej jako seed šest formulářů (texty česky, ceny a sazby z `sazebniky-poplatku` Javoří Lhoty, ne z kódu):
1. Přihlášení k poplatku za odpad: osoba (jméno, adresa v obci, počet osob v domácnosti, datum vzniku povinnosti, osoby: jméno a datum narození podle OZV, podmíněné pole „vlastník bez přihlášených osob“), úroveň `email_verified` (obec může zvednout na `nia`), typ `spravni_podani`, výsledek: předpis + QR platba. Lhůta ohlášení změn z `lhutaOhlaseni`.
2. Poplatek ze psa: držitel, plemeno, pohlaví, datum narození psa, číslo čipu (nepovinné), 65+ (podmíněné pole), další pes (sazba navíc), úroveň jako u odpadu.
3. Zábor veřejného prostranství: žadatel, účel, místo (adresa nebo bod na mapě), plocha m², od a do, příloha situační plánek; typ `spravni_podani`, výpočet poplatku (m² × dny × sazba × násobitel účelu), úroveň `email_verified`, schválení úředníkem před platbou.
4. Pronájem sálu: odkaz na `rezervace` (formulář je jen vstup, tok řeší sekce Rezervace).
5. Hlášení závady: tentýž tok jako `POST /api/hlaseni-zavad`, formulář je jen jeho pohled. Úroveň `none`.
6. Obecný dotaz: jméno nepovinné, e-mail povinný kvůli odpovědi, text, příloha. Úroveň `none`, typ `podnet`.

Administrace formuláře (spravce): úprava polí s okamžitým náhledem, zveřejnění vytvoří novou verzi, nelze zveřejnit pole bez `ucelUdaje`, formulář s úrovní vyšší než `none` bez `duvodUrovne` ani formulář s `platba` bez nastaveného účtu obce.

### 4. Podání a předání
- Výstup: `data.json` (kanonický JSON se `schemaVersion`) a PDF/A souhrn s číslem podání, časem, obsahem a seznamem příloh s kontrolním součtem SHA-256. Nástroj pro PDF/A vyber a ověř (validace veraPDF v testu) [OVĚŘIT]; pokud generování PDF/A nezvládne zvolená knihovna, zapiš rozhodnutí a použij alternativu.
- E-mail do elektronické podatelny obce (`predani.emailPodatelny`): předmět ze šablony (`[<cislo>] <nazev formulare>`), tělo čitelné člověkem, přílohy PDF/A, JSON a soubory občana, pokud se vejdou do limitu [DOPLNIT: limit příloh e-podatelny obce], jinak odkaz s krátkou platností na stažení pro úředníka po přihlášení. Odeslání jde frontou s opakováním (5 pokusů, rostoucí odstup); neúspěch ukáže správci červený stav v administraci.
- Potvrzení občanovi e-mailem: číslo podání, shrnutí, odkaz na stav, lhůty. Obsah neobsahuje celá osobní data.
- ISDS: adaptér `isds` je za příznakem a dostane implementaci jen jako rozhraní s dokumentovaným postupem. Doporučená varianta: obec má pro svou spisovku vlastní napojení; odeslání do DS obce nebo odpověď občanovi do jeho schránky je fáze 2 s pověřenou osobou (§ 8 odst. 6–7 zákona č. 300/2008 Sb.) a systémovým certifikátem. Limity z podkladů: přílohy celkem 10 MB, 50 příjemců; většina volání způsobí přihlášení do schránky a doručení fikcí (§ 17 odst. 3), proto žádná automatika bez výslovného pokynu obce. Rozhraní pro poskytovatele internetových služeb vyžaduje povolení provozovatele. Všechno [OVĚŘIT].
- Export pro spisové služby: adaptér `spisovka-export` vygeneruje balíček (ZIP: PDF/A, JSON, přílohy, `metadata.xml` s poli potřebnými pro evidenci: původce, čas doručení, způsob doručení, věc, počet příloh). Vyjdi z požadavků NSESSS a ověř aktuální znění [OVĚŘIT]; konkrétní API (GINIS XRG, VERA, Triada, Alis, Munis) nepřidávej bez dokumentace od dodavatele, místo toho v kódu nech `[OVĚŘIT: API <dodavatel>]`.

### 5. Platby
- QR platba SPD: `spd.ts` je čistá funkce `sestavSpd({iban, castka, vs, ss, zprava, jmenoPrijemce, splatnost}) → string`. Formát `SPD*1.0*ACC:…*AM:…*CC:CZK*X-VS:…*MSG:…*RN:…*DT:…*`, AM max 10 znaků se 2 desetinnými místy (tečka), MSG max 60 znaků, RN max 35, X-VS max 10 číslic, hodnoty bez `*` (kóduj `%2A`), bez diakritiky v MSG a RN, doporučená korekce chyb úrovně M. IBAN se validuje (kontrolní číslice). CRC32 přidej jen pokud ho standard v1.2 podle ověření požaduje nebo doporučuje [OVĚŘIT] a otestuj na příkladu ze standardu: `SPD*1.0*ACC:CZ3301000000000002970297*AM:555.55*CC:CZK*MSG:PRISPEVEK NA NADACI*`.
- Zobrazení: QR kód (SVG vykreslený na serveru, alfanumerický režim, kvůli čitelnosti min. 200 px), pod ním textem číslo účtu, částka, VS, splatnost, takže jde platit i bez QR.
- Platební brána je volitelná a jen tam, kde obec přidala vlastní obchodní smlouvu a klíče do `integrace`. Referenční adaptér ComGate (jeho testovací režim); ceník neuváděj do kódu ani do textů, každá obec má vlastní smlouvu [OVĚŘIT dokumentaci API a ceník; stav z podkladů je z roku 2024]. Ostatní brány (GP webpay, GoPay a další) jen jako prázdné adaptéry s odkazem na dokumentaci. Stav platby přichází webhookem s ověřeným podpisem, idempotentně, a vždy se ověří dotazem na API brány; částka musí sedět, jinak `nesedi_castka`.
- Párování z výpisu: import GPC a ABO [OVĚŘIT specifikaci formátů] a čtení přes API banky s tokenem jen pro čtení, který drží obec (reference: Fio API; další banky jen po ověření dokumentace). Algoritmus: VS najde poplatek nebo platbu → shoda částky → `zaplacena`; nižší nebo vyšší částka → `nesedi_castka` a ruční zpracování; neznámý VS → fronta „nepárované“ v administraci. Zápis plateb jen z výpisu nebo webhooku; ruční označení vyžaduje poznámku a jde do auditu.
- Právní hranice (PSD2, zákon č. 370/2017 Sb.): CodeKom jen zobrazuje údaje k platbě a čte výpisy s přístupem obce; neiniciuje platbu z účtu plátce a nikdy nedrží peníze. Přesměrování na bránu obce nesmí jít přes účet CodeKomu. Zda přesměrování nebo čtení výpisů nevyžaduje licenci či výjimku technického poskytovatele, je [OVĚŘIT] právníkem; v kódu o tom nech komentář s odkazem na tento prompt.

### 6. Poplatky (zákon č. 565/1990 Sb.)
Hranice podle znění k 1. 1. 2025, které validace sazebníku hlídá jako varování (ne jako zákaz) a které je nutné ověřit v e-Sbírce pro rok 2026 a 2027 [OVĚŘIT]: odpad (obecní systém) nejvýš 1 200 Kč za osobu a rok, odkládání z nemovité věci nejvýš 6 Kč/kg nebo 1 Kč/l, obec smí zavést jen jeden z těchto režimů; pes nejvýš 1 500 Kč ročně, u držitele 65+ nejvýš 200 Kč, za dalšího psa navýšení o 50 %; veřejné prostranství nejvýš 10 Kč za m² a den, u prodejních a reklamních zařízení a lunaparků až desetinásobek. Konkrétní sazby, úlevy, osvobození a splatnost si nastavuje obec podle své OZV v `sazebniky-poplatku`.

`vypocet.ts` jsou čisté funkce bez přístupu do databáze: `vypoctiOdpad`, `vypoctiPsa`, `vypoctiProstranstvi`, každá vezme sazebník, parametry a rozhodný den, vrátí `{castka, rozpis[]}` v haléřích. Poměrná část podle započatých měsíců, zaokrouhlení podle sazebníku. Zaokrouhlení, pořadí aplikace úlev a výklad „sleva 1/12 za měsíc“ ověř proti zákonu a nechej konfigurovatelné.

Připomínky splatnosti: denní úloha (cron) pošle e-mail (a push přes API pro aplikaci, pokud občan má účet) [DOPLNIT: počet dní předem, výchozí 14 a 3] před splatností a po splatnosti jednou; po splatnosti jen text s odkazem na platbu, žádná automatická sankce. Zvýšení za pozdní úhradu (až dvojnásobek, § 11c) a rozhodnutí vydává úředník, aplikace jen upozorní.

### 7. Rezervace prostor
1. Občan vybere prostor a vidí kalendář (měsíc, týden; obsazené intervaly bez jmen) a ceník.
2. Zadá termín, účel, počet osob; ověří e-mail; systém spočítá cenu (jednotka × délka + kauce) z ceníku prostoru.
3. Rezervace vznikne ve stavu `zadana`; úředník dostane upozornění a v administraci ji schválí nebo zamítne s důvodem. U prostoru s `schvalovani: automaticky` přeskočí rovnou na další krok, pokud je termín volný.
4. Po schválení vznikne platba (QR, popřípadě brána). Je-li `vyzadujePlatbuPredKodem`, kód vznikne až po `zaplacena`.
5. IoT: adaptér `IotRezervace.vytvorPristupAPlan` vytvoří v kolekci `pristupy` časově omezený kód (platnost od `od − kodPlatiPredMinut` do `do + kodPlatiPoMinut`, vazba na rezervaci a budovu) a v `planyVytapeni` záznam předtopení (začátek `od − predtopeniMinut`, `cilovaTeplota`). Přesné názvy polí převezmi z kolekcí promptu 04; dokud neexistují, definuj rozhraní a in-memory implementaci pro testy. Kód se občanovi pošle e-mailem a ukáže na stavu rezervace (v aplikaci po přihlášení), v logu a auditu je jen maska. Zrušení nebo zamítnutí kód a plán odvolá. Nezapomeň na fail-safe z `CLAUDE.md`: zámek musí jít vždy otevřít klíčem, text rezervace to neslibuje jako jediný přístup.
6. Prázdné a chybové stavy: prostor bez ceníku (cena „dohodou“, jen žádost), termín obsazený (nabídni nejbližší volné), selhání IoT (rezervace platí, úředníkovi se ukáže úkol „kód nevytvořen“, občan dostane informaci, že kód pošleme zvlášť).

### 8. Hlášení závad
- Web `/urad/hlaseni-zavad`: kategorie, popis, až 3 fotky, poloha (mapa s ukazatelem a ruční popis místa; bez nutnosti povolit GPS), nepovinný e-mail pro odpověď, souhlas se zveřejněním (krok je nepovinný). Na stránce před odesláním: „Tudy nehlaste nouzové situace. Volejte 112, 150, 155 nebo 158.“ (podle `docs/pravni-dokumenty.md`, část E, bod 3) a upozornění nefotit lidi ani SPZ.
- API `POST /api/hlaseni-zavad` přijme stejnou strukturu z webu i aplikace (multipart); odpověď `{cislo, sledovaciKod}`. Sledovací kód se uloží jen jako hash.
- Zpracování fotek: z EXIF se odstraní poloha a metadata (poloha jde jen z pole `poloha`), změna velikosti na rozumný limit, přepsání do JPEG nebo WebP, uložení do soukromého úložiště.
- Administrace: seznam s filtrem podle stavu, kategorie a přiřazení, mapa hlášení, přiřazení uživateli, `internPoznamka` (jen staff), `verejnaOdpoved`, změna stavu s e-mailem občanovi. Moderace fotek: úředník fotku schválí k zobrazení veřejnosti, nebo ji zakryje (nástroj pro obdélníkové rozmazání osob a SPZ; zakrytá verze se uloží jako nový soubor, originál zůstane jen pro staff do vyřízení a po lhůtě se smaže).
- Veřejná mapa vyřešených hlášení (volitelná per obec): `GET /api/urad/hlaseni-zavad/mapa` vrací jen hlášení se `zverejnitNaMape`, stav `vyreseno`, kategorii, veřejný popis, schválenou fotku a polohu místa závady (zaokrouhlenou na [DOPLNIT: přesnost, výchozí 10 m]); nikdy kontakt, interní poznámku, čas odeslání na minutu ani identitu.
- Hlášení není podání podle správního řádu a neběží u něj správní lhůty (viz `docs/pravni-dokumenty.md`, část E, bod 3). Stránka to říká a ukazuje cestu, jak podat věc oficiálně.

### 9. Administrace úředníka
Skupina „Úřad“ v administraci: fronta „Ke zpracování“ (nová podání, hlášení, žádosti o rezervaci), podání podrobně (data, přílohy, historie, předání a jeho stav), přechody stavů, poznámky, nepárované platby, import výpisu, import poplatníků, nastavení integrací se stavem a kontrolním seznamem. Každé tlačítko má text se slovesem („Schválit rezervaci“, „Zamítnout s důvodem“).
</funkce>

<pravidla>
- Zákon č. 12/2020 Sb.: služby v samostatné působnosti obec poskytovat může (§ 14 odst. 3), fyzickou nepodnikající osobu nelze nutit k digitálnímu úkonu (§ 14 odst. 1), proto každá služba má offline cestu a papírová varianta zůstává (`CLAUDE.md`, pravidlo 6). Princip „jednou a dost“ (§ 7, § 9): nežádej údaje, které obec má v registrech; do formulářů dávej jen pole s účelem. Formuláře navrhuj tak, aby šly popsat v Katalogu služeb (každý formulář má `agenda`, název služby, kdo ji může požádat, kanál, lhůta, poplatek, odkaz na právní předpis; v administraci export „popis služby“ pro zápis obce do katalogu). Termín 1. 2. 2025 a znění po novelách ověř [OVĚŘIT].
- Samoobslužný portál s předvyplněním z NIA je ISVS obce a musí dodržet grafický manuál DIA a federaci NIA. Modul bez NIA (úrovně `none` a `email_verified`) tyto požadavky nespouští; jakmile obec zapne `nia`, upozorni ji v `integrace` na povinnosti [OVĚŘIT s DIA].
- Typ podání rozhoduje o právní váze: `podnet` (hlášení závady, dotaz) nemá správní lhůty; `spravni_podani` potřebuje identifikovatelného podatele a obec rozhodne, zda dovolí podání bez ověření s potvrzením (§ 37 odst. 4 správního řádu, text a lhůtu [OVĚŘIT]); `soukromopravni` (pronájem sálu) je smlouva, stačí identifikace jménem a e-mailem. Tuto klasifikaci i znění textů pro občana nech schválit právníkem obce, v kódu označ [OVĚŘIT].
- Poplatky podle zákona č. 565/1990 Sb.: viz sekce Poplatky. Správcem je obecní úřad (§ 15). Ohlášení změn do 15 dnů (§ 14a), splatnost a lhůty podle OZV, u poplatků vyměřených rozhodnutím 30 dnů (§ 11b). Označení platby (VS, SS, rozpočtová skladba) potvrzuje ekonomka obce [DOPLNIT].
- Peníze jdou vždy přímo na účet obce z `obce.cisloUctu`; bez účtu nelze zapnout platby. CodeKom nikdy nepřijímá platbu na svůj účet.
- GDPR: správcem je obec, CodeKom je zpracovatel (čl. 28); doby uložení se řídí spisovým a skartačním plánem obce (zákon č. 499/2004 Sb.), výchozí 2 roky od vyřízení pro formuláře a hlášení závad (příloha B1), konfigurovatelné v `lhutaUlozeniRoky`. Úloha `uklid` maže nebo anonymizuje data po `smazatDo`, příloha se maže vždy s podáním. Originál evidence podání je ve spisové službě obce; kopie u CodeKomu nemá žít déle, než je nutné pro vyřízení a doložení doručení [DOPLNIT: výchozí doba po předání]. Minimalizace: rodná čísla ani zvláštní kategorie údajů se neptáme (smlouva B, čl. 4 odst. 3); vzorové formuláře jsou navržené bez nich. Poplatek ze psa a odpad: datum narození jen tam, kde to OZV vyžaduje.
- Texty pro občany přebírej z části C `docs/pravni-dokumenty.md`; stránka formuláře odkazuje na informaci o zpracování obce.
- Žádná právní konstanta (sazba, lhůta, limit) není v kódu bez komentáře s paragrafem a datem ověření a bez záznamu v `docs/verification-log.md`, pokud takový soubor v repu je, jinak ho založ.
</pravidla>

<design_a_pristupnost>
- Vzhled podle `CLAUDE.md` a unslop: písmo nejvýš 600, věty s velkým písmenem, bez vykřičníků, jedna akcentová barva, žádné přechody ani emoji, mřížka po 4 px, text 17 px, cíle dotyku aspoň 44 × 44 px, kontrast aspoň 4,5 : 1. Barvy jen z tokenů.
- Formuláře: popisek nad polem (ne jen placeholder), nápověda a účel údaje pod polem, jeden sloupec na 375 px, `autocomplete` atributy (`given-name`, `email`, `street-address`, `postal-code`), správné `inputmode`, chyby textem i ikonou, ne jen barvou. Shrnutí chyb nahoře po odeslání, fokus na něj. Více kroků jen u formulářů nad 12 polí, s ukazatelem postupu a možností se vrátit.
- Kalendář rezervace musí jít ovládat klávesnicí (šipky, Enter), a na telefonu seznam volných termínů jako alternativa mřížky. Dostupnost se nesdělí jen barvou.
- Mapa hlášení a výběr polohy: vždy textová alternativa (pole „popis místa“, seznam hlášení pod mapou).
- Stavy podání mají text („Přijato“, „V řešení“, „Vyřízeno“, „Zamítnuto“), barva je doplněk. Změna stavu v živé oblasti `aria-live="polite"` jen při interakci.
- Nahrávání souborů: tlačítko i přetažení, seznam nahraných souborů s odebráním, srozumitelná chyba (typ, velikost). Vše použitelné bez JavaScriptu tam, kde to jde (základní formulář se odešle klasickým POST s validací na serveru).
- Přístupnost WCAG 2.2 AA, česky psané `lang`, prohlášení o přístupnosti webu se doplní o modul.
</design_a_pristupnost>

<bezpecnost_a_soukromi>
- Ochrana proti spamu bez sledování: skrytý honeypot, časová pastička (odeslání dřív než za 3 s je podezřelé), rate limit per IP a per formulář v Postgresu (IP jen jako hash se solí měnící se denně, záznamy mažou po 24 hodinách), u opakovaného útoku proof-of-work (kandidát: Altcha nebo vlastní jednoduchá hashcash varianta; ověř licenci a EU provoz [OVĚŘIT]). Žádný reCAPTCHA ani jiné služby třetích stran a žádné cookies mimo nezbytné (§ 89 odst. 3 zákona č. 127/2005 Sb.).
- Přílohy: povolit jen allowlist typů (PDF, JPEG, PNG, WebP, případně DOCX/ODT podle formuláře), kontrola magic bytes, ne jen přípona a Content-Type, limit 10 MB na soubor, a celkem 10 MB na podání (shoduje se s limitem ISDS), nejvýš 5 souborů, sanitace názvu souboru, náhodný název v úložišti, žádné spustitelné ani archivní formáty. Antivir: služba ClamAV (clamd) na serveru v EU, soubor se do stavu `prijato` dostane jen po čistém skenu; služba nedostupná = podání přijmout s přílohami ve stavu „čeká na kontrolu“, ne bez kontroly [OVĚŘIT dostupnost a provoz; alternativa je placená EU služba]. Úložiště je soukromé, přístup jen přes krátce platné podepsané odkazy pro staff.
- Přístup: občan vidí jen svá podání a platby; anonymní jen podle sledovacího kódu (nejméně 128 bitů náhodnosti, uložený jako hash, porovnání v konstantním čase). `internPoznamka` a `prirazenoUzivateli` se nikdy nevrací veřejným koncovým bodům. Čtení podání a změny stavu: spravce a redaktor své obce; úpravu definic formulářů, sazebníků a `integrace` jen spravce. Test izolace mezi dvěma obcemi je povinný pro každou kolekci.
- Webhooky: ověřený podpis, kontrola času, idempotence podle `idBrany`; telo se nelogujte celé.
- Tajemství obcí (`integrace`) šifrovaná, v logu jen maska, pole se neposílá do klienta ani do Payload REST/GraphQL odpovědí.
- Audit: každá změna stavu, schválení, ruční označení platby, přístup ke zdroji příloh a změna integrace, v tabulce jen pro přidávání (trigger).
- Logy neobsahují obsah formulářů, kódy ani tokeny. Chyby do Sentry [DOPLNIT: pokud je nastaven] bez osobních údajů.
- Fotky v hlášeních a EXIF: viz Hlášení závad. Poloha je údaj o místě závady, ne o osobě; GPS z telefonu se do dat neukládá mimo pole `poloha`.
- DPIA: poloha a fotky v hlášeních a AI nad podáním jsou podle části B ke kontrole advokátem. Do `docs/rozhodnuti.md` zapiš, že modul AI asistent do podání nevidí.
</bezpecnost_a_soukromi>

<testy>
Nástroje: Vitest (včetně PGlite pro migrace a omezení), Testing Library, Playwright, axe-core, testovací SMTP (MailHog nebo Mailpit v Dockeru nebo SMTP server v procesu testu).

Jednotkové (`pnpm test`):
- `vypocet.ts`: odpad (celý rok, poměrná část podle měsíců, osvobození), pes (základ, 65+, druhý pes, osvobození), prostranství (m² × dny × sazba, násobitel); hraniční hodnoty, haléře, změna sazebníku k rozhodnému dni.
- `spd.ts`: příklad ze standardu, `*` jako `%2A`, délky AM, MSG, RN, VS, diakritika, IBAN validace, nulová a záporná částka odmítnuta.
- Stavový automat podání a rezervací: povolené a zakázané přechody, povinný důvod zamítnutí, audit zápis.
- Překlad definice formuláře na zod: povinná, podmíněná skrytá pole, validace formátů (PSČ, číslo čipu), odmítnutí neznámých klíčů.
- Přidělení čísla podání (souběh 20 požadavků = bez duplicit) a VS (kolize).
- Párování výpisu: shoda, nižší a vyšší částka, neznámý VS, duplicitní import téhož výpisu (idempotence), vzorové soubory GPC a ABO.
- Validace příloh: falešná přípona, příliš velký soubor, dvojitá přípona, název s cestou.
- Dostupnost a překryv rezervací včetně přechodu na letní čas (Europe/Prague).

Integrační:
- Podání → záznam → PDF/A (validace veraPDF, pokud lze spustit v CI) → e-mail v testovacím SMTP: kontrola předmětu, příloh JSON a PDF/A, potvrzení občanovi; selhání SMTP = opakování a viditelný stav.
- Webhook brány s platným a neplatným podpisem, opakovaný webhook, nesedí částka.
- Rezervace → schválení → platba → záznam v `pristupy` a `planyVytapeni` (mock IoT) → zrušení odvolá oba.
- Izolace obcí: úředník obce A nevidí a nezmění nic z obce B; anonymní nevidí cizí podání ani `internPoznamka`.
- Úklid po lhůtě: smazání dat a příloh, audit zůstane.
- Rate limit a honeypot: odmítnuté odeslání nevytvoří záznam.
- OIDC klient: průběh přihlášení proti mock poskytovateli (úspěch, zrušení, neplatný stav, nesouhlasný nonce).

Playwright (375 a 1280 px), tři vzorové formuláře plus rezervace a hlášení:
1. Přihlášení k poplatku za odpad: od otevření po číslo podání, QR platba s VS a částkou, e-mail v testovacím SMTP.
2. Hlášení závady: fotka, poloha, odeslání, stránka stavu přes sledovací kód.
3. Rezervace sálu: výběr termínu, schválení úředníkem v administraci, platba označená z importovaného výpisu, kód na stavu.
4. Chybové stavy: server vrátí 500 (data zůstanou), příloha mimo allowlist.

axe (`pnpm a11y`): bez chyb na stránkách seznam formulářů, formulář odpadu, formulář hlášení, životní situace, kalendář rezervace, stav podání, v obou šířkách. Manuální kontrola klávesnicí zapsaná do `docs/specs/urad-pristupnost.md`.
</testy>

<postup>
Na začátku sepiš plán a seznam úkolů a průběžně ho odškrtávej. Stav drž v `docs/progress.json`. Každý milník končí `pnpm typecheck`, `pnpm lint`, `pnpm test` (a tam, kde je to uvedeno, `pnpm e2e` a `pnpm a11y`) a commitem česky v rozkazovacím způsobu. Po dvou neúspěšných opravách téhož problému zastav, napiš, co zkoušíš, a navrhni jiný postup.

0. Příprava: přečti vstupy, ověř verze přes `npm view`, zapiš rozhodnutí (šifrování tajemství, knihovna pro PDF/A, QR, antivir) do `docs/rozhodnuti.md`, založ `docs/verification-log.md`.
1. Datový model: kolekce, migrace, přístupové funkce, triggery (audit, exkluzivní omezení rezervací), testy izolace obcí.
2. Konstruktor formulářů: typy v `packages/typy`, překlad na zod, administrace, vykreslení na webu, tři jednodušší vzorové formuláře (dotaz, závada, odpad).
3. Podání: číslo, stavy, JSON a PDF/A, e-mail podatelny, potvrzení, stav pro občana, sledovací kód, fronta a opakování.
4. Ochrana: spam, přílohy, antivir, úklid po lhůtě, audit.
5. Hlášení závad: web, API (`POST /api/hlaseni-zavad`), fotky a moderace, administrace, veřejná mapa.
6. Poplatky a platby: sazebníky, výpočty, SPD a QR, VS, import výpisu, párování, připomínky; zbylé vzorové formuláře (pes, prostranství).
7. Rezervace: kalendář, cena, schválení, platba, `IotRezervace` a napojení na kolekce IoT.
8. Životní situace a stránky: kolekce, seed ze S20, stránky, odkazy na formuláře a státní služby.
9. Identita a integrace: OIDC klient NIA s mockem, kontrolní seznam v `integrace`, brána ComGate v testovacím režimu, rozhraní ISDS a exportu pro spisovky.
10. Seed Javoří Lhota, Playwright, axe, ověření položek z `<overit>`, dokumentace v `docs/specs/urad.md` (jak obec modul zapne, co musí zařídit sama).
</postup>

<hotovo_kdyz>
Příkazy v `apps/web` (a kořeni) projdou bez chyb: `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm e2e`, `pnpm a11y`.

Chování, které jde ukázat v obci Javoří Lhota (seed, modul `urad` zapnutý, účet obce [DOPLNIT: testovací IBAN]):
- [ ] Přihláška k odpadu: občan na 375 px vybere životní situaci Stěhuji se, otevře formulář, ten ukáže úroveň ověření a důvod, vyplní, ověří e-mail, dostane číslo podání a předpis podle sazebníku obce (v ukázce 900 Kč na osobu) s QR platbou: SPD řetězec je validní, VS je unikátní, pod QR je číslo účtu a částka. E-mail v testovacím SMTP má PDF/A a JSON, e-mail podatelny je odeslán. Po importu výpisu s tímto VS je platba `zaplacena` a podání ukazuje stav.
- [ ] Rezervace sálu: žádost s termínem, překryv je odmítnut, úředník v administraci rezervaci schválí, vznikne platba, po spárování platby vznikne v mock IoT časově omezený kód a plán předtopení, občan kód vidí a dostane e-mailem; zrušení kód odvolá. S vypnutým modulem `iot` rezervace funguje bez kódu.
- [ ] Hlášení závady z webu i z klienta API (skript simulující `apps/mobile`): obě skončí v kolekci `hlaseni-zavad` s fotkou bez EXIF, úředník změní stav a občan to uvidí přes sledovací kód; fotka s osobou jde zakrýt a veřejná mapa pak ukáže jen vyřešené hlášení bez osobních údajů.
- [ ] Všechny sazby, splatnosti a úlevy jsou ve sazebníku, v kódu žádná kromě testovacích fixtures.
- [ ] Vyplnění formuláře s úrovní `nia` u obce bez produkční konfigurace ukáže offline cestu, nerozbije se.
- [ ] Testy izolace dvou obcí a append-only audit projdou.
- [ ] Každá položka z `<overit>` je buď ověřena a zapsána do `docs/verification-log.md` se zdrojem a datem, nebo označena `[OVĚŘIT]` v kódu i dokumentaci.
</hotovo_kdyz>

<overit>
Vše níže je z rešerše NEOVĚŘENO. Ověř z primárního zdroje, nebo v kódu nech `[OVĚŘIT]` a vypiš v závěru.

| Položka | Jak ověřit |
|---|---|
| Aktuální znění ZoPDS a zákona č. 565/1990 Sb. k 11/2026 (novely po 1. 1. 2025: sazby odpadu, psa, prostranství, § 14a, § 11b, § 11c) | e-Sbírka, zakonyprolidi.cz |
| § 37 odst. 4 správního řádu (potvrzení podání, lhůta) a subsidiarita daňového řádu u poplatkových ohlášení | e-Sbírka, MV 121/2012 |
| Ceníky a API bran: ComGate (údaj z roku 2024: 0,9 % + 1 Kč), GP webpay, GoPay, ČSOB, KB Smartpay, Stripe CZ | weby bran, dokumentace API |
| Bankovní API pro párování (Fio, ČSOB, KB, Air Bank), formáty GPC a ABO, CAMT.053 | dokumentace bank, specifikace formátů |
| Podmínky připojení k NIA, cena, lhůty, PKCE a klientská autentizace OIDC, možnost agenta OVM | info.identita.gov.cz, DIA |
| Aktuální technická specifikace ISDS (WSDL, Technical Annex), podmínky pro SaaS a třetí strany, pověřená osoba | mojedatovaschranka.cz, provozní řád ISDS (podklad je z roku 2012) |
| NSESSS a API spisových služeb (GINIS XRG, VERA, Triada, Alis, Munis) | mvcr.cz, dokumentace dodavatelů |
| PSD2: zda přesměrování na bránu nebo čtení výpisů není platební služba; výjimka technického poskytovatele | právník, ČNB, zákon č. 370/2017 Sb. |
| SPD v1.2: CRC32, přesné limity polí | qr-platba.cz (standard v1.2) |
| Antivir pro přílohy (ClamAV v EU nebo placená EU služba), generování a validace PDF/A (veraPDF), proof-of-work knihovna | dokumentace nástrojů, licence |
| Rozpočtová skladba a označení VS a SS u poplatků | ekonomka obce |
| Struktura vzorové OZV | sbirkapp.gov.cz |
| Katalog služeb: požadované atributy popisu služby | dia.gov.cz, metodika evidence služeb |
| Konkurence (Gordic GINIS Portál občana, Triada, Alis, Munis, Obec Online): funkce a ceny | ruční rešerše, jen pro orientaci, do kódu nezasahuje |
</overit>

<zaver>
Na konci napiš krátké shrnutí v české řeči:
- Hotovo: seznam milníků a u každého důkaz (výstup příkazů, názvy testů, co jde ukázat v Javoří Lhotě).
- Zbývá: co nebylo dokončeno nebo čeká na údaj od obce či právníka.
- Místa `[DOPLNIT]` a `[OVĚŘIT]` s cestou k souboru.
- Nová rozhodnutí zapsaná do `docs/rozhodnuti.md` a závislosti na promptech 01, 02 a 04, které jsi musel nahradit rozhraním.
</zaver>
