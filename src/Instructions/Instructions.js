import React from 'react';
import './Instructions.css';

const Instructions = () => {
  return (
    <div className="Instructions container">
      <div className="Instructions-content container">
        <h2>How to Play</h2>
        <p>Each round, you select an insult from the choices. Your "pirate opponent" will comeback and, if it's the correct comeback, it will be their turn to insult you. Then you select a comeback from your choices that matches their insult.</p>
        <p>An insult that receives the incorrect comeback results in a point for the insulter. The first to 2 consecutive points wins the round.</p>
        <p>There are 16 insults and comebacks to learn (not including the nonsense ones like "Boy are you ugly!" and "Oh yeah?").</p>
        <p>Once you learn them all you win!</p>

      </div>
    </div>
  );
};

export default Instructions;