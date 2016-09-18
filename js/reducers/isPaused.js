// @flow

import { TOGGLE_PAUSE } from '../actionCreators';

// state is a boolean
export default function isPaused(state: boolean = false, action: Object): boolean {
  switch (action.type) {
    case TOGGLE_PAUSE:
      return !state;
    default:
      return state;
  }
}
