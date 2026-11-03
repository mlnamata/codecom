// VectorLab rule checks evaluated in page: returns JSON string.
(() => {
  const vis = (e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const out = {};
  // typography: line-height on headings & body
  const lh = [];
  document.querySelectorAll('h1,h2,h3,h4,p,li,td,dd').forEach((e) => {
    if (!vis(e) || !e.textContent.trim()) return;
    const s = getComputedStyle(e); const fs = parseFloat(s.fontSize); const l = s.lineHeight === 'normal' ? 1.2 * fs : parseFloat(s.lineHeight);
    const ratio = +(l / fs).toFixed(2); const isHead = /^H/.test(e.tagName) || fs >= 24;
    if (isHead && (ratio < 1.1 || ratio > 1.3)) lh.push(e.tagName + ' ' + fs + 'px lh ' + ratio + ' "' + e.textContent.trim().slice(0, 30) + '"');
    if (!isHead && (ratio < 1.4 || ratio > 1.65)) lh.push(e.tagName + ' ' + fs + 'px lh ' + ratio + ' "' + e.textContent.trim().slice(0, 30) + '"');
  });
  out.lineHeight = lh.slice(0, 12); out.lineHeightCount = lh.length;
  // weights
  const w = new Set(); const sizes = new Set(); const small = [];
  document.querySelectorAll('body *').forEach((e) => { if (!vis(e)) return; const t = [...e.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim()); if (!t) return; const s = getComputedStyle(e); w.add(s.fontWeight); sizes.add(s.fontSize); if (parseFloat(s.fontSize) < 12) small.push(e.tagName + ' ' + s.fontSize); });
  out.weights = [...w].sort(); out.sizes = [...sizes].sort((a, b) => parseFloat(a) - parseFloat(b)); out.under12 = small.slice(0, 5);
  // measure: paragraphs wider than 75ch
  const longp = [];
  document.querySelectorAll('p, li, dd').forEach((e) => {
    if (!vis(e)) return; const txt = e.textContent.trim(); if (txt.length < 120) return;
    const s = getComputedStyle(e); const fs = parseFloat(s.fontSize); const r = e.getBoundingClientRect();
    const c = document.createElement('canvas').getContext('2d'); c.font = s.fontWeight + ' ' + s.fontSize + ' ' + s.fontFamily; const chW = c.measureText('0').width || fs * 0.5;
    const ch = Math.round(r.width / chW);
    if (ch > 80) longp.push(ch + 'ch "' + txt.slice(0, 40) + '"');
  });
  out.longLines = longp.slice(0, 6);
  // tables: framed?
  out.tables = [...document.querySelectorAll('table')].filter(vis).map((t) => {
    let e = t; let framed = false;
    for (let i = 0; i < 3 && e && e !== document.body; i++, e = e.parentElement) { const s = getComputedStyle(e); if (parseFloat(s.borderTopWidth) >= 1 && s.borderTopStyle !== 'none' && parseFloat(s.borderLeftWidth) >= 1) framed = true; }
    const rows = t.querySelectorAll('tbody tr'); const hair = rows.length ? parseFloat(getComputedStyle(rows[0]).borderBottomWidth) >= 1 || parseFloat(getComputedStyle(rows[0].cells[0]).borderBottomWidth) >= 1 : false;
    return { framed, hairlines: hair, caption: (t.caption && t.caption.textContent.trim().slice(0, 30)) || '' };
  });
  // nav collapse on narrow
  const nav = document.querySelector('nav[aria-label="Hlavní menu"]');
  out.mainNav = nav ? { visible: vis(nav), height: Math.round(nav.getBoundingClientRect().height), hasMenuButton: !!document.querySelector('.nav-narrow summary') } : null;
  // targets under 44 for buttons and standalone links
  out.overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
  // banned pills on static text: elements with border-radius >= 999 and no interactivity
  out.staticPills = [...document.querySelectorAll('span,p,div')].filter((e) => vis(e) && parseFloat(getComputedStyle(e).borderTopLeftRadius) >= 12 && e.textContent.trim().length < 30 && e.textContent.trim().length > 0 && !e.closest('a,button') && getComputedStyle(e).backgroundColor !== 'rgba(0, 0, 0, 0)' && e.children.length === 0).map((e) => e.textContent.trim()).slice(0, 8);
  // buttons
  out.buttons = [...document.querySelectorAll('button')].filter(vis).map((b) => (b.textContent.trim() || b.getAttribute('aria-label') || '').slice(0, 28));
  return JSON.stringify(out);
})();
