import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { homeNotes, profile, socialLinks, stackGroups } from "../../data/profile";

function Home2() {
  return (
    <section className="home-about-section" id="about-preview">
      <div className="section-shell personal-section">
        <div className="personal-section__header">
          <div>
            <span className="eyebrow">Focus</span>
            <h2>Data systems that are easier to operate and reason about.</h2>
          </div>
          <ul className="current-list">
            {profile.now.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="personal-grid">
          {homeNotes.map((item) => (
            <article className="personal-note" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="stack-strip" aria-label="Current stack">
          {stackGroups.map((group) => (
            <div className="stack-strip__group" key={group.title}>
              <span>{group.title}</span>
              <p>{group.items.join(" / ")}</p>
            </div>
          ))}
        </div>

        <div className="portfolio-links">
          <Link to="/about">
            About <FiArrowRight />
          </Link>
          <Link to="/project">
            Projects <FiArrowRight />
          </Link>
          <Link to="/resume">
            Resume <FiArrowRight />
          </Link>
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                <Icon /> {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Home2;
