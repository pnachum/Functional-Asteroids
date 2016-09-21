// @flow

import { createStore } from 'redux';
import rootReducer from './reducers/root';
import draw from './draw';

const store = createStore(rootReducer);

store.subscribe(() => {
  draw(store.getState());
});

export default store;
