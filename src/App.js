import React from 'react'
import './App.css';
import Game from './Game/Game';
import Info from './Info/Info';
function App() {
  return (
    <div className="App">
      <Game />
      <footer>
        <Info />
      </footer>
    </div>
  )
}

export default App
