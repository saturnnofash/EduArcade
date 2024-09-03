import React from 'react';
import {Container, Row, Col} from "reactstrap";
import "./features.css";

const Features = () => {
  return <section>
    <Container>
        <Row>
            <Col lg="4"> 
                <div className="single_feature">
                    <h2><i class="ri-shake-hands-line"></i></h2>
                    <h6>Interactive Learning</h6>
                    <p>
                        Students can engage with quizzes and challenges that adapt to their skill level, offering content with immediate feedback and rewards.
                    </p>
                </div>
            </Col>

            <Col lg="4"> 
                <div className="single_feature">
                    <h2><i class="ri-chat-smile-3-line"></i></h2>
                    <h6>Engaging Contents</h6>
                    <p>
                        Learn through games covering Earth Science and Pre-Calculus. These games cater to different subject proficiency to offer a fun experience.
                    </p>
                </div>
            </Col>

            <Col lg="4"> 
                <div className="single_feature">
                    <h2><i class="ri-progress-1-line"></i></h2>
                    <h6>Progress Tracking</h6>
                    <p>
                        Students can look into their progress in each subject. Detailed insights into progress, strengths, and areas needing improvement are provided.
                    </p>
                </div>
            </Col>

        </Row>
    </Container>
  </section>
};

export default Features;