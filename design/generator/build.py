"""Assemble the 20 Javoří Lhota template artboards.
Shared: palette panel (3 colour variants + 12 swatches with contrast), crisis banner (USWDS site alert / GOV.UK notification
banner / gov.cz infobar), narrow menu, obecní znak. Bodies come from bodies/<key>.html.
Design rules: unslop by Damir Sokolovsky (@heydamir), CC BY 4.0 – weights 400–600, one accent, quiet chrome, 4px grid."""
import json, os, re, sys
from palettes import PAL, K
from tpls import T

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'prototypy')

ZNAK = ('<svg width="{w}" height="{h}" viewBox="0 0 40 48" aria-hidden="true" style="flex: 0 0 auto">'
        '<path d="M2 2h36v20c0 12-8 20-18 24C10 42 2 34 2 22z" fill="#2E6B3F"></path>'
        '<path d="M20 5l2.5 5.5 4-2-1 6 5-1.5-2.5 5 3.5 1.5-6 3 1 3.5-5-1V31h-3v-6l-5 1 1-3.5-6-3 3.5-1.5-2.5-5 5 1.5-1-6 4 2z" fill="#E2B33C"></path>'
        '<path d="M10 37c2.2-1.6 4.4-1.6 6.7 0s4.4 1.6 6.7 0 4.4-1.6 6.6 0" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round"></path></svg>')

BASE_CSS = """body{margin:0;background:#ECECE8}
*{box-sizing:border-box}
.site a{color:var(--link)}
.site a:hover{color:var(--ink)}
.site :focus-visible{outline:3px solid var(--link);outline-offset:2px}
.site .deep :focus-visible{outline-color:var(--on-deep)}
.site .on-primary :focus-visible{outline-color:var(--on-primary)}
.site .deep .on-light :focus-visible{outline-color:var(--link)}
.site .alert :focus-visible{outline-color:currentColor}
.spec :focus-visible{outline:3px solid #1A1A18;outline-offset:2px}
.site h1,.site h2,.site h3,.site h4{line-height:1.2;font-weight:500}
.site strong,.site b,.site th{font-weight:600}
.site footer a:not([style*="padding"]),.site nav a:not([style*="padding"]),.site td a,.site dd a,.site .hit{display:inline-block;padding-block:max(0px,calc((44px - 1lh) / 2));margin-block:min(0px,calc((1lh - 44px) / 2))}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.nav-narrow{display:none}
@media (max-width:767.98px){
.nav-wide{display:none!important}
.nav-narrow{display:block;margin-left:auto}
.nav-narrow[open]{flex-basis:100%}
.nav-narrow>summary{list-style:none;display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 16px;border:1px solid currentColor;border-radius:8px;font-weight:500;cursor:pointer}
.nav-narrow>summary::-webkit-details-marker{display:none}
.nav-narrow nav{display:flex;flex-direction:column;padding:8px 0 4px}
.nav-narrow nav a{margin-block:0;padding-block:10px}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}"""

ALERT = """<sc-if value="{{alertOn}}" hint-placeholder-val="{{ true }}">
<section class="alert" aria-labelledby="krize-titulek" style="background: {{al.bg}}; color: {{al.ink}}; border-bottom: 4px solid {{al.edge}}">
  <div style="max-width: 1200px; margin: 0 auto; padding: 12px clamp(16px, 4vw, 32px); display: flex; gap: 12px; align-items: flex-start">
    <sc-if value="{{al.isInfo}}" hint-placeholder-val="{{ true }}"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" style="flex: 0 0 22px; margin-top: 1px"><circle cx="12" cy="12" r="9"></circle><path d="M12 11v6M12 7.5v.5"></path></svg></sc-if>
    <sc-if value="{{al.isWarn}}" hint-placeholder-val="{{ false }}"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex: 0 0 22px; margin-top: 1px"><path d="M12 3l10 18H2z"></path><path d="M12 10v5M12 18v.5"></path></svg></sc-if>
    <div style="min-width: 0">
      <h2 id="krize-titulek" style="margin: 0; font-size: 17px; line-height: 1.35; font-weight: 600">{{al.kind}}: {{al.title}}</h2>
      <p style="margin: 2px 0 0; line-height: 1.5">{{al.text}} <a href="#" style="color: inherit; font-weight: 600">{{al.link}}</a></p>
    </div>
  </div>
</section>
</sc-if>"""

