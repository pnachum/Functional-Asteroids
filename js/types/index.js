// @flow

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
};

export type Bullet = {
  pos: [number, number],
  vel: [number, number],
  distance: number,
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

// Flow can't handle using constants here, so it has to repeat the constasnt values
export type Mode = 0 | 1 | 2 | 3;

export type Action = { type: string, payload?: any };

export type TurnDirection = 1 | -1;
