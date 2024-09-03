import React from 'react'
import "./about-us.css";
import { Container, Row, Col } from 'reactstrap';
import aboutImg from "../../assets/images/hero-img.PNG"

export const AboutUs = () => {
  return <section>
    <Container>
        <Row>
            <Col lg="6" md="6">
            <div className="about_image">
                <img src={aboutImg} alt="about us" className="w-100"/>
            </div>
            </Col>
            <Col lg="6" md="6">
                <div className="about_content">
                    <h2>About Us</h2>
                    <p>
                    We are a team of four senior high school students with a shared passion for technology and innovation. As technology enthusiasts, we've embarked on this research project to explore and create something that reflects our love for learning and our excitement about the possibilities of tech. 
                    </p>

                    <div className="about_counter">
                        <div>
                            <p className="counter_title">
                                This is our first project.
                            </p>
                            
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
  </section>
};

export default AboutUs;
