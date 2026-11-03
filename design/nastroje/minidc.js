// Minimal DC runtime for local review: helmet -> head, {{path}}, sc-for, sc-if, onX handlers, setState re-render.
window.__miniDC = function (code) {
  const host = document.querySelector('x-dc');
  const helmet = host.querySelector('helmet');
  if (helmet) { [...helmet.childNodes].forEach((n) => document.head.appendChild(n)); helmet.remove(); }
  const tpl = host.cloneNode(true);
  let inst;
  class DCLogic { constructor(p) { this.props = p || {}; this.state = {}; } setState(o) { Object.assign(this.state, o); render(); } }
  const Component = new Function('DCLogic', code + '\nreturn Component;')(DCLogic);
  inst = new Component({});
  const get = (expr, scope) => {
    expr = expr.trim();
    if (expr === 'true') return true; if (expr === 'false') return false;
    const parts = expr.split('.'); let v = scope[parts[0]];
    for (const p of parts.slice(1)) v = v == null ? undefined : v[p];
    return v;
  };
  const interp = (s, scope) => s.replace(/\{\{([^}]+)\}\}/g, (m, e) => { const v = get(e, scope); return v == null ? '' : String(v); });
  const walk = (node, scope) => {
    if (node.nodeType === 3) return [document.createTextNode(interp(node.nodeValue, scope))];
    if (node.nodeType !== 1) return [];
    const tag = node.tagName.toLowerCase();
    if (tag === 'sc-for') {
      const list = get(node.getAttribute('list').replace(/[{}]/g, ''), scope) || [];
      const as = node.getAttribute('as'); const out = [];
      list.forEach((item) => { const s = Object.assign({}, scope, { [as]: item }); node.childNodes.forEach((c) => out.push(...walk(c, s))); });
      return out;
    }
    if (tag === 'sc-if') {
      const v = get(node.getAttribute('value').replace(/[{}]/g, ''), scope);
      if (!v) return [];
      const out = []; node.childNodes.forEach((c) => out.push(...walk(c, scope))); return out;
    }
    const el = node.namespaceURI && node.namespaceURI !== 'http://www.w3.org/1999/xhtml' ? document.createElementNS(node.namespaceURI, node.localName) : document.createElement(node.localName);
    for (const a of node.attributes) {
      const m = a.name.match(/^on(.+)$/i);
      if (m && /\{\{/.test(a.value)) {
        const fn = get(a.value.replace(/[{}]/g, ''), scope);
        const ev = m[1].toLowerCase() === 'change' ? 'input' : m[1].toLowerCase();
        if (typeof fn === 'function') el.addEventListener(ev, (e) => fn(e));
        continue;
      }
      el.setAttribute(a.name, interp(a.value, scope));
      if (a.name === 'value' && 'value' in el) el.value = interp(a.value, scope);
    }
    node.childNodes.forEach((c) => walk(c, scope).forEach((n) => el.appendChild(n)));
    return [el];
  };
  function render() {
    const vals = inst.renderVals();
    const active = document.activeElement && document.activeElement.id;
    host.innerHTML = '';
    tpl.childNodes.forEach((c) => walk(c, vals).forEach((n) => host.appendChild(n)));
    if (active) { const a = document.getElementById(active); if (a) a.focus(); }
  }
  render();
};
