import React from "react";
import { FiExternalLink } from "react-icons/fi";
import LiquidGlassSurface from "../Glass/LiquidGlassSurface";

function ProjectCards({ imgPath, title, eyebrow, description, link, impact, tags = [] }) {
  return (
    <article className="project-card-view">
      <LiquidGlassSurface className="project-card-view__media-glass" radius={18} blur={0.32} displacement={1.15}>
        <div className="project-card-view__media">
          <img src={imgPath} alt="" loading="lazy" />
          {impact && <span>{impact}</span>}
        </div>
      </LiquidGlassSurface>
      <div className="project-card-view__body">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="tag-row">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <a className="button button--ghost" href={link} target="_blank" rel="noreferrer">
          View project <FiExternalLink />
        </a>
      </div>
    </article>
  );
}

export default ProjectCards;
