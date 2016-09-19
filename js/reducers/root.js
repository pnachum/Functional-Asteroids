// @flow

import { combineReducers } from 'redux';
import movingObjects from './movingObjects';
import isPaused from './isPaused';
import frameCount from './frameCount';
import difficulty from './difficulty';
import { RESET } from '../actionCreators';

const appReducer = combineReducers({
  movingObjects,
  isPaused,
  frameCount,
  difficulty,
});

export default function rootReducer(state: Object, action: Object): Object {
  if (action.type === RESET) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}
