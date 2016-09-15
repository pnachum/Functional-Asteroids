import { createStore } from 'redux';
import key from 'keymaster';
import asteroidsApp from './reducers';
import {
  move,
  addRandomAsteroids,
  thrustShip,
  rotateShip,
  stopThrustingShip,
} from './action_creators';
import { FRAMES_PER_SECOND, SETTINGS } from '../constants';
import { initContext, clear } from '../utils/canvas';
import draw from '../draw';

const store = createStore(asteroidsApp);
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

function step() {
  store.dispatch(move());
  keyPressListener();
}

function initGame() {
  store.dispatch(addRandomAsteroids(SETTINGS.asteroids.startingNumber));
  const interval = Math.floor(1000 / FRAMES_PER_SECOND);
  intervalId = setInterval(step, interval);
}

export default function start(ctx) {
  initContext(ctx);
  initGame();
}

let unsubscribe = store.subscribe(() => {
  clear();
  draw(store.getState());
});
