import { combineReducers } from 'redux';
import movingObjects from './movingObjects';
import isPaused from './isPaused';
import frameCount from './frameCount';

const root = combineReducers({
  movingObjects,
  isPaused,
  frameCount,
});

export default root;
