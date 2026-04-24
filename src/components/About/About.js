import React from "react";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import Toolstack from "./Toolstack";

const experienceNotes = [
  "Data engineering work across ETL/ELT, CDC, backfills, lakehouse architecture, and workflow orchestration.",
  "Production stack: AWS, Databricks, Spark, Airflow, Kafka, Terraform, Docker, Jenkins, Python, Scala, Java, SQL.",
  "Research focus: AI in healthcare, Raman spectroscopy, machine learning, and signal processing.",
];

function About() {
  return (
    <main className="page-section about-section">
      <div className="section-shell">
        <div className="section-heading section-heading--left">
          <span className="eyebrow">About</span>
          <h1>Senior data engineer with an applied AI research background.</h1>
        </div>

        <div className="about-bento">
          <Aboutcard />
          {experienceNotes.map((note, index) => (
            <div className="bento-note liquid-glass" key={note}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{note}</p>
            </div>
          ))}
        </div>

        <section className="stack-section">
          <div className="section-heading">
            <span className="eyebrow">Stack</span>
            <h2>Tools I use to move from idea to production.</h2>
          </div>
          <Techstack />
          <Toolstack />
        </section>

        <Github />
      </div>
    </main>
  );
}

export default About;
