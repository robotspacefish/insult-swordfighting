import React, { Component } from 'react'
import './Title.css';

export default class Title extends Component {
  static defaultProps = { modeToSet : 'fightStart'}
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    let title = document.getElementsByClassName('Title')[0];
    title.style.animation = 'fadeout 2500ms'
    setTimeout(() => {
      this.props.updateMode(this.props.modeToSet);
    }, 2000);
  }

  render() {
    return (
      <div className="Title container">
        <h1>Insult <span>Swordfighting</span></h1>
        <h2>Based on the mechanic from The Secret of Monkey Island by Ron Gilbert</h2>
        <p>How many rounds will it take you to become good enough to challenge the Sword Master?</p>
        <button className="Title-start-btn btn" onClick={this.handleClick}>Begin!</button>
      </div>
    )
  }
}
