# Prompt: Mobilní aplikace pro občany a úřad

Použití: vlož celý text do Claude Code v kořeni repozitáře /home/claude/codecom.
Závisí na: 01 (web obce a CMS: multi-tenant, `obce`, `castiObce`, krizová hlášení, `GET /api/krize/aktivni`, `GET /api/obce/<slug>/prehled`), 03 (digitální úřad: `hlaseni-zavad`, služby), 04 (IoT: `budovy`, stav budov), 05 (AI: `POST /api/asistent/dotaz`). Nic z toho nemusí být hotové; kde to chybí, viz <vychozi_stav>.

<kontext>
CodeKom je platforma pro české obce (pilot do 2 000 obyvatel, Plzeňský kraj). Mobilní aplikace je jedna pro iOS a Android a má dvě role: občan (bez účtu čte, s účtem hlásí závady a odebírá oznámení) a pracovník obce (navíc záložka Úřad). Společný kontext je v `CLAUDE.md`, důvody rozhodnutí v `docs/rozhodnuti.md`, návrh v `docs/navrh-platformy/06-iot-dashboard-a-aplikace.md` (část Mobilní aplikace), právní podklady v `docs/pravni-dokumenty.md` (dokument D Zásady ochrany osobních údajů CodeKom, dokument E Podmínky používání aplikace). Klikací návrhy jsou `design/prototypy/App-Obcan.dc.html` a `App-Urad.dc.html`; berou se jako vodítko vzhledu a toků, ne jako závazná struktura. Obsahují obec Horní Vzorov, ty používej Javoří Lhotu. Obrazovky z prototypu, které nejsou v tomto zadání (Zaplatit, Rezervace jako samostatné záložky), jsou součástí Služeb.

Proč aplikace existuje: krizové hlášení a úřední deska mají být v kapse, ne jen na webu. Hlášení závad a oznámení jsou nativní hodnota, bez které by App Store aplikaci odmítl jako sbírku odkazů (Apple 4.2.2).

Konkurence (App Store, rešerše 3. 11. 2026, ověř ručním průchodem listingů před psaním popisu):

| Aplikace | Co umí | Slabina | Co uděláme lépe |
|---|---|---|---|
| Munipolis | push výstrahy, zprávy, hlášení závad, více obcí; 4,2/5 z 499 hodnocení, 153,4 MB, iOS 15+, věk 4+ | velká instalace, rozhlas a závady bez dokumentů a AI | malá instalace (cíl do 60 MB, změř), AI asistent nad dokumenty obce, role úřad ve stejné aplikaci, stav budov |
| V obraze | zprávy z webů obcí, úřední desky; 3,4/5 z 68 hodnocení, přes 2 600 organizací, věk 16+ | nízké hodnocení, bez hlášení závad a účtu | úřední deska s archivem podle pravidel, hlášení se stavem |
| Zlepšeme Česko | hlášení problémů s polohou | jen závady | závady i oznámení v jedné aplikaci |

Hlášenku a Obec v mobilu rešerše neověřila, nepiš o nich jako o faktu.
</kontext>

<cil>
Na konci stojí v `apps/mobile` aplikace v Expo SDK 58, kterou jde pomocí EAS postavit pro iOS i Android. Demo obec Javoří Lhota funguje celá: onboarding, Domů s krizovým bannerem, úřední deska, hlášení závady s fotkou a polohou, AI asistent, Služby, Profil s mazáním účtu a záložka Úřad pro pracovníka obce. Krizové hlášení publikované s kanálem „aplikace“ dorazí jako push na zařízení do 60 sekund. Bez signálu aplikace ukáže poslední známý stav s časem poslední aktualizace. V `apps/web` je hotový backend: kolekce `obcane` a `mobilni-zarizeni`, přihlášení kódem, registrace tokenů, odesílací úloha s kontrolou receiptů a mazání neplatných tokenů, mazání účtu.
</cil>

<vychozi_stav>
- `apps/web` existuje (Next.js 16 + Payload 3, npm, kolekce aktuality, uredni-deska, kategorie-desky, krizova-hlaseni, zastupitele, dokumenty, media, users; migrace v `src/migrations`; logika banneru v `src/lib/krize.ts`: `vyberBanner`, `lzeSkryt`, `klicSkryti`, `bezpecnyOdkaz`, `UROVNE`). Tu logiku nekopíruj: přesuň čisté funkce do `packages/typy` (bez změny chování, testy webu musí dál procházet) a importuj je v obou aplikacích.
- `apps/mobile`, `packages/typy`, `packages/tokeny` a pnpm workspace zatím nemusí existovat. Pokud chybí, založ minimální kostru (pnpm workspace, Turborepo `turbo.json`, `packages/typy`, `packages/tokeny` s barvami krizových úrovní podle CLAUDE.md). Nepřepisuj to, co už tam z jiných promptů je.
- Role v `users` jsou dnes `admin` a `redaktor`; sdílené zadání říká `superadmin`, `spravce obce`, `redaktor` a pole `obec`. Pokud web ještě není převedený, nepřepisuj ho. Píšeš proti sdílenému zadání a v kódu serveru role čti jedinou funkcí (`rolePracovnika(user, obecId)`), kterou jde později změnit na jednom místě. Záznam o tom dej do `docs/rozhodnuti.md`.
- Chybí-li `GET /api/krize/aktivni`, `GET /api/obce/<slug>/prehled`, `POST /api/hlaseni-zavad` nebo kolekce `hlaseni-zavad`, postav minimální verzi přesně podle kontraktu v <architektura>, označ ji komentářem `// MINIMUM z promptu 02, rozšíří prompt 03` a neimplementuj nic navíc.
- Krizové hlášení dostane vztah `casti` (na `castiObce`) místo textu `tykaSe`. Pokud ho web ještě nemá, přidej ho novou migrací (starou neměň) a `tykaSe` ponech jako zastaralé nepovinné pole.
</vychozi_stav>

<rozsah>
Postav:
1. `apps/mobile`: Expo SDK 58, Expo Router, nová architektura, TypeScript strict (`noUncheckedIndexedAccess`), TanStack Query s perzistentní offline cache, EAS profily (development, preview, production) pro Build, Update i Submit, i18n s češtinou jako výchozím jazykem.
2. Obrazovky občana a záložku Úřad podle <funkce>.
3. Backend v `apps/web`: `obcane`, `mobilni-zarizeni`, endpointy `/api/mobilni/*`, úloha odeslání push, kontrola receiptů, mazání neplatných tokenů, stránka pro smazání účtu a odkaz na zásady.
4. Podklady pro obchody v `apps/mobile/store/`: popisy v češtině, odpovědi pro App Privacy a Google Play Data safety, poznámky pro recenzenty, šablona prohlášení o přístupnosti aplikace.
5. Testy podle <testy>.
6. Seed ukázkové obce Javoří Lhota (obec, 3 části obce, 5 aktualit, 5 dokumentů desky, jedno informační hlášení, demo občan, demo pracovník), spustitelný jedním příkazem (`pnpm --filter web seed:demo`).

