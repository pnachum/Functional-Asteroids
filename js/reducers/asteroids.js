// @flow

import newPosition from '../utils/newPosition';
import { MOVE } from '../actionCreators';
import type { Asteroid } from '../types/index';

const defaultState = [];

export default function asteroids(state: Asteroid[] = defaultState, action: Object): Asteroid[] {
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
