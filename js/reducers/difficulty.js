// @flow

import { SETTINGS, FRAMES_PER_SECOND, DEFAULT_MODE, BOSS, SUPER_BOSS } from '../constants';
import { MOVE, SET_MODE, RESET } from '../actions';
import type { DifficultyState, Action, Mode } from '../types/index';

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

const defaultState: DifficultyState = {
  asteroidSpawnRadius: SETTINGS.asteroids.startingSpawnRadius[DEFAULT_MODE],
  minimumAsteroidArea: SETTINGS.asteroids.startingMinimumArea[DEFAULT_MODE],
  asteroidSpeed: SETTINGS.asteroids.startingSpeed,
};

export default function difficulty(
  state: DifficultyState = defaultState,
  action: Action
): DifficultyState {
  switch (action.type) {
    case MOVE: {
      if (action.payload == null) {
        return state;
      }
      const { frameCount, mode }: { frameCount: number, mode: Mode } = action.payload;
      // There are no difficulty increases for these modes
      if ([BOSS, SUPER_BOSS].includes(mode)) {
        return state;
      }
      const elapsedSeconds: number = frameCount / FRAMES_PER_SECOND;
      // Don't do a difficulty increase when the game starts
      if (frameCount !== 0 && elapsedSeconds % SETTINGS.difficulty.timeInterval[mode] === 0) {
        return increasedDifficulty(state);
      }
      return state;
    }
    case RESET:
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
