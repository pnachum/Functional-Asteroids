// @flow

import { MOVE } from '../actions';
import type { Action } from '../types/types';

const defaultState: number = 0;

export default function frameCount(state: number = defaultState, action: Action): number {
  switch (action.type) {
    case MOVE:
      return state + 1;
    default:
      return state;
  }
}
