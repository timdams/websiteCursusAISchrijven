import React from "react";
import { HAND } from "../../stijl/fonts";
import { C } from "../../stijl/kleuren";
import { Op } from "../../stijl/op";
import { Ruw, cirkel, lijn, pad, rechthoek, veelhoek } from "../../stijl/ruw";

// Tekeningen die in meer dan één scène terugkomen. Seeds 2000 tot 2999 horen bij deze reel.

/** Een rood vinkje van 62 op 52, linksboven op (x, y). */
export const vinkje = (x: number, y: number, seed: number) =>
  pad(`M${x} ${y + 30} L${x + 22} ${y + 52} L${x + 62} ${y}`, { x, y, w: 62, h: 52 }, {
    stroke: C.RED,
    strokeWidth: 6,
    roughness: 1.1,
    seed,
  });

const STREEP = { strokeWidth: 4, roughness: 1.2 };
const MANNETJE = [
  cirkel(100, 50, 80, { ...STREEP, fill: C.WHITE, fillStyle: "solid", seed: 2120 }),
  lijn(100, 90, 100, 180, { ...STREEP, seed: 2121 }),
  lijn(100, 118, 38, 52, { ...STREEP, seed: 2122 }),
  lijn(100, 118, 162, 52, { ...STREEP, seed: 2123 }),
  lijn(100, 180, 55, 260, { ...STREEP, seed: 2124 }),
  lijn(100, 180, 145, 260, { ...STREEP, seed: 2125 }),
];

/** Een juichend mannetje van 200 op 260, linksboven op (0, 0). */
export const Mannetje: React.FC<{ toon?: number }> = ({ toon = 1 }) => (
  <>
    {MANNETJE.map((v, i) => (
      <Ruw key={i} vorm={v} toon={toon} richting="vanBoven" />
    ))}
  </>
);

const GSM = rechthoek(0, 0, 300, 560, { fill: C.WHITE, fillStyle: "solid", strokeWidth: 3, seed: 2100 });
const GSM_SCHERM = rechthoek(22, 62, 256, 410, { stroke: C.LIJN_HARD, strokeWidth: 2.4, seed: 2101 });
const GSM_KNOP = cirkel(150, 516, 36, { strokeWidth: 2.4, seed: 2102 });
const GSM_SPEAKER = lijn(120, 32, 180, 32, { strokeWidth: 3, seed: 2103 });
const AFSPELEN = veelhoek(
  [
    [112, 200],
    [112, 330],
    [218, 265],
  ],
  { fill: C.RED_LIGHT, fillStyle: "hachure", hachureGap: 8, fillWeight: 2, stroke: C.RED, strokeWidth: 3.5, seed: 2104 },
);

/** Een gsm van 300 op 560, linksboven op (0, 0), met een afspeelknop of het juichende mannetje. */
export const Gsm: React.FC<{ inhoud: "afspelen" | "hoera"; toon?: number }> = ({ inhoud, toon = 1 }) => (
  <>
    <Ruw vorm={GSM} />
    <Ruw vorm={GSM_SCHERM} />
    <Ruw vorm={GSM_SPEAKER} />
    <Ruw vorm={GSM_KNOP} />
    {inhoud === "afspelen" ? (
      <Ruw vorm={AFSPELEN} toon={toon} />
    ) : (
      <>
        <div
          style={{
            position: "absolute",
            left: 0,
            width: 300,
            top: 84,
            textAlign: "center",
            fontFamily: HAND,
            fontSize: 50,
            fontWeight: 700,
            color: C.RED,
            opacity: toon,
          }}
        >
          Hoera!
        </div>
        <Op x={75} y={190} schaal={0.75}>
          <Mannetje toon={toon} />
        </Op>
      </>
    )}
  </>
);