Mimo rozsah (nedělej, jen zapiš do `docs/rozhodnuti.md`, že se neřešilo):
- přihlášení přes NIA / Identitu občana a mobilní klíč eGovernmentu (pro čtení a hlášení není zákonný důvod ověřovat totožnost; do produkce NIA jen pro subjekty s právní povinností, ověřuje se u DIA),
- přihlášení přes Google, Facebook nebo Apple,
- certifikační pinning (zdůvodnění v <bezpecnost_a_soukromi>),
- ovládání budov z aplikace (topení, dveře); v této verzi jen čtení,
- veřejná mapa cizích hlášení závad, komentáře a hlasování,
- platby a rezervace přímo v aplikaci (Služby je otevírají přes web obce v systémovém prohlížeči; mimo IAP viz Apple 3.1.3(e), ověř),
- SMS a rozhlas jako odesílací kanály (pole `kanaly` je může obsahovat, odesílá je jiná služba),
- push pro aktuality a úřední desku (odesílač je obecný, spouštěč je jen pro krizová hlášení a změnu stavu hlášení závady),
- Critical Alerts v buildu (viz <funkce>, Push),
- tablet a web export.
</rozsah>

<architektura>
```
apps/mobile
  app/                      Expo Router
    (onboarding)/           vyber-obce, casti-obce, oznameni
    (tabs)/                 domu, deska, hlasit, asistent, sluzby, urad (jen pracovník)
    profil/                 profil, oznameni, ucet, pristupnost, pravni
    krize/[id]              detail hlášení
  src/
    api/                    klient (fetch + zod z packages/typy), obnova tokenu
    cache/                  TanStack Query persister, "naposledy aktualizováno"
    auth/                   SecureStore, relace, role
    push/                   registrace, kanály, příjem, deep linky
    hlaseni/                komprese fotek, poloha, fronta odeslání
    ui/                     komponenty z packages/tokeny
    i18n/                   cs.json (výchozí), en.json (prázdný základ)
  .maestro/                 e2e toky
  store/                    podklady pro obchody
  eas.json  app.config.ts  .env.example
```

Rozhraní, která nesmíš změnit (platí pro všechny části):
- `GET /api/krize/aktivni?obec=<slug>` vrací `{ hlavni, dalsich }` (jedno nejzávažnější aktivní hlášení).
- `GET /api/obce/<slug>/prehled` vrací souhrn: obec (nazev, slug, znak, castiObce, kontakty, uredniHodiny, moduly), krize `{hlavni, dalsich}`, 5 aktualit, 5 dokumentů desky, poslední hlášení rozhlasu. Pokud tvar nesedí s tím, co web vrací, uprav klienta přes zod schéma v `packages/typy` a rozdíl zapiš.
- `POST /api/mobilni-zarizeni` s tělem `{ token, platforma, obce[], casti[], kategorie[] }`.
- `POST /api/hlaseni-zavad`, `POST /api/asistent/dotaz` (body `{obec, otazka, kanal: "aplikace"}`, odpověď `{odpoved, zdroje[], jistota}`).
- Obec je tenant (pole `obec`), `castiObce` je pole `{nazev, slug}`.

Rozhraní, která vlastní tento prompt (vše v `apps/web/src/app/(payload)/api/mobilni/...` jako vlastní endpointy Payloadu nebo route handlery; všude zod validace těla, maximální velikost těla, rate limit):

| Endpoint | Účel |
|---|---|
| `POST /api/mobilni/auth/kod` `{email}` | pošle 6místný kód; odpověď je vždy stejná (bez zjišťování, zda účet existuje) |
| `POST /api/mobilni/auth/overit` `{email, kod, souhlas?}` | ověří kód, při prvním ověření založí účet (vyžaduje souhlas s podmínkami a věkem 15+), vrátí `{pristup, obnova, vyprsiVe}` |
| `POST /api/mobilni/auth/obnovit` `{obnova}` | rotuje obnovovací token |
| `POST /api/mobilni/auth/odhlasit` | zneplatní relaci a zařízení |
| `GET /api/mobilni/ucet`, `PATCH ...` | moje údaje (e-mail, sledované obce, nastavení), export JSON |
| `DELETE /api/mobilni/ucet` | smazání účtu po čerstvém ověření kódem |
| `GET /api/mobilni/hlaseni` | moje hlášení závad a jejich stavy |
| `POST /api/mobilni/urad/prihlaseni` `{email, heslo}` | první krok přihlášení pracovníka; vrátí výzvu 2FA |
| `POST /api/mobilni/urad/overit-2fa` | druhý krok; vrátí tokeny s rolí a obcemi |
| `GET /api/mobilni/urad/hlaseni-zavad?stav=&kurzor=` | fronta, `PATCH .../:id` změna stavu, odpověď občanovi, přiřazení |
| `POST /api/mobilni/urad/krize/nahled`, `POST .../krize` | náhled a odeslání krizového hlášení |
| `GET /api/mobilni/urad/budovy` | stav budov, jen čtení; když modul IoT chybí, `{dostupne:false}` |
| `GET /api/mobilni/me` | role a obce uživatele; jediný zdroj pravdy pro zobrazení záložky Úřad |

Tok dat: aplikace čte veřejná data přes `prehled` a REST kolekcí Payloadu (jen publikované a vyvěšené, to hlídá `publishedOr` a přístupová pravidla), ukládá je do cache a zobrazuje s časem poslední aktualizace. Zápis jde jen přes endpointy výše. Server kontroluje roli a příslušnost k obci u každého požadavku; skrytí záložky v UI je jen pohodlí.

Tokeny: přístupový token platí 15 minut, obnovovací 30 dní a rotuje; na serveru jsou uložené jen jako otisk. Obojí je v SecureStore. U pracovníka obce `requireAuthentication` (biometrie) a obnovovací token 7 dní.
</architektura>

<datovy_model>
Všechny kolekce vznikají novou migrací Payloadu. Pole česky bez diakritiky.

`obcane` (auth vypnutá lokální strategie, vlastní strategie nad tokeny z `mobilni-relace`):

