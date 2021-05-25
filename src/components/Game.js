import React from 'react';
import PropTypes from 'prop-types';
import Controls from './Controls'
import MinesweeperField from './MinesweeperField'

const Game = props => {
  return (
    <div id="game">
      <Controls/>
      <MinesweeperField/>
    </div>
  );
};

Game.propTypes = {
  
};

export default Game;