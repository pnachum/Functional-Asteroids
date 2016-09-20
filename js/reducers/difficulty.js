// @flow

import { SETTINGS, FRAMES_PER_SECOND } from '../constants';
import { NEW_FRAME } from '../actionCreators';
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
  asteroidSpawnRadius: SETTINGS.asteroids.startingSpawnRadius,
  minimumAsteroidArea: SETTINGS.asteroids.startingMinimumArea,
  asteroidSpeed: SETTINGS.asteroids.startingSpeed,
};

export default function difficulty(
  state: DifficultyState = defaultState,
  action: Action
): DifficultyState {
  switch (action.type) {
    case NEW_FRAME:
      if (action.payload == null) {
        return state;
      }
      const elapsedSeconds = action.payload / FRAMES_PER_SECOND;
      // Don't do a difficulty increase when the game starts
      if (action.payload !== 0 && elapsedSeconds % SETTINGS.difficulty.timeInterval === 0) {
        return increasedDifficulty(state);
      }
      return state;
    default:
      return state;
  }
}
