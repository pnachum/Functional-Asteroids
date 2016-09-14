import { combineReducers } from 'redux';
import {
  MOVE,
  ADD_ASTEROID,
  ADD_RANDOM_ASTEROIDS,
  THRUST_SHIP,
  ROTATE_SHIP,
  STOP_THRUSTING_SHIP,
} from './action_creators';
import mapToScreen from '../utils/mapToScreen';
import randomAsteroid from '../utils/randomAsteroid';
import computeNewVel from '../utils/computeNewVel';
import { times } from 'lodash';
import { DIMENSION, SETTINGS } from '../constants';

function asteroids(state = [], action) {
  switch (action.type) {
    case MOVE:
      return state.map(asteroid => movingObject(asteroid, action));
    case ADD_RANDOM_ASTEROIDS:
      const newAsteroids = times(action.numAsteroids, () => randomAsteroid(DIMENSION, DIMENSION));
      return state.concat(newAsteroids);
    default:
      return state;
  }
}

function movingObject(state, action) {
  switch (action.type) {
    case MOVE:
      const newPos = state.pos.map((d, i) => d + state.vel[i]);
      const mappedPos = mapToScreen(newPos, state.radius);
      return {...state, pos: mappedPos };
    default:
      return state;
  }
}

const defaultShip = {
  pos: [250, 250],
  vel: [0, 0],
  degrees: 90,
  isThrusting: false,
};

function ship(state = defaultShip, action) {
  switch (action.type) {
    case MOVE:
      return movingObject({
        ...state,
        radius: SETTINGS.ship.radius,
      }, action);
    case THRUST_SHIP:
      const vel = computeNewVel(
        state.vel,
        state.degrees,
        SETTINGS.ship.acceleration,
        SETTINGS.ship.maxSpeed
      );
      return {...state, isThrusting: true, vel };
    case ROTATE_SHIP:
      const degrees = (state.degrees + (action.direction * SETTINGS.ship.turnSpeed)) % 360;
      return {...state, degrees };
    case STOP_THRUSTING_SHIP:
      return {...state, isThrusting: false};
    default:
      return state;
  }
}

const asteroidsApp = combineReducers({
  asteroids,
  ship,
});

export default asteroidsApp;
