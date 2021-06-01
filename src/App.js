import './App.css';
import Game from './components/Game'

function App() {
  return (
    <div id="app">
      <h1>Minesweeper</h1>
      <div id="instructions">
        <p>Click on a tile to get started.</p>
        <p>Right click to add a flag.</p>
        <p>Each mine must be flagged for you to win the game</p>
        <p>Avoid the bombs.</p>
        <p>The number tells you how many bombs are nereby.</p>
        <p>No mines ever on the first click</p>
      </div>
     
      <Game/>
      <p class="attribution">Flag image by <a href="https://www.flaticon.com/authors/alfredo-hernandez">Alfredo Hernandez</a></p>
    </div>
  );
}

export default App;
