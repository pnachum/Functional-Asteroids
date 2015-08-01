(function (root){
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});
  var Asteroid = AsteroidsGame.Asteroid;
  var Ship = AsteroidsGame.Ship;
  var StandardBullet = AsteroidsGame.StandardBullet;
  var toRadians = AsteroidsGame.toRadians
  var GameText = AsteroidsGame.GameText;
  var SETTINGS = AsteroidsGame.SETTINGS;
  var UI = AsteroidsGame.UI;
  var Powerup = AsteroidsGame.Powerup;

  var Game = AsteroidsGame.Game = function(ctx, uiContext){
    Asteroid.setConstants();

    this.startTime = Date.now();
    this.elapsedTime = 0;
    this.timer = 0;

    this.ctx = ctx;
    this.bullets = [];
    this.ship = new Ship();
    this.scoreMultiplier = 1;

    this.asteroids = this.addRandomAsteroids(SETTINGS.asteroids.startingNumber);
    this.debris = [];
    this.powerups = [];
    this.bindKeyHandlers();
    this.score = 0;
    this.paused = false;
    this.pauseText = new GameText("Paused", 20, [205, 270], "white");
    this.lives = SETTINGS.startingLives;
    this.mode = SETTINGS.mode;
    this.ui = new UI(this, uiContext);
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.FPS = 30;

  Game.prototype.addRandomAsteroids = function(numAsteroids){
    var output = [];
    var options = {dodgeball: false};
    if (this.mode === "Dodgeball"){
      options.dodgeball = true;
    }

    for (var i = 0; i < numAsteroids; i++){
      output.push(Asteroid.randomAsteroid(
        Game.DIM_X, Game.DIM_Y, options)
      );
    }
    return output;
  };

  Game.prototype.bindKeyHandlers = function(){
    var ship = this.ship;
    var game = this;

    key('space', function(){
      if (game.bullets.length < SETTINGS.bullets.standard.maximumNumber){
        game.bullets.push(ship.fireBullet());
      }
    });

    key("P", function(){
      game.togglePause();
    });
  };

  Game.prototype.checkCollisions = function(){
    var ship = this.ship;
    var bullets = this.bullets;
    var game = this;
    var asteroidsToDestroy = [];
    var bulletsToRemove = [];

    for (var i = 0; i < this.asteroids.length; i++){
      var asteroid = this.asteroids[i];
      if (!ship.invincible) {
        if (ship.isCollidedWith(asteroid)) {
          game.died();
          game.destroyAsteroid(asteroid, {givePoints: false});
        }
      }

      bullets.forEach(function(bullet){
        if (bullet.isCollidedWith(asteroid)){
          bulletsToRemove.push(bullet);
          asteroidsToDestroy.push(asteroid);
        }
      });
    }

    var k = 0;
    while (k < this.powerups.length) {
      var pow = this.powerups[k];
      if (ship.isCollidedWith(pow)){
        pow.applyEffect();
        this.powerups.splice(k, 1);
      } else {
        k++;
      }
    }

    asteroidsToDestroy.forEach(function(asteroid){
      game.destroyAsteroid(asteroid);
    });

    bulletsToRemove.forEach(function(bullet){
      game.bullets.removeItem(bullet);
    });
  };

  // TODO: Make this work
  // This is supposed to make colliding asteroids bounch off of each other,
  // but it doesn't work
  Game.prototype.asteroidCollision = function(asteroid, otherAsteroid){
    var v1 = asteroid.vel;
    var v2 = otherAsteroid.vel;
    var c1 = asteroid.pos;
    var c2 = otherAsteroid.pos;
    var m1 = asteroid.radius;
    var m2 = otherAsteroid.radius;

    var v1x = v1[0];
    var v1y = v1[1];
    var v2x = v2[0];
    var v2y = v2[1];

    var u2x = ( (2 * m1 * v1x) + v2x * (m2 - m1) ) / ( 2 * m2 );
    var u1x = u2x - v1x + v2x;

    var u2y = ( (2 * m1 * v1y) + v2y * (m2 - m1) ) / ( 2 * m2 );
    var u1y = u2y - v1y + v2y;

    asteroid.vel = [u1x, u1y];
    otherAsteroid.vel = [u2x, u2y];
  };


  Game.prototype.destroyAsteroid = function(asteroid, options){
    options = options || {givePoints: true};

    var game = this;
    var newRadius = asteroid.radius * (1 / Math.sqrt(2))
    if (newRadius > SETTINGS.asteroids.minimumRadius) {
      if (options.givePoints) {
        game.score += (2 * game.scoreMultiplier);
      }
      var pos = asteroid.pos;
      var spawnedSpeed = asteroid.spawnedSpeed;
      var vel1 = Asteroid.randomVel(Game.DIM_X, Game.DIM_Y, spawnedSpeed);
      var vel2 = Asteroid.randomVel(Game.DIM_X, Game.DIM_Y, spawnedSpeed);
      game.asteroids.push(new Asteroid(pos.slice(), vel1, newRadius, spawnedSpeed));
      game.asteroids.push(new Asteroid(pos.slice(), vel2, newRadius, spawnedSpeed));
    } else {
      game.debris = game.debris.concat(asteroid.explode());
      if (options.givePoints) {
        game.score += (10 * game.scoreMultiplier);
      }
    }
    game.asteroids.removeItem(asteroid);
  };

  Game.prototype.died = function(){
    var game = this;
    var ship = this.ship;

    game.lives -= 1;
    ship.pos = [250, 250];
    ship.invincible = true;
    ship.spawnTime = Date.now();
    ship.vel = [0, 0];
  }

  Game.prototype.draw = function(){
    this.ui.draw();

    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    var game = this;

    this.asteroids.forEach(function(asteroid){
      asteroid.draw(game.ctx);
    });

    this.powerups.forEach(function(pow){
      pow.draw(game.ctx);
    })

    this.drawAndRemove(this.debris);
    this.drawAndRemove(this.bullets)

    this.ship.draw(this.ctx);

  };

  Game.prototype.drawAndRemove = function(objects){
    var game = this;
    var objectsToRemove = [];
    objects.forEach(function(object){
      // bullet and debris' draw method returns false if the object is out of distance
      if (!object.draw(game.ctx)){
        objectsToRemove.push(object);
      }
    });

    objectsToRemove.forEach(function(object){
      objects.removeItem(object);
    });
  };

  Game.prototype.gameOver = function(options){
    var time = Math.floor(this.timer / 1000);
    if (options.dead === true) {
      if (this.mode === "Dodgeball") {
        var name = prompt("Game Over! You survived for " + time + " seconds. Enter your name!");
      } else {
        var name = prompt("Game Over! Your score is " + this.score + ". You survived for " + time + " seconds. Enter your name!");
      }
    } else {
      alert("You win! That took you " + time + " seconds.");
    }
    this.stop();
  };

  Game.prototype.reset = function(ctx) {
    Asteroid.setConstants();

    this.startTime = Date.now();
    this.elapsedTime = 0;
    this.timer = 0;

    this.ctx = ctx;
    this.bullets = [];
    this.ship = new Ship();
    this.scoreMultiplier = 1;

    this.asteroids = this.addRandomAsteroids(SETTINGS.asteroids.startingNumber);
    this.debris = [];
    this.bindKeyHandlers();
    this.score = 0;
    this.paused = false;
    this.pauseText = new GameText("Paused", 20, [205, 270], "white");
    this.lives = SETTINGS.startingLives;
    this.mode = SETTINGS.mode;
    this.ui = new UI(this, uiContext);
  };


  Game.prototype.increaseDifficulty = function(){
    if (this.mode !== "Bossteroid"){
      var difficulty = SETTINGS.difficulty;
      Asteroid.speed += difficulty.asteroidSpeedIncrease;
      Asteroid.spawnRadius *= difficulty.asteroidSpawnRadiusMultiplier;
      Asteroid.minimumArea *= difficulty.minimumAsteroidAreaMultiplier;
    }
  };

  Game.prototype.increaseMultiplier = function() {
    this.scoreMultiplier += 1;
  };

  Game.prototype.keyPressListener = function(){
    var ship = this.ship;
    var game = this;

    if (key.isPressed('up')){
      ship.power(ship.setVel());
    }

    if (key.isPressed('left')) {
      ship.rotate(1);
    }

    if (key.isPressed('right')){
      ship.rotate(-1)
    }
  };

  Game.prototype.move = function(){
    this.asteroids.forEach(function(asteroid){
      asteroid.move();
    });

    this.debris.forEach(function(debris){
      debris.move();
    });

    this.ship.move();
    this.bullets.forEach(function(bullet){
      bullet.move();
    });
  };

  Game.prototype.start = function(){
    var interval = Math.floor(1000/Game.FPS);
    var that = this;
    this.intervalID = window.setInterval(that.step.bind(that), interval);
  };

  Game.prototype.step = function(){
    var now = Date.now();
    this.timer = Math.floor(now - this.startTime) + this.elapsedTime;

    if (this.lives < 0){
      this.gameOver({dead: true});
    }

    var difficultyTimer = (this.timer) % (SETTINGS.difficulty.timeInterval * 1000);
    if (difficultyTimer < 30){
      this.increaseDifficulty();
      this.powerups.push(Powerup.randomPowerup(this));
    }

    var ship = this.ship;
    var invincibilityTimer = (now - this.ship.spawnTime);
    if (invincibilityTimer > SETTINGS.ship.invincibilityTime * 1000) {
      ship.invincible = false;
    }

    this.keyPressListener();
    this.move();
    this.draw();
    this.checkCollisions();
    if (this.sumOfAsteroidAreas() < Asteroid.minimumArea){
      this.asteroids = this.asteroids.concat(this.addRandomAsteroids(1));
    }

    var mode = this.mode;
    if ((mode === "Bossteroid" || mode === "Super Bossteroid") && this.asteroids.length === 0){
      this.gameOver({dead: false});
    }
  };

  Game.prototype.stop = function(){
    clearInterval(this.intervalID);
  };

  Game.prototype.sumOfAsteroidAreas = function(){
    var areas = this.asteroids.map(function(asteroid){
      return Math.PI * Math.pow(asteroid.radius, 2);
    });

    var sum = areas.reduce(function(a, b){
      return a + b;
    }, 0);

    return sum;
  };

  Game.prototype.togglePause = function(){
    if (this.paused){
      // Unpause
      this.startTime = Date.now();
      this.start();
      this.paused = false;
    } else {
      // Pause
      this.elapsedTime = Math.floor(Date.now() - this.startTime);
      this.stop();
      this.pauseText.draw(this.ctx);
      this.paused = true;
    }
  };

})(this);
