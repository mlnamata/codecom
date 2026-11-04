"""Převede těla šablon (bodies/*.html) na React komponenty v apps/web/src/sablony/<klic>/.

Spuštění: python design/generator/do-tsx.py [klic ...]

Pro každou šablonu zapíše:
  Hlavicka.tsx, Uvod.tsx, Paticka.tsx  komponenty (header, úvod s <main>, footer)
  styly.css                           BASE_CSS a css šablony s předponou .sablona-<klic>
  fonty.ts                            volání next/font/google
  index.ts                            export modulu šablony
  Interaktivni.tsx                    jen u interaktivních: kontext se stavem
  logika.ts                           jen u interaktivních a jen když chybí (pak se upravuje ručně)

Převod je deterministický (stejný vstup dá stejný výstup). Neznámý text odkazu převod zastaví.
Po převodu jsou TSX zdrojem pravdy; design/ zůstává jako návrh.
"""
import json, os, re, sys, unicodedata
from html.parser import HTMLParser

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from build import ZNAK, BASE_CSS, narrow_menu  # noqa: E402
from tpls import T  # noqa: E402
from tokeny import KLICE, INTERAKTIVNI, pisma  # noqa: E402

ROOT = os.path.normpath(os.path.join(HERE, '..', '..'))
WEB = os.path.join(ROOT, 'apps', 'web', 'src', 'sablony')
OBSAH = os.path.join(ROOT, 'obsah', 'javori-lhota')
FOTO = os.path.join(ROOT, 'design', 'obrazky', 'foto')

VOID = {'br', 'input', 'img', 'hr', 'meta', 'link', 'area', 'source', 'col', 'wbr'}
BEZ_MEZER = {'table', 'thead', 'tbody', 'tfoot', 'tr', 'ul', 'ol', 'dl', 'svg', 'g', 'defs', 'select', 'pattern'}
SVG_ATTR = {'viewbox': 'viewBox', 'preserveaspectratio': 'preserveAspectRatio', 'patterntransform': 'patternTransform',
            'patternunits': 'patternUnits', 'textlength': 'textLength', 'pathlength': 'pathLength'}
SVG_TAG = {'textpath': 'textPath', 'clippath': 'clipPath', 'lineargradient': 'linearGradient'}
ATTR = {'class': 'className', 'for': 'htmlFor', 'tabindex': 'tabIndex', 'readonly': 'readOnly',
        'onclick': 'onClick', 'onchange': 'onChange', 'maxlength': 'maxLength', 'autocomplete': 'autoComplete'}
BOOL = {'hidden', 'open', 'checked', 'disabled', 'required', 'readOnly', 'multiple', 'selected'}

POPISY_FOTEK = {
    'naves': 'Náves vesnice v podhůří Šumavy s barokním kostelem, starou lípou a roubenými domy, za nimi zalesněný kopec s rozhlednou.',
    'zvonice': 'Malá kamenná zvonice na návsi při východu slunce, orosená tráva a dřevěná lavička.',
    'studanka': 'Lesní studánka s dřevěnou stříškou v bukovém a smrkovém lese, mezi stromy svítí slunce.',
    'lipa': 'Stará lípa na návsi s kamenným křížem a nízkým dřevěným plotem v podvečer.',
    'majka': 'Stavění máje na vesnické slavnosti, stuhy a věnec, lidé jsou vidět zezadu.',
    'hnizdo': 'Malá venkovská škola s novým dřevěným hřištěm, na zemi podzimní listí.',
    'hranice': 'Starý žulový hraniční kámen na louce na česko-bavorské hranici na Šumavě, mlhavé ráno.',
    'vinice': 'Malý farmářský trh na návsi, dřevěné stánky s kozím sýrem, medem a chlebem.',
    'hreben': 'Zasněžený zalesněný hřeben v podhůří Šumavy s dřevěnou rozhlednou na vrcholu.',
    'rynek': 'Řada opravených roubených domů se šindelovými střechami na památkově chráněné návsi.',
    'radnice': 'Dvoupatrová budova obecního úřadu s omítnutou fasádou, červenou střechou a českou vlajkou.',
    'kolonada': 'Malý dřevěný altán se sloupy nad pramenem pod kaplí na zeleném svahu.',
    'mlyn': 'Starý vodní mlýn a pila u potoka ve vesnici, naskládané dřevo.',
    'hraz': 'Hráz kaprového rybníka se starými duby při podzimním výlovu, sítě a dřevěné kádě, mlhavé ráno.',
    'lupa': 'Starší žena zezadu čte na lavičce před domem tištěný obecní zpravodaj.',
    'kompas': 'Letecký pohled na malou vesnici s kostelem, rybníkem a poli v údolí na začátku léta.',
    'magistrat': 'Malé náměstí s radnicí za soumraku, teplé pouliční lampy a mírný déšť na dlažbě.',
    'zpravodaj': 'Hromádka vytištěných obecních zpravodajů a šálek kávy na dřevěném stole u okna.',
    'mikroregion': 'Široké údolí v podhůří Šumavy se čtyřmi vesničkami spojenými silničkami, podzim.',
    'urad': 'Upravená přepážka malého obecního úřadu se stojanem na formuláře a květinami, ranní světlo.',
}


# Řezy, které Google Fonts u rodiny nemá (návrh je žádá, prohlížeč použije nejbližší).
CHYBI_REZ = {'Alegreya Sans': ('600',)}


