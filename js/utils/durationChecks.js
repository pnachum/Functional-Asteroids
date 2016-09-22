import { FRAMES_PER_SECOND, SETTINGS, BULLET, FREEZE } from '../constants';
import type { Ship } from '../types/index';

function hasTimePassed(
  startFrame: number,
  duration: number,
  currentFrame: number,
): boolean {
  return startFrame + (FRAMES_PER_SECOND * duration) < currentFrame;
}

export function isShipInvincible({ spawnFrame }: Ship, frameCount: number): boolean {
  return !hasTimePassed(spawnFrame, SETTINGS.ship.invincibilityTime, frameCount);
}

// TODO: These two functions look very similar
export function isBulletPoweredUp(bulletPowerupStartFrame: ?number, frameCount: number): boolean {
  if (bulletPowerupStartFrame == null) {
    return false;
  }
  return !hasTimePassed(bulletPowerupStartFrame, SETTINGS.powerups.duration[BULLET], frameCount);
}

export function areAsteroidsFrozen(freezePowerupStartFrame: ?number, frameCount: number): boolean {
  if (freezePowerupStartFrame == null) {
    return false;
  }
  return !hasTimePassed(freezePowerupStartFrame, SETTINGS.powerups.duration[FREEZE], frameCount);
}
