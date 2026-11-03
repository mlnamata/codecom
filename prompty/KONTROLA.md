# Kontrola promptů 01 až 06

Stav ke 3. 11. 2026. Zkontrolováno proti `CLAUDE.md`, sdíleným rozhraním, `docs/rozhodnuti.md`, `research/zprava-podklady-pro-prompty.md` a kódu v `apps/web/src`.

Co sedí bez nálezu: pořadí a úplnost 15 sekcí ve všech šesti promptech, čeština, žádný vykřičník, Expo SDK 58, Vercel `fra1`, výchozí „Po sejmutí nezveřejňovat“ = zapnuto, demo obec Javoří Lhota (684 obyvatel), telemetrie přes pg_partman bez TimescaleDB, vektory na AI serveru v ČR, platby přímo na účet obce, krizové úrovně a barvy, slugy `krizova-hlaseni`, `hlaseni-zavad`, `uredni-deska`, endpointy ze sdílených rozhraní, pole tenanta `obec`. Tvrzení 01 o výchozím stavu kódu (role `admin`/`redaktor`, globální `unique`, `read: () => true` u `dokumenty` a `media`, globální `obnovit([...])`, `tykaSe` jako text, výchozí `skrytPoSejmuti: false`, dvě migrace, verze Payload 3.91.0 a Next 16.4.1, `#obsah` v `SkrytHlaseni`) odpovídají kódu.

## Nalezené problémy

