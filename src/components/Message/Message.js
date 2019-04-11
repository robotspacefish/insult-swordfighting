import React from 'react';
import './Message.css';

const Message = ({ name, msg }) => <p id="message"><span id="speaker-name">{name}</span>: {msg}</p>;

export default Message;