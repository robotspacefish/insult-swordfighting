import React from 'react';
import './Choices.css';
// import Button from '../Button/Button';

const Choices = ({ knownInsults }) => {
  return (
    <div id="player-choices">
      {
        // TODO button text should be insult or comeback
        knownInsults.map(insult => {
          if (insult.hasOwnProperty('insult')) {
            return <button><div className="hovered-choice"></div>{insult.insult}</button>
          }
        })
      }
    </div>
  )
}

export default Choices;