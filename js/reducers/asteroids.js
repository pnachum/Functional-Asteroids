import movingObject from './movingObject';
import randomAsteroids from '../utils/randomAsteroids';
import { DIMENSION, SETTINGS } from '../constants';
import { MOVE, ADD_RANDOM_ASTEROIDS } from '../actionCreators';

// state is array of objects with { pos, vel, radius }
export default function asteroids(state = [], action) {
  const {
    bullets: {
      radius: bulletRadius,
    },
    asteroids: {
      minimumRadius,
    },
  } = SETTINGS;
  switch (action.type) {
    case MOVE:
      const { bullets, ship } = action;
      return state.map(asteroid => movingObject(asteroid, action));
    case ADD_RANDOM_ASTEROIDS:
      return state.concat(randomAsteroids(action.numAsteroids));
    default:
      return state;
  }
}
