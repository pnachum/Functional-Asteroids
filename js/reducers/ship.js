// @flow

import { MOVE, THRUST_SHIP, ROTATE_SHIP, STOP_THRUSTING_SHIP } from '../actions';
import newPosition from '../utils/newPosition';
import computeNewVel from '../utils/computeNewVel';
import { SETTINGS } from '../constants';
import { map } from '../utils/tupleMap';
import type { Ship, Action } from '../types/types';

function airResistedVelocity(oldVel: [number, number], airResistance: number): [number, number] {
  return map(oldVel, (d) => {
    if (d > airResistance) {
      return d - airResistance;
    } else if (d < -airResistance) {
      return d + airResistance;
    }
    return 0;
  });
}

const defaultState = SETTINGS.ship.defaultShip;

export default function ship(state: Ship = defaultState, action: Action): Ship {
  const {
    radius: shipRadius,
    airResistance,
    acceleration,
    maxSpeed,
    turnSpeed,
  } = SETTINGS.ship;
  switch (action.type) {
    case MOVE: {
      const newPos = newPosition({
        ...state,
        radius: shipRadius,
      });
      return {
        ...state,
        pos: newPos,
        vel: airResistedVelocity(state.vel, airResistance),
      };
    }
    case THRUST_SHIP: {
      const vel = computeNewVel(
        state.vel,
        state.degrees,
        acceleration,
        maxSpeed
      );
      return { ...state, isThrusting: true, vel };
    }
    case ROTATE_SHIP: {
      if (action.payload == null) {
        return state;
      }
      const degrees = (state.degrees + (action.payload * turnSpeed)) % 360;
      return { ...state, degrees };
    }
    case STOP_THRUSTING_SHIP:
      return { ...state, isThrusting: false };
    default:
      return state;
  }
}
