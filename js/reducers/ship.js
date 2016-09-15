import { MOVE, THRUST_SHIP, ROTATE_SHIP, STOP_THRUSTING_SHIP } from '../actionCreators';
import movingObject from './movingObject';
import computeNewVel from '../utils/computeNewVel';
import { SETTINGS } from '../constants';

const defaultShip = {
  pos: [250, 250],
  vel: [0, 0],
  degrees: 90,
  isThrusting: false,
};

function airResistedVelocity(oldVel, airResistance) {
  return oldVel.map(d => {
    if (d > airResistance) {
      return d - airResistance;
    } else if (d < -airResistance) {
      return d + airResistance;
    }
    return 0;
  });
}

// state is object with { pos, vel, degrees, isTruthsting }
export default function ship(state = defaultShip, action) {
  const {
    radius: shipRadius,
    airResistance,
    acceleration,
    maxSpeed,
    turnSpeed,
  } = SETTINGS.ship;
  switch (action.type) {
    case MOVE:
      const moved = movingObject({
        ...state,
        radius: shipRadius,
      }, action);
      return {
        ...moved,
        vel: airResistedVelocity(moved.vel, airResistance),
      };
    case THRUST_SHIP:
      const vel = computeNewVel(
        state.vel,
        state.degrees,
        acceleration,
        maxSpeed
      );
      return {...state, isThrusting: true, vel };
    case ROTATE_SHIP:
      const degrees = (state.degrees + (action.direction * turnSpeed)) % 360;
      return {...state, degrees };
    case STOP_THRUSTING_SHIP:
      return {...state, isThrusting: false};
    default:
      return state;
  }
}
