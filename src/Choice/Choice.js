import React, { Component } from 'react'
import './Choice.css';

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
      <button className="Choice" onClick={this.handleClick} disabled={this.props.isChoiceMade}>
        <div className="Choice-hovered-choice"></div>
        <div className="Choice-text">{this.props.choice}</div>
      </button>
    )
  }
}
