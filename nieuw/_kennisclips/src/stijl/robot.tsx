import React from "react";
import { Img, staticFile } from "remotion";

// De robots komen uit slides/assets/titel.png, de titelprent van de site. Ze zijn uitgeknipt met
// een doorzichtige achtergrond en staan in public/: robot-zwaait.png, robot-zwaait-buste.png (de
// verteller) en robot-papier.png.

/** Een robot met zijn linkerbovenhoek op (x, y). Draait en schaalt rond het midden van zijn voeten. */
export const Robot: React.FC<{
  src: string;
  x: number;
  y: number;
  hoogte: number;
  hoek?: number;
  schaal?: number;
  opacity?: number;
}> = ({ src, x, y, hoogte, hoek = 0, schaal = 1, opacity = 1 }) =>
  opacity <= 0 ? null : (
    <Img
      src={staticFile(src)}
      style={{
        position: "absolute",
        left: x,
        top: y,
        height: hoogte,
        width: "auto",
        transform: `rotate(${hoek}deg) scale(${schaal})`,
        transformOrigin: "50% 100%",
        opacity: Math.min(1, opacity),
      }}
    />
  );
