# Prompt: Digitální úřad

Použití: vlož celý tento soubor do Claude Code v kořeni repozitáře /home/claude/codecom.
Závisí na: 01 Web obce a CMS (multi-tenant, kolekce `obce`, role, úřední deska), 02 Mobilní aplikace (kolekce `obcane`, klient API z tohoto promptu), 04 IoT budovy (kolekce `budovy`, `planyVytapeni`, `pristupy`). Co v repu ještě chybí, nahraď úzkým rozhraním z <architektura> a označ `[DOPLNIT: napojit na prompt 0X]`.

<kontext>
Samosprávné služby obce (poplatky, pronájem sálu, hlášení závad, dotaz) obec digitálně poskytovat nemusí: podle § 14 odst. 3 zákona č. 12/2020 Sb. (ZoPDS) je to její právo, ne povinnost. Povinnost digitálních služeb (konec pětileté lhůty 1. 2. 2025, ověř) dopadá hlavně na přenesenou působnost. Prodejní argument modulu proto není „musíte“, ale: občan vyřídí věc z domova, referent nepřepisuje papír a služby jdou zařadit do Katalogu služeb. Malá obec takový nástroj sama nepostaví.

Modul `urad` (hodnota v `obce.moduly`) běží v `apps/web`: kolekce Payloadu, administrace úředníka, stránky webu obce a REST API. `apps/mobile` stejné API používá, vlastní logiku úřadu v aplikaci nepostav.

Přečti: `CLAUDE.md` (zejména pravidla 3 Peníze a 6 Úřad je fallback), `docs/navrh-platformy/05-digitalizace-uradu.md`, `research/poznamky/digitalni_urad.md` (sekce Inferences a Gaps jsou NEOVĚŘENO), `research/zprava-podklady-pro-prompty.md` sekce 3 a 7, `design/prototypy/S20-Urad.dc.html`, `docs/pravni-dokumenty.md` části A, B (příloha B1 se lhůtami uložení), C a E, `docs/rozhodnuti.md`. Demo obec je Javoří Lhota (684 obyvatel, okres Klatovy).
</kontext>

<cil>
Na konci funguje v `apps/web` modul Úřad. Občan vybere životní situaci, vyplní verzovaný formulář s identifikací přesně podle toho, co služba vyžaduje, dostane číslo podání a potvrzení e-mailem a vidí stav podle práce úředníka. Poplatek zaplatí QR platbou přímo na účet obce, sál si rezervuje se schválením a po zaplacení dostane časově omezený kód a předtopení. Závadu nahlásí z webu i z aplikace přes totéž API. Podání chodí do elektronické podatelny e-mailem; obec může zapnout další kanály (ISDS, export pro spisovku, platební bránu), když na ně má vlastní smlouvy.
</cil>

<vychozi_stav>
V `apps/web` je Payload 3.91 s kolekcemi `aktuality`, `uredni-deska`, `kategorie-desky`, `krizova-hlaseni`, `zastupitele`, `dokumenty`, `media`, `users`; helpery `src/access/roles.ts` (`isStaff`, `isAdmin`, `publishedOr`), `src/lib/revalidate.ts` (`obnovit`), `src/lib/datum.ts`; migrace v `src/migrations`; Vitest, PGlite. Převezmi styl kolekcí (`labels`, `admin.group: 'Úřad'`, verze, indexy, přístup v samostatném souboru). Nová schémata jen novou migrací, nasazené migrace neměň.

Prompt 01 zavádí multi-tenant a role superadmin, spravce, redaktor. Dokud to v repu není, piš přístup přes `hasRole` a tenanta přes pole `obec`, aby šlo přepnout na jednom místě.

Z prototypu S20 převezmi stránku Životní situace (výběr situace, kroky se štítky Online, Na úřadě, Proběhne samo, údaj „Poradí“) a čtyři ukázkové situace (stěhování, narození dítěte, stavba, úmrtí) jako seed. Komponenty piš přes tokeny z `packages/tokeny`, aby fungovaly ve všech 20 šablonách.
</vychozi_stav>

<rozsah>
Postav:
1. Konstruktor formulářů (`formulare`): verzované schéma, šest vzorových formulářů, vykreslení na webu.
2. Podání (`podani`): číslo, JSON a PDF/A, potvrzení e-mailem, stavy, předání e-mailem do podatelny, rozhraní pro ISDS a export spisovky.
3. Úrovně identifikace včetně obecného OIDC klienta pro NIA.
4. Platby (`platby`): QR platba SPD, variabilní symboly, párování z výpisu, volitelná brána (jeden referenční adaptér).
5. Místní poplatky (`poplatky`, `sazebniky-poplatku`): konfigurovatelné sazby, výpočet, připomínky.
6. Rezervace (`prostory`, `rezervace`) s napojením na IoT.
7. Hlášení závad (`hlaseni-zavad`) s fotkami, moderací a volitelnou veřejnou mapou.
8. Životní situace (`zivotni-situace`).
9. Ochrana proti spamu, validace příloh, audit, lhůty uložení, seed Javoří Lhota, testy.

Mimo rozsah:
- Spisová služba, účetnictví, evidence obyvatel (vstupem je CSV od obce).
- Čtení datové schránky obce; ISDS je v MVP jen rozhraní a dokumentace.
- Držení nebo převod peněz, iniciace platby z účtu plátce.
- Rozhodování ve správním řízení; modul podání přijme a předá.
- Mobilní obrazovky (02), řízení IoT (04), AI (05), státní formuláře DIA (jen odkaz ze situace).
</rozsah>

