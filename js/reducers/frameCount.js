// @flow

import { NEW_FRAME } from '../actionCreators';

const defaultState = 0;

export default function frameCount(state: number = defaultState, action: Object): number {
  switch (action.type) {
    case NEW_FRAME:
      return state + 1;
    default:
      return state;
  }
}
