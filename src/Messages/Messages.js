import React from 'react';
import Message from '../Message/Message';
import './Messages.css';

const Messages = ({ topSpeaker, bottomSpeaker, topMsg, bottomMsg }) => {
  return (
    <div className="Messages">
      <Message name={topSpeaker} msg={topMsg} />
      <Message name={bottomSpeaker} msg={bottomMsg} />
    </div>
  );
};

export default Messages;