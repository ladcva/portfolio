import React from "react";
import ProjectCard from "./ProjectCards";
import projects from "../../data/projects";

function Projects() {
  return (
    <main className="page-section project-section">
      <div className="section-shell">
        <div className="section-heading">
          <span className="eyebrow">Selected work</span>
          <h1>Projects that connect platforms, research, and business outcomes.</h1>
          <p>
            A tighter snapshot of the work that best represents my current direction.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} imgPath={project.image} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Projects;
