import React from 'react';
import { Container, Row, Col } from "reactstrap";
import "./hero-section.css";
import heroImg from "../../assets/images/hero-img.PNG";

export const HeroSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero_content">
              <h2>Welcome to LearnHub!</h2>
              <p className="mb-4">
                Dive into a world where learning meets fun. At LearnHub, we believe education doesn't have to be boring. Join us, and let's turn study time into playtime!
              </p>

              <div className="search">
                <input type="text" placeholder="Search" />
                <button className="searchButton">Search</button>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <img src={heroImg} alt="Hero" className="w-100" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