<architektura>
Složky v `apps/web/src`:

```
collections/urad/   Formulare, Podani, Platby, Poplatky, SazebnikyPoplatku, Prostory, Rezervace,
                    HlaseniZavad, ZivotniSituace, Integrace, AuditUradu
lib/urad/           formular/ (schema, zod, podminky), podani/ (prijmi, stavy, cislo, pdfa, predani/),
                    identita/, platby/ (spd, vs, parovani/, brany/), poplatky/ (vypocet, pripominky),
                    rezervace/ (dostupnost, iot), ochrana/ (spam, prilohy, antivir)
app/(web)/urad/     formulare, zivotni-situace, hlaseni-zavad, rezervace, moje-podani
packages/typy       zod schémata definice formuláře a veřejné DTO (sdílí web i aplikace)
```

Pole `obec` (tenant) mají všechny kolekce. Kolekce `Integrace` drží tajemství obce (klíče brány, token banky, OIDC klient, certifikát NIA, přístup ISDS) šifrovaně (AES-256-GCM s klíčem z `.env`, nebo Supabase Vault; rozhodni a zapiš). Tajemství se nevrací v API ani ve výpisu.

Koncové body (tenant podle `?obec=<slug>` nebo domény; zod vstup; chyby `{chyba: {kod, zprava}}` česky):

| Cesta | Účel | Identita |
|---|---|---|
| GET /api/urad/formulare?obec=, /<klic> | seznam a aktuální definice | žádná |
| POST /api/urad/podani | multipart `data` + `prilohy[]` → `{cislo, stav, platba?}` | podle formuláře |
| GET /api/urad/podani/<cislo>, /moje-podani | stav podání | sledovací kód, nebo účet |
| POST /api/hlaseni-zavad | sdílené rozhraní → `{cislo, sledovaciKod}` | žádná, nebo účet |
| GET /api/urad/hlaseni-zavad/mapa?obec= | vyřešená hlášení bez osobních údajů | žádná |
| GET /api/urad/prostory?obec=, /<id>/dostupnost?od=&do= | prostory, obsazené intervaly | žádná |
| POST /api/urad/rezervace | žádost → `{cislo, stav}` | ověřený e-mail |
| GET /api/urad/platby/<id> | částka, VS, SPD řetězec, stav | vlastník |
| POST /api/urad/platby/webhook/<poskytovatel> | notifikace brány | podpis |
| GET /api/urad/zivotni-situace?obec= | situace s kroky | žádná |

Identitu občana pro mobil bere z `obcane` (prompt 02). Dokud není, napiš jediné místo `ziskejObcana(req): Promise<{id: string} | null>` a v testech ho mockuj.

Rozhraní adaptérů:

```ts
interface PredaniPodani { id: 'email' | 'isds' | 'spisovka-export'
  predej(p: PodaniDTO, v: { json: Buffer; pdfa: Buffer; soubory: Soubor[] }): Promise<{ ok: boolean; reference?: string; chyba?: string }> }
interface PlatebniBrana { id: string
  vytvor(p: PlatbaDTO, navrat: URL): Promise<{ platbaUrl: string; idBrany: string }>
  overWebhook(req: Request): Promise<{ idBrany: string; stav: 'zaplacena' | 'zrusena' | 'ceka'; castka: number }> }
interface PoskytovatelIdentity { zacni(o: ObecDTO, navrat: URL): Promise<URL>
  dokonci(req: Request): Promise<{ klic: string; atributy: Record<string, string> }> }
interface IotRezervace { vytvorPristupAPlan(r: RezervaceDTO): Promise<{ pristupId: string; planId?: string }>; zrus(r: RezervaceDTO): Promise<void> }
```

Tok podání: spam kontrola → identita → zod validace na serveru (stejné schéma jako v prohlížeči) → kontrola příloh → zápis `podani` (číslo, snapshot verze formuláře) → JSON a PDF/A → předání adaptérem (fronta s opakováním) → e-mail občanovi → případná platba.

IoT a aplikace nesahají do tabulek `podani`, `platby`, `rezervace`, jen do API. Rezervace volá IoT jen přes `IotRezervace`. Bez modulu `iot` rezervace funguje bez kódu a předtopení a UI to neslibuje.
</architektura>

<datovy_model>
Názvy polí česky bez diakritiky. Kolekce mimo sdílený seznam (`sazebniky-poplatku`, `integrace`, `audit-uradu`, tabulky `variabilni_symboly`, `pohyby_banky`) zapiš do `docs/rozhodnuti.md`.

**formulare**: klic (unikátní v obci), nazev, popis, agenda (poplatky, rezervace, hlaseni, dotaz, ostatni), typPodani (`podnet`, `spravni_podani`, `soukromopravni`), uroven (`none`, `email_verified`, `nia`, `ds_or_uep`), duvodUrovne (povinné nad `none`, zobrazí se občanovi), alternativaPotvrzeni (podání bez ověření + výzva k potvrzení podle § 37 odst. 4 SŘ, lhůta [OVĚŘIT]), definice (json), verze (auto, starší zůstávají, podání drží snapshot), predani (kanaly[], emailPodatelny, predmetSablona), platba (zapnuto, druh, castka nebo vzorec), lhutaUlozeniRoky (výchozí 2 od vyřízení dle přílohy B1), stav draft/published.

