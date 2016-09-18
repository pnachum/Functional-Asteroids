// @flow

import newPosition from '../utils/newPosition';
import randomAsteroids from '../utils/randomAsteroids';
import { MOVE, RESET } from '../actionCreators';
import type { Asteroid } from '../types/index';

const defaultState = [];

export default function asteroids(state: Asteroid[] = defaultState, action: Object): Asteroid[] {
  switch (action.type) {
    case MOVE:
      return state.map(asteroid => ({
        ...asteroid,
        pos: newPosition(asteroid),
      }));
    case RESET:
      return defaultState;
    default:
      return state;
  }
}
