import { times } from 'lodash';
import movingObject from './movingObject';
import randomAsteroid from '../utils/randomAsteroid';
import { DIMENSION } from '../constants';
import { MOVE, ADD_RANDOM_ASTEROIDS } from '../actionCreators';

export default function asteroids(state = [], action) {
  switch (action.type) {
    case MOVE:
      return state.map(asteroid => movingObject(asteroid, action));
    case ADD_RANDOM_ASTEROIDS:
      const newAsteroids = times(action.numAsteroids, () => randomAsteroid(DIMENSION, DIMENSION));
      return state.concat(newAsteroids);
    default:
      return state;
  }
}
