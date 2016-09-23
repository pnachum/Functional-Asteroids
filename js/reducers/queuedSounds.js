import { MOVE, SHOOT } from '../actions';
import { LASER } from '../constants';
import type { Sound, Action } from '../types/index';

const defaultState = [];

export default function queuedSounds(state: Sound[] = defaultState, action: Action): Sound[] {
  switch (action.type) {
    case MOVE:
      return defaultState;
    case SHOOT:
      return [...state, LASER];
    default:
      return state;
  }
}
