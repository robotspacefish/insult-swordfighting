import React, { Component } from 'react'
import './Debug.css';

export default class Debug extends Component {
  render() {
    return (
      <div className="Debug">
        <p>[ Debug ]</p>
        <button onClick={() => this.props.updateMode('title')}>Title Mode</button>
        <button onClick={() => this.props.updateMode('fightStart')}>FightStart Mode</button>
        <button onClick={() => this.props.updateMode('fight')}>Fight Mode</button>
        <button onClick={() => this.props.updateMode('fightEnd')}>FightEnd Mode</button>
        <button onClick={() => this.props.updateMode('win')}>Win Mode</button>
      </div>
    )
  }
}
