import {makeGrid,addMines,revealMines,updateGrid,showGameOver} from '../helpers/helpers'
import {MAKE_GRID,ADD_MINES,REVEAL_CELL_COUNT} from '../ActionTypes/ActionTypes'

const initial = {
  grid:makeGrid(10,10),
  gameOver:false
} 

function gameReducer(state = initial, action){
  switch(action.type){
      case MAKE_GRID:
        return {...state,grid:makeGrid(action.width,action.height)}
      case ADD_MINES:
        return {...state,grid:addMines(state.grid,action.doNot,action.mineCount)}
      case REVEAL_CELL_COUNT:
        const result = revealMines(action.cell, state.grid)
        if (result !== "game over"){
          return { ...state, grid: updateGrid(result, state.grid) }
        }
        else{
          return {...state,grid:showGameOver(state.grid),gameOver:true};   
        }
        
      default:
        return state
  }
}

export default gameReducer;