import React, { Component } from 'react'
import './FightStart.css';

export default class FightStart extends Component {
  static defaultProps = { modeToSet : 'fight'};

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.props.updateMode(this.props.modeToSet);
    }, 3000);
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }
  render() {
    return (
      <div className="FightStart container">
        <h1>{this.props.turn} Start</h1>
      </div>
    )
  }
}
