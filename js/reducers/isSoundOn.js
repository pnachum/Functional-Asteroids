// @flow

import { TOGGLE_SOUND, RESET } from '../actions';
import type { Action } from '../types/types';

export default function isSoundOn(state: boolean = true, action: Action): boolean {
  switch (action.type) {
    case TOGGLE_SOUND:
      return !state;
    case RESET:
      if (action.payload == null) {
        return state;
      }
      return action.payload.isSoundOn;
    default:
      return state;
  }
}