Definice formuláře (typy a zod schéma v `packages/typy`, validuje se při uložení):

```ts
type PoleDef = { klic: string; typ: 'text'|'dlouhyText'|'cislo'|'datum'|'email'|'telefon'|'vyber'|'ano_ne'|'adresa'|'poloha'|'soubor'
  popisek: string; napoveda?: string; povinne: boolean
  validace?: { min?: number; max?: number; delka?: [number, number]; vzor?: string; format?: 'psc'|'cip_psa' }
  podminka?: { pole: string; operator: 'rovno'|'nerovno'|'vyplneno'; hodnota?: string }
  ucelUdaje: string   // bez účelu pole nejde zveřejnit
  soubor?: { typy: string[]; maxMB: number; maxPocet: number } }
type DefiniceFormulare = { sekce: { nazev: string; pole: PoleDef[] }[] }
```

**podani**: cislo (`<kodObce>-<rok>-<6 číslic>`, atomická sekvence per obec a rok), formular, verzeFormulare, snapshotDefinice, data (šifrovaně), prilohy (soukromá media), uroven, identita (druh, klicSubjektu, e-mail; jen nutné), stav (`ceka_na_overeni`, `prijato`, `v_reseni`, `vyrizeno`, `zamitnuto`, `stazeno`), duvodZamitnuti (povinný při zamítnutí, vidí ho občan), verejnaOdpoved, internPoznamka (jen staff), prirazenoUzivateli, predani (pokusy: kanal, cas, ok, reference, chyba), platba, sledovaciKodHash, vyrizenoDne, smazatDo, obcan. Indexy (obec, stav), (obec, cislo), (smazatDo). Přechody: `ceka_na_overeni → prijato → v_reseni → vyrizeno | zamitnuto`, `prijato | v_reseni → stazeno`; zpět jen správce se zápisem do auditu. Stavový automat je čistá funkce v `stavy.ts`.

**platby**: cislo, zdroj (podani / rezervace / poplatek), castka (haléře, integer), mena, vs (≤ 10 číslic), ss, ucetObce (snapshot IBAN v čase vytvoření), spd, zpusob (`qr`, `brana`), brana, idBrany, stav (`vytvorena`, `ceka`, `zaplacena`, `nesedi_castka`, `zrusena`, `expirovana`, `vracena`), zaplacenoDne, zdrojParovani (`vypis`, `webhook`, `rucne`), splatnostDo. Tabulka `pohyby_banky` (obec, zdroj, datum, castka, vs, protiucet, zprava, sparovanoNa) umožní párování zopakovat. Tabulka `variabilni_symboly` má unikát (obec, vs). VS u poplatku je stabilní per poplatník a druh (obec ho může importovat ze svého účetnictví, jinak: 1 číslice druh, 2 číslice rok, 7 číslic pořadí); u podání a rezervací nový per platba; při kolizi se generuje nový.

**sazebniky-poplatku**: druh (`odpad`, `pes`, `verejne_prostranstvi`, `jiny`), cisloOZV, odkazNaOZV, platnostOd, platnostDo, sazby (json), ulevy[] (klic, popis, typ osvobození/sleva/procento, hodnota, podminka), splatnost, lhutaOhlaseni, zaokrouhleni, overenoDne. Změna sazby = nový sazebník, starý se nepřepisuje. **poplatky** (předpis poplatníkovi): druh, sazebnik, poplatnik (minimum údajů), obdobi, parametry (osoby, psi, m², dny), vypocteno (castka, rozpis), stav (`predepsano`, `zaplaceno`, `po_splatnosti`, `odepsano`), splatnostDo, vs, platba, pripominky, zdrojImportu. Import poplatníků z CSV s náhledem před zápisem.

**prostory**: nazev, typ, kapacita, popis, fotky, budova (vztah na IoT `budovy`, nepovinný), cenik[] (jednotka hodina/den/akce, cena, kategorieNajemce), kauce, minDelka, maxDelka, otevreno, pravidla, schvalovani (`vzdy`, `automaticky`), vyzadujePlatbuPredKodem, predtopeniMinut, cilovaTeplota, kodPlatiPredMinut, kodPlatiPoMinut. **rezervace**: cislo, prostor, od, do (UTC, zobrazení Europe/Prague), zadatel, ucel, pocetOsob, stav (`zadana`, `schvalena`, `zamitnuta`, `zaplacena`, `probehla`, `zrusena`), duvod, cena (rozpis), platba, iot (pristupId, planId). Exkluzivní omezení proti překryvu (btree_gist, `tstzrange(od, do)`) pro schválené a zaplacené rezervace; zda žádost termín drží, určí obec [DOPLNIT].

**hlaseni-zavad**: cislo, kategorie (osvetleni, komunikace, odpad, zelen, voda, mobiliar, jine; obec může doplnit), popis (5–1000 znaků), poloha (lat, lng, presnostM, popisMista), fotky[] (media, stavModerace `ceka`|`schvalena`|`zakryta`), stav (`nove`, `prijato`, `v_reseni`, `vyreseno`, `zamitnuto`), prirazenoUzivateli, internPoznamka, verejnaOdpoved, kontakt (e-mail, telefon, nepovinné), obcan, zdroj (`web`, `aplikace`), idempotencyKey (unikátní, nepovinné, z hlavičky `Idempotency-Key`, kterou posílá aplikace z promptu 02), sledovaciKodHash, zverejnitNaMape (výchozí vypnuto), vyreseno, smazatDo.