| Pole | Typ | Pravidlo |
|---|---|---|
| email | email | povinné, unikátní, malá písmena |
| jmeno | text(120) | nepovinné |
| sledovaneObce | vztah na `obce`, hasMany | alespoň jedna po onboardingu |
| souhlas | skupina {verzePodminek, souhlasenoVe, vek15} | povinné při založení |
| nastaveni | skupina {kategorie[], tichyRezim {od, do, zapnuto}} | |
| stav | select aktivni, smazan | |
| posledniPrihlaseni | date | |

Přístup: občan čte a mění jen sebe; personál obce nevidí `obcane` vůbec (ve správě jen počet). Žádné pole obce, protože občan může sledovat víc obcí; kolekce je proto mimo plugin multi-tenant a to je zapsané v `docs/rozhodnuti.md`.

`mobilni-kody`: emailHash, kodHash (HMAC s tajemstvím ze serverové proměnné), platnostDo (10 minut), pokusy (max 5), pouzito. Mazat po expiraci.

`mobilni-relace`: ucet (obcan nebo user), obnovaHash, zarizeniId, platnostDo, posledniPouziti.

`mobilni-zarizeni`: token (unikátní, index), platforma (ios | android), obce (vztah, hasMany), casti (pole textů `<obec-slug>:<cast-slug>`), kategorie (select, hasMany: krize, informace_obce, aktuality, uredni_deska, moje_hlaseni), obcan (vztah, nepovinný), tichyRezim, jazyk, verzeAplikace, posledniAktivita, neplatne (boolean). Tvorba a změna jen přes endpoint (`overrideAccess` s vlastním ověřením); personál vidí jen agregované počty. Token se upsertuje podle hodnoty. Zařízení bez účtu je platné: oznámení jsou vázaná na zařízení. Po přihlášení se k zařízení připojí `obcan`, po odhlášení nebo smazání účtu se odpojí a odběry `moje_hlaseni` zaniknou.

`push-tikety`: zarizeni, hlaseni, ticketId, stav, vytvoreno; smazat po vyřízení receiptu nebo po 24 hodinách.

`krizova-hlaseni` (rozšíření): `casti` (vztah na části obce, hasMany, prázdné = celá obec), `pushOdeslanoVe` (date, jen čtení), `pushStatistika` {zamereno, prijato, chyby, neplatnych}, `upozornitZnovu` (boolean, po odeslání se vynuluje).

`hlaseni-zavad` (pouze minimum, pokud ještě neexistuje; rozšíří prompt 03): obec, obcan, cislo (`2026-047`), kategorie, popis(max 1000), poloha {lat, lng}, cast, fotky (relace na `media`, max 3), stav (prijato, prevzato, reseni, vyreseno, zamitnuto), odpoved, prirazeno (vztah na `users` téže obce), idempotencyKey (unikátní), vytvoreno.

`mobilni-audit`: kdo, role, akce, objekt, cas. Zapisuje se přihlášení pracovníka, odeslání a ukončení krizového hlášení, změna stavu hlášení, smazání účtu. Bez osobních údajů navíc.

`mobilni-limity`: klic, pocet, oknoOd (rate limit v Postgresu, aby se nezaváděla další služba mimo EU).
</datovy_model>

<funkce>
Obecně: každá obrazovka má stavy načítání (kostra s popiskem pro čtečku, ne točící kolečko samotné), prázdný, chybový s tlačítkem „Zkusit znovu“ a offline (poslední data a řádek „Naposledy aktualizováno 3. 11. 2026 v 9:41“). Čas vždy v Europe/Prague. Každá služba má i offline cestu: telefon, úřední hodiny a adresa úřadu (pravidlo 6 z CLAUDE.md), ta je v cache vždy.

**Onboarding.** (1) Úvod bez účtu: co aplikace umí, odkaz „Pokračovat bez účtu“. (2) Výběr obce: hledání v seznamu obcí s modulem `aplikace` (veřejný seznam z `/api/obce`), víc obcí povolí. (3) Výběr částí obce pro každou vybranou obec, výchozí je celá obec. (4) Vysvětlení oznámení před systémovým dotazem: obrazovka říká, co dostanu (krizová hlášení, výstrahy, informace), že to jde po kategoriích vypnout, a že oznámení nenahrazuje sirény, rozhlas ani IZS. Tlačítka „Povolit oznámení“ (teprve potom systémový dotaz) a „Teď ne“. Aplikace funguje i po odmítnutí (Apple 4.5.4, 5.1.2(i)). (5) Hotovo, otevře se Domů. Volbu lze kdykoli změnit v Profilu.

**Domů.** Nahoře krizový banner podle pravidel: jen jedno, nejzávažnější hlášení z `vyberBanner`; úroveň napsaná slovem (Krizová situace, Výstraha, Informace obce), barva jen doplněk, barvy z `packages/tokeny` (gov.cz); „další hlášení: N“ odkazuje na seznam; Krizovou situaci nejde skrýt, informaci a výstrahu ano (`lzeSkryt`, skrytí se pamatuje pod `klicSkryti`, takže úprava hlášení ho ukáže znovu). Hlášení omezené na části obce se zobrazí jen tomu, kdo sleduje danou část, nebo celou obec. Pod bannerem: poslední hlášení rozhlasu, 5 aktualit, 5 dokumentů desky, kontakt a úřední hodiny. Offline banner zůstává s časem poslední aktualizace a větou „Údaj může být zastaralý, řiďte se rozhlasem a pokyny IZS“. Při více sledovaných obcích je nahoře přepínač obce.

**Úřední deska.** Seznam dokumentů se filtrem podle kategorie, detail s přílohami (PDF se otevře v systémovém prohlížeči, na požádání se uloží pro offline). Pravidla: aplikace zobrazuje jen to, co server vrátí jako vyvěšené; při každé úspěšné synchronizaci se cache nahrazuje (ne slučuje), takže sejmutý dokument s volbou „Po sejmutí nezveřejňovat“ zmizí z telefonu, a uložené přílohy se smažou. Offline se dokument po datu `vyvesenoDo` skryje i bez serveru. Archiv ukazuje jen to, co server výslovně vrátí jako archivní.

