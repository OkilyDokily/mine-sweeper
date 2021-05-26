import {RESET_GRID,START_GAME,REVEAL_CELL_COUNT,APPLY_FLAG} from './ActionTypes';

export function resetGrid(x,y){
  return {
    type:RESET_GRID,
    width:x,
    height:y
  }
}

export function startGame(doNot,mineCount) {
  return {
    type: START_GAME,
    doNot: doNot,
    mineCount:mineCount
  }
}

export function applyFlag(cell){
  return {
    type: APPLY_FLAG,
    cell: cell
  }
}

export function revealCellCount(doNot) {
  return {
    type: REVEAL_CELL_COUNT,
    doNot: doNot,
  }
}
