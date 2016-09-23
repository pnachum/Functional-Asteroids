// @flow

import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root';

const middleWare = [];

const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;
