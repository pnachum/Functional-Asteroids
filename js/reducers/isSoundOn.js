import { TOGGLE_SOUND, RESET } from '../actions';
import type { Action } from '../types/index';

export default function isSoundOn(state: boolean = true, action: Action): boolean {
  switch (action.type) {
    case TOGGLE_SOUND:
      return !state;
    case RESET:
      return action.payload.isSoundOn;
    default:
      return state;
  }
}
