import React from "react";
import { Link } from "react-router-dom";
import { FiDownload, FiGithub, FiMail, FiMapPin } from "react-icons/fi";
import FloatingGeometry from "../Scene/FloatingGeometry";
import LiquidGlassSurface from "../Glass/LiquidGlassSurface";
import Home2 from "./Home2";
import Type from "./Type";
import avatar from "../../Assets/avatar.svg";
import { profile } from "../../data/profile";

const resumePdf = "/LeAnhDuc_CV_Sep_2025_2.pdf";

function ProfilePanel() {
  return (
    <aside className="profile-panel" aria-label="Profile summary">
      <div className="profile-panel__top">
        <img src={avatar} alt="Le Anh Duc avatar" />
        <div>
          <strong>{profile.name}</strong>
          <span>
            <FiMapPin />
            {profile.location}
          </span>
        </div>
      </div>
      <ul className="profile-panel__facts">
        {profile.facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
      <div className="profile-panel__links">
        <a href="https://github.com/ladcva" target="_blank" rel="noreferrer">
          <FiGithub /> GitHub
        </a>
        <a href="mailto:me@anhducle.com">
          <FiMail /> Email
        </a>
      </div>
      <div className="profile-panel__scene">
        <FloatingGeometry />
      </div>
    </aside>
  );
}

function Home() {
  return (
    <main>
      <section className="hero-section" id="home">
        <div className="hero-section__content portfolio-hero">
          <div className="portfolio-hero__intro">
            <span className="eyebrow">Personal portfolio</span>
            <h1>{profile.name}</h1>
            <p className="portfolio-hero__headline">{profile.headline}</p>
            <div className="hero-type">
              <Type />
            </div>
            <p>{profile.intro}</p>
            <div className="hero-actions">
              <Link className="button button--primary" to="/project">Selected work</Link>
              <Link className="button button--ghost" to="/blog">Notebook</Link>
              <a className="button button--ghost" href={resumePdf} target="_blank" rel="noreferrer">
                Resume <FiDownload />
              </a>
            </div>
          </div>

          <LiquidGlassSurface className="profile-panel-glass" radius={28} blur={0.36} displacement={2.2} elasticity={0.82}>
            <ProfilePanel />
          </LiquidGlassSurface>
        </div>
      </section>
      <Home2 />
    </main>
  );
}

export default Home;
