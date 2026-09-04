# Een cursus schrijven met AI

Een zelfstandige website voor lesgevers (leerkrachten, lectoren, docenten van elke school) die AI
willen inschakelen bij het maken van hun cursusmateriaal. De site catert bewust naar beginnende en
gemiddelde AI-gebruikers: duidelijke taal, geen jargon, en niets dat een installatie vereist om te
kunnen starten.

De opzet is **gids eerst**: de startpagina is de bevrager zelf. Eén rustige vraag per scherm, en na
een handvol vragen ontvouwt zich **Jouw plan**, een persoonlijk stappenplan in de termen van de
gekozen AI-tool. Daarnaast zit alles achter een klein menu:

| Menu | Wat het is |
|---|---|
| De gids | het welkomstscherm en de vragen, één per scherm, met voortgangsbolletjes en een terugknop |
| Jouw plan | verschijnt na de gids: jouw werkwijze, de vier snelle winsten in de termen van jouw tool, waarom je die doet, de eerste drie prompts om te plakken, wat je eerst doet, en wat er uit je antwoorden kwam |
| Naslagwerk | een zoekveld over alles, en daaronder zeven kaarten die elk een eigen onderdeel opendoen. Je ziet er altijd maar een tegelijk |
| Valkuilen | de meest voorkomende fouten, doorzoekbaar. Elke klacht wijst naar het onderwerp dat overgeslagen is |
| Voorbeelden | de galerij met externe voorbeelden, met keywords per kaart. Groeit nog |

De werkwijzenpagina (een pagina per werkwijze plus de vergelijkingstabel) hangt niet in het menu
maar is bereikbaar vanuit het plan, het naslagwerk en het zoekveld.

## Het naslagwerk: een hub met deuren

Het naslagwerk stond ooit als een lange lijst op een pagina. Dat leest niemand. Nu is het een hub:
zeven kaarten met een titel, een zin en een teller. Je klikt er een open, ziet alleen dat onderdeel,
en gaat met "Alle onderdelen" terug.

| Kaart | Vak (`data-vak`) | Wat erin staat |
|---|---|---|
| Je eerste sessie, stap voor stap | `eerstekeer` | één doorlopend verhaal van zes stappen |
| De onderwerpen | `onderwerpen` | de vijf onderwerpen, elk in een venster |
| De vier werkwijzen | (geen vak) | springt naar de werkwijzenpagina |
| Prompts om te plakken | `prompts` | de prompts met een kopieerknop |
| Met welke AI werk je? | `tool` | de toolkiezer en het kaartje van de gekozen tool |
| Wat moet eruit komen? | `uitkomst` | de formaatkiezer en het advies erbij |
| Gereedschap en links | `gereedschap` | de gereedschapskist en alle links van de site |
| Bij mij ligt dat anders | `randgevallen` | de situaties die buiten het standaardverhaal vallen |

De kaarten staan in `AFDELINGEN` in `app.js`; de vakken zelf zijn `<div class="naslagvak"
data-vak="...">` in `index.html`. Een vak bijzetten is dus een item in `AFDELINGEN` plus een div.
Een open vak staat in de adresbalk (`#naslag/prompts`), zodat je een onderdeel kan doorsturen.
Het zoekveld staat boven de kaarten en zoekt door alles heen; een treffer opent het juiste vak.

## Tool-specifieke teksten

De toolvraag kent zes antwoorden: **Claude, ChatGPT, Gemini, Microsoft Copilot, iets anders
(zelf gehost, OpenRouter, ...) of nog geen**. De keuze stuurt de hele site:

- teksten met de placeholders `{regelsbestand}` `{regelsplek}` `{projectplek}` `{skillplek}` en
  `{toolnaam}` in `data.js` vullen zich met de termen van de gekozen tool (functie `T()` in
  `app.js`, veld `termen` per assistent). Zonder toolkeuze komt er een neutrale omschrijving uit
  `NEUTRAAL` in `app.js` ("een vast bestand met je afspraken"), nooit een merknaam: gedeelde tekst
  blijft gedeeld
- linkblokken bij een werkwijze of onderwerp wisselen tool-links om naar die van de gekozen tool
  (functie `toolLinks()` in `app.js`)
- het plan en de onderwerpvensters tonen het kaartje "Bij [tool] heet dat" met de plek voor je
  bestanden, je regels en een skill (velden `plek`, `regels`, `skill` per assistent)
- een assistent kan een optioneel blok `wistjedat` hebben: iets dat gebruikers van die tool
  waarschijnlijk al hebben maar niet kennen. Het verschijnt volledig (met schermafbeelding) in de
  toolkiezer van het naslagwerk, en verkort in het plan met een knop ernaartoe. Microsoft Copilot
  heeft er een: de aparte Copilot-app met de knop "Leren" en de hulpprogramma's voor onderwijs

