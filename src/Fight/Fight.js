import React, { Component } from 'react'
import Images from '../Images/Images';
import Messages from '../Messages/Messages';
import Choices from '../Choices/Choices';
import Scroll from '../Scroll/Scroll';

export default class Fight extends Component {
  constructor(props) {
    super(props);
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
           txt={this.props.txt}
         />
         <Scroll>
          <Choices
             choices={this.props.choices}
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