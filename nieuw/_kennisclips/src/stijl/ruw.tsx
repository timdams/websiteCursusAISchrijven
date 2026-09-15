import React from "react";
import rough from "roughjs";
import type { Drawable, Options, PathInfo } from "roughjs/bin/core";
import { C } from "./kleuren";

const gen = rough.generator();

export type Vak = { x: number; y: number; w: number; h: number };
export type Vorm = { drawables: Drawable[]; vak: Vak };
type Punt = [number, number];

// Zelfde uitgangspunten als excal.js. De vaste seed zorgt ervoor dat een vorm in elk
// frame exact dezelfde krabbel is; zonder seed tekent rough.js elk frame opnieuw en trilt alles.
const BASIS: Options = {
  stroke: C.GRAY,
  strokeWidth: 2.2,
  roughness: 1.5,
  bowing: 1,
  seed: 7,
};

const omhul = (punten: Punt[]): Vak => {
  const xs = punten.map((p) => p[0]);
  const ys = punten.map((p) => p[1]);
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y };
};

export const rechthoek = (
  x: number,
  y: number,
  w: number,
  h: number,
  o: Options = {},
): Vorm => ({
  drawables: [gen.rectangle(x, y, w, h, { ...BASIS, ...o })],
  vak: { x, y, w, h },
});

export const lijn = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  o: Options = {},
): Vorm => ({
  drawables: [gen.line(x1, y1, x2, y2, { ...BASIS, ...o })],
  vak: omhul([
    [x1, y1],
    [x2, y2],
  ]),
});

export const pijl = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  o: Options = {},
  kop = 18,
): Vorm => {
  const hoek = Math.atan2(y2 - y1, x2 - x1);
  const a: Punt = [x2 - kop * Math.cos(hoek - 0.5), y2 - kop * Math.sin(hoek - 0.5)];
  const b: Punt = [x2 - kop * Math.cos(hoek + 0.5), y2 - kop * Math.sin(hoek + 0.5)];
  const opties = { ...BASIS, ...o };
  return {
    drawables: [
      gen.line(x1, y1, x2, y2, opties),
      gen.line(x2, y2, a[0], a[1], opties),
      gen.line(x2, y2, b[0], b[1], opties),
    ],
    vak: omhul([[x1, y1], [x2, y2], a, b]),
  };
};

export const cirkel = (cx: number, cy: number, diameter: number, o: Options = {}): Vorm => ({
  drawables: [gen.circle(cx, cy, diameter, { ...BASIS, ...o })],
  vak: { x: cx - diameter / 2, y: cy - diameter / 2, w: diameter, h: diameter },
});

export const ellips = (cx: number, cy: number, w: number, h: number, o: Options = {}): Vorm => ({
  drawables: [gen.ellipse(cx, cy, w, h, { ...BASIS, ...o })],
  vak: { x: cx - w / 2, y: cy - h / 2, w, h },
});

export const veelhoek = (punten: Punt[], o: Options = {}): Vorm => ({
  drawables: [gen.polygon(punten, { ...BASIS, ...o })],
  vak: omhul(punten),
});

/** Een SVG-pad (bv. golfjes met Q en T). Het vak moet je zelf opgeven. */
export const pad = (d: string, vak: Vak, o: Options = {}): Vorm => ({
  drawables: [gen.path(d, { ...BASIS, ...o })],
  vak,
});

/** Meerdere vormen als één vorm, zodat ze samen onthuld of verplaatst worden. */
export const samen = (...vormen: Vorm[]): Vorm => {
  const hoeken: Punt[] = [];
  vormen.forEach((v) => {
    hoeken.push([v.vak.x, v.vak.y], [v.vak.x + v.vak.w, v.vak.y + v.vak.h]);
  });
  return {
    drawables: vormen.reduce<Drawable[]>((alle, v) => alle.concat(v.drawables), []),
    vak: omhul(hoeken),
  };
};

export type Richting = "vanLinks" | "vanRechts" | "vanOnder" | "vanBoven";

const MARGE = 24;

const knipRand = (richting: Richting, rest: string) => {
  switch (richting) {
    case "vanLinks":
      return `inset(0 ${rest} 0 0)`;
    case "vanRechts":
      return `inset(0 0 0 ${rest})`;
    case "vanOnder":
      return `inset(${rest} 0 0 0)`;
    case "vanBoven":
      return `inset(0 0 ${rest} 0)`;
  }
};

/**
 * Tekent een rough.js-vorm. `toon` (0..1) onthult de vorm in de gekozen richting,
 * zodat een lijn of arcering zichzelf lijkt te tekenen.
 */
export const Ruw: React.FC<{
  vorm: Vorm;
  toon?: number;
  richting?: Richting;
  streep?: string;
  opacity?: number;
  schaal?: number;
}> = ({ vorm, toon = 1, richting = "vanLinks", streep, opacity = 1, schaal = 1 }) => {
  if (toon <= 0 || opacity <= 0) return null;
  const { x, y, w, h } = vorm.vak;
  const rest = `${(1 - Math.min(1, toon)) * 100}%`;
  const paden = vorm.drawables.reduce<PathInfo[]>(
    (alle, d) => alle.concat(gen.toPaths(d)),
    [],
  );
  return (
    <svg
      viewBox={`${x - MARGE} ${y - MARGE} ${w + 2 * MARGE} ${h + 2 * MARGE}`}
      style={{
        position: "absolute",
        left: x - MARGE,
        top: y - MARGE,
        width: w + 2 * MARGE,
        height: h + 2 * MARGE,
        overflow: "visible",
        clipPath: knipRand(richting, rest),
        opacity: Math.min(1, opacity),
        transform: `scale(${schaal})`,
        transformOrigin: "50% 50%",
      }}
    >
      {paden.map((p, i) => (
        <path
          key={i}
          d={p.d}
          stroke={p.stroke}
          strokeWidth={p.strokeWidth}
          fill={p.fill ?? "none"}
          strokeDasharray={streep}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
};
