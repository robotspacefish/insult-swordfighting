import React from 'react';
import Images from '../Images/Images';
import Message from '../Message/Message';
import Choices from '../Choices/Choices';
import ProgressBar from '../ProgressBar/ProgressBar';
import Scroll from '../Scroll/Scroll';

const Game = ({ knownInsults }) => {
  return (
    <div>
      <Images />
      <Message name="Pirate" msg="I'm shaking. I'm shaking." />
      <Scroll>
        <Choices knownInsults={knownInsults} />
      </Scroll>
      <ProgressBar />
    </div>
  );
};

export default Game;