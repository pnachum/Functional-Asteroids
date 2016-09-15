import { compact } from 'lodash';
import { SETTINGS } from './constants';
import { getRotateablePosition } from './utils/math';
import { drawObject, drawText } from './utils/canvas';

// Convert an asteroid's state into the data needed to draw it.
function asteroidDrawInfo({ pos, radius }) {
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
function shipDrawInfo({ pos }) {
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
function turretDrawInfo({ pos, degrees }) {
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
function thrusterDrawInfo({ isThrusting, pos, degrees }) {
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

function bulletDrawInfo({ pos }) {
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

function drawPause() {
  drawText({
    text: 'Paused',
    size: 20,
    pos: [205, 270],
    color: 'white',
  });
}

export default function draw({ asteroids, ship, bullets, isPaused }) {
  const drawableInfos = [
    ...asteroids.map(asteroidDrawInfo),
    ...bullets.map(bulletDrawInfo),
    shipDrawInfo(ship),
    turretDrawInfo(ship),
    thrusterDrawInfo(ship),
  ];
  compact(drawableInfos).forEach(drawObject);

  if (isPaused) {
    drawPause();
  }

}