**zivotni-situace**: nazev, slug, kdo („Poradí …“, telefon `[DOPLNIT]`), kroky[] (nazev, typ `online`|`urad`|`samo`, text, odkaz: druh `formular`|`stranka`|`externi`, formular, url jen https z allowlistu hostů), poradi, publikovano.

**audit-uradu**: jen přidávání (kdo, co, na čem, před a po bez obsahu příloh, čas); trigger zakáže UPDATE a DELETE jako u úřední desky.
</datovy_model>

<funkce>
**Web.** `/urad/zivotni-situace`: výběr situace, kroky se štítky podle S20; krok „Online“ vede na formulář, krok „Na úřadě“ ukáže hodiny a telefon z `obce.uredniHodiny` a `kontakty`. Prázdný stav: žádná situace, ukaž hodiny a telefon úřadu. `/urad/formulare/<klic>`: nahoře blok „Co potřebujete“ s úrovní identifikace a `duvodUrovne` („Ověříme vás Identitou občana, protože jde o ohlášení poplatku“), pod formulářem vždy offline cesta (adresa, hodiny, telefon, datová schránka). Stavy: načítání jako kostra, chyba pole (text, `aria-describedby`, shrnutí chyb s fokusem), chyba serveru (data zůstanou, nabídne e-mail a telefon úřadu), úspěch (číslo podání, co bude dál). Koncept jen v `sessionStorage` bez příloh. `/urad/moje-podani`, `/urad/podani/<cislo>`: stav, historie, veřejná odpověď, důvod zamítnutí, stažení PDF/A; bez účtu přes číslo a sledovací kód.

**Úrovně identifikace.** Formulář vždy ukáže, jakou úroveň potřebuje a proč.

| Úroveň | Použití | Mechanismus |
|---|---|---|
| `none` | hlášení závady, dotaz | bez ověření, e-mail nepovinný |
| `email_verified` | přihlášky k poplatkům, rezervace | kód na e-mail (platnost 15 min, 5 pokusů), do zadání stav `ceka_na_overeni`; přihlášený občan ze `obcane` je ověřený |
| `nia` | kde zákon vyžaduje ověření totožnosti | OIDC klient proti Identitě občana, konfigurace per obec v `integrace`, minimum atributů, klíč `PersonIdentifier` |
| `ds_or_uep` | podání se silným účinkem | formulář neověřuje, ukáže pokyn podat z datové schránky (účinky podepsaného podání, § 18 zákona č. 300/2008 Sb.; z cizí DS je nutný uznávaný podpis přílohy) |

NIA: SeP registruje obec jako OVM přes svou datovou schránku, CodeKom ji technicky připojí přes SAML2/OIDC (test `tnia.identita.gov.cz`, produkce `nia.identita.gov.cz`). Produkce je jen pro subjekt s povinností ověřovat identitu, proto žadatelem je vždy obec; v kódu žádná výjimka „CodeKom jako SeP“. Postav obecného OIDC klienta a otestuj ho proti mock poskytovateli. V `integrace` ukaž obci kontrolní seznam registrace a stav (nenastaveno, test, produkce). Bez produkční konfigurace formulář s úrovní `nia` ukáže offline cestu a případnou alternativu s potvrzením.

**Vzorové formuláře** (seed, sazby ze sazebníku Javoří Lhoty, ne z kódu):
1. Přihlášení k poplatku za odpad: osoby (jméno, adresa, počet osob, datum vzniku povinnosti, podmíněné pole „vlastník bez přihlášených osob“), `email_verified`, `spravni_podani`; výsledek předpis + QR platba.
2. Poplatek ze psa: držitel, plemeno, datum narození psa, číslo čipu (nepovinné), 65+ (podmíněné), další pes.
3. Zábor veřejného prostranství: žadatel, účel, místo, plocha m², od a do, příloha plánek; výpočet m² × dny × sazba × násobitel účelu; schválení úředníkem před platbou.
4. Pronájem sálu: vstup do toku Rezervace.
5. Hlášení závady: pohled na `POST /api/hlaseni-zavad`, úroveň `none`.
6. Obecný dotaz: e-mail povinný pro odpověď, text, příloha, `podnet`.

Zveřejnění formuláře zablokuj, pokud pole nemá `ucelUdaje`, úroveň nad `none` nemá `duvodUrovne` nebo je zapnutá platba bez účtu obce.

**Podání a předání.** Výstup je `data.json` (se `schemaVersion`) a PDF/A souhrn s číslem, časem, obsahem a SHA-256 příloh; nástroj pro PDF/A a validaci veraPDF vyber a ověř [OVĚŘIT]. E-mail do podatelny: předmět `[<cislo>] <nazev>`, PDF/A, JSON a přílohy v limitu [DOPLNIT: limit podatelny obce], jinak odkaz s krátkou platností pro přihlášeného úředníka. Fronta s 5 pokusy a rostoucím odstupem; selhání je vidět v administraci. Potvrzení občanovi: číslo, shrnutí bez celých osobních údajů, odkaz na stav, e-mail při každé změně stavu.
- ISDS (adaptér za příznakem): doporučená varianta je spisovka obce s vlastním napojením, CodeKom DS nečte. Odeslání do DS nebo odpověď do schránky občana je fáze 2 s pověřenou osobou (§ 8 odst. 6–7 zákona č. 300/2008 Sb.) a systémovým certifikátem. Podklady: přílohy celkem 10 MB, 50 příjemců, volání způsobí přihlášení do schránky a doručení fikcí (§ 17 odst. 3), proto žádná automatika bez pokynu obce; rozhraní pro poskytovatele internetových služeb vyžaduje povolení provozovatele. Vše [OVĚŘIT].
- Export pro spisovky: ZIP (PDF/A, JSON, přílohy, `metadata.xml` s původcem, časem doručení, způsobem doručení, věcí). Vyjdi z NSESSS [OVĚŘIT]; API konkrétních systémů nepřidávej bez dokumentace dodavatele, v kódu `[OVĚŘIT: API <dodavatel>]`.

