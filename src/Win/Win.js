import React, { Component } from 'react'
import './Win.css';

export default class Win extends Component {
  render() {
    return (
      <div className="Win container">
        <h1>You Win!</h1>
        <p>You've learned all the insults and comebacks. You're good enough to fight the Sword Master.</p>
      </div>
    )
  }
}
