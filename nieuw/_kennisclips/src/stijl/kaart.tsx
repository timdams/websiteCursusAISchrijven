import React from "react";
import { HAND, SANS } from "./fonts";
import { C } from "./kleuren";
import type { Vak } from "./ruw";

// De bouwstenen van de site (nieuw/theme.scss), op reelformaat: een wit kaartje met afgeronde hoeken
// en een zachte schaduw, een pil zoals de tabs van de tools, en het mapje van ::: {.mapje}.
// Alles wat in een kaartje staat, is absoluut geplaatst ten opzichte van het kaartje.

/** Een kaartje. `rand` geeft een dikke gekleurde rand links, zoals bij de prompts en Kijk na. */
export const Kaart: React.FC<{
  vak: Vak;
  rand?: string;
  achtergrond?: string;
  opacity?: number;
  schaal?: number;
  children?: React.ReactNode;
}> = ({ vak, rand, achtergrond = C.WHITE, opacity = 1, schaal = 1, children }) =>
  opacity <= 0 ? null : (
    <div
      style={{
        position: "absolute",
        left: vak.x,
        top: vak.y,
        width: vak.w,
        height: vak.h,
        boxSizing: "border-box",
        background: achtergrond,
        border: `2px solid ${C.LIJN}`,
        borderLeft: rand ? `12px solid ${rand}` : `2px solid ${C.LIJN}`,
        borderRadius: 32,
        boxShadow: "0 4px 10px rgba(0,0,0,.05), 0 30px 70px rgba(0,0,0,.09)",
        opacity: Math.min(1, opacity),
        transform: `scale(${schaal})`,
      }}
    >
      {children}
    </div>
  );

/** Een pil, zoals de keuze van je tool op de site. */
export const Pil: React.FC<{ tekst: string; x: number; y: number; grootte?: number; opacity?: number; schaal?: number }> = ({
  tekst,
  x,
  y,
  grootte = 34,
  opacity = 1,
  schaal = 1,
}) =>
  opacity <= 0 ? null : (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        padding: "0.25em 0.9em",
        borderRadius: 999,
        background: C.RED,
        color: C.WHITE,
        fontFamily: SANS,
        fontSize: grootte,
        fontWeight: 700,
        lineHeight: 1.2,
        whiteSpace: "nowrap",
        opacity: Math.min(1, opacity),
        transform: `scale(${schaal})`,
        transformOrigin: "0 50%",
      }}
    >
      {tekst}
    </div>
  );

/** Het getekende mapje uit .mapje::before: een rode rand, bovenaan dikker. */
export const MapIcoon: React.FC<{ grootte?: number }> = ({ grootte = 40 }) => (
  <span
    style={{
      display: "inline-block",
      flex: "none",
      width: grootte * 1.15,
      height: grootte * 0.85,
      boxSizing: "border-box",
      border: `${Math.round(grootte / 10)}px solid ${C.RED}`,
      borderTopWidth: Math.round(grootte / 5),
      borderRadius: grootte / 8,
    }}
  />
);

/** Een blad papier, voor een bestand. */
export const BestandIcoon: React.FC<{ grootte?: number }> = ({ grootte = 40 }) => (
  <span
    style={{
      display: "inline-block",
      flex: "none",
      width: grootte * 0.75,
      height: grootte * 0.95,
      margin: `0 ${grootte * 0.2}px`,
      boxSizing: "border-box",
      border: `${Math.round(grootte / 13)}px solid ${C.GRAY_STIL}`,
      borderRadius: grootte / 12,
    }}
  />
);

/** Het handgeschreven labeltje boven een prompt: "Kopieer en pas aan". */
export const KaartLabel: React.FC<{ tekst: string; x: number; y: number; grootte?: number }> = ({
  tekst,
  x,
  y,
  grootte = 42,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      fontFamily: HAND,
      fontSize: grootte,
      fontWeight: 400,
      lineHeight: 1.2,
      color: C.RED_DARK,
      whiteSpace: "nowrap",
    }}
  >
    {tekst}
  </div>
);