**Platby.**
- `sestavSpd({iban, castka, vs, ss, zprava, prijemce, splatnost})` je čistá funkce. Formát `SPD*1.0*ACC:…*AM:…*CC:CZK*X-VS:…*MSG:…*RN:…*DT:…*`; AM max 10 znaků s tečkou a 2 desetinnými místy, MSG max 60, RN max 35, X-VS max 10 číslic, bez diakritiky, `*` jako `%2A`, IBAN s kontrolou, QR s korekcí M. CRC32 jen pokud ho standard v1.2 vyžaduje [OVĚŘIT]. Test na příkladu `SPD*1.0*ACC:CZ3301000000000002970297*AM:555.55*CC:CZK*MSG:PRISPEVEK NA NADACI*`.
- Zobrazení: QR jako SVG ze serveru (aspoň 200 px) a pod ním textem účet, částka, VS, splatnost, aby šlo platit i bez QR.
- Brána je volitelná, jen s vlastní smlouvou obce a klíči v `integrace`. Referenční adaptér ComGate v testovacím režimu; ostatní brány (GP webpay, GoPay a další) jen prázdné adaptéry s odkazem na dokumentaci. Ceníky do kódu ani textů nepiš [OVĚŘIT]. Webhook s ověřeným podpisem, idempotentně, stav vždy potvrzený dotazem na API brány; nesedí-li částka, `nesedi_castka`.
- Párování: import GPC a ABO [OVĚŘIT formáty] a čtení přes API banky s tokenem jen pro čtení, který drží obec (reference Fio API, další banky po ověření). VS najde poplatek nebo platbu, shoda částky → `zaplacena`; jiná částka → `nesedi_castka`; neznámý VS → fronta nepárovaných. Ruční označení vyžaduje poznámku a jde do auditu.
- PSD2 (zákon č. 370/2017 Sb.): CodeKom jen zobrazuje údaje k platbě a čte výpisy s přístupem obce, neiniciuje platbu z účtu plátce a nedrží peníze. Zda přesměrování na bránu nebo čtení výpisů nevyžaduje licenci či výjimku technického poskytovatele, je [OVĚŘIT] právníkem; v kódu o tom komentář.

**Poplatky (zákon č. 565/1990 Sb.).** Hranice podle znění k 1. 1. 2025, které validace sazebníku hlídá jako varování a které je nutné ověřit pro 2026 a 2027 [OVĚŘIT]: odpad (obecní systém) nejvýš 1 200 Kč za osobu a rok, jinak odkládání z nemovité věci nejvýš 6 Kč/kg nebo 1 Kč/l, obec smí zavést jen jeden režim; pes nejvýš 1 500 Kč ročně, 65+ nejvýš 200 Kč, další pes +50 %; veřejné prostranství nejvýš 10 Kč za m² a den, u prodejních a reklamních zařízení až desetinásobek. Konkrétní sazby, úlevy a splatnost si nastavuje obec podle své OZV. `vypocet.ts` jsou čisté funkce (`vypoctiOdpad`, `vypoctiPsa`, `vypoctiProstranstvi`) vracející `{castka, rozpis[]}` v haléřích k rozhodnému dni, s poměrnou částí podle započatých měsíců. Pořadí úlev a zaokrouhlení ověř a nech konfigurovatelné. Připomínky: denní úloha pošle e-mail (a push přes API, má-li občan účet) [DOPLNIT: dny předem, výchozí 14 a 3] a jednou po splatnosti. Zvýšení za pozdní úhradu (§ 11c [OVĚŘIT]) a rozhodnutí vydává úředník, aplikace jen upozorní.

**Rezervace.** Občan vidí kalendář (obsazené intervaly bez jmen) a ceník, zadá termín a účel, ověří e-mail, systém spočítá cenu (jednotka × délka + kauce). Stav `zadana`, úředník ji v administraci schválí, nebo zamítne s důvodem (u `automaticky` při volném termínu rovnou). Po schválení vznikne platba (QR nebo brána); s `vyzadujePlatbuPredKodem` vznikne kód až po zaplacení. `IotRezervace.vytvorPristupAPlan` vytvoří v `pristupy` kód s platností od `od − kodPlatiPredMinut` do `do + kodPlatiPoMinut` (vazba na rezervaci a budovu) a v `planyVytapeni` předtopení od `od − predtopeniMinut` na `cilovaTeplota`. Názvy polí převezmi z promptu 04; dokud nejsou, definuj rozhraní a in-memory implementaci. Kód jde e-mailem a na stav rezervace, v logu jen maska. Zrušení nebo zamítnutí kód a plán odvolá. Text rezervace nesmí slibovat kód jako jediný přístup (zámek jde vždy otevřít klíčem). Stavy: prostor bez ceníku (cena dohodou, jen žádost), obsazený termín (nabídni nejbližší volný), selhání IoT (rezervace platí, úředník dostane úkol „kód nevytvořen“, občan informaci o zaslání kódu zvlášť).