- een assistent kan een `vraaglabel` hebben: het label dat in de toolvraag staat, waar de gewone
  `naam` te kort is om aan te klikken. "Nog geen" heet daar "Nog geen, of ik weet het nog niet".
  Bij een assistent met `geenaccount` blijft de merknaam weg uit de kop van het plan en het
  welkomscherm: "Jouw plan · met Nog geen" leest als een fout

Wisselen kan altijd via de toolkiezer in het naslagwerk; de rest van de antwoorden blijft staan.

## De gids

De volgorde van de vragen staat in `volgorde()` in `app.js`, de werkwijzebepaling in `werkwijze()`.
**Eerst je doel, dan je ervaring, dan pas je tool.** De doelvraag (`doel` in `data.js`) is de enige
die naar jouw plan vraagt in plaats van naar je omstandigheden; ze opent het plan met je eigen zin
en kiest de drie prompts die je meekrijgt. Daarna komt ervaring, want wie nog nooit met AI werkte
kan de toolvraag niet beantwoorden: door die volgorde weet de site dat al voor ze naar een merk
vraagt. Wie "weinig of geen ervaring" antwoordt, krijgt een korter traject (geen vragen
over installeren of versiebeheer) en komt altijd uit op werkwijze 1. Antwoorden blijven in de
browser staan (localStorage); halverwege stoppen en later verdergaan werkt. Toetsenbord: de cijfers
1 tot 9 kiezen een antwoord.

Antwoord je "nog geen" op de toolvraag, dan volgt geen waarschuwing maar een **keuzescherm**: de
gevallen uit `toolkeuze` in `data.js`, elk met een knop die die tool meteen instelt en de gids
verderzet. Een geval zonder `tool`-id is advies zonder knop. De knop onderaan ("Ik beslis later")
laat je door met "nog geen".

### Wie in de browser blijft, krijgt minder te zien

`browserOnly()` in `app.js` is waar dat op steunt: waar bij wie "weinig of geen ervaring"
antwoordde, of wie op werkwijze 1 uitkwam. Voor hen valt weg wat ze toch niet gaan doen, want één
commandoregel is genoeg om iemand te doen denken dat deze site niet voor hem is:

- routes met `"installeren"` als derde element in `bron[].routes` (de pandoc- en git-routes)
- de installatielinks uit het "Waarmee"-blok, volgens `MOETJEINSTALLEREN` in `app.js`
- `letopBrowser` vervangt `letop` waar dat over pandoc ging (nu bij Word en PowerPoint)
- de mappenboom: `bronMap.browser` geeft dezelfde regels zonder boom, in de termen van je tool

Het woord *markdown* valt in die tussenstap voor het eerst; `markdownUitleg` staat er daarom
pal onder, en niet drie kaarten verderop in het naslagwerk.

## Lokaal draaien

Open `index.html` met de Live Server-extensie in VS Code (rechtsklik, *Open with Live Server*). Dat
is alles. Er is geen build, geen npm en geen internet nodig: de pagina bestaat uit vier bestanden en
laadt niets van buiten.

Zonder Live Server kan ook:

```bash
python -m http.server 8080     # en dan http://localhost:8080
npx serve .                    # idem
```

`index.html` rechtstreeks openen met dubbelklik werkt ook, alleen bewaart de browser dan je
antwoorden niet tussen twee bezoeken.

## Waar de tekst staat

Alle inhoud staat in `data.js`, in het Nederlands, in een object per onderdeel: `waarom`,
`snelwinst`, `materiaal`, `bron`, `bronRegels`, `bronMap`, `werkwijzen`, `installatie`, `ervaring`,
`onderwerpen`, `vergelijking`, `outputs`, `valkuilen`, `randgevallen`, `prompts`, `assistenten`,
`gereedschap`, `voorbeelden` en `links`. Een tip toevoegen is een regel bijzetten in dat bestand.

- een werkwijze krijgt haar pagina uit `voorwie`, `pitch`, `punten`, `installeren`, `stappen`,
  `overslaan` en `onderwerpen` (een zin per onderwerp)
- een onderwerp krijgt zijn venster uit `watis`, `kern`, `tips`, `gevorderd` en optioneel een `tabel`
- elk formaat in `bron` (Word, PowerPoint, pdf, scan, leerplatform ...) krijgt naast `advies` twee
  `routes` (`[kop, tekst]`: een zonder installatie en een met Quarto of pandoc) en een `letop` met
  wat er stilletjes sneuvelt. Tekst `tussen accenten` wordt een code-vakje; functie `rijk()` in
  `app.js` doet dat. Die tussenstap komt na de vraag "in welke vorm staat je cursus nu"
- `bronMap` is de mapindeling (één bestand per hoofdstuk, `content/` naast `context/`): `kop`,
  `kern`, `boom` (lijst regels, letterlijk getoond), `regels` (`[kop, uitleg]`) en `noot`. Functie
  `bronMapBlok()` tekent ze, zowel in die tussenstap als in het onderwerp "Werk in platte tekst"
