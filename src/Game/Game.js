import React, { Component } from 'react'
import Instructions from '../Instructions/Instructions';
import Title from '../Title/Title';
import TurnStart from '../TurnStart/TurnStart';
import Greet from '../Greet/Greet';
// import Instructions from '../Instructions/Instructions';
// import Images from '../Images/Images';
// import Messages from '../Messages/Messages';
// import Choices from '../Choices/Choices';
import ProgressBar from '../ProgressBar/ProgressBar';
// import Scroll from '../Scroll/Scroll';
import knownInsults from '../assets/knownInsults.js';

export default class Game extends Component {
  static defaultProps = {
    knownInsults : knownInsults
  }
  constructor(props) {
    super(props);
    this.state = {
      mode: 'title',
      knownInsults: Object.assign({}, this.props.knownInsults),
      choices: [...this.props.knownInsults.insults], // starts as insults
      currentChoice: '',
      turn: 'player',
      turnType : '',
      txt: {
        playerMsg: 'playerMsg',
        pirateMsg: 'pirateMsg'
      },
      showInstructions : false
    }
    this.setMode = this.setMode.bind(this);
    this.handleShowInstructions = this.handleShowInstructions.bind(this);
  }

  setMode(mode) {
    this.setState({ mode })
  }

  initPlayerChoices = (turnType = this.state.turnType) => {
    let choices = turnType === 'insult' ? [...this.props.knownInsults.insults] : [...this.props.knownInsults.comebacks];
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

  updatePlayerChoices = () => { }

  renderMode() {
    let mode = this.state.mode;
    if (mode === 'title') return <Title setMode={this.setMode} />;
    else if (mode === 'turnStart') return <TurnStart setMode={this.setMode} turn={this.state.turn} />;
    else if (mode === 'greet') return <Greet setMode={this.setMode} />;
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
        {/* <div className="debug">
          <button onClick={() => {
            this.toggleTurnType();
            this.initPlayerChoices();
          }}>[Debug] Toggle Turn Type</button>

          <button onClick={() => this.setMode('game')}>[Debug] Game Mode</button>
          <button onClick={() => this.setMode('instructions')}>[Debug] Instructions Mode</button>
        </div> */}

        {/* {mode === 'init' &&
          {/* <Game
            choices={this.state.choices}
            handleSelected={this.handleSelected}
            txt={this.state.txt}
          /> */}
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

