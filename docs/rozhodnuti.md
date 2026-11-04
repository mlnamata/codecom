# Záznam rozhodnutí CodeKom

Rozhodnutí v pořadí, jak padla. U každého je důvod, aby šlo později poznat, co platí a proč. Novější rozhodnutí přebíjí starší.

## Firma a název

| Datum | Rozhodnutí | Proč |
| --- | --- | --- |
| 27. 10. 2026 | Mateřská firma (holding) bude mít dva samostatné projekty: AutoCore pro autobazary a autoservisy a platformu pro obce. | Oddělené značky, zákazníci i ceníky, sdílí se jen to, co zákazník nevidí. |
| 2. 11. 2026 | Platforma pro obce bude samostatná s.r.o. vlastněná holdingem. | Riziko ze smluv s obcemi (krizová hlášení, zámky budov) nezasáhne AutoCore. |
| 3. 11. 2026 | Firma i produkt mají jeden název: **CodeKom** (dříve pracovně ObecHub, krátce DigiKom). | Jedna značka na faktuře, ve smlouvě i v aplikaci. |
| 3. 11. 2026 | Před zápisem ověřit název v ARES, u ÚPV a u domény. Existuje podobná firma CODEKON s.r.o. (Štěpánkovice). | Podle § 423 občanského zákoníku musí být název firmy odlišitelný. Záložní varianta: CodeKom Digital s.r.o. |

## Produkt

| Datum | Rozhodnutí | Proč |
| --- | --- | --- |
| 27. 10. 2026 | Výstupem první fáze je specifikace a klikací prototypy, ne hotový software. | Ověřit zájem obcí dřív, než se staví. |
| 27. 10. 2026 | Jedna mobilní aplikace s rolemi občan a úřad. Občan si vybere obec a může sledovat i další. | Méně aplikací ke správě, starosta i občan mají jednu. |
| 27. 10. 2026 | Ceník na dvou osách: velikost obce a zvolené moduly. Ceny jsou zatím hypotézy. | Malá obec nesmí platit za velkou, moduly se přidávají postupně. |
| 27. 10. 2026 | Průzkum webů měst v ČR i v zahraničí (Rakousko, Bavorsko, Helsinky, NL Design System). | Převzít principy a obchodní model, vzhled jen částečně. |
| 27. 10. 2026 | 20 šablon webu a editor ve třech úrovních: Základ, Pokročilý, Advance. | Každá obec má jiné nároky a jiného správce webu. |
| 27. 10. 2026 | V budovách hotový mini PC jako brána, ne vlastní hardware. | Rychlejší start a servis. |
| 27. 10. 2026 | Vlastní AI server s lokálním jazykovým modelem v ČR. | Data obcí neopustí server, dotazy se neukládají ke jménu. |
| 2. 11. 2026 | Ukázková obec je smyšlená **Javoří Lhota** (684 obyvatel, okres Klatovy, pod Javorníkem). Šablony jsou silně inspirované šablonami z ThemeForestu, nejsou to kopie. | Všechny návrhy ukazují stejný obsah, takže jdou porovnat. |
| 2. 11. 2026 | Návrhy podle pravidel unslop (Damir Sokolovsky, CC BY 4.0): řezy písma nejvýš 600, věty bez vykřičníků, jedna akcentová barva, žádné přechody. Každá šablona má 3 barevné varianty. | Weby nemají vypadat jako vygenerované. |
| 2. 11. 2026 | Ilustrace kreslené v kódu (SVG), ne generované obrázky. | Fungují ve všech barevných variantách a nemají licenční otazníky. |
| 2. 11. 2026 | Volitelné moduly v první verzi: web obce s úřední deskou, aplikace pro občany s účty, AI asistent, IoT budov. | Odpověď na otázku k právním dokumentům. |
| 4. 11. 2026 | Pořadí stavby: marketingový web (prompt 06), funkční prototyp webu Javoří Lhoty (07) a aplikace v prohlížeči (08), potom kompletní systém (01, 03, 02, 05, 04). | Starosta má nejdřív vidět, jak to vypadá a funguje. Systém se staví, až je o něj zájem. |
| 4. 11. 2026 | Teď se nepíše kód. V repozitáři jsou připravené prompty, texty prezentace (`obsah/prezentace`), obsah ukázkové obce (`obsah/javori-lhota`), fotky a snímky šablon. Claude Code pak jen píše kód a skládá stránky. | Zakladatel spustí stavbu sám a nechce během ní nic rozhodovat ani psát texty. |
| 4. 11. 2026 | Prezentační web ukazuje orientační ceny „od“ z hypotéz (Web Základ od 590 Kč měsíčně bez DPH) se štítkem „orientační cena, přesnou pošleme v nabídce“. Založení za 9 900 Kč, 24 měsíců zdarma a pilot zdarma na web nejdou. | Starosta chce znát řád ceny hned. Nabídky, které odporují smlouvě A, se nezveřejňují. |
| 4. 11. 2026 | Poptávkový formulář a newsletter zatím nejsou. Kontakt je e-mailem a telefonem. | Web nesbírá osobní údaje a nepotřebuje databázi. |
| 4. 11. 2026 | Vše zatím jen v repozitáři, bez nasazení a bez domén. | Rozhodnutí zakladatele. |
| 4. 11. 2026 | Vedle kreslených ilustrací jsou generované fotky (Gemini, model `gemini-2.5-flash-image`): fotografický úvod šablon jako volba a fotky pro prezentační web. Vždy s poznámkou „Ilustrační fotografie vytvořená umělou inteligencí“. Výchozí zůstávají ilustrace. | Část obcí chce fotografický úvod. Označení je opatrnost vůči čl. 50 AI Actu (zda se na tyto fotky vztahuje, je k ověření). Upravuje rozhodnutí z 2. 11. |

