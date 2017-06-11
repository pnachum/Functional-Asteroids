// @flow

import type {
  Ship,
  DifficultyState,
  TurnDirection,
  ToggleSoundAction,
  TriggerBombAction,
  AddInitialAsteroidsAction,
  SetModeAction,
  ResetAction,
  ShootAction,
  TogglePauseAction,
  StopThrustingAction,
  RotateShipAction,
  ThrustShipAction,
  MoveAction,
} from './types/types';
import type { Mode } from './types/enums';

export const MOVE = 'MOVE';
export const ADD_ASTEROID = 'ADD_ASTEROID';
export const THRUST_SHIP = 'THRUST_SHIP';
export const ROTATE_SHIP = 'ROTATE_SHIP';
export const STOP_THRUSTING_SHIP = 'STOP_THRUSTING_SHIP';
export const SHOOT = 'SHOOT';
export const TOGGLE_PAUSE = 'TOGGLE_PAUSE';
export const RESET = 'RESET';
export const SET_MODE = 'SET_MODE';
export const ADD_INITIAL_ASTEROIDS = 'ADD_INITIAL_ASTEROIDS';
export const TRIGGER_BOMB = 'TRIGGER_BOMB';
export const TOGGLE_SOUND = 'TOGGLE_SOUND';

export function move(payload: {
  difficulty: DifficultyState,
  frameCount: number,
  mode: Mode,
  lives: number,
  bombs: number,
  freezePowerupStartFrame: ?number,
}): MoveAction {
  return {
    type: MOVE,
    payload,
  };
}

export function thrustShip(): ThrustShipAction {
  return { type: 'THRUST_SHIP' };
}

export function rotateShip(direction: TurnDirection): RotateShipAction {
  return { type: 'ROTATE_SHIP', payload: direction };
}

export function stopThrustingShip(): StopThrustingAction {
  return { type: 'STOP_THRUSTING_SHIP' };
}

export function shoot(
  ship: Ship,
  mode: Mode,
  bulletPowerupStartFrame: ?number,
  frameCount: number
): ShootAction {
  return {
    type: 'SHOOT',
    payload: {
      ship,
      mode,
      bulletPowerupStartFrame,
      frameCount,
    },
  };
}

export function togglePause(): TogglePauseAction {
  return { type: 'TOGGLE_PAUSE' };
}

export function reset(mode: Mode, isSoundOn: boolean): ResetAction {
  return {
    type: RESET,
    payload: {
      mode,
      isSoundOn,
    },
  };
}

export function setMode(newMode: Mode): SetModeAction {
  return {
    type: 'SET_MODE',
    payload: {
      mode: newMode,
    },
  };
}

export function addInitialAsteroids(mode: Mode): AddInitialAsteroidsAction {
  return {
    type: 'ADD_INITIAL_ASTEROIDS',
    payload: {
      mode,
    },
  };
}

export function triggerBomb(): TriggerBombAction {
  return { type: 'TRIGGER_BOMB' };
}

export function toggleSound(): ToggleSoundAction {
  return { type: 'TOGGLE_SOUND' };
}