**Hlásit závadu** (vyžaduje účet; bez účtu se zobrazí výzva k přihlášení a po přihlášení se pokračuje). Kroky: kategorie, fotka (kamera nebo galerie, až 3), popis, poloha. Fotka: `expo-image-picker` s `exif: false`, potom `expo-image-manipulator` (delší strana 1600 px, JPEG kvalita 0,7), čímž se metadata včetně GPS odstraní. Před odesláním upozornění: nefoťte lidi ani SPZ (dokument E, bod 3.4). Poloha je volitelná a jen „při používání“: tlačítko „Použít moji polohu“ (dotaz na oprávnění až po klepnutí), jinak špendlík na mapě posunutý ručně, jinak jen textový popis místa. Nikdy poloha na pozadí. Poloha se posílá jako samostatné pole `poloha`, ne v souboru. Odeslání: `POST /api/hlaseni-zavad` jako multipart s hlavičkou `Idempotency-Key` (UUID vytvořené při otevření návrhu, takže opakování po výpadku nevytvoří duplicitu). Offline nebo při chybě sítě se hlášení uloží jako návrh (text v šifrované cache, fotky v souborovém úložišti aplikace), obrazovka řekne „Čeká na odeslání“ a odešle se po obnovení sítě. Po úspěchu číslo podnětu a stav. V seznamu „Moje hlášení“ stavy (přijato, převzato, řeší se, vyřešeno, zamítnuto) s odpovědí obce. Upozornění: nouzové situace nehlaste, volejte 112, 150, 155, 158 (dokument E, 3.2); hlášení není úřední podání.
Moderace: aplikace nezobrazuje cizí hlášení ani cizí fotky, takže Apple 1.2 (UGC) se v této verzi nespouští; ověř při revizi, a pokud prompt 03 přidá veřejnou mapu, doplň nahlášení obsahu a blokaci.

**Asistent.** Při první interakci celá obrazovka: „Tohle je umělá inteligence, ne úředník“, kde běží (server CodeKom v České republice), že odpovídá z dokumentů obce a cituje je, že se může mýlit a odpověď není závazná, a že se do dotazu nemají psát rodná čísla ani zdravotní údaje. Souhlas se zapamatuje (lokálně, s verzí textu). Trvale štítek „AI asistent“ v záhlaví chatu a u každé odpovědi. Odpověď zobrazí text, zdroje (název dokumentu obce, klepnutím se otevře) a míru jistoty; při nízké jistotě nabídne kontakt na úřad. Dotaz jde bez hlavičky s identitou na `POST /api/asistent/dotaz`; historie je jen v paměti aplikace a po zavření zmizí. Před odesláním lokální kontrola vzorů rodného čísla a čísla účtu: zobrazí varování a nabídne úpravu. Offline: stavová zpráva s kontaktem na úřad. Apple 5.1.2(i) (souhlas při sdílení se třetí stranou AI): model běží na vlastním serveru CodeKom, ne u třetí strany; ověř a v poznámkách pro recenzenty to uveď.

**Služby.** Seznam služeb digitálního úřadu obce (životní situace, formuláře, platby, rezervace) z `prehled` nebo z endpointu, který definuje prompt 03; do té doby odkazy na stránky služeb webu obce (`[DOPLNIT: cesta]`), otevřené v systémovém prohlížeči (`expo-web-browser`). Aplikace nic nevybírá a nikdy nedrží peníze.

**Profil.** Sledované obce a části, kategorie oznámení (krize a výstrahy, informace obce, aktuality, úřední deska, moje hlášení), tichý režim (od–do; krizová situace ho vždy prolomí, což je v textu napsané), přihlášení nebo odhlášení, Moje osobní údaje (zobrazit a exportovat JSON), Smazat účet, Prohlášení o přístupnosti, Zásady ochrany osobních údajů (dokument D), Podmínky (dokument E), Informace o zpracování v obci (dokument C, odkaz podle obce), verze aplikace, provozovatel a kontakt. Vypnutí kategorie krize ukáže potvrzení s doporučením nechat ji zapnutou (dokument E, 5.3).
Přihlášení: e-mail, 6místný kód (pole s `textContentType="oneTimeCode"` a `autoComplete="sms-otp"`), při prvním přihlášení zaškrtnutí souhlasu s podmínkami a „je mi 15 let nebo více“. Bez hesla.
Smazání účtu: Profil, Smazat účet, vysvětlení, co se stane, potvrzení čerstvým kódem z e-mailu. Server smaže `obcan`, relace a odběry `moje_hlaseni`, odpojí zařízení a v hlášeních závad odstraní vazbu na občana a kontaktní údaje; obsah hlášení patří obci a zůstává podle její retence ([DOPLNIT: retence hlášení, potvrdí advokát]). Dokument E slibuje smazání údajů do 30 dní, uděláme to hned a do `mobilni-audit` zapíšeme jen fakt smazání. Aplikace pak smaže SecureStore, cache i návrhy a vrátí se na onboarding. Splňuje Apple 5.1.1(v); Google navíc žádá odkaz na smazání mimo aplikaci: veřejná stránka `/smazani-uctu` v `apps/web` (popis a formulář s kódem na e-mail).

**Záložka Úřad** (jen když `/api/mobilni/me` vrátí roli pracovníka obce). Přihlášení pracovníka je samostatná obrazovka v Profilu („Přihlášení pracovníka obce“): e-mail a heslo účtu z `users`, potom kód 2FA; token se uloží s biometrií. Odhlášení po 15 minutách nečinnosti u akcí, které mění data (znovu biometrie).
- Fronta hlášení závad: filtr podle stavu, řazení od nejstaršího, detail s fotkami a polohou, změna stavu, odpověď občanovi (veřejný text, dokument E 3.5), přiřazení pracovníkovi téže obce. Změna stavu odešle občanovi push (kategorie `moje_hlaseni`).
- Krizové hlášení: formulář stejných polí jako ve správě (úroveň, titulek do 90 znaků, text do 300 znaků, odkaz jen https nebo cesta webu obce, části obce, platnost, kanály). Krok Náhled ukáže přesně, jak banner vypadá v aplikaci i na webu, a kolik zařízení dostane push (`krize/nahled`, jen počet). Krok Potvrzení: shrnutí a držení tlačítka 1,5 s s alternativou pro čtečku (dvojité klepnutí na „Odeslat nyní“ a potvrzovací dialog), u úrovně Krizová situace navíc biometrie. Odeslat smí role správce obce; redaktor může uložit koncept, ne publikovat. Ukončení hlášení nastaví `platiDo` a taktéž vyžaduje potvrzení. Hlášení nejde smazat.
- Stav budov: seznam budov z IoT s barvou a slovním stavem (v pořádku, varování, porucha), teplota, baterie, čas posledního měření; jen čtení. Ovládací prvky jsou skryté, dokud server nevrátí oprávnění `iot.ovladani`, a ani pak je tento prompt nestaví.
- Demo režim pro recenzenty: viz <bezpecnost_a_soukromi>.

