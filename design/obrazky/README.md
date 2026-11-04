# Obrázky

Fotky pro úvody šablon a pro prezentační web. Všechny jsou vygenerované AI (Gemini, model `gemini-2.5-flash-image`) pro smyšlenou obec Javoří Lhota. Kde se zobrazí, patří k nim poznámka „Ilustrační fotografie vytvořená umělou inteligencí“.

| Soubor | Kam patří |
| --- | --- |
| `foto/sablona-01-naves.webp` až `foto/sablona-20-urad.webp` | fotografický úvod šablon 01–20 (Náves, Zvonice, Studánka, Lípa, Májka, Hnízdo, Hranice, Vinice, Hřeben, Rynek, Radnice, Kolonáda, Mlýn, Hráz, Lupa, Kompas, Magistrát, Zpravodaj, Mikroregion, Úřad) |
| `foto/prezentace-starosta.webp` | prezentační web: starosta s tabletem v kanceláři úřadu |
| `foto/prezentace-topeni.webp` | prezentační web, modul Chytré budovy: hlavice topení v sále |
| `foto/prezentace-zamek.webp` | prezentační web, modul Chytré budovy: vstup se zámkem a klávesnicí |

Šablony mají kreslené ilustrace (SVG), které se barví podle palety, a ty jsou výchozí. Fotky jsou volba pro obce, které chtějí fotografický úvod. Na skutečném webu má vždy přednost vlastní fotka obce.

## Jak vznikly

- `prompty.txt`: zadání, každý blok `===` je jeden obrázek a jeho název je název souboru. Prompty jsou krátké a anglicky, styl je u všech stejný: dokumentární fotka bez textu a bez rozpoznatelných tváří, 16 : 9.
- `obrazky.py`: generuje PNG z bloků `===` (skript `prompty.py` ze skillu ukládá jen text). Klíč čte z `.env` (`GEMINI_API_KEY`) a nikam ho nevypisuje.

```bash
pip install google-genai
python3 obrazky.py prompty.txt --env ~/Downloads/.env              # všechny
python3 obrazky.py prompty.txt --env ~/Downloads/.env --jen sablona-09-hreben   # jen vybrané
```

Výstup je ve `vystupy/<datum_cas>/` vedle `.env` (PNG a `_souhrn.txt`). Do `foto/` se ukládá převedený WebP (šířka 1600 px, kvalita 80).
