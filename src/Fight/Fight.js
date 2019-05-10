import React, { Component } from 'react'
import Images from '../Images/Images';
import Messages from '../Messages/Messages';
import Choices from '../Choices/Choices';
import Scroll from '../Scroll/Scroll';
import knownInsults from '../assets/knownInsults.js';
import allInsults from '../assets/insults.js';

export default class Fight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      knownInsults: knownInsults,
      allInsults: allInsults,
      choices: [...knownInsults.insults], // starts as insults
      currentChoice: '',
      turnType: 'insult',
      txt: {
        playerMsg: 'playerMsg',
        pirateMsg: 'pirateMsg'
      },
    };
    this.updateTurn = this.updateTurn.bind(this);
  }

  updateTurn(choice) {
    // TODO
    this.props.updateTurnType();
    this.props.updateTurn();
  }

  render() {
    return (
      <div className="Fight container">
        <Images />
        <Messages
           txt={this.state.txt}
         />
         <Scroll>
          <Choices
             choices={this.state.choices}
             updateTurn={this.updateTurn}
          />
        </Scroll>
      </div>
    )
  }
}

// const turn = () => {
//   let insults = [...knownInsults.insults];
//   let comebacks = [...knownInsults.comebacks]

//   displayPlayerInsultChoices(turnType === 'insults' ? insults : comebacks);
// };

// const displayPlayerInsultChoices = (choices => choices.map(choice => ));