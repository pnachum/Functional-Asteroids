import { MOVE, SHOOT } from '../actions';
import { Sound, Mode } from '../constants';
import type { Action } from '../types/index';

const defaultState = [];

export default function queuedSounds(state: Sound[] = defaultState, action: Action): Sound[] {
  switch (action.type) {
    case MOVE:
      return defaultState;
    case SHOOT: {
      if (action.payload == null) {
        return state;
      }
      const { mode } = action.payload;
      // Disable shooting in DODGEBALL mode
      if (mode === Mode.DODGEBALL) {
        return state;
      }
      return [...state, Sound.LASER];
    }
    default:
      return state;
  }
}
