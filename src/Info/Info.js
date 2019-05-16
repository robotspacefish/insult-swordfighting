import React, { Component } from 'react'
import './Info.css';

export default class Info extends Component {
  render() {
    return (
      <div className="Info container">
        <p>Insult Swordfighting is a mechanic from the <span><a href="https://en.wikipedia.org/wiki/Monkey_Island_(series)" target="_blank" rel="noopener noreferrer">Monkey Island</a></span> point-and-click adventure game series, created by Ron Gilbert and developed by LucasArts. All of the insults/comebacks here are from The Secret of Monkey Island, written by Ron Gilbert, Dave Grossman, and Tim Schafer.</p>
        <p>I re-created my version of the mechanic with React as a learning experience and for fun. </p>
        <p><a href="https://github.com/robotspacefish" target="_blank" rel="noopener noreferrer">robotspacefish</a>!</p>
      </div>
    )
  }
}
