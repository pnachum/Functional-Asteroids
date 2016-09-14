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
  // Draw asteroids
  asteroids.forEach(asteroid => {
    drawObject({
      color: SETTINGS.asteroids.color,
      pos: asteroid.pos,
      radius: asteroid.radius,
    });
  });

  // Draw ship
  const shipRadius = SETTINGS.ship.radius;
  const shipColor = SETTINGS.ship.color;
  drawObject({
    color: shipColor,
    pos: ship.pos,
    radius: shipRadius,
  });

  // Draw turret
  drawObject({
    color: shipColor,
    pos: getRotateablePosition(shipRadius, ship.pos, ship.degrees),
    radius: SETTINGS.ship.turretRadius,
  });

  // Draw thruster
  if (ship.isThrusting) {
    drawObject({
      color: SETTINGS.ship.thrusterColor,
      // The thruster is behind the ship, so add 180 to its degrees
      pos: getRotateablePosition(shipRadius, ship.pos, ship.degrees + 180),
      radius: SETTINGS.ship.thrusterRadius,
    });
  }
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

let unsubscribe = store.subscribe(draw);
