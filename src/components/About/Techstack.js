import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiReact,
  DiPython,
  DiGit,
  DiGoogleCloudPlatform
} from "react-icons/di";
import { 
  SiKeras, 
  SiTensorflow, 
  SiFirebase, 
  SiMicrosoftazure,
} from "react-icons/si";
import { GrMysql, GrNode } from "react-icons/gr";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <SiMicrosoftazure /> {<h6>Microsoft Azure</h6>}
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiGoogleCloudPlatform /> {<h6>Google Cloud</h6>}
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <GrNode /> {<h6>Node.js</h6>}
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiReact /> {<h6>React</h6>}
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <GrMysql /> {<h6>MySQL</h6>}
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiPython /> {<h6>Python</h6>}
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiKeras /> {<h6>Keras</h6>}
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiTensorflow /> {<h6>TensorFlow</h6>}
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiGit /> {<h6>Git</h6>}
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiFirebase /> {<h6>Firebase</h6>}
      </Col>
    </Row>
  );
}

export default Techstack;
