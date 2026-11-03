# Meta + per-template logic. JS snippets run inside ((self, c) => { ... })(this, c) and return extra template values.
T = {
 'Main': dict(insp='TownPress (LSVRthemes) – portál ve třech sloupcích přes panoráma obce', alert='info', file='Main.dc.html', num='01', name='Náves', sub='Pro vesnice do 500 obyvatel.',
   fonts='family=Bricolage+Grotesque:opsz,wght@12..96,400..600', family="'Bricolage Grotesque', system-ui, sans-serif",
   fontLabel='Bricolage Grotesque (nadpisy i text)', css='@media (max-width:767.98px){.m-center{order:-1}}'),
 'S02-Zvonice': dict(insp='GOV.UK Design System – jeden sloupec a úřední deska s filtrem', alert='info', file='S02-Zvonice.dc.html', num='02', name='Zvonice', sub='Pro vesnice, kde starosta chce minimum práce.',
   fonts='family=Hanken+Grotesk:wght@400;500;600&family=Newsreader:opsz,wght@6..72,400..600', family="'Hanken Grotesk', system-ui, sans-serif",
   size='18px', lh='1.6', state="{ cat: 'Vše', old: false }", css='.drow{display:grid;grid-template-columns:minmax(0,1fr) 120px 120px;gap:4px 16px;padding:12px 0;border-top:1px solid var(--line)}.dhead{border-top:0}@media (max-width:767.98px){.dhead{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}.drow{grid-template-columns:1fr 1fr}.drow>span:first-child{grid-column:1/-1}.dfrom::before{content:"Vyvěšeno "}.dto::before{content:"Sejmutí "}.dfrom,.dto{color:var(--muted);font-size:15px}}', js="const D = [\n      { title: 'Oznámení o přerušení dodávky elektřiny 12. listopadu, ulice Za Školou', cat: 'Oznámení', from: '2. 11. 2026', to: '12. 11. 2026', end: '2026-11-12' },\n      { title: 'Pozvánka na zasedání zastupitelstva 9. listopadu', cat: 'Zastupitelstvo', from: '30. 10. 2026', to: '9. 11. 2026', end: '2026-11-09' },\n      { title: 'Veřejná vyhláška: uzavírka mostu přes Javornický potok', cat: 'Doprava', from: '28. 10. 2026', to: '30. 11. 2026', end: '2026-11-30' },\n      { title: 'Návrh rozpočtu obce na rok 2027', cat: 'Rozpočet', from: '26. 10. 2026', to: '11. 11. 2026', end: '2026-11-11' },\n      { title: 'Záměr pronájmu nebytových prostor v domě čp. 12', cat: 'Majetek obce', from: '15. 10. 2026', to: '31. 10. 2026', end: '2026-10-31' },\n      { title: 'Obecně závazná vyhláška o místním poplatku ze psů', cat: 'Vyhlášky', from: '1. 10. 2026', to: 'trvale', end: '9999-12-31' }\n    ];\n    const today = '2026-11-02';\n    const s = self.state;\n    const cats = ['Vše', 'Zastupitelstvo', 'Doprava', 'Rozpočet', 'Oznámení', 'Vyhlášky', 'Majetek obce'];\n    const shown = D.filter((d) => (s.cat === 'Vše' || d.cat === s.cat) && (s.old || d.end >= today));\n    const pl = (n) => n === 1 ? 'dokument' : (n >= 2 && n <= 4 ? 'dokumenty' : 'dokumentů');\n    return {\n      cats: cats.map((k) => ({ label: k, pressed: s.cat === k ? 'true' : 'false', bg: s.cat === k ? c.ink : c.bg, ink: s.cat === k ? c.bg : c.ink, edge: s.cat === k ? c.ink : c.line, pick: () => self.setState({ cat: k }) })),\n      docs: shown.map((d) => ({ title: d.title, cat: d.cat, state: d.end < today ? ', sejmuto' : '', from: d.from, to: d.to })), rowCount: String(shown.length + 1),\n      countText: 'Zobrazeno ' + shown.length + ' z ' + D.length + ' ' + pl(D.length),\n      empty: shown.length === 0, oldPressed: s.old ? 'true' : 'false', oldMark: s.old ? c.ink : 'transparent',\n      toggleOld: () => self.setState({ old: !s.old }), reset: () => self.setState({ cat: 'Vše', old: false })\n    };", fontLabel='Newsreader (nadpisy) a Hanken Grotesk (text)'),
 'S03-Studanka': dict(insp='Wordbench (LSVRthemes) – dělený úvod, karta hledání a rozcestník', alert='off', file='S03-Studanka.dc.html', num='03', name='Studánka', sub='Pro rekreační obce s chalupáři.',
   fonts='family=Alegreya:wght@500;600&family=Alegreya+Sans:wght@400;500;600', family="'Alegreya Sans', system-ui, sans-serif",
   size='18px', fontLabel='Alegreya (nadpisy) a Alegreya Sans (text)', state="{ season: 'leto' }",
   js="""const leto = self.state.season === 'leto';
    const items = leto ? [
      { title: 'Svoz odpadu i v sobotu', text: 'Od května do září vyvážíme popelnice také v sobotu ráno, aby nezůstávaly plné přes týden.' },
      { title: 'Koupání v Mlýnském rybníce', text: 'Teplotu a čistotu vody měříme každý den. Výsledek visí u hráze a tady na webu.' },
      { title: 'Studánka u kaple sv. Anny', text: 'Voda je pitná, poslední rozbor 22. října. Prosíme, nemyjte u studánky nádobí.' },
      { title: 'Poplatek za rekreační objekt', text: '600 Kč na rok, splatný do 31. května. Zaplatíte kartou online nebo převodem.' }
    ] : [
      { title: 'Svoz jen v úterý', text: 'Od října do dubna jezdí popeláři jednou týdně. Nádobu připravte do 6 hodin ráno.' },
      { title: 'Co se prohrnuje', text: 'Obec prohrnuje silnici na náves, k autobusu a na Javorník. Cesta k Hájku se v zimě neudržuje.' },
      { title: 'Zazimování chalupy', text: 'Před odjezdem vypusťte vodu a pošlete nám odečet vodoměru. Ušetříte si cestu na úřad.' },
      { title: 'Lyžování na Javorníku', text: 'Dva vleky jezdí od 19. prosince, pokud napadne sníh. Parkoviště je u hospody U Lípy.' }
    ];
    const pick = (on) => ({ bg: on ? c.onDeep : 'transparent', ink: on ? c.deep : c.onDeep });
    return { items: items, seasonTitle: leto ? 'Co teď v létě platí' : 'Co teď v zimě platí', seasonLead: leto ? 'Platí od května do září.' : 'Platí od října do dubna.',
      letoOn: leto ? 'true' : 'false', zimaOn: leto ? 'false' : 'true', letoBg: pick(leto).bg, letoInk: pick(leto).ink, zimaBg: pick(!leto).bg, zimaInk: pick(!leto).ink,
      sky: leto ? (c.x.sky || '#DCEFEA') : '#E8EEF2', ground: leto ? (c.x.meadow || '#A8B97A') : '#FFFFFF', snowOn: leto ? '0' : '1',
      toLeto: () => self.setState({ season: 'leto' }), toZima: () => self.setState({ season: 'zima' }) };"""),
 'S04-Lipa': dict(insp='BetterLocalGov a Town Hall – úkoly slovesem a informační karty', alert='info', file='S04-Lipa.dc.html', num='04', name='Lípa', sub='Výchozí šablona pro obce 500 až 2 000 obyvatel.',
   fonts='family=Instrument+Sans:wght@400;500;600&family=Instrument+Serif', family="'Instrument Sans', system-ui, sans-serif",
   fontLabel='Instrument Serif (nadpisy) a Instrument Sans (text)', state="{ q: '' }",
   js="""const all = [
      { title: 'Zaplatit poplatek za odpad', how: 'online kartou, 900 Kč na osobu', k: 'zaplatit odpad poplatek popelnice platba' },
      { title: 'Zaplatit poplatek ze psů', how: 'online kartou, 200 Kč na rok', k: 'zaplatit pes psa poplatek' },
      { title: 'Přihlásit nebo odhlásit psa', how: 'online s Identitou občana', k: 'prihlasit odhlasit pes psa' },
      { title: 'Přihlásit se k trvalému pobytu', how: 'na úřadě, poplatek 50 Kč', k: 'prihlasit pobyt adresa stehovani' },
      { title: 'Pronajmout sál nebo sokolovnu', how: 'rezervace s platbou', k: 'pronajmout sal sokolovna rezervace oslava' },
      { title: 'Svoz bioodpadu a plastů', how: 'kalendář podle adresy', k: 'najit odpad svoz bio plast popelnice' },
      { title: 'Povolení ke kácení stromu', how: 'formulář s mapou', k: 'podat zadost kaceni strom drevina' },
      { title: 'Objednat se na úřad', how: 'Czech POINT, ověření podpisu', k: 'objednat overeni podpis czech point vypis' },
      { title: 'Nahlásit závadu', how: 'fotka a místo na mapě', k: 'nahlasit zavada rozbite lampa vymol most' }
    ];
    const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
    const q = norm(self.state.q).trim();
    const hits = q ? all.filter((x) => norm(x.title + ' ' + x.k).indexOf(q) >= 0).slice(0, 5) : all.slice(0, 4);
    const V = [['Zaplatit', 'zaplatit'], ['Nahlásit', 'nahlasit'], ['Přihlásit', 'prihlasit'], ['Objednat se', 'objednat'], ['Pronajmout', 'pronajmout']];
    const verbs = V.map((v) => ({ label: v[0], pressed: q === v[1] ? 'true' : 'false', bg: q === v[1] ? c.ink : c.bg, ink: q === v[1] ? c.bg : c.ink, pick: () => self.setState({ q: q === v[1] ? '' : v[1] }) }));
    return { q: self.state.q, setQ: (e) => self.setState({ q: e.target.value }), hits: hits, verbs: verbs, empty: q.length > 0 && hits.length === 0, clear: () => self.setState({ q: '' }) };"""),
 'S05-Majka': dict(insp='Pressville (LSVRthemes) – akce s velkým bledým slovem a karty plakátů', alert='off', file='S05-Majka.dc.html', num='05', name='Májka', sub='Pro obce s bohatým spolkovým životem.',
   fonts='family=Big+Shoulders:wght@500;600&family=Karla:wght@400;500;600', family="'Karla', system-ui, sans-serif",
   fontLabel='Big Shoulders (plakáty a nadpisy) a Karla (text)'),
 'S06-Hnizdo': dict(insp='CityGov (Dannci) – teplé dlaždice přes spodní hranu úvodu', alert='info', file='S06-Hnizdo.dc.html', num='06', name='Hnízdo', sub='Pro obce s mladými rodinami.',
   fonts='family=Gabarito:wght@400;500;600', family="'Gabarito', system-ui, sans-serif", fontLabel='Gabarito (nadpisy i text)'),
 'S07-Hranice': dict(insp='Pressville (LSVRthemes) – znak a serifový název přes panoráma, lišta s jazyky', alert='info', file='S07-Hranice.dc.html', num='07', name='Hranice', sub='Pro obce u hranice, česky i německy.',
   fonts='family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Serif:wght@500', family="'IBM Plex Sans', system-ui, sans-serif",
   fontLabel='IBM Plex Serif (nadpisy) a IBM Plex Sans (text)', css='@media (max-width:767.98px){.border-line{display:none}}', state="{ lang: 'both' }",
   js="""const L = self.state.lang;
    const opts = [['cs', 'Česky'], ['both', 'Obojí'], ['de', 'Deutsch']].map((o) => ({ label: o[1], lang: o[0] === 'de' ? 'de' : 'cs', pressed: L === o[0] ? 'true' : 'false', bg: L === o[0] ? c.onDeep : 'transparent', ink: L === o[0] ? c.deep : c.onDeep, pick: () => self.setState({ lang: o[0] }) }));
    return { langs: opts, showCs: L !== 'de', showDe: L !== 'cs', showBoth: L === 'both', cols: L === 'both' ? 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))' : 'minmax(0, 1fr)' };"""),
 'S08-Vinice': dict(insp='CityGov (AncoraThemes) – editoriální koláž, bledý nápis a šachovnice karet', alert='off', file='S08-Vinice.dc.html', num='08', name='Vinice', sub='Pro vinařské obce a obce s místními výrobci.',
   fonts='family=Fraunces:opsz,wght@9..144,400..600&family=Figtree:wght@400;500;600', family="'Figtree', system-ui, sans-serif",
   fontLabel='Fraunces (nadpisy) a Figtree (text)'),
 'S09-Hreben': dict(insp='Administration (axiomthemes) – obří titulek přes panoráma a číslované služby', alert='warning', file='S09-Hreben.dc.html', num='09', name='Hřeben', sub='Pro horské a turistické obce.',
   fonts='family=Archivo:wdth,wght@62..125,400..600', family="'Archivo', system-ui, sans-serif", fontLabel='Archivo v úzkých i běžných řezech'),
 'S10-Rynek': dict(insp='Administration varianta 2 – dvoubarevný titulek, koláž a karta s číslem', alert='info', file='S10-Rynek.dc.html', num='10', name='Rynek', sub='Pro historická městečka a obce s náměstím.',
   fonts='family=Vollkorn:wght@500;600&family=Hanken+Grotesk:wght@400;500;600', family="'Hanken Grotesk', system-ui, sans-serif",
   fontLabel='Vollkorn (nadpisy) a Hanken Grotesk (text)'),
 'S11-Radnice': dict(insp='Town Hall Municipal Portal (cmsmasters) – živý pruh zpráv a karty přes úvod', alert='info', file='S11-Radnice.dc.html', num='11', name='Radnice', sub='Pro města od 2 000 do 10 000 obyvatel.',
   fonts='family=Schibsted+Grotesk:wght@400;500;600', family="'Schibsted Grotesk', system-ui, sans-serif", fontLabel='Schibsted Grotesk (nadpisy i text)',
   state="{ aud: 'obcan' }",
   js="""const S = {
      obcan: [['Občanský průkaz a pas', 'vyřizuje [ORP], objednáme vás'], ['Poplatek za odpad', '900 Kč, zaplatíte online'], ['Svoz odpadu', 'kalendář podle adresy'], ['Přihlášení k pobytu', 'na úřadě, 50 Kč'], ['Hrobové místo', 'smlouva na úřadě'], ['Nahlásit závadu', 'fotka a místo na mapě']],
      firma: [['Zábor veřejného prostranství', 'lešení, kontejner, stánek'], ['Volné parcely Za pilou', '3 parcely, 4,6 ha'], ['Odpad z provozovny', 'smlouva s obcí'], ['Pronájem sálu', 'firemní akce do 120 lidí'], ['Veřejné zakázky', 'profil zadavatele'], ['Dotace pro podnikatele', 'program obnovy venkova']],
      host: [['Kde zaparkovat', 'u hospody U Lípy a pod Javorníkem'], ['Javorník a rozhledna', 'pěšky 50 minut z návsi'], ['Mlýnský rybník', 'koupání od června'], ['Kde se najíst', 'hospoda, pekárna, farma'], ['Ubytování', '6 penzionů a chalup'], ['Autobus do Klatov', 'linka 431 z návsi']]
    };
    const a = self.state.aud;
    const tabs = [['obcan', 'Jsem občan'], ['firma', 'Podnikám'], ['host', 'Jsem tu na návštěvě']].map((t) => ({ label: t[1], sel: a === t[0] ? 'true' : 'false', bg: a === t[0] ? c.bg : 'transparent', ink: a === t[0] ? c.ink : c.onDeep, pick: () => self.setState({ aud: t[0] }) }));
    return { tabs: tabs, services: S[a].map((s) => ({ t: s[0], d: s[1] })) };"""),
 'S12-Kolonada': dict(insp='Town Hall City Mayor (cmsmasters) – dělený úvod s portrétem a čísla na pásu', alert='off', file='S12-Kolonada.dc.html', num='12', name='Kolonáda', sub='Pro lázeňská a kulturní místa.',
   fonts='family=Cormorant+Garamond:wght@500;600&family=Albert+Sans:wght@400;500;600', family="'Albert Sans', system-ui, sans-serif",
   fontLabel='Cormorant Garamond (nadpisy) a Albert Sans (text)'),
 'S13-Mlyn': dict(insp='CityGov Downtown (Dannci) – úzký obří titulek a kruhové razítko', alert='info', file='S13-Mlyn.dc.html', num='13', name='Mlýn', sub='Pro průmyslové a pracovní obce.',
   fonts='family=Barlow+Condensed:wght@500;600&family=Barlow:wght@400;500;600', family="'Barlow', system-ui, sans-serif",
   fontLabel='Barlow Condensed (nadpisy a čísla) a Barlow (text)'),
 'S14-Hraz': dict(insp='EGovt (ovatheme) – dlaždice služeb přes hranu úvodu a pás čísel', alert='warning', css='@media (max-width: 767.98px){.hraz-deko{display:none}}', file='S14-Hraz.dc.html', num='14', name='Hráz', sub='Pro obce u rybníků a přehrad.',
   fonts='family=Commissioner:wght@400;500;600', family="'Commissioner', system-ui, sans-serif", fontLabel='Commissioner (nadpisy i text)'),
 'S15-Lupa': dict(insp='gov.cz a GOV.UK – přístupnost na prvním místě', alert='info', file='S15-Lupa.dc.html', num='15', name='Lupa', sub='Pro obce se staršími obyvateli, důraz na přístupnost.',
   fonts='family=Atkinson+Hyperlegible+Next:wght@400;500;600', family="'Atkinson Hyperlegible Next', Verdana, sans-serif", size='{{fs}}', lh='1.5',
   fontLabel='Atkinson Hyperlegible Next (nadpisy i text)', state='{ size: 20 }',
   css='.skip{position:absolute;left:-10000px;top:auto}.skip:focus{position:static;display:block;padding:12px 16px;background:#FFE14D;color:#000000;font-weight:600;outline:3px solid #000000;outline-offset:-3px}',
   js="""const cur = self.state.size;
    const sizes = [[20, 'A'], [24, 'A+'], [28, 'A++']].map((s) => ({ label: s[1], name: s[1] === 'A' ? 'Běžné písmo' : s[1] === 'A+' ? 'Větší písmo' : 'Největší písmo', pressed: cur === s[0] ? 'true' : 'false', bg: cur === s[0] ? c.primary : c.bg, ink: cur === s[0] ? c.onPrimary : c.ink, pick: () => self.setState({ size: s[0] }) }));
    return { fs: cur + 'px', sizes: sizes };"""),
 'S16-Kompas': dict(insp='TownPress (LSVRthemes) – zajímavá místa, tady jako mapa služeb', alert='info', file='S16-Kompas.dc.html', num='16', name='Kompas', sub='Pro obce, které chtějí hlavně mapu služeb.',
   fonts='family=Red+Hat+Display:wght@500;600&family=Red+Hat+Text:wght@400;500;600', family="'Red Hat Text', system-ui, sans-serif",
   fontLabel='Red Hat Display (nadpisy) a Red Hat Text (text)', state="{ on: { kont: true, hriste: true, aed: true, park: false, zavady: true }, sel: 'z1' }",
   js="""const s = self.state; const dark = c.bg === '#12181C';
    const L = { kont: ['Kontejnery', dark ? '#5CC8D8' : '#0E5A6B'], hriste: ['Hřiště', dark ? '#8CD47E' : '#3F7A12'], aed: ['Defibrilátory', dark ? '#FF7A7A' : '#B42318'], park: ['Parkování', dark ? '#A9B6FF' : '#3949AB'], zavady: ['Závady a uzavírky', dark ? '#FFB067' : '#B54708'] };
    const all = [
      { id: 'k1', l: 'kont', x: '44%', y: '40%', title: 'Kontejnery na návsi', info: 'Papír, plast, sklo a kovy. Plasty se vyvážejí každou středu, při svátku o den později.' },
      { id: 'k2', l: 'kont', x: '78%', y: '26%', title: 'Kontejnery v Podjavoří', info: 'Papír, plast a bioodpad. Bioodpad naposledy 20. listopadu.' },
      { id: 'h1', l: 'hriste', x: '30%', y: '64%', title: 'Hřiště za školou', info: 'Nové hřiště pro děti 3 až 12 let, otevřeno denně 8 až 20 hodin.' },
      { id: 'a1', l: 'aed', x: '50%', y: '48%', title: 'Defibrilátor na obecním úřadu', info: 'Ve vstupní hale, venkovní dveře jsou odemčené nonstop.' },
      { id: 'a2', l: 'aed', x: '62%', y: '34%', title: 'Defibrilátor v hasičárně', info: 'Na zdi u vrat, skříňka se otevře bez klíče.' },
      { id: 'p1', l: 'park', x: '20%', y: '30%', title: 'Parkoviště pod Javorníkem', info: '40 míst, zdarma. V zimě se platí 50 Kč za den.' },
      { id: 'z1', l: 'zavady', x: '58%', y: '74%', title: 'Uzavírka mostu přes Javornický potok', info: 'Od 2. listopadu do 30. listopadu. Objížďka vede přes Hájek, autobus 431 staví u hájovny.' },
      { id: 'z2', l: 'zavady', x: '36%', y: '22%', title: 'Nesvítí lampa v ulici K Javorníku', info: 'Nahlášeno 29. října. Oprava je objednaná na středu 4. listopadu.' }
    ];
    const layers = Object.keys(L).map((k) => ({ label: L[k][0], color: L[k][1], pressed: s.on[k] ? 'true' : 'false', bg: s.on[k] ? L[k][1] : c.bg, ink: s.on[k] ? (dark ? '#0B1114' : '#FFFFFF') : c.ink, dot: s.on[k] ? (dark ? '#0B1114' : '#FFFFFF') : L[k][1], toggle: () => { const n = Object.assign({}, s.on); n[k] = !n[k]; self.setState({ on: n }); } }));
    const pins = all.filter((p) => s.on[p.l]).map((p) => ({ title: p.title, x: p.x, y: p.y, color: L[p.l][1], size: p.id === s.sel ? '36px' : '28px', off: p.id === s.sel ? '-18px' : '-14px', ring: p.id === s.sel ? c.ink : 'transparent', pressed: p.id === s.sel ? 'true' : 'false', pick: () => self.setState({ sel: p.id }) }));
    const cur = all.find((p) => p.id === s.sel) || all[0];
    return { layers: layers, pins: pins, sel: { title: cur.title, info: cur.info, layerLabel: L[cur.l][0], color: L[cur.l][1] } };"""),
 'S17-Magistrat': dict(insp='Civica (AwaikenThemes) – tmavý úvod, místo hesla otázka pro asistenta', alert='emergency', file='S17-Magistrat.dc.html', num='17', name='Magistrát', sub='Pro obce, které chtějí odpovídat i mimo úřední hodiny.',
   fonts='family=Onest:wght@400;500;600', family="'Onest', system-ui, sans-serif", fontLabel='Onest (nadpisy i text)', state='{ i: 0 }',
   js="""const qa = [
      { q: 'Kdy jede svoz plastů na Hájku?', a: 'Plasty se na Hájku vyvážejí každou druhou středu. Nejbližší svoz je ve středu 4. listopadu, žlutou nádobu připravte do 6 hodin ráno.', s: ['Svozový kalendář 2026, část Hájek', 'Odpady: co kam patří'] },
      { q: 'Co potřebuju k přihlášení k trvalému pobytu?', a: 'Přijďte osobně na obecní úřad s občanským průkazem a dokladem, že na adrese smíte bydlet, třeba s nájemní smlouvou. Poplatek je 50 Kč, děti do 15 let ho neplatí.', s: ['Přihlášení k trvalému pobytu', 'Portál veřejné správy: ohlášení změny pobytu'] },
      { q: 'Kudy jede autobus, když je zavřený most?', a: 'Od 2. do 30. listopadu jezdí linka 431 objížďkou přes Hájek. Zastávka Javoří Lhota, most se ruší, náhradní zastávka je u hájovny. Časy odjezdů se nemění.', s: ['Veřejná vyhláška: uzavírka mostu', 'Jízdní řád linky 431'] }
    ];
    const cur = qa[self.state.i];
    return { q: cur.q, answer: cur.a, sources: cur.s, suggest: qa.map((x, i) => ({ q: x.q, pressed: i === self.state.i ? 'true' : 'false', bg: i === self.state.i ? c.onDeep : 'transparent', ink: i === self.state.i ? c.deep : c.onDeep, pick: () => self.setState({ i: i }) })) };"""),
 'S18-Zpravodaj': dict(insp='TownPress (LSVRthemes) – zprávy a důležité formuláře, novinová hlavička', alert='info', file='S18-Zpravodaj.dc.html', num='18', name='Zpravodaj', sub='Pro obce, které hodně komunikují.',
   fonts='family=Newsreader:opsz,wght@6..72,400..600&family=Libre+Franklin:wght@400;500;600', family="'Libre Franklin', system-ui, sans-serif",
   size='16px', fontLabel='Newsreader (titulky) a Libre Franklin (text)'),
 'S19-Mikroregion': dict(insp='Town Hall (cmsmasters) – mřížka odborů, tady části obce s mapou', alert='info', file='S19-Mikroregion.dc.html', num='19', name='Mikroregion', sub='Pro svazky obcí a obce s více částmi.',
   fonts='family=Familjen+Grotesk:wght@400;500;600', family="'Familjen Grotesk', system-ui, sans-serif", fontLabel='Familjen Grotesk (nadpisy i text)',
   state="{ sel: 'jl' }",
   js="""const data = [
      { id: 'jl', name: 'Javoří Lhota', facts: '412 obyvatel, náves s lípou a kostelem sv. Václava', now: 'Lampionový průvod v sobotu 7. listopadu od hasičárny ke kapli sv. Anny.', d: 'M150 120 L300 96 L330 210 L240 270 L130 236z', lx: 230, ly: 182, base: c.x.m1 },
      { id: 'pj', name: 'Podjavoří', facts: '138 obyvatel, pod Javorníkem, vleky a rozhledna', now: 'Kanalizace: obec podala žádost o dotaci, rozhodnutí přijde v prosinci.', d: 'M300 96 L480 60 L500 190 L330 210z', lx: 400, ly: 140, base: c.x.m2 },
      { id: 'hj', name: 'Hájek', facts: '86 obyvatel, objížďka při uzavírce mostu', now: 'Od 2. listopadu tudy vede objížďka a staví tu autobus 431.', d: 'M130 236 L240 270 L260 400 L90 410 L60 300z', lx: 165, ly: 330, base: c.x.m3 },
      { id: 'nr', name: 'Na Rovném', facts: '48 obyvatel, Mlýnský rybník a pila', now: 'Výlov Mlýnského rybníka v sobotu 14. listopadu od 9 hodin.', d: 'M240 270 L330 210 L500 190 L490 390 L260 400z', lx: 380, ly: 300, base: c.x.m4 }
    ];
    const s = self.state.sel;
    const cur = data.find((x) => x.id === s) || data[0];
    return { cur: cur, parts: data.map((x) => ({ name: x.name, pressed: x.id === s ? 'true' : 'false', bg: x.id === s ? c.primary : c.surface, ink: x.id === s ? c.onPrimary : c.ink, pick: () => self.setState({ sel: x.id }) })),
      shapes: data.map((x) => ({ name: x.name, d: x.d, lx: x.lx, ly: x.ly, fill: x.id === s ? c.primary : x.base, ink: x.id === s ? c.onPrimary : c.ink, pick: () => self.setState({ sel: x.id }) })) };"""),
 'S20-Urad': dict(insp='Design systém gov.cz – hlavička, hledání, životní situace a deska', alert='info', file='S20-Urad.dc.html', num='20', name='Úřad', sub='Pro obce, které chtějí vzhled podle gov.cz.',
   fonts='family=Roboto:wght@400;500;600', family="'Roboto', Arial, sans-serif", fontLabel='Roboto (nadpisy i text, jako gov.cz)', state="{ sit: 'stehovani' }",
   js="""const T = {
      online: { tag: 'Online', bg: c.surface, ink: c.ink, line: c.accent },
      urad: { tag: 'Na úřadě', bg: c.bg, ink: c.ink, line: c.primary },
      samo: { tag: 'Proběhne samo', bg: c.bg, ink: c.muted, line: c.line }
    };
    const S = [
      { id: 'stehovani', label: 'Stěhuji se do Javoří Lhoty', who: 'Poradí evidence obyvatel, kancelář č. 2, telefon [TELEFON].', steps: [
        ['Přihlaste se k trvalému pobytu', 'urad', 'Přijďte s občanským průkazem a dokladem, že na adrese smíte bydlet, například nájemní smlouvou. Poplatek je 50 Kč, děti do 15 let ho neplatí.'],
        ['Přihlaste se k poplatku za odpad', 'online', 'Formulář vyplníte na webu do 15 dnů. Poplatek je 900 Kč na osobu a rok, popelnici vydáme na úřadě.'],
        ['Máte psa? Přihlaste ho', 'online', 'Poplatek ze psů je 200 Kč na rok. Známku vám pošleme poštou.'],
        ['Zapište děti do školy nebo školky', 'urad', 'ZŠ a MŠ Javoří Lhota má 1. až 5. ročník. Zápis do první třídy je v dubnu, do školky v květnu.']
      ] },
      { id: 'narozeni', label: 'Narodilo se nám dítě', who: 'Poradí matrika, kancelář č. 1, telefon [TELEFON].', steps: [
        ['Porodnice ohlásí narození matrice', 'samo', 'Rodný list vystaví matrika podle místa porodu.'],
        ['Dítě získá trvalý pobyt u matky', 'samo', 'Nic nevyplňujete, údaj se propíše z registru obyvatel.'],
        ['Přihlaste dítě k poplatku za odpad', 'online', 'Stačí doplnit jméno do vašeho přihlášení, do 15 dnů od narození.'],
        ['Přijďte na vítání občánků', 'online', 'Pozvánku pošleme, když nám k tomu dáte souhlas. Souhlas můžete kdykoli odvolat.']
      ] },
      { id: 'stavba', label: 'Stavím nebo opravuji dům', who: 'Stavby povoluje stavební úřad v [ORP]. Na obci poradí místostarosta, telefon [TELEFON].', steps: [
        ['Podívejte se do územního plánu', 'online', 'Mapa s územním plánem je na webu. Ukáže, co se na pozemku smí stavět.'],
        ['Podejte žádost přes Portál stavebníka', 'online', 'Stavební řízení se vede digitálně. Žádost vyřizuje stavební úřad, ne obec.'],
        ['Domluvte připojení na vodovod a kanalizaci', 'urad', 'Smlouvu uzavřete s obcí. Technik se nejdřív podívá na místo.'],
        ['Ohlaste lešení nebo kontejner na ulici', 'online', 'Zábor obecního pozemku ohlaste předem. Platí se místní poplatek podle vyhlášky.']
      ] },
      { id: 'umrti', label: 'Zemřel nám blízký člověk', who: 'Poradí matrika, kancelář č. 1, telefon [TELEFON].', steps: [
        ['Lékař vystaví list o prohlídce zemřelého', 'samo', 'List předá matrice a pohřební službě.'],
        ['Matrika vystaví úmrtní list', 'urad', 'Vydává ho matrika podle místa úmrtí. Často ho vyřídí pohřební služba za vás.'],
        ['Domluvte hrobové místo', 'urad', 'Nájem hrobu na hřbitově u kostela sv. Václava uzavřete s obcí.'],
        ['Poplatky se upraví', 'samo', 'Obec údaje převezme z registru obyvatel. Nemusíte nic odhlašovat.']
      ] }
    ];
    const cur = S.find((x) => x.id === self.state.sit) || S[0];
    return {
      situations: S.map((x) => ({ label: x.label, pressed: x.id === cur.id ? 'true' : 'false', bg: x.id === cur.id ? c.bg : 'transparent', edge: x.id === cur.id ? c.primary : 'transparent', pick: () => self.setState({ sit: x.id }) })),
      cur: { label: cur.label, who: cur.who, steps: cur.steps.map((s, i) => ({ n: String(i + 1), title: s[0], tag: T[s[1]].tag, tagBg: T[s[1]].bg, tagInk: T[s[1]].ink, tagLine: T[s[1]].line, text: s[2] })) }
    };"""),
}
