import { combineReducers } from 'redux';
import asteroids from './asteroids';
import ship from './ship';
import bullets from './bullets';
import isPaused from './isPaused';

const root = combineReducers({
  asteroids,
  ship,
  bullets,
  isPaused,
});

export default root;
