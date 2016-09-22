// @flow

import newPosition from '../utils/newPosition';
import { MOVE, SHOOT } from '../actions';
import { SETTINGS, DODGEBALL } from '../constants';
import {
  getRotateablePosition,
  direction,
} from '../utils/math';
import { isBulletPoweredUp } from '../utils/durationChecks';
import type { Bullet, Action } from '../types/index';

const defaultState: Bullet[] = [];

function bullet(state: Bullet, action: Action): Bullet {
  switch (action.type) {
    case MOVE: {
      const newPos: [number, number] = newPosition(state);
      return {
        ...state,
        pos: newPos,
        distance: state.distance - state.speed,
      };
    }
    default:
      return state;
  }
}

export default function bullets(state: Bullet[] = defaultState, action: Action): Bullet[] {
  const {
    bullets: {
      speed,
      distance,
      radius: bulletRadius,
    },
    ship: {
      radius: shipRadius,
    },
    powerups: {
      bullet: {
        speedMultiplier,
        radiusMultiplier,
        distanceMultiplier,
      },
    },
  } = SETTINGS;

  switch (action.type) {
    case MOVE:
      return state
        .map(b => bullet(b, action))
        .filter(b => b.distance > 0);
    case SHOOT: {
      if (action.payload == null) {
        return state;
      }
      const {
        ship: {
          pos,
          degrees,
        },
        mode,
        bulletPowerupStartFrame,
        frameCount,
      } = action.payload;
      // Disable shooting in DODGEBALL mode
      if (mode === DODGEBALL) {
        return state;
      }
      const turretPos: [number, number] = getRotateablePosition(shipRadius, pos, degrees);
      const isPoweredUp = isBulletPoweredUp(bulletPowerupStartFrame, frameCount);
      const realSpeed = isPoweredUp ? speed * speedMultiplier : speed;
      const newBullet: Bullet = {
        pos: turretPos,
        vel: direction(degrees).map(d => d * realSpeed),
        distance: isPoweredUp ? distance * distanceMultiplier : distance,
        speed: realSpeed,
        radius: isPoweredUp ? bulletRadius * radiusMultiplier : bulletRadius,
      };
      return [...state, newBullet];
    }
    default:
      return state;
  }
}
