// @flow

import { compact, flatten, times } from 'lodash';
import { SETTINGS, FRAMES_PER_SECOND, NAME_FOR_MODE, COLOR_FOR_POWERUP } from './constants';
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
  Powerup,
} from './types/index';
import { isShipInvincible } from './utils/durationChecks';

let shipDrawFrame = 0;

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

function shipDrawInfo(ship: Ship, frameCount: ?number = null): DrawableCircle[] {
  const isInvincible: boolean = frameCount != null && isShipInvincible(ship, frameCount);
  const drawInfos = compact([
    shipBodyDrawInfo(ship),
    turretDrawInfo(ship),
    thrusterDrawInfo(ship),
  ]);

  // Make the ship flash while it's invincible;
  if (isInvincible) {
    shipDrawFrame = (shipDrawFrame + 1) % 20;
    if (shipDrawFrame < 10) {
      return drawInfos;
    }
    return [];
  }
  return drawInfos;
}

function bulletDrawInfo({ pos, radius }: Bullet): DrawableCircle {
  const {
    bullets: {
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

function powerupDrawInfo({ pos, type }: Powerup): DrawableCircle {
  const {
    powerups: {
      radius,
    },
  } = SETTINGS;
  // Make flow happy to account for Map#get returning undefined
  const color = COLOR_FOR_POWERUP.get(type);
  if (color == null) {
    throw new Error(`No color for type ${type}`);
  }
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
  const text = NAME_FOR_MODE.get(mode);
  // Make flow happy to account for Map#get returning undefined
  if (text == null) {
    throw new Error(`No name for mode ${mode}`);
  }
  drawUIText({
    text: `Mode: ${text}`,
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
    powerups: Powerup[],
    score: number,
    lives: number,
    multiplier: number,
  },
  isPaused: boolean,
  frameCount: number,
  mode: Mode,
}) {
  const { asteroids, ship, bullets, debris, score, lives, multiplier, powerups } = movingObjects;
  clear();
  const drawableInfos: DrawableCircle[] = [
    ...asteroids.map(asteroidDrawInfo),
    ...bullets.map(bulletDrawInfo),
    ...debris.map(debrisDrawInfo),
    ...powerups.map(powerupDrawInfo),
    ...shipDrawInfo(ship, frameCount),
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
