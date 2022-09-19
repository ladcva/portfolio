import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Le Anh Duc </span>
            from <span className="purple"> Hanoi, Vietnam.</span>
            <br />I am a meticulous and organized individual seeking an entry-level position in the field of Data Science or Data Engineering. I always had such a desire to learn, growth mindset, self-driven motivation to contribute and bring goods to the advancement of science and technology. Just being graduated with a bachelor's degree in Informatics and Computer Engineering, I am looking forward to get hands on real-life projects in order to gain experiences, learn new concepts and deliver the finest solution.

          </p>

        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
