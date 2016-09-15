import movingObject from './movingObject';
import randomAsteroids from '../utils/randomAsteroids';
import { DIMENSION } from '../constants';
import { MOVE, ADD_RANDOM_ASTEROIDS } from '../actionCreators';

// state is array of objects with { pos, vel, radius }
export default function asteroids(state = [], action) {
  switch (action.type) {
    case MOVE:
      return state.map(asteroid => movingObject(asteroid, action));
    case ADD_RANDOM_ASTEROIDS:
      const newAsteroids = randomAsteroids(action.numAsteroids, DIMENSION);
      return state.concat(newAsteroids);
    default:
      return state;
  }
}
