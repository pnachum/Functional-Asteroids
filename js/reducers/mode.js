// @flow

import { SET_MODE, RESET } from '../actions';
import { DEFAULT_MODE } from '../constants';
import type { Mode, Action } from '../types/index';

const defaultState: Mode = DEFAULT_MODE;

export default function mode(state: Mode = defaultState, action: Action): Mode {
  switch (action.type) {
    // Maintain the previous mode when the game resets
    case RESET:
    case SET_MODE:
      if (action.payload == null) {
        return state;
      }
      return action.payload.mode;
    default:
      return state;
  }
}