class ChybaPrevodu(Exception):
    pass


# ---------------------------------------------------------------- strom

class Uzel:
    def __init__(self, tag, attrs=None, parent=None):
        self.tag = tag
        self.attrs = list(attrs or [])
        self.children = []
        self.parent = parent

    def attr(self, name, default=None):
        for k, v in self.attrs:
            if k == name:
                return v
        return default

    def set_attr(self, name, value):
        for i, (k, _) in enumerate(self.attrs):
            if k == name:
                self.attrs[i] = (name, value)
                return
        self.attrs.append((name, value))

    def del_attr(self, name):
        self.attrs = [(k, v) for k, v in self.attrs if k != name]

    def iter(self):
        yield self
        for c in self.children:
            if isinstance(c, Uzel):
                yield from c.iter()

    def text(self):
        out = []
        for c in self.children:
            out.append(c if isinstance(c, str) else '' if isinstance(c, tuple) else c.text())
        return ''.join(out)

    def elements(self):
        return [c for c in self.children if isinstance(c, Uzel)]


class Parser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Uzel('#root')
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        n = Uzel(tag, [(k, v if v is not None else '') for k, v in attrs], self.cur)
        self.cur.children.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_startendtag(self, tag, attrs):
        n = Uzel(tag, [(k, v if v is not None else '') for k, v in attrs], self.cur)
        self.cur.children.append(n)

    def handle_endtag(self, tag):
        n = self.cur
        while n is not self.root and n.tag != tag:
            n = n.parent
        if n is self.root:
            raise ChybaPrevodu(f'neočekávaný konec </{tag}>')
        self.cur = n.parent

    def handle_data(self, data):
        self.cur.children.append(data)


def parse(html):
    p = Parser()
    p.feed(html)
    p.close()
    return p.root


# ---------------------------------------------------------------- pomocné

def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(ch for ch in s if unicodedata.category(ch) != 'Mn')
    return re.sub(r'\s+', ' ', s).strip()


def camel(name):
    return re.sub(r'-([a-z])', lambda m: m.group(1).upper(), name)


def js_str(s):
    return json.dumps(s, ensure_ascii=False)


MUSTACHE = re.compile(r'\{\{\s*([^}]+?)\s*\}\}')


class Rozsah:
    """Jména proměnných smyček (sc-for as) nad hodnotami `v`."""

    def __init__(self, loops=()):
        self.loops = set(loops)

    def expr(self, e):
        e = e.strip()
        head = re.split(r'[.\[]', e, maxsplit=1)[0]
        return e if head in self.loops else f'v.{e}'

    def plus(self, name):
        return Rozsah(self.loops | {name})


def hodnota_attr(value, r):
    """Hodnota atributu: `{{x}}` -> výraz, smíšený text -> šablonový řetězec, jinak řetězec."""
    m = MUSTACHE.fullmatch(value.strip())
    if m:
        return '{' + r.expr(m.group(1)) + '}'
    if MUSTACHE.search(value):
        parts = []
        pos = 0
        for mm in MUSTACHE.finditer(value):
            parts.append(value[pos:mm.start()].replace('`', '\\`').replace('${', '\\${'))
            parts.append('${' + r.expr(mm.group(1)) + '}')
            pos = mm.end()
        parts.append(value[pos:].replace('`', '\\`'))
        return '{`' + ''.join(parts) + '`}'
    return js_str(value)


def styl(value, r, pisma_map):
    out = []
    for decl in split_decls(value):
        if ':' not in decl:
            continue
        k, v = decl.split(':', 1)
        k, v = k.strip(), v.strip()
        if not k:
            continue
        if k == 'font-family':
            v = font_vars(v, pisma_map)
        key = js_str(k) if k.startswith('--') else camel(k)
        out.append(f'{key}: {hodnota_styl(v, r)}')
    return '{{ ' + ', '.join(out) + ' }}'


def hodnota_styl(v, r):
    m = MUSTACHE.fullmatch(v)
    if m:
        return r.expr(m.group(1))
    if MUSTACHE.search(v):
        return hodnota_attr(v, r)[1:-1]
    return js_str(v)


def split_decls(s):
    out, depth, cur = [], 0, ''
    i = 0
    while i < len(s):
        ch = s[i]
        if s.startswith('{{', i):
            j = s.index('}}', i) + 2
            cur += s[i:j]
            i = j
            continue
        if ch == '(':
            depth += 1
        elif ch == ')':
            depth -= 1
        if ch == ';' and depth == 0:
            out.append(cur)
            cur = ''
        else:
            cur += ch
        i += 1
    if cur.strip():
        out.append(cur)
    return out


def font_vars(v, pisma_map):
    def rep(m):
        name = m.group(1)
        return f'var({pisma_map[name]})' if name in pisma_map else m.group(0)
    return re.sub(r"'([^']+)'", rep, v)


def klic_odkazu_uzlu(n):
    """Stejný klíč jako odkazy_navrh.py: text bez značek (mezery sloučené), jinak aria-label."""
    def txt(x):
        if isinstance(x, str):
            return x
        if isinstance(x, tuple):
            return ''
        if x.tag == 'znak-obce':
            return ''
        return ' ' + ''.join(txt(c) for c in x.children) + ' '
    t = re.sub(r'\s+', ' ', ''.join(txt(c) for c in n.children)).strip()
    lab = n.attr('aria-label')
    if lab and (not t or '{{' in t):
        t = lab
    return t


