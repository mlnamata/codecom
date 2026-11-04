# Prompt: Dokončení přípravy podkladů

Vlož celý do Claude Code v kořeni repozitáře `codecom`, nebo napiš: Proveď zadání v `prompty/00-dokonceni-pripravy.md`.
Spusť jako první, před prompty 06 až 08. Kód aplikací nepiš. Připravuješ jen obsah, aby další prompty jen psaly kód.

<kontext>
Repozitář je připravený pro stavbu CodeKomu podle promptů v `prompty/` (pořadí v `prompty/README.md`). Prompty 01 až 08 jsou hotové. Chybí dva podklady, na které prompty odkazují: hotové texty prezentačního webu a kompletní obsah ukázkové obce Javoří Lhota. Závazná rozhodnutí a seznam souborů jsou v `docs/brief-prototypy.md` (sekce „Připravené podklady“, „Sdílený základ monorepa“ s poli typů a fakty, „Prompt 06 (úprava)“). Přečti také `CLAUDE.md`, `docs/rozhodnuti.md` a `prompty/06-prezentacni-web.md`.
</kontext>

<cil>
Na konci jsou v repozitáři všechny soubory `obsah/prezentace/*.md` a `obsah/javori-lhota/*.json` podle briefu, prošly kontrolami níže a jsou commitnuté a pushnuté. Prompty 06, 07 a 08 na ně odkazují přesně těmito cestami.
</cil>

<rozsah>
1. **Texty prezentačního webu** `obsah/prezentace/`. Hotový je jen `uvod.md` (vzor stylu a frontmatteru). Dopiš: `co-umime.md`, `ukazky.md` (úvod galerie a pro každou z 20 šablon v pořadí naves, zvonice, studanka, lipa, majka, hnizdo, hranice, vinice, hreben, rynek, radnice, kolonada, mlyn, hraz, lupa, kompas, magistrat, zpravodaj, mikroregion, urad: název, věta „pro koho“, věta čím se liší, alt text snímku; podklad `docs/navrh-platformy/03-sablony-webu.md` a snímky `design/snimky/`), `cenik.md` (orientační ceny „od“ přesně podle briefu, štítek „orientační cena, přesnou pošleme v nabídce“, podmínky ze smlouvy A v `docs/pravni-dokumenty.md` bez zkrášlení), `prechod.md`, `bezpecnost-a-pravo.md`, `dotace.md` (bez neověřených výzev), `pro-koho.md`, `o-nas.md`, `kontakt.md` (telefon, e-mail, adresa `[DOPLNIT]`, předmět pro mailto), `ke-stazeni.md` (Jak obec nakupuje, `[OVĚŘIT]` u registru smluv a limitu zakázek), `faq.md`, `pristupnost.md`, `zasady-osobnich-udaju.md` (podle D, web nic nesbírá), `cookies.md` (nic se neukládá), `tvrzeni.md` (tabulka: tvrzení, stránka, zdroj, datum, stav `overeno | orientacni | hypoteza | neovereno`; každé číslo, zákon a termín ze všech souborů včetně `uvod.md`).
   Frontmatter: `title` do 60 znaků, `description` do 155, `adresa`. Obsah stránek podle mapy webu a sekce funkce v promptu 06. Podklady: `docs/navrh-platformy/01` až `07`, `docs/pravni-dokumenty.md`, `research/poznamky/web_obce_a_prodej.md`, `brand/README.md`.
