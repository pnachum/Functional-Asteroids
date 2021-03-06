// @flow

import { random, sample } from 'lodash';
import {
  SETTINGS,
  FRAMES_PER_SECOND,
  DIMENSION,
} from '../constants';
import { MOVE } from '../actions';
import { makePair } from '../utils/tupleMap';
import type { Powerup, Action } from '../types/types';
import type { Mode } from '../types/enums';

function newPowerup(mode: Mode, lives: number, bombs: number): Powerup {
  // Do not give more lives if current lives >= 2
  // Do not give more bombs if current bombs >= 2
  const possiblePowerups = SETTINGS.modes.powerups[mode];
  const options = possiblePowerups.filter(powerupType => {
    if (powerupType === 'LIFE' && lives >= 2) {
      return false;
    }
    if (powerupType === 'BOMB' && bombs >= 2) {
      return false;
    }
    return true;
  });
  return {
    pos: makePair(() => random(0, DIMENSION)),
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
    case MOVE: {
      const { frameCount, mode, lives, bombs } = action.payload;
      // No powerups in DODGEBALL
      if (mode === 'DODGEBALL') {
        return state;
      }
      const elapsedSeconds = frameCount / FRAMES_PER_SECOND;
      if (frameCount !== 0 && elapsedSeconds % timeInterval[mode] === 0) {
        return [...state, newPowerup(mode, lives, bombs)];
      }
      return state;
    }
    default:
      return state;
  }
}
