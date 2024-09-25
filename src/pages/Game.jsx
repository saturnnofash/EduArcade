import React, {Fragment} from 'react';
import { Container } from 'reactstrap';
import Header from '../components/Header/Header';
import GameCanvas from '../components/Game-canvas/GameCanvas';


const Game = () => {
  return (
  <Fragment >
      <Header/>
      <GameCanvas/>
    
  </Fragment>
  );
};

export default Game;