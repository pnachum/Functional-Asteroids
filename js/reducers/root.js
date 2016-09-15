import { combineReducers } from 'redux';
import asteroids from './asteroids';
import ship from './ship';
import bullets from './bullets';

const root = combineReducers({
  asteroids,
  ship,
  bullets,
});

export default root;
