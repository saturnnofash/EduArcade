import React, {Fragment} from 'react';
import Header from '../components/Header/Header';
import AboutUs from '../components/About-us/AboutUs';
import Features from '../components/Feature-section/Features';

const About = () => {
  return (
  <Fragment>
    <Header/>
    <AboutUs/>
    <Features/>
  </Fragment>
  );
};

export default About;