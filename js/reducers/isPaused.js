// @flow

import { TOGGLE_PAUSE, RESET } from '../actionCreators';

const defaultState = false;

export default function isPaused(state: boolean = defaultState, action: Object): boolean {
  switch (action.type) {
    case TOGGLE_PAUSE:
      return !state;
    case RESET:
      return defaultState;
    default:
      return state;
  }
}
