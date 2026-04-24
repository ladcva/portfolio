import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      className="button button--icon theme-toggle-btn"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <FiSun /> : <FiMoon />}
    </button>
  );
}

export default ThemeToggle;
