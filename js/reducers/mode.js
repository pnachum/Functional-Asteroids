// @flow

import { SET_MODE, RESET } from '../actions';
import { DEFAULT_MODE } from '../constants';
import type { Action } from '../types/types';
import type { Mode } from '../types/enums';

const defaultState = DEFAULT_MODE;

export default function mode(state: Mode = defaultState, action: Action): Mode {
  switch (action.type) {
    // Maintain the previous mode when the game resets
    case RESET:
    case SET_MODE:
      return action.payload.mode;
    default:
      return state;
  }
}