# ---------------------------------------------------------------- data na úvodu

MESICE = ['ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince']


def formaty_dne(den):
    """Varianty, jak šablony píšou den, a odpovídající formátovací funkce."""
    y, m, d = (int(x) for x in den.split('-'))
    return {
        f'{d}. {m}. {y}': 'denCely',
        f'{d}. {m}.': 'denKratce',
        f'{d}. {MESICE[m - 1]}': 'denSlovem',
        f'{d}. {MESICE[m - 1]} {y}': 'denSlovemRok',
        str(d): 'denCislo',
        f'{d}.': 'denTecka',
    }


def nacti_data():
    j = lambda f: json.load(open(os.path.join(OBSAH, f), encoding='utf-8'))
    def den_okamziku(iso):
        # okamžiky jsou UTC, Praha je v listopadu UTC+1; hodina navíc den nezmění kromě pozdního večera
        from datetime import datetime, timedelta
        t = datetime.fromisoformat(iso.replace('Z', '+00:00')) + timedelta(hours=1)
        return t.strftime('%Y-%m-%d')
    akt = [{'titulek': a['titulek'], 'perex': a['perex'], 'den': den_okamziku(a['publikovano'])} for a in j('aktuality.json')]
    deska = [{'titulek': d['nazev'], 'perex': d['anotace'], 'den': d['vyvesenoOd'], 'den2': d['vyvesenoDo']} for d in j('uredni-deska.json')['dokumenty']]
    akce = [{'titulek': a['nazev'], 'perex': a['popis'], 'den': a['den'], 'misto': a['misto']} for a in j('akce.json')]
    rozhlas = [{'titulek': r['titulek'], 'perex': r['text'], 'den': den_okamziku(r['cas'])} for r in j('rozhlas.json')]
    return {'aktuality': akt, 'deska': deska, 'akce': akce, 'rozhlas': rozhlas}


POLE = {
    'aktuality': {'titulek': 'titulek', 'perex': 'perex', 'den': 'publikovanoDen'},
    'deska': {'titulek': 'nazev', 'perex': 'anotace', 'den': 'vyvesenoOd', 'den2': 'vyvesenoDo'},
    'akce': {'titulek': 'nazev', 'perex': 'popis', 'den': 'den', 'misto': 'misto'},
    'rozhlas': {'titulek': 'titulek', 'perex': 'text', 'den': 'casDen'},
}


def text_uzly(n):
    """(rodič, index, text) pro neprázdné textové uzly v pořadí dokumentu."""
    out = []
    for i, c in enumerate(n.children):
        if isinstance(c, str):
            if c.strip():
                out.append((n, i, c))
        else:
            out.extend(text_uzly(c))
    return out


def najdi_polozku(uzel, data):
    """Který záznam dat odpovídá položce seznamu (podle titulku v textu)."""
    texty = [norm(t) for _, _, t in text_uzly(uzel)]
    for druh, polozky in data.items():
        for idx, p in enumerate(polozky):
            t = norm(p['titulek'])
            for x in texty:
                if x and (x == t or (len(x) >= 16 and (t.startswith(x) or x.startswith(t)))):
                    return druh, idx
    return None


def napoj_seznamy(root, data, log):
    """Najde opakované položky (aktuality, deska, akce, rozhlas) a nahradí je smyčkou nad daty."""
    seznamy = []
    for n in list(root.iter()):
        if n.tag.startswith('sc-') or n.tag in ('svg', 'header', 'footer', 'nav'):
            continue
        if any(a.tag.startswith('sc-') or a.tag in ('header', 'footer', 'nav') for a in predci(n)):
            continue
        deti = n.elements()
        if len(deti) < 2:
            continue
        tagy = {d.tag for d in deti}
        if len(tagy) != 1:
            continue
        nalezy = [najdi_polozku(d, data) for d in deti]
        if any(x is None for x in nalezy):
            continue
        druhy = {x[0] for x in nalezy}
        if len(druhy) != 1:
            continue
        druh = druhy.pop()
        vazby = vazby_vzoru(deti, [data[druh][x[1]] for x in nalezy], druh)
        if vazby is None:
            log.append(f'  seznam {druh} ({len(deti)} položek): proměnný text nejde napojit, zůstává statický')
            continue
        seznamy.append((n, druh, len(deti), vazby))
    for n, druh, pocet, vazby in seznamy:
        vzor = n.elements()[0]
        n.children = [Uzel('#seznam', [('druh', druh), ('pocet', str(pocet))], n)]
        n.children[0].children = [vzor]
        vzor.parent = n.children[0]
        for (rodic, idx), vyraz in vazby.items():
            rodic.children[idx] = ('#vyraz', vyraz)
        log.append(f'  seznam {druh}: {pocet} položek z dat')
    return len(seznamy)


def predci(n):
    p = n.parent
    while p is not None:
        yield p
        p = p.parent


