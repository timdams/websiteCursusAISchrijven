// Een tekening uit een beeldgenerator vrijstaand maken: het papier eruit, de
// inkt houden, en bijsnijden tot wat er overblijft.
//
// Waarom dit moet: een beeldgenerator levert altijd een gevulde rechthoek. Plak
// je die op een andere tekening, dan zie je het randje van dat vel liggen. Hier
// wordt per pixel uitgerekend hoeveel inkt erop staat (de dekking) en welke
// kleur die inkt heeft, zodat een grijs lijntje van 30% grijs ook op de nieuwe
// ondergrond 30% grijs blijft en het rood rood blijft.
//
// De papierkleur wordt uit de vier hoeken gehaald.
//
// Draaien:  node vrijstaand.js kristof-bron.png kristof.png
const fs = require('fs'), zlib = require('zlib');

// ---------- lezen ----------
function lees(bestand) {
  const buf = fs.readFileSync(bestand);
  let p = 8, idat = [], w, h, colorType;
  while (p < buf.length) {
    const len = buf.readUInt32BE(p), type = buf.toString('ascii', p + 4, p + 8);
    const data = buf.slice(p + 8, p + 8 + len);
    if (type === 'IHDR') { w = data.readUInt32BE(0); h = data.readUInt32BE(4); colorType = data[9]; }
    if (type === 'IDAT') idat.push(data);
    p += len + 12;
  }
  const bpp = { 0: 1, 2: 3, 4: 2, 6: 4 }[colorType];
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = w * bpp, out = Buffer.alloc(h * stride);
  let o = 0;
  for (let y = 0; y < h; y++) {
    const ft = raw[o++], line = raw.slice(o, o + stride); o += stride;
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? out[y * stride + x - bpp] : 0;
      const b = y > 0 ? out[(y - 1) * stride + x] : 0;
      const c = (x >= bpp && y > 0) ? out[(y - 1) * stride + x - bpp] : 0;
      let v = line[x];
      if (ft === 1) v += a; else if (ft === 2) v += b; else if (ft === 3) v += ((a + b) >> 1);
      else if (ft === 4) {
        const pp = a + b - c, pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c);
        v += (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
      }
      out[y * stride + x] = v & 255;
    }
  }
  return { w, h, bpp, px: out };
}

// ---------- schrijven ----------
function crc(buf) {
  let c = ~0;
  for (const b of buf) { c ^= b; for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xEDB88320 & -(c & 1)); }
  return ~c >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const c = Buffer.alloc(4); c.writeUInt32BE(crc(body));
  return Buffer.concat([len, body, c]);
}
function schrijf(bestand, w, h, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const rows = Buffer.alloc(h * (w * 4 + 1));
  for (let y = 0; y < h; y++) {
    rows[y * (w * 4 + 1)] = 0;
    rgba.copy(rows, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  }
  fs.writeFileSync(bestand, Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(rows, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]));
}

// ---------- het werk ----------
const [bron, doel] = process.argv.slice(2);
// Dit is gereedschap en geen tekening. Wie hier per ongeluk binnenvalt met de
// lus die alle scripts in deze map draait, krijgt uitleg en geen stacktrace.
if (!bron || !doel) { console.log('gebruik: node vrijstaand.js <bron.png> <doel.png>'); process.exit(0); }
const { w, h, bpp, px } = lees(bron);
const at = (x, y, k) => px[(y * w + x) * bpp + k];

// papierkleur: het gemiddelde van de vier hoeken
let pr = 0, pg = 0, pb = 0;
[[2, 2], [w - 3, 2], [2, h - 3], [w - 3, h - 3]].forEach(([x, y]) => {
  pr += at(x, y, 0); pg += at(x, y, 1); pb += at(x, y, 2);
});
pr /= 4; pg /= 4; pb /= 4;
const papier = (pr + pg + pb) / 3;
console.log('papier:', Math.round(pr), Math.round(pg), Math.round(pb));

// dekking per pixel, en de bounding box van alles wat inkt is
const alfa = new Float32Array(w * h);
let x0 = w, y0 = h, x1 = -1, y1 = -1;
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  const lum = (at(x, y, 0) + at(x, y, 1) + at(x, y, 2)) / 3;
  let a = (papier - lum) / papier;
  if (a < 0.035) a = 0;                       // papier met een korreltje erin
  if (a > 1) a = 1;
  alfa[y * w + x] = a;
  if (a > 0) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
}
const M = 4;                                   // marge, zodat niets afgesneden staat
x0 = Math.max(0, x0 - M); y0 = Math.max(0, y0 - M);
x1 = Math.min(w - 1, x1 + M); y1 = Math.min(h - 1, y1 + M);
const nw = x1 - x0 + 1, nh = y1 - y0 + 1;

const rgba = Buffer.alloc(nw * nh * 4);
for (let y = 0; y < nh; y++) for (let x = 0; x < nw; x++) {
  const sx = x + x0, sy = y + y0, a = alfa[sy * w + sx], i = (y * nw + x) * 4;
  if (a === 0) continue;
  // de kleur van de inkt zelf: haal het papier dat er nog doorschijnt eruit
  [pr, pg, pb].forEach((p, k) => {
    let v = (at(sx, sy, k) - p * (1 - a)) / a;
    rgba[i + k] = Math.max(0, Math.min(255, Math.round(v)));
  });
  rgba[i + 3] = Math.round(a * 255);
}
schrijf(doel, nw, nh, rgba);
console.log(doel, nw + ' bij ' + nh, '(uitgesneden uit ' + w + ' bij ' + h + ')');
