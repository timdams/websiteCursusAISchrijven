// Module 4 - hetzelfde stuk cursus, links als bronbestand en rechts als pagina
// Tekst letterlijk uit content/3_data/4_converteren_casting.md van Zie Scherp Scherper.
// Draaien vanuit de imagegen-map:  node bronenpagina.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1900, 1040);

const PY = 170, PH = 760;
const LX = 70, RX = 1010, PW = 820;

const M = (t) => ({ t, color: C.RED, weight: 700 });   // opmaakteken
const G = (t, w = 500) => ({ t, color: C.GRAY, weight: w });

// ---------- links: het bronbestand ----------
c.txt(LX + PW / 2, 72, 'het bronbestand', 40, C.GRAY, 700);
c.rect(LX, PY, PW, PH, { strokeWidth: 2.4 });

// naamplaatje van het bestand, boven de kader en niet erop
c.rect(LX + 46, PY - 76, 430, 62,
  { fill: C.RED_LIGHT, fillStyle: 'solid', stroke: C.RED, strokeWidth: 2.2 });
c.txt(LX + 261, PY - 34, '4_converteren_casting.md', 30, C.RED_DARK, 700);

const bron = [
  [M('### '), G('Narrowing')],
  [],
  [G('Casting doe je wanneer je een variabele wilt')],
  [G('toekennen aan een andere variabele van een')],
  [G('ander type dat daar eigenlijk '), M('**'), G('niet inpast'), M('**')],
  [G('zonder dataverlies. We moeten dan aan')],
  [M('**'), G('narrowing'), M('**'), G(' doen, letterlijk het versmallen')],
  [G('van de data.')],
  [],
  [G('Bekijk eens het volgende voorbeeld:')],
  [],
  [M('```java')],
  [G('double hoofdMeting;')],
  [G('int secundaireMeting;')],
  [G('hoofdMeting = 20.4;')],
  [G('secundaireMeting = hoofdMeting;')],
  [M('```')],
  [],
  [G('Dit zal niet gaan.')],
];
bron.forEach((segs, i) => {
  if (segs.length) c.txtSegs(LX + 44, PY + 62 + i * 38, segs, 28, 'start');
});

// ---------- rechts: dezelfde tekst als pagina ----------
c.txt(RX + PW / 2, 72, 'de gepubliceerde pagina', 40, C.GRAY, 700);
c.rect(RX, PY, PW, PH, { strokeWidth: 2.4 });

const TX = RX + 44;
c.txt(TX, PY + 82, 'Narrowing', 50, C.GRAY, 700, 'start');
c.line(TX, PY + 104, TX + 240, PY + 104, { strokeWidth: 2, roughness: 1.8 });

const alinea = [
  [G('Casting doe je wanneer je een variabele wilt')],
  [G('toekennen aan een andere variabele van een')],
  [G('ander type dat daar eigenlijk '), G('niet inpast', 700)],
  [G('zonder dataverlies. We moeten dan aan')],
  [G('narrowing', 700), G(' doen, letterlijk het versmallen')],
  [G('van de data.')],
];
alinea.forEach((segs, i) => c.txtSegs(TX, PY + 170 + i * 42, segs, 30, 'start'));

c.txt(TX, PY + 462, 'Bekijk eens het volgende voorbeeld:', 30, C.GRAY, 500, 'start');

c.rect(TX, PY + 492, 700, 196,
  { fill: C.RED_LIGHT, fillStyle: 'solid', stroke: C.RED, strokeWidth: 2.2, roughness: 1.3 });
[
  'double hoofdMeting;',
  'int secundaireMeting;',
  'hoofdMeting = 20.4;',
  'secundaireMeting = hoofdMeting;',
].forEach((r, i) => c.txt(TX + 28, PY + 534 + i * 42, r, 28, C.RED_DARK, 600, 'start'));

c.txt(TX, PY + 730, 'Dit zal niet gaan.', 30, C.GRAY, 500, 'start');

// ---------- van links naar rechts ----------
c.arrow(LX + PW + 18, PY + PH / 2, RX - 18, PY + PH / 2,
  { stroke: C.RED, strokeWidth: 2.6, head: 16 });

c.save('.', 'bronenpagina', '');
