import React from "react";
import GitHubCalendar from "react-github-calendar";

function Github() {
  const colourTheme = {
    light: ["#e2e8f0", "#99f6e4", "#2dd4bf", "#0f766e", "#134e4a"],
    dark: ["#1f2937", "#99f6e4", "#2dd4bf", "#0f766e", "#134e4a"],
  };

  return (
    <section className="github-panel">
      <div className="section-heading">
        <span className="eyebrow">Open source</span>
        <h2>Days I code</h2>
      </div>
      <GitHubCalendar
        username="ladcva"
        blockSize={15}
        blockMargin={5}
        theme={colourTheme}
        fontSize={16}
      />
    </section>
  );
}

export default Github;