**Hlášení závad.** Web `/urad/hlaseni-zavad`: kategorie, popis, až 3 fotky, poloha (mapa s ukazatelem a textový popis místa, bez povinného GPS), nepovinný e-mail, nepovinný souhlas se zveřejněním. Nad tlačítkem: „Tudy nehlaste nouzové situace. Volejte 112, 150, 155 nebo 158“ a pokyn nefotit lidi ani SPZ (`docs/pravni-dokumenty.md`, část E bod 3). `POST /api/hlaseni-zavad` přijme multipart z webu i aplikace, vrátí `{cislo, sledovaciKod}` (hash v databázi). Fotky: odstranit EXIF, zmenšit, uložit do soukromého úložiště; poloha jen z pole `poloha`. Administrace: filtry, mapa, přiřazení, `internPoznamka`, `verejnaOdpoved`, změna stavu s e-mailem. Moderace: úředník fotku schválí, nebo zakryje osoby a SPZ (nová zakrytá verze, originál jen pro staff do vyřízení). Veřejná mapa (volitelná per obec) vrací jen `zverejnitNaMape` a stav `vyreseno`: kategorie, veřejný popis, schválená fotka, poloha zaokrouhlená na [DOPLNIT: výchozí 10 m]; nikdy kontakt, poznámku ani identitu. Hlášení není podání podle správního řádu a nebíhají u něj správní lhůty; stránka říká, jak podat věc oficiálně.

**Administrace.** Skupina „Úřad“: fronta Ke zpracování (podání, hlášení, žádosti o rezervaci), detail podání (data, přílohy, historie, stav předání), nepárované platby, import výpisu a poplatníků, integrace s kontrolním seznamem. Tlačítka se slovesem („Schválit rezervaci“, „Zamítnout s důvodem“).
</funkce>

<pravidla>
- ZoPDS: samostatnou působnost obec poskytovat může (§ 14 odst. 3); fyzickou nepodnikající osobu nelze nutit k digitálnímu úkonu (§ 14 odst. 1), proto každá služba má offline cestu. Princip „jednou a dost“ (§ 7, § 9): neptej se na údaje, které obec má v registrech. Každý formulář má `agenda`, název služby, kdo může žádat, kanál, lhůtu, poplatek a právní předpis a v administraci export „popis služby“ pro zápis do Katalogu služeb. Samoobslužný portál s předvyplněním z NIA je ISVS obce a podléhá grafickému manuálu DIA; úrovně `none` a `email_verified` to nespouští. Zapnutí `nia` doprovoď upozorněním v `integrace` [OVĚŘIT s DIA].
- Typ podání určuje váhu: `podnet` nemá správní lhůty; `spravni_podani` chce identifikovatelného podatele a obec rozhodne o alternativě s potvrzením (§ 37 odst. 4 SŘ [OVĚŘIT]); `soukromopravni` (pronájem) stačí jméno a e-mail. Klasifikaci i texty nech schválit právníkem obce.
- Poplatky: správcem je obecní úřad (§ 15 zákona č. 565/1990 Sb. [OVĚŘIT]), ohlášení změn do 15 dnů (§ 14a), splatnost a lhůty podle OZV, u poplatků vyměřených rozhodnutím 30 dnů (§ 11b [OVĚŘIT]). Výzkumná zpráva potvrzuje jen znění k 1. 1. 2025 a čísla paragrafů kromě § 14a neuvádí. Označení platby (VS, SS, rozpočtová skladba) potvrzuje ekonomka obce [DOPLNIT].
- Peníze jdou jen na účet z `obce.cisloUctu`; bez něj nejdou zapnout platby.
- GDPR: správcem je obec, CodeKom zpracovatel (čl. 28). Doby uložení podle spisového a skartačního plánu (zákon č. 499/2004 Sb. [OVĚŘIT]), výchozí 2 roky od vyřízení; úloha `uklid` maže nebo anonymizuje po `smazatDo` a přílohy vždy s podáním. Originál evidence je ve spisovce obce, kopie u CodeKomu nežije déle, než je nutné [DOPLNIT: doba po předání]. Minimalizace: žádná rodná čísla ani zvláštní kategorie (smlouva B, čl. 4 odst. 3), datum narození jen kde to vyžaduje OZV. Stránka formuláře odkazuje na informaci o zpracování obce (část C).
- Žádná právní konstanta v kódu bez komentáře s paragrafem, datem ověření a záznamem v `docs/verification-log.md` (založ, pokud chybí).
</pravidla>

<design_a_pristupnost>
- `CLAUDE.md` a unslop: písmo nejvýš 600, bez vykřičníků a emoji, jedna akcentová barva, mřížka 4 px, text 17 px, dotyk aspoň 44 × 44 px, kontrast aspoň 4,5 : 1, barvy z tokenů.
- Formuláře: popisek nad polem (ne jen placeholder), účel údaje pod ním, jeden sloupec na 375 px, `autocomplete` (`given-name`, `email`, `street-address`, `postal-code`), správný `inputmode`, chyby textem i ikonou. Víc kroků jen nad 12 polí, s ukazatelem a návratem. Základní formulář jde odeslat klasickým POST bez JavaScriptu.
- Kalendář rezervace ovladatelný klávesnicí a na telefonu i jako seznam volných termínů; dostupnost nikdy jen barvou. Mapa hlášení a výběr polohy mají textovou alternativu.
- Stavy podání textem (Přijato, V řešení, Vyřízeno, Zamítnuto), změny v `aria-live="polite"`. Nahrávání: tlačítko i přetažení, seznam souborů s odebráním, srozumitelná chyba. WCAG 2.2 AA; prohlášení o přístupnosti webu doplň o modul.
</design_a_pristupnost>

