// The AudioController is responsible for storing and playing sounds
class AudioController {

  laser() {
    this.playSound('laser');
  }

  asteroidBreak() {
    this.playSound('asteroidBreak');
  }

  asteroidDestroy() {
    this.playSound('asteroidDestroy');
  }

  gameOver() {
    this.playSound('gameOver');
  }

  playSound(sound) {
    const soundPath = `audio/${sound}.mp3`;
    const audio = new Audio(soundPath);
    audio.play();
  }

}

module.exports = AudioController;
