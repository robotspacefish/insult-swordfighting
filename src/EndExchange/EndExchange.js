import React, { Component } from 'react'
import './EndExchange.css';

export default class EndExchange extends Component {
  render() {
    const turn = this.props.turnType === 'insult' ? 'player' : 'pirate';
    let msg = '';
    if (this.props.winner === 'draw') {
      msg = `Draw! ${turn} turn.`
    } else {
      msg = `${this.props.winner} wins the exchange. ${this.props.winner} goes again.`
    }

    const playerWinClass = this.props.winner === 'player' ?`EndExchange-${this.props.winner}-win` : '';
    return (
      <div className={`EndExchange ${playerWinClass}`}>
        <p>{msg}</p>
      </div>
    )
  }
}
