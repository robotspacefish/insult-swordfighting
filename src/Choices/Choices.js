import React, { Component } from 'react'
import Choice from '../Choice/Choice';
import './Choices.css';

export default class Choices extends Component {
  constructor(props) {
    super(props);
    this.state = { isChoiceMade: false };
    this.makeChoice = this.makeChoice.bind(this);
  }

  makeChoice(choice) {
    this.setState({ isChoiceMade: true }, () => {
      // re-enable button click after a delay
      setTimeout(() => {
        this.setState({ isChoiceMade: false });
      }, 500);
    });
    this.props.updateRound(choice);
  }

  render() {
    return (
      <div id="player-choices" className="Choices container">
        {
          this.props.choices.map(c => (
            (<Choice
              choice={c}
              key={c}
              makeChoice={this.makeChoice}
              isChoiceMade={this.state.isChoiceMade}
          />)))
        }
      </div>
    )
  }
}
