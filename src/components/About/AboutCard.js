import React from "react";
import LiquidGlassSurface from "../Glass/LiquidGlassSurface";

function AboutCard() {
  return (
    <LiquidGlassSurface className="bento-main-glass" radius={28} blur={0.36} displacement={2.2}>
      <div className="about-card">
        <p>
          I am Le Anh Duc, a senior data engineer based in Hanoi. My day-to-day work
          is centered on data pipelines, cloud-native data platforms, and distributed
          processing systems.
        </p>
        <p>
          I am also pursuing a PhD in AI-driven healthcare applications, where my
          research uses machine learning and signal processing for spectroscopy-based
          diagnosis problems.
        </p>
      </div>
    </LiquidGlassSurface>
  );
}

export default AboutCard;
