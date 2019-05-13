import React from 'react';
import Message from '../Message/Message';
import './Messages.css';

const Messages = ({ playerMsg, pirateMsg }) => {
  return (
    <div id="messages">
      <Message name="Pirate" msg={pirateMsg} />
      <Message name="Player" msg={playerMsg} />
    </div>
  );
};

export default Messages;