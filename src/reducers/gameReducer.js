import {makeGrid,addMinesToGrid,revealMines,updateGrid,showGameOver,playerWins,applyFlag} from '../helpers/helpers'
import {RESET_GRID,ADD_MINES,REVEAL_CELL_COUNT,APPLY_FLAG} from '../ActionTypes/ActionTypes'

const initial = {
  grid:makeGrid(10,10),
  addMines:false,
  playerWins:null
} 

function gameReducer(state = initial, action){
  switch(action.type){
      case RESET_GRID:
        return {...state,grid:makeGrid(action.width,action.height),playerWins:null,addMines:false}
      case ADD_MINES:
        return {...state,grid:addMinesToGrid(state.grid,action.doNot,action.mineCount),addMines:true}
      case APPLY_FLAG:
        return{...state,grid:applyFlag(action.cell,state.grid)}
      case REVEAL_CELL_COUNT:
        const result = revealMines(action.doNot, state.grid)
        if (result !== "game over"){
          const updatedGrid = updateGrid(result, state.grid)
          return { ...state, grid: updatedGrid, playerWins: playerWins() ? true: null}
        }
        else{   
          return {...state,grid:showGameOver(state.grid),playerWins:false};   
        }
        
      default:
        return state
  }
}

export default gameReducer;