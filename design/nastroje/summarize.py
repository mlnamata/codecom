import json, sys, glob, os
d = sys.argv[1]
for f in sorted(glob.glob(os.path.join(d, '*.json'))):
    j = json.load(open(f)); name = os.path.basename(f)[:-5]
    lines = []
    for w in ('375', '1280'):
        r = j[w]; c = r['probe-core.js']; h = r['probe-heuristics.js']; vl = r.get('vl', {})
        cf = c['contrast']['failures']
        if cf: lines.append(f'{w} contrast x{len(cf)}: ' + '; '.join(f"{x.get('text','')[:18]!r} {x.get('ratio')} {x.get('fg','')}/{x.get('bg','')}" for x in cf[:4]))
        tt = [t for t in c['tapTargets']['tooSmall'] if not t.get('exemptInlineLink')]
        if tt: lines.append(f'{w} targets<44 x{len(tt)}: ' + '; '.join(f"{t['text'][:16]!r} {t['size']} {t['tag']}" for t in tt[:6]))
        st = c['structure']
        if st['h1Count'] != 1 or st['skippedLevels']: lines.append(f"{w} headings h1={st['h1Count']} skipped={st['skippedLevels']}")
        if 'main=1' not in st['landmarks']: lines.append(f"{w} landmarks: {st['landmarks']}")
        for fm in c['forms']:
            if fm.get('nameSource') not in ('label[for]', 'label-wrap'): lines.append(f"{w} form {fm.get('id')} name via {fm.get('nameSource')}")
        if c['naming']['unnamed']: lines.append(f"{w} unnamed: {c['naming']['unnamed'][:3]}")
        if vl.get('overflow', 0) > 0: lines.append(f"{w} OVERFLOW {vl['overflow']}px {c['layout'].get('overflowingElements', [])[:2]}")
        if w == '1280':
            lines.append(f"weights {vl.get('weights')} sizes {len(vl.get('sizes', []))} spacing {h['designSystem']['distinctSpacingValues']['count']} radii {h['designSystem']['distinctBorderRadii']['count']}")
            if vl.get('lineHeightCount'): lines.append(f"line-height x{vl['lineHeightCount']}: {vl['lineHeight'][:4]}")
            if vl.get('longLines'): lines.append(f"long lines: {vl['longLines'][:3]}")
            if vl.get('tables'): lines.append(f"tables: {vl['tables']}")
            if vl.get('staticPills'): lines.append(f"pills: {vl['staticPills']}")
            cp = h['fitts'].get('competingPrimaries', {})
            lines.append(f"buttons: {vl.get('buttons')}")
        if w == '375':
            lines.append(f"nav375: {vl.get('mainNav')}")
        fo = r.get('focus', [])
        if fo: lines.append(f"{w} focus FAIL x{len(fo)}: " + '; '.join(f"{x['el'][:34]} {x.get('ratio')} {x.get('color','')} on {x.get('bg','')}" for x in fo[:6]))
    print('### ' + name); print('\n'.join('  ' + l for l in lines))
