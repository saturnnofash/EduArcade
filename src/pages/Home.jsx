import React, {Fragment} from 'react';
import Header from '../components/Header/Header';
import HeroSection from '../components/Hero-Section/HeroSection';
import Group from '../components/Group-section/Group';
import AboutUs from '../components/About-us/AboutUs';
import Subject from '../components/Subject-section/Subject';
import Features from '../components/Feature-section/Features';
const Home = () => {
  return (
  <Fragment>
    <Header/>
    <HeroSection />
    <Group/>
    <AboutUs/>
    <Subject/>
    <Features/>
  </Fragment>
  );
};

export default Home;