/*
 * excal.js - gedeelde Excalidraw-stijl helpers voor Zie Scherp Scherper.
 * Zie CLAUDE.md > "Afbeeldingen moderniseren". Niet de stijl wijzigen zonder Tim.
 *
 * Deps: npm i roughjs jsdom @fontsource/caveat @resvg/resvg-js
 * Fonts: caveat-700.ttf / caveat-400.ttf naast dit bestand (voor PNG-render).
 */
const { JSDOM } = require('jsdom');
const rough = require('roughjs');
const fs = require('fs');
const path = require('path');

const C = {
  RED: '#FF0000', RED_DARK: '#B30000', RED_LIGHT: '#FFE5E5',
  GRAY: '#4D4D4D', OFFWHITE: '#f8f9fa', WHITE: '#ffffff',
  BOX_TOP: '#fbe9e9', BOX_SIDE: '#f3d4d4'
};
const SVGNS = 'http://www.w3.org/2000/svg';

function createCanvas(W, H) {
  const dom = new JSDOM('<!DOCTYPE html><body></body>');
  const document = dom.window.document;
  const svg = document.createElementNS(SVGNS, 'svg');
  svg.setAttribute('xmlns', SVGNS);
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('width', W); svg.setAttribute('height', H);
  svg.setAttribute('font-family', 'Caveat, cursive');
  const rc = rough.svg(svg);
  const bg = document.createElementNS(SVGNS, 'rect');
  bg.setAttribute('width', W); bg.setAttribute('height', H); bg.setAttribute('fill', C.OFFWHITE);
  svg.appendChild(bg);

  const api = { svg, rc, document, C, W, H };

  api.txt = (x, y, s, size = 36, color = C.GRAY, weight = 400, anchor = 'middle') => {
    const t = document.createElementNS(SVGNS, 'text');
    t.setAttribute('x', x); t.setAttribute('y', y); t.setAttribute('font-size', size);
    t.setAttribute('fill', color); t.setAttribute('font-weight', weight);
    t.setAttribute('text-anchor', anchor); t.setAttribute('font-family', 'Caveat, cursive');
    t.textContent = s; svg.appendChild(t); return t;
  };
  // mixed-color inline text via tspan (array of {t, color, weight} segments)
  api.txtSegs = (x, y, segs, size = 32, anchor = 'start') => {
    const el = document.createElementNS(SVGNS, 'text');
    el.setAttribute('x', x); el.setAttribute('y', y);
    el.setAttribute('font-size', size);
    el.setAttribute('text-anchor', anchor);
    el.setAttribute('font-family', 'Caveat, cursive');
    segs.forEach(seg => {
      const ts = document.createElementNS(SVGNS, 'tspan');
      ts.setAttribute('fill', seg.color || C.GRAY);
      ts.setAttribute('font-weight', seg.weight || 500);
      ts.textContent = seg.t;
      el.appendChild(ts);
    });
    svg.appendChild(el); return el;
  };
  api.lines = (x, y, arr, size = 32, color = C.GRAY, weight = 400, anchor = 'middle', lh = 1.05) => {
    arr.forEach((s, i) => api.txt(x, y + i * size * lh, s, size, color, weight, anchor));
  };
  api.rect = (x, y, w, h, o = {}) => svg.appendChild(rc.rectangle(x, y, w, h, {
    fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 2, roughness: 1.5, bowing: 1, ...o
  }));
  api.line = (x1, y1, x2, y2, o = {}) => svg.appendChild(rc.line(x1, y1, x2, y2, {
    stroke: C.GRAY, strokeWidth: 2, roughness: 1.5, ...o
  }));
  api.poly = (pts, o = {}) => svg.appendChild(rc.polygon(pts, {
    fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 2, roughness: 1.4, bowing: 1, ...o
  }));
  api.path = (d, o = {}) => svg.appendChild(rc.path(d, { stroke: C.GRAY, strokeWidth: 2, roughness: 1.4, fill: 'none', ...o }));
  api.circle = (cx, cy, dia, o = {}) => svg.appendChild(rc.circle(cx, cy, dia, { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 2, roughness: 1.4, ...o }));
  api.ellipse = (cx, cy, w, h, o = {}) => svg.appendChild(rc.ellipse(cx, cy, w, h, { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 2, roughness: 1.4, ...o }));

  function head(x, y, ang, o = {}) {
    const len = o.head || 16, sp = 0.5;
    api.line(x, y, x - len * Math.cos(ang - sp), y - len * Math.sin(ang - sp), o);
    api.line(x, y, x - len * Math.cos(ang + sp), y - len * Math.sin(ang + sp), o);
  }
  api.arrow = (x1, y1, x2, y2, o = {}) => { api.line(x1, y1, x2, y2, o); head(x2, y2, Math.atan2(y2 - y1, x2 - x1), o); };
  // gebogen pijl via quadratische bezier (controlepunt cx,cy)
  api.carrow = (x1, y1, cx, cy, x2, y2, o = {}) => {
    api.path(`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`, o);
    head(x2, y2, Math.atan2(y2 - cy, x2 - cx), o);
  };

  api.bubble = (cx, top, w, h, label, tx, ty, size = 36) => {
    api.rect(cx - w / 2, top, w, h, { stroke: C.GRAY, strokeWidth: 2.2, roughness: 1.6, bowing: 1.2 });
    api.line(cx + w * 0.05, top + h, tx, ty, { strokeWidth: 2.2, roughness: 1.8 });
    const arr = Array.isArray(label) ? label : [label];
    const startY = top + h / 2 - (arr.length - 1) * size * 0.5 + size * 0.32;
    arr.forEach((s, i) => api.txt(cx, startY + i * size, s, size, C.RED_DARK, 700));
  };
  api.cell = (x, y, w, h, value, o = {}) => {
    api.rect(x, y, w, h, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 6, fillWeight: 1.5,
      stroke: C.RED, strokeWidth: 2.4, roughness: 1.5, ...o });
    if (value !== undefined && value !== '') api.txt(x + w / 2, y + h / 2 + h * 0.16, value, o.size || 34, C.GRAY, 700);
  };
  api.box3d = (x, y, w, h, label, o = {}) => {
    const d = o.depth || 26, size = o.size || 28;
    api.poly([[x, y], [x + d, y - d], [x + w + d, y - d], [x + w, y]], { fill: C.BOX_TOP, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 1.8, roughness: 1.3 });
    api.poly([[x + w, y], [x + w + d, y - d], [x + w + d, y + h - d], [x + w, y + h]], { fill: C.BOX_SIDE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 1.8, roughness: 1.3 });
    api.rect(x, y, w, h, { fill: C.WHITE, fillStyle: 'solid', strokeWidth: 2, roughness: 1.4 });
    const arr = Array.isArray(label) ? label : [label];
    const startY = y + h / 2 - (arr.length - 1) * size * 0.5 + size * 0.32;
    arr.forEach((s, i) => api.txt(x + w / 2, startY + i * size, s, size, C.GRAY, 600));
  };

  api.save = (dir, name, pngSuffix = 'NEW') => {
    try {
      const woff2 = require.resolve('@fontsource/caveat/files/caveat-latin-700-normal.woff2');
      const b = fs.readFileSync(woff2).toString('base64');
      const style = document.createElementNS(SVGNS, 'style');
      style.textContent = `@font-face{font-family:'Caveat';font-weight:700;src:url(data:font/woff2;base64,${b}) format('woff2');}`;
      svg.insertBefore(style, svg.firstChild);
    } catch (e) { console.warn('font niet ingebed:', e.message); }
    fs.writeFileSync(path.join(dir, name + '.svg'), svg.outerHTML);
    try {
      const { Resvg } = require('@resvg/resvg-js');
      const fonts = ['caveat-700.ttf', 'caveat-400.ttf'].map(f => path.join(__dirname, f)).filter(fs.existsSync);
      const r = new Resvg(svg.outerHTML, { font: { fontFiles: fonts, defaultFontFamily: 'Caveat', loadSystemFonts: false }, background: 'white' });
      fs.writeFileSync(path.join(dir, '..', name + pngSuffix + '.png'), r.render().asPng());
    } catch (e) { console.warn('PNG niet gerenderd:', e.message); }
    console.log(name, 'klaar');
  };

  return api;
}
module.exports = { createCanvas, C };
