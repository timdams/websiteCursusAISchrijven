// Module 2 - het blad heeft drie delen, en het derde is het deel dat je nog niet hebt
// Draaien vanuit de imagegen-map:  node driedelen.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1420, 770);

// ---------- het blad ----------
const BX = 110, BY = 80, BW = 700, BH = 640;
c.rect(BX, BY, BW, BH, { strokeWidth: 2.6 });
c.txt(BX + BW / 2, BY + 46, 'je afsprakendocument', 34, C.GRAY, 700);

const delen = [
  { y: 140, h: 155, kop: 'wie je publiek is',
    regels: ['eerstejaars, week 3', 'kennen nog geen klassen'] },
  { y: 320, h: 155, kop: 'hoe je klinkt',
    regels: ['je-vorm, Nederlandse termen', 'nuchter, geen uitroeptekens'] },
  { y: 500, h: 175, kop: 'wat je niet wil zien', accent: true,
    regels: ['geen em-dashes', 'geen gladde slotzin', 'geen woord uit hoofdstuk 12'] },
];

delen.forEach(d => {
  const y = BY + d.y - 80;
  const opties = d.accent
    ? { fill: C.RED_LIGHT, fillStyle: 'hachure', hachureGap: 8, fillWeight: 1.4,
        stroke: C.RED, strokeWidth: 2.4 }
    : { strokeWidth: 2.2 };
  c.rect(BX + 40, y, BW - 80, d.h, opties);
  c.txt(BX + BW / 2, y + 46, d.kop, 34, C.RED_DARK, 700);
  c.lines(BX + BW / 2, y + 90, d.regels, 27, C.GRAY, 600, 'middle', 1.3);
});

// ---------- twee opmerkingen ernaast ----------
// accolade langs de eerste twee delen
c.line(852, 150, 852, 470, { strokeWidth: 2 });
c.line(832, 150, 852, 150, { strokeWidth: 2 });
c.line(832, 470, 852, 470, { strokeWidth: 2 });
c.arrow(950, 310, 872, 310, { stroke: C.GRAY, strokeWidth: 2.2, head: 13 });
c.txt(975, 296, 'deze twee zitten', 30, C.GRAY, 600, 'start');
c.txt(975, 336, 'al in je hoofd', 30, C.GRAY, 600, 'start');

// en de wijzer naar het derde deel
c.arrow(950, 585, 832, 585, { stroke: C.RED, strokeWidth: 2.4, head: 14 });
c.txt(975, 571, 'dit deel is het waardevolst,', 30, C.RED_DARK, 700, 'start');
c.txt(975, 611, 'en je hebt het nog niet', 30, C.RED_DARK, 700, 'start');

c.save('.', 'driedelen', '');
