// @flow

import newPosition from '../utils/newPosition';
import { MOVE, ADD_INITIAL_ASTEROIDS, RESET } from '../actions';
import type { Asteroid, Action } from '../types/index';
import { SETTINGS } from '../constants';
import randomAsteroids from '../utils/randomAsteroids';
import { areAsteroidsFrozen } from '../utils/durationChecks';

const defaultState: Asteroid[] = [];

export default function asteroids(state: Asteroid[] = defaultState, action: Action): Asteroid[] {
  switch (action.type) {
    case MOVE: {
      if (action.payload == null) {
        return state;
      }
      const { frameCount, freezePowerupStartFrame } = action.payload;
      const isFrozen = areAsteroidsFrozen(freezePowerupStartFrame, frameCount);
      return state.map(asteroid => ({
        ...asteroid,
        pos: isFrozen ? asteroid.pos : newPosition(asteroid),
      }));
    }
    case RESET:
    case ADD_INITIAL_ASTEROIDS: {
      if (action.payload == null) {
        return state;
      }
      const { mode } = action.payload;
      const num: number = SETTINGS.asteroids.startingNumber[mode];
      const radius: number = SETTINGS.asteroids.startingSpawnRadius[mode];
      return state.concat(randomAsteroids(num, { radius }));
    }
    default:
      return state;
  }
}
