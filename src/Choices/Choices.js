import React, { Component } from 'react'
import Choice from '../Choice/Choice';
import './Choices.css';

export default class Choices extends Component {
  constructor(props) {
    super(props);
    this.updateChoiceSelection = this.updateChoiceSelection.bind(this);
  }

  updateChoiceSelection(choice) {
    this.props.updateTurn(choice);
  }

  render() {
    return (
      <div id="player-choices" className="Choices container">
        {
          this.props.choices.map(c => (<Choice
                                          choice={c}
                                          key={c}
                                          updateChoiceSelection={this.updateChoiceSelection}
                                      />))
        }
      </div>
    )
  }
}