def vazby_vzoru(deti, zaznamy, druh):
    """Pro textové uzly prvního dítěte najde pole dat. Uzly, které se mezi sourozenci liší, musí jít napojit."""
    prvni = text_uzly(deti[0])
    ostatni = [text_uzly(d) for d in deti[1:]]
    if any(len(o) != len(prvni) for o in ostatni):
        return None
    vazby = {}
    for i, (rodic, idx, t) in enumerate(prvni):
        lisi_se = any(norm(o[i][2]) != norm(t) for o in ostatni)
        v = vyraz_pole(t, zaznamy[0], druh)
        if v:
            # ověř, že stejná vazba sedí i na sourozence
            if all(vyraz_pole(o[i][2], z, druh) == v for o, z in zip(ostatni, zaznamy[1:])):
                vazby[(rodic, idx)] = v
                continue
            if lisi_se:
                return None
        elif lisi_se:
            return None
    return vazby if vazby else None


def vyraz_pole(text, z, druh):
    t = norm(text)
    pole = POLE[druh]
    if t == norm(z['titulek']) or (len(t) >= 16 and norm(z['titulek']).startswith(t)):
        return f"x.{pole['titulek']}"
    if t == norm(z['perex']):
        return f"x.{pole['perex']}"
    if 'misto' in z and t == norm(z['misto']):
        return 'x.misto'
    for klic in ('den', 'den2'):
        if z.get(klic):
            for vzor, fn in formaty_dne(z[klic]).items():
                if t == norm(vzor) and fn not in ('denCislo', 'denTecka'):
                    return f"{fn}(x.{pole[klic]})"
    return None


# ---------------------------------------------------------------- výpis JSX

class Vystup:
    def __init__(self, klic, odkazy, pisma_map, chybejici):
        self.klic = klic
        self.odkazy = odkazy
        self.pisma_map = pisma_map
        self.chybejici = chybejici
        self.uses = set()
        self.foto_hotovo = False
        self.seznamy = {}

    def deti(self, n, r, ind):
        out = []
        kids = n.children
        for i, c in enumerate(kids):
            if isinstance(c, tuple) and c[0] == '#vyraz':
                out.append(ind + '{' + c[1] + '}')
                self.uses.add(c[1].split('(')[0] if '(' in c[1] else '')
                continue
            if isinstance(c, str):
                s = self.text(c, n, i, r)
                if s:
                    out.append(ind + s)
                continue
            out.append(self.prvek(c, r, ind))
        return out

    def text(self, c, parent, i, r):
        if not c.strip():
            if parent.tag in BEZ_MEZER or parent.tag.startswith('sc-') or parent.tag in ('#root', '#seznam'):
                return ''
            if i == 0 or i == len(parent.children) - 1:
                return ''
            return "{' '}"
        s = re.sub(r'[ \t\r\n]+', ' ', c)
        s = re.sub(r'[\w.+-]+@javorilhota\.cz', '[E-MAIL]', s)
        if i == 0:
            s = s.lstrip(' ')
        if i == len(parent.children) - 1:
            s = s.rstrip(' ')
        if MUSTACHE.search(s):
            parts = []
            pos = 0
            for m in MUSTACHE.finditer(s):
                if m.start() > pos:
                    parts.append('{' + js_str(s[pos:m.start()]) + '}')
                parts.append('{' + r.expr(m.group(1)) + '}')
                pos = m.end()
            if pos < len(s):
                parts.append('{' + js_str(s[pos:]) + '}')
            return ''.join(parts)
        if re.search(r'[{}<>&"\']|^ | $|\u00a0', s):
            return '{' + js_str(s) + '}'
        return s

    def prvek(self, n, r, ind):
        t = n.tag
        if t == 'znak-obce':
            self.uses.add('ZnakObce')
            return f"{ind}<ZnakObce velikost={{{n.attr('velikost')}}} />"
        if t == 'krizovy-banner':
            return f'{ind}{{banner}}'
        if t == 'foto-obce':
            # Fotografie obce vložená do rozvržení šablony. Bez fotky (foto=0) se nevykreslí nic.
            self.foto_hotovo = True
            self.uses.add('Foto')
            st = n.attr('style') or ''
            return f'{ind}{{foto ? <Foto sablona="{self.klic}" styl={styl(st, r, self.pisma_map)} /> : null}}'
        if t == '#hlavicka':
            return f'{ind}<Hlavicka />'
        if t == '#paticka':
            return f'{ind}<Paticka />'
        if t == '#seznam':
            druh, pocet = n.attr('druh'), n.attr('pocet')
            self.uses.add('seznam')
            inner = self.prvek(n.children[0], r.plus('x'), ind + '    ')
            inner = inner.replace(f'{ind}    <', f'{ind}    <', 1)
            # klíč na kořen vzoru
            inner = re.sub(r'^(\s*<[A-Za-z0-9]+)', r'\1 key={x.id}', inner, count=1)
            return f'{ind}{{data.{druh}.slice(0, {pocet}).map((x) => (\n{inner}\n{ind}))}}'
        if t == 'sc-if':
            cond = r.expr(MUSTACHE.fullmatch(n.attr('value').strip()).group(1))
            body = '\n'.join(self.deti(n, r, ind + '    '))
            return f'{ind}{{{cond} ? (\n{ind}  <>\n{body}\n{ind}  </>\n{ind}) : null}}'
        if t == 'sc-for':
            lst = r.expr(MUSTACHE.fullmatch(n.attr('list').strip()).group(1))
            var = n.attr('as')
            self.seznamy[var] = MUSTACHE.fullmatch(n.attr('list').strip()).group(1).split('.')[-1]
            self.uses.add('Fragment')
            body = '\n'.join(self.deti(n, r.plus(var), ind + '    '))
            return f'{ind}{{{lst}.map(({var}, i) => (\n{ind}  <Fragment key={{i}}>\n{body}\n{ind}  </Fragment>\n{ind}))}}'
        if t == 'svg' and n.attr('data-foto') == '1':
            self.foto_hotovo = True
            self.uses.add('Foto')
            n.del_attr('data-foto')
            st = n.attr('style') or ''
            svg = self.prvek_raw(n, r, ind + '  ')
            return (f'{ind}{{foto ? (\n{ind}  <Foto sablona="{self.klic}" styl={styl(st, r, self.pisma_map)} />\n'
                    f'{ind}) : (\n{svg}\n{ind})}}')
        return self.prvek_raw(n, r, ind)

    def prvek_raw(self, n, r, ind):
        t = SVG_TAG.get(n.tag, n.tag)
        attrs = self.atributy(n, r)
        a = (' ' + ' '.join(attrs)) if attrs else ''
        if n.tag in VOID:
            return f'{ind}<{t}{a} />'
        kids = self.deti(n, r, ind + '  ')
        if not kids:
            return f'{ind}<{t}{a}></{t}>'
        if len(kids) == 1 and '\n' not in kids[0] and len(kids[0].strip()) < 80 and not kids[0].strip().startswith('<'):
            return f'{ind}<{t}{a}>{kids[0].strip()}</{t}>'
        return f'{ind}<{t}{a}>\n' + '\n'.join(kids) + f'\n{ind}</{t}>'

    def atributy(self, n, r):
        out = []
        ma_onchange = n.attr('onchange') is not None
        for k, v in n.attrs:
            if k.startswith('hint-') or k == 'onsubmit':
                continue
            if k == 'style':
                out.append('style=' + styl(v, r, self.pisma_map))
                continue
            if k == 'href' and v == '#':
                out.append('href=' + self.href(n, r))
                continue
            name = SVG_ATTR.get(k) or ATTR.get(k)
            if not name:
                name = k if k.startswith('aria-') or k.startswith('data-') else camel(k)
            if n.tag == 'input' and name == 'value' and not ma_onchange and n.attr('readonly') is None:
                name = 'defaultValue'
            if name in BOOL and v == '':
                out.append(name)
                continue
            out.append(f'{name}={hodnota_attr(v, r)}')
        if n.tag == 'form' and n.attr('role') == 'search':
            out += ['action="/hledat"', 'method="get"']
        if n.tag == 'input' and n.attr('type') == 'search' and n.attr('name') is None:
            out.append('name="q"')
        if n.tag == 'main':
            out = ['id="obsah"', 'tabIndex={-1}'] + [x for x in out if not x.startswith('id=')]
        return out

    def href(self, n, r):
        if 'x' in r.loops:
            # odkaz uvnitř položky napojené na data vede na detail položky
            return '{x.href}'
        key = klic_odkazu_uzlu(n)
        if key not in self.odkazy:
            self.chybejici.add(key)
            return '"#"'
        cil = self.odkazy[key]
        if cil == '#':
            # odkaz z dat smyčky: položka musí mít pole href
            m = MUSTACHE.search(n.text()) or MUSTACHE.search(n.attr('aria-label') or '')
            if m:
                var = re.split(r'[.\[]', m.group(1).strip(), maxsplit=1)[0]
                if var in r.loops and m.group(1).strip() == var:
                    # holý text položky: adresa je ve zvláštním poli <seznam>Odkazy
                    return '{v.' + self.seznamy.get(var, var) + "Odkazy[i] ?? '#'}"
                if var in r.loops:
                    return '{' + var + '.href}'
            return '{v.href}'
        if r.loops & {'x'}:
            # odkaz uvnitř položky napojené na data vede na detail položky
            return '{x.href}'
        return js_str(cil)


