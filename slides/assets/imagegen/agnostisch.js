// Iedereen zit met een andere combinatie van abonnement en toolset, en ze komen
// allemaal op dezelfde volgorde uit. De verhouding is het punt: links een rommelig
// rijtje, rechts één blok.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 34.
// Draaien vanuit de imagegen-map:  node agnostisch.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 600);

// ---------- links: wat jij hebt ----------
const BX = 90, BW = 340, BH = 66, STAP = 82;
const by = i => 70 + i * STAP;

c.txt(BX + BW / 2, 40, 'wat jij hebt', 40, C.GRAY, 700);

['Claude', 'ChatGPT', 'Gemini', 'Copilot', 'VS Code of terminal', 'nog geen abonnement']
  .forEach((s, i) => {
    c.rect(BX, by(i), BW, BH, { strokeWidth: 2.4, roughness: 1.5 });
    c.txt(BX + BW / 2, by(i) + BH / 2 + 12, s, 34, C.GRAY, 600);
  });

// ---------- de beugel die ze samenneemt ----------
const TOP = by(0) + 8, BOT = by(5) + BH - 8, MID = (TOP + BOT) / 2;
const beugel = { stroke: C.GRAY, strokeWidth: 2.6, roughness: 1.5 };
c.line(470, TOP, 470, BOT, beugel);
c.line(450, TOP, 470, TOP, beugel);
c.line(450, BOT, 470, BOT, beugel);
c.line(470, MID, 500, MID, beugel);

// ---------- rechts: dezelfde volgorde ----------
c.arrow(520, MID, 750, MID, { stroke: C.RED, strokeWidth: 4, roughness: 1.4, head: 24 });

c.txt(1110, 40, 'in deze talk', 40, C.GRAY, 700);
c.rect(790, 130, 640, 346, { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 8,
  fillWeight: 1.6, stroke: C.RED, strokeWidth: 3, roughness: 1.4 });
c.txt(1110, 292, 'dezelfde volgorde', 56, C.RED_DARK, 700);
c.txt(1110, 362, 'wat je doet, en waarom', 40, C.RED_DARK, 600);

c.save('.', 'agnostisch', '');
