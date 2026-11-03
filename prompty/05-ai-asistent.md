# Prompt: AI asistent a vlastní AI server

Použití: vlož celý tento prompt do Claude Code v kořeni repozitáře /home/claude/codecom. Nejdřív přečti `CLAUDE.md` a `docs/rozhodnuti.md`.
Závisí na: části Web obce a CMS (apps/web: kolekce, tenant `obec`, webhooky, proxy), na mobilní části (obrazovka asistenta v apps/mobile) a na části Digitální úřad (životní situace jako zdroj dokumentů). Bez nich pracuj proti kontraktům níže a chybějící část uveď v závěru.

<kontext>
Asistent odpovídá občanům obce na dotazy typu „Kdy jede svoz plastů na Hájku?“ jen z veřejných dokumentů té obce a vždy ukáže zdroj. Pro úředníky umí připravit návrh aktuality, shrnout dokument a převést hlášení rozhlasu na text a zpět. Existuje, protože malá obec nemá o víkendu nikoho u telefonu, a protože zakladatel rozhodl (27. 10. a 3. 11. 2026, `docs/rozhodnuti.md`), že dotazy a vektory neopustí ČR: model, vektory i dotazy běží na vlastním serveru v ČR, dokumenty obcí se tam synchronizují z apps/web.

Používají ho občané včetně seniorů (web, aplikace), redaktoři a správci obce (administrace) a zakladatel jako provozovatel serveru. Vzor chování je v prototypu `design/prototypy/S17-Magistrat.dc.html` (tři ukázkové dotazy, odpověď se zdroji, text „Asistent se může splést. U důležitých věcí zavolejte na úřad“). Právní texty jsou v `docs/pravni-dokumenty.md`, části C4 (informace pro občany) a E4 (podmínky aplikace). Stejný text musí asistent říkat i dělat. Rešerše: `research/poznamky/ai_asistent.md`, `research/zprava-podklady-pro-prompty.md` sekce 5.

Názvy a čísla modelů pocházejí z jediného agregátoru a jsou NEOVĚŘENO. Ověř je (sekce `<overit>`), nezapisuj je jako fakt.
</kontext>

<cil>
Na konci běží `apps/ai`: služba v TypeScriptu s POST /ingest a POST /dotaz, ingest pracovník (text z PDF, OCR skenů v češtině), Postgres s pgvector a hybridní vyhledávání. `apps/ai/server/` obsahuje docker compose AI serveru (vLLM, bge-m3, ai služba, Postgres, monitoring). Asistent na webu a v aplikaci ukázkové obce Javoří Lhota odpovídá krátce a česky s citací, bez zdroje odmítne a odkáže na úřad, při první interakci oznámí, že je AI, a dotaz z jedné obce nikdy nevrátí dokument jiné. K tomu patří evaluační sada nejméně 50 otázek s prahy, regresní test v CI a podklady pro výběr modelu a hardwaru. Model a hardware nevybíráš z paměti: postav měření a rozhodnutí zapiš s čísly, nebo nech [DOPLNIT], pokud nemáš GPU.
</cil>

<vychozi_stav>
- `apps/web` existuje (Next.js 16 + Payload 3). Kolekce `aktuality`, `uredni-deska`, `kategorie-desky`, `krizova-hlaseni`, `zastupitele`, `dokumenty` (upload PDF, DOCX, XLSX, JPG, PNG), `users`. Multi-tenant (pole `obec`), kolekce `obce`, a webhook/proxy mohou být ještě nedopsané. Zjisti to z kódu, nic nepřepisuj; chybějící doplň minimálně a zapiš do `docs/rozhodnuti.md`.
- `apps/ai` neexistuje. `packages/typy` může existovat, jinak ho založ jen pro zod schémata asistenta.
- Pravidla domény z `CLAUDE.md` platí: úřední deska má dny „visí od/do“ uložené jako 12:00 UTC, porovnávej je jako kalendářní dny v Europe/Prague (použij `apps/web/src/lib/datum.ts`, nekopíruj logiku). Pole „Po sejmutí nezveřejňovat“ (výchozí zapnuto) znamená, že dokument po sejmutí z asistenta zmizí.
- Demo obec Javoří Lhota (684 obyvatel, části Javoří Lhota, Podjavoří, Hájek, Na Rovném).
</vychozi_stav>

