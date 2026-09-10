// De map van deze repo zelf, met in het rood waar de vier dingen staan. Dit is
// de payoff-tekening: alles wat in het deck los uitgelegd is, staat hier in een
// gewone map die op mijn eigen schijf staat.
//
// De boom is overgetekend van de verkenner in VS Code, rij per rij, ook de
// rommel: node_modules, .vscode en de twee package-bestanden. Zonder die rijen
// leest het als een opgekuiste voorbeeldmap, en dat is het niet.
//
// De kaders lopen van x 94 tot 744, dus alle vier even breed en met dezelfde
// rechterrand. Daardoor vertrekken de vier pijlen op dezelfde x en kruisen ze
// elkaar niet.
//
// Beamermaat: canvas 1560 breed, hoogstens 670 hoog, zie MAATVOERING.md.
// Kleinste tekst 30. Draaien vanuit de imagegen-map:  node allessamen.js
const { createCanvas, C } = require('./excal');

const c = createCanvas(1560, 670);

const RY = 40, RH = 36;
const rij = i => RY + i * RH;
const inspring = n => 70 + n * 34;

// ---------- de twee rij-vormen, smaller dan die van mapindeling.js ----------
// Daar is RH 56 en past een icoon van 43 breed. Hier staan zestien rijen op
// 636 pixels, dus moeten ze mee krimpen.
function map(x, y, label) {
  c.poly([[x, y + 5], [x + 10, y - 5], [x + 28, y - 5], [x + 33, y + 5]],
    { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 1.8, roughness: 1.3 });
  c.rect(x, y + 5, 33, 24, { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY,
    strokeWidth: 1.8, roughness: 1.3 });
  c.txt(x + 46, y + 24, label, 30, C.GRAY, 700, 'start');
}
function blad(x, y, label) {
  c.poly([[x, y - 5], [x + 18, y - 5], [x + 27, y + 4], [x + 27, y + 29], [x, y + 29]],
    { fill: C.WHITE, fillStyle: 'solid', stroke: C.GRAY, strokeWidth: 1.8, roughness: 1.3 });
  c.txt(x + 40, y + 24, label, 30, C.GRAY, 500, 'start');
}

// ---------- het verkennervenster ----------
c.rect(30, 16, 726, 606, { strokeWidth: 2.6, roughness: 1.4 });

const rijen = [
  [0, 'map', 'websiteCursusAISchrijven'],
  [1, 'map', '.claude/afbeelding'],
  [2, 'map', 'assets'],
  [3, 'blad', 'sjabloon.js'],
  [2, 'map', 'references'],
  [2, 'blad', 'SKILL.md'],
  [1, 'map', '.github/workflows'],
  [1, 'map', '.vscode'],
  [1, 'map', 'context'],
  [1, 'map', 'node_modules'],
  [1, 'map', 'site'],
  [1, 'map', 'slides'],
  [1, 'blad', '.gitignore'],
  [1, 'blad', 'CLAUDE.MD'],
  [1, 'blad', 'package-lock.json'],
  [1, 'blad', 'package.json'],
];

// de verticale lijnen van de boom, voor de rijen zodat ze er niet over lopen
c.line(inspring(0) + 16, rij(0) + 29, inspring(0) + 16, rij(15) + 12,
  { strokeWidth: 1.6, roughness: 1.6 });
c.line(inspring(1) + 16, rij(1) + 29, inspring(1) + 16, rij(5) + 12,
  { strokeWidth: 1.6, roughness: 1.6 });
c.line(inspring(2) + 16, rij(2) + 29, inspring(2) + 16, rij(3) + 12,
  { strokeWidth: 1.6, roughness: 1.6 });

rijen.forEach(([n, soort, label], i) => {
  (soort === 'map' ? map : blad)(inspring(n), rij(i), label);
});

// ---------- de vier kaders, met de pijl en het label ernaast ----------
const KX = 94, KB = 650, LX = 880;

function duid(van, tot, kop, regel) {
  const y = rij(van) - 8, h = (tot - van) * RH + 42;
  c.rect(KX, y, KB, h, { fill: 'none', stroke: C.RED, strokeWidth: 2.8, roughness: 1.4 });
  const cy = y + h / 2;
  c.arrow(KX + KB + 8, cy, LX - 12, cy,
    { stroke: C.RED, strokeWidth: 2.6, roughness: 1.3, head: 18 });
  c.txt(LX, cy - 8, kop, 38, C.RED_DARK, 700, 'start');
  c.txt(LX, cy + 30, regel, 30, C.GRAY, 600, 'start');
}

duid(1, 5, 'je skills',       'één map per taak die terugkeert. Deze tekent mijn figuren.');
duid(8, 8, 'je contextmap',   'vier documenten: mijn huisregels en drie eigen teksten.');
duid(10, 11, 'je cursus zelf', 'hier de site en deze slides. Bij jou: je hoofdstukken.');
duid(13, 13, 'je regelbestand', 'mijn toon, mijn niet-doen-lijst, en wat er in context/ zit.');

// ---------- en waarom de andere rijen geen kader krijgen ----------
c.lines(LX, 604, ['De rest is rommel van de tools:',
  'node_modules, .vscode, package.json.'], 30, C.GRAY, 500, 'start', 1.25);

c.save('.', 'allessamen', '');
