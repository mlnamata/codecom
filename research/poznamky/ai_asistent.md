# CodeKom AI asistent na vlastním lokálním LLM serveru v ČR (stav 3. 11. 2026)

Poznámka k rozsahu: výzkum byl krátký (~16 volání nástrojů), řada primárních zdrojů (BenCzechMark leaderboard, české ceny, ÚOOÚ) se nepodařilo načíst. Co není ve "Cited Findings", je neověřené a musí se před zadáním do Claude Code ověřit.

## 1. Nejlepší open-weight LLM pro český RAG (1-2 GPU), licence, české benchmarky

### Takeaway
Pro 1-2 GPU jsou k říjnu 2026 relevantní husté modely kolem 27-31 B s permisivní licencí Apache-2.0 (Gemma 4 31B, Qwen3.8-27B). Kvalitu češtiny u nich se nepodařilo doložit žádným českým benchmarkem; nutné vlastní měření na CZ evaluační sadě.

### Cited Findings
- Agregátor BenchLM (stav k 29. 10. 2026) uvádí mezi modely pro spotřebitelský HW: Gemma 4 31B (skóre 54,4, Apache-2.0, 31B dense), Qwen3.8-27B (54,3, Apache-2.0, 27B dense), Granite 4.2 8B (36,8, Apache-2.0). Stránka neuvádí žádné vícejazyčné výsledky ani data vydání; je to sekundární agregátor. — [BenchLM](https://benchlm.ai/blog/posts/best-open-source-llm)
- Největší open-weight modely (Kimi K3 2800B MoE, DeepSeek V4.1 Flash 552B MoE/16B aktivních, MIT, Ling 3.1 Flash 560B MoE, MIT) jsou pro 1-2 GPU nerealistické; Qwen3.8 Max a Kimi K3 mají vlastní "community" licence. — [BenchLM](https://benchlm.ai/blog/posts/best-open-source-llm)
- Gemma 4 31B-it: 30,7 B parametrů, kontext až 256K, Apache 2.0, text+obraz; karta uvádí "přes 140 jazyků" a "35+" jazyků s plnou podporou, čeština výslovně nejmenována; MMLU Pro 85,2 %, GPQA Diamond 84,3 %. Technická zpráva arXiv 2607.02770 (červenec 2026). — [HF Gemma 4 31B-it](https://huggingface.co/google/gemma-4-31b-it)
- BenCzechMark: 50 úloh, 8-9 kategorií (porozumění textu, faktické znalosti, čeština, jazykové modelování, matematika, NLI, NER, sentiment, vyhledávání dokumentů), ~90 % nativní čeština, skórování "duely" se statistickou významností, makro-průměr win rate. Autoři také natrénovali český 7B model s českým tokenizérem jako baseline. Leaderboard: HF Space CZLC/BenCzechMark. — [arXiv 2412.17933](https://arxiv.org/abs/2412.17933v1), [HF blog](https://huggingface.co/blog/benczechmark)
- V původním výsledku BenCzechMark (2024-12) vedl Llama-405B; Qwen-72B dobrý v matematice a vyhledávání dokumentů; Gemma-2 9B silná v českém porozumění textu a překonala větší modely. Jde o zastaralé modelové generace. — [HF blog](https://huggingface.co/blog/benczechmark)
- Existuje též MiniCzechBenchmark (NeurIPS 2025), rychlý a proti kontaminaci odolný rámec pro češtinu. — [NeurIPS 2025](https://neurips.cc/virtual/2025/122449)

### Inferences
- Doporučená výchozí kandidátská dvojice k A/B testu na vlastní CZ sadě: Gemma 4 31B (Apache-2.0) a Qwen3.8-27B (Apache-2.0); jako lehčí varianta menší model z téže rodiny (nenalezeno, ověřit). Gemma řada měla historicky v BenCzechMark nadprůměrnou češtinu (Gemma-2 9B), což je slabý, ale směrový argument pro Gemma 4.
- Licence Apache-2.0 umožňuje komerční SaaS bez poplatků; u modelů s "community" licencí (Qwen3.8 Max, Kimi K3, GLM-5.3) nutno číst podmínky.
- Pro RAG je rozhodující věrnost kontextu a odmítání, ne obecné skóre; BenchLM skóre to neměří.

### Gaps
- Aktuální pořadí na BenCzechMark leaderboardu (HF Space se nenačetl) a výsledky Gemma 4 / Qwen3.8 / Mistral / Llama v češtině nenalezeny. Úkol: ručně otevřít https://huggingface.co/spaces/CZLC/BenCzechMark.
- České specifické modely (např. z CZLC / VUT / ÚFAL) v roce 2026 nenalezeny; nelze potvrdit ani vyvrátit existenci produkčně použitelného.
- Mistral a Llama 2026 generace nezjištěny.
- Pozor: všechny názvy a čísla modelů z BenchLM jsou po mém datu znalostí a nepotvrzeny druhým zdrojem kromě karty Gemma 4.

## 2. Embedding, reranking, pgvector vs. samostatná vektorová DB

### Takeaway
bge-m3 (MIT, 1024 dim, 8192 tokenů, dense+sparse+multi-vector) je solidní výchozí embedding; pgvector v Supabase stačí pro desítky až stovky obcí, ale pro vlastní server je nutné Postgres s pgvector provozovat lokálně.

### Cited Findings
- bge-m3: 1024 dimenzí, vstup až 8192 tokenů, 100+ jazyků, licence MIT, dense/sparse/multi-vector; doporučuje "hybrid retrieval + re-ranking" s bge-reranker / bge-reranker-v2. — [HF BAAI/bge-m3](https://huggingface.co/BAAI/bge-m3)
- Supabase: pgvector sloupec `extensions.vector(n)`; operátory `<->`, `<#>`, `<=>`; "méně dimenzí funguje lépe"; při indexu řadit přímo podle distance výrazu, jinak se index nepoužije; stejný model pro dokumenty i dotaz; filtr přes `where` v SQL funkci volané přes `rpc()`. — [Supabase vector columns](https://supabase.com/docs/guides/ai/vector-columns)

### Inferences
- Per-obec filtrování = sloupec `obec_id` + RLS/WHERE a částečné/partition indexy; na stovkách obcí s desítkami tisíc chunků je pgvector HNSW bez problémů (bez zdroje, ověřit benchmarkem).
- Důležitý architektonický bod: Supabase EU cloud (dle paměti uživatele jde o hostované datové úložiště) vs. požadavek, že data zůstávají na serveru provozovatele v ČR. Vektory a texty dokumentů odvozené z obecních dokumentů by měly běžet v lokálním Postgresu u LLM serveru, nebo je nutné pečlivě rozhodnout. Nutné doplnit do specifikace.
- Hybridní vyhledávání: pgvector + Postgres full-text (čeština, `unaccent`, případně hunspell slovník cs_CZ) + RRF fúze; reranker bge-reranker-v2-m3 (nenačten, viz gaps).

### Gaps
- Čeština v MTEB/retrieval: žádný relevantní zdroj nalezen; multilingual-e5, jina-v3/v4, Qwen3-Embedding, novější embeddingy 2026 neověřeny.
- Reranker bge-reranker-v2-m3 licence a velikost nepotvrzeny z primárního zdroje.
- Supabase docs: limity dimenzí, halfvec a HNSW vs IVFFlat se nenačetly.

## 3. Serving: vLLM, llama.cpp, Ollama, SGLang

### Takeaway
vLLM nabízí OpenAI-kompatibilní server a strukturovaný výstup (JSON schema); pro víceuživatelský provoz je to výchozí volba. Ostatní enginy nebyly ověřeny.

### Cited Findings
- vLLM: structured outputs přes Completions i Chat API (parametr `guided_json` s JSON schématem nebo Pydantic), backendy outlines, lm-format-enforcer, xgrammar; doporučeno v promptu také uvést, že se očekává JSON. Zdroj může být starší verze dokumentace (parametr `guided_json` mohl být nahrazen `structured_outputs`). — [vLLM docs](https://docs.vllm.ai/en/latest/features/structured_outputs.html)

### Inferences
- Pro citace použít strukturovaný výstup: {odpověď, [id_chunků], odmítnuto: bool}, validace serverem, že id existují v načteném kontextu.
- Rozhraní OpenAI-compat umožní zaměnit engine; Ollama/llama.cpp jen pro dev a nízký provoz (bez zdroje).

### Gaps
- Propustnost (tokeny/s), souběžní uživatelé, Prometheus metriky, SGLang, llama.cpp, Ollama: nezkoumáno/nenalezeno.

## 4. Hardware, ceny, pronájem v ČR

### Takeaway
Ceny GPU v 2026 rostou kvůli poptávce po AI a nedostatku paměti; RTX PRO 6000 (96 GB) stojí v USA ~9-11,5 tis. USD. České ceny a čeští GPU hostingoví poskytovatelé se nepodařilo doložit.

### Cited Findings
- RTX PRO 6000 Blackwell: uvedení ~8 000 USD; aktuálně NVIDIA store 8 900 USD (standardní model vyprodán), Newegg 9 349, Amazon 9 449, Microcenter 9 999, B&H 11 500; serverové edice nad 10 000 USD; 96 GB vs 32 GB u RTX 5090; RTX 5090 od ~4 000 USD, mnoho nabídek nad 6 000 USD; článek bez data ("poslední měsíce 2026"). — [Digital Citizen](https://www.digitalcitizen.life/nvidia-rtx-pro-6000-blackwell-prices-climb-past-10000-as-ai-demand-keeps-rising/)
- Nabídky pronájmu serverů s RTX PRO 6000 Blackwell existují u evropských hosterů (NovoServe, IONOS, INTROSERV), nejde o české DC a ceny nebyly ověřeny. — [NovoServe](https://portal.novoserve.com/announcements/88/NVIDIA-RTX-PRO-6000-Blackwell-now-available-on-our-dedicated-servers.html), [IONOS](https://www.ionos.com/servers/gpu-server), [INTROSERV](https://introserv.com/news/nvidia-rtx-pro-6000-blackwell-max-q-gpu-servers/)

### Inferences
- 96 GB karta pojme 27-31B model v FP8 (~31 GB) i s velkým KV cache; to je pravděpodobně nejjednodušší jednokartová konfigurace (výpočet z velikosti parametrů, nutno změřit).
- Pro 50-500 obcí je provoz dotazů občanů nízký (řádově jednotky souběžných dotazů); jedna karta je pravděpodobně dostačující, druhá pro redundanci (odhad, ověřit zátěžovým testem).
- Pro prezentaci "server v ČR": nutná kolokace nebo pronájem v ČR; ověřit poskytovatele.

### Gaps
- České ceny (Kč) RTX 5090 / RTX PRO 6000 / L40S / použité A100/H100 / Mac Studio, spotřeba, tokens/s, počty souběžných uživatelů: nenalezeno.
- Čeští GPU hostingoví poskytovatelé a ceny (hledání nevrátilo žádné české výsledky): nenalezeno.

## 5. RAG pro obecní dokumenty

### Takeaway
Nenalezen žádný zdroj specifický pro tuto oblast; návrh vychází z obecných zásad a je k ověření.

### Cited Findings
- Supabase: stejný embedding model pro dokumenty i dotazy, tunit práh podobnosti (příklad 0,78) vlastním testováním. — [Supabase](https://supabase.com/docs/guides/ai/vector-columns)
- bge-m3 podporuje 8192 tokenů, vhodné pro delší chunky právních textů. — [HF bge-m3](https://huggingface.co/BAAI/bge-m3)

### Inferences (neověřené, z obecných znalostí)
- Chunkování vyhlášek podle struktury (část, článek, odstavec) s metadaty: obec_id, dokument_id, verze, platnost_od/do, typ, url, strana; expirace přes `platnost_do` filtr v dotazu; ceník a svozový kalendář jako strukturovaná data místo volného textu.
- Odmítnutí bez zdroje: práh skóre rerankeru + kontrola, že odpověď obsahuje citaci; jinak šablona "Tuto informaci nemám v dokumentech obce" + kontakt na úřad.
- Obrana proti prompt injection: dokumenty jako nedůvěryhodná data (oddělovače, žádné nástroje/akce asistenta, výstupní validace, filtr URL na whitelist domén obce).
- Evaluace: sada 100-300 ručně ověřených otázek na obec typ, včetně neodpověditelných a injekčních; metriky: recall@k, faithfulness, citation precision, míra správného odmítnutí.
- OCR skenů: nezkoumáno (kandidáti Tesseract/ocrmypdf s češtinou, modely typu Docling; nepotvrzeno).

### Gaps
- OCR, český právní chunking, prompt-injection obrany a vzorové evaluační sady: nenalezeny citovatelné zdroje.

## 6. Compliance (AI Act, GDPR, ÚOOÚ) a příklady

### Takeaway
Čl. 50 AI Act platí od 2. 8. 2026 a Komise vydala závazně nezávazné finální pokyny 20. 7. 2026: oznámení o AI musí být zabudované do designu a zobrazené při první interakci; skrytí v podmínkách nestačí.

### Cited Findings
- Komise zveřejnila finální pokyny k čl. 50 dne 20. 7. 2026; nejsou právně závazné, ale usměrňují dozorové orgány. — [Stephenson Harwood](https://www.stephensonharwood.com/post/102nfqh/eu-ai-act-update-european-commission-adopts-guidelines-on-article-50-transparency-obligations/)
- Čl. 50(1) se vztahuje na poskytovatele systémů interagujících přímo s lidmi (chatboty, hlasoví asistenti, agenti): čtyři kumulativní kritéria (AI systém, určen k interakci s fyzickými osobami, přímá interakce, s osobou a ne strojem). Oznámení v prostém jazyce na začátku relace, trvalý odznak nebo mluvené prohlášení; vágní označení "asistent", pouze strojově čitelná značka či zakopání v podmínkách nestačí; zvláštní péče u dětí, seniorů a méně digitálně gramotných. — [Stephenson Harwood](https://www.stephensonharwood.com/post/102nfqh/eu-ai-act-update-european-commission-adopts-guidelines-on-article-50-transparency-obligations/)
- Pokuty za nesplnění až 15 mil. EUR nebo 3 % obratu. Přechodné období 2. 12. 2026 pro značení generovaného obsahu podle čl. 50(2) u systémů již na trhu před 2. 8. 2026. Digital Omnibus je zmíněn jako změna lhůt, ale detaily neuvedeny. — [Stephenson Harwood](https://www.stephensonharwood.com/post/102nfqh/eu-ai-act-update-european-commission-adopts-guidelines-on-article-50-transparency-obligations/)
- Text zveřejněný ve veřejném zájmu může být vyňat ze značení při redakční kontrole s podstatnou lidskou revizí (relevantní pro koncepty aktualit psané AI pro úředníky). — [Stephenson Harwood](https://www.stephensonharwood.com/post/102nfqh/eu-ai-act-update-european-commission-adopts-guidelines-on-article-50-transparency-obligations/)
- Kodex postupů pro transparentnost AI obsahu je dobrovolný, Komise jej považuje za vhodný způsob doložení souladu. — [Stephenson Harwood](https://www.stephensonharwood.com/post/102nfqh/eu-ai-act-update-european-commission-adopts-guidelines-on-article-50-transparency-obligations/)

### Inferences
- CodeKom je pravděpodobně "poskytovatel" systému podle čl. 50(1) (vyvíjí a uvádí na trh pod svým jménem); obec je "zavádějící subjekt" (deployer). Smlouva má role rozdělit. Zdroj k roli nenalezen.
- Odpovídání občanům z obecních dokumentů pravděpodobně není vysoce rizikové dle přílohy III (nerozhoduje o nárocích), ale tuto klasifikaci je nutné právně potvrdit; nezjištěno z primárního zdroje.
- Čl. 50 pokyny: použít viditelný text "Jsem AI asistent, ne člověk" při otevření chatu + trvalý odznak v UI webu i aplikace.
- Logování: neukládat identitu ani IP u dotazů; krátká retence (např. 30 dní) a pseudonymizace; ke specifikaci DPIA (sporné, bez zdroje).

### Gaps
- Pokyny ÚOOÚ k chatbotům ve veřejné správě: vyhledávání nevrátilo nic relevantního (jen akademické práce).
- Konkrétní znění textu čl. 50 z EUR-Lex nebylo načteno; Digital Omnibus změny nezjištěny.
- Příklady českých/evropských obecních chatbotů (např. "chatbot Honza" se objevil jen v titulku novinky.cz, bez ověření): nezkoumáno.
- Přesné určení rolí a high-risk analýza: právní posouzení nenalezeno.
