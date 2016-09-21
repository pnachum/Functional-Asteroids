// @flow

import { compact, flatten, times } from 'lodash';
import { SETTINGS, FRAMES_PER_SECOND, NAME_FOR_MODE } from './constants';
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
  Mode,
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

function drawUIText({ text, pos }: { text: string, pos: [number, number] }) {
  drawTextInUI({
    color: 'black',
    size: 20,
    text,
    pos,
  });
}

function drawScore(score: number) {
  drawUIText({
    text: `Score: ${score}`,
    pos: [5, 30],
  });
}

function drawLives(lives: number) {
  const shipDrawInfos: DrawableCircle[] = flatten(times(lives, i => (
    shipDrawInfo({
      ...SETTINGS.ship.defaultShip,
      pos: [20 + (25 * i), 90],
    })
  )));
  shipDrawInfos.forEach(drawCircleInUI);
}

function drawTime(frameCount: number) {
  const seconds: number = Math.floor(frameCount / FRAMES_PER_SECOND);
  drawUIText({
    text: `Time: ${seconds}`,
    pos: [5, 160],
  });
}

function drawMultiplier(multiplier: number) {
  drawUIText({
    text: `x${multiplier}`,
    pos: [5, 60],
  });
}

function drawMode(mode: Mode) {
  drawUIText({
    text: `Mode: ${NAME_FOR_MODE[mode]}`,
    pos: [5, 130],
  });
}

export default function draw({
  movingObjects,
  isPaused,
  frameCount,
  mode,
}: {
  movingObjects: {
    asteroids: Asteroid[],
    ship: Ship,
    bullets: Bullet[],
    debris: Debris[],
    score: number,
    lives: number,
    multiplier: number,
  },
  isPaused: boolean,
  frameCount: number,
  mode: Mode,
}) {
  const { asteroids, ship, bullets, debris, score, lives, multiplier } = movingObjects;
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
  drawMultiplier(multiplier);
  drawMode(mode);
}