2. **Obsah ukázkové obce** `obsah/javori-lhota/`: `obec.json`, `aktuality.json` (8 až 12), `akce.json`, `uredni-deska.json` ({kategorie, dokumenty}: 10 až 14 vyvěšených k 4. 11. 2026, 6 až 8 sejmutých, část `skrytPoSejmuti: true`, jeden „do odvolání“; každý dokument má `text` 2 až 6 odstavců a `soubor` {nazev, url "/demo/deska/<id>.pdf", typ "application/pdf", velikost null}), `krizova-hlaseni.json` (tři hlášení z objektu `A` v `design/generator/build.py`), `rozhlas.json`, `zastupitele.json`, `zivotni-situace.json`, `sluzby.json` ({sluzby, poplatky}; odpad 900 Kč, pes 200 Kč), `prostory.json` ({prostory, rezervace}), `hlaseni-zavad.json` (5 až 8 v různých stavech), `budovy.json` (podle `design/prototypy/IoT-Dashboard.dc.html`), `asistent-ukazka.json` (3 otázky a odpovědi, každá cituje `id` dokumentů desky a začíná větou, že odpovídá umělá inteligence z dokumentů obce), `README.md` (popis souborů a polí).
   Zdroj obsahu: texty všech 20 těl `design/generator/bodies/*.html` (obsah je ve všech shodný), `design/generator/tpls.py` (pole `js` obsahují kategorie desky, životní situace, obce mikroregionu, zprávy), `docs/navrh-platformy/03`, `05`, `06`, `07`, prototypy `design/prototypy/App-Obcan.dc.html`, `App-Urad.dc.html`, `Editor-Zaklad.dc.html`, kolekce v `apps/web/src/collections`. Pole podle typů v briefu (česky bez diakritiky, camelCase), dny `YYYY-MM-DD`, okamžiky ISO, vše konzistentní k `DEMO_DNES` 2026-11-04.

Mimo rozsah: kód aplikací, úpravy promptů 01 až 08 (jen když najdeš rozpor s podklady, oprav ho a zapiš do `prompty/KONTROLA.md`), generování fotek (dělá zakladatel na svém Macu, viz `design/obrazky/README.md`).
</rozsah>

<pravidla>
- Nevymýšlej fakta. Údaje CodeKomu a skutečné údaje úřadu (IČO, datová schránka, účet, telefon, e-mail, PSČ, jména lidí z firmy) jsou `[DOPLNIT: …]` v textech a zástupné texty ve tvaru prototypů (`"[IČO]"`, `"[TELEFON]"`) v datech obce. Smyšlená jména ze šablon (starostka Marie Šťastná a další) jsou v pořádku.
- Texty: věcně, oslovení „vy“, krátké věty. Každá věta musí unést otázku starosty „kde to je napsané“. Heslo přesně „Tvoříme kódy pro lidi.“ jen v patičce, na O nás a v OG.
- Zakázáno: vykřičník, emoji, „→“, řetězce „A · B“, nadpisy velkými písmeny, „revoluční“, „inovativní“, „nejlepší“, „komplexní řešení“, „pokuta“, „sankce“, „penále“, „garantujeme“, „zaručujeme“, procenta úspor, počty obcí a uživatelů, jména konkurence (Munipolis, Mobilní rozhlas, Vismo, WEBHOUSE, Galileo, Antee, Obce na webu), fráze „mobilní rozhlas“, vymyšlené reference a citace.
- Česká typografie: uvozovky „…“, pomlčka v rozsazích, nezlomitelná mezera po jednopísmenných předložkách není nutná.
</pravidla>

<postup>
1. Přečti brief, prompt 06 a podklady. Sepiš seznam souborů jako úkoly.
2. Obsah obce (JSON) a jeho README. Commit „Přidej obsah ukázkové obce Javoří Lhota“.
3. Texty prezentace a registr tvrzení. Commit „Přidej texty prezentačního webu“.
4. Kontroly níže, oprava, commit, `git push`.
</postup>

<hotovo_kdyz>
- [ ] `python3 -c "import json,glob;[json.load(open(f)) for f in glob.glob('obsah/javori-lhota/*.json')]"` projde, každé `id` citované v `asistent-ukazka.json` existuje v `uredni-deska.json`.
- [ ] Všech 16 souborů v `obsah/prezentace/` existuje, frontmatter splňuje limity délky (ověř skriptem).
- [ ] `grep -rn '!' obsah/` nenajde vykřičník ve větách; grep na zakázaná slova a jména konkurence je čistý.
- [ ] Ceny v `cenik.md` odpovídají briefu a každá má štítek; každé číslo a předpis má řádek v `tvrzeni.md`.
- [ ] Změny jsou commitnuté česky v rozkazovacím způsobu a pushnuté.
</hotovo_kdyz>

<zaver>
Napiš krátce: počty souborů a položek, kolik `[DOPLNIT]` a `[OVĚŘIT]` a kde, rozpory mezi šablonami nebo podklady. Pak připomeň, že dalším krokem je `prompty/06-prezentacni-web.md`.
</zaver>
