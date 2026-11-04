"""Jednorázově navrhne tabulku odkazů (text odkazu -> trasa) pro apps/web/src/sablony/sdilene/odkazy.ts.

Spuštění: python design/generator/odkazy_navrh.py
Existující položky v odkazy.ts se zachovají, doplní se jen chybějící. Tabulku pak upravuje člověk.
"""
import glob, json, os, re, unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '..', '..')
OBSAH = os.path.join(ROOT, 'obsah', 'javori-lhota')
OUT = os.path.join(ROOT, 'apps', 'web', 'src', 'sablony', 'sdilene', 'odkazy.ts')


def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    return ''.join(ch for ch in s if unicodedata.category(ch) != 'Mn')


def texty_odkazu():
    out = set()
    for f in glob.glob(os.path.join(HERE, 'bodies', '*.html')):
        s = open(f, encoding='utf-8').read()
        for m in re.finditer(r'<a ([^>]*)>([\s\S]*?)</a>', s):
            attrs, inner = m.groups()
            if 'href="#"' not in attrs:
                continue
            out.add(klic_odkazu(attrs, inner))
    return sorted(out)


def klic_odkazu(attrs, inner):
    """Klíč odkazu: viditelný text bez značek, nebo aria-label. Stejně počítá do-tsx.py."""
    t = re.sub(r'\[\[ZNAK \d+\]\]', '', inner)
    t = re.sub(r'<[^>]+>', ' ', t)
    t = re.sub(r'\s+', ' ', t).strip()
    lab = re.search(r'aria-label="([^"]*)"', attrs)
    if lab and (not t or '{{' in t):
        t = lab.group(1)
    return t


def nacti_ts():
    if not os.path.exists(OUT):
        return {}
    s = open(OUT, encoding='utf-8').read()
    m = re.search(r'/\* ODKAZY-ZACATEK \*/([\s\S]*?)/\* ODKAZY-KONEC \*/', s)
    return json.loads(m.group(1)) if m else {}


PRAVIDLA = [
    (r'^\{\{|^$', '#'),
    (r'javori lhota|zpravodaj$|obec javori', '/'),
    (r'^uvod$', '/'),
    (r'uredni desk|vsechny dokumenty|celá uredni|dokumenty a vyhlasky|vyhlask', '/uredni-deska'),
    (r'archiv uredni', '/uredni-deska/archiv'),
    (r'povinn', '/povinne-informace'),
    (r'pristupnost', '/prohlaseni-o-pristupnosti'),
    (r'osobni udaj|cookies|impressum', '/ochrana-osobnich-udaju'),
    (r'zaplatit|poplat|platb|kolik a do kdy|zaplatite', '/sluzby/platby'),
    (r'nahlasit|zavad|co smim opravit', '/sluzby/nahlasit-zavadu'),
    (r'pronaj|pronajem|rezerv', '/sluzby/rezervace'),
    (r'hledat', '/hledat'),
    (r'zastupitel|zasedani|program zasedani|samosprava|osadni vybor', '/zastupitelstvo'),
    (r'kontakt|urad|uredni hodiny|starostk|napsat|@|\[telefon\]|objednat se', '/obecni-urad'),
    (r'zivotni situac|stehuji|narodilo|zemrel|stavim|co chci vyridit|potrebuji vyridit|bydlim tady|pro mistni|pro chalupare|pro navstevniky|podnikam|doklady|hrbitov|formular|souhlas s vitanim|zadost|prihlas', '/zivotni-situace'),
    (r'akce|lampion|vylov|rozsviceni|myslivec|mikulas|koncert|trh|zabava|kalendar', '/akce'),
    (r'hlaseni|krizov|nepotece voda|sms', '/krizova-hlaseni'),
    (r'zpravy|aktualit|archiv cisel|e-mailem|poslechnout', '/aktuality'),
]


def navrhni(text, aktuality, deska, akce):
    n = norm(text)
    for a in aktuality:
        if norm(a['titulek']) == n or (len(n) > 12 and norm(a['titulek']).startswith(n)):
            return f"/aktuality/{a['slug']}"
    for d in deska:
        if norm(d['nazev']) == n or (len(n) > 12 and n in norm(d['nazev'])):
            return f"/uredni-deska/{d['id']}"
    for k in akce:
        if norm(k['nazev']) in n:
            return f"/akce#{k['slug']}"
    for vzor, trasa in PRAVIDLA:
        if re.search(vzor, n):
            return trasa
    return '/obecni-urad'


def main():
    aktuality = json.load(open(os.path.join(OBSAH, 'aktuality.json'), encoding='utf-8'))
    deska = json.load(open(os.path.join(OBSAH, 'uredni-deska.json'), encoding='utf-8'))['dokumenty']
    akce = json.load(open(os.path.join(OBSAH, 'akce.json'), encoding='utf-8'))
    tab = nacti_ts()
    for t in texty_odkazu():
        if t not in tab:
            tab[t] = navrhni(t, aktuality, deska, akce)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    telo = json.dumps(dict(sorted(tab.items())), ensure_ascii=False, indent=2)
    ts = ('/**\n * Kam vedou odkazy z návrhů šablon. Klíč je text odkazu (nebo aria-label), hodnota trasa webu.\n'
          ' * Čte ho design/generator/do-tsx.py; neznámý text převod zastaví. Tabulku upravuje člověk,\n'
          ' * odkazy_navrh.py jen doplní chybějící položky. Hodnota „#“ znamená odkaz z dat (vyplní šablona).\n */\n'
          f'export const ODKAZY: Record<string, string> = /* ODKAZY-ZACATEK */ {telo} /* ODKAZY-KONEC */\n')
    open(OUT, 'w', encoding='utf-8', newline='\n').write(ts)
    print('položek', len(tab))


if __name__ == '__main__':
    main()
