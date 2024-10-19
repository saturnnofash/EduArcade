import React, { Fragment } from 'react';
import Header from '../components/Header/Header';
import Minemind from '../components/Game-canvas/test';



const Game = () => {
  return (
    <Fragment >
      <Header />
      <Minemind />
    </Fragment>
  );
};

export default Game;