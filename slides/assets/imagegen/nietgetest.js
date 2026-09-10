// Waarschuwingsbordje bij een technisch stuk: dit heb ik niet zelf uitgeprobeerd,
// de AI heeft het geschreven. Bedoeld als klein plaatje naast of boven zo'n stuk.
// Draaien vanuit de imagegen-map:  node nietgetest.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1000, 300);

// ---------- het bordje ----------
// Lichtjes scheef, zoals iemand dat vasthoudt. Alles draait rond (BX, BY).
const BX = 612, BY = 112, BW = 656, BH = 172;
const A = -2.5 * Math.PI / 180;
const draai = (x, y) => {
  const dx = x - BX, dy = y - BY;
  return [BX + dx * Math.cos(A) - dy * Math.sin(A), BY + dx * Math.sin(A) + dy * Math.cos(A)];
};
const hoek = [[-1, -1], [1, -1], [1, 1], [-1, 1]]
  .map(([sx, sy]) => draai(BX + sx * BW / 2, BY + sy * BH / 2));

c.poly(hoek, { fill: C.WHITE, fillStyle: 'solid', stroke: C.RED, strokeWidth: 3.4, roughness: 1.5, bowing: 1.3 });

const scheef = el => el.setAttribute('transform', `rotate(${-2.5} ${BX} ${BY})`);
scheef(c.txt(BX, BY - 10, 'NIET GETEST', 66, C.RED_DARK, 700));
scheef(c.txt(BX, BY + 54, 'volledig door de AI gemaakt', 42, C.GRAY, 600));

// ---------- het ventje ----------
const FX = 140, G = 278;                     // voeten op de vloer
const k = C.GRAY, sw = 3.4;
const hy = G - 200, nek = G - 172, ay = G - 148, heup = G - 72, R = 30;

c.circle(FX, hy, R * 2, { fill: C.WHITE, fillStyle: 'solid', stroke: k, strokeWidth: sw, roughness: 1.2 });
c.circle(FX - 13, hy - 8, 10, { fill: k, fillStyle: 'solid', stroke: k, strokeWidth: 1.2 });
c.circle(FX + 13, hy - 8, 10, { fill: k, fillStyle: 'solid', stroke: k, strokeWidth: 1.2 });
// scheve mond: niet helemaal gerust op zijn stuk
c.path(`M ${FX - 18} ${hy + 22} Q ${FX} ${hy + 6} ${FX + 18} ${hy + 20}`, { stroke: k, strokeWidth: 2.8, roughness: 1.3 });

c.line(FX, nek, FX, heup, { stroke: k, strokeWidth: sw, roughness: 1.3 });
c.line(FX, ay, FX - 52, ay + 46, { stroke: k, strokeWidth: sw, roughness: 1.3 });   // arm omlaag
c.line(FX, heup, FX - 40, G, { stroke: k, strokeWidth: sw, roughness: 1.3 });
c.line(FX, heup, FX + 40, G, { stroke: k, strokeWidth: sw, roughness: 1.3 });

// de arm die het bordje ophoudt, tot aan de linkerrand ervan
const [gx, gy] = draai(BX - BW / 2, BY - 56);
c.line(FX, ay, gx - 14, gy + 6, { stroke: k, strokeWidth: sw, roughness: 1.3 });
c.ellipse(gx, gy, 40, 30, { fill: C.WHITE, fillStyle: 'solid', stroke: k, strokeWidth: 2.6, roughness: 1.2 });

// vloer
c.line(FX - 78, G + 6, FX + 78, G + 6, { stroke: k, strokeWidth: 2.4, roughness: 2 });

c.txt(BX, 258, 'kijk het zelf na voor je het overneemt', 42, C.RED_DARK, 700);

c.save('.', 'nietgetest', '');
