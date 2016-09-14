import { combineReducers } from 'redux';
import { MOVE, ADD_ASTEROID, ADD_RANDOM_ASTEROIDS } from './action_creators';
import mapToScreen from '../utils/mapToScreen';
import randomAsteroid from '../utils/randomAsteroid';
import { times } from 'lodash';
import { DIMENSION } from '../constants';

function asteroids(state = [], action) {
  switch (action.type) {
    case MOVE:
      return state.map(ast => asteroid(ast, action));
    case ADD_RANDOM_ASTEROIDS:
      const newAsteroids = times(action.numAsteroids, () => randomAsteroid(DIMENSION, DIMENSION));
      return state.concat(newAsteroids);
    default:
      return state;
  }
}

function asteroid(state, action) {
  switch (action.type) {
    case MOVE:
      const newPos = state.pos.map((d, i) => d + state.vel[i]);
      const mappedPos = mapToScreen(newPos, state.radius);
      return {...state, pos: mappedPos };
    default:
      return state;
  }
}

const asteroidsApp = combineReducers({
  asteroids,
});

export default asteroidsApp;
