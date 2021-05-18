import { range, sampleSize, flatten } from 'lodash'

export function makeGrid(x, y, mines) {

  return range(y).map((i, index) => range(x).map((j, index2) => ({ y: index, x: index2, revealed: false, flagNumber: 0, isMine: false })));
}

export function addMines(grid, doNot, mineCount) {
  delete grid[doNot.y][doNot.x];
  const results = sampleSize(flatten(grid), mineCount);
  console.log(results)
  grid[doNot.y].splice(doNot.x, 0, doNot);

  return grid.map((row, index) => row.map((cell, index2) =>
    results.some((value) => cell.x === value.x && cell.y === value.y)
      ? { ...cell, isMine: true } : cell))
}

export function getNeighbors({ x, y }, grid) {
  return [
    getCellAt(x - 1, y, grid),
    getCellAt(x - 1, y - 1, grid),
    getCellAt(x, y - 1, grid),
    getCellAt(x + 1, y - 1, grid),
    getCellAt(x + 1, y, grid),
    getCellAt(x + 1, y + 1, grid),
    getCellAt(x, y + 1, grid),
    getCellAt(x - 1, y + 1, grid)
  ].filter(cell => cell !== null);
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

export function revealMines(cell, grid, visited = []) {
  if (cell.isMine) {
    return "game over";
  }
  const neighbors = getNeighbors(cell, grid);
  const count = countMines(neighbors);
  cell.mineCount = count;
  cell.revealed = true;
  visited.push({ ...cell });

  if (count === 0) {
    return flatten(neighbors.filter(cell => !cell.isMine && !visited.some((c => cell.x === c.x && cell.y === c.y))).map(cell => revealMines(cell,grid, visited)))
  }

}

export function updateCells(revealedMines, grid) {
  console.log(revealedMines,"fsda")
  return grid.map((row, index) => row.map((cell, index2) =>
    revealedMines.some((value) => cell.x === value.x && cell.y === value.y)
      ? { ...cell, revealed: true } : cell))
}
