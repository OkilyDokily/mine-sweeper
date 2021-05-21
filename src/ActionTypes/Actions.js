import {MAKE_GRID,ADD_MINES,REVEAL_CELL_COUNT} from './ActionTypes';

export function makeGrid(x,y){
  return {
    type:MAKE_GRID,
    width:x,
    height:y
  }
}

export function addMines(doNot,mineCount) {
  return {
    type: ADD_MINES,
    doNot: doNot,
    mineCount:mineCount
  }
}

export function revealCellCount(doNot) {
  return {
    type: REVEAL_CELL_COUNT,
    doNot: doNot,
  }
}