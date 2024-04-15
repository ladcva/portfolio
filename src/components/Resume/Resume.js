import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import Resumecontent from "./ResumeContent";
// import axios from "axios";
import pdf from "../../Assets/Le-Anh-Duc_CV_August_2022.pdf";
import pdf2 from "../../Assets/Coursera QWHPXH688QXT.pdf";

import { AiOutlineDownload } from "react-icons/ai";

function Resume() {
  // const uri = "https://porfolio-backend.vercel.app/ranks/getRanks";
  // const [spojRank, upadteSpojRank] = useState(0);
  // const [hackerrank, upadteHackerank] = useState(0);
  // const [sem, upadateSem] = useState(0);
  // const [cgpa, upadteCgpa] = useState(0);

  // useEffect(() => {
  //   axios
  //     .get(uri)
  //     .then((res) => {
  //       upadteSpojRank(res.data.message[0].spojRank);
  //       upadteHackerank(res.data.message[1].hackerrank);
  //       upadteCgpa(res.data.message[2].cgpa);
  //       upadateSem(res.data.message[3].sem);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <Container fluid className="resume-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", position: "relative" }}>
        <Button variant="primary" href={pdf} target="_blank" style={{ maxWidth: "250px" }}>
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
          
        </Row>
        <Row style={{ justifyContent: "center", position: "relative" }}>
        <Button variant="primary" href={pdf2} target="_blank" style={{ maxWidth: "250px" }}>
            <AiOutlineDownload />
            &nbsp;Download Certificates
          </Button>
        </Row>
        <Row className="resume">
          <Col md={6} className="resume-left">
            <h3 className="resume-title">Experience</h3>
            <Resumecontent
              title="Data Engineer - Techcombank, Data & Analytics Division"
              date="Nov 2022 - Present"
              content={[
                "Led squads of external engineers in the agile delivery of business enablement data products for strategic initiatives and BAUs within the bank.",
                "Worked directly with stakeholders to identify business problems, proactively develop solutions, and manage the execution, deployment and operation of critical features that serving >10M users of Retail and Lending biz line.",
                "Contributed to the design of the solution architecture for On-cloud Data Lake (AWS), assuring its efficacy and scalability.",
                "Implemented improvements and conducted performance tuning to improve the efficiency while reducing cost of data pipelines."
              ]}
            />
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
                "Duc, L. A., & Tung, N. T. (2022, October). Use of Raman Spectroscopy to Diagnose Diabetes with SVM. In International Conference on Nature of Computation and Communication (pp. 79-87). Cham: Springer Nature Switzerland.",
                "Disaster Tweets Classification using BERT-Based Language Model (2021, Preprint)",
                "Duc, L. A., Tung, N. T., Oanh, T. T., Tri, N. Q., & Linh, N. T. (2023). Non-Invasive In Vivo Type 2 Diabetes Mellitus Diagnosis Using Raman Spectroscopy in Combination with Machine Learning. Mobile Networks and Applications, Springer. 1-13.",
                "Classification of glucose-level in deionized water using machine learning models and data pre-processing technique (2023, Preprint)"
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
        <Button variant="primary" href={pdf} target="_blank" style={{ maxWidth: "250px" }}>
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>
      </Container>
    </Container>
  );
}

export default Resume;
