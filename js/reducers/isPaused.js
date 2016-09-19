// @flow

import { TOGGLE_PAUSE } from '../actionCreators';

const defaultState = false;

export default function isPaused(state: boolean = defaultState, action: Object): boolean {
  switch (action.type) {
    case TOGGLE_PAUSE:
      return !state;
    default:
      return state;
  }
}
