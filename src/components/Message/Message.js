import React from 'react';
import './Message.css';

const Message = ({ name, msg }) => {
  if (name.length > 0 && msg.length> 0) {
    return <p id="message"><span id="speaker-name">{name}</span>: {msg}</p>
  } else {
    return null
  }
};

export default Message;