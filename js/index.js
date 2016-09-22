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
  addInitialAsteroids,
} from './actions';
import { FRAMES_PER_SECOND } from './constants';
import { initContext } from './utils/canvas';
import store from './store';
import draw from './draw';
import getEndMessage from './utils/getEndMessage';

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

function gameOver(hasWon: boolean) {
  const state = store.getState();
  stop();
  const endMessage: string = getEndMessage({
    score: state.movingObjects.score,
    frameCount: state.frameCount,
    mode: state.mode,
    hasWon,
  });
  if (confirm(endMessage)) {
    store.dispatch(reset(state.mode));
    start();
  }
}

function step() {
  const { frameCount, difficulty, movingObjects, mode } = store.getState();
  store.dispatch(newFrame(frameCount, mode, movingObjects.lives));
  store.dispatch(move(difficulty, frameCount));
  keyPressListener();
  if (movingObjects.lives < 0) {
    gameOver(false);
  }
  if (frameCount !== 0 && movingObjects.asteroids.length === 0) {
    gameOver(true);
  }
}

function start() {
  const interval: number = Math.floor(1000 / FRAMES_PER_SECOND);
  intervalId = setInterval(step, interval);
}

function bindKeyHandlers() {
  key('space', () => {
    const {
      movingObjects: {
        ship,
        bulletPowerupStartFrame,
      },
      mode,
      frameCount,
    } = store.getState();
    store.dispatch(shoot(ship, mode, bulletPowerupStartFrame, frameCount));
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

store.subscribe(() => {
  draw(store.getState());
});

export default function beginGame(
  gameContext: CanvasRenderingContext2D,
  uiContext: CanvasRenderingContext2D
) {
  initContext(gameContext, uiContext);
  bindKeyHandlers();
  store.dispatch(addInitialAsteroids(store.getState().mode));
  start();
}
