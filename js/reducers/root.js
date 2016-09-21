// @flow

import { combineReducers } from 'redux';
import movingObjects from './movingObjects';
import isPaused from './isPaused';
import frameCount from './frameCount';
import difficulty from './difficulty';
import mode from './mode';
import { RESET } from '../actions';
import type { Action } from '../types/index';

const appReducer = combineReducers({
  movingObjects,
  isPaused,
  frameCount,
  difficulty,
  mode,
});

export default function rootReducer(state: Object, action: Action): Object {
  if (action.type === RESET) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}
