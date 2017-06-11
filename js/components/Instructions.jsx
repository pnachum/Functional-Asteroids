// @flow

import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { POWERUP_TYPES, SETTINGS } from '../constants';

const styles = StyleSheet.create({
  container: {
    display: 'inline-block',
    verticalAlign: 'top',
    marginLeft: 20,
  },
  description: {
    fontWeight: 'bold',
  },
});

export default function Instructions() {
  return (
    <div id="instructions" className={css(styles.container)}>
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

          <li><strong>Toggle sound: </strong>M</li>
        </ul>
      </div>

      <div id="powerups">
        <p>Powerups: </p>
        <ul id="powerups">
          {POWERUP_TYPES.map(powerupType => {
            const description = SETTINGS.powerups.description[powerupType];
            const color = SETTINGS.powerups.color[powerupType];
            return (
              <li style={{ color }} key={powerupType} className={css(styles.description)}>
                {description}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
