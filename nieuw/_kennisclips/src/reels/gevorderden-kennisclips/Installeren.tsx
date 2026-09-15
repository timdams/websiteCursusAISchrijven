import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BEWEEG, venster, voortgang } from "../../stijl/anim";
import { HAND, SANS } from "../../stijl/fonts";
import { Kaart } from "../../stijl/kaart";
import { C } from "../../stijl/kleuren";
import { Ruw, rechthoek, veelhoek } from "../../stijl/ruw";
import { FASE } from "./tijdlijn";

// De waarschuwing uit het recept: de eerste keer installeert Claude programma's, en op een
// schoollaptop vraag je dat best eerst na bij je ICT-dienst.
const SCHERM = rechthoek(170, 680, 740, 480, { fill: C.WHITE, fillStyle: "solid", strokeWidth: 3, seed: 2600 });
const VOET = veelhoek(
  [
    [110, 1178],
    [970, 1178],
    [1030, 1250],
    [50, 1250],
  ],
  { fill: C.WHITE, fillStyle: "solid", strokeWidth: 3, seed: 2601 },
);
const BALK = rechthoek(250, 920, 580, 84, { strokeWidth: 2.8, seed: 2602 });
const VULLING = rechthoek(254, 924, 572, 76, {
  fill: C.RED_LIGHT,
  fillStyle: "hachure",
  hachureGap: 9,
  fillWeight: 3,
  stroke: "none",
  seed: 2603,
});
// De waarschuwingskleur van de callouts op de site ($callout-color-warning).
const GEEL = "#8a6a00";

export const Installeren: React.FC = () => {
  const f = useCurrentFrame();
  const I = FASE.installeren;
  const zicht = venster(f, I, FASE.nakijken, 15);
  if (zicht <= 0) return null;
  const vol = voortgang(f, I + 20, 110, BEWEEG);
  return (
    <AbsoluteFill style={{ opacity: zicht }}>
      <Ruw vorm={SCHERM} />
      <Ruw vorm={VOET} />
      <div
        style={{
          position: "absolute",
          left: 170,
          width: 740,
          top: 770,
          textAlign: "center",
          fontFamily: HAND,
          fontSize: 64,
          fontWeight: 700,
          color: C.GRAY,
        }}
      >
        tools installeren
      </div>
      <Ruw vorm={VULLING} toon={vol} />
      <Ruw vorm={BALK} />
      <div
        style={{
          position: "absolute",
          left: 170,
          width: 740,
          top: 1040,
          textAlign: "center",
          fontFamily: HAND,
          fontSize: 56,
          fontWeight: 700,
          color: C.RED,
          opacity: voortgang(f, I + 132, 10),
        }}
      >
        één keer
      </div>
      <Kaart
        vak={{ x: 80, y: 1296, w: 920, h: 170 }}
        rand={GEEL}
        achtergrond="#fffdf4"
        opacity={voortgang(f, I + 50, 14)}
      >
        <div
          style={{
            position: "absolute",
            left: 40,
            top: 26,
            width: 840,
            fontFamily: SANS,
            fontSize: 42,
            lineHeight: 1.4,
            color: C.GRAY,
          }}
        >
          Schoollaptop? Vraag het eerst na bij je <b style={{ color: GEEL }}>ICT-dienst</b>.
        </div>
      </Kaart>
    </AbsoluteFill>
  );
};
