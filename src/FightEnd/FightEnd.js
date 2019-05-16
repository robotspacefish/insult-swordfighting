import React, { Component } from 'react'
import './FightEnd.css';

export default class FightEnd extends Component {
  static defaultProps = { modeToSet : 'fightStart'};
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.initNextRound();
    this.props.updateMode(this.props.modeToSet);
    // TODO fadeout effect
  }
  render() {
    return (
      <div className="FightEnd container">
        <p>{this.props.winner} wins! </p>
        <button className="btn" onClick={this.handleClick}>Continue</button>
      </div>
    )
  }
}
