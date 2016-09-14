import { createStore } from 'redux';
import asteroidsApp from './reducers';
import {
  move,
  addRandomAsteroids,
  thrustShip,
  rotateShip,
} from './action_creators';
import { DIMENSION, FRAMES_PER_SECOND, SETTINGS } from '../constants';
import { initContext, clear, drawObject } from '../utils/canvas';
import key from 'keymaster';

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

function draw() {
  const { asteroids, ship } = store.getState();
  clear();
  asteroids.forEach(asteroid => {
    drawObject({
      color: SETTINGS.asteroids.color,
      pos: asteroid.pos,
      radius: asteroid.radius,
    });
  });
  drawObject({
    color: SETTINGS.ship.color,
    pos: ship.pos,
    radius: SETTINGS.ship.radius,
  });

}

function keyPressListener() {

  if (key.isPressed('up')) {
    store.dispatch(thrustShip());
  }

  if (key.isPressed('left')) {
    store.dispatch(rotateShip(1));
  }

  if (key.isPressed('right')) {
    store.dispatch(rotateShip(-1));
  }
}

let unsubscribe = store.subscribe(draw);
