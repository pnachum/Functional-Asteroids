import { createStore } from 'redux';
import asteroidsApp from './reducers';
import { move, addAsteroid, addRandomAsteroids } from './action_creators';
import { DIMENSION, FRAMES_PER_SECOND, SETTINGS } from '../constants';
import { initContext, clear, drawObject } from '../utils/canvas';

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
}

function draw() {
  const { asteroids } = store.getState();
  clear();
  asteroids.forEach(asteroid => {
    drawObject({
      color: SETTINGS.asteroids.color,
      pos: asteroid.pos,
      radius: asteroid.radius,
    });
  });
}

let unsubscribe = store.subscribe(draw);
