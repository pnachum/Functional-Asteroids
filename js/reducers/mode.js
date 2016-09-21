// @flow

import { SET_MODE } from '../actions';
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
    default:
      return state;
  }
}
