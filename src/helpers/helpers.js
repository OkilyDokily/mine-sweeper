import {range,sampleSize,flatten} from 'lodash'

export function makeGrid(x, y,mines){

    return range(y).map((i,index)=> range(x).map((j,index2)=>({y:index,x:index2, revealed:false, flagNumber: 0,isMine : false})));
}

export function addMines(grid,doNot,mineCount){
  delete grid[doNot.y][doNot.x];
  const results = sampleSize(flatten(grid),mineCount);
  console.log(results)
  grid[doNot.y].splice(doNot.x,0,doNot);
  
  return grid.map((row, index) => row.map((cell, index2) =>
    results.some((value) => cell.x === value.x && cell.y === value.y)
      ? { ...cell, isMine: true } : cell))
}

export function getNeighbors({x,y}){

}

export function getCellAt({x,y}){
  return  
}
