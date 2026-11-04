"""Zapíše packages/tokeny/src/sablony.ts z palettes.py a tpls.py.

Spuštění: python design/generator/tokeny.py
Výstup se ručně needituje, změny patří do palettes.py nebo tpls.py.
"""
import json, os, re
from palettes import PAL, K, CHECKS
from tpls import T

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', '..', 'packages', 'tokeny', 'src', 'sablony.ts')

KLICE = {
    'Main': 'naves', 'S02-Zvonice': 'zvonice', 'S03-Studanka': 'studanka', 'S04-Lipa': 'lipa', 'S05-Majka': 'majka',
    'S06-Hnizdo': 'hnizdo', 'S07-Hranice': 'hranice', 'S08-Vinice': 'vinice', 'S09-Hreben': 'hreben', 'S10-Rynek': 'rynek',
    'S11-Radnice': 'radnice', 'S12-Kolonada': 'kolonada', 'S13-Mlyn': 'mlyn', 'S14-Hraz': 'hraz', 'S15-Lupa': 'lupa',
    'S16-Kompas': 'kompas', 'S17-Magistrat': 'magistrat', 'S18-Zpravodaj': 'zpravodaj', 'S19-Mikroregion': 'mikroregion',
    'S20-Urad': 'urad',
}

INTERAKTIVNI = {'zvonice', 'studanka', 'lipa', 'hranice', 'radnice', 'lupa', 'kompas', 'magistrat', 'mikroregion', 'urad'}


def pisma(q):
    """`family=A+B:wght@400;500&family=C` -> [{rodina, osy, hodnoty}]"""
    out = []
    for part in q.split('&'):
        m = re.match(r'family=([^:]+)(?::(.+))?', part)
        if not m:
            continue
        rodina = m.group(1).replace('+', ' ')
        osy, hodnoty = [], ''
        if m.group(2):
            a, _, hodnoty = m.group(2).partition('@')
            osy = a.split(',')
        out.append({'rodina': rodina, 'osy': osy, 'hodnoty': hodnoty})
    return out


def main():
    sablony = []
    for key, t in T.items():
        klic = KLICE[key]
        size = t.get('size', '17px')
        if '{{' in size:
            size = '20px'
        sablony.append({
            'klic': klic,
            'cislo': t['num'],
            'nazev': t['name'],
            'podtitul': t['sub'],
            'inspirace': t.get('insp', 'vlastní návrh'),
            'pismo': {'googleFonts': t['fonts'], 'family': t['family'], 'popis': t['fontLabel'], 'rodiny': pisma(t['fonts'])},
            'velikostTextu': size,
            'radkovani': t.get('lh', '1.55'),
            'vychoziKrize': t.get('alert', 'info'),
            'prototyp': t['file'],
            'zdroj': key,
            'interaktivni': klic in INTERAKTIVNI,
            'palety': [
                {'nazev': v['name'], **{k: v[k] for k in K}, 'extra': v['x']}
                for v in PAL[key]
            ],
        })
    checks = [{'a': a, 'b': b, 'min': n} for a, b, n in CHECKS]
    ts = ('// Vygenerováno skriptem design/generator/tokeny.py z palettes.py a tpls.py. Ručně needitovat.\n'
          "import type { Sablona } from './typy'\n\n"
          f'export const SABLONY: readonly Sablona[] = {json.dumps(sablony, ensure_ascii=False, indent=2)}\n\n'
          f'export const KONTROLY_KONTRASTU = {json.dumps(checks, ensure_ascii=False)} as const\n')
    with open(OUT, 'w', encoding='utf-8', newline='\n') as f:
        f.write(ts)
    print('zapsáno', os.path.relpath(OUT), len(sablony), 'šablon')


if __name__ == '__main__':
    main()
