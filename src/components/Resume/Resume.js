import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import Resumecontent from "./ResumeContent";
import axios from "axios";
import pdf from "../../Assets/Le-Anh-Duc_CV_August_2022.pdf";
import { AiOutlineDownload } from "react-icons/ai";

function Resume() {
  const uri = "https://porfolio-backend.vercel.app/ranks/getRanks";
  const [spojRank, upadteSpojRank] = useState(0);
  const [hackerrank, upadteHackerank] = useState(0);
  const [sem, upadateSem] = useState(0);
  const [cgpa, upadteCgpa] = useState(0);

  useEffect(() => {
    axios
      .get(uri)
      .then((res) => {
        upadteSpojRank(res.data.message[0].spojRank);
        upadteHackerank(res.data.message[1].hackerrank);
        upadteCgpa(res.data.message[2].cgpa);
        upadateSem(res.data.message[3].sem);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container fluid className="resume-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button variant="primary" href={pdf} target="_blank">
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>
        <Row className="resume">
          <Col md={6} className="resume-left">
            <h3 className="resume-title">Experience</h3>
            <Resumecontent
              title="Principal Research Scientist - Vietnam National University, Hanoi"
              date="Jan 2022 - Present"
              content={[
                "Wrote research papers, reports and summaries regarding to project: Investigation in Non-invasive Type 2 Diabetes Mellitus diagnosis using Raman spectroscopy in combination with Machine Learning.",
                "Used Python and MATLAB to determine data correlations, implementing digital signal processing methods while initiating qualitative and quantitative analysis.",
                "Designed and executed ML experiments, hyperparameter fine-tuning strategies and documented findings.",
              ]}
            />
            <Resumecontent
              title="Data Engineer Intern - FPT Software"
              date="Jul 2021 - Dec 2021"
              content={[
                "Developed, implemented and maintained data analytics protocols, standards and documentation.",
                "Designed and implemented data warehouse solution and BI analytic dashboard for internal HR and Project monitoring effort.",
                "Collaborated on ETL tasks using Databricks and Azure cloud services.",
                "Established data pipelines, CI/CD and document templates for general-use purposes.",
                "Contributed guidelines to monthly seminars: Software containerization with Docker and utilization of Hadoop, Spark, etc.",
              ]}
            />
            <Resumecontent
              title="Software Engineer Intern - Revotech"
              date="Apr 2020 - Sep 2020"
              content={[
                "Modified HTML, CSS, and Javascript web pages to optimize performance and functionality.",
                "Initialized and made comparison between VueJS, ReactJS and Laravel frameworks for front-end development template.",
                "Setup and configured Tomcat, Nginx HTTP server for on-prem Java back-end services.",
                "Prepared and submitted reports and other documentation to assist development team members.",
              ]}
            />
            
            <h3 className="resume-title">Extracurricular Activities</h3>
            <Resumecontent
              title="ISTECH - FPT Software Hoa Lac Visit"
              content={[
                "I was the event coordinator of FPT Software Hoa Lac Visit Tour in 2020 with the participation of more than 110 participants.",
              ]}
            />
            <Resumecontent
              title="ISTECH - Big Data / AI / Machine Learning Tech Talk"
              content={[
                "Coordinator of the event in 2021 with 170 participants, invited representatives from Microsoft, Lenovo, Intel.",
              ]}
            />
            <Resumecontent
              title="GDSC VNU - Cloud Study Jam 2021"
              content={[
                "Coordinator of the event in 2021 with more than 1100 participants, providing study content of Google Cloud seasonal campaign.",
              ]}
            />
            <Resumecontent
              title="Developh Vietnam - Unicode 2020"
              content={[
                "Speaker in AI panel discussion, representing student role.",
              ]}
            />
          </Col>
          <Col md={6} className="resume-right">
            <h3 className="resume-title">Education</h3>
            <Resumecontent
              title="Vietnam National University, Hanoi - International School"
              date="2018 - 2022"
              content={[
                "Bachelor of Informatics and Computer Engineering",
                "Grade: Distinction - 3.31 (Top 3 in first graduates)",
                "Received Scholarship for excellent students",
                "Head of Academic & Scientific Research division of The Youth Union",
                "Awarded 'Student of 5 merits'"]}
            />

            <h3 className="resume-title">Publications</h3>
            <Resumecontent
              title=""
              content={[
                "'Use of Raman spectroscopy to diagnose diabetes with SVM', 11th EAI International Conference on Context-Aware Systems and Applications, 2022.",
                "Disaster Tweets Classification using BERT-Based Language Model (Preprint)",
                "'Non-invasive in vivo Type 2 Diabetes Mellitus diagnosis using Raman spectroscopy in combination with Machine Learning' (ISI Q1, Q2 Pending)"
              ]}
            />
            
            <h3 className="resume-title">Certificates</h3>
            <Resumecontent
              title=""
              content={[
                "First Prize and Potential Research Prize in The 13th Student Scientific Research Conference, VNU-IS (2021)",
                "First Prize in Temasek Foundation Specialists' Community Action and Leadership Exchange Programme (2021)",
                "Developer Circles Innovation Challenge by Facebook and CoderSchool - Batch 2 of Data Science track (09/2020 - 11/2020)",
                "C1 and B2 Level of English Proficiency - CEFR (2018)",
                "Google Project Management Professional Certificate (2021)",
                "Google Data Analytics Professional Certificate (2021)",
                "Agile Learn Certificates (2021)",
                "Algorithmic Toolbox (2021)",
                "Business Transformation with Google Cloud (2021)",
                "Introduction to Digital Transformation with Google Cloud (2021)",
                "Introduction to TensorFlow for Artificial Intelligence, Machine Learning, and Deep Learning (2021)",
                "Second Prize of National Excellent Student Exam in Informatics and Mathematics (2014)",
              ]}
            />

            <h3 className="resume-title">Interests</h3>
            <Resumecontent
              title=""
              content={[
                `Software Design`,
                `Machine Learning`,
                "Deep Learning",
                "Data Governance",
                "Data Engineering",
                "Data Analytics",
                "Natural Language Processing",
                "Cloud Infrastructures",
                "Enterprise Data Management",
              ]}
            />
          </Col>
        </Row>
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button variant="primary" href={pdf} target="_blank">
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>
      </Container>
    </Container>
  );
}

export default Resume;
