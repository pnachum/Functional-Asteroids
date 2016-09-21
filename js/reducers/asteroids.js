// @flow

import newPosition from '../utils/newPosition';
import { MOVE } from '../actions';
import type { Asteroid, Action } from '../types/index';

const defaultState = [];

export default function asteroids(state: Asteroid[] = defaultState, action: Action): Asteroid[] {
  switch (action.type) {
    case MOVE:
      return state.map(asteroid => ({
        ...asteroid,
        pos: newPosition(asteroid),
      }));
    default:
      return state;
  }
}