- een assistent krijgt zijn kaartjes uit `plek`, `regels`, `skill`, `inmap`, `waar` en
  `termen.regelsbestand`, en eventueel `wistjedat` met `kop`, `tekst` (lijst alinea's),
  `afbeelding` (een bestand uit `assets/`), `alt`, `bijschrift`, `slot` en `planregel`
- `waarom` is de opbrengst van de hele aanpak (jezelf niet herhalen, ver komen op een gratis
  account, werk dat achterblijft): een lijst `kop` + `tekst`, met `waaromKop` en `waaromNoot`
  erboven. Functie `waaromBlok()` in `app.js` tekent ze, onderaan het welkomscherm en onder de
  vier stappen in het plan. Elk item van `snelwinst` heeft daarnaast een eigen `waarom`-regel,
  zodat de reden naast het ding staat waar ze over gaat
- elke prompt heeft een `id`. Een prompt met een `start`-nummer (1, 2, 3) is de standaardoprit;
  koos je een doel, dan kiezen de `prompts`-id's van dat doel welke drie er in het plan staan
  (`doelPrompts()` valt terug op `startPrompts()`). Ze staan onder `promptPlanKop` en
  `promptPlanNoot`. Achter een kaart in het naslagwerk vindt een beginner ze niet.
  `promptKaart()` in `app.js` tekent één kaart, op beide plekken dezelfde
- elk item in `doel` heeft `label` en `hulp` (voor de vraag), `planKop`, `wat` en `eerst` (de kaart
  bovenaan het plan) en `prompts` (id's uit `prompts`). Een doel bijzetten is dus één item, zonder
  aan `app.js` te komen
- `voorbeeldgesprek` is één sessie van begin tot eind: `intro`, `situatie`, `duur`, `stappen`
  (elk met `kop`, `jij`, `terug`, `let`), `valkuil` en `slot`. Het is er voor wie de losse
  onderdelen snapt maar niet weet hoe een gesprek verloopt, en het staat bewust als één verhaal
  met één hoofdstuk, niet als tips naast elkaar. `tekenSessie()` tekent het; omdat er
  `{projectplek}` in staat, hertekent `naarTab()` het telkens je het naslagwerk opent
- een werkwijze kan een `volgendestap` hebben (`naar`, `wanneer`, `wat`, `nognietnodig`): de ladder
  onderaan het plan. Werkwijze 4 heeft er geen, want daar houdt het op
- het zoekveld indexeert alles in `bouwIndex()` in `app.js`
- een voorbeeld toevoegen aan de galerij is een item bijzetten onder `voorbeelden`, met
  `titel`, `wat`, `url`, `tech` (de keywords die als bolletjes op de kaart komen) en
  optioneel `maker` (de naam onder de titel, zodat collega's weten bij wie ze terecht kunnen)

## De tekeningen

De tekeningen zijn niet met de hand gemaakt maar **gegenereerd met een Node-script**, in de
Excalidraw-stijl (rough.js, handschriftfont Caveat, rood op offwhite). Elk script blijft bewaard,
zodat een figuur bijgestuurd kan worden zonder van nul te beginnen.

- de scripts staan in `assets/imagegen/`, samen met `excal.js` (de stijl-helpers) en de twee
  Caveat-fonts. De npm-pakketten staan in de repo-root (`npm install`; `node_modules/` is
  gitignored)
- draaien doe je **vanuit `assets/imagegen/` zelf**: `node kernidee.js`. Het script schrijft de
  `.svg` naast zichzelf en de `.png` een map hoger, in `assets/`
- de stijl staat beschreven in de skill `.claude/afbeelding/`, met de API in `references/api.md`
  en een checklist om de gerenderde PNG na te kijken. Kijk de PNG altijd na: rough.js geeft geen
  foutmelding bij tekst die over een lijn valt

Welke tekening waar hangt, staat in `data.js` en nergens anders:

- `figuren.kernidee` en `figuren.werkwijzen` zijn de twee losse tekeningen: de eerste staat op
  het welkomscherm, de tweede boven de tabs op de werkwijzenpagina (in `#werkwijzenfiguur`)
- een onderwerp kan een `figuur` hebben; die verschijnt in het onderwerpvenster tussen "De kern"
  en de tips. Nu hebben `plat`, `contextmap` en `skills` er een
- een figuur is telkens `bestand` (pad vanaf `site/`), `alt` (beschrijf wat er te zien is) en
  `bijschrift`. Het bijschrift mag niet herhalen wat er vlak boven al staat
- `figuurBlok()` in `app.js` tekent ze; klikken opent de tekening op ware grootte. Een brede
  tekening (`figuur-breed`) treedt op een ruim scherm buiten de tekstkolom, anders wordt het
  handschrift onleesbaar

Schermafbeeldingen staan ook in `assets/`.

`app.js` bevat de logica, `styles.css` de opmaak (licht papier, rood als accent, ook een donkere
versie). De accentkleur sluit aan bij de tekeningen en staat in `--accent`, `--accent-diep` en
`--accent-zacht`.