# ---------------------------------------------------------------- CSS

def css_s_predponou(css, klic):
    sel = f'.sablona-{klic}'
    out = []
    i = 0
    css = css.strip()
    while i < len(css):
        while i < len(css) and css[i].isspace():
            i += 1
        if i >= len(css):
            break
        if css.startswith('@media', i) or css.startswith('@supports', i):
            j = css.index('{', i)
            head = css[i:j].strip()
            depth, k = 1, j + 1
            while depth:
                if css[k] == '{':
                    depth += 1
                elif css[k] == '}':
                    depth -= 1
                k += 1
            inner = css[j + 1:k - 1]
            out.append(head + ' {\n' + css_s_predponou(inner, klic) + '\n}')
            i = k
            continue
        j = css.find('{', i)
        if j < 0:
            break
        k = css.index('}', j)
        selectors = css[i:j].strip()
        body = css[j + 1:k].strip()
        i = k + 1
        if not selectors:
            continue
        nove = []
        for s in selectors.split(','):
            s = s.strip()
            if s == 'body' or s.startswith('.spec'):
                continue
            if s.startswith('.site'):
                s = sel + s[len('.site'):]
            else:
                s = f'{sel} {s}'
            nove.append(s)
        if nove:
            out.append(',\n'.join(nove) + ' { ' + body + ' }')
        while i < len(css) and css[i] in ' \n\t':
            i += 1
    return '\n'.join(out)


# ---------------------------------------------------------------- písma

def font_ident(rodina):
    return rodina.replace(' ', '_')


