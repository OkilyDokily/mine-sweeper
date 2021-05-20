import {MAKE_GRID,ADD_MINES,REVEAL_CELL_COUNT} from './ActionTypes';

export function makeGrid(x,y){
  return {
    action:MAKE_GRID,
    width:x,
    height:y
  }
}

export function addMines(doNot,mineCount) {
  return {
    action: ADD_MINES,
    doNot: doNot,
    mineCount:mineCount
  }
}

export function revealCellCount(doNot,cell) {
  return {
    action: REVEAL_CELL_COUNT,
    cell:cell
  }
}