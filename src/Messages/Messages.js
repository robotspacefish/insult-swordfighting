import React from 'react';
import Message from '../Message/Message';
import './Messages.css';

const Messages = ({ txt }) => {
  return (
    <div id="messages">
      <Message name="Player" msg={txt.playerMsg} />
      <Message name="Pirate" msg={txt.pirateMsg} />
    </div>
  );
};

export default Messages;