SPEC = """<section class="spec" aria-label="Barevná paleta šablony" style="background: #ECECE8; color: #1A1A18; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; font-size: 14px; line-height: 1.45; border-bottom: 1px solid #CFCFC9">
  <div style="padding: 20px clamp(16px, 4vw, 32px) 24px; display: flex; flex-direction: column; gap: 16px">
    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 12px 24px">
      <p style="margin: 0; max-width: 60ch"><span style="display: block; font-size: 18px; font-weight: 600">Šablona __NUM__ __NAME__</span><span style="display: block; color: #55554F">__SUB__ Inspirace: __INSP__. Ukázka pro smyšlenou obec Javoří Lhota.</span></p>
      <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-end">
        <div role="group" aria-label="Barevná varianta" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 8px">
          <span style="font-weight: 600; margin-right: 4px">Barevná varianta</span>
          <sc-for list="{{variants}}" as="vr" hint-placeholder-count="3">
            <button type="button" onClick="{{vr.pick}}" aria-pressed="{{vr.pressed}}" style="display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 16px; border-radius: 8px; border: 1px solid #1A1A18; background: {{vr.bg}}; color: {{vr.ink}}; font: inherit; font-weight: 500; cursor: pointer"><span aria-hidden="true" style="display: inline-flex"><span style="width: 16px; height: 16px; border-radius: 50%; background: {{vr.a}}; box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3)"></span><span style="width: 16px; height: 16px; border-radius: 50%; margin-left: -4px; background: {{vr.b}}; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.9)"></span><span style="width: 16px; height: 16px; border-radius: 50%; margin-left: -4px; background: {{vr.d}}; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.9)"></span></span>{{vr.name}}</button>
          </sc-for>
        </div>
        <div role="group" aria-label="Krizový banner" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 8px">
          <span style="font-weight: 600; margin-right: 4px">Krizový banner</span>
          <sc-for list="{{alertOpts}}" as="ao" hint-placeholder-count="4">
            <button type="button" onClick="{{ao.pick}}" aria-pressed="{{ao.pressed}}" style="min-height: 44px; padding: 0 12px; border-radius: 8px; border: 1px solid #1A1A18; background: {{ao.bg}}; color: {{ao.ink}}; font: inherit; font-weight: 500; cursor: pointer">{{ao.name}}</button>
          </sc-for>
        </div>
      </div>
    </div>
    <ul aria-label="Barvy varianty {{paletteName}}" style="list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(148px, 100%), 1fr)); gap: 8px">
      <sc-for list="{{swatches}}" as="sw" hint-placeholder-count="12">
        <li style="display: flex; align-items: center; gap: 12px; padding: 8px; border-radius: 8px; background: #FFFFFF">
          <span aria-hidden="true" style="flex: 0 0 40px; height: 40px; border-radius: 6px; background: {{sw.hex}}; box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.16)"></span>
          <span style="min-width: 0"><span style="display: block; font-weight: 600">{{sw.name}}</span><span style="display: block; color: #55554F; font-variant-numeric: tabular-nums">{{sw.hex}} {{sw.note}}</span></span>
        </li>
      </sc-for>
    </ul>
    <p style="margin: 0; color: #55554F">Písmo: __FONTS__. Barvy jsou tokeny, obec je může v editoru Advance přepsat vlastními. Návrhová pravidla: skill unslop od Damira Sokolovského (@heydamir), CC BY 4.0.</p>
  </div>
</section>"""

