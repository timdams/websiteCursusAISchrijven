import React from "react";

/**
 * Zet inhoud met lokale coördinaten rond (0, 0) op een plek op het canvas, eventueel gedraaid of
 * geschaald. Handig voor een wiel, een kaartje dat vliegt of een brokstuk.
 */
export const Op: React.FC<{
  x: number;
  y: number;
  hoek?: number;
  schaal?: number;
  opacity?: number;
  children: React.ReactNode;
}> = ({ x, y, hoek = 0, schaal = 1, opacity = 1, children }) =>
  opacity <= 0 ? null : (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `rotate(${hoek}deg) scale(${schaal})`,
        transformOrigin: "0 0",
        opacity: Math.min(1, opacity),
      }}
    >
      {children}
    </div>
  );
