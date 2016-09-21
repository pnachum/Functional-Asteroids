// @flow

import { NEW_FRAME } from '../actions';
import type { Action } from '../types/index';

const defaultState: number = 0;

export default function frameCount(state: number = defaultState, action: Action): number {
  switch (action.type) {
    case NEW_FRAME:
      return state + 1;
    default:
      return state;
  }
}
