import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import subjectImg1 from "../../assets/images/earth-science-logo.png";
import subjectImg2 from "../../assets/images/pre-cal-logo.png";
import "./subjects.css";
import SubjectCard from './SubjectCard';

const subjectData = [
    {
        id:"01",
        title: "Earth Science",
        lesson: "1",
        students: "4",
        rating: "5",
        imgUrl: subjectImg1,
        url: "/game1",
    },
    {
        id:"02",
        title: "Pre-Calculus",
        lesson: "1",
        students: "21",
        rating: "4",
        imgUrl: subjectImg2,
        url: "/game2"
    },
]

const Subject = () => {
  return <section>
    <Container>
        <Row>
            <Col lg="12">
            <div className="course_top d-flex justify-content-between align-items-center">
                <div className='course_top_left w-50'>
                    <h2> Our offered Subjects</h2>
                </div>
            </div>
            </Col>
            {
                subjectData.map(item=>(
                    <Col lg="4" md="6">
                        <SubjectCard key={item.id} item={item}/>
                    </Col>
                ))}
            
        </Row>
    </Container>
  </section>
};

export default Subject;