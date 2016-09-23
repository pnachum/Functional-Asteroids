import { MOVE, SHOOT } from '../actions';
import { Sound } from '../constants';
import type { Action } from '../types/index';

const defaultState = [];

export default function queuedSounds(state: Sound[] = defaultState, action: Action): Sound[] {
  switch (action.type) {
    case MOVE:
      return defaultState;
    case SHOOT:
      return [...state, Sound.LASER];
    default:
      return state;
  }
}
