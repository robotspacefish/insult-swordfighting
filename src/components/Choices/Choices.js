import React from 'react';
import './Choices.css';

const Choices = ({ choices, handleSelected }) => {
  return (
    <div id="player-choices">
      {
        // TODO button text should be insult or comeback
        choices.map(choice => <button onClick={() => handleSelected(choice)}><div className="hovered-choice"></div>{choice}</button>)
      }
    </div>
  )
}

export default Choices;