import React, { Component } from 'react'
import './Debug.css';

export default class Debug extends Component {
  render() {
    return (
      <div className="Debug">
        <p>[ Debug ]</p>
        <button onClick={() => this.props.updateMode('title')}>Title Mode</button>
        <button onClick={() => this.props.updateMode('turnStart')}>TurnStart Mode</button>
        <button onClick={() => this.props.updateMode('fight')}>Fight Mode</button>
      </div>
    )
  }
}
