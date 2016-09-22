// @flow

import { TRIGGER_BOMB, SET_MODE, RESET } from '../actions';
import { SETTINGS } from '../constants';
import type { Action } from '../types/index';

const defaultState: number = 0;

export default function bombs(state: number = defaultState, action: Action): number {
  const { startingBombs } = SETTINGS;
  switch (action.type) {
    case TRIGGER_BOMB:
      if (state > 0) {
        return state - 1;
      }
      return state;
    case SET_MODE:
    case RESET:
      if (action.payload == null) {
        return state;
      }
      return startingBombs[action.payload];
    default:
      return state;
  }
}
