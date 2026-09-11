# Een cursus schrijven met AI

Een zelfstandige website voor lesgevers (leerkrachten, lectoren, docenten van elke school) die AI
willen inschakelen bij het maken van hun cursusmateriaal. De site catert bewust naar beginnende en
gemiddelde AI-gebruikers: duidelijke taal, geen jargon, en niets dat een installatie vereist om te
kunnen starten.

De opzet is **antwoord eerst**: de startpagina zegt in welke volgorde je het doet, in zeven stappen.
Daaronder staan twee deuren. Links je eerste sessie, één hoofdstuk lang, klik voor klik. Rechts de
gids: één rustige vraag per scherm, en na een handvol vragen ontvouwt zich **Jouw plan**, een
persoonlijk stappenplan in de termen van de gekozen AI-tool. Daarnaast zit alles achter een klein
menu:

| Menu | Wat het is |
|---|---|
| Start | de startpagina: de volgorde in zeven stappen met `volgorde.png` erboven, de twee deuren, de slides, en daarachter de vragen van de bevrager, één per scherm, met voortgangsbolletjes en een terugknop |
| Jouw plan | verschijnt na de bevrager: je doel bovenaan, je werkwijze in één regel, de vier dingen die je meeneemt in de termen van jouw tool, de eerste drie prompts om te plakken, en onder "Als je verder wil" de rest achter een vouw |
| Naslagwerk | een zoekveld over alles, en daaronder de deuren in groepen, met boven elke groep de vraag die ze beantwoordt. Je ziet er altijd maar een onderdeel tegelijk. De valkuilen zijn er een van |
| Voorbeelden | de galerij met externe voorbeelden, met keywords per kaart. Groeit nog |
| De slides ↗ | de talk waar deze site uit komt, als aparte pagina onder `/slides/`. Geen paneel, dus ze staat met een rand en een pijltje in de kop |

Dat zijn de vier delen van `website.png` op de slides: de startpagina, de bevrager, het naslagwerk
en de voorbeelden. De valkuilen stonden hier als vijfde knop en zitten sinds die slide in het
naslagwerk, bij de onderwerpen, de prompts en de tools. Oude links naar `#valkuilen` blijven werken:
`bindTabs()` stuurt ze door naar `#naslag/valkuilen`.

De werkwijzenpagina (een pagina per werkwijze plus de vergelijkingstabel) hangt niet in het menu
maar is bereikbaar vanuit het plan, het naslagwerk en het zoekveld.

## De startpagina: eerst het antwoord, dan de deuren

De startpagina was de bevrager zelf: een kop, een terzijde, **Start de gids**, en daaronder vier
gelijke knoppen naar de contextmap, je regels, skills en de valkuilen. Wie binnenkwam met "hoe begin
ik eraan" kreeg dus eerst vragen terug, en daarna een menu. Vier knoppen naast elkaar zeggen wel wat
er bestaat, niet wat er eerst komt.

Nu staat het antwoord er: `startplan` in `data.js`, zeven stappen in de volgorde waarin je ze zet,
van "schrijf eerst als schrijver" tot "en dan pas je opmaak". Het zijn dezelfde zeven als op
`volgorde.png`, en die tekening staat erboven (`figuren.volgorde`). De vier dingen die je meeneemt
zitten daar als stap drie tot zes nog altijd in, alleen niet meer als gelijken. Onder elke stap staat
een wegwijzer naar de plek waar het onderwerp uitgelegd wordt; die knop kent zichzelf, want de naam
komt uit `interneBestemming()`, dezelfde functie die de wegwijzers onder een valkuil tekent.
`startplanNaast` zet er twee dingen naast die niet in de volgorde passen: je afbeeldingen en git.

Op de tekening staan twee beugels onder de bolletjes: *eerst schrijven* onder stap één en twee,
*hier komt de AI erbij* onder drie tot zeven. In de lijst eronder staan die twee als tussenkop, op de
plek waar de kleur verspringt. Ze komen uit `startplanGroepen`, en een stap wijst met `groep` naar
de zijne. Zonder die twee regels leest het als zeven gelijke stappen, en dan verdwijnt dat de AI er
pas bij drie bij komt.

