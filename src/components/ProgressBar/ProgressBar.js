import React from 'react';
import './ProgressBar.css';

const ProgressBar = () => {
  const ticks = 20; // TODO this is random for now
  return (
    <div id="progress-bar">
      {/* TODO REMOVE THESE - this is just so I can see the layout right now  */}
      <div className="tick passed"></div>
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
      <div className="tick-pirate"><img src="https://via.placeholder.com/20?text=BOSS" /></div>
    </div>
  );
};

export default ProgressBar;