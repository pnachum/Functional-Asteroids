// @flow

import { compact, flatten, times } from 'lodash';
import {
  SETTINGS,
  FRAMES_PER_SECOND,
} from './constants';
import { getRotateablePosition } from './utils/math';
import {
  drawCircleInGame,
  drawCircleInUI,
  drawTextInGame,
  drawTextInUI,
  drawRectangleInUI,
  clear,
} from './utils/canvas';
import type {
  Asteroid,
  Ship,
  Bullet,
  Debris,
  DrawableCircle,
  Powerup,
  Store,
} from './types/types';
import { isShipInvincible } from './utils/durationChecks';
import { Mode, PowerupType } from './types/enums';

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
  const color = SETTINGS.powerups.color[type];
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
    text: `Score: ${score.toLocaleString()}`,
    pos: [5, 30],
  });
}

function drawLives(lives: number) {
  drawRepeated(lives, i => (
    shipDrawInfo({
      ...SETTINGS.ship.defaultShip,
      pos: [20 + (25 * i), 100],
    })
  ));
}

function drawBombs(bombs: number) {
  drawRepeated(bombs, i => (
    powerupDrawInfo({
      type: PowerupType.BOMB,
      pos: [20 + (25 * i), 130],
    })
  ));
}

function drawRepeated(num: number, drawOne: (i: number) => DrawableCircle | DrawableCircle[]) {
  flatten(times(num, drawOne)).forEach(drawCircleInUI);
}

function drawTime(frameCount: number) {
  const seconds: number = Math.floor(frameCount / FRAMES_PER_SECOND);
  drawUIText({
    text: `Time: ${seconds}`,
    pos: [5, 200],
  });
}

function drawMultiplier(multiplier: number, multiplierBar: number) {
  const outerWidth = 180;
  const outerHeight = 40;
  const borderThickness = 2;
  const innerWidth = outerWidth - (2 * borderThickness);
  const innerHeight = outerHeight - (2 * borderThickness);
  const outerPos = [5, 40];
  const innerPos = outerPos.map(d => d + borderThickness);
  // Draw an outer black rectangle to create the border
  drawRectangleInUI({
    pos: outerPos,
    color: 'black',
    width: outerWidth,
    height: outerHeight,
  });
  // Draw an inner white rectangle to create make it a border
  drawRectangleInUI({
    pos: innerPos,
    color: 'white',
    width: innerWidth,
    height: innerHeight,
  });
  // Fill it up with the green bar
  drawRectangleInUI({
    pos: innerPos,
    color: 'green',
    width: (multiplierBar / 100) * innerWidth,
    height: innerHeight,
  });
  drawUIText({
    text: `x${multiplier}`,
    pos: [outerPos[0] + outerWidth + 15, outerPos[1] + 30],
  });

}

function drawMode(mode: Mode) {
  const text = SETTINGS.modes.name[mode];
  drawUIText({
    text: `Mode: ${text}`,
    pos: [5, 170],
  });
}

export default function draw({
  movingObjects,
  isPaused,
  frameCount,
  mode,
}: Store) {
  const {
    asteroids,
    ship,
    bullets,
    debris,
    score,
    lives,
    multiplier,
    multiplierBar,
    powerups,
    bombs,
  } = movingObjects;
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
  drawBombs(bombs);
  drawTime(frameCount);
  drawMultiplier(multiplier, multiplierBar);
  drawMode(mode);
}
