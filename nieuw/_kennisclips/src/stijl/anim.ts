import { Easing, interpolate } from "remotion";

type EasingFn = (t: number) => number;

// Binnenkomen: snel en zacht uitlopen. Verplaatsen: symmetrisch. Pop: klein overschot. Weg: versnellen.
export const IN: EasingFn = Easing.bezier(0.16, 1, 0.3, 1);
export const BEWEEG: EasingFn = Easing.bezier(0.45, 0, 0.55, 1);
export const POP: EasingFn = Easing.bezier(0.34, 1.56, 0.64, 1);
export const WEG: EasingFn = Easing.in(Easing.cubic);

/** Van 0 naar 1 tussen frame `start` en `start + duur`. */
export const voortgang = (
  frame: number,
  start: number,
  duur: number,
  easing: EasingFn = IN,
) =>
  interpolate(frame, [start, start + duur], [0, 1], {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Zichtbaar tussen `van` en `tot`, met een korte fade aan beide kanten. */
export const venster = (frame: number, van: number, tot: number, fade = 12) =>
  Math.min(
    voortgang(frame, van, fade),
    1 - voortgang(frame, tot - fade, fade, WEG),
  );

/** Typemachine. Altijd via slicing, nooit per letter met opacity. */
export const getypt = (
  tekst: string,
  frame: number,
  start: number,
  framesPerTeken = 2,
) =>
  tekst.slice(
    0,
    Math.max(0, Math.min(tekst.length, Math.floor((frame - start) / framesPerTeken))),
  );

/** Eerst `weg` tekens achteraan wissen, daarna `erbij` typen. */
export const herschrijf = (
  frame: number,
  start: number,
  basis: string,
  weg: number,
  erbij: string,
  framesPerTeken = 3,
) => {
  const k = Math.floor((frame - start) / framesPerTeken);
  if (k <= 0) return basis;
  if (k <= weg) return basis.slice(0, basis.length - k);
  return (
    basis.slice(0, basis.length - weg) +
    erbij.slice(0, Math.min(erbij.length, k - weg))
  );
};

export const bezig = (frame: number, start: number, eind: number) =>
  frame >= start && frame < eind;
