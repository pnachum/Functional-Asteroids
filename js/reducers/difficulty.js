// @flow

import { SETTINGS, FRAMES_PER_SECOND, CLASSIC, BOSS, SUPER_BOSS } from '../constants';
import { NEW_FRAME, SET_MODE } from '../actions';
import type { DifficultyState, Action } from '../types/index';

function increasedDifficulty(prevDifficulty: DifficultyState): DifficultyState {
  const {
    asteroidSpawnRadiusMultiplier,
    minimumAsteroidAreaMultiplier,
    asteroidSpeedIncrease,
  } = SETTINGS.difficulty;

  return {
    asteroidSpawnRadius: prevDifficulty.asteroidSpawnRadius * asteroidSpawnRadiusMultiplier,
    minimumAsteroidArea: prevDifficulty.minimumAsteroidArea * minimumAsteroidAreaMultiplier,
    asteroidSpeed: prevDifficulty.asteroidSpeed + asteroidSpeedIncrease,
  };
}

const defaultState = {
  asteroidSpawnRadius: SETTINGS.asteroids.startingSpawnRadius[CLASSIC],
  minimumAsteroidArea: SETTINGS.asteroids.startingMinimumArea[CLASSIC],
  asteroidSpeed: SETTINGS.asteroids.startingSpeed,
};

export default function difficulty(
  state: DifficultyState = defaultState,
  action: Action
): DifficultyState {
  switch (action.type) {
    case NEW_FRAME: {
      if (action.payload == null) {
        return state;
      }
      const { frameCount, mode } = action.payload;
      // There are no difficulty increases for these modes
      if ([BOSS, SUPER_BOSS].includes(mode)) {
        return state;
      }
      const elapsedSeconds = frameCount / FRAMES_PER_SECOND;
      // Don't do a difficulty increase when the game starts
      if (frameCount !== 0 && elapsedSeconds % SETTINGS.difficulty.timeInterval[mode] === 0) {
        return increasedDifficulty(state);
      }
      return state;
    }
    case SET_MODE:
      if (action.payload == null) {
        return state;
      }
      return {
        ...state,
        asteroidSpawnRadius: SETTINGS.asteroids.startingSpawnRadius[action.payload],
        minimumAsteroidArea: SETTINGS.asteroids.startingMinimumArea[action.payload],
      };
    default:
      return state;
  }
}
