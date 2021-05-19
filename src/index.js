import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { makeGrid, addMines, revealMines, updateGrid } from './helpers/helpers'


const result = (makeGrid(10, 10))
const addMinesResult = addMines(result, { x: 5, y: 7 ,isMine:false}, 5)

const revealedMines = revealMines({ y: 5, x: 9 }, addMinesResult);
console.log(revealedMines, "revealed mines")
//console.log(updateGrid(result2,result),"updateGrid")

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

