// @flow

import { NEW_FRAME } from '../actionCreators';

export default function frameCount(state: number = 0, action: Object): number {
  switch (action.type) {
    case NEW_FRAME:
      return state + 1;
    default:
      return state;
  }
}
