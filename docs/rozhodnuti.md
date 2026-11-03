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

## Technika

| Datum | Rozhodnutí | Proč |
| --- | --- | --- |
| 27. 10. 2026 | Původně Payload CMS + Astro. | Nahrazeno rozhodnutím z 2. 11. |
| 2. 11. 2026 | **Next.js 16 (App Router) + Payload CMS 3 + Supabase (Postgres v EU)**, Tailwind 4, shadcn/ui, design systém gov.cz jako základ. | Payload běží přímo v Next.js, jedna aplikace pro web i administraci, data v EU. |
| 2. 11. 2026 | Payload používá vlastní databázové schéma `obec`, které není vystavené přes Supabase Data API. RLS je zapnutá bez politik. | Ochrana i pro případ, že by schéma někdo omylem vystavil. |
| 2. 11. 2026 | Krizový banner: na webu vždy jen jedno hlášení, to nejzávažnější. Úroveň je napsaná slovem, barva je jen doplněk. Krizovou situaci nejde zavřít, informaci a výstrahu ano. | Podle USWDS Site alert, GOV.UK Notification banner a gov.cz Infobar. |
| 2. 11. 2026 | Úřední deska: dny „visí od“ a „visí do“ se ukládají jako 12:00 UTC daného dne. Zveřejněný dokument, který už visel, nejde smazat (pojistka v databázi), změny se ukládají jako verze. | Obec musí doložit, co a kdy viselo. Poledne nepřekročí hranici dne v ČR. |
| 2. 11. 2026 | Doporučení: volbu „Po sejmutí nezveřejňovat v archivu“ zapnout jako výchozí. | Dokumenty s osobními údaji nemají po sejmutí zůstat na webu. |
| 3. 11. 2026 | Prompty pro vývoj jsou pro **Claude Code**, česky, doménové názvy v kódu česky (`uredniDeska`, `vyvesenoOd`), technické anglicky. Jeden velký prompt na každou část. | Navazuje na rozpracovaný kód a čte se snadno. |

## Právo

| Datum | Rozhodnutí | Proč |
| --- | --- | --- |
| 2. 11. 2026 | U dat občanů je správcem obec a CodeKom zpracovatelem (čl. 28 GDPR). U účtu v aplikaci a u vlastního obchodu je správcem CodeKom. | Odpovídá tomu, kdo určuje účel zpracování. |
| 2. 11. 2026 | Obce platí buď fakturou za roční licenci, nebo kartou měsíčně. | Obce si vyberou podle svého rozpočtu. |
| 2. 11. 2026 | Data: Supabase v EU (Frankfurt), web na Vercelu, AI server v ČR. | Data zůstávají v EU, AI dotazy v ČR. |
| 2. 11. 2026 | Obec může vypovědět kdykoli, prvních 30 dní dostane zpět vše, u roční licence se vrací nevyčerpané měsíce. Úřední deska běží i při neplacení, export dat je zdarma. | Férové podmínky jsou pro obec argument a snižují riziko sporu. |

## Otevřené

- Záložka AI v návrhu platformy je zatím jen osnova.
- Krizový banner a výpis úřední desky v `apps/web` nejsou dopsané, chybí stránky a testy.
- Ceník, holding a jeho název, první skutečná obec pro pilot.
- Kontrola právních dokumentů advokátem před podpisem s první obcí.