Daaronder staan twee deuren (`startDeuren()` in `app.js`). Links **Je eerste sessie**, de meest
concrete bladzijde van de site, die vroeger enkel via het naslagwerk of via je plan te bereiken was.
Rechts de bevrager. Wie ze al deed, ziet in die tweede deur zijn plan staan ("werkwijze 1, Alles in
de browser, met Claude") met de knop ernaartoe; wie halverwege stopte, leest daar waar hij gebleven
was. `snelwinst` staat sindsdien alleen nog in Jouw plan.

Onder de deuren staat `slidesBanner()`: de talk zelf, met haar titel en de toetsen die je erin nodig
hebt. Daarna nog één regel naar het naslagwerk, en daar stopt de pagina.

Er stond nog meer onder: `aanleidingBlok()` (de twee slides waar de talk mee opent, het antwoord
dat las als een folder in `teleurstelling.png` en dat het niet alleen aan je vraag lag in
`mimic.jpg`), `kernidee.png` en de zeven redenen van `waaromBlok()`. Daarmee liep de pagina na het
antwoord nog eens zo lang door. Die drie staan nu samen in het vak `waarom` van het naslagwerk,
getekend door `tekenWaarom()`.

## Het naslagwerk: een hub met deuren

Het naslagwerk stond ooit als een lange lijst op een pagina. Dat leest niemand. Nu is het een hub:
elf kaarten met een pictogram, een titel, een zin en een teller. Je klikt er een open, ziet alleen
dat onderdeel, en gaat met "Alle onderdelen" terug.

Elf kaarten op een hoop zijn elf kaarten die je alle elf moet lezen. Ze staan daarom in zes
groepen, met boven elke groep de vraag die je stelt op het moment dat je hier terechtkomt. Wie zijn
vraag herkent, leest de andere groepen niet. De hiërarchie zit in de opmaak: de eerste deur is een
brede kaart in de accentkleur, het colofon is een smalle kaart zonder schaduw, de rest zit
ertussenin.

| Groep (`hubgroep-`) | Vraag erboven | Kleur | Kaarten |
|---|---|---|---|
| `start` | Waar begin ik? | rood accent | Je eerste sessie, stap voor stap (`eerstekeer`, brede kaart) |
| `mis` | Het ging mis. Wat ontbrak er? | rood accent | Valkuilen (`valkuilen`, brede kaart) |
| `kern` | Hoe werkt dit dan? | blauw | Waarom je dit doet (`waarom`), De onderwerpen (`onderwerpen`), De vier werkwijzen (geen vak: springt naar de werkwijzenpagina) |
| `maat` | Wat geldt er bij mij? | oker | Met welke AI werk je? (`tool`), Wat moet eruit komen? (`uitkomst`), Bij mij ligt dat anders (`randgevallen`) |
| `pak` | Wat kan ik nu meteen gebruiken? | groen | Prompts om te plakken (`prompts`), Gereedschap en links (`gereedschap`) |
| `achter` | Achter de schermen | grijs | Hoe deze site gemaakt is (`colofon`, smalle kaart) |

De groepen staan in `HUBGROEPEN` in `app.js`, met per kaart een `icoon`, een `tel()` en soms een
`merk()`. `AFDELINGEN` is de platgeslagen lijst daarvan, zodat de rest van de code niets van de
groepen hoeft te weten. De vakken zelf zijn `<div class="naslagvak" data-vak="...">` in
`index.html`. Een vak bijzetten is dus een item in een groep plus een div.

De kleur zit in twee variabelen die de groep zet, `--gk` en `--gz`; de kaarten, pictogrammen en
tellers eronder halen die op. Een nieuwe groep is één regel in `styles.css`.

De pictogrammen staan als paden in `ICONEN` in `app.js`, op een raster van 24 bij 24, en nemen de
kleur van hun groep over. Het zijn geen figuren maar wegwijzers; de echte tekeningen staan als png
in `assets/`.

Wat je al gekozen hebt, staat op de kaart zelf: `merk()` zet er een regeltje onder ("nu ingesteld:
Claude", "jouw werkwijze: Alles in de browser", "gekozen: Word in het sjabloon van je school"). Zo
zie je zonder klikken in welke stand de site staat. `naarTab()` hertekent de hub telkens je het
naslagwerk opent, dus die regeltjes lopen nooit achter.

Een open vak staat in de adresbalk (`#naslag/prompts`), zodat je een onderdeel kan doorsturen.
Het zoekveld staat boven de kaarten en zoekt door alles heen; een treffer opent het juiste vak.

## Jouw plan: één lijn, en de rest achter een vouw

Het plan was een stapel kaders: je doel in een kader, je werkwijze in een kader, de vier stappen als
vier kaarten met een schaduw, en daaronder nog vijf blokjes naast elkaar. Alles stond open en alles
riep even hard.

Wat je nodig hebt om vandaag te beginnen, staat nu zonder kader op de pagina:

1. de kop met je doel (`planKop`, `wat`, `eerst`). Alleen de zin "Waar je vandaag begint" krijgt
   een streep in de accentkleur
2. je werkwijze als één regel: nummer, naam, pitch en een knop naar de werkwijzenpagina. De
   volledige kaart met haar punten en routes staat daar, en stond hier een tweede keer
3. de vier dingen uit `snelwinst` als één kolom met een lijn ertussen, met `meenemen.png` erboven
   en de regel in de termen van jouw tool eronder. Klikken opent het onderwerpvenster. De nummers
   zijn de stappen drie tot zes uit de volgorde (het veld `nr`) en niet de plaats in de lijst, zodat
   hier dezelfde cijfers staan als op de tekening en op de startpagina
4. de drie prompts, en daaronder de twee doorverwijzingen op één regel: je eerste sessie, en alle
   prompts in het naslagwerk

De rest staat onder "Als je verder wil" in een rij `<details>`, dicht: hoe je je werkwijze opzet
(met haar `routes` en links), hoe het bij jouw tool heet (met `wistjedat`), wat er uit je antwoorden
kwam, waarom je dit doet, en de volgende werkwijze. `planVouw(titel, icoon)` in `app.js` maakt er
een; het element krijgt zijn binnenkant mee als `.binnen`. De vouwen staan tegen elkaar aan in één
kader, zodat het er één is en geen zes.

Wat in zo'n vouw staat, kwam uit een eigen kader. Daarbinnen krijgt het er geen tweede:
`.planvouw .blokje`, `.planvouw .waarom` en `.planvouw .wistjedat` halen de rand en de achtergrond
weg. `assistentKaart(a, false)` en `waaromBlok(true)` laten om dezelfde reden hun kop weg, want de
vouw draagt die titel al. Op papier staat elke vouw open (`@media print`).

## Tool-specifieke teksten

De toolvraag kent zes antwoorden: **Claude, ChatGPT, Gemini, Microsoft Copilot, iets anders
(zelf gehost, OpenRouter, ...) of nog geen**. De keuze stuurt de hele site:

- teksten met de placeholders `{regelbestand}` `{regelsplek}` `{projectplek}` `{skillplek}` en
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
  toolkiezer van het naslagwerk, en verkort in het plan met een knop ernaartoe. Het veld mag ook
  een lijst blokken zijn: in de toolkiezer staan ze dan alle onder elkaar, in het plan enkel het
  eerste. Microsoft Copilot heeft er twee: de aparte Copilot-app met de knop "Leren" en de
  hulpprogramma's voor onderwijs, en Copilot Notebooks. Een blok kan zijn eigen `links` dragen,
  die onderaan het blok verschijnen (enkel in de toolkiezer, niet in het plan)

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

### De slides erbij

De knop **De slides** in de kop wijst naar `slides/`, en die map staat er lokaal niet. Ze wordt
gemaakt uit `slides/cursus-schrijven-met-ai.qmd`, vanuit de repo-root:

```bash
npm run slides
```

Dat rendert de talk naar `site/slides/index.html`, met haar tekeningen en haar thema ernaast. De map
staat in `.gitignore`, want ze is af te leiden uit de qmd; op GitHub Pages maakt de stap *Slides
renderen* in [.github/workflows/pages.yml](../.github/workflows/pages.yml) ze bij elke deploy
opnieuw. Draai je dat commando niet, dan is de knop een link naar niets: de rest van de site werkt
gewoon. Quarto moet je er wel voor geïnstalleerd hebben.

## Opmaak in de tekst zelf

`rijk()` in `app.js` leest vier markeringen: `` `tussen accenten` `` wordt een code-vakje,
`*tussen sterretjes*` cursief, `**tussen dubbele sterretjes**` vet en `[[2]]` een verwijzing naar
een andere werkwijze (zie de volgende sectie). Cursief is voor het terzijde waarmee een stuk
opent, en voor het scharnierwoord van een zin; zie de sectie Schrijfstijl in
`CLAUDE.md`. Niet elk veld gaat door `rijk()`: het werkt in `waaromNoot`, `waarom[].tekst`, de
`watis`, `kern`, `tips` en `gevorderd` van een onderwerp, `doel[].wat` en `doel[].eerst`, de
`pitch`, `uitleg` en `slot` van een werkwijze, `bron[].advies`, `bron[].routes` en `bron[].letop`,
de regels van `bronMap`, `punten` en `stappen` van een werkwijze, `routes[].uitleg` met de `noot`
en `zonderterminal` ernaast, alles in `voorbeeldgesprek`, en sinds de verwijzingen ook
`randgevallen[].wat`, `assistenten[].inmap` en de `onderwerpen` van een werkwijze (het blok
"Bij werkwijze N" onderaan een onderwerp). Zet je een sterretje in een ander veld, dan staat het
sterretje op het scherm. Waar dezelfde tekst ook als platte tekst moet verschijnen (de
zoekresultaten en het blok "Uit jouw antwoorden"), haalt `plat()` de markeringen er weer uit.

## Verwijzen naar een andere werkwijze

`[[2]]` in een tekst wordt "werkwijze 2": een merkje in de lopende zin dat een klein venster
opent met de pitch van die werkwijze, wat je ervoor installeert en voor wie ze is. `[[3,4]]`
noemt er twee en toont ze allebei. `[[1|Werkwijze 1]]` zet er je eigen opschrift bij, voor een
zin die met de verwijzing begint en dus een hoofdletter vraagt. Een nummer dat niet in
`werkwijzen` staat, valt weg en laat enkel de tekst achter.

Het venster is `#wwvenster` in `index.html`, los van `#blokvenster`, zodat het ook boven op een
openstaand onderwerp kan komen. Sluiten zet de lezer terug waar hij zat; enkel de knop "Lees
werkwijze N helemaal" wisselt echt van tab.

Zet zo'n merkje alleen waar de lezer iets concreets zoekt dat een stap hoger ligt: het randgeval
over formules en code, het verplichte sjabloon van je school, het automatische deel van skills.
Waar de tekst zegt dat je iets *niet* nodig hebt (`overslaan`, `nognietnodig`, het `slot` van
werkwijze 1), blijft de verwijzing plat: die zin geeft de lezer net toestemming om niet te gaan
kijken. En waar een hogere werkwijze naar een lagere terugwijst ("zelfde als werkwijze 1"),
hoort het feit gewoon in de zin: wie op 3 uitkomt, heeft 1 nooit gelezen.

## De kaders en hun pictogrammen

Een kader is elk blok dat een eigen titel draagt: een adviesregel, een let-op, een vouw onderaan je
plan, de blokjes met stappen, het waarom-blok, een randgeval. Elke titel opent met een pictogram, en
dat pictogram zegt welk soort blok eronder staat: `verboden` bij wat je buiten laat, `waarschuwing`
bij een valkuil, `weegschaal` bij een afweging, `vink` bij wat wel mag, `roos` bij de kern, `lamp`
bij een uitleg, `moersleutel` bij het stuk voor wie al bezig is.

`kaderKop(tag, klas, tekst, icoon, chip)` in `app.js` tekent er een. Waar vroeger
`el("b", null, "Let op")` stond, staat nu `kaderKop("b", null, "Let op", "waarschuwing")`. Het vijfde
argument is de enige keuze die je nog moet maken: laat je het weg, dan staat het icoon kaal naast de
tekst (voor labels in een tekstblok), zet je het op `true`, dan staat het in een gekleurd vierkantje
zoals op de deuren van het naslagwerk (voor kaders met een echte kop). De titel gaat door `rijk()`,
dus sterretjes en accenten werken er ook.

De iconen zelf staan in `ICONEN` in `app.js`: vierentwintig paden op een raster van 24 bij 24, in
code en niet in een bestand, want het zijn pictogrammen en geen figuren. Ze nemen hun kleur over van
het kader waar ze in staan. Elk kader zet daarvoor twee variabelen in `styles.css`: `--kk` is de
lijnkleur, `--kz` de kleur van het vierkantje eronder. `.advieslijn.vragen` zet `--kk` op oker,
`.advieslijn.ok` op groen, en een kader dat zelf op `--accent-zacht` staat (het waarom-blok in het
naslagwerk) zet `--kz` op `--kaart`, anders valt het vierkantje weg tegen zijn eigen achtergrond.
Alles staat in `em`, zodat het icoon meegroeit met de kop waar het naast staat: bij de kleine
kopjes in een blokje wordt het vanzelf klein.

Een icoon bijzetten is een regel in `ICONEN` en een naam meegeven aan `kaderKop`. Test een nieuw
pad op zeventien pixels en niet op zesenvijftig: dat is de maat waarop het in een adviesregel
terechtkomt, en een pad met vijf onderdelen wordt daar een vlek.

## Waar de tekst staat

Alle inhoud staat in `data.js`, in het Nederlands, in een object per onderdeel: `waarom`,
`startplan`, `snelwinst`, `materiaal`, `bron`, `bronRegels`, `bronMap`, `werkwijzen`, `installatie`, `ervaring`,
`onderwerpen`, `vergelijking`, `outputs`, `valkuilen`, `randgevallen`, `prompts`, `assistenten`,
`gereedschap`, `voorbeelden`, `colofon` en `links`. Een tip toevoegen is een regel bijzetten in dat bestand.

- `startplan` is de volgorde op de startpagina: per stap een `kop`, een `tekst` en optioneel een
  `wegwijzer` (`{ naar, id }`, dezelfde vorm als de `verder` onder een valkuil) met een eigen `knop`
  als opschrift. Wijst een stap twee kanten op, dan zet je `wegwijzers` in de plaats: een lijst van
  `{ wegwijzer, knop }`. Stap 2 doet dat, want droge tekst en je mapindeling zijn twee
  bladzijden. `startplanKop` en `startplanNoot` staan erboven, `startplanNaastKop` en
  `startplanNaast` eronder. Een stap bijzetten is dus een item in die lijst, zonder aan `app.js` te
  komen; `startplanBlok()` tekent ze
- een werkwijze krijgt haar pagina uit `voorwie`, `pitch`, `punten`, `installeren`, `stappen`,
  `overslaan` en `onderwerpen` (een zin per onderwerp)
- een werkwijze kan daarnaast `routes` dragen: twee manieren om hetzelfde te doen, met `kop`,
  `items` (`naam`, `wat`, `hoe`, `uitleg`), een `noot` en een `zonderterminal`. Werkwijze 2 en 3
  hebben ze. Bij 2 beslist wat eruit moet komen of je pandoc of Quarto installeert; bij 3 beslist
  of je een commandovenster wil of niet, want Cowork komt aan een map op je schijf vanuit de
  Claude-app en Claude Code doet dat vanuit een commandovenster. `routesBlok()` in `app.js` tekent
  ze, op de werkwijzenpagina en in de vouw "Zo zet je werkwijze N op"; een werkwijze zonder
  `routes` krijgt niets extra
- een onderwerp krijgt zijn venster uit `watis`, `kern`, `tips`, `gevorderd` en optioneel een `tabel`.
  Er zijn er negen, in de volgorde van de zeven stappen: `plat`, `mapindeling`, `contextmap`,
  `regels`, `improve`, `skills`, `nakijken`, `lesmateriaal`, `figuren`
- een onderwerp kan daarnaast een `code` dragen (een stuk uit een echt bestand, met `kop`, `intro`,
  `taal` en `tekst`, letterlijk in een codeblok) en een `kader` (het terzijde dat er telkens op
  volgt, met `kop`, `tekst` en een eigen `figuur`). Zet `breed: true` op die figuur wanneer het een
  schermafdruk is die je moet kunnen lezen; anders staat ze naast de tekst
- een onderwerp kan een `verder` dragen: wegwijzers naar een andere plek op deze site, met dezelfde
  kaartjes als onder een valkuil. Dat is waar uitleg heen ging die op deze bladzijde stond maar er
  niet over ging: de opmaak hoort bij "Van tekst naar lesmateriaal" en niet bij "Werk in platte
  tekst"
- een onderwerp kan daarnaast `keuzes` dragen: groepen manieren om hetzelfde te doen, met per
  groep een `kop`, een `noot` en een `slot`, en per optie `naam`, `wanneer` (het merkje), `hoe`,
  een `code` die letterlijk in een codeblok komt, `letop` en `links`. Tips zeggen wat je moet
  doen, keuzes zeggen wat je moet kiezen. "Van tekst naar lesmateriaal" en "Figuren bij je tekst"
  hebben er elk een; die twee stonden ooit in één venster van 7600 tekens, ruim vier keer een
  ander onderwerp. `keuzeBlokken()` in `app.js` tekent ze, na de tips
- elk formaat in `bron` (Word, PowerPoint, pdf, scan, leerplatform ...) krijgt naast `advies` twee
  `routes` (`[kop, tekst]`: een zonder installatie en een met pandoc) en een `letop` met
  wat er stilletjes sneuvelt. Tekst `tussen accenten` wordt een code-vakje; functie `rijk()` in
  `app.js` doet dat. Die tussenstap komt na de vraag "in welke vorm staat je cursus nu"
- `bronMap` is de mapindeling (een map per hoofdstuk, daarin een bestand per onderwerp, en
  `content/` naast `context/`): `kop`, `kern`, `boom` (lijst regels, letterlijk getoond), `regels`
  (`[kop, uitleg]`) en `noot`. Functie `bronMapBlok()` tekent ze, zowel in die tussenstap als in
  het onderwerp "Zet je cursus per hoofdstuk klaar". Daar krijgt ze `zonderKop`, want die kop en
  die kern staan al bovenaan het venster. `bronMap.browser` is dezelfde inhoud zonder boom, voor
  wie in de browser blijft en dus geen mappen op zijn schijf heeft
- een assistent krijgt zijn kaartjes uit `plek`, `regels`, `skill`, `inmap`, `waar` en
  `termen.regelbestand`. `sessieplek` is de lijst klikstappen die bij stap 1 van
  `voorbeeldgesprek` verschijnt (letterlijke knopnamen, `**vet**` en `` `code` `` mogen erin), en
  `sessieplekLink` overschrijft daar de link die anders uit `rollen.project` komt (een lege string
  laat de link weg). Verder eventueel `wistjedat` (een blok of een lijst blokken) met `kop`,
  `tekst` (lijst alinea's), `afbeelding` (een bestand uit `assets/`), `alt`, `bijschrift`, `slot`,
  `planregel` en `links`
- `waarom` is de opbrengst van de hele aanpak (jezelf niet herhalen, ver komen op een gratis
  account, werk dat achterblijft): een lijst `kop` + `tekst`, met `waaromKop` en `waaromNoot`
  erboven. Functie `waaromBlok()` in `app.js` tekent ze, in het vak `waarom` van het naslagwerk en in het plan
  achter de vouw "Waarom je dit doet"; `waaromBlok(true)` laat daar de kop weg, want de vouw draagt
  die al. Elk item van `snelwinst` heeft daarnaast een eigen `waarom`-regel, zodat de reden naast
  het ding staat waar ze over gaat
- elke prompt heeft een `id`. Een prompt met een `start`-nummer (1, 2, 3) is de standaardoprit;
  koos je een doel, dan kiezen de `prompts`-id's van dat doel welke drie er in het plan staan
  (`doelPrompts()` valt terug op `startPrompts()`). Ze staan onder `promptPlanKop` en
  `promptPlanNoot`. Achter een kaart in het naslagwerk vindt een beginner ze niet.
  `promptKaart()` in `app.js` tekent één kaart, op beide plekken dezelfde
- elk item in `doel` heeft `label` en `hulp` (voor de vraag), `planKop`, `wat` en `eerst` (de kop
  van het plan) en `prompts` (id's uit `prompts`). Een doel bijzetten is dus één item, zonder
  aan `app.js` te komen
- `voorbeeldgesprek` is één sessie van begin tot eind: `intro`, `situatie`, `tweedekeer`,
  `stappen` (elk met `kop`, `jij`, `terug`, `let`), `plek`, `valkuil` en `slot`. `plek` hangt onder
  stap 1 en beantwoordt de vraag "waar zet ik die map dan": `kop` en `zonderTool` voor wie nog geen
  tool koos, `boomKop` + `boom` (lijst regels, letterlijk getoond zoals bij `bronMap`) en `schijf`
  voor wie er toch een map op zijn eigen schijf bij wil. Het klikpad zelf staat per assistent in
  `sessieplek`; `sessiePlekBlok()` in `app.js` zet die twee samen. Het is er voor wie de losse
  onderdelen snapt maar niet weet hoe een gesprek verloopt, en het staat bewust als één verhaal
  met één hoofdstuk, niet als tips naast elkaar. `tekenSessie()` tekent het; omdat er
  `{projectplek}` in staat, hertekent `naarTab()` het telkens je het naslagwerk opent
- een werkwijze kan een `volgendestap` hebben (`naar`, `wanneer`, `wat`, `nognietnodig`): de laatste
  vouw onderaan het plan. Werkwijze 4 heeft er geen, want daar houdt het op
- een valkuil draagt naast `klacht`, `fix` en `onderwerp` ook `verder`, `links` en `toollink`.
  `verder` is de lijst wegwijzers naar een plek op deze site: `{ naar, id, wat }`, met `naar`
  gelijk aan `onderwerp`, `prompt`, `werkwijze`, `vak` (een vak van het naslagwerk) of `tab`.
  `interneBestemming()` in `app.js` haalt de naam van die bestemming uit de data, dus een onderwerp
  dat hernoemd wordt verandert hier vanzelf mee; `wat` is de regel eronder en zegt wat je daar
  vindt. Een prompt als bestemming springt naar de kaart zelf (`naarPrompt()`), die dan even
  oplicht. `links` zijn de bladzijden van de makers. `toolLinks()` draait daar niet over:
  dat vervangt één merklink door de zes van je eigen merk, en zes kaartjes onder één klacht is een
  muur. De valkuil noemt met `toollink` een rol (`regels`, `project` of `skill`), en `rollen` bij
  je assistent zegt welke bladzijde daarbij hoort. `verderBlok()` tekent de twee rijen
- het zoekveld indexeert alles in `bouwIndex()` in `app.js`
- `colofon` is het regelbestand waarmee deze site geschreven is, plus wat er bij het maken
  misging: `intro`, `misliepKop` en `misliep` (lijst alinea's), `regelsKop` en `regelsIntro`
  (lijst alinea's), `welKop` + `wel` en `nietKop` + `niet` (elk een lijst `kop` + `tekst`), en
  `slot`. `tekenColofon()` tekent het, en de teller op de hubkaart telt `wel` en `niet` op, zodat
  het getal nooit uit de pas loopt met de lijst. Het onderwerp "Je regels in een bestand" heeft
  daarnaast een `voorbeeld` (`kop`, `intro`, `regels`, `knop`): zes van die regels in het
  onderwerpvenster zelf, met een knop naar het volledige bestand. Die zes staan bewust apart, want
  de selectie is een keuze en geen kopie
- `colofon.skill` is het tweede stuk eigen werk dat het colofon toont: de skill waarmee de figuren
  van deze site getekend worden (`kop`, `intro` als lijst alinea's, `bestandenKop` en `bestanden`
  als `[naam, wat, link-id]`, `slot` en `links`). De vier bestanden zelf staan in
  `assets/skill-afbeelding/`, genericised uit `.claude/afbeelding/`: paden zonder modulenummers en
  zonder de aannames van die repo, zodat een lezer ze kan overnemen. `excal.js`, de twee
  Caveat-fonts en de vijf echte figuurscripts staan al in `assets/imagegen/`, dus wie de skill neemt
  heeft er ook de helper en een werkend voorbeeld bij. Het onderwerp "Skills" heeft er hetzelfde
  `voorbeeld`-blok bij als "Je regels in een bestand", met de knop naar dit colofon
- de alinea's van `misliep` horen in Tims eigen woorden te staan. Wat er nu staat is een voorzet op
  basis van wat er bij het nakijken van deze site gevonden werd (negen em-dashes, acht
  tijdsaanduidingen), en mag vervangen worden
- een voorbeeld toevoegen aan de galerij is een item bijzetten onder `voorbeelden`, met
  `titel`, `wat`, `url`, `tech` (de keywords die als bolletjes op de kaart komen) en
  optioneel `maker` (de naam onder de titel, zodat collega's weten bij wie ze terecht kunnen)
- boven de galerij staat `voorbeeldenWaarschuwing` (`kop`, `icoon` en `tekst`, een array
  alinea's) als een uitklapbaar blokje: een paar projecten in de lijst zijn eigen
  webapplicaties, en zonder dat blok leest de galerij als een lat. Dichtgeklapt is de `kop` de
  hele boodschap, dus die moet op zichzelf staan. `icoon` is een naam uit `ICONEN` in `app.js`.
  De tekst noemt twee kaarten bij naam, dus ze mee aanpassen als die eruit gaan

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

- `figuren` draagt de losse tekeningen: `volgorde` boven de zeven stappen, `meenemen` boven de
  vier dingen in je plan, `kernidee` in het vak `waarom` van het naslagwerk, en `werkwijzen` boven de tabs op
  de werkwijzenpagina (in `#werkwijzenfiguur`)
- een onderwerp kan een `figuur` hebben; die verschijnt in het onderwerpvenster tussen "De kern"
  en de tips. Een tweede, `figuur2`, komt onder de tips: de eerste zegt wat het is, de tweede hoe
  het werkt. Zeven van de negen onderwerpen hebben er minstens een
- `aanleiding`, `assistentFiguur`, `voorbeeldgesprek.figuur` en de drie in `colofon`
  (`delenFiguur`, `figuur`, `mapFiguur`) zijn de tekeningen die bij een bladzijde horen en niet bij
  een onderwerp
- een figuur is telkens `bestand` (pad vanaf `site/`), `alt` (beschrijf wat er te zien is) en
  `bijschrift`. Het bijschrift mag niet herhalen wat er vlak boven al staat
- `figuurBlok()` in `app.js` tekent ze; klikken opent de tekening op ware grootte. Een brede
  tekening (`figuur-breed`) treedt op een ruim scherm buiten de tekstkolom, anders wordt het
  handschrift onleesbaar

Schermafbeeldingen staan ook in `assets/`.

### De tekeningen die van de slides komen

Sinds de talk staan de meeste tekeningen op twee plekken. De scripts ervoor staan in
[slides/assets/imagegen/](../slides/assets/imagegen/) en de png's die eruit komen zijn hierheen
gekopieerd: `volgorde`, `meenemen`, `mapindeling`, `improvelus`, `improvevb`, `watiseenskill`,
`skillvb`, `eerstesessie`, `teleurstelling`, `agnostisch`, `chatvenster`, `regelbestand`, `versies`,
`website` en `allessamen`. Wijzig je daar een figuur, kopieer hem dan opnieuw hierheen, want de
site leest zijn eigen `assets/` en niet die van de slides.

Vier scripts bestaan twee keer, met opzet: `eenbron`, `vijfdocumenten`, `kernidee` en
`afsprakenofskill` staan hier op 1600 tot 1660 breed en op de slides op 1560, met grotere tekst.
`afsprakenofskill` is bovendien een andere tekening geworden: hier het regelbestand naast een skill,
op de slides waar een skill vandaan komt. Die twee lopen bewust uiteen.

Vier tekeningen komen niet uit rough.js maar uit een beeldgenerator, en die staan hier als `.jpg`:
`zekerweten`, `ateam`, `laatzeschrijven` en `mimic`. Als png van 1024 bij 1024 wegen ze elk meer dan
een megabyte, en dat is voor een webpagina te zwaar. Ze zijn teruggebracht naar 960 breed en als
jpeg op kwaliteit 82 bewaard, wat ze onder de 140 kB brengt. Vervang je er een, doe dan hetzelfde;
de png's blijven in `slides/assets/` staan.

### De band bovenaan de startpagina

`assets/titel.jpg` is dezelfde tekening als de titelslide van de talk: de lector met zijn rode
potlood en vier robotjes aan een touw. Op de slide ligt ze over het hele scherm en staat de titel in
de lucht erboven; hier staat de titel eronder, dus is die lucht weggesneden.

De bron is `slides/assets/titel.png`, 1024 bij 1024. De uitsnede loopt van `y = 315` (de punt van
het potlood, net boven de antennes) tot `y = 885` (het einde van de schaduwen), over de volle
breedte, en is als jpeg op kwaliteit 88 bewaard: 1024 bij 570, 139 kB. Vervang je de tekening, snijd
dan opnieuw op diezelfde twee grenzen, want de band houdt haar eigen verhouding. Lager maken kan
niet: de optocht loopt van rand tot rand, dus een ondiepere band snijdt de buitenste robotjes af.

`heroBlok()` in `app.js` tekent ze, en bewust niet met `figuurBlok()`: die hangt er een kader, een
bijschrift en een link naar de volle grootte aan. Dit is de kop van de bladzijde en geen figuur om
te bestuderen, dus ze laadt ook meteen in plaats van lui. In de donkere stand staat het vel op
`opacity: .88`, anders is het het felste vlak van de hele bladzijde.

`app.js` bevat de logica, `styles.css` de opmaak (licht papier, rood als accent, ook een donkere
versie). De accentkleur sluit aan bij de tekeningen en staat in `--accent`, `--accent-diep` en
`--accent-zacht`.
