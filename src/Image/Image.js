import React from 'react';

const Image = ({ text }) => <img className="pirate" src={`https://via.placeholder.com/200x250.png?text=${text}`} />;

export default Image;