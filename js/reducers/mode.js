// @flow

import { SET_MODE, RESET } from '../actions';
import {
  CLASSIC,
} from '../constants';
import type { Mode, Action } from '../types/index';

const defaultState = CLASSIC;

export default function mode(state: Mode = defaultState, action: Action): Mode {
  switch (action.type) {
    case SET_MODE:
      if (action.payload == null) {
        return state;
      }
      return action.payload;
    // Do not reset to default game mode when the game is reset. Maintain the current game mode.
    case RESET:
      return state;
    default:
      return state;
  }
}
