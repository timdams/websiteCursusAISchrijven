# Maatvoering van de tekeningen

De eerste versie van dit deck was onleesbaar op een beamer. De tekeningen waren
2100 tot 2320 pixels breed met tekst op grootte 30, en op de slide passen ze in
1472 pixels. Die tekst kwam dus uit op achttien pixels.

## De rekensom

Een tekening rendert op de slide op de kleinste van twee verhoudingen:

```
schaal = min(1472 / canvasbreedte, 640 / canvashoogte)
```

1472 is de bruikbare breedte van een slide (1600 min de marge van vier procent),
640 de hoogte die overblijft onder de kop en boven het onderschrift. Wat je op
het scherm ziet is dan:

```
tekst op het scherm = fontgrootte in het script x schaal
```

## De maat

Alle tekeningen zijn **1560 breed en hoogstens 670 hoog**. Dat geeft schaal 0,94:
bijna één op één. Daarbinnen:

| Wat | Grootte in het script | Op het scherm |
|---|---|---|
| kop van een blok | 40 tot 48 | 38 tot 45 px |
| label in een kader | 34 tot 38 | 32 tot 36 px |
| bijschrift, opsomming | 30 tot 32 | 28 tot 30 px |

Onder de 30 ga je niet. Past je tekst dan niet, dan staat er te veel op de
tekening en moet er iets uit, niet iets kleiner.

Ga je boven 670 hoog, dan wordt de tekening in de hoogte geknepen en zakt de
schaal: op 800 hoog is ze nog 0,8 en is je tekst van 32 weer 26 pixels.

## Het font

De tweede versie had de maat wel goed, en werd op 14 september 2026 toch
gegeven met een deck waarvan achteraan in de aula gezegd werd: "Het enige dat
mij meteen opviel was de leesbaarheid en in het bijzonder het lettertype." De
tekst stond toen in Caveat, op 30 en meer. Caveat is smal, met korte kleine
letters en dunne lijnen: op 30 pixels is een kleine letter zo'n twaalf pixels
hoog, en dat valt op afstand weg.

Sindsdien staan de tekeningen van de slides in **Kalam**. Dat is ook
handgeschreven, maar met hogere kleine letters en dikkere lijnen. De site
tekent nog in Caveat.

## Meten in plaats van gokken

Kalam is breder dan Caveat: een teken is ongeveer **0,46 keer de fontgrootte**
(0,44 voor gewicht 400), tegenover 0,33 voor Caveat. Een regel van veertig
tekens op grootte 34 is dus zo'n 625 pixels breed. Wie een oud script opnieuw
draait, ziet dat verschil als tekst die over de rand van haar kader loopt. Maak
het kader breder of breek de regel af, en zet de tekst niet kleiner. Nameten
kan:

```bash
cd slides/assets/imagegen
node -e "
const {Resvg}=require('@resvg/resvg-js');const path=require('path');
const s='de regel die je wil meten', size=34, weight=700;
const fonts=['kalam-700.ttf','kalam-400.ttf'].map(f=>path.join(process.cwd(),f));
const svg='<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"6000\" height=\"400\"><text x=\"10\" y=\"250\" font-size=\"'+size+'\" font-weight=\"'+weight+'\" font-family=\"Kalam\">'+s+'</text></svg>';
console.log(Math.round(new Resvg(svg,{font:{fontFiles:fonts,defaultFontFamily:'Kalam',loadSystemFonts:false}}).getBBox().width),'px');
"
```

## Nakijken

Render de slides en neem er een schermafdruk van op 1600 bij 900. Kan je de
kleinste tekst op een afdruk van honderd procent nog vlot lezen, dan is ze goed
genoeg voor achteraan in een aula.
