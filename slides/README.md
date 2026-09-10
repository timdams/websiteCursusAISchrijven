# Slides

Een deck van vierendertig slides over hoe je aan een cursus begint met AI, met de
site als afsluiter.

De qmd blijft hier staan, maar het gerenderde deck gaat wel mee op GitHub Pages.
De stap *Slides renderen* in
[.github/workflows/pages.yml](../.github/workflows/pages.yml) zet het als
`site/slides/index.html` naast de site, zodat de knop **De slides** in de kop van
[de site](../site/README.md) ergens op uitkomt. Lokaal maak je diezelfde map met
`npm run slides` vanuit de repo-root. Ze staat in `.gitignore`.

De slides zijn de waarheid: loopt de site uit de pas met wat hier verteld wordt,
dan volgt de site. Wat er van dit deck naar de site is overgekomen, en welke
tekeningen daar een tweede keer staan, staat onder *De tekeningen die van de
slides komen* in [site/README.md](../site/README.md).

## De titelslide

`assets/titel.png` ligt als achtergrond over de hele titelslide: de lector met
zijn rode potlood en vier robotjes met dezelfde rode nepbril, aan elkaar geknoopt
met het touw uit `temmen.png`. De titel, de ondertitel en je naam staan in de
lucht erboven, en daarvoor staat `center-title-slide: false` in de qmd en het
titelblok een maat kleiner in [theme/site.scss](theme/site.scss).

De tekening komt uit een beeldgenerator en is vierkant. Hoe ze toch de volle
1600 bij 900 vult, welke uitsnede `data-background-position: 50% 48%` toont en
wat je moet doen wanneer je haar vervangt, staat in
[PROMPT-titel.md](PROMPT-titel.md), samen met de prompt zelf.

## Hoe het deck loopt

Vier stukken, in deze volgorde:

| Slides | Wat |
|---|---|
| 1 tot 7 | wie er zit, waar de talk vandaan komt, en waarom het de vorige keer tegenviel |
| 8 tot 25 | de zeven stappen, met de nummers in het rood voor de kop |
| 26 tot 30 | deze slides zelf, wat je meeneemt, en de twee termentabellen |
| 31 tot 34 | de site, wat er nog niet af is, en bedankt |

De nummers voor een kop (`[5]{.nr}`) zijn de stap uit `volgorde.png`. Stap vier
en vijf hebben er elk vier slides, want daar zit het werk; stap één, twee en
zeven hebben er één.

Achteraan staan dezelfde vier dingen twee keer: *Deze talk, als map*
(`allessamen.png`, de vier aangeduid in de map van deze repo) en *Wat je
(hopelijk) mee naar huis neemt* (`meenemen.png`, de vier als kaarten met de
nummers uit de volgorde). De eerste is het praktische geval, de tweede de
samenvatting. Loop je krap, dan is dat het paar waar je er een van kan weghalen.

Onder de kop van die eerste staat in de qmd een commentaarregel die zegt welke
van de twee je voor je hebt. Zo'n commentaar staat bewust **onder** de kop en
niet erboven: markdown-commentaar boven een `##` valt buiten die slide en levert
een lege slide op.

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
bijschrift: een schermafdruk van een bestand (*Voorbeeld van mijn skill*, *Van
losse correcties naar één checklist*) of een vierkant beeld uit de generator
(*Kijk na*, *Huur het A(I)-team*). Zonder die klasse werd zo'n afdruk op 540
afgekapt en bleef er in haar kolom van de helft rechts een halve kolom leeg
staan. Zet bij de kolommen van zo'n slide geen `width`: de kolom van de tekening
krimpt zelf tot wat ze op 720 hoog nodig heeft, en de tekst neemt de rest.

```markdown
## [5]{.nr} Voorbeeld van mijn skill voor de illustraties {.metnaast}

::: {.columns}
::: {.column}
![](assets/skillvb.png){.figuur}
:::

::: {.column}
* Meeste tekeningen in deze talk zijn met deze skills gemaakt.
:::
:::
```

## De termentabel

