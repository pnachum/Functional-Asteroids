import { createStore } from 'redux';
import asteroidsApp from './reducers';
import {
  move,
  addRandomAsteroids,
  thrustShip,
  rotateShip,
  stopThrustingShip,
} from './action_creators';
import { DIMENSION, FRAMES_PER_SECOND, SETTINGS } from '../constants';
import { initContext, clear, drawObject } from '../utils/canvas';
import key from 'keymaster';
import { getRotateablePosition } from '../utils/math';
import draw from '../draw';

let store = createStore(asteroidsApp);
let intervalId;

export default function start(ctx) {
  initContext(ctx);
  initGame();
}

function initGame() {
  store.dispatch(addRandomAsteroids(SETTINGS.asteroids.startingNumber));
  const interval = Math.floor(1000 / FRAMES_PER_SECOND);
  intervalId = setInterval(step, interval);
}

function step() {
  store.dispatch(move());
  keyPressListener();
}

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

let unsubscribe = store.subscribe(() => {
  clear();
  draw(store.getState());
});