<rozsah>
Postav:
1. `apps/ai`: Hono (nebo Fastify, zvol a zapiš) + zod, TypeScript strict, ESM. Endpointy /ingest, /dotaz, /nastroje/*, /zdravi, /metrics.
2. Ingest pracovník: fronta v Postgresu (`FOR UPDATE SKIP LOCKED`, bez Redisu), extrakce, OCR, dělení, embeddingy, vyřazování prošlých dokumentů.
3. RAG: hybridní hledání, rerank, prahy, strukturovaný výstup, validace citací, obrana proti prompt injection.
4. `apps/ai/server/`: compose, Caddy, Prometheus, Grafana, skript pro stažení modelů s pevnou revizí, `.env.example`.
5. Evaluace pro Javoří Lhotu: korpus, otázky, runner, prahy, replay pro CI, porovnání dvou modelů.
6. Nástroje pro úřad (návrh aktuality, shrnutí, rozhlas ↔ text) v administraci apps/web s lidskou kontrolou.
7. V apps/web: webhooky do /ingest, proxy POST /api/asistent/dotaz s rate limitem, komponenta asistenta, tlačítka nástrojů v administraci. V apps/mobile obrazovku jen pokud app existuje, jinak `docs/ai/klient-asistent.md` (kontrakt, texty, stavy).
8. Dokumenty: `docs/ai/hardware-a-kapacita.md`, `docs/ai/model-rozhodnuti.md`, `docs/ai/klasifikace-ai-act.md`, `docs/ai/gdpr-ai.md`, záznamy v `docs/rozhodnuti.md`.

Mimo rozsah (nedělej): trénink či dolaďování na datech obcí nebo logech; hlas a řeč; asistent s nástroji či akcemi (neodesílá hlášení, nerezervuje, neprohledává web); rozhodování o nárocích; záloha na cizí API; nákup hardwaru; marketingová tvrzení o přesnosti; publikaci na úřední desku.
</rozsah>

<architektura>
Složky:
```
apps/ai/src/{server,ingest,rag,nastroje,db,llm,bezpecnost,metriky}
apps/ai/migrations/          SQL migrace (číslované, jen přidávat)
apps/ai/eval/{korpus/javori-lhota,korpus/zkusebni-ves,otazky,zaznamy,prahy.json,src}
apps/ai/server/{compose.yaml,Caddyfile,prometheus.yml,grafana/,modely.sh,.env.example}
packages/typy/src/asistent.ts   zod schémata sdílená s apps/web
```
Tok dat:
```
apps/web (hook při publikaci/změně/smazání) → POST /ingest (HMAC) → fronta → pracovník
  → text/OCR → dělení → bge-m3 → Postgres+pgvector (AI server, ČR)
občan → apps/web /api/asistent/dotaz (rate limit, bez identity) → POST /dotaz (HMAC)
  → embedding dotazu → hybridní hledání s filtrem obce → rerank → práh → vLLM → validace → odpověď
admin apps/web (server) → POST /nastroje/* (HMAC) → návrh → koncept v Payloadu → člověk schválí
```
Rozhraní (drž přesně, schémata v `packages/typy`):
```ts
// POST /ingest  → 202 { uloha: string }
type IngestPozadavek = {
  obec: string                       // slug
  akce: 'upsert' | 'smazat'
  zdroj: { kolekce: string; id: string }
  dokument?: {
    nazev: string; typ: DokumentTyp; url: string        // veřejná stránka na webu obce
    souborUrl?: string; mime?: string; text?: string   // buď soubor ke stažení, nebo hotový text
    platnostOd: string; platnostDo?: string | null     // YYYY-MM-DD, kalendářní dny v Europe/Prague
    verze: number; hash: string
  }
}
type DokumentTyp = 'vyhlaska' | 'uredni_deska' | 'aktualita' | 'zivotni_situace' | 'kontakt' | 'kalendar' | 'cenik' | 'jine'

// POST /dotaz
type Dotaz = { obec: string; otazka: string /* 3–500 znaků */; kanal: 'web' | 'aplikace' }
type Odpoved = {
  odpoved: string
  zdroje: { id: string; nazev: string; url: string; usek?: string; typ: DokumentTyp }[]
  jistota: 'vysoka' | 'stredni' | 'nizka' | 'zadna'    // 'zadna' = odmítnuto, zdroje je prázdné
}
```
Nástroje: POST /nastroje/aktualita {obec, podklad} → {nadpis, perex, text, upozorneni[]}; /nastroje/shrnuti {obec, dokumentId? | text?} → {shrnuti, body[]}; /nastroje/rozhlas {obec, smer: 'na-text' | 'na-hlaseni', text} → {text, upozorneni[]}.

Autentizace mezi apps/web a apps/ai: HMAC-SHA256 nad `časové razítko + tělo`, hlavičky `X-CodeKom-Cas`, `X-CodeKom-Podpis`, tolerance 5 minut, sdílený tajný klíč v `.env` (`AI_HMAC_KLIC`), porovnání v konstantním čase. Funkce na Vercelu nemají stálé IP, na allowlist IP se nespoléhej [OVĚŘIT].

Model přes vLLM s OpenAI API (`/v1/chat/completions`, `/v1/embeddings`). Klient v `src/llm` je tenký a za rozhraním, aby šel vyměnit engine nebo model konfigurací (`LLM_URL`, `LLM_MODEL`, `EMBED_URL`, `EMBED_MODEL`, `RERANK_URL`).

Compose (`apps/ai/server/compose.yaml`): `vllm` (GPU, model s pevnou revizí, `--gpu-memory-utilization` tak, aby zbylo místo pro embedding a reranker), `embed` (bge-m3 přes druhou instanci vLLM nebo text-embeddings-inference, ověř), `rerank` (volitelně), `ai`, `ai-pracovnik` (stejný image plus `poppler-utils`, `ocrmypdf`, `tesseract-ocr`, `tesseract-ocr-ces`), `db` (`pgvector/pgvector` s PG17, ověř tag), `caddy` (TLS, jen /ingest, /dotaz, /nastroje, /zdravi, access log bez IP klienta), `prometheus`, `grafana`, `dcgm-exporter`, `postgres-exporter`, `node-exporter`. Vnitřní síť bez výstupu do internetu pro `vllm`, `embed`, `rerank`, `db`. Verze obrazů přišpendli, žádné `latest`.
</architektura>

<datovy_model>
Schéma `ai` v Postgresu na AI serveru, migrace jako SQL soubory, `CREATE EXTENSION vector`, `unaccent`, `pg_trgm`. Role `ai_migrator` vlastní tabulky, role `ai_app` je používá a podléhá RLS.

| Tabulka | Pole (typ, povinnost) | Indexy a pravidla |
|---|---|---|
| `obce` | slug pk, nazev, kontakt_telefon, kontakt_email, kontakt_text (úřední hodiny), povolene_domeny text[] (pro odkazy a stahování souborů), aktivni bool | synchronizuje se z `/ingest` typu `kontakt`; bez kontaktu asistent neodmítá s telefonem, ale s textem „Zeptejte se na úřadě“ a v logu chyba konfigurace |
| `dokumenty` | id uuid pk, obec fk, zdroj_kolekce, zdroj_id, typ, nazev, url, verze int, hash, platnost_od date, platnost_do date null, stav (`ceka`, `zpracovava`, `aktivni`, `chyba`, `vyrazeno`), kvalita_ocr real null, chyba text null, aktualizovano timestamptz | unique (obec, zdroj_kolekce, zdroj_id); idempotence podle `hash` a `verze` |
| `useky` | id uuid pk, dokument_id fk on delete cascade, obec (denormalizováno), poradi int, cesta text (např. „Vyhláška 1/2026 > Čl. 5 Sazba poplatku“), text, strana int null, tokenu int, embedding vector(1024), tsv tsvector | b-tree (obec, dokument_id); GIN na `tsv`; trigramy volitelně |
| `ulohy` | id, typ, payload jsonb, stav, pokusy, dalsi_pokus, chyba, vytvoreno | opakování s odstupňovanou prodlevou, nejvýš [5] pokusů |
| `dotazy_log` | id, ts, obec, kanal, otazka (po odstranění osobních údajů), odpoved, jistota, zdroje_ids uuid[], duvod_odmitnuti null, latence_ms, latence_faze jsonb, model, verze_promptu, hodnoceni smallint null | žádné IP, žádné hlavičky, žádný identifikátor; mazání po [30] dnech (`LOG_RETENCE_DNI`) |

RLS: `useky` a `dokumenty` mají vynucené (`FORCE`) RLS s politikou `obec = current_setting('app.obec', true)`; každý dotaz běží v transakci s `SET LOCAL app.obec = $1` a funkce hledání bez parametru `obec` neexistuje. Je to druhá pojistka vedle `WHERE obec = $1`.

Vyhledávání: obec má řádově stovky úseků, proto začni přesným hledáním uvnitř filtru obce (HNSW s filtrem může výsledky ořezat). HNSW přidej, až to měření ukáže; pak ověř iterativní skeny pgvector (`hnsw.iterative_scan`) nebo dělení tabulky podle obce [OVĚŘIT]. Fulltext: `simple` + `unaccent`, zvaž slovník cs_CZ (hunspell) nebo trigramy podle měření [OVĚŘIT].
</datovy_model>

<funkce>
1. Ingest
   1. Webhook z apps/web po publikaci, změně a smazání (`afterChange`, `afterDelete`) pro `uredni-deska` (s přílohami), `aktuality`, `obce` (kontakty, úřední hodiny, části obce), `zastupitele` (jen funkce a služební kontakt), životní situace a svozový kalendář, existují-li. Jen zveřejněný stav, nikdy koncept. Odeslání musí přežít výpadek AI serveru (outbox nebo fronta Payloadu, ověř) s opakováním. Skript `pnpm --filter web ai:znovu` pošle vše znovu, aby šel index postavit od nuly.
   2. /ingest ověří podpis a zod schéma, uloží úlohu, vrátí 202. Pracovník stáhne `souborUrl` jen z domén v `povolene_domeny` (SSRF, limit 25 MB a 300 stran, časový limit, bez přesměrování mimo doménu).
   3. Extrakce: PDF s textovou vrstvou přes `pdftotext -layout`. Pokud je znaků na stránku méně než práh [DOPLNIT: změřit na vzorcích], jde o sken a spustí se `ocrmypdf -l ces --skip-text --deskew` a pak znovu extrakce. DOCX přes mammoth, XLSX po řádcích se záhlavím, JPG a PNG přes `tesseract -l ces`. Rich text aktualit se převede na prostý text. Ověř `ces` v `tesseract --list-langs` a kvalitu na 5 vzorcích (čistý a šikmý sken, razítko, tabulka, foto z telefonu); výsledek do `docs/ai/model-rozhodnuti.md`. Průměrná jistota OCR do `kvalita_ocr`; pod prahem stav `chyba` s textem „Dokument se špatně přečetl“ a asistent z něj neodpovídá.
   4. Konvertory běží v samostatném procesu, neprivilegovaně, bez sítě, s limity času a paměti.
   5. Dělení podle struktury českých právních textů: Část, Hlava, Čl. / Článek / §, odstavce `(1)`, písmena `a)`. Jednotka je článek, delší než [700] tokenů se dělí po odstavcích. Úsek nese cestu („Vyhláška > Čl. 5 > odst. 2“), která je součástí textu pro embedding. Tabulky (ceník, sazby, svozy) se převedou na věty po řádcích („Pronájem sálu, 1 hodina: 300 Kč“). Nestrukturovaný text po odstavcích s překryvem [15] %. Velikost měř tokenizérem modelu.
   6. Prošlé dokumenty: platí `platnost_od <= dnes` a (`platnost_do` je null nebo `platnost_do >= dnes`), „dnes“ v Europe/Prague. Noční úloha převede prošlé úřední desky na `vyrazeno` a smaže jejich úseky; s „Po sejmutí nezveřejňovat“ hned po sejmutí. `uredni_deska` bez dat platnosti se neindexuje (chyba do logu).
2. Odpověď na dotaz občana
   1. Vstup: trim, 3–500 znaků, vstup bez písmen se odmítne.
   2. Hledání: embedding dotazu, z obce [30] úseků vektorově a [30] fulltextově, spojení RRF, reranker zúží na [6] (volitelný; bez něj rozhoduje RRF a práh podobnosti). Prahy ladíš na evaluační sadě, ne odhadem.
   3. Pod prahem (nic relevantního) odpověz bez volání modelu: `jistota: 'zadna'`, text „Tuto informaci nemám v dokumentech obce. Zeptejte se na úřadě: {telefon}, {úřední hodiny}.“ Šetří to GPU a odstraňuje halucinace.
   4. Model dostane pevný systémový pokyn a kontext. Výstup je strukturovaný JSON `{ odpoved: string, pouzita_id: string[], nelze_odpovedet: boolean }`. Přes vLLM použij omezení podle schématu; **aktuální parametr ověř** (starší `guided_json`, novější `response_format` s `json_schema` nebo `structured_outputs`), podle nainstalované verze a dokumentace.
   5. Validace: každé id v `pouzita_id` musí být v poskytnutém kontextu; odpověď bez citace je odmítnutí; `nelze_odpovedet` je odmítnutí; čísla a data v odpovědi musí být přítomná v citovaných úsecích (jinak odmítnutí nebo `jistota: 'nizka'` podle konfigurace); odkazy jen z `povolene_domeny` obce, ostatní se odstraní; filtr osobních údajů v odpovědi (rodné číslo, telefon a e-mail, které nejsou v kontaktech obce).
   6. Styl pro seniory: 1–4 věty, nejvýš [80] slov, přímá odpověď v první větě, bez zkratek a odborných slov, data slovy („ve středu 4. listopadu“), bez markdownu, odkazy jen ve `zdroje`. Při odmítnutí vždy kontakt na úřad.
   7. `jistota`: `vysoka` (citace z aktuálního úseku, práh splněn s rezervou), `stredni`, `nizka` (klient přidá „Ověřte na úřadě“), `zadna`.
   8. Zdroje: bez duplicit, nejvýš [3], `url` je stránka na webu obce (u PDF s #page=N).
   9. Odpovídá se jen česky. Dotaz v jiném jazyce dostane krátké české odmítnutí s kontaktem (rozšíření je mimo rozsah).
3. Nástroje pro úřad
   1. V administraci apps/web u aktuality tlačítko „Navrhnout s AI z podkladu“ (vložený text nebo vybraný dokument), u dokumentu „Shrnout s AI“, u textu rozhlasu „Převést na text“ a „Převést na hlášení“. Výsledek je koncept (`navrzenoAI: true`), nikdy se nepublikuje sám; publikuje ho redaktor nebo správce po úpravě a do auditní stopy se uloží, kdo schválil.
   2. Server kontroluje fakta: čísla, data a jména musí být v podkladu; co tam není, jde do `upozorneni[]` a zvýrazní se. Návrh nesmí přidat termín, částku ani telefon.
   3. Rozhlas: hlášení je mluvené (krátké věty, data slovy, klíčový údaj zopakovaný na konci), web je psaný. Oba převody drž věcně stejné.
   4. Nástroje mají vlastní limit souběhu, aby neblokovaly dotazy občanů.
4. Klient asistenta (web, případně aplikace)
   1. Komponenta „Zeptejte se obce“ podle S17: vstup, tlačítko „Zeptat se“, tři navržené dotazy (konfigurovatelné obcí), odpověď se seznamem zdrojů, trvale viditelný odznak „AI asistent“ a pod ním telefon a úřední hodiny obce.
   2. Při otevření se v toku konverzace (ne jen v záhlaví) zobrazí: „Jsem AI asistent, ne člověk. Odpovídám jen z dokumentů obce {název} a můžu se splést. Důležité věci ověřte na úřadě: {telefon}.“
   3. Stavy: prázdný (navržené dotazy), načítání („Hledám v dokumentech obce“, po [8] s „Trvá to déle než obvykle“), odpověď, odmítnutí, špatná délka dotazu, 429 („Zkuste to za chvíli, nebo zavolejte na úřad“), 503 a časový limit 30 s („Asistent teď neodpovídá. Zavolejte na úřad: {telefon}“), modul `ai` vypnutý (nevykreslí se). Pod odpovědí „Pomohla odpověď: ano / ne“ bez identity.
   4. Aplikace: stejný kontrakt a texty. První použití zobrazí jednorázové upozornění, že dotaz se odešle na server CodeKom v ČR. Apple 5.1.2(i) vyžaduje souhlas při sdílení dat s externí AI; ověř znění a zda se na tento případ vztahuje [OVĚŘIT].
5. Proxy v apps/web `POST /api/asistent/dotaz`: validace, rate limit (výchozí [20] dotazů na klienta za 10 minut a [DOPLNIT] na obec za hodinu), klíč limitu je hash IP s denně měněnou solí držený jen v paměti nebo v úložišti s TTL, IP se neloguje a nepředává dál. Do apps/ai posílá jen `obec`, `otazka`, `kanal`. Obec ověří proti kolekci `obce` (aktivní, modul `ai`).
</funkce>

<pravidla>
- Čl. 50 odst. 1 nařízení (EU) 2024/1689 platí od 2. 8. 2026: osoba musí vědět, že komunikuje s AI. Pokyny Komise z 20. 7. 2026 (nezávazné, zdroj v rešerši je sekundární): oznámení v prostém jazyce na začátku relace, trvalý odznak nebo mluvené prohlášení; vágní „asistent“ ani skrytí v podmínkách nestačí; zvláštní péče u seniorů. Pokuty až 15 mil. EUR nebo 3 % obratu. Implementace: funkce 4.1–4.2.
- Role (k ověření právníkem): CodeKom je poskytovatel systému, obec zavádějící subjekt. Zapiš do `docs/ai/klasifikace-ai-act.md`; návrh změny smlouvy (`docs/pravni-dokumenty.md`, část A) jen jako poznámku, dokumenty nepřepisuj.
- Vysoké riziko: posuď přílohu III (přístup k základním veřejným službám a dávkám) a čl. 6 odst. 3. Zdůvodnění do `docs/ai/klasifikace-ai-act.md`: asistent jen informuje z veřejných dokumentů, nehodnotí žádosti, neprofiluje, o nárocích nerozhoduje. Zapiš, co by klasifikaci změnilo (posuzování, předvyplnění či zamítání žádostí) a že taková funkce do asistenta nepatří. Závěr „k potvrzení právníkem“.
- Nástroje pro úřad: text zveřejněný k informování veřejnosti smí být podle čl. 50 odst. 4 vyňat z označení při lidské redakční kontrole a odpovědnosti. Dej příznak `navrzenoAI` a strojově čitelné označení do metadat konceptu; rozsah čl. 50 odst. 2 a přechod do 2. 12. 2026 ověř [OVĚŘIT].
- GDPR: správce je obec, zpracovatel CodeKom (čl. 28), dotazy v ČR. Log: text dotazu bez jména, účtu a IP, uložení [30] dní (`pravni-dokumenty.md` C2 a C4, potvrdit), před uložením odstranění rodných čísel, telefonů, e-mailů, čísel účtů a dat narození (regulární výrazy + test). Žádný trénink ani dolaďování na datech obcí a logech; evaluační sada je syntetická. Do `docs/ai/gdpr-ai.md` zapiš záznam o zpracování, posouzení nutnosti DPIA („k potvrzení pověřencem“) a dopad na přílohu B1.
- Dokumenty úřední desky mohou obsahovat osobní údaje. Asistent uvádí jen funkce a služební kontakty, ne údaje soukromých osob (pokyn v promptu, kontrola v testu).
- Asistent nedává právní rady a nic neslibuje; odpověď o právech a povinnostech je s citací a dovětkem, že rozhoduje úřad.
- Úřad je fallback (`CLAUDE.md`, pravidlo 6): každé odmítnutí, chyba i výpadek ukáže telefon a úřední hodiny.
- Krizová hlášení asistent nenahrazuje. Dotaz na akutní nebezpečí (hoří, záplava, zdravotní stav) dostane pevnou odpověď bez modelu: volejte 112, plus odkaz na aktivní krizové hlášení (`GET /api/krize/aktivni`).
- Obec smí asistenta kdykoli vypnout modulem `ai`.
</pravidla>

<design_a_pristupnost>
- Řiď se `CLAUDE.md` (unslop): písmo 17 px, řezy nejvýš 600, jedna akcentová barva, bez gradientů, záře a emoji, věty bez vykřičníků. Barvy a mezery z `packages/tokeny` a z proměnných šablony obce, ne vlastní.
- Cíle dotyku nejméně 44 × 44 px, kontrast 4,5 : 1, viditelný fokus, ovládání klávesnicí (Enter odešle).
- Pole má viditelný `<label>`, ne jen placeholder. Odpověď je v oblasti `role="status"` s `aria-live="polite"`, po doručení se fokus přesune na nadpis odpovědi. Načítání se oznámí textem, ne jen animací; respektuj `prefers-reduced-motion`.
- Odznak „AI asistent“ je text, ne jen ikona. Zdroje jsou seznam odkazů s popisným textem („Svozový kalendář 2026, část Hájek“, ne „zde“).
- Odpověď má `lang="cs"`, řádky do 70 znaků, žádný markdown ani text v obrázku.
- Bez vodorovného posuvníku na 375 a 1280 px.
</design_a_pristupnost>

<bezpecnost_a_soukromi>
- Prompt injection: dokumenty i dotaz jsou nedůvěryhodná data. Systémový pokyn je verzovaný soubor (`verze_promptu` v logu), dokumenty jdou v blocích `<dokument id="…">` s neutralizovanými značkami bloku, model nemá nástroje ani síť. Pokyny uvnitř dokumentů nesmí změnit chování, systémový pokyn se nevyzrazuje. Výstup projde validací z funkce 2.5.
- Filtr obce je vždy na serveru z ověřeného parametru, nikdy z textu otázky. Dotaz „co platí v sousední obci“ dostane odmítnutí. RLS + `WHERE` + test izolace.
- Vstupy: limit těla, zod, limit souběhu, časové limity, rate limit i na AI serveru (po obci). Při přetížení 429/503, nikdy neomezená fronta.
- Soubory: SSRF omezení, konvertory izolované, archivy se nerozbalují.
- Modely jen s pevnou revizí a kontrolou hashe, `trust_remote_code` vypnuto, vLLM jen z vnitřní sítě.
- Tajné klíče jen v `.env`. Text dotazů je jen v `dotazy_log`, metriky mají štítek obce, ne obsah.
- Před závěrem projdi skill `securitymaxxing:llm` a výsledek zapiš do závěru.
</bezpecnost_a_soukromi>

<testy>
Nástroje: Vitest, PGlite s pgvector (ověř, jinak Postgres v kontejneru), falešný OpenAI server (`msw` nebo malý Hono server) pro `/v1/chat/completions` a `/v1/embeddings`, deterministické falešné embeddingy (hash slov) na logiku, ne kvalitu.

Jednotkové:
- Dělení: vyhláška s částmi, články a odstavci, tabulka ceníku, text bez struktury, příliš dlouhý článek, prázdný dokument; cesta v úseku je správná, žádný úsek nepřesáhne limit.
- Platnost: hranice dne (12:00 UTC uložené, Europe/Prague v zimě i v létě, přechod na letní čas), `platnost_do` včetně posledního dne, dokument bez konce, dokument v budoucnu.
- Prompt: dokument s „ignoruj pokyny“ a značkou `</dokument>` zůstane v datovém bloku, systémový pokyn se nemění.
- Validace výstupu: neexistující id, bez citace, číslo mimo zdroj, cizí URL, osobní údaj, příliš dlouhá odpověď.
- Odstranění osobních údajů z logu; HMAC (platný, prošlý, upravené tělo).

Integrační (malý model nebo mock, `pnpm --filter ai test:integrace`):
- Ingest → hledání → odpověď s citací; odmítnutí bez zdroje bez volání modelu; zrušení dokumentu po sejmutí; prošlý dokument se nevrací.
- **Izolace obcí**: dvě obce s totožnými dokumenty a rozdílnými hodnotami (Javoří Lhota a Zkušební Ves). Pro každou otázku z evaluační sady dotaz z jedné obce nikdy nevrátí úsek, zdroj ani text z druhé. Test navíc zkouší `obec` v textu otázky a pokus o SQL injekci v parametru. Samostatný test ověří, že bez `SET LOCAL app.obec` vrací dotaz pod rolí `ai_app` nula řádků.
- Rate limit a časový limit v proxy, nedostupný AI server.

Evaluace (`apps/ai/eval`):
- Korpus Javoří Lhota (smyšlený, označ to): vyhláška o poplatku za odpad, svozový kalendář 2026 pro čtyři části, poplatek ze psů, ceník sálu, postup ohlášení trvalého pobytu, veřejná vyhláška o uzavírce mostu (do konce listopadu), jedna prošlá vyhláška, úřední hodiny a kontakty, zápis ze zastupitelstva, jeden sken. Zkušební Ves má záměrně jiná čísla.
- `otazky/javori-lhota.yaml`, nejméně 50 otázek, každá s kategorií, očekávanými klíčovými fakty, povolenými zdroji a příznakem `odmitnout`. Složení: 20 faktických (4 přes tabulku, 4 s částí obce), 5 na platnost a prošlé dokumenty, 4 přes více dokumentů, 6 mimo rozsah (počasí, politika, daně), 6 injekcí (v otázce i v dokumentu), 3 na osobní údaje, 2 na jinou obec, 2 na právní radu, 2 hovorové s chybami („kdy vyvazej popelnice“).
- Metriky: správnost (klíčová fakta v odpovědi), přesnost a úplnost citací, správnost odmítnutí (obě strany), odolnost proti injekcím (nevyzradí pokyn, nezmění roli, nevloží cizí URL), věrnost (čísla a data jsou ve zdroji), recall@k vyhledávání, latence p50 a p95. Prahy v `eval/prahy.json`, výchozí návrh: správnost ≥ [0,85], přesnost citací ≥ [0,95], správné odmítnutí ≥ [0,95], injekce 100 %. Hodnoty potvrdí zakladatel [DOPLNIT].
- Runner: `pnpm --filter ai eval --endpoint <url> --model <název>` zapíše JSON a Markdown přehled; `pnpm --filter ai eval:replay` skóruje uložené odpovědi z `eval/zaznamy/` bez modelu a běží v CI jako brána (selže při poklesu pod prahy). Záznamy se obnovují ručně na AI serveru, kde běží i plná evaluace s reálným modelem.
- Porovnání modelů: `pnpm --filter ai eval:porovnej` spustí totéž pro Gemma 4 31B a Qwen3.8-27B a vypíše tabulku včetně latence a počtu odmítnutí.

E2E (Playwright, `pnpm e2e`): na 375 a 1280 px se oznámení o AI zobrazí před první odpovědí, odznak zůstane, odpověď má zdroje jako odkazy, stav 503 ukáže telefon. `pnpm a11y`: axe-core bez chyb.
</testy>

<postup>
Na začátku přečti odkazy z `<kontext>`, prohlédni apps/web a sepiš plán do seznamu úkolů a `docs/ai/postup.md`; průběžně odškrtávej. Každý milník končí kontrolami (`pnpm typecheck`, `lint`, `test`, u webu i `e2e` a `a11y`) a commitem česky v rozkazovacím způsobu. S červeným buildem se nepohybuj dál. Po dvou neúspěšných opravách téhož zastav, popiš příčinu a zvol jiný postup.

M0 Ověření: projdi `<overit>`, výsledky (zdroj, datum, závěr) do `docs/ai/overeni.md`, neověřené nech `[OVĚŘIT]`. Založ `apps/ai` (Hono/Fastify, zod, strict) a `packages/typy/src/asistent.ts`.
M1 Databáze: migrace schématu `ai`, role, RLS, test izolace na úrovni databáze.
M2 Ingest: HMAC, fronta, extrakce, OCR, dělení, embeddingy (přes OpenAI API), vyřazování prošlých. Testy dělení a platnosti.
M3 Dotaz: hybridní hledání, RRF, rerank, prahy, prompt, strukturovaný výstup, validace, odmítnutí, log bez identity. Testy s mockem.
M4 Evaluace: korpus, 50+ otázek, runner, metriky, replay v CI, `eval:porovnej`. Záznamy z mocku slouží jen k ověření skórování, označ je jako nereálné.
M5 Server: compose, Caddy, Prometheus, Grafana, skript modelů, `.env.example`. Bez GPU ověř jen `docker compose config`, spuštění nech zakladateli a zapiš, co jsi neměřil.
M6 apps/web: webhooky s outboxem, `ai:znovu`, proxy s rate limitem, komponenta asistenta, stavy, oznámení o AI, e2e a a11y testy.
M7 Nástroje pro úřad: endpointy, kontrola faktů, tlačítka v administraci, koncepty, auditní stopa.
M8 Mobil a dokumentace: obrazovka, nebo `docs/ai/klient-asistent.md`; `hardware-a-kapacita.md`, `model-rozhodnuti.md`, `klasifikace-ai-act.md`, `gdpr-ai.md`, záznamy v `docs/rozhodnuti.md`.
M9 Závěr: celý řetězec na demo obci, bezpečnostní kontrola, úklid.

Dokumenty M8:
- Hardware a kapacita: výchozí návrh 1× RTX PRO 6000 Blackwell (96 GB). Spočítej paměť: váhy (27–31 B parametrů ve FP8 zhruba 27–31 GB, ověř z karty), embedding a reranker, zbytek pro KV cache; KV na token z `config.json` modelu (vrstvy, KV hlavy, rozměr hlavy), kontext na dotaz z reálného promptu. Z toho souběh při p95 cíli. Poptávka: tabulka 50 / 200 / 500 obcí × obyvatel × podíl tázajících se měsíčně × dotazů na osobu, špička [10] % denního objemu v hodině; předpoklady [DOPLNIT], výpočet přepisovatelný parametry. Doplň alternativy (menší karta a model, dvě karty) a postup zátěžového testu. Koupit vs. pronajmout v ČR: tabulka nákup (cena karty a serveru, spotřeba, kolokace, odpisy) proti pronájmu serveru s GPU u českého poskytovatele; všechny české ceny a poskytovatele nech jako [DOPLNIT: nabídky]. Známé: RTX PRO 6000 v USA zhruba 8 900–11 500 USD (nedatovaný článek); NovoServe, IONOS a INTROSERV nabízejí servery s kartou, ale ne v ČR a ceny nejsou ověřené. Výpadek: klient ukáže kontakt na úřad; zapiš slíbitelnou dostupnost; cizí API fallback není povolen.
- Výběr modelu: kandidáti Gemma 4 31B a Qwen3.8-27B (licence Apache-2.0 podle agregátoru, ověřit v kartě a souboru LICENSE). Rozhoduje evaluace z M4 (stejný korpus a prompty, teplota 0 až 0,2): věrnost kontextu, správné odmítnutí, injekce, latence a paměť, ne obecné skóre. Pokud kandidát neexistuje nebo má jinou licenci, vyber nejbližší otevřený model s Apache-2.0 nebo MIT a zapiš proč. Pro vývoj a CI menší model ze stejné rodiny (název ověř) nebo zaznamenané odpovědi.
- Do `docs/rozhodnuti.md` zapiš: Hono/Fastify, přesné hledání před HNSW, bez streamování (odpověď se validuje celá), jen česky, retence logů [30] dní.
</postup>

<hotovo_kdyz>
Projít musí `pnpm typecheck`, `lint`, `test`, `pnpm --filter ai test:integrace`, `pnpm --filter ai eval:replay` (nad prahy), `pnpm e2e`, `pnpm a11y` a `docker compose -f apps/ai/server/compose.yaml config`.

Chování k ukázání na demo obci (uveď, zda mock, nebo reálný model):
- [ ] Web i aplikace Javoří Lhoty (aplikace, pokud existuje) odpoví na „Kdy jede svoz plastů na Hájku?“ krátce, s citací svozového kalendáře a odkazem.
- [ ] Dotaz bez zdroje („Jaké bude zítra počasí?“) vrátí „Tuto informaci nemám v dokumentech obce“ s telefonem a bez volání modelu.
- [ ] Při první interakci se zobrazí „Jsem AI asistent, ne člověk“ v toku konverzace a odznak zůstane; na 375 px i 1280 px, s čtečkou ohlášeno.
- [ ] Prošlý dokument a dokument po sejmutí s „Po sejmutí nezveřejňovat“ se v odpovědích neobjeví.
- [ ] Test izolace obcí prošel pro všechny otázky obou obcí a pro databázovou roli bez nastavené obce.
- [ ] Prompt injection v dokumentu i v otázce nezmění chování (6 případů v sadě).
- [ ] Log neobsahuje IP, hlavičky ani osobní údaje a mazání po [30] dnech je pokryto testem.
- [ ] Evaluační sada má nejméně 50 otázek, metriky jsou nad prahy v `eval/prahy.json`; p95 latence je pod [DOPLNIT: cíl v sekundách, ověřit měřením na reálném HW] s, nebo je v závěru uvedeno, že nebylo možné změřit.
- [ ] Návrh aktuality z podkladu se uloží jen jako koncept, nepublikuje se sám, nové číslo v návrhu se zvýrazní.
- [ ] `docs/ai/` obsahuje klasifikaci AI Act (k potvrzení právníkem), GDPR záznam, hardware a model-rozhodnutí s čísly nebo [DOPLNIT].
- [ ] V kódu není žádný trénink ani export logů.
</hotovo_kdyz>

<overit>
Ověřuj z primárních zdrojů, výsledek a datum zapiš do `docs/ai/overeni.md`. Co nejde ověřit, nech v kódu a dokumentech jako `[OVĚŘIT]`.

| Položka | Jak |
|---|---|
| Existence, licence a velikost Gemma 4 31B a Qwen3.8-27B (BenchLM je agregátor po datu znalostí) | karty na huggingface.co/google/gemma-4-31b-it a model Qwen, soubor LICENSE, případné doplňující podmínky použití |
| Pořadí v češtině (BenCzechMark, MiniCzechBenchmark), české modely 2026 | huggingface.co/spaces/CZLC/BenCzechMark, arXiv 2412.17933; výsledek není náhradou vlastní evaluace |
| Strukturovaný výstup ve vLLM (`guided_json` vs. `structured_outputs` vs. `response_format`) | docs.vllm.ai, `pip show vllm`, zkušební volání s malým modelem |
| Režim embeddingů a rerankeru ve vLLM nebo text-embeddings-inference | dokumentace nástrojů, zkouška s bge-m3 |
| Embeddingy a rerankery pro češtinu (bge-m3, bge-reranker-v2-m3, multilingual-e5, jina, Qwen3-Embedding), licence | karty na HF, vlastní recall@k |
| Propustnost vLLM / SGLang / llama.cpp | zátěžový test na cílovém HW |
| pgvector: verze, iterativní skeny, HNSW s filtrem; PGlite s pgvector | `SELECT extversion`, dokumentace, zkouška |
| Čeština v OCR (`ces`, kvalita tessdata, ocrmypdf), případně Docling | `tesseract --list-langs`, vzorky |
| České ceny GPU a serverů, kolokace a GPU hosting v ČR, spotřeba | nabídky; vše [DOPLNIT] |
| Čl. 50 AI Actu v EUR-Lex (2024/1689), příloha III bod 5, čl. 6 odst. 3, pokyny Komise z 20. 7. 2026, Digital Omnibus | eur-lex.europa.eu, stránky Komise |
| Role poskytovatel / zavádějící subjekt, klasifikace mimo vysoké riziko | právník; v dokumentech „k potvrzení“ |
| Pokyny ÚOOÚ k chatbotům ve veřejné správě | uoou.gov.cz (rešerše nic nenašla) |
| Apple 5.1.2(i) pro dotaz odesílaný na vlastní server | App Review Guidelines |
| Fronta úloh a hooky v nainstalované verzi Payloadu | dokumentace Payload 3 |
</overit>

<zaver>
Na konci napiš krátké shrnutí v češtině:
- Hotovo a čím ověřeno: výsledky příkazů z `<hotovo_kdyz>`, počty testů, evaluace nad/pod prahy a zda šlo o mock, malý, nebo reálný model.
- Co jsi nemohl změřit (GPU, reálný model, zátěž) a co musí udělat zakladatel.
- Zapsaná rozhodnutí, místa `[DOPLNIT]` a `[OVĚŘIT]` s cestou k souboru, právní závěry „k potvrzení“.
- Co jsi minimálně doplnil v apps/web nebo apps/mobile.
</zaver>
