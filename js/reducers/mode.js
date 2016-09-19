// @flow

import { SET_MODE, RESET } from '../actionCreators';
import {
  CLASSIC,
} from '../constants';
import type { Mode } from '../types/index';

const defaultState = CLASSIC;

export default function mode(state: Mode = defaultState, action: Object): Mode {
  switch (action.type) {
    case SET_MODE:
      return action.newMode;
    // Do not reset to default game mode when the game is reset. Maintain the current game mode.
    case RESET:
      return state;
    default:
      return state;
  }
}
