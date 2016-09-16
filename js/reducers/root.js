import { combineReducers } from 'redux';
import movingObjects from './movingObjects';
import isPaused from './isPaused';

const root = combineReducers({
  movingObjects,
  isPaused,
});

export default root;
