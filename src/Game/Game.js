import React, { Component } from 'react'
import Instructions from '../Instructions/Instructions';
import Title from '../Title/Title';
import FightStart from '../FightStart/FightStart';
import FightEnd from '../FightEnd/FightEnd';
// import Greet from '../Greet/Greet';
import Fight from '../Fight/Fight';
import Debug from '../Debug';
// import ProgressBar from '../ProgressBar/ProgressBar';
import './Game.css';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'fight',
      showInstructions : false,
      roundCounter : 1
    }
    this.updateMode = this.updateMode.bind(this);
    this.handleShowInstructions = this.handleShowInstructions.bind(this);
  }

  updateMode(mode) {
    this.setState({ mode })
  }

  handleShowInstructions(evt) {
    let instructions = document.getElementsByClassName('Instructions')[0];
    if (this.state.showInstructions) {
      instructions.style.animation = 'pullup 1s'
    }

    setTimeout(() => {
      this.setState({ showInstructions: !this.state.showInstructions });
    }, 300);
  }

  renderMode() {
    let mode = this.state.mode;
    if (mode === 'title') return <Title updateMode={this.updateMode} />;
    else if (mode === 'fightStart') return <FightStart updateMode={this.updateMode} turn={this.state.turn} />;
    else if (mode === 'fightEnd') return <FightEnd updateMode={this.updateMode} turn={this.state.turn} />;
    // else if (mode === 'greet') return <Greet updateMode={this.updateMode} />;
    else if (mode === 'fight') {
      return <Fight
                updateMode={this.updateMode}
                updatePlayerTurn={this.updatePlayerTurn}
                updateRoundWin={this.updateRoundWin}
      />
    };
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

