import React, { Component } from 'react'

export default class Debug extends Component {
  render() {
    return (
      <div className="debug">
        <span style={{ paddingTop: '2px' }}>[ Debug ]</span>
        <button onClick={() => this.props.updateMode('title')}>Title Mode</button>
        <button onClick={() => this.props.updateMode('turnStart')}>TurnStart Mode</button>
        <button onClick={() => this.props.updateMode('fight')}>Fight Mode</button>
      </div>
    )
  }
}
