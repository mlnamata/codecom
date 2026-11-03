# CodeKom: stack (část A) a promptování Claude Code (část B) – stav k 3. 11. 2026

Pozn.: Verze a data vydání jsou z npm registry (registry.npmjs.org, dotaz 3. 11. 2026, pole `time` a dist-tag `latest`). Datum u "latest" je datum posledního patche, ne prvního vydání dané řady. Texty dokumentací jsou z nextjs.org, payloadcms.com, supabase.com, vercel.com, expo.dev a code.claude.com.

## A1. Aktuální verze a kompatibilita Payload 3 + Next 16

### Takeaway
Next.js 16.4.5 (3. 11. 2026), Payload 3.92.1 (27. 10. 2026) a React 19.3.1 jsou stabilní "latest". Payload 3.92.1 deklaruje peer dependency na Next `>=16.3.3 <17`, takže kombinace Next 16.4 + Payload 3.9x je oficiálně podporovaná. Payload 4 je zatím jen canary.

### Cited Findings
- next: latest 16.4.5 (2026-11-03), canary 16.5.0-canary.38; 16.0.0 vyšlo 2025-10-22, 16.4.0 vyšlo 2026-10-06 — [npm next](https://registry.npmjs.org/next)
- payload (i všechny @payloadcms/*, tedy db-postgres, storage-s3, plugin-multi-tenant): latest 3.92.1 (2026-10-27); canary 4.0.0-canary.39 (2026-10-08) — [npm payload](https://registry.npmjs.org/payload), [plugin-multi-tenant](https://registry.npmjs.org/@payloadcms/plugin-multi-tenant)
- @payloadcms/next 3.92.1 má peer `next: >=15.2.9 <15.3.0 || >=15.3.9 <15.4.0 || >=15.4.11 <15.5.0 || >=16.3.3 <17.0.0` a peer `payload: 3.92.1` (přesná shoda verze). Z toho plyne, že starší Next 16.0–16.3.2 už peer range nesplňují — [npm @payloadcms/next](https://registry.npmjs.org/@payloadcms/next/3.92.1)
- react: latest 19.3.1 (2026-10-14); 19.2.0 vyšlo 2025-10-01 — [npm react](https://registry.npmjs.org/react)
- tailwindcss: latest 4.3.4 (2026-11-02); 4.0.0 vyšlo 2025-01-21 — [npm tailwindcss](https://registry.npmjs.org/tailwindcss)
- shadcn CLI (balík `shadcn`): latest 4.23.0 (2026-10-27) — [npm shadcn](https://registry.npmjs.org/shadcn)
- @supabase/supabase-js: latest 2.118.0 (2026-10-15); 3.0.0-next.29 (2026-05-11) je pre-release — [npm supabase-js](https://registry.npmjs.org/@supabase/supabase-js)
- expo: dist-tag latest 58.0.23 (2026-11-03); expo@58.0.0 vyšlo 2026-09-29, 57.0.0 2026-06-30, 56.0.0 2026-05-20 — [npm expo](https://registry.npmjs.org/expo)
- Expo SDK 56 (21. 5. 2026): RN 0.85, React 19.2, Hermes v1 výchozí, Expo Router už nezávisí na React Navigation, `expo/fetch` je výchozí `fetch`, min. Xcode 26.4 / iOS 16.4, TypeScript 6.0.3; známá regrese paměti Hermes v1 s reanimated (řeší SDK 57) — [Expo changelog SDK 56](https://expo.dev/changelog/sdk-56.md)
- Nástroje: turbo 2.11.10 (2026-10-20), vitest 5.1.0 (2026-11-02), @playwright/test 1.64.1 (2026-10-14), @axe-core/playwright 4.14.0 (2026-10-15) — npm registry (stejný vzor URL: `https://registry.npmjs.org/<balík>`)

### Inferences
- Projekt s Next 16.4 + Payload 3.91 je těsně pod aktuálním stavem. Doporučit v promptu pin přesné shodné verze všech `payload` a `@payloadcms/*` (peer vyžaduje přesnou shodu) a upgrade na 3.92.1 jako první krok.
- Pro mobilní aplikaci cílit na Expo SDK 58 (nejnovější stabilní řada; SDK 59 zatím nenalezeno). Detaily SDK 58 (RN verze, breaking changes) nebyly ověřeny.
- Release "latest" patche se mění denně (Next 16.4.5 je ze dne dotazu). Prompt má říkat "ověř `npm view <pkg> version` a pinni", ne hardcodovat verzi.

### Gaps
- Nepodařilo se získat GitHub release notes Payloadu (gh API pro repo payloadcms/payload bylo v sandboxu zablokováno) ani seznam otevřených issues Payload + Next 16 (cache, Turbopack). Známé problémy tedy NEJSOU ověřené; je nutné je v promptu nechat ověřit agentem (`gh issue list` / changelog).
- Přesná data vydání shadcn/ui komponent, Tailwindu 4.3.0 a Expo SDK 58 changelog nebyla načtena.
- Nepotvrzeno, zda Payload 3.9x oficiálně podporuje `cacheComponents: true` (viz A3).

## A2. Multi-tenance: plugin-multi-tenant vs. deployment na obec; vlastní domény

### Takeaway
`@payloadcms/plugin-multi-tenant` přidává pole `tenant` do vybraných kolekcí, tenant selector v adminu, filtrování a vynucení zápisu podle členství uživatele. Domény mapování řeší aplikace sama (rewrites podle Host hlavičky). Vercel pro vlastní domény na tenanta nabízí API, automatický SSL a "multi-tenant" model jednoho deploymentu.

### Cited Findings
- Plugin: tenant field na kolekcích, Tenants kolekci definuje uživatel; volby `collections` (`isGlobal`, `useTenantAccess`, `customTenantField`, `accessResultOverride`…), `tenantsSlug`, `tenantsArrayField`, `userHasAccessToAllTenants` (super-admin), `cleanupAfterTenantDelete` (výchozí true) — [Payload docs](https://payloadcms.com/docs/plugins/multi-tenant)
- Zápis s tenantem, kde uživatel není členem, je odmítnut validační chybou, i u draftů a autosave; kontrola se přeskočí u Local API bez `user`, u `userHasAccessToAllTenants` nebo u jiné auth kolekce — [Payload docs](https://payloadcms.com/docs/plugins/multi-tenant)
- Pozor: smazání tenanta ve výchozím stavu smaže všechny jeho dokumenty a odebere ho uživatelům; Tenants kolekci chránit přísným access, nebo nastavit `cleanupAfterTenantDelete: false` — [Payload docs](https://payloadcms.com/docs/plugins/multi-tenant)
- Veřejné create (např. formuláře občanů) nemají tenanta, tenant se musí nastavit server-side přes Local API — [Payload docs](https://payloadcms.com/docs/plugins/multi-tenant)
- Dotaz na frontendu: `where: { 'tenant.slug': { equals: 'x' } }` s `overrideAccess: false`; pro domény doc doporučuje Next rewrites mapující Host na `/[tenantDomain]/[slug]` (mimo `admin` a `api`) — [Payload docs](https://payloadcms.com/docs/plugins/multi-tenant)
- Doc stránka neuvádí požadavky na verze ani kompatibilitu pluginu s Payload verzemi; plugin má stejné verzování jako payload (3.92.1) — [Payload docs](https://payloadcms.com/docs/plugins/multi-tenant), [npm](https://registry.npmjs.org/@payloadcms/plugin-multi-tenant)
- Vercel: dva vzory, "Multi-tenant" (jeden kód, jeden deployment, nižší složitost, vhodné když se liší obsah a branding) vs. "Multi-project" (projekt na tenanta, pro vlastní kód/izolaci). Vlastní domény a `*.subdomény`, automatický SSL po ověření domény, správa domén přes REST API/SDK, limity dle plánu — [Vercel for Platforms](https://vercel.com/docs/platforms)
- Vercel MCP/SDK nabízí `add_project_domain`, `verify_project_domain`, DNS záznamy (zjištěno z nástrojů v session, ne z dokumentu).

### Inferences
- Pro desítky až stovky obcí, jednu osobu na údržbě a stejnou funkcionalitu je jeden deployment + multi-tenant plugin nejmenší provozní zátěž. Rozhodující riziko je izolace dat: plugin hlídá aplikační vrstvu, ale RLS bez policies a přímé SQL spojení obcházejí. Doporučit testy cross-tenant úniku (Vitest/Playwright) jako povinné acceptance kritérium.
- Deployment na obec (multi-project) dává silnější izolaci a snazší argument pro veřejnou správu (oddělená DB/schema), ale násobí migrace, CI a náklady. Hybrid: jeden sdílený deployment pro standardní obce, dedikovaný pro velké.
- Téma/branding per tenant: ukládat design tokeny (barvy, logo, font) do Tenants kolekce a vykreslovat jako CSS proměnné na `<html>`; to je návrh, v dokumentaci nepotvrzený.
- Mapování domén: middleware (Next 16: `proxy.ts`) čte Host → tenant lookup (cache `use cache` + tag) → rewrite. Nutné ošetřit admin na společné doméně.

### Gaps
- Nenalezena oficiální doporučení pro stovky vlastních domén na Vercelu (limity plánu "limits" stránka nebyla načtena) ani cena. Alternativa (Hetzner + Coolify/Caddy on-demand TLS) nebyla ověřena zdrojem.
- Nenalezeny známé problémy pluginu (GitHub issues nedostupné), ani chování s verzemi/drafts a `revalidateTag` hooky per tenant.

## A3. Caching v Next 16 (cacheComponents, "use cache", revalidateTag)

### Takeaway
`use cache` je stabilní od 16.0.0 a zapíná se `cacheComponents: true`. `revalidateTag(tag, profile)` má povinný druhý argument; `{ expire: 0 }` je správná volba pro webhooky a Payload hooky (nelze použít `updateTag`), ale znamená blokující miss, ne stale-while-revalidate. Doporučená varianta pro obsah, kde stačí mírné zpoždění, je `'max'`.

### Cited Findings
- `cacheComponents: true` v `next.config.ts` zapíná `use cache`; funkce musí být async; argumenty a návratové hodnoty musí být serializovatelné — [use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache) (lastUpdated 2026-09-29)
- Cache key = Build ID (nebo `deploymentId`) + ID funkce + argumenty; cache se po novém deployi neprenáší — [use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- Serverless: v-paměti cache záznamy typicky nepřežijí mezi requesty; self-hosted: ano (`cacheMaxMemorySize`). Pro sdílení: `'use cache: remote'` (vlastní cache handler, např. Redis) — [use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- `cookies()`, `headers()`, `searchParams` nelze číst uvnitř `use cache`; číst venku a předat jako argument. Chyba může projít `next build` a selhat až za běhu — [use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- Bez `cacheLife` platí profil `default` (stale 5 min, revalidate 15 min, expire nikdy); doc doporučuje `cacheLife` vždy explicitně — [use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- Draft Mode: všechny cached funkce se při zapnutém Draft Mode spouští při každém requestu bez ukládání — [use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- Build může viset 50 s při předání Promise z runtime dat do cached funkce — [use cache](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- `revalidateTag(tag, profile)`: lze volat v Server Functions a Route Handlers, ne v Client Components ani Proxy. `'max'` = stale-while-revalidate (okno 1 rok); `{ expire: 0 }` = nikdy stale, další request blokuje; volání bez druhého argumentu je deprecated (chová se jako expire:0). Revalidace se spouští requestem, ne voláním. Tag max 256 znaků, case-sensitive — [revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag) (lastUpdated 2026-08-25)
- Pro volání z webhooku/jiné služby přes Route Handler není `updateTag` dostupný; doc doporučuje `revalidateTag(tag, { expire: 0 })` — [revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)

### Inferences
- Payload `afterChange` hook běží v rámci Server Function/Route Handler kontextu požadavku na admin API, takže `revalidateTag` je tam volatelný (nepotvrzeno dokumentací Payloadu). Tag schéma navrhnout s tenantem: `tenant:{id}:pages`, `tenant:{id}:notice-board` (limit 256 znaků).
- Úřední deska a krizová upozornění vyžadují okamžitou aktualizaci → `{ expire: 0 }`; ostatní stránky → `'max'`. Existující volba uživatele (`expire: 0`) je tedy konzistentní s dokumentací.
- Na serverless Vercelu nepočítat s v-paměti cache mezi requesty; stránky se však ukládají jako static shell/ISR na CDN. Pro self-host (Hetzner) je nutné řešit sdílený cache handler při více instancích.

### Gaps
- Nepotvrzeno, jak se `use cache` chová s Payload Local API v tomtéž procesu a s `draft: true` / `unstable_cache`. Nezkoumáno `generateStaticParams` s tenanty.
- Nenalezena oficiální informace, zda je cacheComponents v 16.4 stále označeno jako opt-in nebo výchozí (flag je v dokumentaci stále popsán jako opt-in).

## A4. Storage, Postgres, vyhledávání, EU hosting, pooling

### Takeaway
Supabase pooler: session mode port 5432, transaction mode port 6543, direct jen pro migrace/dlouhé procesy; sdílený pooler je IPv4-only. Vercel nabízí EU regiony (fra1, cdg1, arn1, dub1, lhr1), ale výchozí region funkcí je iad1 (USA), což je nutné změnit. Český slovník pro Postgres FTS na hostovaném Supabase se nepodařilo ověřit.

### Cited Findings
- Supabase porty: direct 5432 (`db.[REF].supabase.co`), shared pooler session 5432, transaction 6543, dedicated pooler 6543 (jen transaction). V transaction mode nejsou podporovány prepared statements, v driverech vypnout; direct pro migrace, pg_dump, dlouhé backendy; pooler uživatel `postgres.[REF]`; host brát z Connect dialogu — [Supabase docs](https://supabase.com/docs/guides/database/connecting-to-postgres)
- Pro node-postgres stránka jen odkazuje na samostatný návod (specifika `pg` nebyla načtena) — tamtéž.
- Direct connection je výchozí IPv6 (IPv4 za příplatek); sdílený pooler je IPv4-only — tamtéž.
- Supabase FTS docs: `to_tsvector`, `websearch_to_tsquery`, generovaný sloupec tsvector + GIN, `ts_rank`; příklady pouze s `'english'`; unaccent a pg_trgm nezmíněny — [Supabase FTS](https://supabase.com/docs/guides/database/full-text-search)
- Existuje Postgres extension `hunspell_cs_cz` (český hunspell slovník), ale je to samostatná extension mimo core, dostupná v některých distribucích/managed službách — [Pigsty ext hunspell_cs_cz](https://pigsty.io/ext/e/hunspell_cs_cz)
- Vercel: 19 compute regionů, EU: arn1 Stockholm, cdg1 Paříž, dub1 Dublin, fra1 Frankfurt, lhr1 Londýn; výchozí region funkcí je iad1; funkce mají běžet ve stejném regionu jako DB; PoP (126) jsou globální a TLS se terminuje v regionu, kam je request směrován; failover výchozího regionu vede přes USA — [Vercel regions](https://vercel.com/docs/regions) (last_updated 2026-08-11)

### Inferences
- Pro EU data: Supabase projekt v eu-central-1 (Frankfurt) nebo eu-west, Vercel `regions: ["fra1"]` (`vercel.json`/`export const preferredRegion`), vypnout/nespoléhat na failover do USA. CDN PoP může cachovat veřejný obsah mimo EU; pro veřejné stránky obcí je to přijatelné, pro osobní data občanů (formuláře, přihlášení) ne cachovat. Formálně posoudit s DPO/DPA (smlouva Vercel/Supabase, SCC) — právní závěr není součástí zdrojů.
- Payload `@payloadcms/db-postgres` (node-postgres): za serverlessem použít pooler transaction (6543) s malým `pool.max` (např. 1–5 na instanci), migrace přes direct nebo session 5432. Prepared statements u `pg` se používají jen při pojmenovaných dotazech; ověřit, zda Drizzle/Payload pojmenované dotazy nevytváří (nepotvrzeno).
- Český FTS: bezpečný základ je `unaccent` + `simple` konfigurace + `pg_trgm` (podobnost/překlepy); stemming přes hunspell na Supabase pravděpodobně není k dispozici (nutno ověřit v `pg_available_extensions` projektu). Pro velké objemy nebo kvalitní lemmatizaci Meilisearch/Typesense self-host v EU (Hetzner); nebylo srovnáno zdroji.

### Gaps
- Ověření, zda Supabase nabízí `unaccent`, `pg_trgm` a český slovník: nenalezeno v dokumentaci (Supabase MCP `list_extensions` by to ověřil na reálném projektu; nespouštěno kvůli rozsahu).
- Payload S3 adapter se Supabase Storage (endpoint, `forcePathStyle`, region, RLS) nebyl vyhledán. Hetzner + Coolify, české hostingy (nejsou řešeny zdroji), PITR/zálohy Supabase (plán, retention) a rate limiting nebyly zkoumány.
- Meilisearch/Typesense srovnání pro češtinu nezkoumáno.

## A5. Auth, monorepo, testování, CI, bezpečnost

### Takeaway
Tato oblast nebyla v rámci rozpočtu průzkumu pokryta primárními zdroji. Uvedeno jen to, co plyne z ověřených balíků a z doc pluginu.

### Cited Findings
- Verze testovacích nástrojů: vitest 5.1.0, Playwright 1.64.1, @axe-core/playwright 4.14.0, turbo 2.11.10 — npm registry (viz A1)
- Multi-tenant plugin: uživatelé z jiné auth kolekce nemohou nastavovat tenant → vhodné oddělit "staff" (users) a "citizens" jako samostatné auth kolekce — [Payload multi-tenant docs](https://payloadcms.com/docs/plugins/multi-tenant)
- Supabase pooled uživatel a direct se liší jménem (`postgres.[REF]` vs `postgres`), důležité pro migrační skripty v CI — [Supabase docs](https://supabase.com/docs/guides/database/connecting-to-postgres)

### Inferences
- Doporučená struktura (nepodloženo zdrojem): `apps/web` (Next+Payload), `apps/mobile` (Expo), `packages/types` (generované `payload-types.ts` + zod), `packages/ui`, `packages/config`. Sdílení typů generováním `payload generate:types` a importem jako workspace balík.
- Metro/Expo v monorepu s pnpm vyžaduje pozornost (SDK 56 changelog mluví o novém CLI watcheru; nutné ověřit nastavení `node-linker`).
- CSP, rate limiting, PITR: ponechat jako explicitní úkoly s ověřením agentem, ne jako tvrzení.

### Gaps
- Nezkoumáno: Payload 2FA/TOTP (existuje plugin nebo vlastní strategie?), e-mail OTP pro občany, Supabase Auth vs Payload auth, PGlite pro migrace, GitHub Actions šablony, CSP pro Next 16, Supabase backups/PITR. Tyto body vyžadují další průzkum.

## B1. Oficiální doporučení Claude Code (CLAUDE.md, hooks, skills, permissions, checkpoints)

### Takeaway
Anthropic: CLAUDE.md je krátká (pod 200 řádků), obsahuje jen to, co Claude nezjistí z kódu (příkazy pro ověření, pasti, rozhodnutí mimo repo). Co musí platit vždy, patří do hooků/deny pravidel, ne do CLAUDE.md. Největší páka je dát agentovi spustitelný pass/fail check a vynutit ho `Stop` hookem.

### Cited Findings
- Dva druhy instrukcí: nedeterministické (prompt, CLAUDE.md, skills) a deterministické (hooky, deny pravidla, managed settings, testy, Stop hook, CI). "Pokud neustále přidáváš důraz na řádek v CLAUDE.md a Claude ho míjí, patří do hooku" — [Best practices](https://code.claude.com/docs/en/best-practices)
- Test před zápisem do CLAUDE.md: "Could it find this by reading the code? Would it actually go and look? Pokud obojí ano, vynech." Obsah: příkazy pro ověření (test, typecheck, lint, jeden test), místa kde je kód zavádějící, rozhodnutí mimo repo, vše co jsi opravoval dvakrát — [Best practices](https://code.claude.com/docs/en/best-practices)
- Velikost: cílit pod 200 řádků na soubor; delší snižuje adherenci; scope pravidel přes `.claude/rules/*.md` s `paths:` filtrem; imports `@path` (max hloubka 4); blokové HTML komentáře se odstraní z kontextu; rozpory v instrukcích → Claude vybere libovolně; `/doctor prompt-audit` hledá zastaralé a rozporné instrukce — [Memory docs](https://code.claude.com/docs/en/memory)
- AGENTS.md: Claude Code ho čte, jen pokud neexistuje CLAUDE.md; jinak ho importovat z CLAUDE.md (`@AGENTS.md`); vyžaduje v2.1.277+ — [Memory docs](https://code.claude.com/docs/en/memory)
- Auto memory: načítá se prvních 200 řádků nebo 25 KB — [Memory docs](https://code.claude.com/docs/en/memory)
- Dej agentovi check: prompt "spouštěj dokud neprojde", `/goal` (separátní model kontroluje podmínku po každém tahu; vhodné pro dlouhé běhy kde Claude končí průběžným shrnutím), `Stop` hook (`pnpm tsc --noEmit 1>&2 || exit 2`; po 8 blocích v řadě bez tool callu harness blok přebije; `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP`), `/code-review` ve fresh subagentu. Požadovat důkaz (příkaz + výstup, screenshot) — [Best practices](https://code.claude.com/docs/en/best-practices)
- Review proti specifikaci: "use a subagent to review diff against SPEC.md… report gaps that affect correctness and skip style" (bez "skip style" reviewer vždy něco najde → zbytečné abstrakce a testy) — [Best practices](https://code.claude.com/docs/en/best-practices)
- Brainstorm/spec: nechat Claude "interview me until you could write the spec, then write it to SPEC.md", pak build v čerstvé session — [Best practices](https://code.claude.com/docs/en/best-practices)
- Hooky: `PostToolUse` formátovač, `PreToolUse` exit 2 pro chráněné cesty (např. migrations); `prompt`/`agent` hooky nejsou deterministické; `onFailure: "block"` — [Best practices](https://code.claude.com/docs/en/best-practices)
- Permissions: `deny` platí ve všech režimech včetně auto a bypass; `Read(./.env)` zachytí i `cat .env`, ale ne skript, který soubor otevře; pro OS-úroveň zapnout sandbox; auto mode je klasifikátor, ne tvrdé pravidlo, "never" pravidla patří do deny/hooků; `autoMode` nastavení musí být v `~/.claude/settings.json` — [Best practices](https://code.claude.com/docs/en/best-practices)
- Skills (`.claude/skills/<name>/SKILL.md`) pro postupy; `disable-model-invocation: true` pro akce s vedlejším efektem; subagenti v `.claude/agents/` s omezenými `tools`, `model: haiku` pro jednoduché úlohy; subagenti stojí tokeny a mohou být pomalejší — [Best practices](https://code.claude.com/docs/en/best-practices)
- Checkpointy: `Esc`, `/rewind`; pokrývají jen soubory upravené nástroji pro editaci, ne změny z Bash; doplňují git. Po dvou neúspěšných opravách `/clear` a nový prompt — [Best practices](https://code.claude.com/docs/en/best-practices)
- Výchozí model v docs: Opus 5.5 (medium effort); Sonnet 5.5 a Haiku 5.5 mají výchozí `medium`; `/effort high|xhigh` pro náročné schéma/bezpečnost; fráze jako "be thorough" jsou jen běžný text; "be ambitious" pomáhá, když chceš plný rozsah — [Best practices](https://code.claude.com/docs/en/best-practices)

### Inferences
- Pro CodeKom: CLAUDE.md (kořen monorepa) ~100–150 řádků: příkazy (install, typecheck, test, e2e, a11y, migrace), pasti (schema `obec`, RLS bez policies, `revalidateTag(tag,{expire:0})`, tenant izolace), pravidla jazyka. Per-app pravidla do `.claude/rules/` s `paths:`.
- Tvrdá pravidla jako hooky/deny: zákaz čtení `.env*`, zákaz editace aplikovaných migrací, `Stop` hook s `tsc` + lint + unit testy, `PostToolUse` prettier.
- Velký jednorázový prompt je v rozporu s doporučením "fresh session z SPEC.md"; kompromis: prompt = odkaz na `docs/specs/<část>.md` + akceptační kritéria, ne vložený text.

### Gaps
- Stránky o hooks, skills, subagents a checkpointing nebyly načteny samostatně (informace pouze z Best practices a Memory). Nenalezeny kvantitativní studie spolehlivosti dlouhých promptů.

## B2. Psaní velké specifikace pro jednorázové provedení

### Takeaway
Anthropic doporučuje XML tagy pro oddělení typů obsahu, dlouhá data nahoru a dotaz/instrukce na konec, vysvětlení motivace u pravidel, kladná místo záporných formulací, stavový soubor a git pro dlouhé úlohy, a výslovné pokyny proti zbytečné komplexitě a hardcodování pro testy.

### Cited Findings
- XML tagy: "Wrapping each type of content in its own tag (`<instructions>`, `<context>`, `<input>`) reduces misinterpretation"; konzistentní jména, vnořování — [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- Dlouhá data nahoru, dotaz na konec: dotaz na konci může zlepšit kvalitu až o 30 % (v testech Anthropicu, komplexní vícedokumentové vstupy) — [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- Kontext a motivace: vysvětlení "proč" (příklad s TTS a výpustkami) umožní zobecnění — [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- Kladné formulace ("piš plynulé odstavce") místo "nepoužívej markdown" — tamtéž.
- Dlouhé úlohy: postupný pokrok po malých krocích; stavový JSON (testy: passing/failing/not_started), `progress.txt`, git log jako checkpointy; pro nové okno "Review progress.txt, tests.json, and the git logs"; poznámka "Do not remove tests" — tamtéž.
- Proti předčasnému ukončení: "Do not stop tasks early due to token budget concerns… Never artificially stop any task early regardless of the context remaining." — tamtéž.
- Proti over-engineeringu: "Avoid over-engineering. Only make changes that are directly requested or clearly necessary… minimum complexity needed for the current task." — tamtéž.
- Proti falešným testům: "Implement a solution that works correctly for all valid inputs, not just the test cases. Do not hard-code values… Tests are there to verify correctness, not to define the solution… if tests are incorrect, inform me rather than working around them." — tamtéž.
- Paralelní tool calls: výchozí paralelní; "Never use placeholders or guess missing parameters" — tamtéž.
- Claude čte požadavek konzervativně; "be ambitious" + výčet (empty/error stavy, keyboard navigation) rozšíří rozsah — [Best practices](https://code.claude.com/docs/en/best-practices)

### Inferences
- Navržená kostra promptu (nepodloženo jedním zdrojem, syntéza): `<context>` (stav repa, rozhodnutí) → `<scope>` (soubory/moduly) → `<non_goals>` → `<requirements>` číslované s ID → `<verification>` (přesné příkazy: `pnpm typecheck`, `pnpm test`, `pnpm exec playwright test`, axe) → `<definition_of_done>` → `<workflow>` (nejdřív plan mode/plán, TODO soubor `docs/progress.json`, commit po každém bloku) → `<rules>` (EU data, žádné secrets, citace verzí z `npm view`).
- Secrets: deny `Read(./.env*)`, `.env.example` s názvy, žádné tajné hodnoty v promptu; secrets scan hook před commitem s `onFailure: "block"`.
- Příliš velká část v jednom promptu: rozdělit na fáze s kontrolními body (po každé fázi green build), jinak riziko driftu; potvrzuje to doporučení Anthropicu "po dvou opravách `/clear`".

### Gaps
- Nenalezeny nezávislé empirické studie o délce promptu vs. spolehlivost. Doporučení pro plan mode a TodoWrite nebyla načtena z primární stránky.

## B3. Spec-driven vzory (Spec Kit, AGENTS.md, Kiro) a čeština

### Takeaway
GitHub Spec Kit definuje tok constitution → specify → plan → tasks → implement; AGENTS.md je podporován Claude Code jako náhrada CLAUDE.md. Kiro specs a empirické důkazy o přínosu nebyly ověřeny. Pro češtinu nebyl nalezen oficiální zdroj.

### Cited Findings
- Spec Kit příkazy: `/speckit-constitution`, `/speckit-specify`, `/speckit-plan`, `/speckit-tasks`, `/speckit-implement`, `/speckit-converge` (opakuj implement+converge do "Converged"); adresář `.specify/memory/`; vyžaduje Python 3.11+ a uv; stránka neobsahuje kritiku — [github/spec-kit](https://github.com/github/spec-kit)
- AGENTS.md čtení v Claude Code (viz B1) — [Memory docs](https://code.claude.com/docs/en/memory)

### Inferences
- Pro jednoho vývojáře je lehká varianta (SPEC.md z interview + CLAUDE.md + akceptační kritéria + Stop hook) pravděpodobně efektivnější než plný Spec Kit; nepodloženo měřením.
- Čeština: psát instrukce česky, identifikátory, názvy kolekcí a příkazy anglicky (kód), doménové termíny v tabulce "česky = anglicky" (úřední deska = `noticeBoard`, obec = `municipality`/`tenant`); CLAUDE.md držet stabilní. Toto je doporučení bez zdroje; tokenová efektivita češtiny nebyla zkoumána.

### Gaps
- Kiro specs (EARS notace), "AGENTS.md" standard na agents.md, evidence o spec-driven vývoji (studie, kritika typu "waterfall") a specifika promptování v češtině: nevyhledáno.
