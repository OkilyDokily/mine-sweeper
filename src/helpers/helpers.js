import { range, sampleSize, flatten } from 'lodash'

export function makeGrid(x, y) {
  return range(y).map((i) => range(x).map((j) => ({ y: i, x: j, revealed: false, flagNumber: 0, isMine: false, isFlagged: false })));
}

export function playerWins(grid) {
  const flattened = flatten(grid);
  const eachNonMine = flattened.filter(cell => !cell.isMine).every(cell => cell.revealed);
  const allFlagged = flattened.filter(cell => cell.isMine).every(cell => cell.isFlagged);
  const noFalseFlag = flattened.filter(cell => !cell.isMine).every(cell => !cell.isFlagged);
  return (eachNonMine && allFlagged && noFalseFlag)
}

export function getCell(x, y, grid) {
  return grid[y][x];
}

export function applyFlag(cell, grid) {
  return grid.map(row => row.map(c => {
    if (c.x === cell.x && c.y === cell.y && !c.revealed) {
      return { ...c, isFlagged: !c.isFlagged }
    }
    else {
      return c;
    }
  }))
}

export function addMinesToGrid(grid, doNot, mineCount) {
  let flattened = flatten(grid).filter(cell => cell.x !== doNot.x || cell.y !== doNot.y);
  const results = sampleSize(flattened, mineCount);


  return grid.map((row) => row.map((cell) =>
    results.some((value) => cell.x === value.x && cell.y === value.y)
      ? { ...cell, isMine: true } : cell))
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


export function revealMines(cell, grid) {
  let visited = [];
  function go(cell, grid) {
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
      return [{ ...cell }].concat(flatten(filteredNeighbor.map(cell => go(cell, grid))))
    }
    else {
      return [{ ...cell }]
    }
  }

  return go(cell, grid)
}

export function showGameOver(grid) {
  return [...grid.map((row) => row.map((cell) =>
    cell.isMine ? { ...cell, revealed: true, isFlagged: false } : cell))]
}

export function updateGrid(revealedMines, grid) {
  return [...grid.map((row) => row.map((cell) =>
    revealedMines.some((value) => cell.x === value.x && cell.y === value.y)
      ? { ...cell, revealed: true, flagNumber: cell.flagNumber } : cell))]
}
