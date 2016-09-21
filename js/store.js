// @flow

import { createStore, applyMiddleware } from 'redux';
import immutableCheckMiddleWare from 'redux-immutable-state-invariant';
import rootReducer from './reducers/root';

const middleWare = [];
middleWare.push(immutableCheckMiddleWare());

const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;