*Hoe heet het bij jou?* is de enige slide met een echte tabel erop. Ze stond er
eerst als tekening (`pertool.png`, zes rijen van twee kolommen), maar op een
tekening kan je je eigen rij niet aanwijzen en de tekst niet kopiëren, en er
paste geen kolom meer bij. Het script en de png zijn weg; de tabel staat nu
als gewone HTML in de qmd, met haar opmaak onder *de termentabel* in
[theme/site.scss](theme/site.scss).

Het zijn er ondertussen twee, en ze staan op twee slides na elkaar: *In je
venster* en *In een map op je pc*. Vier tools per tabel en drie namen per tool.
In de tweede staat onder de tool waarmee je je map opent, en onder een
regelbestand dat ook anders kan heten, een tweede regel in het grijs (`.via`).

Diezelfde twee tabellen staan op de site, onder *Met welke AI werk je?*. Daar
worden ze getekend door `tekenTermentabellen()` in [site/app.js](../site/app.js)
uit `assistenten[]` in [site/data.js](../site/data.js): `kort3.plek`,
`kort3.regels` en `kort3.skill` voor de eerste tabel, en het blok `map`
(`waarmee`, `via`, `regelbestand`, `regelbestandVia`, `skills`) voor de tweede.
Wijzigt daar een naam, wijzig hem dan ook hier, en omgekeerd.

