import React from "react";
import {
  DiReact,
  DiPython,
  DiGit,
  DiGoogleCloudPlatform
} from "react-icons/di";
import { 
  SiKeras, 
  SiTensorflow, 
  SiFirebase,
} from "react-icons/si";
import { TbBrandAzure } from "react-icons/tb";
import { FaAws } from "react-icons/fa";
import { GrMysql } from "react-icons/gr";

const technologies = [
  { label: "AWS", icon: <FaAws /> },
  { label: "Google Cloud", icon: <DiGoogleCloudPlatform /> },
  { label: "Microsoft Azure", icon: <TbBrandAzure /> },
  { label: "React", icon: <DiReact /> },
  { label: "MySQL", icon: <GrMysql /> },
  { label: "Python", icon: <DiPython /> },
  { label: "Keras", icon: <SiKeras /> },
  { label: "TensorFlow", icon: <SiTensorflow /> },
  { label: "Git", icon: <DiGit /> },
  { label: "Firebase", icon: <SiFirebase /> },
];

function Techstack() {
  return (
    <div className="stack-grid">
      {technologies.map((tool) => (
        <div className="tech-icons" key={tool.label}>
          {tool.icon}
          <span>{tool.label}</span>
        </div>
      ))}
    </div>
  );
}

export default Techstack;
