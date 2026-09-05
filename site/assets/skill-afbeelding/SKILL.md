---
name: afbeelding
description: Maak of herteken een figuur, schema, tekening of poster voor deze cursus, in de hand-drawn stijl (rough.js + Caveat). Gebruik dit bij elke vraag om een figuur te maken, en bij elke wijziging aan een bestaand generatorscript in een imagegen/-map.
---

# Een figuur maken

Figuren worden niet met de hand getekend maar **gegenereerd met een Node-script** dat rough.js
gebruikt. Elk script blijft bewaard, zodat een figuur later bijgestuurd kan worden zonder van nul te
beginnen. Het beeld komt uit code, dus het is regenereerbaar en het staat mee in versiebeheer.

Dit is de skill waarmee de figuren van de site "Een cursus schrijven met AI" gemaakt zijn. Neem ze
niet letterlijk over: de kleuren, het lettertype en de mapindeling hieronder zijn die van die cursus.
Wat je wel kan overnemen is de vorm. Een skill zegt wat er telkens moet gebeuren, in welke volgorde,
en waar het telkens misgaat.

## Werkwijze

### 1. Weten wat je tekent

- Staat er niet welke figuur het moet worden, **vraag het dan eerst**. Nooit zelf kiezen.
- Bij het aanpassen van een bestaande figuur: zoek het origineel op en **bekijk die PNG**. Je zet om
  wat er staat, je verzint niets bij.
- Een figuur toont een werkwijze of een verhouding, bijvoorbeeld wat er wel en niet in een contextmap
  gaat. Geen versiering.

### 2. De imagegen-map klaarzetten

Per hoofdstuk een assets-map met een `imagegen/`-submap, met de stijl-helpers erin:

```bash
mkdir -p assets/<hoofdstuk>/imagegen
cp assets/imagegen/{excal.js,caveat-400.ttf,caveat-700.ttf} assets/<hoofdstuk>/imagegen/
```

De npm-packages (`roughjs`, `@resvg/resvg-js`) horen in de repo-root en staan gitignored:

```bash
npm install
```

### 3. Het script schrijven

Start van [sjabloon.js](sjabloon.js). De volledige API staat in [api.md](api.md). Kijk eerst of er al
een helper bestaat die past; hergebruik of kopieer die in plaats van hem opnieuw te schrijven.

Canvas: breedte 900 tot 2300, hoogte in verhouding. Coördinaten zijn absoluut, dus reken posities uit
in plaats van te gokken.

### 4. Renderen

Het script schrijft de SVG naar de map waar je staat, en de PNG een map hoger. Draai het dus altijd
vanuit de imagegen-map zelf:

```bash
cd assets/<hoofdstuk>/imagegen && node <naam>.js
```

### 5. Nakijken (niet overslaan)

**Bekijk de gerenderde PNG.** rough.js geeft geen foutmelding bij lelijke output, dus je moet echt
kijken. Loop de checklist in [checklist.md](checklist.md) af, corrigeer het script en render opnieuw
tot het klopt.

### 6. Opleveren

- **Verwerk de figuur niet zelf in de cursus.** Toon eerst de PNG, met het pad erbij.

## Naamgeving

Drie bestanden per figuur:

| Bestand | Plaats |
|---|---|
| `<naam>.js` | `assets/<hoofdstuk>/imagegen/` |
| `<naam>.svg` | `assets/<hoofdstuk>/imagegen/` |
| PNG | `assets/<hoofdstuk>/` |

Derde argument van `c.save`:

- nieuwe figuur, geen origineel -> `niveaus.png` : `c.save('.', 'niveaus', '')`
- vervangt een bestaande figuur -> `niveausNEW.png` : `c.save('.', 'niveaus', 'NEW')`
- vrijere variant naast het origineel -> `niveausAlternatief.png` : `c.save('.', 'niveausAlternatief', '')`

## Inhoudsregels (vast)

- **Geen titel boven de figuur.** Het bijschrift staat al onder de figuur in de cursus.
- **Tekst overlapt nooit** met de lijn van een box of met een pijl. Houd labels buiten de pijllijn en
  laat pijlpunten kort voor het label stoppen.
- **Verzin niets extra.** Enkel wat gevraagd is: geen extra elementen, iconen of tekst.
- Taal: Nederlands, en **geen em-dashes** in labels of bijschriften.

## Stijl (niet wijzigen zonder overleg)

- Hand-drawn via rough.js, handgeschreven font Caveat (base64 ingebed in de SVG).
- Kleuren staan als constanten in `excal.js` (`C.RED`, `C.RED_DARK`, `C.RED_LIGHT`, `C.GRAY`,
  `C.OFFWHITE`). Gebruik geen losse hex-waarden.
- `roughness` 1.4 tot 1.6, `bowing` 1 tot 1.5, `strokeWidth` 2 tot 3, `hachure`-vulling voor
  accentvakjes, `solid` voor witte vlakken. De defaults in `excal.js` zitten al goed.

## Posters

Een samenvattende poster voor een hoofdstuk is dezelfde machinerie, met een andere opdracht: hij vat
samen in plaats van uit te leggen. Twee dingen erbij:

- **bewaar de prompt** naast de poster, in `assets/<hoofdstuk>/imagegen/`.
- staat er beeld van iemand anders in, dan hoort auteur en licentie in het bijschrift.
