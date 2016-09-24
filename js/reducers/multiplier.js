// @flow

import { MOVE } from '../actions';
import { FRAMES_PER_SECOND, SETTINGS, Mode } from '../constants';
import type { Action } from '../types/index';

const defaultState = 1;

export default function multiplier(state: number = defaultState, action: Action): number {
  switch (action.type) {
    case MOVE: {
      if (action.payload == null) {
        return state;
      }
      const { frameCount, mode }: { frameCount: number, mode: Mode } = action.payload;
      const elapsedSeconds: number = frameCount / FRAMES_PER_SECOND;
      // Increase multiplier when the difficulty increases
      if (frameCount !== 0 && elapsedSeconds % SETTINGS.difficulty.timeInterval[mode] === 0) {
        return state + 1;
      }
      return state;
    }
    default:
      return state;
  }
}