def font_var(rodina):
    return '--font-' + re.sub(r'[^a-z0-9]+', '-', rodina.lower()).strip('-')


def fonty_ts(t):
    rodiny = pisma(t['fonts'])
    imp = ', '.join(sorted({font_ident(p['rodina']) for p in rodiny}))
    lines = [f"import {{ {imp} }} from 'next/font/google'", '']
    names = []
    for p in rodiny:
        ident = font_ident(p['rodina'])
        var = 'f' + re.sub(r'[^A-Za-z0-9]', '', p['rodina'])
        osy = [o for o in p['osy'] if o not in ('wght', 'ital')]
        opts = ["subsets: ['latin', 'latin-ext']", f"variable: '{font_var(p['rodina'])}'", "display: 'swap'"]
        if 'wght' in p['osy'] and '..' in p['hodnoty'].split(',')[p['osy'].index('wght')]:
            pass  # proměnné písmo, řezy omezují styly (nejvýš 600)
        elif 'wght' in p['osy']:
            vahy = [w for w in p['hodnoty'].split(',')[p['osy'].index('wght')].split(';') if w not in CHYBI_REZ.get(p['rodina'], ())]
            opts.append('weight: [' + ', '.join(f"'{w}'" for w in vahy) + ']')
        else:
            opts.append("weight: '400'")
        if osy:
            opts.append('axes: [' + ', '.join(f"'{o}'" for o in osy) + ']')
        lines.append(f'const {var} = {ident}({{ {", ".join(opts)} }})')
        names.append(var)
    lines += ['', '/** Třídy s CSS proměnnými písem šablony (self-hostovaná při buildu, za běhu se Google nevolá). */',
              f"export const tridyPisem = [{', '.join(n + '.variable' for n in names)}].join(' ')", '']
    return '\n'.join(lines)


# ---------------------------------------------------------------- šablona

def predzpracuj(key):
    body = open(os.path.join(HERE, 'bodies', key + '.html'), encoding='utf-8').read()
    body = re.sub(r'\[\[ZNAK (\d+)\]\]', lambda m: f'<znak-obce velikost="{m.group(1)}"></znak-obce>', body)
    body = narrow_menu(body)
    body = re.sub(r'>([^<]+)<', lambda mm: '>' + re.sub(r'(?<![\w{])([AaIiKkOoSsUuVvZz]) (?=\S)', '\\1\u00a0', mm.group(1)) + '<', body)
    body = body.replace('[[ALERT]]', '<krizovy-banner></krizovy-banner>')
    return body


def oznac_foto(root):
    """Místo pro fotografii: značka <foto-obce>, SVG s data-foto="1" v předloze, jinak
    první dekorativní SVG mimo hlavičku široké aspoň 600 jednotek (úvodní ilustrace)."""
    for n in root.iter():
        if n.tag == 'foto-obce' or n.attr('data-foto') == '1':
            return True
    for n in root.iter():
        if n.tag == 'header':
            continue
        if n.tag == 'svg' and n.attr('aria-hidden') == 'true' and not any(a.tag == 'header' for a in predci(n)):
            vb = (n.attr('viewbox') or '').split()
            if len(vb) == 4 and float(vb[2]) >= 600:
                n.set_attr('data-foto', '1')
                return True
    return False


def vyjmi(root, tag, nahrada):
    for n in root.iter():
        for i, c in enumerate(n.children):
            if isinstance(c, Uzel) and c.tag == tag:
                n.children[i] = Uzel(nahrada, [], n)
                c.parent = None
                return c
    raise ChybaPrevodu(f'v těle chybí <{tag}>')


def ma_mustache(n):
    if isinstance(n, str):
        return bool(MUSTACHE.search(n))
    if n.tag.startswith('sc-'):
        return True
    return any(MUSTACHE.search(v or '') for _, v in n.attrs) or any(ma_mustache(c) for c in n.children)


def hlavicka_tema(header):
    """Pozadí hlavičky na vnitřních stránkách: hlavička stojí v úvodu na ilustraci, tady potřebuje vlastní pás."""
    # Hlavička, jejíž přímé části mají vlastní pozadí, si barvy řídí sama.
    if any('background' in (c.attr('style') or '') for c in header.elements()):
        return 'bg'
    s = json.dumps([v for n in header.iter() for _, v in n.attrs])
    if 'var(--on-deep)' in s:
        return 'deep'
    if 'var(--on-primary)' in s and 'var(--ink)' not in s:
        return 'primary'
    return 'bg'


def komponenta(nazev, telo_jsx, out, interaktivni, props, imports_extra):
    client = interaktivni and ('v.' in telo_jsx or 'v)' in telo_jsx)
    lines = []
    if client:
        lines += ["'use client'", '']
    imp = []
    if 'Fragment' in out.uses and ('<Fragment' in telo_jsx):
        imp.append("import { Fragment } from 'react'")
    if 'ReactNode' in props:
        imp.append("import type { ReactNode } from 'react'")
    if '<ZnakObce' in telo_jsx:
        imp.append("import { ZnakObce } from '../sdilene/ZnakObce'")
    if '<Foto ' in telo_jsx:
        imp.append("import { Foto } from '../sdilene/Foto'")
    fmt = sorted({f for f in ('denCely', 'denKratce', 'denSlovem', 'denSlovemRok') if f + '(' in telo_jsx})
    if fmt:
        imp.append(f"import {{ {', '.join(fmt)} }} from '../sdilene/format'")
    if 'data.' in telo_jsx:
        imp.append("import type { DataUvodu } from '../sdilene/typy'")
    if client:
        imp.append("import { useHodnoty } from './Interaktivni'")
    imp += imports_extra
    lines += sorted(set(imp)) + ['']
    lines.append(f'export function {nazev}({props}) {{')
    if client:
        lines.append('  const v = useHodnoty()')
    lines.append('  return (')
    lines.append(telo_jsx)
    lines.append('  )')
    lines.append('}')
    lines.append('')
    return '\n'.join(lines)


