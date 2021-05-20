import { range, sampleSize, flatten} from 'lodash'

export function makeGrid(x, y) {
  return range(y).map((i, index) => range(x).map((j, index2) => ({ y: index, x: index2, revealed: false, flagNumber: 0, isMine: false })));
}

export function addMines(grid, doNot, mineCount) {
  grid[doNot.y].splice(doNot.x, 0);
  const results = sampleSize(flatten(grid), mineCount);


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

let visited = [];

export function revealMines(cell, grid) {
  if (cell.isMine) {
    return "game over";
  }
  if (visited.some(c => cell.x === c.x && cell.y === c.y)) {
    return [];
  }

  const neighbors = getNeighbors(cell, grid);
  const count = countMines(neighbors);
  cell.flagNumber = count;

  visited.push({ ...cell });

  const filteredNeighbor = neighbors.filter(cell => !cell.isMine && !(visited.some(c => cell.x === c.x && cell.y === c.y)))

  if (count === 0) {

    return [{ ...cell }].concat(flatten(filteredNeighbor.map(cell => revealMines(cell, grid))))
  }
  else {
    return [{ ...cell }]
  }

}

export function updateGrid(revealedMines, grid) {
  return [...grid.map((row) => row.map((cell) =>
    revealedMines.some((value) => cell.x === value.x && cell.y === value.y)
      ? { ...cell, revealed: true, flagNumber: cell.flagNumber } : cell))]
}
