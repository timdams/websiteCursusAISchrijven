import React from "react";
import { AbsoluteFill } from "remotion";
import { Regels, kolomX, rijY, tekenBreedte, type Raster, type Regel } from "./code";
import { C } from "./kleuren";
import { CONSOLE_BALK, ConsolePaneel } from "./panelen";
import { Ruw, lijn, rechthoek, type Vak } from "./ruw";

// Het liggende werkblad van een kennisclip (1920x1080): code links in een ruw wit paneel, console
// rechts, en onderaan plaats voor het onderschrift.
export const CODE_VAK: Vak = { x: 70, y: 150, w: 960, h: 720 };
export const CONSOLE_VAK: Vak = { x: 1090, y: 150, w: 760, h: 720 };

export const CODE: Raster = { x: 130, y: 210, grootte: 40, hoogte: 62 };
export const UIT: Raster = {
  x: CONSOLE_VAK.x + 44,
  y: CONSOLE_VAK.y + CONSOLE_BALK + 40,
  grootte: 36,
  hoogte: 56,
};

const PANEEL = rechthoek(CODE_VAK.x, CODE_VAK.y, CODE_VAK.w, CODE_VAK.h, {
  fill: C.WHITE,
  fillStyle: "solid",
  strokeWidth: 2.4,
  seed: 11,
});

/**
 * Code links, console rechts. `onderCode` ligt onder de codetekst (markeerstift),
 * `bovenCode` en `bovenUitvoer` erboven (knip-lijnen, arcering, pijlen).
 */
export const Werkblad: React.FC<{
  code: Regel[];
  uitvoer: Regel[];
  onderCode?: React.ReactNode;
  bovenCode?: React.ReactNode;
  bovenUitvoer?: React.ReactNode;
  uitvoerOpacity?: number;
  binnen?: number;
  consoleLabel?: string;
}> = ({ code, uitvoer, onderCode, bovenCode, bovenUitvoer, uitvoerOpacity = 1, binnen = 1, consoleLabel }) => (
  <AbsoluteFill style={{ opacity: binnen, transform: `translateY(${(1 - binnen) * 40}px)` }}>
    <Ruw vorm={PANEEL} />
    {onderCode}
    <Regels raster={CODE} regels={code} kleur={C.GRAY} keywords />
    {bovenCode}
    <ConsolePaneel vak={CONSOLE_VAK} label={consoleLabel} />
    <AbsoluteFill style={{ opacity: uitvoerOpacity }}>
      <Regels raster={UIT} regels={uitvoer} kleur={C.CONSOLE_TEKST} gewicht={500} />
      {bovenUitvoer}
    </AbsoluteFill>
  </AbsoluteFill>
);

// Arcering zoals de accentvakjes in de Excalidraw-figuren.
const ARCERING = {
  fill: C.RED_LIGHT,
  fillStyle: "hachure",
  hachureGap: 9,
  fillWeight: 2.5,
  stroke: C.RED,
  strokeWidth: 2.4,
};

/** Markeerstift achter `n` tekens code vanaf kolom `kol`. Leg ze in `onderCode`, dan overlapt ze nooit. */
export const markeer = (rij: number, kol: number, n: number, seed: number) =>
  rechthoek(kolomX(CODE, kol) - 5, rijY(CODE, rij) + 9, n * tekenBreedte(CODE) + 10, CODE.hoogte - 18, {
    fill: C.RED_LIGHT,
    fillStyle: "solid",
    stroke: "none",
    roughness: 1.2,
    seed,
  });

/** Gearceerde strook over de eerste `kolommen` kolommen van de code (bv. inspringing). */
export const codeStrook = (vanRij: number, rijen: number, kolommen: number, seed: number) =>
  rechthoek(CODE.x - 10, rijY(CODE, vanRij) + 8, kolommen * tekenBreedte(CODE) - 16, rijen * CODE.hoogte - 16, {
    ...ARCERING,
    seed,
  });

/** Gearceerde strook over de eerste `kolommen` kolommen van de uitvoer. */
export const uitvoerStrook = (vanRij: number, rijen: number, kolommen: number, seed: number) =>
  rechthoek(UIT.x - 8, rijY(UIT, vanRij) + 4, kolommen * tekenBreedte(UIT) - 10, rijen * UIT.hoogte - 8, {
    ...ARCERING,
    seed,
  });

/**
 * Verticale knip-lijn links van kolom `kol`, van onder rij `totRij` tot boven rij `vanRij`.
 * Ze staat 8 px voor de kolom, zodat ze ook met de ruwe uitwijking de tekens niet raakt.
 */
export const knip = (kol: number, vanRij: number, totRij: number, seed: number) =>
  lijn(kolomX(CODE, kol) - 8, rijY(CODE, totRij + 1) - 4, kolomX(CODE, kol) - 8, rijY(CODE, vanRij) + 2, {
    stroke: C.RED,
    strokeWidth: 3.5,
    roughness: 1.1,
    seed,
  });