## Technika

| Datum | Rozhodnutí | Proč |
| --- | --- | --- |
| 27. 10. 2026 | Původně Payload CMS + Astro. | Nahrazeno rozhodnutím z 2. 11. |
| 2. 11. 2026 | **Next.js 16 (App Router) + Payload CMS 3 + Supabase (Postgres v EU)**, Tailwind 4, shadcn/ui, design systém gov.cz jako základ. | Payload běží přímo v Next.js, jedna aplikace pro web i administraci, data v EU. |
| 2. 11. 2026 | Payload používá vlastní databázové schéma `obec`, které není vystavené přes Supabase Data API. RLS je zapnutá bez politik. | Ochrana i pro případ, že by schéma někdo omylem vystavil. |
| 2. 11. 2026 | Krizový banner: na webu vždy jen jedno hlášení, to nejzávažnější. Úroveň je napsaná slovem, barva je jen doplněk. Krizovou situaci nejde zavřít, informaci a výstrahu ano. | Podle USWDS Site alert, GOV.UK Notification banner a gov.cz Infobar. |
| 2. 11. 2026 | Úřední deska: dny „visí od“ a „visí do“ se ukládají jako 12:00 UTC daného dne. Zveřejněný dokument, který už visel, nejde smazat (pojistka v databázi), změny se ukládají jako verze. | Obec musí doložit, co a kdy viselo. Poledne nepřekročí hranici dne v ČR. |
| 2. 11. 2026 | Doporučení: volbu „Po sejmutí nezveřejňovat v archivu“ zapnout jako výchozí. | Dokumenty s osobními údaji nemají po sejmutí zůstat na webu. |
| 3. 11. 2026 | Monorepo pnpm + Turborepo: apps/web, apps/mobile, apps/prezentace, apps/ai, apps/brana, packages/typy, packages/tokeny. Obec je tenant (plugin multi-tenant Payloadu). | Jeden kód pro všechny obce, sdílené typy mezi webem a aplikací. |
| 3. 11. 2026 | Mobilní aplikace na Expo SDK 58, web na Vercelu v regionu `fra1`. | SDK 58 je aktuální stabilní (npm, vydáno 29. 9. 2026). Výchozí region Vercelu je v USA. |
| 3. 11. 2026 | Telemetrie budov v Postgresu s pg_partman, ne v TimescaleDB. | TimescaleDB na Supabase s PG17 skončila. |
| 3. 11. 2026 | Vektory a dotazy AI asistenta zůstávají na AI serveru v ČR (Postgres + pgvector tam), dokumenty obcí se tam synchronizují z webu. | Dotazy občanů neopustí ČR. |
| 3. 11. 2026 | Prompty pro vývoj jsou pro **Claude Code**, česky, doménové názvy v kódu česky (`uredniDeska`, `vyvesenoOd`), technické anglicky. Jeden velký prompt na každou část. | Navazuje na rozpracovaný kód a čte se snadno. |
| 4. 11. 2026 | Prototyp webu vzniká přímo v `apps/web` s datovou vrstvou (`CODEKOM_ZDROJ` je `demo` nebo `payload`) a se sdílenými endpointy. Prompt 01 jen vymění zdroj za Payload, UI se nepřepisuje. Prototyp aplikace je v `apps/mobile` s exportem pro prohlížeč a zdrojem dat `api` nebo `vestavene`. | Práce na prototypu se neztratí, ostrá verze na ni navazuje. |
| 4. 11. 2026 | Šablony se jednou převedou z `design/generator/bodies` do TSX skriptem. Potom je zdrojem pravdy TSX a `design/` zůstává jako návrh. | Převod 20 šablon ručně by byl pomalý a nepřesný. |
| 4. 11. 2026 | Krizové hlášení publikuje jen správce obce (a superadmin), redaktor jen koncept, na webu i v aplikaci a na všech úrovních editoru. | Hlášení může vyvolat paniku nebo uklidnit, kde by nemělo. Odpovídá za něj obec. |
| 4. 11. 2026 | Aplikace v první verzi budovy jen zobrazuje. Otevření dveří (biometrie, důvod, právo `dvere`, záznam) přidává prompt 04. | Vzdálené otevírání je bezpečnostně citlivé a patří k IoT. |
| 4. 11. 2026 | `POST /api/mobilni-zarizeni` je vlastní route handler před catch-all Payloadu, REST kolekce je jen pro superadmina. Nový veřejný `GET /api/obce` vrací seznam obcí s aplikací (jen veřejná pole). | Vyřešení kolize endpointu a chybějícího rozhraní z kontroly promptů. |
| 4. 11. 2026 | Prezentační web nepoužívá frázi „mobilní rozhlas“ (jméno konkurence). Prompty se nezkracují. | Výsledek kontroly promptů (`prompty/KONTROLA.md`). |