def interaktivni_tsx(klic):
    return f"""'use client'

// Vygenerováno skriptem design/generator/do-tsx.py. Logika je v logika.ts (ručně upravená z tpls.py).
import {{ createContext, useContext, useState, type ReactNode }} from 'react'
import type {{ Paleta }} from '@codekom/tokeny'
import type {{ DataUvodu }} from '../sdilene/typy'
import {{ hodnoty, POCATECNI_STAV, type Hodnoty, type Stav }} from './logika'

const Kontext = createContext<Hodnoty | null>(null)

/** Drží stav interaktivní šablony {klic} pro hlavičku, úvod i patičku. */
export function StavSablony({{ paleta, data, children }}: {{ paleta: Paleta; data: DataUvodu; children: ReactNode }}) {{
  const [stav, nastavStav] = useState<Stav>(POCATECNI_STAV)
  const self = {{ state: stav, setState: (z: Partial<Stav>) => nastavStav((s) => ({{ ...s, ...z }})) }}
  const c = {{ ...paleta, x: paleta.extra }}
  const v = hodnoty(self, c, data)
  const fs = 'fs' in v ? String(v.fs) : null
  return <Kontext.Provider value={{v}}>{{fs ? <div style={{{{ fontSize: fs }}}}>{{children}}</div> : children}}</Kontext.Provider>
}}

export function useHodnoty(): Hodnoty {{
  const v = useContext(Kontext)
  if (!v) throw new Error('Šablona {klic} potřebuje StavSablony')
  return v
}}
"""


def logika_ts(t):
    stav = t.get('state', '{}')
    js = t.get('js', 'return {};')
    js = '\n'.join('  ' + l.strip() if l.strip() else '' for l in js.split('\n'))
    return f"""// Výchozí podoba vygenerovaná z tpls.py. Soubor se dál upravuje ručně (typy, data ze serveru).
import type {{ Paleta }} from '@codekom/tokeny'
import type {{ DataUvodu }} from '../sdilene/typy'

export const POCATECNI_STAV = {stav}
export type Stav = typeof POCATECNI_STAV

export interface Self {{
  state: Stav
  setState: (z: Partial<Stav>) => void
}}

export type C = Paleta & {{ x: Record<string, string> }}

export function hodnoty(self: Self, c: C, data: DataUvodu) {{
  void data
{js}
}}

export type Hodnoty = ReturnType<typeof hodnoty>
"""


def nacti_odkazy():
    s = open(os.path.join(WEB, 'sdilene', 'odkazy.ts'), encoding='utf-8').read()
    m = re.search(r'/\* ODKAZY-ZACATEK \*/([\s\S]*?)/\* ODKAZY-KONEC \*/', s)
    return json.loads(m.group(1))


