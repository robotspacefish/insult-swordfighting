import React from 'react';
import Message from '../Message/Message';
import './Messages.css';

const Messages = ({ playerMsg, pirateMsg, playerTurnType }) => {
  const msgs = () => {
    if (playerTurnType === 'insult') {
      return (
        <div>
          <Message name="Player" msg={playerMsg} />
          <Message name="Pirate" msg={pirateMsg} />
        </div>
      );
    } else {
      return (
        <div>
          <Message name="Pirate" msg={pirateMsg} />
          <Message name="Player" msg={playerMsg} />
        </div>
      );
    }


  }
  return (
    <div className="Messages">
      {msgs()}
    </div>
  );
};

export default Messages;