## Prototyp webu (prompt 07)

| Datum | Rozhodnutí | Proč |
| --- | --- | --- |
| 4. 11. 2026 | Ukázka webu Javoří Lhoty se nasazuje na Vercel (region `fra1`), i když dřívější rozhodnutí říkalo „bez nasazení“. | Zakladatel chce ukázku vidět online. Ukázka nemá databázi ani osobní údaje. |
| 4. 11. 2026 | pnpm 10.34.9 místo nejnovějšího 12.x, TypeScript 5.9.3 a Vitest 3.2.7 místo nových major verzí (7.x, 5.x). | Vercel spolehlivě podporuje pnpm 10 a lockfile 9; nové major verze TS a Vitestu nejsou ověřené s Next 16.4 a Payloadem 3.92. |
| 4. 11. 2026 | Payload (`withPayload`) se v `next.config.ts` zapíná jen s `CODEKOM_ZDROJ=payload`. Veřejné stránky Payload neimportují (pravidlo ESLintu). | `next build` musí projít bez `DATABASE_URI`. |
| 4. 11. 2026 | Šablony jsou převedené skriptem `design/generator/do-tsx.py`; od převodu jsou TSX zdrojem pravdy, `design/` zůstává návrh. Logika interaktivních šablon je ručně v `logika.ts`. | Skript je deterministický a testovaný, ruční logika potřebuje typy a data ze serveru. |
| 4. 11. 2026 | CSS šablon nepoužívá nesting: skript dává selektorům předponu `.sablona-<klic>`. | Funguje ve všech prohlížečích a nezávisí na zpracování nestingu při buildu. |
| 4. 11. 2026 | Napojení seznamů úvodu na data dělá skript jen tam, kde se titulky z návrhu shodují s daty (Zvonice: aktuality a celá deska přes logiku). Ostatní seznamy zůstávají statický text návrhu. | Titulky v návrzích se od obsahu obce liší; skript nenapojí seznam, kde by se opakoval špatný text. Ruční napojení zbývajících seznamů je v otevřených bodech. |
| 4. 11. 2026 | Fotografický úvod mají šablony, kde skript najde širokou úvodní ilustraci (9 z 20). | U ostatních je úvod bez velké ilustrace; varianta s fotkou tam zatím není. |
| 4. 11. 2026 | Fotky se označují vždy „Ilustrační fotografie vytvořená umělou inteligencí“. | Opatrná volba, zda to čl. 50 odst. 4 AI Actu vyžaduje, je [OVĚŘIT]. |
| 4. 11. 2026 | PDF dokumentů desky vznikají z textu přes `pdf-lib` s písmem Noto Sans (OFL) ve dvou podmnožinách (latinka, rozšířená latinka), znak po znaku. Handler `/uredni-deska/[id]/soubor` vrací PDF jen veřejného dokumentu. | Diakritika ověřená extrakcí textu. Produkční soubory budou v privátním úložišti za stejným handlerem. |
| 4. 11. 2026 | Velikosti ukázkových PDF (`src/lib/data/generovano/velikosti.json`) jsou v gitu, PDF v `public/demo` ne. | PDF mají pevná metadata, velikosti jsou deterministické; typecheck a testy nepotřebují krok přípravy. |
| 4. 11. 2026 | Šablona Magistrát ukazuje odpovědi z `asistent-ukazka.json` místo textů návrhu. | Odpovědi začínají větou, že odpovídá umělá inteligence, a citují dokumenty desky (pravidlo 4). |
| 4. 11. 2026 | Studánka uvádí poplatek za rekreační objekt 900 Kč podle dat obce (návrh měl 600 Kč). | Data mají přednost, viz `obsah/javori-lhota/README.md`. |
| 4. 11. 2026 | Alegreya Sans se načítá bez řezu 600, který Google Fonts nemá. | Prohlížeč použije nejbližší řez. |
| 4. 11. 2026 | Navíc oproti zadání: stránky `/sluzby` a `/hlaseni-rozhlasu` a endpointy `GET /api/hlaseni-zavad`, `POST /api/krize`, `PATCH /api/hlaseni-zavad/<id>`. | Odkazy z návrhů vedou na služby a rozhlas; endpointy potřebuje prototyp aplikace (08). |
| 4. 11. 2026 | Variabilní symbol ukázky: rok, číslo popisné na 4 místa, pořadí poplatku na 2 místa. [DOPLNIT: pravidlo variabilních symbolů obce] | Ukázkové schéma podle zadání. |
| 4. 11. 2026 | Kolekce Payloadu (`tykaSe` v krizových hlášeních) se v prototypu nemění; sdílená pravidla používají `casti`. Změnu kolekce udělá prompt 01. | Aplikované migrace se nemění. |
| 4. 11. 2026 | `loading.tsx` jen u stránek bez dynamického detailu. | Streamování by u detailu skrytého dokumentu vrátilo stav 200 místo 404. |
| 4. 11. 2026 | Úložiště ukázky je v paměti procesu. Na Vercelu může mít každá instance funkce vlastní kopii, změny z administrace se nemusí projevit všude a po studeném startu zmizí. | Prototyp nemá databázi; trvalá data dodá prompt 01 (Supabase). |
| 4. 11. 2026 | Fotky mají všechny šablony a jsou výchozí volba (`foto=1`). Generátor zná značku `<foto-obce>` a `data-foto` v předloze. Ilustrace zůstávají jako volba v pruhu ukázky. | Zakladatel chce místo kreslených ilustrací fotografie; nahrazuje řádek o 9 z 20 šablon. |
| 4. 11. 2026 | Ukázka administrace má tři úrovně editoru, volené parametrem `?uroven=` a nezbytnou cookie `ukazka-uroven`. Obrazovky Pokročilého a Advance (skladatel, schvalování, podweby, vlastní barvy, AI asistent) drží stav jen v prohlížeči. | Ukazuje rozdíly úrovní podle 04-admin-editor.md; v ostrém provozu úroveň určí předplatné a kontroluje ji server. |
| 4. 11. 2026 | Interní správa CodeKom (`/ukazka/codekom`): předplatné obcí, úroveň a moduly, faktury a jejich stav. Kromě Javoří Lhoty jsou obce smyšlené a tak označené. Úložiště je v paměti procesu. | Zakladatel chce správu předplatného a faktur; skutečné faktury a napojení na účetnictví [DOPLNIT: fakturační systém]. |
| 4. 11. 2026 | Prezentační web: úvod, galerie a ceník skládám z textů v `obsah/prezentace` a navíc stránky úrovní `/urovne` a `/urovne/<uroven>` s maticí funkcí, rolemi a bloky z 04-admin-editor.md. | Zakladatel chce úrovně popsané detailně; texty úvodu jsou zkrácené věty z `uvod.md`. |
| 4. 11. 2026 | Prezentační web bere texty přímo z `obsah/prezentace/*.md` a převádí je knihovnou `marked`, ne kopií do MDX. | Jeden zdroj textů, žádná ruční kopie; komentáře `{/* */}` se při převodu vynechají. Odchylka od promptu 06 (MDX). |
| 4. 11. 2026 | Prezentační web nemá žádné měření návštěvnosti, ani bez cookies. | Zda měření bez zápisu do zařízení spadá mimo § 89 odst. 3 zákona č. 127/2005 Sb., je [OVĚŘIT u advokáta]. |
| 4. 11. 2026 | Poptávkový formulář a newsletter jsou odložené. Kontakt je telefon, e-mail a `mailto:`. | Web nic nesbírá, zásady osobních údajů to tak popisují. |
| 4. 11. 2026 | Nadpisy prezentace Montserrat 500 a 600, text Inter, obojí self-hosted přes `@fontsource`. Název v logu zůstává vektorový. Překrytí s Montserratem jsem nezkoušel, přesný font loga je [OVĚŘIT u zakladatele]. | Žádné načítání z Google Fonts. |
| 4. 11. 2026 | PDF ke stažení tiskne Chromium (`page.pdf`, `tagged: true`): označená struktura, jazyk cs, název a osnova. veraPDF jsem nespouštěl. | Ověřeno jen přítomností StructTreeRoot a /Lang v testu; kontrolu PDF/UA veraPDF udělat před nasazením. |
| 4. 11. 2026 | Snímky šablon jsou z produkčního buildu s fotkami, velikost do 179 kB (cíl 120 kB překračují snímky s fotkou). | Nepřegenerovávám, jen hlásím podle promptu 06. |
| 4. 11. 2026 | Prezentační web má moderní vzhled podle vzoru dom-ino.cz: tmavý úvod přes celou obrazovku s fotkou, písmo Inter až 800, skleněné plochy (backdrop-filter), jemná záře, animace při posouvání. Kontrola unslop se na `apps/prezentace` nespouští. | Zakladatel označil černobílou i časopiseckou verzi za zastaralou. Kontrast, přístupnost a omezený pohyb zůstávají povinné. |
| 4. 11. 2026 | Firemní prezentační web se přesunul do samostatného repozitáře `mlnamata/codekom_web` (s texty `obsah/prezentace` a registrem tvrzení). Tady zůstává platforma a ukázka obce, aplikace a IoT jsou v `mlnamata/codecom_app`. | Zakladatel chce firemní web nasadit samostatně na codekom.vercel.app. Tokeny, snímky, fotky a logo jsou v `codekom_web` jako kopie, zdrojem pravdy zůstává tento repozitář. |

