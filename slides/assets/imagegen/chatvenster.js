// Ja maar, ik werk in een chatvenster - waar de drie plekken zitten in een project van Claude.
// Draaien vanuit de imagegen-map:  node chatvenster.js
const fs = require('fs');
const path = require('path');
const { createCanvas, C } = require('./excal');

const c = createCanvas(1030, 960);

// ---------- de schermafdruk zelf ----------
// claude.png is het hele venster; we tonen enkel de kaart rechts.
const SRC = path.join(__dirname, '..', 'claude.png');
const SW = 1497, SH = 1181;                     // ware grootte van het venster
const CX = 928, CY = 217, CW = 528, CH = 911;   // de kaart daarin
const X = 25, Y = 25;                           // waar ze op dit canvas komt

const NS = 'http://www.w3.org/2000/svg';
const d = c.document;
const defs = d.createElementNS(NS, 'defs');
const clip = d.createElementNS(NS, 'clipPath');
clip.setAttribute('id', 'kaart');
const cr = d.createElementNS(NS, 'rect');
cr.setAttribute('x', X); cr.setAttribute('y', Y);
cr.setAttribute('width', CW); cr.setAttribute('height', CH);
clip.appendChild(cr); defs.appendChild(clip); c.svg.appendChild(defs);

const g = d.createElementNS(NS, 'g');
g.setAttribute('clip-path', 'url(#kaart)');
const img = d.createElementNS(NS, 'image');
img.setAttribute('x', X - CX); img.setAttribute('y', Y - CY);
img.setAttribute('width', SW); img.setAttribute('height', SH);
img.setAttribute('href', 'data:image/png;base64,' + fs.readFileSync(SRC).toString('base64'));
g.appendChild(img); c.svg.appendChild(g);

// ---------- de drie rijen aanduiden ----------
// y op dit canvas = Y + (y in de schermafdruk - CY)
const rij = (top, bot) => [Y + (top - CY) + 6, bot - top - 12];
const kader = { fill: undefined, stroke: C.RED, strokeWidth: 2.6, roughness: 1.5, bowing: 1.2 };
const pijl = { stroke: C.RED, strokeWidth: 2.6, head: 16, roughness: 1.4 };

const [iy, ih] = rij(217, 337);   // Instructions
const [cy2, ch] = rij(481, 856);  // Context
const [fy, fh] = rij(856, 1008);  // Folder

c.rect(30, iy, 518, ih, kader);
c.rect(30, cy2, 518, ch, kader);
c.rect(30, fy, 518, fh, kader);

// ---------- de labels ----------
const label = (mid, regels, size = 40) => {
  c.arrow(700, mid, 572, mid, pijl);
  const start = mid - (regels.length - 1) * size * 0.55 + size * 0.34;
  regels.forEach((s, i) => c.txt(712, start + i * size * 1.05, s, size, C.RED_DARK, 700, 'start'));
};

label(iy + ih / 2, ['hier komen je regels', '(je claude.md)']);
label(cy2 + ch / 2, ['hier sleep je', 'context/ en content/', 'in. Ze blijven staan.']);
label(fy + fh / 2, ['of wijs naar een map', 'op je eigen schijf']);

c.save('.', 'chatvenster', '');
