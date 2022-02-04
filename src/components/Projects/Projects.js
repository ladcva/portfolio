import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

import conference_nlp from "../../Assets/Projects/conference_nlp.png";
import dsp_report from "../../Assets/Projects/dsp_report.png";
import tfscale from "../../Assets/Projects/tfscale.jpeg";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.jpeg";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        <Col md={4} className="project-card">
            <ProjectCard
              imgPath={tfscale}
              isBlog={false}
              title="Temasek Foundation - Specialists' Community Action and Leadership Exchange Programme"
              description="The NP-TF SCALE Programme is a student leadership exchange programme, which includes an inbound programme in Singapore and an outbound programme in a partner country that aims to promote cross-cultural sharing and holistic learning, and to develop a better appreciation of economic, socio-political and cultural diversity of countries in the Southeast Asia. This programme also aims to promote friendship and collaboration among youth leaders from the respective countries through participating in the various experiential workshops and field visits both locally and overseas together."
              link="https://ivid2.np.edu.sg/media/TF+SCALE+2019+Hybrid+Programme+%28March+2021%29+-+Ngee+Ann+Polytechnic+X+Vietnam+National+University/1_44ijbtf9"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={conference_nlp}
              isBlog={false}
              title="Disaster Tweets Classification"
              description="The primary objective of the research is to identify the people who are in need of assistance based on their social networking post. Our goal is set to be creating a Machine Learning model that can make prediction whether or not a person or an area is in danger by analysing their Tweets automatically."
              link="https://arxiv.org/pdf/2202.00795.pdf"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={dsp_report}
              isBlog={false}
              title="Traffic Sign Recognition System"
              description="In this project, I was concentrated on developing and highlighting practical procedures of common techniques used for traffic sign classification under Digital Signal Processing (DSP) approach using MATLAB."
              link="https://drive.google.com/file/d/15Gj38KQNJWtBu77Gnj5U6JL69ADyW4XO/view?usp=sharing"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath="https://user-images.githubusercontent.com/55091357/122634666-acdce280-d109-11eb-87ab-7ae7f3a55fb9.png"
              isBlog={false}
              title="Online Examination System using ASP.NET"
              description="My personal project made to practice Software Engineering skills, built with C# / ASP.NET and Azure SQL Database - SQL Server. The project is a fully functional online examination system that can be used by students and teachers to conduct exams remotely without having an in-person examination."
              link="https://github.com/ladcva/TracNghiem"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath="https://cafefcdn.com/thumb_w/650/203337114487263232/2021/5/31/photo1622423360488-16224233605872120919132.jpg"
              isBlog={false}
              title="Hanoi Housing Dataset 2020"
              description="A raw dataset consists of 82.5k records housing prices in Hanoi, Vietnam. Scraped from the web using Python, the raw dataset is now available for download on my Kaggle. I've also created a machine learning model to predict the price of a house in Hanoi and taught freshmen in my school on how to do so."
              link="https://www.kaggle.com/ladcva/vietnam-housing-dataset-hanoi"
            />
          </Col>

          {/* <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="Google Developer Student Clubs"
              description="Trained a CNN classifier using 'FER-2013 dataset' with Keras and tensorflow backened. The classifier sucessfully predicted the various types of emotions of human. And the highest accuracy obtained with the model was 60.1%.
              Then used Open-CV to detect the face in an image and then pass the face to the classifer to predict the emotion of a person."
              link="https://gdsc.community.dev/vietnam-national-university-hanoi/"
            />
          </Col> */}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
