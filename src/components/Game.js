import React from 'react';
import PropTypes from 'prop-types';
import MinesweeperField from './MinesweeperField'

const Game = props => {
  return (
    <div id="game">
      <MinesweeperField/>
    </div>
  );
};

Game.propTypes = {
  
};

export default Game;