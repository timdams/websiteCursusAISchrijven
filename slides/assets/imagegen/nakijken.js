// Stap 7. Drie dingen die er goed uitzien en het niet zijn.
//
// Beamermaat: canvas 1560 breed, zie MAATVOERING.md. Kleinste tekst 34.
// Draaien vanuit de imagegen-map:  node nakijken.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 620);

const KW = 480, KY = 30, KH = 460;
const kx = i => 30 + i * 510;

const kolommen = [
  {
    kop: ['een bron die', 'niet bestaat'],
    voor: ['(Janssens & De Vos,', '2019, p. 84)'],
    na: ['het boek bestaat.', 'die bladzijde niet.'],
  },
  {
    kop: ['een definitie net', 'naast de jouwe'],
    voor: ['"een functie is', 'een verband"'],
    na: ['jij zegt al tien jaar', '"een voorschrift".'],
  },
  {
    kop: ['bullets waar een', 'redenering hoorde'],
    voor: ['sneller', 'goedkoper', 'nauwkeuriger'],
    na: ['en waarom volgt', 'het een uit het ander?'],
  },
];

kolommen.forEach((k, i) => {
  const x = kx(i);
  c.rect(x, KY, KW, KH, { strokeWidth: 2.6, roughness: 1.4 });

  c.lines(x + KW / 2, KY + 72, k.kop, 40, C.RED_DARK, 700, 'middle', 1.2);
  c.line(x + 45, KY + 158, x + KW - 45, KY + 158, { stroke: C.RED, strokeWidth: 2, roughness: 1.8 });

  // wat de AI je gaf
  c.rect(x + 45, KY + 190, KW - 90, 150, { strokeWidth: 2, roughness: 1.5 });
  const st = KY + 190 + (150 - (k.voor.length - 1) * 44) / 2 + 12;
  c.lines(x + KW / 2, st, k.voor, 34, C.GRAY, 500, 'middle', 1.29);

  // en wat er dan mis is
  c.lines(x + KW / 2, KY + 392, k.na, 34, C.RED_DARK, 700, 'middle', 1.25);
});

c.txt(780, 578, 'lees elk stuk dat je overneemt, met je regels ernaast', 38, C.GRAY, 600);

c.save('.', 'nakijken', '');
