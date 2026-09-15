import React from "react";
import { Img, staticFile } from "remotion";
import { PROJECT } from "./project";

/** De verteller uit PROJECT.verteller (een afbeelding in public/). Zonder verteller toont dit niets. */
export const Verteller: React.FC<{ x: number; y: number; hoogte: number; opacity?: number }> = ({
  x,
  y,
  hoogte,
  opacity = 1,
}) =>
  PROJECT.verteller === null ? null : (
    <Img
      src={staticFile(PROJECT.verteller)}
      style={{
        position: "absolute",
        left: x,
        top: y,
        height: hoogte,
        width: "auto",
        imageRendering: PROJECT.pixelart ? "pixelated" : "auto",
        opacity,
      }}
    />
  );
