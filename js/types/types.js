// @flow

import { Mode, PowerupType, Sound } from './enums';

export type Asteroid = {
  pos: [number, number],
  radius: number,
  vel: [number, number],
  spawnSpeed: number,
};

export type Ship = {
  pos: [number, number],
  vel: [number, number],
  degrees: number,
  isThrusting: boolean,
  invincibilityStartFrame: number,
};

export type Bullet = {
  pos: [number, number],
  vel: [number, number],
  distance: number,
  speed: number,
  radius: number,
};

export type Debris = {
  pos: [number, number],
  vel: [number, number],
  distance: number,
};

export type WithRadius = {
  radius: number,
};

export type Distanceable = {
  radius: number,
  pos: [number, number],
};

export type Moveable = {
  radius: number,
  pos: [number, number],
  vel: [number, number],
}

export type DrawableCircle = {
  radius: number,
  pos: [number, number],
  color: string,
}

export type DrawableText = {
  text: string,
  size: number,
  pos: [number, number],
  color: string
};

export type DrawableRectangle = {
  pos: [number, number],
  color: string,
  width: number,
  height: number,
};

export type DifficultyState = {
  asteroidSpawnRadius: number,
  minimumAsteroidArea: number,
  asteroidSpeed: number,
};

export type TurnDirection = 1 | -1;

export type Powerup = {
  pos: [number, number],
  type: PowerupType,
};

export type MovingObjectsState = {
  asteroids: Asteroid[],
  bullets: Bullet[],
  ship: Ship,
  debris: Debris[],
  powerups: Powerup[],
  score: number,
  lives: number,
  multiplier: number,
  multiplierBar: number,
  bulletPowerupStartFrame: ?number,
  freezePowerupStartFrame: ?number,
  bombs: number,
  queuedSounds: Sound[],
};

export type Store = {
  movingObjects: MovingObjectsState,
  isPaused: boolean,
  frameCount: number,
  difficulty: DifficultyState,
  mode: Mode,
  isSoundOn: boolean,
};

export type MoveAction = {
  type: 'MOVE',
  payload: {
    difficulty: DifficultyState,
    frameCount: number,
    mode: Mode,
    lives: number,
    bombs: number,
    freezePowerupStartFrame: ?number,
  }
}

export type ThrustShipAction = { type: 'THRUST_SHIP' };

export type RotateShipAction = {
  type: 'ROTATE_SHIP',
  payload: TurnDirection,
};

export type StopThrustingAction = { type: 'STOP_THRUSTING_SHIP' };

export type ShootAction = {
  type: 'SHOOT',
  payload: {
    ship: Ship,
    mode: Mode,
    bulletPowerupStartFrame: ?number,
    frameCount: number,
  },
};

export type TogglePauseAction = { type: 'TOGGLE_PAUSE' };

export type ResetAction = {
  type: 'RESET',
  payload: {
    mode: Mode,
    isSoundOn: boolean,
  },
}

export type SetModeAction = {
  type: 'SET_MODE',
  payload: {
    mode: Mode,
  },
}

export type AddInitialAsteroidsAction = {
  type: 'ADD_INITIAL_ASTEROIDS',
  payload: {
    mode: Mode,
  },
}

export type TriggerBombAction = { type: 'TRIGGER_BOMB' };

export type ToggleSoundAction = { type: 'TOGGLE_SOUND' };

export type Action =
  | ToggleSoundAction
  | TriggerBombAction
  | AddInitialAsteroidsAction
  | SetModeAction
  | ResetAction
  | ShootAction
  | TogglePauseAction
  | StopThrustingAction
  | RotateShipAction
  | ThrustShipAction
  | MoveAction
