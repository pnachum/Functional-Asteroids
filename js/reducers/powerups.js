// @flow

import { random, times, sample, without } from 'lodash';
import {
  SETTINGS,
  FRAMES_PER_SECOND,
  DIMENSION,
  POWERUPS_FOR_MODE,
  DODGEBALL,
  LIFE,
} from '../constants';
import { NEW_FRAME } from '../actions';
import type { Powerup, Action, Mode } from '../types/index';

function newPowerup(mode: Mode, lives: number): Powerup {
  // Only give more lives if current lives < 2
  const possiblePowerups = POWERUPS_FOR_MODE.get(mode);
  const options = lives < 2 ? possiblePowerups : without(possiblePowerups, LIFE);
  return {
    pos: times(2, () => random(0, DIMENSION)),
    type: sample(options),
  };
}

const defaultState: Powerup[] = [];

export default function powerups(state: Powerup[] = defaultState, action: Action): Powerup[] {
  const {
    difficulty: {
      timeInterval,
    },
  } = SETTINGS;
  switch (action.type) {
    case NEW_FRAME: {
      if (action.payload == null) {
        return state;
      }
      const { frameCount, mode, lives } = action.payload;
      // No powerups in DODGEBALL
      if (mode === DODGEBALL) {
        return state;
      }
      const elapsedSeconds: number = frameCount / FRAMES_PER_SECOND;
      if (frameCount !== 0 && elapsedSeconds % timeInterval[mode] === 0) {
        return [...state, newPowerup(mode, lives)];
      }
      return state;
    }
    default:
      return state;
  }
}
