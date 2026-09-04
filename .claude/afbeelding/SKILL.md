---
name: afbeelding
description: Maak of herteken een afbeelding, tekening, schema, figuur, poster of illustratie voor de cursus "cursus schrijven met AI", in de hand-drawn Excalidraw-stijl (rough.js + Caveat, AP-kleuren). Gebruik dit bij elke vraag om een figuur of poster te tekenen, een bestaande afbeelding in content/assets/ aan te passen, of een generatorscript in een imagegen/-map te wijzigen.
---

# Afbeelding maken (Excalidraw-stijl)

Afbeeldingen worden niet met de hand getekend maar **gegenereerd met een Node-script** dat rough.js
gebruikt. Elk script blijft bewaard zodat een figuur later bijgestuurd kan worden zonder van nul te
beginnen. Dat is meteen het voorbeeld uit module 2 en het eindbeeld uit module 4: het beeld komt uit
code, dus het is regenereerbaar en het zit in versiebeheer.

Deze skill is overgenomen uit de repo ziescherpscherper en aangepast aan deze cursus. De stijl en de
kleuren zijn identiek: dat is bewust, het is dezelfde huisstijl.

## Werkwijze

### 1. Weten wat je tekent

- Tim noemt de afbeelding meestal zelf. Doet hij dat niet en gaat het over een hele module:
  **vraag eerst welke afbeelding(en)**. Nooit zelf kiezen.
- Bij het aanpassen van een bestaande figuur: zoek het origineel op en **bekijk die PNG met de Read
  tool**. Je zet om wat er staat, je verzint niets bij.
- Een figuur in deze cursus toont een werkwijze of een verhouding (bijvoorbeeld de drie niveaus, of
  wat er wel en niet in een contextmap gaat). Geen versiering.

### 2. De imagegen-map klaarzetten

Per module een assets-map met een `imagegen/`-submap, met de stijl-helpers erin:

```bash
mkdir -p content/assets/<module>/imagegen
cp assets/imagegen/{excal.js,caveat-400.ttf,caveat-700.ttf} content/assets/<module>/imagegen/
```

De npm-packages horen in de **repo-root**, gitignored:

```bash
npm install        # gebruikt package.json in de root
```

Wil je die download vermijden, dan mag je ook de node_modules van de C#-repo hergebruiken:

Dat veronderstelt dat `ziescherpscherper` naast deze repo staat, dezelfde aanname als
[scripts/verzamel-context.ps1](../../../scripts/verzamel-context.ps1). Vanuit de repo-root:

```bash
export NODE_PATH="$(cd ../ziescherpscherper && pwd)/node_modules"
```

Zet die regel voor je naar de imagegen-map gaat, want `NODE_PATH` wordt vanaf je huidige map gelezen.
Staat de repo er niet, dan stopt het commando met een foutmelding in plaats van met een leeg pad.

### 3. Het script schrijven

Start van [assets/sjabloon.js](assets/sjabloon.js). De volledige API staat in
[references/api.md](references/api.md). Kijk eerst of er al een helper bestaat die past; die lijst
staat ook in api.md. Hergebruik of kopieer die helper in plaats van hem opnieuw te schrijven.

Canvas: breedte 900 tot 2300, hoogte in verhouding. Coordinaten zijn absoluut, dus reken posities uit
in plaats van te gokken.

### 4. Renderen

Het script schrijft de SVG naar de **cwd** en de PNG een map hoger. Draai het dus altijd vanuit de
imagegen-map zelf:

```bash
cd content/assets/<module>/imagegen && node <naam>.js
```

### 5. Nakijken (niet overslaan)

**Bekijk de gerenderde PNG met de Read tool.** rough.js geeft geen foutmelding bij lelijke output, dus
je moet echt kijken. Loop de checklist in [references/checklist.md](references/checklist.md) af,
corrigeer het script en render opnieuw tot het klopt.

### 6. Opleveren

- **Verwerk de afbeelding niet in de cursus.** Geen `.qmd` aanpassen. Tim bekijkt eerst zelf.
- Stuur de PNG naar Tim met SendUserFile (`display: "render"`) en vermeld het pad.

## Naamgeving

Drie bestanden per afbeelding:

| Bestand | Plaats |
|---|---|
| `<naam>.js` | `content/assets/<module>/imagegen/` |
| `<naam>.svg` | `content/assets/<module>/imagegen/` |
| PNG | `content/assets/<module>/` |

Derde argument van `c.save`:

- nieuwe figuur, geen origineel -> `niveaus.png` : `c.save('.', 'niveaus', '')`
- vervangt een bestaande figuur -> `niveausNEW.png` : `c.save('.', 'niveaus', 'NEW')`
- vrijere variant naast het origineel -> `niveausAlternatief.png` : `c.save('.', 'niveausAlternatief', '')`

## Inhoudsregels (vast)

- **Geen titel boven de afbeelding.** Het bijschrift staat al onder de figuur in de cursus.
- **Tekst overlapt nooit** met de lijn van een box of met een pijl. Houd labels buiten de pijllijn en
  laat pijlpunten kort voor het label stoppen.
- **Verzin niets extra.** Enkel wat gevraagd is: geen extra elementen, iconen of tekst.
- Taal: Nederlands, en **geen em-dashes** in labels of bijschriften.

## Stijl (niet wijzigen zonder Tim)

- Hand-drawn via rough.js, handgeschreven font Caveat (base64 ingebed in de SVG).
- Kleuren komen uit [_brand.yml](../../../_brand.yml) en staan als constanten in `excal.js` (`C.RED`,
  `C.RED_DARK`, `C.RED_LIGHT`, `C.GRAY`, `C.OFFWHITE`). Gebruik geen losse hex-waarden.
- `roughness` 1.4 tot 1.6, `bowing` 1 tot 1.5, `strokeWidth` 2 tot 3, `hachure`-vulling voor
  accentvakjes, `solid` voor witte vlakken. De defaults in `excal.js` zitten al goed.

## Posters

Een samenvattende poster voor een module is dezelfde machinerie, maar met een andere opdracht: hij vat
samen in plaats van uit te leggen. Twee dingen erbij:

- **bewaar de prompt** naast de poster, in `content/assets/<module>/imagegen/`. Dat bewaren is precies
  het punt dat module 2 maakt op niveau 1.
- staat er beeld van iemand anders in, dan hoort auteur en licentie in het bijschrift. Dat is een
  oordeel, geen regel: zie module 3.
