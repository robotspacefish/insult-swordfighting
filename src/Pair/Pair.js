import React, { Component } from 'react'
import './Pair.css';

export default class Pair extends Component {
  render() {
    return (
      <li className="Pair">
        <ul>
          <li>
            <span>I:</span> {this.props.pair.insult}
          </li>
          <li>
            <span>C:</span> {this.props.pair.comeback}
          </li>
        </ul>
      </li>
    )
  }
}
