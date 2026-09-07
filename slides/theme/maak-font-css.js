// Bakt Caveat als base64 in caveat.css, zodat de slides ook werken wanneer je
// het html-bestand gewoon aanklikt (file:// laadt geen losse fontbestanden).
// Draaien vanuit de theme-map:  node maak-font-css.js
const fs = require('fs');
const path = require('path');

const bron = path.join(__dirname, '..', 'assets', 'imagegen');
const regels = [400, 700].map(gewicht => {
  const b64 = fs.readFileSync(path.join(bron, `caveat-${gewicht}.ttf`)).toString('base64');
  return `@font-face{font-family:'Caveat';font-style:normal;font-weight:${gewicht};` +
    `src:url(data:font/ttf;base64,${b64}) format('truetype');}`;
});

fs.writeFileSync(path.join(__dirname, 'caveat.css'),
  '/* Gegenereerd door maak-font-css.js. Niet met de hand aanpassen. */\n' +
  regels.join('\n') + '\n');
console.log('caveat.css klaar');
