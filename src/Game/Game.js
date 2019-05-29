import React, { Component } from 'react'
import Instructions from '../Instructions/Instructions';
import Title from '../Title/Title';
import FightStart from '../FightStart/FightStart';
import Fight from '../Fight/Fight';
import Win from '../Win/Win';
// import Debug from '../Debug';
import './Game.css';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'title',
      showInstructions : false,
      fightCounter : 1,
    }
    this.updateMode = this.updateMode.bind(this);
    this.handleShowInstructions = this.handleShowInstructions.bind(this);
    this.updateFightCounter = this.updateFightCounter.bind(this);
  }

  updateMode(mode) {
    this.setState({ mode })
  }

  updateFightCounter() {
    this.setState(st => ({ fightCounter : st.fightCounter + 1 }));
  }

  handleShowInstructions(evt) {
    let instructions = document.getElementsByClassName('Instructions')[0];
    if (this.state.showInstructions) {
      instructions.style.animation = 'pullup 1s'
    }

    setTimeout(() => {
      this.setState(st => ({ showInstructions: !st.showInstructions }));
    }, 300);
  }

  renderMode() {
    let mode = this.state.mode;
    if (mode === 'title') return <Title updateMode={this.updateMode} />;
    else if (mode === 'fightStart')  {
      return <FightStart
                updateMode={this.updateMode}
                fightCounter={this.state.fightCounter}
              />
    }
    else if (mode === 'fight') {
      return <Fight
                updateMode={this.updateMode}
                updatePlayerTurn={this.updatePlayerTurn}
                updateRoundWin={this.updateRoundWin}
                updateFightCounter={this.updateFightCounter}
                round={this.state.fightCounter}
                gameWon={this.gameWon}
      />
    }
    else if (mode === 'win') {
      return <Win />
    }
  }

  render() {
    return (
      <div className="Game container">

        {/* <Debug  updateMode={this.updateMode} /> */}

        <button className="btn" id="Game-instructions-btn"
          onClick={this.handleShowInstructions}>
          {this.state.showInstructions ? 'Hide' : 'Show'} Instructions
        </button>
        {this.state.showInstructions && <Instructions />}
        {this.renderMode()}
      </div>
    )
  }
}

