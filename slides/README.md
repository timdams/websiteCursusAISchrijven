# Slides

Een deck van eenendertig slides over hoe je aan een cursus begint met AI, met de
site als afsluiter. Alleen voor lokaal gebruik: de workflow in
[.github/workflows/pages.yml](../.github/workflows/pages.yml) zet enkel `site/` op
GitHub Pages, dus deze map gaat er niet mee op.

## Twee origin stories, kies er een

Het deck opent met waar het vandaan komt: deze slides en de site zijn met Claude
gemaakt, en de aanpak die erin staat komt uit de olods waar wel jaren in zitten.
Die beats staan er **twee keer** in, zodat je kan kiezen voor je presenteert:

| Versie | Slides | Wat |
|---|---|---|
| A | 2 en 3 | kort: tekst met de tekening ernaast, dan de twee stapels |
| B | 4 tot en met 8 | dezelfde beats als strip met tekstballonnen |

Gooi voor de talk een van de twee blokken weg. In de qmd staat boven elk blok een
commentaarregel die zegt waar het begint en eindigt.

Dat commentaar staat bewust **onder** de kop en niet erboven: markdown-commentaar
boven een `##` valt buiten die slide en levert een lege slide op.


## Twee slotslides, kies er ook een

Achteraan staan dezelfde vier dingen twee keer, en ook daar gooi je er een weg
voor de talk. In de qmd staat onder elke kop welke van de twee het is.

| Versie | Kop | Wat |
|---|---|---|
| A | *Wat je meeneemt* | `meenemen.png`: de vier als kaarten, met de nummers uit de volgorde |
| B | *Deze talk, als map* | `allessamen.png`: dezelfde vier, aangeduid in de map van deze repo |

B is het praktische geval en A de samenvatting. Zet je ze allebei, dan staat A
voorop.

Wat op geen van de twee staat is `improve.md`: die is stap vijf in de volgorde,
maar er ligt er geen in deze repo, dus staat hij ook niet in de boom van B.

## Renderen

```bash
cd slides
quarto render cursus-schrijven-met-ai.qmd
```

Dat schrijft `cursus-schrijven-met-ai.html` naast de qmd. Dubbelklikken volstaat;
Caveat zit als base64 in `theme/caveat.css`, dus het werkt ook over `file://`.

Tijdens het schrijven is `quarto preview cursus-schrijven-met-ai.qmd` handiger:
die ververst bij elke opslag.

Een pdf maak je vanuit de browser: druk `e` voor de printweergave en print naar
pdf. Druk `s` voor de sprekersweergave, `o` voor het overzicht.

## Wat waar staat

| Pad | Wat |
|---|---|
| `cursus-schrijven-met-ai.qmd` | de slides zelf |
| `theme/site.scss` | de kleuren en het font van de site, omgezet naar reveal.js |
| `theme/caveat.css` | Caveat als base64, gegenereerd door `maak-font-css.js` |
| `assets/*.png` | de tekeningen |
| `assets/imagegen/*.js` | de scripts die die tekeningen maken |
| `MAATVOERING.md` | hoe groot tekst in een tekening moet zijn om te beamen |

## De klasse achter de kop

Achter de kop van een slide staat soms een klasse tussen accolades, en die
beslist hoe hoog de tekening erop mag worden. De rekensom staat er in
[theme/site.scss](theme/site.scss) bij.

| Klasse | Wat er op de slide staat | Hoe hoog de tekening wordt |
|---|---|---|
| `.metonder` | kop, tekening, een regel eronder | tot 640 |
| `.metkolommen` | kop, tekening, twee kolommen tekst eronder | tot 420 |
| `.metnaast` | kop, tekening links, tekst rechts | 720, van 103 tot 825 |
| geen | tekst, of een tekening in een kolom naast tekst | tot 540 |

`.metnaast` is voor de slide waar de tekening het punt is en de tekst het
bijschrift: een schermafdruk van een bestand (*Voorbeeld van mijn regels*,
*Voorbeeld Mijn skill*) of de stapel papier van *Fair warning*. Zonder die
klasse werd zo'n afdruk op 540 afgekapt en bleef er in haar kolom van de helft
rechts een halve kolom leeg staan. Zet bij de kolommen van zo'n slide geen
`width`: de kolom van de tekening krimpt zelf tot wat ze op 720 hoog nodig
heeft, en de tekst neemt de rest.

```markdown
## Voorbeeld Mijn skill voor de illustraties {.metnaast}

::: {.columns}
::: {.column}
![](assets/skillvb.png){.figuur}
:::

::: {.column}
* Meeste tekeningen in deze talk zijn met deze skills gemaakt.
:::
:::
```

## De tekeningen

Dezelfde machinerie als de site: rough.js plus Caveat, in de stijl uit
[.claude/afbeelding/SKILL.md](../.claude/afbeelding/SKILL.md). Elk script blijft
staan, dus een figuur bijsturen betekent een regel wijzigen en opnieuw renderen:

```bash
cd slides/assets/imagegen
node volgorde.js
```

Het script schrijft de SVG naast zichzelf en de PNG een map hoger, in `assets/`.
Werkt `require('roughjs')` niet, draai dan eerst `npm install` in de repo-root.