JS = """class Component extends DCLogic {
  constructor(props) { super(props); this.state = Object.assign({ v: null, alert: '__ALERT__' }, __STATE__); }
  renderVals() {
    const P = __PAL__;
    const names = P.map((p) => p.name);
    const fromProp = names.indexOf(this.props.paleta);
    const vi = this.state.v != null ? this.state.v : (fromProp >= 0 ? fromProp : 0);
    const c = P[vi];
    const lum = (h) => { const n = parseInt(h.slice(1), 16); const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }); return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2]; };
    const cr = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    const fmt = (r) => r.toFixed(1).replace('.', ',') + ':1 ' + (r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : 'velký text');
    const ROLES = [['bg', 'Pozadí', ''], ['surface', 'Plocha', ''], ['ink', 'Text', 'bg'], ['muted', 'Vedlejší text', 'bg'], ['link', 'Odkazy', 'bg'], ['line', 'Linky', ''], ['primary', 'Hlavní', ''], ['onPrimary', 'Text na hlavní', 'primary'], ['accent', 'Akcent', ''], ['onAccent', 'Text na akcentu', 'accent'], ['deep', 'Tmavý pás', ''], ['onDeep', 'Text na tmavém', 'deep']];
    const swatches = ROLES.map((r) => ({ name: r[1], hex: c[r[0]], note: r[2] ? fmt(cr(c[r[0]], c[r[2]])) : '' }));
    const variants = P.map((p, i) => ({ name: p.name, a: p.bg, b: p.primary, d: p.accent, pressed: i === vi ? 'true' : 'false', bg: i === vi ? '#1A1A18' : '#FFFFFF', ink: i === vi ? '#FFFFFF' : '#1A1A18', pick: () => this.setState({ v: i }) }));
    const A = {
      info: { kind: 'Informace obce', title: 'most přes Javornický potok je zavřený', text: 'Od 2. do 30. listopadu. Objížďka vede přes Hájek, autobus 431 staví u hájovny.', link: 'Mapa objížďky', bg: '#F2F6FC', ink: '#0C1838', edge: '#00469B', isInfo: true, isWarn: false },
      warning: { kind: 'Výstraha', title: 'silný vítr ve čtvrtek 5. listopadu', text: 'ČHMÚ varuje od 14 do 22 hodin před nárazy větru až 90 km/h. Ukliďte věci ze zahrad a nechoďte do lesa.', link: 'Výstraha ČHMÚ', bg: '#FEF6D8', ink: '#2A1B00', edge: '#CA8504', isInfo: false, isWarn: true },
      emergency: { kind: 'Krizová situace', title: 'nepijte vodu z obecního vodovodu', text: 'Rozbor z 1. listopadu našel bakterie. Vodu do odvolání převařujte. Cisterna s pitnou vodou stojí na návsi od 14 hodin.', link: 'Co dělat a kdy to skončí', bg: '#B00A0D', ink: '#FFFFFF', edge: '#6E0507', isInfo: false, isWarn: true }
    };
    const al = A[this.state.alert] || A.info;
    const alertOpts = [['off', 'Vypnuto'], ['info', 'Informace'], ['warning', 'Výstraha'], ['emergency', 'Krize']].map((o) => ({ name: o[1], pressed: this.state.alert === o[0] ? 'true' : 'false', bg: this.state.alert === o[0] ? '#1A1A18' : '#FFFFFF', ink: this.state.alert === o[0] ? '#FFFFFF' : '#1A1A18', pick: () => this.setState({ alert: o[0] }) }));
    const kebab = (s) => s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
    let vars = '';
    Object.keys(c).forEach((k) => { if (k !== 'name' && k !== 'x') vars += '--' + kebab(k) + ': ' + c[k] + '; '; });
    Object.keys(c.x || {}).forEach((k) => { vars += '--' + k + ': ' + c.x[k] + '; '; });
    const extra = ((self, c) => { __EXTRA__ })(this, c);
    return Object.assign({ c: c, vars: vars, swatches: swatches, variants: variants, paletteName: c.name, alertOn: this.state.alert !== 'off', al: al, alertOpts: alertOpts }, extra || {});
  }
}"""

