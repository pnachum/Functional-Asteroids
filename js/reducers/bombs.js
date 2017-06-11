// @flow

import { TRIGGER_BOMB, SET_MODE, RESET } from '../actions';
import { SETTINGS } from '../constants';
import type { Action } from '../types/types';

const defaultState: number = 0;

export default function bombs(state: number = defaultState, action: Action): number {
  const { startingBombs } = SETTINGS;
  switch (action.type) {
    case TRIGGER_BOMB:
      return Math.max(state - 1, 0);
    case SET_MODE:
    case RESET: {
      const { mode } = action.payload;
      return startingBombs[mode];
    }
    default:
      return state;
  }
}
