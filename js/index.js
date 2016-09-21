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
    store.dispatch(reset(store.getState().mode));
    start();
  }
}

function step() {
  const { frameCount, difficulty, movingObjects, mode } = store.getState();
  store.dispatch(newFrame(frameCount, mode));
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
    const {
      movingObjects: {
        ship,
      },
      mode,
    } = store.getState();
    store.dispatch(shoot(ship, mode));
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
  store.dispatch(addInitialAsteroids(store.getState().mode))
  start();
}
