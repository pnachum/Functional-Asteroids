import { Sound, SETTINGS } from '../constants';

function playSound(sound: Sound) {
  const soundPath = `audio/${SETTINGS.audioFile[sound]}.mp3`;
  const audio = new Audio(soundPath);
  audio.play();
}

export default function playSounds(sounds: Sound[]) {
  sounds.forEach(playSound);
}
