import { MAKE_GRID, ADD_MINES, REVEAL_CELL_COUNT } from '../ActionTypes/ActionTypes';
import { makeGrid as makeGridAction, addMines, revealCellCount} from '../ActionTypes/Actions';
import { makeGrid, revealMines,showGameOver} from '../helpers/helpers'
import { range, sampleSize, flatten } from 'lodash'
import reducer from '../reducers/gameReducer'

describe('game reducer', () => {
  test("robustness test for recursive helper", () => {
    const grid = range(10).map((_, index) => range(10).map((_, index2) => ({ y: index, x: index2, revealed: false, flagNumber: 0, isMine: (index >= 5) ? true : false })));
  
    const result = revealMines({x:0,y:0},grid); 
    
    expect(result.length).toEqual(50);
    expect(result.filter(cell => cell.flagNumber === 0).length).toEqual(40);
    expect(result.filter(cell => cell.flagNumber === 3).length).toEqual(8);
    expect(result.filter(cell => cell.flagNumber === 2).length).toEqual(2);
  });

  test("robustness test for recursive helper", () => {
    
    const grid = range(10).map((_, index) => range(10).map((_, index2) => ({ y: index, x: index2, revealed: false, flagNumber: 0, isMine: (index >= 5) ? true : false })));

    const result = revealMines({ x: 0, y: 0 }, grid);

    expect(result.length).toEqual(50);
    expect(result.filter(cell => cell.flagNumber === 0).length).toEqual(40);
    expect(result.filter(cell => cell.flagNumber === 3).length).toEqual(8);
    expect(result.filter(cell => cell.flagNumber === 2).length).toEqual(2);
  });

  test("test gameOver helper", () => {

    const grid = range(10).map((_, index) => range(10).map((_, index2) => ({ y: index, x: index2, revealed: false, flagNumber: 0, isMine: (index >= 5) ? true : false })));

    const result = showGameOver(grid);

    expect(flatten(result).filter(cell => cell.isMine && cell.revealed).length).toEqual(50);
  });

})