| Soubor | Problém | Co jsem udělal |
| --- | --- | --- |
| 02 | Role „`spravce obce`“ místo `spravce` ze sdílených rozhraní; chyběla zmínka, že 01 přejmenuje `admin` na `spravce` | Opraveno |
| 02 | `krizova-hlaseni.casti` jako „vztah hasMany na části obce“, ale `castiObce` je pole `{nazev, slug}` v `obce`, ne kolekce; 01 definuje `casti` jako pole slugů | Opraveno (pole slugů, shodně s 01) |
| 02 | Pokyn ponechat `tykaSe` jako zastaralé pole se rozcházel s 01 (nahradit polem `casti` a datovou migrací) | Opraveno (02 se řídí 01, fallback ponechán jen pro případ, že web ještě není hotový) |
| 02 | Minimální `hlaseni-zavad`: stavy `prijato, prevzato, reseni, ...` a pole `odpoved`, `prirazeno` proti 03 (`nove, prijato, v_reseni, ...`, `verejnaOdpoved`, `prirazenoUzivateli`) | Opraveno podle 03, popisky v aplikaci namapované na klíče |
| 03 | Pole `idempotencyKey` (hlavička `Idempotency-Key` z aplikace 02) v `hlaseni-zavad` chybělo | Opraveno (přidáno jako nepovinné unikátní pole) |
| 02 | Odpověď `POST /api/hlaseni-zavad` je v 03 `{cislo, sledovaciKod}`, 02 čekala „číslo a stav“ | Opraveno (stav `nove` při vytvoření) |
| 02 | Seed Javoří Lhoty „3 části obce“, ale návrh (`design/generator/tpls.py`) a prompt 05 mají 4 (Javoří Lhota, Podjavoří, Hájek, Na Rovném) | Opraveno na 4 |
| 02 | `hotovo_kdyz` odkazovalo na „netknuté testy úřední desky a banneru“, ale `apps/web/tests` je prázdný a žádný test neexistuje | Opraveno (testy z promptu 01, pokud už existují) |
| 02 | „expo@58.0.23, vyšlo 29. 9. 2026“ směšuje dvě data: 58.0.0 vyšlo 29. 9., latest 58.0.23 je z 3. 11. 2026 | Opraveno |
| 04 | Pro aplikaci chyběl adaptér `GET /api/mobilni/urad/budovy`, který 02 volá pod jiným názvem než 04 (`/api/iot/...`) | Opraveno (04 ho vystavuje jako tenký adaptér nad `lib/iot`) |
| 04 | „vyžaduje roli `dvere`“ míchalo role (superadmin, spravce, redaktor) a právo `users.iotPrava` | Opraveno na „právo `dvere`“ |
| 04 | „Funkce okna a předehřevu jsou v hlavici“ (Danfoss) jako jistota; rešerše potvrzuje jen regulaci na nastavenou teplotu při ztrátě spojení | Přepsáno na [OVĚŘIT] |
| 06 | Klíč modulu `budovy` (`Modul.klic`, `Cenik.moduly`), ale sdílené rozhraní i `POST /api/poptavky` v témže promptu mají `iot` | Opraveno na `iot` (zobrazený název „Chytré budovy“ zůstává) |
| 06 | Povinnost obce uveřejnit smlouvu v registru smluv (zák. 340/2015) napsána jako jistota; rešerše ji vede jako NEOVĚŘENO | Přepsáno na [OVĚŘIT] |
| 06 | § 7 zákona 480/2004 Sb. není v rešerši vůbec | Doplněno [OVĚŘIT] |
| 05 | Čl. 50 odst. 4 AI Actu (vynětí textu pro veřejnost při redakční kontrole) rešerše nepotvrzuje | Doplněno [OVĚŘIT] |
| 05 | Příkaz `eval:porovnej` uváděl Gemma 4 31B a Qwen3.8-27B jako fakt, rešerše je vede jako NEOVĚŘENO | Opraveno (kandidátní modely, názvy k ověření) |
| 03 | Čísla paragrafů zákona 565/1990 (§ 15, § 11b, § 11c) a zákon 499/2004 napsaná jistě; rešerše z nich potvrzuje jen § 14a a hodnoty limitů | Doplněno [OVĚŘIT] |
| 01 | Členění položek 11, 12, 13 vyhlášky 515/2020 na podpoložky (11.1 až 13.2); rešerše potvrzuje jen 4.1 až 4.8 a 8.1 až 8.2 | Přepsáno na [OVĚŘIT] |
| 06 | SEO seznam doporučuje frázi „mobilní rozhlas“, zároveň pravidla zakazují jména konkurence včetně „Mobilní rozhlas“ (kontrola obsahu shodí build) | Ponecháno k rozhodnutí |
| 02, 04 | 02 vylučuje ovládání budov z aplikace („v této verzi jen čtení“), 04 zahrnuje v záložce Úřad otevření dveří s biometrií a důvodem | Ponecháno k rozhodnutí |
| 02, 01 | 02: krizové hlášení smí publikovat jen správce, redaktor jen koncept. 01: na úrovni Základ redaktor smí publikovat obecně. Pravidlo pro krizová hlášení v aplikaci je přísnější než na webu | Ponecháno k rozhodnutí |
| 02, 01 | Kolekce `mobilni-zarizeni` s vlastním endpointem `POST /api/mobilni-zarizeni` kolizuje s automatickým REST endpointem téže kolekce v Payloadu; je nutné ověřit, že vlastní route má přednost a že výchozí CRUD je vypnutý | Ponecháno k rozhodnutí (technické ověření při implementaci) |
| 02 | Nový endpoint `GET /api/obce` (seznam obcí s modulem `aplikace`) není ve sdílených rozhraních a nikdo jiný ho nepopisuje | Ponecháno k rozhodnutí (doplnit do sdílených rozhraní, nebo použít `prehled`) |
| 02 | Pole `moduly` obsahuje podle sdílených rozhraní `web, aplikace, urad, iot, ai`; prompty 01 až 05 to dodržují, 03 navíc zavádí vlastní kolekce mimo sdílený seznam (`sazebniky-poplatku`, `integrace`, `audit-uradu`), které mají jen zápis do `docs/rozhodnuti.md` | Ponecháno (jen informace, 03 to výslovně uvádí) |
| 01 až 06 | Délka: sdílené zadání chtělo 2 500 až 4 500 slov, prompty mají podle `wc -w` 4 629 až 5 325 slov (01: 4 822, 02: 4 918, 03: 4 629, 04: 5 325, 05: 4 650, 06: 4 801; `wc` počítá i značky a kód, skutečný rozdíl bude menší) | Ponecháno k rozhodnutí (zkracovat až po věcné revizi) |
| 01 | `vychozi_stav` zmiňuje React 19.2.0 a Tailwind 4.1.14 jen nepřímo (M0 zvedá verze); `package.json` je pod cílem CLAUDE.md i u Reactu a Tailwindu, ne jen u Payloadu a Nextu | Ponecháno (M0 verze zvedá podle `npm view`, bod 7 lze rozšířit) |

