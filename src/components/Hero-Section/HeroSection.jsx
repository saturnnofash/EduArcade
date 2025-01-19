import React from 'react';
import { Container, Row, Col } from "reactstrap";
import "./hero-section.css";
import heroImg from "../../assets/images/hero-img.PNG";

export const HeroSection = () => {
  return (
    <section  className='hero_container d-flex justify-content-center align-items-center '>
      <Container>
        <Row>
          <Col lg="6" md="6" className='d-flex justify-content-center align-items-center'>
            <div className="hero_content">
              <h1>Welcome to <strong>LearnHub!</strong></h1>
              <p className="mb-4">
                Dive into a world where learning meets fun. At LearnHub, we believe education doesn't have to be boring. Join us, and let's turn study time into playtime!
              </p>
            </div>
          </Col>

          <Col lg="6" md="6" className='d-flex'>
            <img src={heroImg} alt="Hero" className="hero_img" />  
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
