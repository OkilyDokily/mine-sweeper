import { MAKE_GRID, ADD_MINES, REVEAL_CELL_COUNT } from '../ActionTypes/ActionTypes';
import { makeGrid as makeGridAction, addMines, revealCellCount } from '../ActionTypes/Actions';
import { makeGrid, revealMines, showGameOver, addMinesToGrid, getCellAt } from '../helpers/helpers'
import { range, sampleSize, flatten, every } from 'lodash'
import reducer from '../reducers/gameReducer'

describe('helper functions', () => {
  test("robustness test for recursive helper", () => {
    const grid = range(10).map((_, index) => range(10).map((_, index2) => ({ y: index, x: index2, revealed: false, flagNumber: 0, isMine: (index >= 5) ? true : false })));
    //test grid range
    expect(grid.length).toEqual(10)
    expect(grid.every(row => row.length === 10)).toEqual(true);

    const result = revealMines({ x: 0, y: 0 }, grid);

    expect(result.length).toEqual(50);
    expect(result.filter(cell => cell.flagNumber === 0).length).toEqual(40);
    expect(result.filter(cell => cell.flagNumber === 3).length).toEqual(8);
    expect(result.filter(cell => cell.flagNumber === 2).length).toEqual(2);
  });

  test("robustness test for recursive helper 2", () => {

    const grid = range(10).map((_, index) => range(10).map((_, index2) => ({ y: index, x: index2, revealed: false, flagNumber: 0, isMine: (index >= 5) ? true : false })));

    const result = revealMines({ x: 0, y: 0 }, grid);

    expect(result.length).toEqual(50);
    expect(result.filter(cell => cell.flagNumber === 0).length).toEqual(40);
    expect(result.filter(cell => cell.flagNumber === 3).length).toEqual(8);
    expect(result.filter(cell => cell.flagNumber === 2).length).toEqual(2);
  });

  test("make grid", () => {
    const grid = makeGrid(10, 10);
    expect(grid[0][0].x).toEqual(0);
    expect(grid[0][0].y).toEqual(0);
  })

  test("test gameOver helper", () => {

    const grid = range(10).map((_, index) => range(10).map((_, index2) => ({ y: index, x: index2, revealed: false, flagNumber: 0, isMine: (index >= 5) ? true : false })));

    const result = showGameOver(grid);

    expect(flatten(result).filter(cell => cell.isMine && cell.revealed).length).toEqual(50);
  });

  test("addMines", () => {
    const grid = range(10).map(i => range(10).map(j => ({ y: i, x: j, revealed: false, flagNumber: 0, isMine: false })));

    const doNot = { x: 3, y: 3 };
    expect(flatten(grid).length).toEqual(100);

    let flattened = flatten(grid).filter(cell => ((cell.x !== doNot.x) || (cell.y !== doNot.y)));
    expect(flattened.length).toEqual(99);


    const result = addMinesToGrid(grid, { x: 3, y: 3 }, 50);
    expect(flatten(result).filter(cell => cell.isMine).length).toEqual(50);
    expect(result[3][3].isMine).toEqual(false);


  })

  test("addMines 2", () => {
    const grid = range(10).map((_, index) => range(10).map((_, index2) => ({ y: index, x: index2, revealed: false, flagNumber: 0, isMine: false })));
    const result = addMinesToGrid(grid, { x: 3, y: 3 }, 90);
    expect(flatten(result).filter(cell => cell.isMine).length).toEqual(90);
    expect(result[3][3].isMine).toEqual(false);
  })


  test("addMines 3", () => {
    const grid = range(10).map((_, index) => range(10).map((_, index2) => ({ y: index, x: index2, revealed: false, flagNumber: 0, isMine: false })));

    const result = addMinesToGrid(grid, { x: 3, y: 3 }, 99);
    expect(flatten(result).filter(cell => cell.isMine === true).length).toEqual(99);
    expect(result[3][3].isMine).toEqual(false);
    expect(result[4][3].isMine).toEqual(true);
  })

})

describe("reducers", () => {
  test("return state as expected", () => {
    let result = reducer(undefined, addMines({ x: 3, y: 3 }, 99));
    expect(result.grid.length).toEqual(10);
    expect(result.grid.every(row => row.length === 10)).toEqual(true);
    expect(result.grid.every(row => every(cell => cell.isMine === false))).toEqual(true);
  });

  test(("add mines"), () => {
    let result = reducer(undefined, addMines({ x: 3, y: 3, isMine: false }, 99));

    expect(flatten(result.grid).filter(cell => cell.isMine).length).toEqual(99);
    expect(result.grid[3][3].isMine).toEqual(false);
    expect(result.grid[4][3].isMine).toEqual(true);
  });

  test("robustness test for recursive helper reducer", () => {
    let result = reducer(undefined, addMines({ x: 3, y: 3, isMine: false }, 0));
    let result2 = reducer(result, revealCellCount(getCellAt(3, 3, result.grid)));

    expect(flatten(result2.grid).filter(cell => cell.revealed).length).toEqual(100);

  });

  test("robustness test for recursive helper reducer 2", () => {
    let result = reducer(undefined, addMines({ x: 3, y: 3, isMine: false }, 99));
    let result2 = reducer(result, revealCellCount(getCellAt(3, 3, result.grid)));

    expect(flatten(result2.grid).filter(cell => cell.revealed).length).toEqual(1);

  });
});
