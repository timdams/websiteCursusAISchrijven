// Gedeelde onderdelen voor de stripversie van de origin story: panelen,
// bijschriftvakjes, stokfiguurtjes en tekstballonnen. Zelfde rough.js-stijl als
// de rest, zodat de strip niet uit een ander boekje komt.
//
// Beamermaat: alle strips zijn 1560 bij 640, zie MAATVOERING.md.
const { C } = require('./excal');

const GROND = 545;   // de vloer waar de figuurtjes op staan
const PY = 20, PH = 600;

// Een paneel van de strip. Twee per tekening.
function paneel(c, x, w) {
  c.rect(x, PY, w, PH, { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY,
    strokeWidth: 3.2, roughness: 1.2 });
}

// Het vakje links boven in een paneel dat zegt wanneer we zijn.
function bijschrift(c, x, tekst) {
  const breed = tekst.length * 32 * 0.34 + 44;
  c.rect(x, PY + 22, breed, 54, { fill: C.OFFWHITE, fillStyle: 'solid',
    stroke: C.GRAY, strokeWidth: 2.2, roughness: 1.4 });
  c.txt(x + breed / 2, PY + 58, tekst, 32, C.GRAY, 700);
  return breed;
}

// Stokfiguurtje. (x, GROND) is de vloer tussen de voeten.
// armen: 'omhoog' | 'uit' | 'wijzen'     gezicht: 'blij' | 'paniek' | 'twijfel'
function poppetje(c, x, o = {}) {
  const k = C.GRAY, sw = 3.2;
  const y = o.grond || GROND;
  const hy = y - 232, nek = y - 194, heup = y - 84, ay = y - 162;
  const R = 36;

  c.circle(x, hy, R * 2, { fill: C.WHITE, fillStyle: 'solid', stroke: k, strokeWidth: sw, roughness: 1.2 });
  c.circle(x - 16, hy - 9, 11, { fill: k, fillStyle: 'solid', stroke: k, strokeWidth: 1.2 });
  c.circle(x + 16, hy - 9, 11, { fill: k, fillStyle: 'solid', stroke: k, strokeWidth: 1.2 });

  if (o.gezicht === 'paniek') {
    c.ellipse(x, hy + 18, 32, 26, { fill: C.WHITE, fillStyle: 'solid', stroke: k, strokeWidth: 2.4, roughness: 1.2 });
    // schrikstreepjes boven het hoofd, buiten het bereik van de armen
    [[-28, -38], [0, -44], [28, -38]].forEach(([dx, dy]) =>
      c.line(x + dx, hy + dy - 6, x + dx * 1.35, hy + dy - 26,
        { stroke: k, strokeWidth: 2.6, roughness: 1.4 }));
  } else if (o.gezicht === 'twijfel') {
    c.path(`M ${x - 21} ${hy + 24} Q ${x} ${hy + 8} ${x + 21} ${hy + 22}`,
      { stroke: k, strokeWidth: 2.8, roughness: 1.3 });
  } else {
    c.path(`M ${x - 23} ${hy + 9} Q ${x} ${hy + 34} ${x + 23} ${hy + 9}`,
      { stroke: k, strokeWidth: 3, roughness: 1.2 });
  }

  c.line(x, nek, x, heup, { stroke: k, strokeWidth: sw, roughness: 1.3 });

  if (o.armen === 'omhoog') {
    c.line(x, ay, x - 56, ay - 62, { stroke: k, strokeWidth: sw, roughness: 1.3 });
    c.line(x, ay, x + 56, ay - 62, { stroke: k, strokeWidth: sw, roughness: 1.3 });
  } else if (o.armen === 'wijzen') {
    c.line(x, ay, x - 48, ay + 42, { stroke: k, strokeWidth: sw, roughness: 1.3 });
    c.line(x, ay, x + 74, ay - 12, { stroke: k, strokeWidth: sw, roughness: 1.3 });
  } else {
    c.line(x, ay, x - 56, ay + 44, { stroke: k, strokeWidth: sw, roughness: 1.3 });
    c.line(x, ay, x + 56, ay + 44, { stroke: k, strokeWidth: sw, roughness: 1.3 });
  }

  c.line(x, heup, x - 42, y, { stroke: k, strokeWidth: sw, roughness: 1.3 });
  c.line(x, heup, x + 42, y, { stroke: k, strokeWidth: sw, roughness: 1.3 });

  if (o.naam) c.txt(x, y + 50, o.naam, 30, C.GRAY, 600);
  return { hoofd: hy, top: hy - R };
}

// Tekstballon met twee staartlijnen naar wie er praat.
function ballon(c, cx, top, regels, naarX, naarY, o = {}) {
  const size = o.size || 34;
  const langste = Math.max(...regels.map(r => r.length));
  const breed = o.breed || langste * size * 0.34 + 56;
  const hoog = regels.length * size * 1.25 + 40;

  c.rect(cx - breed / 2, top, breed, hoog, { fill: C.WHITE, fillStyle: 'solid',
    stroke: C.RED, strokeWidth: 2.8, roughness: 1.4 });

  const sx = naarX > cx ? cx + breed * 0.18 : cx - breed * 0.18;
  c.line(sx - 17, top + hoog, naarX, naarY, { stroke: C.RED, strokeWidth: 2.6, roughness: 1.4 });
  c.line(sx + 17, top + hoog, naarX, naarY, { stroke: C.RED, strokeWidth: 2.6, roughness: 1.4 });

  const start = top + 30 + size * 0.34;
  regels.forEach((r, i) => c.txt(cx, start + i * size * 1.25, r, size, C.RED_DARK, 700));
  return top + hoog;
}

// Een scheve stapel papier, van de vloer omhoog.
function stapel(c, x, aantal, breed = 150) {
  for (let i = 0; i < aantal; i++) {
    c.rect(x - breed / 2 + (i % 2 ? 7 : -4), GROND - 22 - i * 26, breed, 22,
      { strokeWidth: 2, roughness: 1.7 });
  }
}

module.exports = { paneel, bijschrift, poppetje, ballon, stapel, GROND, PY, PH };
