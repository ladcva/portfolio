import React from "react";
import { LiquidGlass } from "@liquidglass/react";

function LiquidGlassSurface({
  children,
  className = "",
  radius = 24,
  blur = 0.42,
  displacement = 1.7,
  elasticity = 0.72,
}) {
  return (
    <LiquidGlass
      borderRadius={radius}
      blur={blur}
      contrast={1.16}
      brightness={1.08}
      saturation={1.22}
      shadowIntensity={0.22}
      displacementScale={displacement}
      elasticity={elasticity}
      zIndex={0}
      className={`liquid-glass-lib ${className}`}
    >
      {children}
    </LiquidGlass>
  );
}

export default LiquidGlassSurface;
