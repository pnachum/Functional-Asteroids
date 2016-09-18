// @flow

import { combineReducers } from 'redux';
import movingObjects from './movingObjects';
import isPaused from './isPaused';
import frameCount from './frameCount';
import difficulty from './difficulty';

const root = combineReducers({
  movingObjects,
  isPaused,
  frameCount,
  difficulty,
});

export default root;