def zapis(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(text)


def preved(key, odkazy, data, chybejici, log):
    t = T[key]
    klic = KLICE[key]
    interaktivni = klic in INTERAKTIVNI
    rodiny = pisma(t['fonts'])
    pisma_map = {p['rodina']: font_var(p['rodina']) for p in rodiny}

    root = parse(predzpracuj(key))
    header = vyjmi(root, 'header', '#hlavicka')
    footer = vyjmi(root, 'footer', '#paticka')
    if not oznac_foto(root):
        log.append('  bez úvodní ilustrace pro fotografii')
    napoj_seznamy(root, data, log)

    out = Vystup(klic, odkazy, pisma_map, chybejici)
    r = Rozsah()
    hdr = out.prvek(header, r, '    ')
    out_f = Vystup(klic, odkazy, pisma_map, chybejici)
    ftr = out_f.prvek(footer, r, '    ')
    out_u = Vystup(klic, odkazy, pisma_map, chybejici)
    uvod = '\n'.join(out_u.deti(root, r, '      '))
    uvod = '    <>\n' + uvod + '\n    </>'

    d = os.path.join(WEB, klic)
    hlav = '/** Vygenerováno skriptem design/generator/do-tsx.py z bodies/%s.html. */\n' % key
    zapis(os.path.join(d, 'Hlavicka.tsx'), komponenta('Hlavicka', hdr, out, interaktivni, '', []).replace("'use client'\n", "'use client'\n" + hlav, 1) if interaktivni and 'v.' in hdr else hlav + komponenta('Hlavicka', hdr, out, interaktivni, '', []))
    zapis(os.path.join(d, 'Paticka.tsx'), (komponenta('Paticka', ftr, out_f, interaktivni, '', []).replace("'use client'\n", "'use client'\n" + hlav, 1)) if interaktivni and 'v.' in ftr else hlav + komponenta('Paticka', ftr, out_f, interaktivni, '', []))
    props = '{ banner, data, foto }: { banner: ReactNode; data: DataUvodu; foto: boolean }'
    if 'data.' not in uvod:
        props = '{ banner, foto }: { banner: ReactNode; foto: boolean }'
    if not out_u.foto_hotovo:
        props = props.replace(', foto }', ' }').replace('; foto: boolean', '')
    extra = ["import { Hlavicka } from './Hlavicka'", "import { Paticka } from './Paticka'"]
    uvod_ts = komponenta('Uvod', uvod, out_u, interaktivni, props, extra)
    if interaktivni and 'v.' in uvod:
        uvod_ts = uvod_ts.replace("'use client'\n", "'use client'\n" + hlav, 1)
    else:
        uvod_ts = hlav + uvod_ts
    zapis(os.path.join(d, 'Uvod.tsx'), uvod_ts)

    css = BASE_CSS + '\n' + t.get('css', '')
    zapis(os.path.join(d, 'styly.css'), f'/* Vygenerováno skriptem design/generator/do-tsx.py z build.py a tpls.py. */\n{css_s_predponou(css, klic)}\n')
    zapis(os.path.join(d, 'fonty.ts'), '// Vygenerováno skriptem design/generator/do-tsx.py z tpls.py.\n' + fonty_ts(t))

    family = font_vars(t['family'], pisma_map)
    tema = hlavicka_tema(header)
    idx = [
        '// Vygenerováno skriptem design/generator/do-tsx.py.',
        "import './styly.css'",
        "import type { ModulSablony } from '../sdilene/typy'",
        "import { tridyPisem } from './fonty'",
        "import { Hlavicka } from './Hlavicka'",
        "import { Paticka } from './Paticka'",
        "import { Uvod } from './Uvod'",
    ]
    if interaktivni:
        idx.append("import { StavSablony } from './Interaktivni'")
    idx += ['', 'const modul: ModulSablony = {',
            f"  klic: '{klic}',", '  tridyPisem,', f'  pismo: {js_str(family)},',
            f"  temaHlavicky: '{tema}',", '  Hlavicka,', '  Paticka,',
            f'  Uvod: Uvod as ModulSablony[\'Uvod\'],',
            f"  foto: {'true' if out_u.foto_hotovo else 'false'},"]
    if interaktivni:
        idx.append('  Stav: StavSablony,')
    idx += ['}', '', 'export default modul', '']
    zapis(os.path.join(d, 'index.ts'), '\n'.join(idx))

    if interaktivni:
        zapis(os.path.join(d, 'Interaktivni.tsx'), interaktivni_tsx(klic))
        lp = os.path.join(d, 'logika.ts')
        if not os.path.exists(lp):
            zapis(lp, logika_ts(t))
            log.append('  logika.ts založen, upravit ručně')
    foto = os.path.join(FOTO, f"sablona-{t['num']}-{klic}.webp")
    if out_u.foto_hotovo and not os.path.exists(foto):
        log.append(f'  varování: chybí fotka {os.path.relpath(foto, ROOT)}, zůstane ilustrace')
    return klic, out_u.foto_hotovo


def registr(klice, s_fotem):
    lines = ['// Vygenerováno skriptem design/generator/do-tsx.py. Každá šablona se načítá zvlášť,',
             '// aby se do stránky dostala jen písma a styly aktivní šablony.',
             "import type { ModulSablony } from './sdilene/typy'", '',
             'export const NACITANI: Record<string, () => Promise<{ default: ModulSablony }>> = {']
    for k in klice:
        lines.append(f"  {k}: () => import('./{k}'),")
    lines += ['}', '', 'export async function nactiSablonu(klic: string): Promise<ModulSablony> {',
              '  const nacti = NACITANI[klic] ?? NACITANI.naves',
              "  if (!nacti) throw new Error('Chybí šablona naves')",
              '  return (await nacti()).default', '}', '']
    zapis(os.path.join(WEB, 'index.ts'), '\n'.join(lines))
    popisy = '// Vygenerováno skriptem design/generator/do-tsx.py.\n/** Popisný alt text fotografií úvodu (podle zadání v design/obrazky/prompty.txt). */\nexport const POPISY_FOTEK: Record<string, string> = ' + json.dumps(POPISY_FOTEK, ensure_ascii=False, indent=2) + '\n'
    zapis(os.path.join(WEB, 'sdilene', 'popisy-fotek.ts'), popisy)
    zapis(os.path.join(WEB, 'foto.ts'), '// Vygenerováno skriptem design/generator/do-tsx.py.\n'
          '/** Šablony s úvodní ilustrací, kterou může nahradit fotografie. */\n'
          'export const FOTO_SABLON: ReadonlySet<string> = new Set(' + json.dumps(s_fotem) + ')\n')


def main(argv):
    odkazy = nacti_odkazy()
    data = nacti_data()
    keys = [k for k, v in KLICE.items() if not argv or v in argv or k in argv]
    chybejici = set()
    s_fotem = []
    for key in keys:
        log = []
        klic, ma_foto = preved(key, odkazy, data, chybejici, log)
        if ma_foto:
            s_fotem.append(klic)
        print(f'{klic}:')
        for l in log:
            print(l)
    if not argv:
        registr(list(KLICE.values()), s_fotem)
    if chybejici:
        print('Neznámé texty odkazů (doplň je do apps/web/src/sablony/sdilene/odkazy.ts):', file=sys.stderr)
        for k in sorted(chybejici):
            print('  ' + k, file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main(sys.argv[1:])
