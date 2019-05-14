import React, { Component } from 'react'
import './EndExchange.css';

export default class EndExchange extends Component {
  render() {
    let turn = this.props.turnType === 'insult' ? 'player' : 'pirate';
    // let loser = this.props.winner === 'player' ? 'pirate' : 'player';
    let msg = '';
    if (this.props.winner === 'draw') {
      msg = `Draw! ${turn} turn.`
    } else {
      msg = `${this.props.winner} wins the exchange. ${this.props.winner} goes again.`
    }

    return (
      <div className="EndExchange">
        <p>{msg}</p>
      </div>
    )
  }
}