<bezpecnost_a_soukromi>
- Spam bez sledování: honeypot, časová pastička (odeslání dřív než za 3 s), rate limit per IP a formulář v Postgresu (IP jen jako hash s denní solí, mazání po 24 h), při útoku proof-of-work (kandidát Altcha, ověř licenci a provoz v EU [OVĚŘIT]). Žádný reCAPTCHA ani služby třetích stran, jen nezbytné cookies (§ 89 odst. 3 zákona č. 127/2005 Sb.).
- Přílohy: allowlist (PDF, JPEG, PNG, WebP, podle formuláře DOCX/ODT), kontrola magic bytes, max 10 MB na soubor a 10 MB na podání (shoda s limitem ISDS), max 5 souborů, sanitace názvu, náhodný název v soukromém úložišti, přístup jen přes krátce platné odkazy pro staff. Antivir: ClamAV (clamd) na serveru v EU; podání s přílohami ve stavu „čeká na kontrolu“, dokud sken neprojde; služba nedostupná = nikdy bez kontroly [OVĚŘIT provoz, alternativa EU služba].
- Přístup: občan vidí jen svá podání a platby, anonym jen podle sledovacího kódu (aspoň 128 bitů, uložen jako hash, porovnání v konstantním čase). `internPoznamka` a přiřazení nikdy ve veřejném API. Zpracování podání: spravce a redaktor své obce; definice formulářů, sazebníky, `integrace` jen spravce. Test izolace dvou obcí pro každou kolekci.
- Webhooky: podpis, kontrola času, idempotence. Tajemství šifrovaná, v logu maska. Logy neobsahují obsah formulářů, kódy ani tokeny.
- Audit: změny stavů, schválení, ruční označení plateb, přístup k přílohám, změny integrace, append-only.
- DPIA pro polohu a fotky v hlášeních je podle části B ke kontrole advokátem. AI asistent do podání nevidí; zapiš do `docs/rozhodnuti.md`.
</bezpecnost_a_soukromi>

<testy>
Nástroje: Vitest (PGlite pro migrace a omezení), Testing Library, Playwright, axe-core, testovací SMTP (Mailpit nebo SMTP server v procesu testu).

Jednotkové:
- `vypocet.ts`: odpad (celý rok, poměrná část, osvobození), pes (základ, 65+, druhý pes), prostranství (m² × dny × sazba, násobitel), haléře, změna sazebníku k rozhodnému dni.
- `spd.ts`: příklad ze standardu, `%2A`, délky polí, diakritika, IBAN, nulová a záporná částka.
- Stavové automaty podání a rezervací včetně povinného důvodu zamítnutí.
- Překlad definice na zod: podmíněná pole, formáty, neznámé klíče.
- Číslo podání při 20 souběžných požadavcích bez duplicit; kolize VS.
- Párování: shoda, jiná částka, neznámý VS, opakovaný import téhož výpisu, vzorové GPC a ABO.
- Přílohy: falešná přípona, velikost, dvojitá přípona, název s cestou.
- Překryv rezervací včetně přechodu na letní čas.

Integrační:
- Podání → záznam → PDF/A (veraPDF, pokud běží v CI) → e-mail podatelny v testovacím SMTP (předmět, JSON, PDF/A) a potvrzení občanovi; selhání SMTP = opakování a viditelný stav.
- Webhook brány: platný a neplatný podpis, opakování, nesedí částka.
- Rezervace → schválení → platba → záznamy v `pristupy` a `planyVytapeni` (mock IoT) → zrušení je odvolá.
- Izolace obcí; anonym nevidí cizí podání ani `internPoznamka`; úklid po lhůtě; rate limit a honeypot nevytvoří záznam; OIDC proti mock poskytovateli (úspěch, zrušení, špatný stav, špatný nonce).

Playwright (375 a 1280 px), tři vzorové formuláře: přihláška k odpadu (po číslo podání, QR s VS a částkou, e-mail v SMTP), hlášení závady (fotka, poloha, stav přes sledovací kód), rezervace sálu (termín, schválení v administraci, platba z importovaného výpisu, kód); plus chyba serveru 500 (data zůstanou) a příloha mimo allowlist.

axe (`pnpm a11y`) bez chyb: seznam formulářů, formulář odpadu, formulář hlášení, životní situace, kalendář rezervace, stav podání, v obou šířkách. Ruční kontrolu klávesnicí zapiš do `docs/specs/urad-pristupnost.md`.
</testy>

<postup>
Na začátku sepiš plán a úkoly, stav drž v `docs/progress.json`. Každý milník končí `pnpm typecheck`, `pnpm lint`, `pnpm test` (kde je uvedeno i `pnpm e2e`, `pnpm a11y`) a commitem česky v rozkazovacím způsobu. Po dvou neúspěšných opravách téhož problému zastav, popiš zkoušené a navrhni jiný postup.

