// @flow

import key from 'keymaster';
import {
  move,
  thrustShip,
  rotateShip,
  stopThrustingShip,
  shoot,
  togglePause,
  newFrame,
  reset,
} from './actions';
import { FRAMES_PER_SECOND } from './constants';
import { initContext } from './utils/canvas';
import store from './store';

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

function gameOver() {
  stop();
  if (confirm('Game over! Would you like to play again?')) {
    store.dispatch(reset());
    start();
  }
}

function step() {
  const { frameCount, difficulty, movingObjects } = store.getState();
  store.dispatch(newFrame(frameCount));
  store.dispatch(move(difficulty));
  keyPressListener();
  if (movingObjects.lives < 0) {
    gameOver();
  }
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

export default function beginGame(
  gameContext: CanvasRenderingContext2D,
  uiContext: CanvasRenderingContext2D
) {
  initContext(gameContext, uiContext);
  bindKeyHandlers();
  start();
}
