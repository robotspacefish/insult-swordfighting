import React, { Component } from 'react';
import './App.css';
import Instructions from '../components/Instructions/Instructions';
import Game from '../components/Game/Game';
import knownInsults from '../assets/knownInsults.js';

class App extends Component {
  constructor (props) {
    super (props);
      this.state = {
        mode : "game",
        knownInsults : Object.assign({}, knownInsults),
        choices : [...knownInsults.insults],
        currentChoice : '',
        turnType : '',
        txt : {}
      }
  }

  componentDidMount() {
  }

  handleChangeMode = (mode) => this.setState({ mode });

  initPlayerChoices = (turnType = this.state.turnType) => {
    let choices = turnType === 'insult' ? [...knownInsults.insults] : [...knownInsults.comebacks];
    this.setState({choices})
  }

  //handles the chosen insult or comeback the user selected
  handleSelected  = (selected) => {
    this.setState({
      speaker : 'Player',
      msg : selected
    });
  }

  toggleTurnType = () => {
    let turnType = this.state.turnType === 'insult' ? 'comeback' : 'insult';
    this.setState(() => ({ turnType }));
  }

  updatePlayerChoices = ()=> {}


  render() {
    let mode = this.state.mode;
    return (
      <div className="App">
        <div className="debug">
          <button onClick={() => {
            this.toggleTurnType();
            this.initPlayerChoices();
          }}>[Debug] Toggle Turn Type</button>

          <button onClick={() => this.handleChangeMode('game')}>[Debug] Game Mode</button>
          <button onClick={() => this.handleChangeMode('instructions')}>[Debug] Instructions Mode</button>
        </div>

        {mode === 'instructions' && <Instructions />}
        {mode === 'game' &&
          <Game
            choices={this.state.choices}
            handleSelected={this.handleSelected}
            msg={this.state.msg}
            speaker={this.state.speaker}
          />
        }
        <canvas ref="canvas" width={800} height="400"> </canvas>
      </div>
    );
  }
}

export default App;
