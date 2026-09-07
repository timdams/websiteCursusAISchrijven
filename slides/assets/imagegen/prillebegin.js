// Het anker vooraan: wat op het scherm staat is vers, wat verteld wordt komt
// uit de stapel ernaast. Beide stapels staan op dezelfde grondlijn, dus het
// hoogteverschil is het hele punt.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 34.
// Draaien vanuit de imagegen-map:  node prillebegin.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 620);

const GROND = 480, BW = 300, VEL = 26, SPRONG = 32;

// Een stapel bladen, van onder naar boven opgebouwd vanaf de grondlijn.
function stapel(cx, aantal, rood) {
  for (let i = 0; i < aantal; i++) {
    const y = GROND - VEL - i * SPRONG;
    c.rect(cx - BW / 2, y, BW, VEL, rood
      ? { fill: C.RED_LIGHT, fillStyle: 'solid', stroke: C.RED, strokeWidth: 2.2, roughness: 1.5 }
      : { strokeWidth: 2, roughness: 1.5 });
  }
}

// ---------- links: deze talk ----------
const LX = 430;

c.lines(LX, 152, ['grote stukken voelen', 'nog AI aan'], 36, C.RED_DARK, 700, 'middle', 1.2);
c.arrow(LX, 218, LX, 312, { stroke: C.RED, strokeWidth: 2.6, roughness: 1.3, head: 18 });

c.txt(LX, 358, 'deze talk en de site', 40, C.RED_DARK, 700);
stapel(LX, 3, true);
c.txt(LX, 548, 'twee weken, met Claude erbij', 34, C.GRAY, 600);

// ---------- rechts: het echte werk ----------
const RX = 1140;

c.txt(RX, 78, 'mijn eigen olods', 40, C.GRAY, 700);
stapel(RX, 12, false);
c.txt(RX, 548, 'jaren zweten en zwoegen', 34, C.GRAY, 600);

// ---------- en waar de aanpak vandaan komt ----------
c.carrow(970, 430, 780, 545, 600, 455,
  { stroke: C.RED, strokeWidth: 2.6, roughness: 1.3, strokeLineDash: [13, 9], head: 18 });

c.save('.', 'prillebegin', '');
