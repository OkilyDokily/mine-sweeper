import {makeGrid,addMines,revealMines,updateGrid} from '../helpers/helper'
import {MAKE_GRID,ADD_MINES,REVEAL_CELL_COUNT} from '../ActionTypes/ActionTypes'

const initial = {
  grid:makeGrid(10,10)
} 

function gameReducer(state = initial, action){
  switch(action.type){
      case MAKE_GRID:
        return {...state,grid:makeGrid(action.width,action.height)}
      case ADD_MINES:
        return {...state,grid:addMines(state.grid,action.doNot,action.mineCount)}
      case REVEAL_CELL_COUNT:
        return {...state,grid:updateGrid(revealMines(action.cell,state.grid),state.grid)}
      default:
        return state
  }
}

export default gameReducer;