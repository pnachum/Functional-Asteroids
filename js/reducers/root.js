// @flow

import { combineReducers } from 'redux';
import movingObjects from './movingObjects';
import isPaused from './isPaused';
import frameCount from './frameCount';
import difficulty from './difficulty';
import mode from './mode';
import isSoundOn from './isSoundOn';
import { RESET } from '../actions';
import type { Action } from '../types/types';

const appReducer = combineReducers({
  movingObjects,
  isPaused,
  frameCount,
  difficulty,
  mode,
  isSoundOn,
});

export default function rootReducer(state: Object, action: Action): Object {
  if (action.type === RESET) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}
