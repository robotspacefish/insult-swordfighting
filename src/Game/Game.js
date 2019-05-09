import React, { Component } from 'react'
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
      mode: "init",
      knownInsults: Object.assign({}, this.props.knownInsults),
      choices: [...this.props.knownInsults.insults],
      currentChoice: '',
      turnType: '',
      txt: {
        playerMsg: 'playerMsg',
        pirateMsg: 'pirateMsg'
      }
    }
  }

  handleChangeMode = (mode) => this.setState({ mode });

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

  render() {
    let mode = this.state.mode;
    return (
      <div className="Game">
        {/* <div className="debug">
          <button onClick={() => {
            this.toggleTurnType();
            this.initPlayerChoices();
          }}>[Debug] Toggle Turn Type</button>

          <button onClick={() => this.handleChangeMode('game')}>[Debug] Game Mode</button>
          <button onClick={() => this.handleChangeMode('instructions')}>[Debug] Instructions Mode</button>
        </div> */}

        {/* {mode === 'init' &&
          {/* <Game
            choices={this.state.choices}
            handleSelected={this.handleSelected}
            txt={this.state.txt}
          /> */}
        } */}
        <canvas ref="canvas" width={800} height="400"> </canvas>
        <ProgressBar />
      </div>
    )
  }
}

//  <Images />
//         <Messages
//           txt={txt}
//         />
//         <Scroll>
//           <Choices
//             choices={this.choices}
//             handleSelected={this.handleSelected}
//           />
//         </Scroll>
//