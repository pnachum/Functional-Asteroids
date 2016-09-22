// @flow

import React from 'react';

export default function Instructions() {
  return (
    <div id="instructions">
      <div id="controls">
        <p>Controls: </p>
        <ul>
          <li>
            <strong>Rotate ship: </strong>Left/Right arrows
          </li>

          <li>
            <strong>Move ship: </strong>Up arrow
          </li>

          <li>
            <strong>Shoot: </strong>Space bar
          </li>

          <li><strong>Pause: </strong>P</li>

          <li><strong>Bomb: </strong>B</li>
        </ul>
      </div>

      <div id="powerups">
        <p>Powerups: </p>
        <ul id="powerups">
          <li id="green" className="powerup-description">
            Increase score multiplier
          </li>

          <li id="blue" className="powerup-description">
            Extra life
          </li>

          <li id="red" className="powerup-description">
            Gun upgrade
          </li>

          <li id="orange" className="powerup-description">
            Extra bomb
          </li>
        </ul>
      </div>
    </div>
  );
}
