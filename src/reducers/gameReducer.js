import { makeGrid, addMinesToGrid, revealMines, updateGrid, showGameOver, playerWins, applyFlag } from '../helpers/helpers'
import { RESET_GRID, START_GAME, REVEAL_CELL_COUNT, APPLY_FLAG } from '../ActionTypes/ActionTypes'

const initial = {
  grid: makeGrid(10, 10),
  timerIsOn: false,
  playerWins: null
}

function gameReducer(state = initial, action) {
  switch (action.type) {
    case RESET_GRID:
      return { ...state, grid: makeGrid(action.width, action.height), playerWins: null, timerIsOn: false }
    case START_GAME:
      if (state.playerWins === null) {
        return { ...state, grid: addMinesToGrid(state.grid, action.doNot, action.mineCount), timerIsOn: true }
      }
      return state;
    case APPLY_FLAG:
      if (state.playerWins === null) {
        const newGrid = applyFlag(action.cell, state.grid)
        const playerWinsResult = playerWins(newGrid) ? true : null

        const timerIsOn = ((playerWinsResult === true) ? false : true);
        return { ...state, grid: newGrid, playerWins: playerWinsResult, timerIsOn: timerIsOn }
      }
      return state;
    case REVEAL_CELL_COUNT:
      if (state.playerWins === null) {
        const result = revealMines(action.doNot, state.grid)
        if (result !== "game over") {
          const updatedGrid = updateGrid(result, state.grid)
          const playerWinsResult = playerWins(updatedGrid) ? true : null;
          const timerIsOn = ((playerWinsResult === true) ? false : true);

          return { ...state, grid: updatedGrid, playerWins: playerWinsResult, timerIsOn: timerIsOn }
        }
        else {
          return { ...state, grid: showGameOver(state.grid), playerWins: false, timerIsOn: false };
        }
      }
      return state;

    default:
      return state
  }
}

export default gameReducer;