**Push.** Klient: po souhlasu `getExpoPushTokenAsync` (opakuje se při selhání offline), registrace `POST /api/mobilni-zarizeni` s obcemi, částmi a kategoriemi, při každé změně nastavení a při obnovení tokenu. Android kanály vytvoř při startu a verzuj jejich ID, protože po vytvoření lze měnit jen název a popis: `krize_v1` (nejvyšší důležitost, zvuk, vibrace), `dulezite_v1` (vysoká), `informace_v1` (výchozí). Úroveň hlášení určuje kanál: Krizová situace `krize_v1`, Výstraha `dulezite_v1`, Informace obce `informace_v1`. Bez existujícího kanálu by se oznámení nezobrazilo, proto se při registraci ověří vytvoření. iOS: krizová situace a výstraha s `interruptionLevel: timeSensitive`, informace `active`; ověř entitlement time-sensitive a jeho zapnutí přes config plugin. Critical Alerts: do buildu nepřidávej; napiš do `apps/mobile/store/critical-alerts-zadost.md` zdůvodnění pro Apple (povodně, požár, výpadek vody; zdrojem je obec, ne aplikace) a poznámku, že žádost podává držitel účtu a design na ní nezávisí. Ťuknutí na oznámení otevře `krize/[id]` (schéma `codekom://` a univerzální odkazy `[DOPLNIT: doména]`), v popředí se oznámení zobrazí jako banner v aplikaci a Domů se obnoví.
Server (úloha v `apps/web`, Payload Jobs): hook `afterChange` na `krizova-hlaseni` zařadí úlohu `odeslatPush`, když je hlášení publikováno, kanály obsahují „aplikace“ a `pushOdeslanoVe` je prázdné, nebo když editor zaškrtne `upozornitZnovu`. Úloha se spustí hned (ne až čekáním na cron), jinak by nešlo splnit 60 sekund; na Vercelu přes `waitUntil`/`after`, ověř. Postup: najdi zařízení podle obce, částí (zařízení bez zvolených částí dané obce bere celou obec; hlášení bez částí jde všem v obci) a kategorie (Krizová situace a Výstraha patří do `krize`, Informace obce do `informace_obce`); vyřaď neplatná a ta v tichém režimu (jen úrovně pod Krizovou situací); odesílej po dávkách 100 s `priority: high` pro krizi a výstrahu a hodnotami `ttl` v konstantách (návrh: 12 h pro krizi a výstrahu, 6 h pro informaci); do `push-tikety` ulož tikety. Obsah: titulek s úrovní slovem („Krizová situace: …“), tělo zkrácené tak, aby celé oznámení nepřesáhlo 4 KiB; žádné osobní údaje. Selhání 429 a 5xx opakuj s exponenciálním čekáním. Druhá úloha `zkontrolovatReceipty` se zařadí za 15 minut, vyzvedne receipty (po max. 1000 ID), `DeviceNotRegistered` označí zařízení jako neplatné a smaže ho, ostatní chyby zapíše do `pushStatistika`. Odesílač je za rozhraním `PushOdesilac` (implementace Expo, výhledově přímo FCM a APNs přes `getDevicePushTokenAsync`), protože Expo Push nemá SLA a doručení je „at least once“, takže mohou přijít duplicity; klient duplicitu sloučí podle `data.hlaseniId` a `data.verze`. V textech aplikace i podmínek stojí, že oznámení je doplňkový zdroj a nenahrazuje IZS ani rozhlas.
</funkce>

<pravidla>
- Krizové hlášení: vždy jen jedno, nejzávažnější; úroveň slovem; Krizovou situaci nejde skrýt; hlášení nenahrazuje varování IZS (CLAUDE.md, pravidla domény 2).
- Úřední deska: zveřejněný dokument visel od prvního dne; po sejmutí zmizí z aplikace, je-li označený „Po sejmutí nezveřejňovat“ (výchozí). Cache nikdy nedrží déle, než server dovoluje.
- Účet: čtení veřejného obsahu bez účtu; účet jen pro hlášení, odběr vázaný na účet a služby (dokument E, 2; Apple 5.1.1(v), 5.1.2(i)). Samostatně od 15 let (dokument D, E; hranici potvrdí advokát).
- Sign in with Apple není nutné, protože aplikace nenabízí přihlášení třetí stranou (Apple 4.8, vlastní systém účtů je výjimka). Ověř znění 4.8 v App Review Guidelines a zapiš do `docs/verification-log.md`; vznikne-li kdy Google nebo Facebook login, je nutné přidat.
- Správce a zpracovatel: u hlášení závad a obsahu obce je správcem obec, CodeKom zpracovatelem; u účtu v aplikaci je správcem CodeKom (rozhodnutí z 2. 11. 2026). UI to ukazuje: Profil jmenuje provozovatele CodeKom s.r.o. (`[DOPLNIT: IČO, sídlo, e-mail]`) a u každé obce odkaz na její informaci o zpracování.
- Bez souhlasu žádná analytika ani třetí strany (§ 89 odst. 3 zákona č. 127/2005 Sb.). Do aplikace nepřidávej analytický SDK. Hlášení pádů jen s opt-in přepínačem v Profilu, výchozí vypnuto; konkrétní nástroj `[DOPLNIT]`, bez něj nic.
- AI: čl. 50 AI Actu (platí od 2. 8. 2026): sdělení při první interakci a trvalý štítek; odpovědi z dokumentů obce se zdrojem; dotazy se neukládají k osobě. Znění čl. 50 ověř na EUR-Lex a dopad Digital Omnibus (viz <overit>).
- Platby: přímo na účet obce, aplikace peníze nedrží (CLAUDE.md, pravidlo 3).
- Google Play pro vládní informace: aplikace není oficiální aplikací státu ani obce. V popisu: „Neoficiální aplikace, provozuje CodeKom s.r.o. jménem obcí“, a zdroje (domény obcí). Vyplň Government apps declaration, kontaktní e-mail provozovatele a v poznámkách pro recenzenty doklad pověření obce (pilotní obec `[DOPLNIT]`). Falešná vládní příslušnost je zakázaná.
- Apple 5.1.1(ix): aplikaci v regulované oblasti smí podat jen právnická osoba, vývojářské účty vedou na CodeKom s.r.o. (`[DOPLNIT: IČO, D-U-N-S]`; do založení firmy se nic nepublikuje, jen interní testování přes TestFlight a interní test v Google Play po zřízení účtu).
- Přístupnost, zákon č. 99/2019 Sb.: povinným subjektem je obec, aplikace „vytvořená pro něj“ musí vyhovět nepřímo. Cíl: EN 301 549 V3.2.1 (WCAG 2.1 AA) a stavět podle WCAG 2.2 AA. Prohlášení o přístupnosti musí uvádět seznam aplikací, míru souladu, důvody nesouladu a způsob podání stížnosti; dozor DIA. Šablonu dej do `apps/mobile/store/prohlaseni-o-pristupnosti.md` a zobrazuj ji v Profilu; konkrétní obec ho zveřejní na svém webu.
- Cílové API Androidu: od 31. 8. 2026 musí nové aplikace a aktualizace cílit na Android 16 (API 36). Ověř, že SDK 58 s výchozím nastavením `targetSdkVersion` 36 splňuje, jinak nastav přes `expo-build-properties`.
</pravidla>