De breedtes van de kolommen staan in de `colgroup` in de qmd en de tabel staat
op `table-layout: fixed`. Zonder dat verdeelt de browser ze zelf en breekt een
lang pad als `~/.codex/skills/` over twee regels. Vier rijen van vier kolommen
vullen de slide op `font-size: .76em`; komt er een rij of een kolom bij, dan
moet die grootte omlaag en kijk je opnieuw na of het achteraan de aula nog
leest.

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
for f in *.js; do case "$f" in excal.js|strip.js|vrijstaand.js) ;; *) node "$f";; esac; done
```

### Negenentwintig tekeningen op vierendertig slides

Vijf slides dragen er geen: de origin story, het voorbeeldje van een
regelbestand, de twee termentabellen en de tussentitel. Van de negenentwintig
komen er negentien uit een script hier, acht uit een beeldgenerator en twee zijn
schermafdrukken (`skillvb` en `improvevb`). `zaal.js` telt voor twee: het schrijft
zowel `zaal.png` als `zaal-kristof.png`.

`zaal`, `teleurstelling`, `volgorde`, `schrijverswerk`, `mapindeling`,
`improvelus`, `watiseenskill`, `agnostisch`, `chatvenster`, `meenemen`,
`allessamen`, `website` en `versies` zijn voor dit deck getekend. `zaal` opent de
talk en `versies` komt er achteraan op terug: die tweede tekent diezelfde slide
in zijn twee versies, dus wijzig je de ene, kijk dan ook naar de andere.

In `imagegen/` staan meer scripts dan het deck gebruikt. `prillebegin`,
`nakijken`, `nietgetest`, `tweerondes`, `dezetalk` en de drie `strip-`-scripts
tekenen slides die er niet meer op staan; `eerstesessie` en `regelbestand`
tekenen er twee die naar de site verhuisd zijn. Ze blijven staan, want een
weggegooid script is een tekening die je van nul moet overdoen.

`zaal` is de enige van die reeks die uit twee lagen bestaat. De mensen erop
komen uit een beeldgenerator en staan in `imagegen/zaal-bron.png`; `zaal.js`
legt daar de labels, de rode beugel en het bordje overheen. De prompt, de
opgemeten posities van de acht figuren en wat er met `zaal-kristof.png` moet
gebeuren staan in [PROMPT-zaal.md](PROMPT-zaal.md).

Kristof zweeft op de tweede versie van die slide als superheld voorbij het einde
van de as, en komt ook uit de generator. `vrijstaand.js` haalt het papier onder
zo een tekening vandaan en snijdt ze bij, zodat je ze op een andere tekening kan
leggen zonder dat je het vel eronder ziet liggen:

```bash
node vrijstaand.js kristof-bron.png kristof.png
```

`excal.js`, `strip.js` en `vrijstaand.js` zijn gereedschap en tekenen zelf niets.

`meenemen` en `volgorde` stonden er allebei twee keer in en staan er nu elk één
keer: `volgorde` op *De workflow* vooraan, `meenemen` op de voorlaatste slide.
De nummers op de vier kaarten van `meenemen` zijn de stappen 3 tot 6 uit
`volgorde`, en kaart zes staat er gestreept bij om dezelfde reden als het
bolletje daar. Wijzig je een van de twee tekeningen, kijk dan ook naar de andere,
en naar de site: daar staat `volgorde` boven de zeven stappen en `meenemen` in
het plan, met diezelfde nummers.

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

`regelbestand` stond op *Wat zet je daar dan in?* en is daar vervangen door
`vermomming.png`. De tekening staat nu op de site, in het onderwerp *Je regels in
een bestand*. Het robotje erop is dat van `mimic.png`, maar dan getekend:
vierkante kop, antenne en dezelfde rode nepbril met snor. Wijzig je de vermomming
daar, kijk dan ook hier. De tekst op het blad en in het mapje is die van de slide
*Regelbestand voorbeeldje* verderop.

`eenbron`, `vijfdocumenten`, `kernidee` en `afsprakenofskill` staan ook op de
site, maar de scripts hier zijn een eigen versie: op de site zijn ze 1600 tot
1660 breed, hier 1560, met grotere tekst. Wijzig je zo'n figuur, wijzig hem dan op beide plekken.

`strip-vraag`, `strip-vorigjaar` en `strip-nu` waren de stripversie van de
origin story, die nu één slide met twee kolommen is. De panelen, de
stokfiguurtjes en de tekstballonnen zitten in `strip.js`, dat de andere drie
inladen. `poppetje` neemt `armen` (`omhoog`, `uit`, `wijzen`) en `gezicht`
(`blij`, `paniek`, `twijfel`). Wil je er ooit weer een strip bij, dan staat de
machinerie er nog.

### De tekeningen die geen script hebben

Acht beelden op een slide komen uit een beeldgenerator en niet uit rough.js, en
daaronder liggen er nog twee als onderlaag. Er is geen script om aan te passen,
dus wil je er iets aan wijzigen dan moeten ze opnieuw gegenereerd worden, en dan
is het een andere tekening. Waar er een prompt van bewaard is, staat die ernaast:

| Beeld | Waar het staat | Prompt |
|---|---|---|
| `titel.png` | de titelslide, als achtergrond | [PROMPT-titel.md](PROMPT-titel.md) |
| `imagegen/zaal-bron.png` | de onderlaag van `zaal` | [PROMPT-zaal.md](PROMPT-zaal.md) |
| `imagegen/kristof-bron.png` | Kristof op de tweede zaalslide | [PROMPT-zaal.md](PROMPT-zaal.md) |
| `mimic.png` | *Het lag niet alleen aan je prompt* | geen |
| `temmen.png` | *Tijd om de A.I. te temmen* | geen |
| `vermomming.png` | *Regelbestand inhoud?* | [PROMPT-vermomming.md](PROMPT-vermomming.md) |
| `laatzeschrijven.png` | *Wanneer maak je een skill?* | [PROMPT-laatzeschrijven.md](PROMPT-laatzeschrijven.md) |
| `zekerweten.png` | *Kijk na* | [PROMPT-zekerweten.md](PROMPT-zekerweten.md) |
| `ateam.png` | *Huur het A(I)-team* | geen |
| `pintje.png` | *Bedankt!* | [PROMPT-pintje.md](PROMPT-pintje.md) |

Bij `zaal-bron` en `kristof-bron` zit er wel een script omheen, maar de mensen
zelf zijn niet te wijzigen zonder opnieuw te genereren.
[PROMPT-meteenja.md](PROMPT-meteenja.md) en
[PROMPT-robotlector.md](PROMPT-robotlector.md) horen bij beelden die niet meer op
een slide staan.

Twee beelden zijn schermafdrukken en dus ook geen script: `skillvb.png` (de
`SKILL.md` voor de figuren) en `improvevb.png` (de checklist die uit de losse
correcties gegroeid is). Vervang je zo'n afdruk, dan volgt de slide vanzelf.
Allebei staan ze ook op de site, in `../site/assets/`.

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
