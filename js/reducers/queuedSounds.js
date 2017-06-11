// @flow

import { MOVE, SHOOT } from '../actions';
import type { Sound } from '../types/enums';
import type { Action } from '../types/types';

const defaultState: Sound[] = [];

export default function queuedSounds(
  state: Sound[] = defaultState,
  action: Action,
): Sound[] {
  switch (action.type) {
    case MOVE:
      return defaultState;
    case SHOOT: {
      const { mode } = action.payload;
      // Disable shooting in DODGEBALL mode
      if (mode === 'DODGEBALL') {
        return state;
      }
      return [...state, 'LASER'];
    }
    default:
      return state;
  }
}
