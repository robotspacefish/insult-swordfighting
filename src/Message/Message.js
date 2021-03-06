import React from 'react';
import './Message.css';

const Message = ({ name, msg }) => {
  if (msg && msg.length > 0) {
    return <p className={`Message-${name} Message`}><span id="speaker-name">{name}</span>: {msg}</p>
  } else {
    return null;
  }
};

export default Message;