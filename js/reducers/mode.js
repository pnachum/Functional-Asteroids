// @flow

import { SET_MODE, RESET } from '../actions';
import { DEFAULT_MODE } from '../constants';
import type { Mode, Action } from '../types/index';

const defaultState = DEFAULT_MODE;

export default function mode(state: Mode = defaultState, action: Action): Mode {
  switch (action.type) {
    case SET_MODE:
      if (action.payload == null) {
        return state;
      }
      return action.payload;
    // Maintain the previous mode when the game resets
    case RESET:
      if (action.payload == null) {
        return state;
      }
      return action.payload;
    default:
      return state;
  }
}