def narrow_menu(body):
    m = re.search(r'<nav class="nav-wide" aria-label="Hlavní menu"([^>]*)>([\s\S]*?)</nav>', body)
    if not m: return body
    links = re.findall(r'<a [^>]*>[\s\S]*?</a>', m.group(2))
    links = [re.sub(r' style="[^"]*"', '', a) for a in links]
    links = [re.sub(r'<svg[\s\S]*?</svg>', '', a) for a in links]
    links = [re.sub(r'<a ([^>]*?)aria-label="([^"]*)"([^>]*)>\s*</a>', r'<a \1\3>\2</a>', a) for a in links]
    det = ('<details class="nav-narrow"><summary><svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true"><path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" stroke-width="2"></path></svg>Menu</summary>'
           '<nav aria-label="Hlavní menu">' + ''.join(links) + '</nav></details>')
    return body[:m.end()] + '\n' + det + body[m.end():]

def build(key):
    t = T[key]
    body = open(os.path.join(HERE, 'bodies', key + '.html')).read()
    body = re.sub(r'\[\[ZNAK (\d+)\]\]', lambda mm: ZNAK.format(w=mm.group(1), h=round(int(mm.group(1)) * 1.2)), body)
    body = narrow_menu(body)
    # Czech typography: no one-letter preposition or conjunction at the end of a line
    body = re.sub(r'>([^<]+)<', lambda mm: '>' + re.sub(r'(?<![\w{])([AaIiKkOoSsUuVvZz]) (?=\S)', '\\1\u00a0', mm.group(1)) + '<', body)
    body = body.replace('[[ALERT]]', ALERT) if '[[ALERT]]' in body else ALERT + '\n' + body
    pal = [dict({k: v[k] for k in K}, name=v['name'], x=v['x']) for v in PAL[key]]
    spec = (SPEC.replace('__NUM__', t['num']).replace('__NAME__', t['name']).replace('__SUB__', t['sub'])
            .replace('__FONTS__', t['fontLabel']).replace('__INSP__', t.get('insp', 'vlastní návrh')))
    js = (JS.replace('__PAL__', json.dumps(pal, ensure_ascii=False)).replace('__STATE__', t.get('state', '{}'))
          .replace('__EXTRA__', t.get('js', 'return {};')).replace('__ALERT__', t.get('alert', 'info')))
    props = json.dumps({'paleta': {'editor': 'enum', 'options': [v['name'] for v in PAL[key]], 'default': PAL[key][0]['name'], 'section': 'Barvy'}, '$preview': {'width': 1280, 'height': 2200}}, ensure_ascii=False).replace("'", '&#39;')
    html = f"""<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<title>{t['num']} {t['name']} – Javoří Lhota</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?{t['fonts']}&amp;display=swap">
<style>
{BASE_CSS}
{t.get('css', '').strip()}
</style>
</helmet>
<div>
{spec}
<div class="site" style="{{{{vars}}}} background: var(--bg); color: var(--ink); font-family: {t['family']}; font-size: {t.get('size', '17px')}; line-height: {t.get('lh', '1.55')}">
{body.strip()}
</div>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{props}'>
{js}
</script>
</body>
</html>
"""
    open(os.path.join(OUT, t['file']), 'w').write(html)
    return t['file']

if __name__ == '__main__':
    keys = sys.argv[1:] or list(T.keys())
    for k in keys:
        if os.path.exists(os.path.join(HERE, 'bodies', k + '.html')):
            print('built', build(k))
        else:
            print('skip (no body)', k)
