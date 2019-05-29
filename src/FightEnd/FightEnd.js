import React, { Component } from 'react'
import './FightEnd.css';

export default class FightEnd extends Component {
  static defaultProps = { modeToSet : 'fightStart'};
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * @desc handle 'Continue' button click
   * run functions to set up the next round
   */
  handleClick() {
    this.props.initNextRound();
    this.props.updateMode(this.props.modeToSet);
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