<design_a_pristupnost>
Vzhled: pravidla unslop z CLAUDE.md (řezy písma nejvýš 600, věty s velkým písmenem, bez vykřičníků a emoji, jedna akcentová barva, žádné přechody a záře, mřížka 4 px, tenké linky). Barvy a typografie z `packages/tokeny`; akcent přebírá z palety obce (0–2), krizové úrovně mají pevné barvy gov.cz: Informace `#F2F6FC`/`#0C1838`/`#00469B`, Výstraha `#FEF6D8`/`#2A1B00`/`#CA8504`, Krizová situace `#B00A0D`/`#FFFFFF`/`#6E0507`. Písmo se základní velikostí 17 pt, text používá systémové škálování. Prototyp používá Public Sans; ověř licenci (SIL OFL) a rozhodni mezi ním a systémovým písmem podle velikosti instalace. Světlý i tmavý režim, oba s kontrastem aspoň 4,5 : 1 pro text a 3 : 1 pro ovládací prvky.

Konkrétně:
- Každý interaktivní prvek má `accessibilityRole`, `accessibilityLabel` (srozumitelný bez okolí, ne „tlačítko 2“), `accessibilityState` (vybráno, zakázáno, načítá se) a tam, kde výsledek není zřejmý, `accessibilityHint`. Obrázky bez významu jsou skryté pro čtečku, ostatní mají popis.
- Cíle pro dotyk aspoň 44 × 44 pt (iOS) a 48 dp (Android), mezi sousedními cíli mezera aspoň 8.
- Dynamická velikost písma: žádný pevný výškový limit textu; `maxFontSizeMultiplier` jen u prvků, kde by se rozbil layout (záložková lišta, nejvýš 1,5), jinak neomezovat. Ruční kontrola při 200 % na šířce 320 pt: nic se neořízne, nic se nepřekrývá.
- Krizový banner čtečka přečte jako první na Domů (úroveň, titulek, text); změna banneru za běhu se ohlásí (`accessibilityLiveRegion="polite"` na Androidu, oznámení přes `AccessibilityInfo.announceForAccessibility` na iOS; u Krizové situace asertivně).
- Pořadí fokusu odpovídá vizuálnímu pořadí; modální okna zachytí fokus a vrátí ho po zavření; chyby formulářů se oznámí a jsou spojené s polem.
- Omezení animací: respektuj `AccessibilityInfo.isReduceMotionEnabled`, bez blikání, žádný efekt delší než 300 ms bez možnosti vypnout; pomalu reagující prvky (držení tlačítka) mají alternativu.
- Barva není jediný nositel významu (úroveň slovem, stav slovem u budov a hlášení).
- Záložková lišta: pět položek pro občana (Domů, Deska, Hlásit, Asistent, Služby), Profil je ikona v záhlaví každé záložky, šestá záložka Úřad jen pro pracovníka. Při velkém písmu ikonu s popiskem zalamuj, nezmenšuj.
- Obrazovky se čtečkou VoiceOver a TalkBack projdi ručně a výsledek zapiš do `docs/verification-log.md`.
</design_a_pristupnost>

<bezpecnost_a_soukromi>
- Standard: OWASP MASVS L1 pro celou aplikaci, pro roli úřad se řiď i L2 tam, kde to nestojí složitost (biometrie pro tokeny, krátké relace). Při psaní projdi MASVS kategorie (STORAGE, CRYPTO, AUTH, NETWORK, PLATFORM, CODE, PRIVACY) a výsledek zapiš do `docs/mobil-masvs.md` jako tabulku požadavek / stav / důkaz. Znění MASVS ověř (viz <overit>).
- Tokeny jen v `expo-secure-store`; v MMKV ani AsyncStorage žádné tokeny ani osobní údaje. Neukládej do SecureStore velké bloby (pod 2 KB). Data občana v cache jsou v samostatné šifrované instanci s klíčem ze SecureStore a při odhlášení a smazání účtu se ničí. Veřejná data v necitlivé cache.
- V aplikaci žádný tajný klíč. Do `EXPO_PUBLIC_*` patří jen veřejné hodnoty (adresa API, identifikátor projektu, omezený klíč mapových dlaždic, pokud ho poskytovatel vyžaduje). `.env.example` popisuje proměnné, tajemství OTP (`MOBILNI_KOD_PEPPER`), přístup k Expo push (volitelně enhanced push security) a demo kódy jsou jen serverové.
- Certificate pinning neřešíme: komunikujeme jen s vlastním API na běžném veřejném certifikátu, který obmění hostitel; pevný pin by při rotaci certifikátu nebo změně hostingu aplikaci vyřadil a opravit ji lze jen novou verzí z obchodu, což u krizových hlášení hrozí víc než útok, který pinning řeší. Zapiš do `docs/rozhodnuti.md`; kdyby to požadovala bezpečnostní příloha obce, pak jen s rezervním pinem a vzdáleným vypnutím.
- Validace: zod na všech vstupech endpointů (délky, výčty, formáty), limit velikosti těla, u nahrávání typ a velikost souboru (max 1,5 MB na fotku, 3 fotky, JPEG), serverové znovuzakódování obrázku (strip metadat včetně EXIF GPS; test s fixturou) a ověření, že `obec` a `casti` patří dohromady. Odkazy v hlášeních jen přes `bezpecnyOdkaz`. Žádné vykreslování HTML z API.
- Rate limit na serveru: kód 5 za hodinu na e-mail a 20 za hodinu na IP, 5 pokusů na kód, hlášení závad 10 za den na účet, asistent 30 za hodinu na IP, registrace zařízení 20 za hodinu na IP, přihlášení pracovníka zamčení po 5 chybách. Odpovědi neprozrazují existenci účtu.
- Soukromí: poloha jen v popředí a jen při hlášení; foto a poloha nejdou nikam jinam než k obci; žádná identifikace reklamou; push token je identifikátor zařízení a patří do Data safety. Data v EU (Supabase Frankfurt), AI na serveru v ČR.
- Demo pro recenzenty: obchody vyžadují přihlašovací údaje a kódem z e-mailu se recenzent nepřihlásí. Povol přes serverové proměnné jeden předem daný e-mail (občan) a jednoho demo pracovníka s pevným kódem (bez skutečného 2FA), oba vázané jen na obec Javoří Lhota se seed daty, mimo skutečné obce, s vlastním rate limitem. Je to vědomý kompromis, zapiš ho do `docs/rozhodnuti.md`, nastavení je vypnuté výchozím stavem a zapíná ho jen produkční prostředí po vyplnění `[DOPLNIT: demo e-mail]`.
- Údaje v obchodech: privacy manifest `PrivacyInfo.xcprivacy` (aplikace, nic nesleduje, deklarované přístupy k API podle použitých knihoven; Hermes a další závislosti dodají vlastní manifesty, ověř hlášení ITMS-91056 při uploadu), App Privacy štítky a Google Play Data safety podle tabulky: e-mail (účet), přesná poloha (jen při hlášení, volitelné), fotky (volitelné), identifikátor zařízení / push token (oznámení), diagnostika jen s opt-in; žádné sledování, sdílení se třetími stranami jen se zpracovateli. Věkové hodnocení: vyplň Apple dotazník (13+/16+/18+) a Google, zohledni fotky od uživatelů a AI chat; předpoklad je nízké hodnocení, ale ověř (viz <overit>). Popis, titulek a poznámky pro recenzenty česky v `store/`.
</bezpecnost_a_soukromi>

