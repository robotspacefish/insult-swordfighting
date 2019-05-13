import React, { Component } from 'react'
import './FightEnd.css';

export default class FightEnd extends Component {
  static defaultProps = { modeToSet : 'roundStart'};
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.updateMode(this.props.modeToSet);
    // TODO fadeout effect
  }
  render() {
    return (
      <div className="FightEnd container">
        <p>This component displays who won the previous round before starting the next round. </p>
        <button onClick={this.handleClick}>Continue</button>
      </div>
    )
  }
}