Alles opnieuw renderen:

```bash
cd slides/assets/imagegen
for f in *.js; do [ "$f" = excal.js ] || node "$f"; done
```

### Negentien tekeningen

`prillebegin`, `zaal`, `teleurstelling`, `volgorde`, `schrijverswerk`,
`mapindeling`, `eerstesessie`, `improvelus`, `nakijken`, `meenemen`, `allessamen`,
`website` en `versies` zijn voor dit deck getekend. `zaal` opent de talk, `versies` komt
er achteraan op terug en tekent diezelfde slide in zijn twee versies: wijzig je
de ene, kijk dan ook naar de andere.

`meenemen` staat er twee keer in, net als `volgorde`: een keer voor de workflow
als aankondiging (*Als je één slide fotografeert: deze*) en een keer als
slotslide. De nummers op de vier kaarten zijn de stappen 3 tot 6 uit
`volgorde`, en kaart zes staat er gestreept bij om dezelfde reden als het
bolletje daar. Wijzig je een van de twee tekeningen, kijk dan ook naar de andere.

`allessamen` is de verkenner van deze repo zelf, overgetekend rij per rij, met
de vier dingen in het rood aangeduid. De rommel staat er bewust bij:
`node_modules`, `.vscode` en de twee package-bestanden. Zonder die rijen leest
het als een opgekuiste voorbeeldmap. Verandert de mapindeling van de repo, dan
klopt deze tekening niet meer en moet `rijen` in het script mee.

`mapindeling` en `eerstesessie` tekenen dezelfde boom, met dezelfde helpers
`map`, `blad` en `tak`. Op stap 2 staat die boom naast de docx waar hij uit
komt: de twee koppen in dat document, `1 Inleiding` en `2 Rekenregels`, zijn de
twee mappen rechts, en de pijl ertussen zegt wat je ermee doet. Verder staat er
niets: geen contextmap, geen regels, geen rood. In `eerstesessie` staan de
contextmap en de regels er wel bij en staat in het rood wat je in je eerste
sessie aanraakt. Wijzig je de boom in het ene script, wijzig hem dan ook in het
andere.

`regelbestand` staat op *Wat zet je daar dan in?* en vervangt daar de drie
bolletjes toon / niet-doen / contextmap. Het robotje erop is dat van
`mimic.png`, maar dan getekend: vierkante kop, antenne en dezelfde rode nepbril
met snor. Wijzig je de vermomming daar, kijk dan ook hier. De tekst op het blad
en in het mapje is die van de slide *Voorbeeldje* ernaast.

`eenbron`, `vijfdocumenten`, `kernidee` en `afsprakenofskill` staan ook op de
site, maar de scripts hier zijn een eigen versie: op de site zijn ze 1600 tot
1660 breed, hier 1560, met grotere tekst. Wijzig je zo'n figuur, wijzig hem dan op beide plekken.

`strip-vraag`, `strip-vorigjaar` en `strip-nu` zijn de stripversie van de origin
story. De panelen, de stokfiguurtjes en de tekstballonnen zitten in
`strip.js`, dat de andere drie inladen. `poppetje` neemt `armen` (`omhoog`,
`uit`, `wijzen`) en `gezicht` (`blij`, `paniek`, `twijfel`).

### De twee tekeningen die geen script hebben

`meteenja.png` komt uit Imagen, niet uit rough.js. Ze staat in allebei de origin
stories: op slide 2 naast de tekst, en op slide 8 als slot van de strip.
`robotlector.png` staat op *Het lag niet aan je vraag*, in de kolom naast de
tekst, en komt ook uit een beeldgenerator.

Bij allebei is er geen script om aan te passen, dus wil je er iets aan wijzigen
dan moeten ze opnieuw gegenereerd worden, en dan is het een andere tekening. De
prompts staan in [PROMPT-meteenja.md](PROMPT-meteenja.md) en
[PROMPT-robotlector.md](PROMPT-robotlector.md).

Op *Wat je daarvoor in je regelbestand zet* staat nog een derde beeld zonder
script: een schermafdruk van een echte `improve.md`. Die staat niet in deze map
maar in `../site/assets/improvevb.png`, en de slide verwijst er rechtstreeks
naar. Vervang je die afdruk, dan volgt de slide vanzelf.

### Leesbaar op een beamer

Elke tekening is 1560 breed en hoogstens 670 hoog, met tekst van minstens 30. Zo
rendert ze op de slide op ongeveer één op één. Smaller mag: de schaal hangt aan
de hoogte zolang de breedte onder 1470 blijft, en `mapindeling` (1200) en
`eerstesessie` (1000) staan daarom smaller, anders houden ze rechts een lege
strook over. De rekensom en de reden staan in
[MAATVOERING.md](MAATVOERING.md). Wijzig je een figuur, hou je daar dan aan: op
een canvas van 2300 breed valt tekst van 30 terug tot achttien pixels op het
scherm, en dat leest niemand achteraan de zaal.

### Het font opnieuw inbakken

```bash
cd slides/theme
node maak-font-css.js
```
