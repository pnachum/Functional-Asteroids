// @flow

import { TOGGLE_PAUSE } from '../actions';
import type { Action } from '../types/index';

const defaultState: boolean = false;

export default function isPaused(state: boolean = defaultState, action: Action): boolean {
  switch (action.type) {
    case TOGGLE_PAUSE:
      return !state;
    default:
      return state;
  }
}
