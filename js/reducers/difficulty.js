// @flow

import { SETTINGS, FRAMES_PER_SECOND } from '../constants';
import { NEW_FRAME, RESET } from '../actionCreators';
import type { DifficultyState } from '../types/index';

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
  asteroidSpawnRadius: SETTINGS.asteroids.startingSpawnRadius,
  minimumAsteroidArea: SETTINGS.asteroids.startingMinimumArea,
  asteroidSpeed: SETTINGS.asteroids.startingSpeed,
};

export default function difficulty(
  state: DifficultyState = defaultState,
  action: Object
): DifficultyState {
  switch (action.type) {
    case NEW_FRAME:
      const elapsedSeconds = action.frameCount / FRAMES_PER_SECOND;
      // Don't do a difficulty increase when the game starts
      if (action.frameCount !== 0 && elapsedSeconds % SETTINGS.difficulty.timeInterval === 0) {
        return increasedDifficulty(state);
      }
      return state;
    case RESET:
      return defaultState;
    default:
      return state;
  }
}
