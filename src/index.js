import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {makeGrid ,addMines, revealMines, updateCells} from './helpers/helpers'


const result = (makeGrid(10, 10))
const addMinesResult = addMines(result,{x:5,y:7},50) 
const result2 = revealMines({x:9,y:5},addMinesResult);
console.log(result2,"result2")
console.log(updateCells(result2,result))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

