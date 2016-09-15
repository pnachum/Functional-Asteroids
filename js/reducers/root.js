import { combineReducers } from 'redux';
import asteroids from './asteroids';
import ship from './ship';

const root = combineReducers({
  asteroids,
  ship,
});

export default root;
