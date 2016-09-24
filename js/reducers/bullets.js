// @flow

import newPosition from '../utils/newPosition';
import { MOVE, SHOOT } from '../actions';
import { SETTINGS, Mode } from '../constants';
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
        spreadDegrees,
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
      if (mode === Mode.DODGEBALL) {
        return state;
      }
      const isPoweredUp = isBulletPoweredUp(bulletPowerupStartFrame, frameCount);

      // Add three bullet spread when powered up
      const newBullets = (isPoweredUp ? [-1, 0, 1] : [0]).map(k => {
        const modifiedDegrees = degrees + (k * spreadDegrees);
        const position = getRotateablePosition(shipRadius, pos, modifiedDegrees);
        return {
          vel: direction(modifiedDegrees).map(d => d * speed),
          radius: bulletRadius,
          pos: position,
          distance,
          speed,
        };
      });
      return state.concat(newBullets);
    }
    default:
      return state;
  }
}