<testy>
Cíl je ověřit pravidla, ne pokrytí řádků. Žádný test se nesmí přeskočit ani upravit tak, aby prošel.

| Co | Nástroj | Jak |
|---|---|---|
| Pravidla banneru: nejzávažnější vyhrává, Krizová situace nejde skrýt, skrytí se vrací po úpravě, filtr podle částí obce, platnost od–do | Jest + React Native Testing Library, sdílené testy v `packages/typy` | tabulkové testy včetně hranic času a Europe/Prague |
| Offline: bez sítě se zobrazí poslední data s textem „Naposledy aktualizováno“, banner zůstane s upozorněním; po úspěšné synchronizaci se sejmuté dokumenty odstraní; dokument po `vyvesenoDo` zmizí i offline | RNTL, mock `NetInfo` a API (MSW) | |
| Výběr hlášení pro push (server): obec, části, kategorie, tichý režim, neplatná zařízení, Krizová situace prolomí tichý režim | Vitest v `apps/web` s PGlite | tabulka zařízení a hlášení |
| Odeslání push: dávky po 100, retry při 429, tikety uloženy; receipt `DeviceNotRegistered` smaže zařízení | Vitest, mock Expo API | |
| Přihlášení kódem: stejná odpověď pro neexistující e-mail, vypršení, 5 pokusů, rate limity, rotace obnovy, souhlas při prvním ověření | Vitest | |
| Smazání účtu: smaže vše z <funkce>, hlášení zůstane bez vazby na občana | Vitest | |
| Role: občan nemá přístup k `/api/mobilni/urad/*`, redaktor nepublikuje krizové hlášení, pracovník vidí jen svou obec | Vitest | |
| EXIF: server po zpracování neobsahuje APP1 Exif ani GPS (fixtura JPEG s GPS) | Vitest | |
| Hlášení závady: idempotence, návrh offline, kompresní parametry | RNTL, jednotkové testy | |
| Asistent: první použití zobrazí sdělení o AI, štítek je vždy, varování při rodném čísle | RNTL | |
| E2E klíčové cesty: onboarding, hlášení závady, příjem notifikace | Maestro v `.maestro/`, simulátory iOS a Android | příjem: iOS `xcrun simctl push` s payloadem odpovídajícím odesílači a ťuknutí, které otevře detail; Android emulátor s obrazem Google Play a skutečným Expo tokenem. Měření doby od publikace do doručení je skript `scripts/push-latenci.ts`, ne Maestro (neumí číst oznamovací lištu); ověř možnosti Maestro v jeho dokumentaci |
| Přístupnost | `eslint-plugin-react-native-a11y` (chyba při každém porušení), test projde vykreslený strom a požaduje role a popisky u všech tlačítek, min. rozměry z tokenů | ruční VoiceOver a TalkBack |
| Typy a styl | `tsc --noEmit`, ESLint | |
</testy>

<postup>
Na začátku sepiš plán a seznam úkolů (soubor `docs/progress.json` nebo úkoly v Claude Code), po každém milníku ho odškrtni. Po každém milníku spusť `pnpm typecheck`, `pnpm lint`, `pnpm test` v dotčených balíčcích a commitni (česky, rozkazovací způsob). Při dvou neúspěšných opravách téže chyby zastav, zapiš příčinu a změň postup, neobcházej test.

0. Ověření a plán. Splň všechny body z <overit>, které blokují volbu (verze SDK 58, React Native, minimální iOS a Xcode, MMKV, TanStack Query, Router, mapa). Výsledky do `docs/verification-log.md` (zdroj, datum, závěr). Rozhodnutí do `docs/rozhodnuti.md`.
1. Kostra. Pnpm workspace a Turborepo (pokud chybí), `apps/mobile` s Expo Routerem, strict TypeScript, ESLint s a11y pravidly, Jest, `eas.json`, `app.config.ts` s config pluginy (`expo-notifications`, `expo-secure-store`, `expo-build-properties`), `.env.example`, přesun logiky banneru do `packages/typy`. Development build spustitelný na simulátoru (ne Expo Go).
2. Backend účtů. Migrace, `obcane`, kódy, relace, rate limity, `me`, mazání účtu, stránka `/smazani-uctu`, testy.
3. Onboarding, Domů, cache. Seznam obcí, výběr částí, vysvětlení oznámení, přehled, krizový banner, perzistentní cache s časem poslední aktualizace, offline stavy, seed Javoří Lhota.
4. Deska, Služby, Profil. Úřední deska s pravidly cache, Služby, Profil včetně přihlášení, smazání účtu, přístupnosti a právních textů.
5. Hlášení závad. Kamera, galerie, komprese, poloha, mapa se špendlíkem, fronta návrhů, Moje hlášení, serverová část a EXIF.
6. Push. Kanály, registrace, kolekce `mobilni-zarizeni`, hook a úloha, receipty, mazání tokenů, deep linky, měření doby doručení.
7. Úřad. Přihlášení pracovníka, fronta hlášení, krizové hlášení s náhledem a potvrzením, stav budov, audit.
8. Asistent. Sdělení podle čl. 50, chat, zdroje, varování před citlivými údaji.
9. Dokončení. Přístupnost (ruční průchod), Maestro toky, MASVS tabulka, podklady pro obchody v `store/`, EAS build pro iOS i Android profilu `preview`, `npx expo-doctor` bez chyb, závěrečná zpráva.
</postup>

