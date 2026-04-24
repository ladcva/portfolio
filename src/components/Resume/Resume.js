import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Resumecontent from "./ResumeContent";
import certificatesPdf from "../../Assets/Coursera QWHPXH688QXT.pdf";
import { AiOutlineDownload } from "react-icons/ai";

const resumePdf = "/LeAnhDuc_CV_Sep_2025_2.pdf";

function Resume() {
  return (
    <Container fluid className="resume-section">
      <Container>
        <Row className="resume-actions">
          <a className="button button--primary" href={resumePdf} target="_blank" rel="noreferrer">
            <AiOutlineDownload />
            Download CV
          </a>
          <a className="button button--ghost" href={certificatesPdf} target="_blank" rel="noreferrer">
            <AiOutlineDownload />
            Certificates
          </a>
        </Row>

        <Row className="resume">
          <Col md={6} className="resume-left">
            <h3 className="resume-title">Experience</h3>
            <Resumecontent
              title="Senior Data Engineer - Techcombank"
              date="Nov 2022 - Present"
              content={[
                "Design and maintain ETL/ELT pipelines across on-prem, cloud, and hybrid environments, including initial loads, CDC, and backfills.",
                "Contribute to AWS Data Lake and Databricks Lakehouse architecture for batch, near real-time, and streaming workloads.",
                "Optimize Spark workflows and storage strategies for more efficient pipeline operations.",
                "Coordinate delivery with engineering squads and stakeholders across retail, omni-channel, marketing, loyalty, lending, and risk domains.",
                "Stack: AWS, Databricks, Oracle, Terraform, GitLab, Airflow, Spark, Kafka, Docker, Jenkins, GraphQL, Python, Scala, Java, SQL.",
              ]}
            />
            <Resumecontent
              title="Data Engineer - FPT Software"
              date="Jun 2021 - Jan 2022"
              content={[
                "Developed and automated ETL pipelines to consolidate Jira, Trello, and Planner data into an Azure-based warehouse.",
                "Worked on schema design and data modeling for analytics systems.",
                "Implemented CI/CD and DevOps workflows with Azure DevOps, Docker, and Git.",
                "Stack: Azure Databricks, Blob Storage, Synapse Analytics, Airflow, Spark, Hadoop, Hive, MinIO, Presto, Docker, Python, SQL.",
              ]}
            />
            <Resumecontent
              title="Software Engineer Intern - Revotech Software"
              date="Jun 2020 - Jan 2021"
              content={[
                "Developed and tested full-stack web applications with Node.js, PHP, React.js, and Laravel.",
                "Prepared technical documentation and coordinated feature delivery with senior developers.",
              ]}
            />
          </Col>

          <Col md={6} className="resume-right">
            <h3 className="resume-title">Education</h3>
            <Resumecontent
              title="PhD Candidate - Vietnam National University, Hanoi"
              date="Sep 2022 - 2026"
              content={[
                "Informatics and Computer Engineering.",
                "Research focus: AI in healthcare.",
                "Stack: MATLAB, Scikit-learn, TensorFlow, PyTorch, NumPy, SciPy, Optuna.",
              ]}
            />
            <Resumecontent
              title="Bachelor's - Vietnam National University, Hanoi"
              date="Aug 2018 - Jul 2022"
              content={[
                "Informatics and Computer Engineering.",
                "Graduated in the top 3 of the cohort and completed the program one year early.",
                "GPA: 3.30/4.00.",
              ]}
            />

            <h3 className="resume-title">Publications</h3>
            <Resumecontent
              title=""
              content={[
                "Le, A. D. et al. (2023). Non-Invasive In Vivo Type 2 Diabetes Mellitus Diagnosis Using Raman Spectroscopy and Machine Learning. Mobile Networks and Applications.",
                "Ngo, T. Q., Nguyen, T. T., Le, A. D. et al. (2024). Classification of Glucose-Level in Deionized Water Using Machine Learning. PLOS ONE.",
                "Le, A. D., Nguyen, T. T. (2022). Use of Raman Spectroscopy to Diagnose Diabetes with SVM. ICTCC 2022 Proceedings.",
              ]}
            />

            <h3 className="resume-title">Certificates</h3>
            <Resumecontent
              title=""
              content={[
                "AWS Certified Solutions Architect - Associate.",
                "Google Data Analytics and Project Management Specializations.",
                "Agile Project Management.",
                "English proficiency: CEFR B2.",
              ]}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Resume;
