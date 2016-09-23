import type { Sound } from '../types/index';

function playSound(sound: Sound) {
  const soundPath = `audio/${sound.file}.mp3`;
  const audio = new Audio(soundPath);
  audio.play();
}

export default function playSounds(sounds: Sound[]) {
  sounds.forEach(playSound);
}
