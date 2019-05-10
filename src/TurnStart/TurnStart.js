import React, { Component } from 'react'
import './TurnStart.css';

export default class TurnStart extends Component {
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
      <div className="TurnStart container">
        <h1>{this.props.turn} Start</h1>
      </div>
    )
  }
}
