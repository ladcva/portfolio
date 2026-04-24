import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Senior Data Engineer",
          "Cloud Data Platforms",
          "Lakehouse Systems",
          "Applied AI Research",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 35,
        delay: 45,
      }}
    />
  );
}

export default Type;