## Souhrn

Opraveno: 19 míst. Ponecháno k rozhodnutí: 6 míst (mobilní rozhlas v SEO, ovládání budov z aplikace, publikace krize redaktorem, kolize endpointu `mobilni-zarizeni`, endpoint `GET /api/obce`, délka promptů). Dva řádky označené „Ponecháno“ bez rozhodnutí (kolekce navíc v 03, verze Reactu a Tailwindu v 01) jsou jen informace.

## Sloučený seznam [DOPLNIT] pro zakladatele

Kolem 40 různých míst, seskupeno podle toho, co musí zakladatel dodat. Ve zdrojových promptech se vyskytují také holé `[DOPLNIT]` bez popisu (01: 2, 02: 3, 03: 4, 04: 4, 05: 7, 06: 9), většinou jde o odkazy na tento seznam v textu nebo o jednotlivé údaje popsané níže.

**Firma a kontakty**
- IČO, sídlo, kontaktní e-mail CodeKom s.r.o. (02, 06)
- D-U-N-S číslo a Apple Developer účet CodeKom s.r.o. (02), Google Play účet
- Jména, fotografie a životopisy pro stránku O nás (06)
- Telefon, e-mail, adresa a úřední doba pro Kontakt (06)
- Lhůta odpovědi na poptávku v pracovních dnech (06)
- E-mail pro hlášení zranitelností a `security.txt` (04)
- Pilotní obce (06)

**Domény a hosting**
- Doména administrace CodeKom a doména prezentace (01, 06)
- Domény dema Javoří Lhota (vlastní a záložní subdoména) a záložní doména obcí (01, 06)
- Doména pro univerzální odkazy aplikace (02)
- Broker MQTT a jeho hosting v EU, hub WireGuard a síť, repozitář doplňků HA a registr obrazů, KMS nebo HSM pro klíč CA, SIM a modem pro LTE zálohu (04)

**Služby třetích stran**
- E-mailová služba v EU (04, 06; kódy pro přihlášení v aplikaci 02)
- Dodavatel SMS (04)
- Poskytovatel mapových dlaždic a veřejný klíč (02)
- Nástroj pro hlášení pádů aplikace, pokud bude zapnut (02)

**Údaje demo obce Javoří Lhota**
- IČO, DIČ, datová schránka, číslo účtu, testovací IBAN (01, 03)
- Texty o osobních údajích obce, telefon „Poradí“ u životních situací, kontakty (01, 03)
- Limit velikosti příloh podatelny obce (03)
- Demo e-mail pro recenzenty obchodů (02)

**Provozní a cenové hodnoty**
- Ceny, rozdíl mezi roční a měsíční platbou, cena pomoci s dotacemi (06)
- Ceny Kč za kWh pro odhad úspor nastavuje obec (04)
- Dny před splatností pro připomínky (výchozí 14 a 3), zaokrouhlení polohy ve veřejné mapě (výchozí 10 m), doba uložení kopie po předání spisovce (03)
- Limit disku fronty brány, období podpory zařízení (04)
- Prahy kvality OCR, cíl p95 latence, nabídky GPU, serverů a kolokace v ČR, kapacitní předpoklady, prahy evaluace (05)
- Retence dat po smazání účtu (02), doba uložení auditu vstupů v měsících (04, výchozí 12 k potvrzení advokátem)
- Hodnoty `lhuty.ts` (lhůty podle 250/2000, 128/2000) po ověření v e-Sbírce (01)

**Právní potvrzení**
- Kontrola dokumentů A až E advokátem, DPIA (hranice věku 15 let, polohy a fotky, vstupy do budov, AI)
- Potvrzení rozpisu rolí podle AI Actu a CRA právníkem (04, 05)
- Doklad pověření pilotní obce pro Google Play Government apps declaration (02)
- Potvrzení fontu loga (06)
- Cesty `[DOPLNIT: cesta]` na stránky webu obce pro Služby v aplikaci, než je dodá prompt 03 (02)
