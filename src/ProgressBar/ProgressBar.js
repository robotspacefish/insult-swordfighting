
import React, { Component } from 'react'
import './ProgressBar.css';

export default class ProgressBar extends Component {
  renderTicks() {

    // const barWidth = bar.offsetWidth;

  }
  render() {
    const bar = document.getElementById('ProgressBar-bar');

    return (

      <div id="ProgressBar">
        <div id="ProgressBar-bar">
        <canvas></canvas>
          {/* TODO REMOVE THESE - this is just so I can see the layout right now  */}
          {/* <div className="tick passed"></div>
          <div className="tick passed"></div>
          <div className="tick passed"></div>
          <div className="tick passed"></div>
          <div className="tick-pirate" id="tick-gb"><img src="https://via.placeholder.com/20?text=G" /></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick-pirate"><img src="https://via.placeholder.com/20?text=P" /></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick-pirate"><img src="https://via.placeholder.com/20?text=P" /></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick-pirate"><img src="https://via.placeholder.com/20?text=P" /></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick"></div>
          <div className="tick-pirate"><img src="https://via.placeholder.com/20?text=BOSS" /></div> */}
        </div>
        {console.log(bar)}
      </div>
    )
  }
}