0. Příprava: vstupy, verze přes `npm view`, rozhodnutí (šifrování tajemství, PDF/A, QR, antivir) do `docs/rozhodnuti.md`, `docs/verification-log.md`.
1. Datový model: kolekce, migrace, přístup, triggery (audit, překryv rezervací), testy izolace obcí.
2. Konstruktor formulářů: typy v `packages/typy`, zod, administrace, vykreslení, vzory dotaz, závada, odpad.
3. Podání: číslo, stavy, JSON a PDF/A, e-mail podatelny, potvrzení, sledovací kód, fronta.
4. Ochrana: spam, přílohy, antivir, úklid, audit.
5. Hlášení závad: web, API, fotky a moderace, administrace, veřejná mapa.
6. Poplatky a platby: sazebníky, výpočty, SPD a QR, VS, párování, připomínky, vzory pes a prostranství.
7. Rezervace: kalendář, cena, schválení, platba, `IotRezervace`.
8. Životní situace: kolekce, seed ze S20, stránky, odkazy.
9. Identita a integrace: OIDC klient s mockem, kontrolní seznam NIA, ComGate v testovacím režimu, rozhraní ISDS a exportu.
10. Seed Javoří Lhota, Playwright, axe, položky z `<overit>`, `docs/specs/urad.md` (jak obec modul zapne a co musí zařídit sama).
</postup>

<hotovo_kdyz>
Projdou `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm e2e`, `pnpm a11y`. V obci Javoří Lhota (seed, modul `urad`, účet obce [DOPLNIT: testovací IBAN]) jde ukázat:
- [ ] Přihláška k odpadu: na 375 px od situace Stěhuji se přes formulář s uvedenou úrovní ověření a důvodem po ověření e-mailu k číslu podání a předpisu podle sazebníku (v ukázce 900 Kč na osobu) s QR platbou: SPD řetězec validní, VS unikátní, pod QR účet a částka. E-mail podatelny má PDF/A a JSON. Po importu výpisu s tímto VS je platba `zaplacena` a podání to ukazuje.
- [ ] Rezervace sálu: překryv odmítnut, úředník schválí, vznikne platba, po spárování vznikne v mock IoT časově omezený kód a předtopení, občan kód vidí a dostane e-mailem, zrušení oboje odvolá. Bez modulu `iot` rezervace funguje bez kódu.
- [ ] Hlášení závady z webu i ze skriptu simulujícího `apps/mobile` skončí v `hlaseni-zavad` s fotkou bez EXIF; změna stavu je vidět přes sledovací kód; fotka s osobou jde zakrýt a veřejná mapa ukáže jen vyřešené hlášení bez osobních údajů.
- [ ] Sazby, splatnosti a úlevy jsou jen ve sazebníku, v kódu nejsou kromě testovacích fixtures.
- [ ] Formulář s úrovní `nia` u obce bez produkční konfigurace ukáže offline cestu.
- [ ] Testy izolace dvou obcí a append-only auditu projdou.
- [ ] Každá položka z `<overit>` je zapsaná v `docs/verification-log.md` se zdrojem a datem, nebo označená `[OVĚŘIT]` v kódu.
</hotovo_kdyz>

<overit>
Vše je z rešerše NEOVĚŘENO. Ověř z primárního zdroje, nebo nech `[OVĚŘIT]` a vypiš v závěru.
- Znění ZoPDS a zákona č. 565/1990 Sb. k 11/2026 (novely po 1. 1. 2025: sazby, § 14a, § 11b, § 11c): e-Sbírka, zakonyprolidi.cz.
- § 37 odst. 4 správního řádu (potvrzení podání, lhůta) a subsidiarita daňového řádu u poplatkových ohlášení: e-Sbírka, MV 121/2012.
- Ceníky a API bran (ComGate údaj z roku 2024: 0,9 % + 1 Kč; GP webpay, GoPay, ČSOB, KB, Stripe CZ): weby bran.
- Bankovní API pro párování (Fio, ČSOB, KB, Air Bank), formáty GPC, ABO, CAMT.053: dokumentace bank.
- NIA: podmínky, cena, lhůty, PKCE a klientská autentizace OIDC, možnost agenta OVM: info.identita.gov.cz, DIA.
- ISDS: aktuální WSDL a Technical Annex, podmínky pro SaaS a třetí strany (podklad je z roku 2012): mojedatovaschranka.cz.
- NSESSS (Věstník MV 2025) a API spisovek (GINIS XRG, VERA, Triada, Alis, Munis): mvcr.cz, dodavatelé.
- PSD2: zda přesměrování na bránu nebo čtení výpisů není platební služba, výjimka technického poskytovatele: právník, ČNB, zákon č. 370/2017 Sb.
- SPD v1.2 (CRC32, limity polí): qr-platba.cz.
- Antivir (ClamAV v EU), PDF/A a veraPDF, proof-of-work knihovna: dokumentace a licence.
- Rozpočtová skladba, VS a SS u poplatků: ekonomka obce. Struktura vzorové OZV: sbirkapp.gov.cz. Atributy popisu služby v Katalogu služeb: dia.gov.cz.
</overit>

<zaver>
Na konci napiš česky: hotovo (milníky a důkaz: výstupy příkazů, názvy testů, co jde ukázat v Javoří Lhotě), zbývá (co čeká na údaj od obce nebo právníka), místa `[DOPLNIT]` a `[OVĚŘIT]` s cestou k souboru, nová rozhodnutí v `docs/rozhodnuti.md` a závislosti na promptech 01, 02 a 04, které jsi nahradil rozhraním.
</zaver>
