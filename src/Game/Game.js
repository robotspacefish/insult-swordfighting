import React, { Component } from 'react'
import Instructions from '../Instructions/Instructions';
import Title from '../Title/Title';
import TurnStart from '../TurnStart/TurnStart';
import Greet from '../Greet/Greet';
import Fight from '../Fight/Fight';
import Debug from '../Debug';
// import ProgressBar from '../ProgressBar/ProgressBar';
import './Game.css';

import knownInsults from '../assets/knownInsults.js';
import allInsults from '../assets/insults.js';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'title',
      knownInsults: knownInsults,
      allInsults : allInsults,
      choices: [...knownInsults.insults], // starts as insults
      currentChoice: '',
      turn: 'player',
      turnType : 'insult',
      txt: {
        playerMsg: 'playerMsg',
        pirateMsg: 'pirateMsg'
      },
      showInstructions : false
    }
    this.updateMode = this.updateMode.bind(this);
    this.handleShowInstructions = this.handleShowInstructions.bind(this);
  }

  updateMode(mode) {
    this.setState({ mode })
  }

  updateTurnType(turnType) {
    this.setState({ turnType });
  }

  updatePlayerChoices() {
    let choices = this.state.turnType === 'insult' ? [...this.props.knownInsults.insults] : [...this.props.knownInsults.comebacks];
    this.setState({ choices })
  }

  //handles the chosen insult or comeback the user selected
  handleSelected = (selected) => {
    this.setState({
      speaker: 'Player',
      msg: selected
    });
  }

  toggleTurnType = () => {
    let turnType = this.state.turnType === 'insult' ? 'comeback' : 'insult';
    this.setState(() => ({ turnType }));
  }

  renderMode() {
    let mode = this.state.mode;
    if (mode === 'title') return <Title updateMode={this.updateMode} />;
    else if (mode === 'turnStart') return <TurnStart updateMode={this.updateMode} turn={this.state.turn} />;
    else if (mode === 'greet') return <Greet updateMode={this.updateMode} />;
    else if (mode === 'fight') {
      return <Fight updateMode={this.updateMode}
                    txt={this.state.txt}
                    choices={this.state.choices}
             />
    };
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
  render() {
    return (
      <div className="Game container">

        <Debug  updateMode={this.updateMode} />

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

