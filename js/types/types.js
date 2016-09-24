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

export type DifficultyState = {
  asteroidSpawnRadius: number,
  minimumAsteroidArea: number,
  asteroidSpeed: number,
};

export type Action = { type: string, payload?: any };

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
