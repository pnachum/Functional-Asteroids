import { FRAMES_PER_SECOND, SETTINGS } from '../constants';
import type { Ship } from '../types/index';

export default function isShipInvincible({ spawnFrame }: Ship, frameCount: number): boolean {
  return spawnFrame + (FRAMES_PER_SECOND * SETTINGS.ship.invincibilityTime) > frameCount;
}
