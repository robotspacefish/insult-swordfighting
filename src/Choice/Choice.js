import React, { Component } from 'react'

export default class Choice extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.makeChoice(this.props.choice);
  }
  render() {
    return (
      <button onClick={this.handleClick} disabled={this.props.isChoiceMade}>
        <div className="hovered-choice"></div>
        {this.props.choice}
      </button>
    )
  }
}
