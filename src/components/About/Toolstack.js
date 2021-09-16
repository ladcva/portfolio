import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiLinux,
  SiVisualstudiocode,
  SiJupyter,
  SiPostman,
  // SiHeroku,
} from "react-icons/si";
import {
  FaDocker
} from "react-icons/fa";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <SiLinux /> {<h6>Linux</h6>}
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVisualstudiocode /> {<h6>Visual Studio</h6>}
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiJupyter /> {<h6>Jupyter</h6>}
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPostman /> {<h6>Postman</h6>}
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <FaDocker /> {<h6>Docker</h6>}
      </Col>
    </Row>
  );
}

export default Toolstack;