## Právo

| Datum | Rozhodnutí | Proč |
| --- | --- | --- |
| 2. 11. 2026 | U dat občanů je správcem obec a CodeKom zpracovatelem (čl. 28 GDPR). U účtu v aplikaci a u vlastního obchodu je správcem CodeKom. | Odpovídá tomu, kdo určuje účel zpracování. |
| 2. 11. 2026 | Obce platí buď fakturou za roční licenci, nebo kartou měsíčně. | Obce si vyberou podle svého rozpočtu. |
| 2. 11. 2026 | Data: Supabase v EU (Frankfurt), web na Vercelu, AI server v ČR. | Data zůstávají v EU, AI dotazy v ČR. |
| 2. 11. 2026 | Obec může vypovědět kdykoli, prvních 30 dní dostane zpět vše, u roční licence se vrací nevyčerpané měsíce. Úřední deska běží i při neplacení, export dat je zdarma. | Férové podmínky jsou pro obec argument a snižují riziko sporu. |

## Otevřené

- Záložka AI v návrhu platformy je zatím jen osnova.
- Seznamy na úvodu většiny šablon jsou statický text návrhu, napojit je ručně na data (prompt 07, zbývá).
- Skutečné ceny, holding a jeho název, první skutečná obec pro pilot.
- Údaje CodeKomu pro prezentační web: IČO, sídlo, kontakty, jména pro stránku O nás (`[DOPLNIT]` v `codekom_web/obsah/prezentace`).
- Kontrola právních dokumentů advokátem před podpisem s první obcí.
