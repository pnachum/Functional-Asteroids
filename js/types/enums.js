// @flow

import { Enum } from 'enumify';

export class Mode extends Enum {}
Mode.initEnum(['CLASSIC', 'DODGEBALL', 'BOSS', 'SUPER_BOSS']);

export class PowerupType extends Enum {}
PowerupType.initEnum(['LIFE', 'BULLET', 'BOMB', 'FREEZE', 'INVINCIBLE']);

export class Sound extends Enum {}
Sound.initEnum(['ASTEROID_BREAK', 'ASTEROID_DESTROY', 'GAME_OVER', 'LASER']);
