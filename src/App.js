import React, { Component } from 'react';
import './App.css';
import Instructions from './components/Instructions/Instructions';
import Game from './components/Game/Game';

class App extends Component {
  constructor (props) {
    super (props);
      this.state = {
        mode : "game",
        knownInsults : [
          {
            id : 0,
            insult : "You fight like a Dairy Farmer",
            comeback : "How appropriate. You fight like a cow."
          },
          {
            id : 1,
            insult: "Soon you'll be wearing my sword like a shish kebab!",
            comeback: "First you better stop waving it about like a feather duster."
          },
          {
            id: 2,
            insult : "I once owned a dog that was smarter than you."
          },
          {
            id: 3,
            comeback: "I'm rubber, you're glue."
          },
          {
            id : 4,
            insult : "You call yourself a pirate!"
          }


        ]
      }
  }

  handleChangeMode = (mode) => {
    this.setState({ mode });
  }

  render() {
    let mode = this.state.mode;
    return (
      <div className="App">
        <h1>Insult Swordfighting</h1>
        {mode === 'instructions' && <Instructions />}
        {mode === 'game' && <Game knownInsults={this.state.knownInsults} />}

        {/* <button onClick={() => this.handleChangeMode('game')}>Game</button>
        <button onClick={() => this.handleChangeMode('instructions')}>Instructions</button> */}
      </div>
    );
  }
}

export default App;
