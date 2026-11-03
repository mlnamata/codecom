# Šest promptů CodeKom stojí na ověřených základech

**Každý z šesti promptů a sdílený CLAUDE.md musí mít tři vrstvy: tvrdé právní a technické požadavky se zdrojem, doporučená rozhodnutí a seznam bodů NEOVĚŘENO, které Claude Code ověří sám dřív, než je napíše do kódu.** Ověřená jádra jsou: vyhláška 515/2020 Sb. (14 povinných položek a osnova popisu úkonů), zákon 99/2019 Sb. (prohlášení o přístupnosti, EN 301 549 V3.2.1), zákon 12/2020 Sb. (samosprávné služby obec poskytovat nemusí, jen může), čl. 50 AI Act (platí od 2. 8. 2026, pokyny Komise z 20. 7. 2026) a CRA (hlášení od 11. 9. 2026). Verze z npm k 3. 11. 2026: Next.js 16.4.5, Payload 3.92.1 s peer `next >=16.3.3 <17`, React 19.3.1, Tailwind 4.3.4, supabase-js 2.118.0 a Expo 58.0.23. Poznámky se rozcházejí v tom, zda je aktuální Expo SDK 57 nebo 58. Platí SDK 58, protože datovaný záznam z npm (58.0.0 z 29. 9. 2026, latest z 3. 11. 2026) je konkrétnější než tvrzení o „nejnovější stabilní“ v poznámce psané podle changelogu SDK 57. Podrobnosti SDK 58 ale nikdo nenačetl, takže je prompt musí nechat ověřit. Největší mezery, které žádný prompt nesmí zamlčet, jsou: znění zákonů 250/2000, 128/2000, 500/2004 § 26 a 565/1990 k 11/2026 (e-Sbírka se nenačetla), ceníky a funkce konkurentů, české ceny GPU, a právní kvalifikace CodeKom (správce, zpracovatel, poskytovatel AI, výrobce podle CRA). Prompty proto nesmějí obsahovat žádné z neověřených čísel jako fakt; musí obsahovat kontrolní krok „ověř v e-Sbírce / u zdroje a zapiš do `docs/verification-log.md`“.

## Spor o verzi Expo SDK: platí SDK 58

