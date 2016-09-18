// @flow

import { compact } from 'lodash';
import { SETTINGS } from './constants';
import { getRotateablePosition } from './utils/math';
import { drawObject, drawText, clear } from './utils/canvas';
import type { Asteroid, Ship, Bullet, Debris, Drawable } from './types/index';

// Convert an asteroid's state into the data needed to draw it.
function asteroidDrawInfo({ pos, radius }: Asteroid): Drawable {
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

// Convert a ship's state into the data needed to draw it.
function shipDrawInfo({ pos }: Ship): Drawable {
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
function turretDrawInfo({ pos, degrees }: Ship): Drawable {
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
function thrusterDrawInfo({ isThrusting, pos, degrees }: Ship): ?Drawable {
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

function bulletDrawInfo({ pos }: Bullet): Drawable {
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

function debrisDrawInfo({ pos }: Debris): Drawable {
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
  drawText({
    text: 'Paused',
    size: 20,
    pos: [205, 270],
    color: 'white',
  });
}

function drawScore(score: number) {
  drawText({
    text: `Score: ${score}`,
    size: 10,
    pos: [10, 10],
    color: 'white',
  });
}

export default function draw({
  movingObjects,
  isPaused,
}: {
  movingObjects: {
    asteroids: Asteroid[],
    ship: Ship,
    bullets: Bullet[],
    debris: Debris[],
    score: number,
  },
  isPaused: boolean,
}) {
  const { asteroids, ship, bullets, debris, score } = movingObjects;
  clear();
  const drawableInfos: Drawable[] = compact([
    ...asteroids.map(asteroidDrawInfo),
    ...bullets.map(bulletDrawInfo),
    ...debris.map(debrisDrawInfo),
    shipDrawInfo(ship),
    turretDrawInfo(ship),
    thrusterDrawInfo(ship),
  ]);
  drawableInfos.forEach(drawObject);

  if (isPaused) {
    drawPause();
  }
  drawScore(score);
}
