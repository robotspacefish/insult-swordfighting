import React from 'react';
import './Scroll.css';

const Scroll = (props) => {
  return (
    <div style={{ overflowY: 'scroll' }}>
      {props.children}
    </div>
  );
};

export default Scroll;