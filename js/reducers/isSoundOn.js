import { TOGGLE_SOUND } from '../actions';
import type { Action } from '../types/index';

export default function isSoundOn(state: boolean = true, action: Action): boolean {
  switch (action.type) {
    case TOGGLE_SOUND:
      return !state;
    default:
      return state;
  }
}
