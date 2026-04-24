import React from "react";
import {
  SiLinux,
  SiJupyter,
  SiPostman,
} from "react-icons/si";
import { FaDocker } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

const tools = [
  { label: "Linux", icon: <SiLinux /> },
  { label: "VS Code", icon: <VscVscode /> },
  { label: "Jupyter", icon: <SiJupyter /> },
  { label: "Postman", icon: <SiPostman /> },
  { label: "Docker", icon: <FaDocker /> },
];

function Toolstack() {
  return (
    <div className="stack-grid stack-grid--compact">
      {tools.map((tool) => (
        <div className="tech-icons" key={tool.label}>
          {tool.icon}
          <span>{tool.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Toolstack;
