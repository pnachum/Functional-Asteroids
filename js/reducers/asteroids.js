// @flow

import newPosition from '../utils/newPosition';
import { MOVE, ADD_INITIAL_ASTEROIDS, RESET } from '../actions';
import type { Asteroid, Action } from '../types/index';
import { SETTINGS } from '../constants';
import randomAsteroids from '../utils/randomAsteroids';

const defaultState: Asteroid[] = [];

export default function asteroids(state: Asteroid[] = defaultState, action: Action): Asteroid[] {
  switch (action.type) {
    case MOVE:
      return state.map(asteroid => ({
        ...asteroid,
        pos: newPosition(asteroid),
      }));
    case RESET:
    case ADD_INITIAL_ASTEROIDS: {
      if (action.payload == null) {
        return state;
      }
      const num: number = SETTINGS.asteroids.startingNumber[action.payload];
      const radius: number = SETTINGS.asteroids.startingSpawnRadius[action.payload];
      return state.concat(randomAsteroids(num, { radius }));
    }
    default:
      return state;
  }
}
