import { combineReducers } from 'redux';
import { MOVE, ADD_ASTEROID } from './action_creators';
import mapToScreen from '../utils/mapToScreen';

function asteroids(state = [], action) {
  switch (action.type) {
    case MOVE:
      return state.map(ast => asteroid(ast, action));
    case ADD_ASTEROID:
      return [...state, action.asteroid];
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
