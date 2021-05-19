import { range, sampleSize, flatten, some } from 'lodash'

export function makeGrid(x, y, mines) {
  return range(y).map((i, index) => range(x).map((j, index2) => ({ y: index, x: index2, revealed: false, flagNumber: 0, isMine: false })));
}

export function addMines(grid, doNot, mineCount) {
  grid[doNot.y].splice(doNot.x,0);
  const results = sampleSize(flatten(grid), mineCount);
  console.log(results,"sample grid")

  return [...grid.map((row, index) => row.map((cell, index2) =>
    results.some((value) => cell.x === value.x && cell.y === value.y)
      ? { ...cell, isMine: true } : cell))]
}

export function getNeighbors({ x, y }, grid) {
  const neighbors = [
    getCellAt(x - 1, y, grid),
    getCellAt(x - 1, y - 1, grid),
    getCellAt(x, y - 1, grid),
    getCellAt(x + 1, y - 1, grid),
    getCellAt(x + 1, y, grid),
    getCellAt(x + 1, y + 1, grid),
    getCellAt(x, y + 1, grid),
    getCellAt(x - 1, y + 1, grid)
  ].filter(cell => cell !== null);
  console.log(neighbors,"get neighbors")
  return neighbors;
}

export function getCellAt(x, y, grid) {
  if (!((y + 1) > grid.length) && !((x + 1) > grid[0].length) && x >= 0 && y >= 0) {
    return grid[y][x]
  }
  return null;
}

export function countMines(neighbors) {
  return neighbors.filter(cell => cell.isMine).length;
}

function getVisited(){
  let visited = [];
  return function(cell){
    visited = [...visited,{...cell}];
    return [...visited];
  }
};
export function revealMines(cell, grid) {
  if (cell.isMine) {
    return "game over";
  }
  console.log(cell,"cell")
  const neighbors = getNeighbors(cell, grid);
  const count = countMines(neighbors);
  const visited = getVisited()
  cell.flagNumber = count;
  visited({ ...cell });
  console.log(visited(),"visited function")
  const filteredNeighbor = neighbors.filter(cell => !cell.isMine && !(visited().some(c => cell.x === c.x && cell.y === c.y)))
  console.log(filteredNeighbor, "filtered neighbor")
  if (count === 0) {
  
    //return [...flatten(filteredNeighbor.map(cell => revealMines(cell, grid))),{...cell}]
  }
  else{
      return {...cell}
  }
  return
}

export function updateGrid(revealedMines, grid) {
  return [...grid.map((row, index) => row.map((cell, index2) =>
    revealedMines.some((value) => cell.x === value.x && cell.y === value.y)
      ? { ...cell,revealed:true, flagNumber:cell.mineCount } : cell))]
}
