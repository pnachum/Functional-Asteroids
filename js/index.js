// @flow

import key from 'keymaster';
import {
  move,
  thrustShip,
  rotateShip,
  stopThrustingShip,
  shoot,
  togglePause,
  reset,
  addInitialAsteroids,
  triggerBomb,
} from './actions';
import { FRAMES_PER_SECOND, BOSS, SUPER_BOSS, GAME_OVER } from './constants';
import { initContext } from './utils/canvas';
import playSounds from './utils/playSounds';
import store from './store';
import draw from './draw';
import getEndMessage from './utils/getEndMessage';
import type { Store } from './types/index';

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
  const {
    movingObjects: {
      score,
    },
    frameCount,
    mode,
    isSoundOn,
  }: Store = store.getState();
  stop();
  if (!hasWon && isSoundOn) {
    playSounds([GAME_OVER]);
  }
  const endMessage: string = getEndMessage({
    score,
    frameCount,
    mode,
    hasWon,
  });
  if (confirm(endMessage)) {
    store.dispatch(reset(mode));
    start();
  }
}

function step() {
  const {
    movingObjects: {
      lives,
      freezePowerupStartFrame,
      bombs,
      asteroids,
    },
    frameCount,
    difficulty,
    mode,
  }: Store = store.getState();
  store.dispatch(move({
    lives,
    freezePowerupStartFrame,
    bombs,
    difficulty,
    frameCount,
    mode,
  }));
  keyPressListener();
  if (lives < 0) {
    gameOver(false);
  }
  const isBossMode: boolean = [BOSS, SUPER_BOSS].includes(mode);
  if (frameCount !== 0 && asteroids.length === 0 && isBossMode) {
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
    }: Store = store.getState();
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

  key('b', () => {
    store.dispatch(triggerBomb());
  });
}

store.subscribe(() => {
  const state = store.getState();
  draw(state);
  if (state.isSoundOn) {
    playSounds(state.movingObjects.queuedSounds);
  }
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