<hotovo_kdyz>
Příkazy (všechny bez chyb, bez přeskočených testů):
- `pnpm install --frozen-lockfile`
- `pnpm --filter mobile typecheck`, `pnpm --filter mobile lint`, `pnpm --filter mobile test`
- `pnpm --filter web typecheck`, `pnpm --filter web test` (testy backendu a netknuté testy úřední desky a banneru)
- `pnpm --filter mobile e2e` (Maestro: onboarding, hlášení závady, příjem notifikace)
- `pnpm --filter mobile a11y` (a11y lint a test stromu)
- `npx expo-doctor` v `apps/mobile` bez chyb
- `eas build --profile preview --platform all` skončí úspěšně (iOS vyžaduje účet a certifikáty `[DOPLNIT: Apple Developer účet CodeKom s.r.o.]`; nejsou-li, doložit aspoň úspěšný lokální build `expo run:ios` a `expo run:android` a napsat, co chybí)

Chování, které jde ukázat na demo obci Javoří Lhota:
- Onboarding bez účtu přes výběr obce a částí, vysvětlení oznámení předchází systémovému dotazu a po „Teď ne“ aplikace funguje.
- Publikace krizového hlášení s kanálem „aplikace“ ve správě webu doručí push na zařízení do 60 sekund (změřeno skriptem, hodnota zapsaná v závěru) a banner na Domů ukáže pouze nejzávažnější hlášení.
- Zařízení v režimu letadlo ukáže Domů a Úřední desku s textem „Naposledy aktualizováno …“.
- Hlášení závady s fotkou a polohou se odešle, dostane číslo a stav, v odeslané fotce nejsou EXIF ani GPS (ověřeno testem), pracovník obce změní stav a občan dostane push.
- Smazání účtu v aplikaci funguje, stránka `/smazani-uctu` také, po něm je e-mail volný pro nové založení.
- Pracovník obce se přihlásí heslem a 2FA, vidí Úřad, odešle krizové hlášení přes náhled a potvrzení; občan a redaktor nemohou.
- Asistent při prvním otevření ukáže sdělení, že jde o AI, a odpoví se zdrojem.
- Ruční test VoiceOver a TalkBack na Domů, Hlásit a Profil bez blokujících chyb; při 200 % písma na šířce 320 pt se nic neořízne.
- `store/` obsahuje popisy v češtině, tabulky pro App Privacy a Data safety, poznámky pro recenzenty, šablonu prohlášení o přístupnosti a žádost o Critical Alerts.
</hotovo_kdyz>

<overit>
Cokoli z této tabulky agent ověří z primárního zdroje a zapíše do `docs/verification-log.md`, nebo v kódu ponechá komentář `[OVĚŘIT]`. Čísla z rešerše nepoužívej jako fakt.

| Bod | Jak ověřit |
|---|---|
| Expo SDK 58: vyšlo 29. 9. 2026, `expo@58.0.23` k 3. 11. 2026; verze React Native, minimální iOS a Xcode, breaking changes, stav regrese Hermes v1 (opraveno v 57.0.9), scene lifecycle pro iOS 27 | `npm view expo version`, `https://expo.dev/changelog/sdk-58.md`, `npx expo install --fix`, `npx expo-doctor`; na SDK 57 se vrať jen s písemným zdůvodněním v `docs/rozhodnuti.md` |
| Kompatibilita TanStack Query v5 a `react-native-mmkv` s React Native pro SDK 58; záloha: perzistence přes `expo-sqlite` | `npm view`, README balíčků, zkušební build |
| Expo Router bez React Navigation (od SDK 56): deep linking a univerzální odkazy, Native Tabs a jejich přístupnost | docs.expo.dev/router |
| Knihovna i18n (i18next vs. expo-localization) | docs, velikost, podpora |
| Politika EAS Update vůči Apple 3.3.2 (OTA nesmí měnit účel); EAS Update vyžaduje `--environment` | docs.expo.dev/eas-update, App Review Guidelines |
| Time Sensitive entitlement, Android `USE_FULL_SCREEN_INTENT` a DND, schválení Critical Alerts | developer.apple.com, developer.android.com (rešerše měla jen sekundární zdroj) |
| Google Play: mazání účtu (odkaz mimo aplikaci i uvnitř), Data safety, Government apps declaration, věkové hodnocení při fotkách a AI | Play Console, support.google.com |
| Apple: znění 4.8, 5.1.1(v), 5.1.2(i), 3.1.3(e), 1.2; privacy manifest a seznam required-reason API; nový věkový dotazník | developer.apple.com |
| `expo-image-picker` `exif: false` a chování EXIF na obou platformách; Android 14 selected photos access; `expo-image-manipulator` skutečně odstraní metadata | docs.expo.dev + test na zařízení |
| `expo-secure-store` `requireAuthentication` bez nastavené biometrie (chování a náhradní postup) | docs.expo.dev/versions/latest/sdk/secure-store |
| Mapa se špendlíkem: poskytovatel dlaždic a knihovna (MapLibre, react-native-maps nebo expo-maps), licenční podmínky a případný veřejný klíč | docs, podmínky poskytovatele; výsledek `[DOPLNIT: poskytovatel dlaždic]` |
| Maestro: možnost testovat oznámení | docs.maestro.dev |
| OWASP MASVS (aktuální verze) a MASTG | mas.owasp.org |
| Čl. 50 AI Act na EUR-Lex a stav Digital Omnibus | eur-lex.europa.eu |
| Zákon č. 99/2019 Sb. a EN 301 549 V3.2.1 pro mobilní aplikace; zda DIA řeší soukromé dodavatele | zakonyprolidi.cz / e-Sbírka, dia.gov.cz; dotaz na DIA zapsat jako úkol pro zakladatele |
| Hlášenka, Obec v mobilu, aktuální hodnocení konkurentů na Google Play | ruční průchod listingů |
| NIA pro soukromého dodavatele obcí | dotaz na DIA, v této verzi vynechat |
| EAA (směrnice 2019/882) pro platby a rezervace, EU trader status v App Store | právník, jen zapsat jako otevřenou otázku |
</overit>

<zaver>
Na konci napiš krátké shrnutí:
- co je hotové a čím je to ověřené (příkazy a jejich výsledek, naměřená doba doručení push v sekundách, výsledek EAS buildů),
- co zbývá a proč (například Critical Alerts, přímý FCM a APNs, veřejná mapa hlášení),
- seznam míst `[DOPLNIT]` a `[OVĚŘIT]` s cestou k souboru,
- odchylky od tohoto zadání a jejich zápis v `docs/rozhodnuti.md`,
- úkoly pro zakladatele: založení CodeKom s.r.o., vývojářské účty Apple a Google, doména a univerzální odkazy, e-mailová služba pro kódy, dotaz na DIA, kontrola dokumentů D a E advokátem.
</zaver>