| Zdroj | Tvrzení | Datum a povaha |
|---|---|---|
| Poznámka k mobilní aplikaci | „Aktuální stabilní je SDK 57 (30. 6. 2026; RN 0.86)“, doporučeno začít na 57; SDK 58 přijde „cca Q1 2027, datum NEOVĚŘENO“ | Odvozeno z changelogu SDK 57, bez dotazu na registr |
| Poznámka ke stacku | `expo` dist-tag latest **58.0.23 (3. 11. 2026)**; 58.0.0 vyšlo **29. 9. 2026**; 57.0.0 30. 6. 2026; 56.0.0 20. 5. 2026 | Přímý dotaz na [npm expo](https://registry.npmjs.org/expo) ke dni výzkumu |

Rozhodnutí: v souladu s pravidlem „konkrétnější datovaný zdroj vyhrává“ cílí prompt na **Expo SDK 58**. Poznámka k mobilní aplikaci sama označila datum SDK 58 jako neověřené a její odhad (Q1 2027) je vyvrácen registrem. Z mobilní poznámky přesto platí, co se týká 55–57: nová architektura je povinná od SDK 55, Hermes v1 výchozí od SDK 56, a SDK 57 oznámil, že SDK 58 zapne scene-based lifecycle výchozím nastavením pro Xcode 27 / iOS 27 ([changelog SDK 57](https://expo.dev/changelog/sdk-57.md)). Prompt proto musí říct: nepřepisuj verzi z paměti; spusť `npm view expo version`, přečti `https://expo.dev/changelog/sdk-58.md`, ověř verzi RN, minimální iOS/Xcode, breaking changes, stav Hermes v1 regrese (opravené v `expo@57.0.9`; v SDK 58 NEOVĚŘENO) a použij `npx expo install --fix` a `npx expo-doctor`. SDK 58 je v době psaní pět týdnů staré, takže prompt má povolit vrátit se na 57 jen s písemným zdůvodněním v `docs/decisions.md`.

## 1. Web obce a CMS: pevná struktura zákona nad multi-tenant Payloadem

### Požadavky se zdroji

| Oblast | Požadavek | Zdroj |
|---|---|---|
| Povinně zveřejňované informace | Vyhláška 515/2020 Sb.: § 1 pevná struktura Přílohy č. 1, v daném pořadí a s danými názvy; **14 hlavních položek** (1 Název … 4 Kontakty s podpoložkami 4.1–4.8, 8 Dokumenty 8.1–8.2, 11, 12, 13 … 14 Výroční zpráva dle 106/1999); § 2 osnova popisu úkonů dle Přílohy č. 2 (**cca 21 polí**); ruší vyhl. 442/2006 a 416/2008 | [epravo.cz, vyhl. 515/2020](https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2020/515) |
| Výroční zpráva 106/1999 | Obce ji publikují přes portál.gov.cz (modul crvz-106) | [portal.gov.cz](https://portal.gov.cz/moduly/crvz-106/q43a56s-obec-mokre/2025/prioha/1733) |
| Elektronická úřední deska | Nepřetržitě veřejně přístupná a dálkově přístupná; veřejnou vyhláškou doručeno **15. dnem po vyvěšení**; NSS 2 As 47/2016: vyvěšení se musí evidovat a umět prokázat, mazání bez záznamu je problematické | [Právní prostor, Kasl 2016](https://www.pravniprostor.cz/clanky/spravni-pravo/archivace-elektronicke-uredni-desky) |
| Přístupnost | Zákon 99/2019 Sb.: obce jsou povinný subjekt (§ 3); principy POUR (§ 4); prohlášení o přístupnosti na každé stránce nebo odkazem (§ 8); podnět k nápravě (§ 9); dozor DIA, náprava max. 6 měsíců (§ 11) | [epravo.cz, zák. 99/2019](https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2019/99) |
| Technická norma | Metodický pokyn DIA (v1.6/1.7) vyžaduje **EN 301 549 V3.2.1**, kap. 9, úroveň A–AA; obsahuje vzor prohlášení | [DIA v1.6](https://www.dia.gov.cz/wp-content/uploads/2023/06/Metodicky_pokyn_-_pristupnost_internetovych_stranek_a_mobilnich_aplikaci_v1-6-DIA.pdf); [DIA FAQ](https://www.dia.gov.cz/media/2142/download/Nej%C4%8Dast%C4%9Bj%C5%A1%C3%AD%20dotazy.pdf) uvádí minimum WCAG 2.1 AA |
| Design systém | gov.cz Design System 4.7.3, EUPL v1.2, podpora React; povinnost JVS od 30. 4. 2026 je podle načtené stránky uvedena pro ústřední státní správu, obce výslovně ne | [designsystem.gov.cz](https://designsystem.gov.cz) |
| Veřejné zakázky (kontext) | Od 1. 1. 2026 limity ZZVZ: služby a dodávky 3 491 000 Kč / 5 386 000 Kč, stavební práce 134 764 000 Kč | [API agentura](https://apiagentura.gov.cz/wp-content/uploads/2025/12/nove-financni-limity-od-1.1.2026.pdf) |

### Doporučená technická rozhodnutí

| Téma | Rozhodnutí | Důvod |
|---|---|---|
| Verze | Pin přesně shodných verzí `payload` a všech `@payloadcms/*` na **3.92.1** (peer vyžaduje přesnou shodu); Next **16.4.x** (peer `>=16.3.3 <17`); React 19.3.x; Tailwind 4.3.x; shadcn CLI 4.23; supabase-js 2.118 (ne 3.0.0-next); Payload 4 jen canary, nepoužít | npm registr k 3. 11. 2026, [@payloadcms/next 3.92.1](https://registry.npmjs.org/@payloadcms/next/3.92.1) |
| Multi-tenance | Jeden deployment + `@payloadcms/plugin-multi-tenant`; „staff“ a „citizens“ jako oddělené auth kolekce; `cleanupAfterTenantDelete: false` nebo přísný access na Tenants; veřejné formuláře nastavují tenant server-side přes Local API | [Payload multi-tenant docs](https://payloadcms.com/docs/plugins/multi-tenant) |
| Izolace | Povinné acceptance kritérium: automatické cross-tenant testy (Vitest + Playwright), protože plugin hlídá jen aplikační vrstvu a přímé SQL ji obchází | Úsudek z docs pluginu |
| Domény | Middleware `proxy.ts` čte Host, hledá tenant (cache s tagem), rewrite na `/[tenantDomain]/[slug]` mimo `admin` a `api`; Vercel multi-tenant model, domény přes API | [Vercel for Platforms](https://vercel.com/docs/platforms) |
| Cache | `cacheComponents: true`, `use cache` vždy s explicitním `cacheLife`; `revalidateTag(tag, { expire: 0 })` pro úřední desku, krizová upozornění a webhooky, `'max'` pro ostatní stránky; tagy `tenant:{id}:notice-board` (max 256 znaků); `cookies()`/`headers()` číst mimo `use cache`; Draft Mode obchází cache | [use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache), [revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag) |
| Data v EU | Supabase v EU regionu (Frankfurt), Vercel `regions: ["fra1"]` (výchozí je iad1, failover jde přes USA); osobní data občanů necachovat na CDN | [Vercel regions](https://vercel.com/docs/regions) |
| Postgres | Transaction pooler 6543 s malým `pool.max`, migrace přes direct nebo session 5432; user `postgres.[REF]` vs `postgres`; v transaction módu bez prepared statements | [Supabase connecting](https://supabase.com/docs/guides/database/connecting-to-postgres) |
| Povinné informace | Datový model `PovinneInformace` s 14 pevnými sekcemi a podpoložkami; pořadí a názvy neměnné, editovatelný je jen obsah; předvyplnění z dat obce (IČO, DS, adresa); předpřipravené popisy typických úkonů (odpad, pes, hrobové místo, ověření podpisu) | Odvozeno z vyhl. 515/2020 |
| Úřední deska | Záznam {název, původce, vyvěšeno, sejmuto (nejdříve 15. den), kdo vložil, hash souboru, verze}; append-only audit log; po sejmutí nemazat, jen archivovat interně; před zveřejněním anonymizační checklist; RSS/JSON export | Odvozeno z NSS 2 As 47/2016 |
| Přístupnost | Cíl WCAG 2.2 AA (zpětně kompatibilní s 2.1); generátor prohlášení z šablony DIA; odkaz v patičce každé stránky; CI s `@axe-core/playwright` 4.14 a Pa11y; editor vynucuje alt texty, hierarchii nadpisů a kontrast; 20 šablon s vlastní identitou obce | [DIA](https://www.dia.gov.cz/wp-content/uploads/2023/06/Metodicky_pokyn_-_pristupnost_internetovych_stranek_a_mobilnich_aplikaci_v1-6-DIA.pdf) |
| Cookies | Jen nezbytné cookies (session editoru, CSRF) + analytika bez zápisu do zařízení (self-hosted Plausible/Umami, anonymizovaná IP), žádné Google Fonts a vložená videa/mapy bez 2-click řešení → bez cookie lišty | Konzervativní výklad § 89 odst. 3 zák. 127/2005 |
| Vyhledávání | `unaccent` + `simple` konfigurace + `pg_trgm`; stemming přes hunspell na Supabase pravděpodobně nedostupný; Meilisearch/Typesense v EU jako plán B | Úsudek |
| Design systém | Použít tokeny a komponenty gov.cz DS jako základ přístupnosti, ale nepoužít státní logo ani lištu, aby web nepůsobil jako státní | Úsudek; pravidla znaku NEOVĚŘENA |

### NEOVĚŘENO: úkoly pro Claude Code

| Bod | Jak ověřit |
|---|---|
| Lhůty zveřejnění rozpočtu, výhledu a závěrečného účtu (§ 11, § 17 zák. 250/2000; z paměti 15 dnů před projednáním, závěrečný účet po dobu 6 let) | Aktuální znění v e-Sbírce; do kódu dát jako konfiguraci s odkazem na paragraf |
| Zveřejnění zápisu ze zastupitelstva do 15 dnů (§ 95 odst. 2 zák. 128/2000, z paměti) | e-Sbírka |
| Text § 26 správního řádu (doba vyvěšení, elektronická deska) a metodika MV k elektronickým deskám | e-Sbírka, [MV soubor](https://mvcr.cz/soubor/mv-113940-2-as-2020.aspx) |
| Rozpor v účinnosti vyhl. 515/2020 (1. 8. 2021 vs. § 4 „15. den po vyhlášení“) a případné novely | Záložka Historie v e-Sbírce |
| Existence sankcí v zák. 99/2019 (načtený text je neobsahuje) | Plné znění; v marketingu o pokutách netvrdit |
| Harmonizace novější EN 301 549 v OJ EU; rozdíl metodiky v1.6 vs. v1.7 | Úřední věstník EU, DIA |
| Právní stav cookie výjimky pro analytiku bez zápisu do zařízení | Stanovisko ÚOOÚ; do té doby bez cookies, localStorage a fingerprintu |
| Podpora `cacheComponents` v Payload 3.92, známé problémy Payload + Next 16.4 (Turbopack, cache) | `gh issue list`, changelog Payloadu |
| Dostupnost `unaccent`, `pg_trgm` a českého slovníku na Supabase | `list_extensions` / `pg_available_extensions` |
| Payload S3 adapter se Supabase Storage (endpoint, `forcePathStyle`, RLS), limity Vercelu pro stovky vlastních domén | Dokumentace, test na projektu |
| Licenční povinnosti EUPL v1.2 při úpravě komponent v SaaS | Právník |

## 2. Mobilní aplikace: Expo SDK 58, role úřad na serveru, push s abstrakcí

### Požadavky se zdroji

| Oblast | Požadavek | Zdroj |
|---|---|---|
| Google Play | Od **31. 8. 2026** nové aplikace a aktualizace targetují Android 16 (API 36); prodloužení do 1. 11. 2026 už skončilo; Government apps declaration povinná, nezavádějící tvrzení o vládní příslušnosti zakázáno, nespojené aplikace uvedou zdroje a že nereprezentují vládu, u procesů typu ověření ID může být nutný doklad oprávnění | [Android target SDK](https://developer.android.com/google/play/requirements/target-sdk); [Play: government information](https://support.google.com/googleplay/android-developer/answer/9514050?hl=en) |
| Apple – účet | 4.8 Sign in with Apple jen při nabídce sociálního loginu (vlastní account systém výjimka); 5.1.1(v) smazání účtu v aplikaci; 5.1.1(ix) regulované oblasti jen právnická osoba | [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) |
| Apple – obsah a platby | 1.2 UGC (fotky v hlášeních): filtr, nahlášení, blokace, kontakt; 3.1.3(e) platby mimo IAP; 4.2.2 nativní hodnota; 4.5.4 push nesmí být nutný; 5.1.2(i) souhlas při sdílení dat s third-party AI | [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) |
| Apple – privacy | `PrivacyInfo.xcprivacy` (aplikace i SDK; Hermes je na seznamu SDK s manifestem); nový věkový dotazník 13+/16+/18+ | [Apple Developer News](https://developer.apple.com/news/?id=ks775ehf); sekundárně [newly.app](https://newly.app/guides/third-party-sdk-privacy-manifest) |
| Expo Push | Limit 600 notifikací/s, batch max 100, receipts po cca 15 min (mažou se po 24 h), `DeviceNotRegistered` = přestat posílat, payload max 4 KiB, žádné SLA, doručení at-least-once; kanál na Androidu musí existovat jinak se nezobrazí | [Expo: sending notifications](https://docs.expo.dev/push-notifications/sending-notifications/) |
| Android kanály | Po vytvoření lze měnit jen jméno a popis, proto verzovat ID (`crisis_v1`); remote push nefunguje v Expo Go na Androidu | [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) |
| SecureStore | Keychain / Android Keystore; `requireAuthentication` pro biometrii; iOS data mohou přežít reinstalaci; neukládat velké blobby | [SecureStore](https://docs.expo.dev/versions/latest/sdk/secure-store/) |
| NIA | Do produkce jen soukromoprávní subjekty s právní povinností ověřovat totožnost; žádost datovou zprávou na DIA | [Příručka kvalifikovaného poskytovatele](https://info.identita.gov.cz/download/SeP_PriruckaKvalifikovanehoPoskytovatele.pdf) |
| Přístupnost | Zákon 99/2019: mobilní aplikace od 23. 6. 2021, definice „vytvořený povinným subjektem nebo pro něj“, takže dopadá nepřímo přes obce | [zákon 99/2019](https://www.zakonyprolidi.cz/cs/2019-99) |
| AI Act čl. 50 | Transparentnost chatbotů od 2. 8. 2026 | [Stephenson Harwood](https://www.stephensonharwood.com/post/102nfqh/eu-ai-act-update-european-commission-adopts-guidelines-on-article-50-transparency-obligations/) |

### Doporučená technická rozhodnutí

| Téma | Rozhodnutí |
|---|---|
| Platforma | Expo SDK **58**, Expo Router, development build + EAS Build (ne Expo Go); novější changelogy SDK 55 → 58 projít kvůli breaking changes (např. pole `notification` v app.json odstraněno, config plugin; `eas update` vyžaduje `--environment`; `expo prebuild` regeneruje nativní složky) |
| Offline | TanStack Query s persistí + `expo-sqlite` (úřední deska, dokumenty, fronta hlášení); MMKV jen pro preference; tokeny jen v SecureStore |
| Autentizace | Supabase Auth, e-mail OTP (6 číslic, ne magic link), čtení bez účtu; bez Google/Facebook loginu tedy bez Sign in with Apple; smazání účtu v aplikaci + webová URL pro Google Play |
| Role úřad | Vynucovat na serveru (RLS, claims), `requireAuthentication` pro tokeny úřadu; demo účet úřadu pro review |
| Push | Abstrakce odesílače (Expo Push nyní, přímý FCM/APNs přes `getDevicePushTokenAsync` jako výhled); segmentace vlastní tabulkou `subscription(device_id, obec_id, cast_obce_id, kategorie)`; 3 Android kanály (krizový, důležitý, informační); iOS krizové jako `time-sensitive`, `critical` jen jako žádost o entitlement bez závislosti; aplikace není náhradou oficiálního varování IZS |
| Fotky a poloha | „When in use“ jen při hlášení, ruční výběr bodu jako alternativa; `expo-image-manipulator` (delší strana cca 1600 px), EXIF GPS odstranit klientsky i serverově; signed upload do Supabase Storage v EU; moderace úřadem před zveřejněním |
| Přístupnost | `accessibilityLabel/Role/State`, `maxFontSizeMultiplier`, kontrast 4,5:1, cíle min. 44 pt / 48 dp, reduce motion; manuálně VoiceOver a TalkBack |
| Bezpečnost | OWASP MASVS L1, pro roli úřad L2; pinning certifikátů nepoužít napevno |
| Listing | „Neoficiální / provozuje CodeKom jménem obcí“, zdroje (domény obcí), organizační vývojářský účet, privacy policy v aplikaci i listingu; předvyplnit App Privacy a Data safety (e-mail, přesná poloha jen při hlášení, fotky, diagnostika, push token) |
| AI v aplikaci | Štítek „AI asistent“ při první interakci a trvale v hlavičce, citace zdroje, souhlas při externím LLM |
| Konkurence | Munipolis: 4,2/5 z 499 hodnocení, 153,4 MB, iOS 15+, hlášení závad a push ([App Store](https://apps.apple.com/cz/app/munipolis/id1378883073?l=cs)); V obraze: 3,4/5 z 68, přes 2600 organizací, věk 16+ ([App Store](https://apps.apple.com/cz/app/v-obraze-v%C3%ADm-co-se-děje/id1128876118?l=cs)); Zlepšeme Česko cílí na hlášení závad ([CzechCrunch 2018](https://cc.cz/nova-platforma-zlepseme-cesko-umozni-lidem-resit-komunalni-problemy-pres-mobilni-telefon/)). Diferenciace CodeKom: AI nad dokumenty obce, role úřad ve stejné aplikaci, IoT stav budov, rezervace a platby |

### NEOVĚŘENO: úkoly pro Claude Code

| Bod | Jak ověřit |
|---|---|
| SDK 58: verze RN, min. iOS/Xcode, breaking changes, stav Hermes v1 regrese, scene lifecycle | `expo.dev/changelog/sdk-58.md`, `expo-doctor` |
| Kompatibilita TanStack Query v5 a MMKV s RN verzí SDK 58; i18n knihovna; politika EAS Update vs. Apple 3.3.2 | Dokumentace a `npm view` |
| Dopad změny Expo Router (bez React Navigation od SDK 56) na deep linking a universal links | Docs Expo Router |
| Apple Critical Alerts (reálná šance schválení), entitlement Time Sensitive, Android `USE_FULL_SCREEN_INTENT` a DND bypass | Primární dokumentace Apple a Google (poznámka měla jen sekundární [newly.app](https://newly.app/articles/critical-alerts-entitlement)) |
| Google Play požadavek na smazání účtu (web URL + in-app) a Data safety; věkové hodnocení při UGC a AI | Play Console |
| Primární dokumentace Apple privacy manifestu (list required-reason API) | developer.apple.com |
| Možnost NIA pro soukromého dodavatele obcí; mobilní app-to-app tok | Dotaz na DIA; v MVP vynechat |
| EAA (směrnice 2019/882) pro platby a rezervace; EU DSA / trader status v App Store | Právník |
| Hlášenka, Obec v mobilu, Google Play hodnocení, aktuální počty obcí Munipolisu, ceny | Ruční průchod listingů |
| Znění čl. 50 AI Act na EUR-Lex a dopad Digital Omnibus | EUR-Lex |
| Expo SDK a expo-image-picker (`exif: false`), Android 14 selected photos access | docs.expo.dev |

## 3. Digitální úřad obce: samosprávné služby dobrovolně, bez vlastního ISDS v MVP

### Požadavky se zdroji

| Oblast | Požadavek | Zdroj |
|---|---|---|
| ZoPDS (zák. 12/2020) | § 3 právo na digitální služby, § 4 odst. 1 kanály (datová schránka, kontaktní místo, podepsaný e-mail, ISVS s eID); § 4 odst. 3 formuláře přes DIA; § 7 a § 9 „jednou a dost“; § 14 odst. 1 nelze nutit fyzické nepodnikající osoby, papír zůstává; **§ 14 odst. 3 územní samosprávný celek v samostatné působnosti služby poskytovat může, nemusí**; 1. 2. 2025 konec pětileté lhůty pro přenesenou působnost | [Školení ZoPDS, Kraj Vysočina](https://extranet.kr-vysocina.cz/download/odbor_informatiky/prezentace/ComDays/30-11-23/ZoPDS/20230930%20Skoleni%20ZoPDS.pdf) |
| Samoobslužný portál s předvyplněním | Musí být ISVS, spravovaný OVM, v federaci NIA, v grafickém manuálu DIA, podporovat kanály § 4 | tamtéž |
| Podání z DS | Účinky podepsaného písemného podání (§ 18 odst. 2 zák. 300/2008), cizí DS vyžaduje uznávaný podpis přílohy | [epravo.cz](https://www.epravo.cz/top/clanky/k-problematice-absence-elektronickeho-podpisu-podani-a-jeho-priloh-99574.html) |
| NIA SeP | Registrace OVM přes datovou schránku; protokoly SAML 2/eIDAS, OpenID Connect, WS-Federation; test `tnia.identita.gov.cz`, produkce `nia.identita.gov.cz`; produkční šifrovací certifikát povinný; atributy minimalizovat; uživatel schvaluje každý atribut; soukromé subjekty do produkce jen s právní povinností ověřovat identitu | [SeP příručka](https://info.identita.gov.cz/download/SeP_PriruckaKvalifikovanehoPoskytovatele.pdf) |
| ISDS | SOAP služby dm_operations, dm_info, db_access; limit příloh 10 MB, 50 příjemců; systémový certifikát pro aplikace třetích stran; rozhraní pro poskytovatele internetových služeb jen s povolením provozovatele; většina volání dm_info způsobí přihlášení do schránky a doručení fikcí (§ 17 odst. 3) | [Provozní řád ISDS (2012)](https://testrs.gov.cz/smlouva/soubor/37256/Provozni_rad_ISDS.pdf) |
| Spisová služba | Atest podle NSESSS; Gordic GINIS Express (do 5 tis. obyvatel) nabízí podatelnu, portál občana, platby, rozhraní XRG | [Gordic eGC SaaS](https://www.dia.gov.cz/wp-content/uploads/2023/03/eGc-Nabidka_cloud_computingu-SaaS_c_1-2020_spol_Gordic_-_20210723.pdf) |
| QR platba | SPD v1.2 (účinný od 1. 1. 2022): `SPD*1.0*`, ACC (IBAN), AM (max 10 znaků, 2 desetinná místa), CC, X-VS/X-SS/X-KS (max 10 číslic), MSG (max 60), RN (max 35), DT, CRC32; `*` kódovat %2A; korekce QR úroveň M | [qr-platba.cz](https://qr-platba.cz/wp-content/uploads/1645-standard-qr-v1-2-cerven-2021.pdf) |
| PSD2 | PISP definováno v § 2 odst. 1 písm. k) zák. 370/2017; licence ČNB (kapitál 20 000–125 000 EUR, řízení 5–10 měsíců; článek z roku 2018) | [epravo.cz PSD2](https://epravo.cz/top/clanky/psd2-a-nova-platebni-sluzba-neprime-udeleni-platebniho-prikazu-107127.html) |
| Místní poplatky (zák. 565/1990, znění k 1. 1. 2025, verze 25) | Pes max 1 500 Kč/rok (65+ max 200 Kč, +50 % za dalšího psa); veřejné prostranství max 10 Kč/m²/den (až 10× u prodejních a reklamních zařízení); odpad: jen jeden z režimů, buď obecní systém max 1 200 Kč/rok, nebo odkládání z nemovité věci max 6 Kč/kg nebo 1 Kč/l; ohlášení změn do 15 dnů (§ 14a); u poplatků vyměřených rozhodnutím 30 dnů; zvýšení až dvojnásobek | [zakonyprolidi 565/1990](https://www.zakonyprolidi.cz/cs/1990-565) |

### Doporučená technická rozhodnutí

| Téma | Rozhodnutí |
|---|---|
| Právní pozice | CodeKom je dodavatel obce, ne poskytovatel eID; prodejní argument je soulad s katalogem služeb, ne „musíte“ |
| Formuláře | Každý formulář nese `identification_level` ∈ {none, email_verified, nia, ds_or_uep} a `typ_podani` ∈ {podnět, správní podání, soukromoprávní}; ohlášení poplatků vyžadují identifikovatelného poplatníka, alternativa: podání bez ověření + potvrzení do 5 dnů (§ 37 odst. 4 SŘ), rozhodne obec |
| Bez NIA v MVP | Anonymní a e-mailem ověřené formuláře se vyhnou požadavku ISVS a grafického manuálu; NIA jako fáze 2 s konfigurací per obec (redirect URI, šifrovací certifikát, tajemství v Supabase Vault) a klíčem účtu `PersonIdentifier` |
| Předání podání | Adaptér spisovky jako plugin: (a) e-mail do podatelny s PDF/A + strojově čitelná příloha, (b) odeslání do DS obce, (c) později API konkrétních systémů (GINIS XRG); CodeKom v MVP nečte DS obce |
| Platby | Obec je merchant: vlastní smlouva s bránou (Comgate, GP webpay, GoPay), API klíče šifrovaně per tenant, CodeKom nedrží peníze; QR platba SPD s variabilním symbolem unikátním per plátce a typ poplatku; párování z bankovního API (např. FIO read-only) nebo importem GPC/ABO/CAMT.053 |
| Sazby | Nikdy nehardcodovat; konfigurace per obec s verzováním platnosti OZV (sazby, splatnost, osvobození, období, lhůty); odpad vstupem z CSV od obce |
| Archiv | Podání ukládat i jako PDF/A s metadaty; audit log append-only |

### NEOVĚŘENO: úkoly pro Claude Code

| Bod | Jak ověřit |
|---|---|
| Konsolidované znění ZoPDS a 565/1990 k 11/2026 (novely po 1. 1. 2025) | e-Sbírka |
| Text § 37 odst. 4 SŘ; podání poplatkových ohlášení a subsidiarita daňového řádu | e-Sbírka, [MV 121/2012](https://mv.gov.cz/soubor/121-2012-potvrzeni-nebo-doplneni-podani-ucineneho-podle-37-odst-4-spravniho-radu.aspx) |
| Aktuální technická specifikace ISDS (WSDL, Technical Annex), podmínky pro SaaS a povolení třetí strany; dokument je z roku 2012 | mojedatovaschranka.cz |
| Může dodavatel vystupovat jako agent OVM u NIA; PKCE a klientská autentizace OIDC; ceny a lhůty | DIA, info.identitaobcana.cz |
| Aktuální NSESSS (Věstník MV 2025), API a podíl systémů VERA, Triada, Alis, Munis | mvcr.cz, vendoři |
| Ceníky bran (Comgate z roku 2024: 0,9 % + 1 Kč je z [Banky.cz](https://www.banky.cz/clanky/recenze-platebni-brany-comgate-jak-funguje-a-jake-jsou-jeji-vyhody-a-nevyhody/), nutno aktualizovat), GP webpay, GoPay, Stripe CZ | Weby bran |
| Zda „přesměrování na bránu“ není PISP; výjimka technického poskytovatele | Právník, ČNB |
| Rozpočtová skladba platby a označení VS/SS u poplatků | Ekonomka obce |
| Struktura vzorové OZV | sbirkapp.gov.cz |
| Konkurenti (Gordic, Triada, Alis/Munis, Obec Online): ceny a funkce | Ruční rešerše |

## 4. IoT pro obecní budovy: fail-safe lokálně, NIS2 a CRA jako dodavatel

### Požadavky se zdroji

| Oblast | Požadavek | Zdroj |
|---|---|---|
| NIS2 v ČR | Zákon 264/2025 Sb. účinný od **1. 11. 2025**; vyhl. 408/2025, 409/2025 (vyšší režim), 410/2025 (nižší režim); u obcí se podpůrný materiál NÚKIB zaměřuje na obce s rozšířenou působností, službu „Výkon svěřených pravomocí“ a nižší režim; podpůrná aktiva zahrnují dodavatele, hardware, software i budovy | [SPČR / NÚKIB přehled](https://www.spcr.cz/sites/default/files/2025-10/Prehledne-novy-zakon-o-kyberneticke-bezpecnosti.pdf); [NÚKIB podpůrný materiál](https://portal.nukib.gov.cz/storage/uploads/2026/01/05/podpurny-material-obce_v1-1_uid_695bc95eab8c0.pdf) |
| CRA | **11. 9. 2026** hlášení aktivně zneužívaných zranitelností a závažných incidentů (24 h, ENISA Single Reporting Platform); **11. 12. 2027** plná použitelnost | [Espressif](https://developer.espressif.com/blog/2026/09/esp32-cra-obligations-and-deadlines/); [McCann FitzGerald](https://www.mccannfitzgerald.com/knowledge/data-privacy-and-cyber-risk/cyber-resilience-act-reporting-obligations-apply-from-11-september-2026) |
| Home Assistant | Supervisor je podporován jen na Home Assistant OS | [HA: Unsupported OS](https://www.home-assistant.io/more-info/unsupported/os) |
| Danfoss Ally | Zigbee 3.0; k uvedení do provozu s Ally Gateway je internet nutný; při ztrátě spojení hlavice reguluje na nastavenou teplotu, ruční kolečko; max. 32 zařízení na bránu | [Danfoss Ally support](https://www.danfoss.com/en/products/dhs/smart-heating/solutions/danfoss-ally/danfoss-ally-support/) |
| Shelly BLU TRV | Lokální RPC přes HTTP na BLU Gateway Gen3 (`BluTrv.Call`, `TRV.SetTarget`), webhooky `blutrv.temperature_change` (>0,5 °C) a `blutrv.position_change` (>5 %), MQTT a Outbound Websocket | [Shelly API](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen3/ShellyBluGwG3) |
| Zámky | Nuki přes API: předplatné SmartHosting, kódy vyžadují Keypad, offline kódy nejsou; Salto KS: předplatné, vzdálený přístup vyžaduje Salto KS IQ; oba cloud-first | [Seam: Nuki Pro 5](https://www.seam.co/smartlocks/nuki_smart-lock-pro-5th-gen); [Booking Experts: Salto KS](https://help.bookingexperts.com/en/articles/6844022-salto-ks-installation-and-settings) |
| Telemetrie | TimescaleDB je na Supabase s Postgres 17 deprecated (jen Apache 2 Edition), doporučen nativní partitioning s `pg_partman`; Postgres 14 končí 1. 7. 2026 | [Supabase timescaledb](https://supabase.com/docs/guides/database/extensions/timescaledb); [Supabase changelog](https://supabase.com/changelog/45827-deprecation-notice-support-for-postgres-14-ending-on-1st-july-2026) |

### Doporučená technická rozhodnutí

| Téma | Rozhodnutí |
|---|---|
| Brána | Headless driver vrstva (HA OS na mini PC, nebo vlastní agent) řízená přes REST/WebSocket; logika kritická pro bezpečnost (mráz, ruční režim) nesmí záviset na HA ani cloudu |
| Vrstvení fail-safe | 1. protimrazové minimum v samotné hlavici, 2. lokální pravidla na bráně, 3. cloud jen plánování a reporting; zámky vždy s mechanickým cylindrem a klíčem u starosty/hasičů |
| Zařízení | Pro TRV lokálně nejlépe doložené Shelly BLU TRV; Danfoss Ally přes cizí Zigbee koordinátor je pravděpodobné, ale neověřené; zámky pro pronajímanou halu jen s ověřeným lokálním API nebo relé |
| Telemetrie | `telemetry_raw` nativně partitionovaná přes `pg_partman`, rollupy 15 min / hod / den přes `pg_cron`, retence raw dat jako konfigurace (návrh 90 dní), ne TimescaleDB |
| Příkazy | Tabulka `device_commands` se stavy queued/sent/acked/failed, idempotency key, TTL; audit log otevření dveří append-only s RLS |
| Bezpečnost dodavatele | MFA, logování, správa zranitelností, SBOM, postup hlášení incidentů; příprava pro CRA a pro obce s regulovanou službou |
| Marketing úspor | Jen rozsah s uvedeným zdrojem, žádná čísla výrobců bez označení |

### NEOVĚŘENO: úkoly pro Claude Code

| Bod | Jak ověřit |
|---|---|
| Je CodeKom výrobcem produktu s digitálními prvky podle CRA (mini PC s vlastním softwarem) nebo poskytuje SaaS | Právník; nezapisovat do prompty jako fakt |
| RED delegovaný akt a EN 18031 (datum použitelnosti), zda brány s Zigbee/Wi-Fi spadají pod RED | EUR-Lex |
| Přesné povinnosti dodavatele podle zák. 264/2025 vůči významným obcím | Plné znění, vyhl. 410/2025 |
| Dostupnost `pg_partman` a `pg_cron` na Supabase, limity Realtime | `list_extensions`, docs |
| Lokální Nuki Bridge HTTP API, Salto KS API a offline chování | Dokumentace výrobců |
| Ceny v Kč (Ally, Shelly, Bosch, Eurotronic, Eastron, Nuki), Modbus/M-Bus, KNX, LoRaWAN, Z-Wave, Matter | Další průzkum |
| Node-RED, ThingsBoard Edge, WireGuard/Tailscale, MQTT TLS, OTA (Balena, Mender), HA REST/WebSocket | Další průzkum |
| Požární a únikové požadavky na zámky (EN 179, EN 1125), pojištění | Odborník |
| Aktuální dotace 2026 (OPŽP, Modernizační fond, NPO, IROP) a ověřené úspory v českých obcích; nalezená výzva z let 2015–2016 je neaktuální | SFŽP, MPO |
| GDPR k audit logu vstupů (právní základ, retence, DPIA) | Skill/DPIA |

## 5. AI asistent na lokálním LLM serveru: nejdřív vlastní měření češtiny

### Požadavky se zdroji

| Oblast | Požadavek | Zdroj |
|---|---|---|
| AI Act čl. 50(1) | Pokyny Komise z **20. 7. 2026** (nezávazné): oznámení v prostém jazyce na začátku relace, trvalý odznak nebo mluvené prohlášení; vágní „asistent“ nebo skrytí v podmínkách nestačí; zvláštní péče u dětí, seniorů a méně digitálně gramotných; pokuty až 15 mil. EUR nebo 3 % obratu; přechod do 2. 12. 2026 pro značení generovaného obsahu (čl. 50(2)) u systémů na trhu před 2. 8. 2026 | [Stephenson Harwood](https://www.stephensonharwood.com/post/102nfqh/eu-ai-act-update-european-commission-adopts-guidelines-on-article-50-transparency-obligations/) |
| Apple | 5.1.2(i): sdílení dat s externím AI vyžaduje souhlas | [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) |
| Embedding | bge-m3: 1024 dimenzí, 8192 tokenů, 100+ jazyků, MIT, dense + sparse + multi-vector, doporučen hybrid s rerankerem | [HF bge-m3](https://huggingface.co/BAAI/bge-m3) |
| pgvector | Stejný model pro dokumenty i dotaz, ladit práh podobnosti, řadit přímo podle distance výrazu, jinak se index nepoužije | [Supabase vector columns](https://supabase.com/docs/guides/ai/vector-columns) |
| Modely | K 29. 10. 2026 agregátor uvádí Gemma 4 31B (Apache-2.0, skóre 54,4) a Qwen3.8-27B (Apache-2.0, 54,3); Gemma 4 31B-it: 30,7 B parametrů, kontext až 256K, čeština výslovně nejmenována | [BenchLM](https://benchlm.ai/blog/posts/best-open-source-llm); [HF Gemma 4 31B-it](https://huggingface.co/google/gemma-4-31b-it) |
| Čeština | BenCzechMark: 50 úloh, 8–9 kategorií; MiniCzechBenchmark (NeurIPS 2025) | [arXiv 2412.17933](https://arxiv.org/abs/2412.17933v1); [NeurIPS 2025](https://neurips.cc/virtual/2025/122449) |
| Serving | vLLM: structured outputs (JSON schema), OpenAI-kompatibilní server | [vLLM docs](https://docs.vllm.ai/en/latest/features/structured_outputs.html) |
| Hardware | RTX PRO 6000 Blackwell (96 GB) v USA cca 8 900–11 500 USD; RTX 5090 od cca 4 000 USD; pronájem u evropských hosterů (NovoServe, IONOS, INTROSERV) | [Digital Citizen](https://www.digitalcitizen.life/nvidia-rtx-pro-6000-blackwell-prices-climb-past-10000-as-ai-demand-keeps-rising/) |

### Doporučená technická rozhodnutí

| Téma | Rozhodnutí |
|---|---|
| Model | A/B test Gemma 4 31B a Qwen3.8-27B na vlastní české sadě; rozhoduje věrnost kontextu a správné odmítání, ne obecné skóre; modely s „community“ licencí číst před použitím |
| Hardware | Jedna 96GB karta pojme 27–31B model ve FP8 (cca 31 GB) i s velkým KV cache (výpočet, změřit); druhá pro redundanci; server v ČR kolokací nebo pronájmem, poskytovatele ověřit |
| Data | Texty a vektory dokumentů obcí v lokálním Postgresu s pgvector u LLM serveru, ne v Supabase cloudu, pokud má platit „data zůstávají v ČR“; do specifikace zapsat rozhodnutí výslovně |
| Retrieval | Hybrid: pgvector (HNSW) + Postgres FTS (`unaccent`, cs) + RRF; reranker bge-reranker-v2-m3; filtr `obec_id` + `platnost_do` |
| Chunkování | Podle struktury (část, článek, odstavec) s metadaty `obec_id, dokument_id, verze, platnost_od/do, typ, url, strana`; ceník a svozový kalendář jako strukturovaná data |
| Výstup | Strukturovaný JSON {odpověď, id_chunků, odmítnuto}; server ověří, že citované id jsou v kontextu; bez citace nebo pod prahem rerankeru → „Tuto informaci nemám v dokumentech obce“ + kontakt na úřad |
| Obrana | Dokumenty jako nedůvěryhodná data, asistent bez nástrojů a akcí, whitelist domén obce pro URL |
| Evaluace | 100–300 ručně ověřených otázek na typ obce včetně neodpověditelných a injekčních; recall@k, faithfulness, citation precision, správné odmítnutí |
| Transparentnost | Text „Jsem AI asistent, ne člověk“ při otevření + trvalý odznak ve webu i aplikaci |
| Logování | Bez identity a IP, krátká retence (návrh 30 dní), pseudonymizace |

### NEOVĚŘENO: úkoly pro Claude Code

| Bod | Jak ověřit |
|---|---|
| Pořadí na BenCzechMark pro Gemma 4, Qwen3.8, Mistral, Llama; české modely 2026 | [HF Space CZLC/BenCzechMark](https://huggingface.co/spaces/CZLC/BenCzechMark); všechny názvy a čísla BenchLM jsou po datu znalostí a mimo kartu Gemma 4 bez druhého zdroje |
| Embeddingy 2026 (multilingual-e5, jina, Qwen3-Embedding) v češtině; licence a velikost rerankeru | HF karty |
| `guided_json` vs. `structured_outputs` v aktuální verzi vLLM; throughput, souběh, SGLang, llama.cpp, Ollama | vLLM docs, zátěžový test |
| OCR skenů s češtinou (ocrmypdf, Tesseract, Docling) | Test na vzorcích |
| České ceny GPU, spotřeba, GPU hosting v ČR | Cenové nabídky |
| Role CodeKom (poskytovatel) a obce (deployer), klasifikace mimo vysoké riziko (příloha III), Digital Omnibus u čl. 50 | Primární text EUR-Lex, právník |
| Stanovisko ÚOOÚ k chatbotům ve veřejné správě | uoou.gov.cz |
| DPIA pro AI (systematické zpracování, logy) | Skill DPIA / právník |

## 6. Marketingový web CodeKom: každé tvrzení musí unést kontrolu starosty

### Požadavky se zdroji

| Oblast | Požadavek | Zdroj |
|---|---|---|
| Přístupnost vlastního webu | CodeKom prodává soulad, takže vlastní prohlášení o přístupnosti a WCAG 2.2 AA jsou nutnost; obce jako zákazník se na to ptají | [zák. 99/2019](https://www.epravo.cz/top/zakony/sbirka-zakonu/sb/2019/99) |
| Cookies | Bez lišty a bez třetích stran je důvěryhodné a konzistentní s produktem | Viz sekce 1 |
| Zakázky | Limity ZZVZ od 1. 1. 2026: 3 491 000 / 5 386 000 Kč (nadlimitní); běžná roční cena SaaS je hluboko pod nimi, takže rozhoduje rada nebo starosta | [API agentura](https://apiagentura.gov.cz/wp-content/uploads/2025/12/nove-financni-limity-od-1.1.2026.pdf) |
| AI | Pokud je na webu chatbot, platí čl. 50 od 2. 8. 2026 | Viz sekce 5 |
| Trh | Munipolis (dříve Mobilní rozhlas): 600 tis. uživatelů, expanze do Německa; aplikace 4,2/5; V obraze přes 2600 organizací | [CzechCrunch 2021](https://cc.cz/2021/04/mobilni-rozhlas-se-meni-na-munipolis-a-miri-do-nemecka-dalsi-na-rade-bude-spanelsko-a-velka-britanie/); [App Store](https://apps.apple.com/cz/app/munipolis/id1378883073?l=cs) |

### Doporučená rozhodnutí

| Téma | Rozhodnutí |
|---|---|
| Struktura | Hero s hlavní hodnotou a viditelnou cenou, funkce po šesti modulech, živé demo obce s ukázkou 20 šablon, sekce souladu (515/2020, 99/2019, 106/1999), ceník, reference, FAQ pro starosty a úředníky, formulář „Chci demo“ + telefon |
| Důvěra | Region dat v EU (přesný region uvést), DPA dle čl. 28 GDPR ke stažení, export všeho v otevřených formátech do 30 dnů bez poplatku (jako závazek, který musí produkt splnit), SLA a česká podpora s lhůtami, bez dlouhého závazku |
| Podklad pro obec | Balíček pro radu: šablona usnesení, cenová nabídka, DPA; smlouva do registru smluv |
| Tvrzení | Nepsat nic o pokutách (zákon 99/2019 v načteném textu sankce neobsahuje), nezaručovat dotace („pomůžeme s podklady“), neuvádět procentuální úspory bez zdroje, neuvádět konkurenční ceny, dokud nejsou ověřeny |
| SEO | Hledané výrazy k ověření: „web pro obec“, „elektronická úřední deska“, „přístupnost webu obce“, „povinné informace obec vyhláška 515/2020“, „prohlášení o přístupnosti obec vzor“ |
| Kanály | SMO ČR, SPOV, MAS regiony, webináře pro starosty, reference |
| Technika | Stejný stack jako CMS (sekce 1), statický obsah, Lighthouse a axe v CI |

### NEOVĚŘENO: úkoly pro Claude Code

| Bod | Jak ověřit |
|---|---|
| Ceny a funkce Vismo, Galileo, Munipolis, Antee, Obce na webu (weby se nepodařilo načíst) | Ruční rešerše 8–10 webů a smlouvy v registru smluv; do webu jen jako ověřená data s datem |
| Limit VZMR (z paměti 2 mil. Kč služby a dodávky, 6 mil. Kč stavby podle § 27 ZZVZ) a případná novela 2025/2026 | e-Sbírka; vzorová směrnice [MV](https://mvcr.cz/soubor/vnitrni-smernice-pro-zadavani-verejnych-zakazek-maleho-rozsahu-priklad-smernice-obce.aspx) |
| Povinnost zveřejnění smlouvy v registru (zák. 340/2015) a limit 50 tis. Kč | e-Sbírka |
| Dotace 2026–2027 (NPO, IROP, programy Plzeňského kraje) a stránka MV „Jak na obecní web“ | Přečíst nalezené dokumenty, např. [MMR factsheet](https://www.mmr.cz/getmedia/88941948-d5d9-4561-8646-9696559f9960/Factsheet-eGov.pdf.aspx?ext=.pdf) |
| Klíčová slova a chování starostů | Marketing Miner, Sklik |
| Reference a počty obcí (nesmějí být vymyšlené) | Pouze skutečné; do launche placeholder |

## 7. Sdílený CLAUDE.md a promptování: krátký soubor, tvrdá pravidla v hookách

### Požadavky se zdroji (Claude Code)

| Téma | Doporučení Anthropicu | Zdroj |
|---|---|---|
| Rozdělení | Nedeterministické: prompt, CLAUDE.md, skills; deterministické: hooky, deny pravidla, testy, Stop hook, CI; co Claude míjí, patří do hooku | [Best practices](https://code.claude.com/docs/en/best-practices) |
| Obsah CLAUDE.md | Jen to, co Claude nezjistí z kódu: příkazy pro ověření, zavádějící místa, rozhodnutí mimo repo, vše opravené dvakrát | [Best practices](https://code.claude.com/docs/en/best-practices) |
| Velikost | Pod 200 řádků; scope přes `.claude/rules/*.md` s `paths:`; `@path` importy do hloubky 4; rozporné instrukce Claude řeší libovolně; `/doctor prompt-audit` | [Memory docs](https://code.claude.com/docs/en/memory) |
| AGENTS.md | Čte se jen bez CLAUDE.md; jinak importovat `@AGENTS.md` | [Memory docs](https://code.claude.com/docs/en/memory) |
| Ověření | Spustitelný pass/fail check, `Stop` hook (`pnpm tsc --noEmit 1>&2 \|\| exit 2`; po 8 blocích v řadě harness blok přebije), `/goal`, review ve fresh subagentu s pokynem přeskočit styl, požadovat důkaz | [Best practices](https://code.claude.com/docs/en/best-practices) |
| Oprávnění | `deny` platí ve všech režimech; `Read(./.env)` nezachytí skript, který soubor otevře, proto sandbox | [Best practices](https://code.claude.com/docs/en/best-practices) |
| Struktura promptu | XML tagy, dlouhá data nahoru a dotaz na konec (až o 30 % lepší kvalita v testech Anthropicu), vysvětlení „proč“, kladné formulace | [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) |
| Dlouhé úlohy | Stavový soubor, `progress.txt`, git jako checkpointy, „Do not stop tasks early“, proti over-engineeringu a proti hardcodování pro testy | [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) |
| Model a úsilí | Výchozí Opus 5.5 (medium); `/effort high\|xhigh` pro schéma a bezpečnost | [Best practices](https://code.claude.com/docs/en/best-practices) |

### Doporučená rozhodnutí

| Téma | Rozhodnutí |
|---|---|
| Kořenový CLAUDE.md (cca 100–150 řádků) | Struktura monorepa (`apps/web`, `apps/mobile`, `packages/types`, `packages/ui`, `packages/config`); příkazy (install, typecheck, test, e2e, a11y, migrace); pasti (schema obce, RLS bez policies, `revalidateTag(tag,{expire:0})`, cross-tenant izolace, přesná shoda verzí Payloadu, prepared statements v pooleru); jazyková pravidla; tabulka česky = anglicky (úřední deska = `noticeBoard`, obec = `municipality`/`tenant`) |
| Povinná sdílená pravidla | EU region pro data; žádné secrets; verze vždy z `npm view <pkg> version` a pin; každá právní konstanta s odkazem na paragraf a datem ověření v `docs/verification-log.md`; NEOVĚŘENO nikdy nezapisovat jako fakt, vždy ověřit a zapsat zdroj |
| Per-app pravidla | `.claude/rules/` s `paths:` pro web, mobile, iot, ai |
| Tvrdá pravidla jako hooky | deny `Read(./.env*)`, `PreToolUse` blokuje úpravu aplikovaných migrací, `Stop` s `tsc` + lint + unit testy, `PostToolUse` prettier, secrets scan před commitem s `onFailure: "block"` |
| Kostra každého ze šesti promptů | `<context>` → `<scope>` → `<non_goals>` → `<requirements>` s ID → `<verification>` (přesné příkazy) → `<definition_of_done>` → `<workflow>` (plán, `docs/progress.json`, commit po bloku) → `<rules>`; právní tabulka z této zprávy jako vstup nahoře, úkol na konci |
| Rozsah | Jeden velký prompt je v napětí s doporučením čerstvé session ze SPEC.md; kompromis: prompt odkazuje na `docs/specs/<část>.md` s akceptačními kritérii, rozdělený na fáze s green buildem po každé; po dvou neúspěšných opravách `/clear` |
| Pracovní postup | Nejdřív interview → SPEC.md, pak build ve fresh session; lehká varianta místo plného GitHub Spec Kit (constitution → specify → plan → tasks → implement; [github/spec-kit](https://github.com/github/spec-kit)), bez měření přínosu |

### NEOVĚŘENO

| Bod | Jak ověřit |
|---|---|
| Stránky o hooks, skills, subagents a checkpointing (čteno jen z Best practices a Memory) | Plné dokumenty na code.claude.com |
| Kiro/EARS, kritika spec-driven vývoje, empirika o délce promptu a spolehlivosti | Nenalezeno |
| Payload 2FA/TOTP, e-mail OTP pro občany, Supabase Auth vs. Payload auth, CSP pro Next 16, PITR, rate limiting, GitHub Actions šablony | Prompt ukládá ověřit |
| Nastavení pnpm (`node-linker`) pro Metro v monorepu | Test, dokumentace Expo |
| Tokenová efektivita češtiny; doporučení česky psát instrukce a anglicky identifikátory je bez zdroje | Prakticky ověřit |

## Závěr

Hlavní poučení z poznámek: nejtvrdší dostupná fakta jsou verze balíků, data (CRA 11. 9. 2026, API 36 od 31. 8. 2026, AI Act 2. 8. 2026) a struktura vyhlášky 515/2020, zatímco ve většině domén, kde by prompt rád psal čísla (lhůty podle 250/2000 a 128/2000, limity VZMR, ceny konkurence, ceny GPU, sazby bran), jsou data zatím jen z paměti. Prompty proto musí být psány jako „specifikace plus ověřovací protokol“: každá právní hodnota je konfigurovatelná, nese odkaz na paragraf a datum ověření a Claude Code ji smí potvrdit jen z primárního zdroje. Spor o Expo SDK ukazuje stejné pravidlo v malém: nespoléhat na text v dokumentaci, ale na datovaný dotaz v registru ve chvíli spuštění.

Tři rozhodnutí mimo kód ovlivní všechny prompty víc než jakákoli knihovna: (1) kdo je správce a kdo zpracovatel u hlášení, logů a AI dotazů a kdo je u čl. 50 poskytovatel a kdo deployer, (2) zda dát AI asistenta a vektory do Supabase cloudu, nebo na lokální server v ČR, (3) zda CodeKom prodává SaaS, nebo i hardware brány, což rozhoduje o povinnostech podle CRA. Dokud nejsou rozhodnuta, musí je prompty zapsat do `docs/decisions.md` jako otevřená a stavět na variantě, která se dá změnit konfigurací.
