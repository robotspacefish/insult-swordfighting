import React from 'react';

const Fight = ()=> {
  const turn = () => {
    let insults = [...knownInsults.insults];
    let comebacks = [...knownInsults.comebacks]

    displayPlayerInsultChoices(turnType === 'insults' ? insults : comebacks);
  };

  const displayPlayerInsultChoices = (choices => choices.map(choice => ));
};

export default Fight;