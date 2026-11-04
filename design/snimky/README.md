# Snímky šablon

Snímky úvodních stránek 20 šablon pro galerii prezentačního webu (`prompty/06-prezentacni-web.md`). Vznikly 4. 11. 2026 z prototypů v `design/prototypy` s ukázkovou obcí Javoří Lhota, krizový banner je vypnutý.

| Soubor | Co to je |
| --- | --- |
| `<klic>-<paleta>-1280.webp` | úvod na šířku 1280 × 900 px, paleta 0, 1 nebo 2 (60 souborů) |
| `<klic>-0-375.webp` | úvod na telefonu 375 × 800 px, první paleta (20 souborů) |

Klíče šablon v pořadí 01–20: naves, zvonice, studanka, lipa, majka, hnizdo, hranice, vinice, hreben, rynek, radnice, kolonada, mlyn, hraz, lupa, kompas, magistrat, zpravodaj, mikroregion, urad. Názvy palet jsou v `design/generator/palettes.py` (např. naves: Luční, Modrotisk, Šípek).

Přegenerování z prototypů:

```bash
cd design/nastroje
npm install
node snimky.js /tmp/snimky
python3 -c "from PIL import Image; import glob; [Image.open(f).convert('RGB').save('../snimky/'+f.split('/')[-1][:-4]+'.webp','WEBP',quality=80,method=6) for f in glob.glob('/tmp/snimky/*.png')]"
```

Až poběží funkční prototyp (`prompty/07-prototyp-webu.md`), snímky nahradí `pnpm --filter web snimky` se stejnými názvy souborů.
