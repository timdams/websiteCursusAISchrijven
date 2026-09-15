import { loadFont as laadInter } from "@remotion/google-fonts/Inter";
import { loadFont as laadMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as laadKalam } from "@remotion/google-fonts/Kalam";

// Kalam voor alles wat handgeschreven is, zoals de ondertitels en de figuren van de site. Inter
// staat in voor de gewone letters van de site (system-ui), JetBrains Mono voor code.
export const HAND = laadKalam("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
}).fontFamily;

export const MONO = laadMono("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
}).fontFamily;

export const SANS = laadInter("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
}).fontFamily;

// JetBrains Mono heeft een vaste tekenbreedte van 600/1000 em, in elk gewicht.
export const MONO_BREEDTE = 0.6;

/**
 * Geschatte breedte van een tekst in Kalam (vet), in pixels. Aan de ruime kant: hoofdletters zijn
 * breder dan kleine letters, spaties smaller. Kalam is breder dan Caveat.
 */
export const handBreedte = (tekst: string, grootte: number) => {
  let em = 0;
  for (const teken of tekst) {
    em += teken === " " ? 0.3 : teken !== teken.toLowerCase() ? 0.66 : 0.5;
  }
  return em * grootte;
};
