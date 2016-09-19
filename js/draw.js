// @flow

import { compact, flatten, times } from 'lodash';
import { SETTINGS, FRAMES_PER_SECOND } from './constants';
import { getRotateablePosition } from './utils/math';
import {
  drawCircleInGame,
  drawCircleInUI,
  drawTextInGame,
  drawTextInUI,
  clear,
} from './utils/canvas';
import type {
  Asteroid,
  Ship,
  Bullet,
  Debris,
  DrawableCircle,
} from './types/index';

// Convert an asteroid's state into the data needed to draw it.
function asteroidDrawInfo({ pos, radius }: Asteroid): DrawableCircle {
  const {
    asteroids: {
      color,
    },
  } = SETTINGS;

  return {
    pos,
    radius,
    color,
  };
}

// Convert a ship's state into the data needed to draw its body.
function shipBodyDrawInfo({ pos }: Ship): DrawableCircle {
  const {
    ship: {
      color,
      radius,
    },
  } = SETTINGS;
  return {
    color,
    pos,
    radius,
  };
}

// Convert a ship's state into the data needed to draw its turret.
function turretDrawInfo({ pos, degrees }: Ship): DrawableCircle {
  const {
    ship: {
      radius: shipRadius,
      color,
      turretRadius,
    },
  } = SETTINGS;
  return {
    pos: getRotateablePosition(shipRadius, pos, degrees),
    radius: turretRadius,
    color,
  };
}

// Convert a ship's state into the data needed to draw its thruster
function thrusterDrawInfo({ isThrusting, pos, degrees }: Ship): ?DrawableCircle {
  const {
    ship: {
      radius: shipRadius,
      thrusterColor,
      thrusterRadius,
    },
  } = SETTINGS;
  if (isThrusting) {
    return {
      color: thrusterColor,
      // The thruster is behind the ship, so add 180 to its degrees
      pos: getRotateablePosition(shipRadius, pos, degrees + 180),
      radius: thrusterRadius,
    };
  }
  return null;
}

function shipDrawInfo(ship: Ship): DrawableCircle[] {
  return compact([
    shipBodyDrawInfo(ship),
    turretDrawInfo(ship),
    thrusterDrawInfo(ship),
  ]);
}

function bulletDrawInfo({ pos }: Bullet): DrawableCircle {
  const {
    bullets: {
      radius,
      color,
    },
  } = SETTINGS;
  return {
    color,
    radius,
    pos,
  };
}

function debrisDrawInfo({ pos }: Debris): DrawableCircle {
  const {
    asteroids: {
      color,
      minimumRadius,
    },
    debris: {
      number,
    },
  } = SETTINGS;
  const radius = minimumRadius / number;
  return {
    color,
    radius,
    pos,
  };
}

function drawPause() {
  drawTextInGame({
    text: 'Paused',
    size: 20,
    pos: [205, 270],
    color: 'white',
  });
}

function drawScore(score: number) {
  drawTextInUI({
    text: `Score: ${score}`,
    size: 20,
    pos: [5, 30],
    color: 'black',
  });
}

function drawLives(lives: number) {
  const shipDrawInfos = times(lives, i => (
    shipDrawInfo({
      pos: [20 + (25 * i), 90],
      vel: [0, 0],
      degrees: 90,
      isThrusting: false,
    })
  ));
  flatten(shipDrawInfos).forEach(drawCircleInUI);
}

function drawTime(frameCount: number) {
  const seconds = Math.floor(frameCount / FRAMES_PER_SECOND);
  drawTextInUI({
    text: `Time: ${seconds}`,
    size: 20,
    pos: [5, 160],
    color: 'black',
  });
}

export default function draw({
  movingObjects,
  isPaused,
  frameCount,
}: {
  movingObjects: {
    asteroids: Asteroid[],
    ship: Ship,
    bullets: Bullet[],
    debris: Debris[],
    score: number,
    lives: number,
  },
  isPaused: boolean,
  frameCount: number,
}) {
  const { asteroids, ship, bullets, debris, score, lives } = movingObjects;
  clear();
  const drawableInfos: DrawableCircle[] = [
    ...asteroids.map(asteroidDrawInfo),
    ...bullets.map(bulletDrawInfo),
    ...debris.map(debrisDrawInfo),
    ...shipDrawInfo(ship),
  ];
  drawableInfos.forEach(drawCircleInGame);

  if (isPaused) {
    drawPause();
  }
  drawScore(score);
  drawLives(lives);
  drawTime(frameCount);
}
