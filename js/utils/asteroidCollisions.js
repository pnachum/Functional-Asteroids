// @flow

import { times, sumBy } from 'lodash';
import { SETTINGS } from '../constants';
import randomAsteroids from './randomAsteroids';
import { direction, sumOfAreas, isCollided } from './math';
import { isShipInvincible } from './durationChecks';
import type {
  Asteroid,
  Debris,
  WithRadius,
  DifficultyState,
  Ship,
  Bullet,
  Powerup,
} from '../types/types';
import { PowerupType } from '../types/enums';

type AsteroidCollision = {
  asteroid: Asteroid,
  points: number,
};

// Returns the debris objects resulting from the destroyed asteroids
export function debrisForDestroyedAsteroids(destroyedAsteroids: Asteroid[]): Debris[] {
  const {
    debris: {
      number: numDebris,
      distance: debrisDistance,
    },
  } = SETTINGS;
  const angle: number = 360 / numDebris;
  return destroyedAsteroids.reduce((prev, current) => {
    const debrisForAsteroid: Debris[] = times(numDebris, index => ({
      pos: current.pos,
      vel: direction(angle * index),
      distance: debrisDistance,
    }));
    return prev.concat(debrisForAsteroid);
  }, []);
}

// Return the new small asteroids resulting from the asteroids that have been collided with
export function subASteroidsForCollidedAsteroids(collidedAsteroids: Asteroid[]): Asteroid[] {
  const { minimumRadius } = SETTINGS.asteroids;

  return collidedAsteroids.reduce((prev, current) => (
    prev.concat(randomAsteroids(2, {
      radius: current.radius / Math.sqrt(2),
      pos: current.pos,
      // Split asteroids maintain the same speed as their parent
      spawnSpeed: current.spawnSpeed,
    }))
  ), []).filter(asteroid => asteroid.radius > minimumRadius);
}

// Return the asteroids needed in addition to the current ones to meet the minimum area requirement
export function additionalAsteroidsForCurrentAsteroids(
  currentAsteroids: Asteroid[],
  { asteroidSpawnRadius, asteroidSpeed, minimumAsteroidArea }: DifficultyState,
): Asteroid[] {
  // Flow can't cast Asteroid[] to WithRadius[], so map over the array to do it explicitly
  const withRadii: WithRadius[] = currentAsteroids.map(asteroid => (asteroid: WithRadius));
  return sumOfAreas(withRadii) < minimumAsteroidArea
    ? randomAsteroids(1, { radius: asteroidSpawnRadius, spawnSpeed: asteroidSpeed })
    : [];
}

function powerupsOfType(powerups: Powerup[]): (type: PowerupType) => Powerup[] {
  return (type: PowerupType) => powerups.filter(powerup => powerup.type === type);
}

export function handleCollisions({
  ship,
  asteroids,
  bullets,
  powerups,
  frameCount,
  pointsForCollision,
} : {
  ship: Ship,
  asteroids: Asteroid[],
  bullets: Bullet[],
  powerups: Powerup[],
  frameCount: number,
  pointsForCollision: (asteroid: Asteroid) => number,
}): {
  livesDiff: number,
  notCollidedBullets: Bullet[],
  collidedAsteroids: Asteroid[],
  notCollidedAsteroids: Asteroid[],
  notCollidedPowerups: Powerup[],
  pointsAwarded: number,
  newShip: Ship,
  beginBulletPowerup: boolean,
  beginFreezePowerup: boolean,
  bombsDiff: number,
  resetMultiplier: boolean,
} {
  const {
    ship: {
      radius: shipRadius,
      defaultShip,
    },
    bullets: {
      radius: bulletRadius,
    },
    powerups: {
      radius: powerupRadius,
    },
  } = SETTINGS;
  let livesDiff: number = 0;
  let bombsDiff: number = 0;
  let resetMultiplier: boolean = false;
  const collidedBullets: Bullet[] = [];
  const asteroidCollisions: AsteroidCollision[] = [];
  let newShip: Ship = ship;
  asteroids.forEach((asteroid) => {
    bullets.forEach((bullet) => {
      if (isCollided({ ...bullet, radius: bulletRadius }, asteroid)) {
        collidedBullets.push(bullet);
        asteroidCollisions.push({
          points: pointsForCollision(asteroid),
          asteroid,
        });
      }
    });
    const didShipCollideWithAsteroid: boolean = isCollided(
      { pos: ship.pos, radius: shipRadius },
      asteroid
    );
    if (!isShipInvincible(ship, frameCount) && didShipCollideWithAsteroid) {
      livesDiff -= 1;
      asteroidCollisions.push({ points: 0, asteroid });
      // Maintain the ship's current direction and reset its spawnFrame
      newShip = {
        ...defaultShip,
        degrees: ship.degrees,
        invincibilityStartFrame: frameCount,
      };
      resetMultiplier = true;
    }
  });

  const collidedAsteroids: Asteroid[] = asteroidCollisions.map(ac => ac.asteroid);
  const pointsAwarded: number = sumBy(asteroidCollisions, ac => ac.points);
  const notCollidedAsteroids: Asteroid[] = asteroids.filter(asteroid => (
    !collidedAsteroids.includes(asteroid)
  ));
  const notCollidedBullets = bullets.filter(bullet => !collidedBullets.includes(bullet));

  const collidedPowerups = powerups.filter(powerup => (
    isCollided({ ...ship, radius: shipRadius }, { ...powerup, radius: powerupRadius })
  ));
  const notCollidedPowerups = powerups.filter(powerup => !collidedPowerups.includes(powerup));

  const collidedPowerupsOfType: (type: PowerupType) => Powerup[] = powerupsOfType(collidedPowerups);
  livesDiff += collidedPowerupsOfType(PowerupType.LIFE).length;
  bombsDiff = collidedPowerupsOfType(PowerupType.BOMB).length;

  const beginBulletPowerup = collidedPowerupsOfType(PowerupType.BULLET).length > 0;
  const beginFreezePowerup = collidedPowerupsOfType(PowerupType.FREEZE).length > 0;
  const beginInvinciblePowerup = collidedPowerupsOfType(PowerupType.INVINCIBLE).length > 0;
  if (beginInvinciblePowerup) {
    newShip = {
      ...newShip,
      invincibilityStartFrame: frameCount,
    };
  }
  return {
    newShip: newShip || ship,
    livesDiff,
    notCollidedBullets,
    collidedAsteroids,
    notCollidedAsteroids,
    notCollidedPowerups,
    pointsAwarded,
    beginBulletPowerup,
    beginFreezePowerup,
    bombsDiff,
    resetMultiplier,
  };
}
