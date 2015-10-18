(function (root){
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});

  // The AudioController is responsible for storing and playing sounds
  var AudioController = AsteroidsGame.AudioController = function(){};

  AudioController.prototype.laser = function() {
    this.playSound('laser');
  };

  AudioController.prototype.asteroidBreak = function() {
    this.playSound('asteroidBreak');
  };

  AudioController.prototype.asteroidDestroy = function() {
    this.playSound('asteroidDestroy');
  };

  AudioController.prototype.gameOver = function() {
    this.playSound('gameOver');
  };

  AudioController.prototype.playSound = function(sound) {
    var soundPath = 'audio/' + sound + '.mp3';
    var audio = new Audio(soundPath);
    audio.play();
  };

})(this);
