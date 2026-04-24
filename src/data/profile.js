import {
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaLinkedinIn
} from "react-icons/fa";

export const profile = {
  name: "Le Anh Duc",
  location: "Hanoi, Vietnam",
  headline: "Senior Data Engineer focused on cloud data platforms, lakehouse systems, and applied AI research.",
  intro:
    "I design and maintain data pipelines, lakehouse systems, and research workflows. This site keeps my CV, selected work, publications, and technical notes in one place.",
  facts: [
    "Senior Data Engineer, Techcombank",
    "PhD candidate, AI in healthcare",
    "AWS · Databricks · Spark · Airflow · Python · Scala · SQL",
  ],
  now: [
    "ETL/ELT, CDC, backfills, and data lake ingestion across mixed infrastructure.",
    "AWS Data Lake and Databricks Lakehouse work for batch, streaming, and near real-time data.",
    "Research notes on machine learning, spectroscopy, and healthcare AI.",
  ],
};

export const socialLinks = [
  { href: "https://github.com/ladcva", label: "GitHub", icon: FaGithub },
  { href: "https://facebook.com/ladcva", label: "Facebook", icon: FaFacebook },
  { href: "https://www.linkedin.com/in/ladcva/", label: "LinkedIn", icon: FaLinkedinIn },
  { href: "https://www.instagram.com/ladpdp/", label: "Instagram", icon: FaInstagram },
];

export const homeNotes = [
  {
    title: "Platform work",
    text: "Data ingestion, lakehouse architecture, Spark optimization, workflow orchestration, and operational reliability.",
  },
  {
    title: "Research work",
    text: "AI in healthcare, Raman spectroscopy, glucose-level classification, signal processing, and reproducible experiments.",
  },
  {
    title: "Notebook",
    text: "Markdown, LaTeX, plaintext notes, project documentation, reading notes, and technical essays.",
  },
];

export const stackGroups = [
  {
    title: "Data",
    items: ["Spark", "Airflow", "Kafka", "Databricks", "SQL"],
  },
  {
    title: "Cloud",
    items: ["AWS Glue", "S3", "Lambda", "Athena", "EKS"],
  },
  {
    title: "Build",
    items: ["Python", "Scala", "Java", "Terraform", "Docker"],
  },
];
