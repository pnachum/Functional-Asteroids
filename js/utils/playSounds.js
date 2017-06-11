// @flow

import { SETTINGS } from '../constants';
import type { Sound } from '../types/enums';

function playSound(sound: Sound) {
  const soundPath = `audio/${SETTINGS.audioFile[sound]}.mp3`;
  const audio = new global.Audio(soundPath);
  audio.play();
}

export default function playSounds(sounds: Sound[]) {
  sounds.forEach(playSound);
}
