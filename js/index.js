// @flow

import { createStore } from 'redux';
import key from 'keymaster';
import rootReducer from './reducers/root';
import {
  move,
  addRandomAsteroids,
  thrustShip,
  rotateShip,
  stopThrustingShip,
  shoot,
  togglePause,
  newFrame,
} from './actionCreators';
import { FRAMES_PER_SECOND, SETTINGS } from './constants';
import { initContext } from './utils/canvas';
import draw from './draw';

const store = createStore(rootReducer);
let intervalId;

function keyPressListener() {
  if (key.isPressed('up')) {
    store.dispatch(thrustShip());
  } else {
    store.dispatch(stopThrustingShip());
  }

  if (key.isPressed('left')) {
    store.dispatch(rotateShip(1));
  }

  if (key.isPressed('right')) {
    store.dispatch(rotateShip(-1));
  }
}

function stop() {
  clearInterval(intervalId);
}

function step() {
  store.dispatch(newFrame(store.getState().frameCount));
  store.dispatch(move());
  keyPressListener();
}

function start() {
  const interval = Math.floor(1000 / FRAMES_PER_SECOND);
  intervalId = setInterval(step, interval);
}

function bindKeyHandlers() {
  key('space', () => {
    const { ship } = store.getState().movingObjects;
    store.dispatch(shoot(ship));
  });

  key('P', () => {
    store.dispatch(togglePause());
    if (store.getState().isPaused) {
      stop();
    } else {
      start();
    }
  });
}

export default function beginGame(ctx: Object) {
  initContext(ctx);
  store.dispatch(addRandomAsteroids(SETTINGS.asteroids.startingNumber));
  bindKeyHandlers();
  start();
}

store.subscribe(() => {
  draw(store.getState());
});
