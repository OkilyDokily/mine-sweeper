import React from 'react';
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

export default Game;