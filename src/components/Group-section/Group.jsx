import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import './group-section.css';

export const Group = () => {
  return <section>
    <Container>
    <Row>
        <Col lg= "2" md= "3">
            <h3 className="group-row d-flex align-items-center gap-1"><i class="ri-facebook-circle-fill"></i>Adjing</h3>
        </Col>
        <Col lg= "2" md= "3">
            <h3 className="group-row d-flex align-items-center gap-1"><i class="ri-facebook-circle-fill"></i>Aud</h3>
        </Col>
        <Col lg= "2" md= "3">
            <h3 className="group-row d-flex align-items-center gap-1"><i class="ri-facebook-circle-fill"></i>Matias</h3>
        </Col>
        <Col lg= "2" md= "3">
            <h3 className="group-row d-flex align-items-center gap-1"><i class="ri-facebook-circle-fill"></i>Tindoc</h3>
        </Col>
    </Row>
    </Container>
  </section>
};

export default Group;
