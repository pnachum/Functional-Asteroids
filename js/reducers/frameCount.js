// @flow

import { NEW_FRAME } from '../actionCreators';
import type { Action } from '../types/index';

const defaultState = 0;

export default function frameCount(state: number = defaultState, action: Action): number {
  switch (action.type) {
    case NEW_FRAME:
      return state + 1;
    default:
      return state;
  }
}
