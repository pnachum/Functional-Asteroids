import Asteroid from "./asteroid";
import Ship from "./ship";
import GameText from "./gameText";
import SETTINGS from "./settings";
import UI from "./gameUI";
import Powerup from "./powerup";
import AudioController from "./audioController";
import key from 'keymaster';
import { times, sumBy, includes } from 'lodash';
import { toRadians, removeFromArray } from "./helpers";

// The Game object stores all game state and handles general game logic
export default class Game {

  static DIM_X = 500;
  static DIM_Y = 500;
  static FPS = 30;

  constructor(ctx, uiContext) {
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
    this.audioController = new AudioController();
  }

  addRandomAsteroids(numAsteroids) {
    const options = {
      dodgeball: this.mode === "Dodgeball",
    };

    return times(numAsteroids, () => Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y, this.ship, options));
  }

  bindKeyHandlers() {
    const ship = this.ship;

    key('space', () => {
      // There's a limit to how many bullets can be in the game at once
      if (this.bullets.length < SETTINGS.bullets.standard.maximumNumber) {
        this.bullets.push(ship.fireBullet());
        this.audioController.laser();
      }
    });

    key("P", () => {
      this.togglePause();
    });
  }

  // Handles collisions between bullets and asteroids or the ship and asteroids
  checkCollisions() {
    const ship = this.ship;
    const bullets = this.bullets;
    const asteroidsToDestroy = [];
    const bulletsToRemove = [];

    // Check for collisions between each asteroid and the ship or a bullet
    this.asteroids.forEach((asteroid) => {
      if (!ship.invincible && ship.isCollidedWith(asteroid)) {
        this.died();
        this.destroyAsteroid(asteroid, { givePoints: false });
      }

      bullets.forEach((bullet) => {
        if (bullet.isCollidedWith(asteroid)){
          bulletsToRemove.push(bullet);
          asteroidsToDestroy.push(asteroid);
        }
      });
    });

    // Check for collisions between each powerup and the ship.
    let k = 0;
    while (k < this.powerups.length) {
      let powerup = this.powerups[k];
      if (ship.isCollidedWith(powerup)){
        powerup.applyEffect();
        removeFromArray(this.powerups, powerup);
      } else {
        k++;
      }
    }

    asteroidsToDestroy.forEach((asteroid) => this.destroyAsteroid(asteroid));
    bulletsToRemove.forEach((bullet) => removeFromArray(this.bullets, bullet));
  }

  // TODO: Make this work
  // This is supposed to make colliding asteroids bounch off of each other,
  // but it doesn't work
  // asteroidCollision(asteroid, otherAsteroid){
  //   var v1 = asteroid.vel;
  //   var v2 = otherAsteroid.vel;
  //   var c1 = asteroid.pos;
  //   var c2 = otherAsteroid.pos;
  //   var m1 = asteroid.radius;
  //   var m2 = otherAsteroid.radius;

  //   var v1x = v1[0];
  //   var v1y = v1[1];
  //   var v2x = v2[0];
  //   var v2y = v2[1];

  //   var u2x = ( (2 * m1 * v1x) + v2x * (m2 - m1) ) / ( 2 * m2 );
  //   var u1x = u2x - v1x + v2x;

  //   var u2y = ( (2 * m1 * v1y) + v2y * (m2 - m1) ) / ( 2 * m2 );
  //   var u1y = u2y - v1y + v2y;

  //   asteroid.vel = [u1x, u1y];
  //   otherAsteroid.vel = [u2x, u2y];
  // }

  destroyAsteroid(asteroid, options) {
    // An asteroid can be destroyed either by the ship colliding with it, or a
    // bullet colliding with it. Points are only given points if it was a bullet
    options = options || { givePoints: true };

    const newRadius = asteroid.radius * (1 / Math.sqrt(2));
    // minimumRadius specifies how small an asteroid can be before it was
    // actually destroyed, versus being split into two smaller asteroids
    if (newRadius > SETTINGS.asteroids.minimumRadius) {
      this.audioController.asteroidBreak();
      if (options.givePoints) {
        this.score += (2 * this.scoreMultiplier);
      }
      const newAsteroids = asteroid.split(Game.DIM_X, Game.DIM_Y, newRadius);
      this.asteroids = this.asteroids.concat(newAsteroids);
    } else {
      // If the asteroid was small enough to actually be destroyed, it turns
      // into debris
      this.debris = this.debris.concat(asteroid.explode());
      if (options.givePoints) {
        // More points are awarded when an asteroid is fully destroyed
        this.score += (10 * this.scoreMultiplier);
      }
      this.audioController.asteroidDestroy();
    }
    removeFromArray(this.asteroids, asteroid);
  }

  died() {
    const ship = this.ship;

    this.lives -= 1;
    // Set the ship's position to the middle of the screen
    ship.pos = [250, 250];
    // The ship is made invincible at first.
    ship.invincible = true;
    ship.spawnTime = Date.now();
    ship.vel = [0, 0];
  }

  draw() {
    this.ui.draw();
    const ctx = this.ctx;

    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.asteroids.forEach((asteroid) => asteroid.draw(ctx));

    this.powerups.forEach((powerup) => powerup.draw(ctx));

    // Bullets and debris may need to be removed, since they travel for a
    // limited distance
    this.drawAndRemove(this.debris);
    this.drawAndRemove(this.bullets);

    this.ship.draw(ctx);
  }

  // Debris and bullet objects may need to be removed since they travel for
  // a limited distance
  drawAndRemove(objects) {
    // bullet and debris' draw method returns false if the object is out of
    // distance to travel
    const objectsToRemove = objects.filter((object) => !object.draw(this.ctx));

    objectsToRemove.forEach((object) => removeFromArray(objects, object));
  }

  gameOver(options) {
    const time = Math.floor(this.timer / 1000);
    let stringToAlert;
    // The game can end either because the player died, or because the player
    // defeated the bossteroid
    if (options.dead) {
      this.audioController.gameOver();
      if (this.mode === "Dodgeball") {
        stringToAlert = `Game Over! You survived for ${time} seconds`;
      } else {
        stringToAlert = `Game Over! Your score is ${this.score}. You survived for ${time} seconds`;
      }
    } else {
      stringToAlert = `You win! That took you ${time} seconds.`;
    }
    alert(stringToAlert);
    this.stop();
  }

  // The game's difficulty increases over time. The asteroids move faster and
  // spawn larger
  increaseDifficulty() {
    if (!includes(["Bossteroid", "Super Bossteroid"], this.mode)) {
      const difficulty = SETTINGS.difficulty;
      Asteroid.speed += difficulty.asteroidSpeedIncrease;
      Asteroid.spawnRadius *= difficulty.asteroidSpawnRadiusMultiplier;
      Asteroid.minimumArea *= difficulty.minimumAsteroidAreaMultiplier;
    }
  }

  increaseMultiplier() {
    this.scoreMultiplier += 1;
  }

  keyPressListener() {
    const ship = this.ship;

    if (key.isPressed('up')) {
      ship.power(ship.setVel());
    }

    if (key.isPressed('left')) {
      ship.rotate(1);
    }

    if (key.isPressed('right')) {
      ship.rotate(-1)
    }
  }

  // Move all the objects in the game
  move() {
    const asteroids = this.asteroids;
    const debris = this.debris;
    const bullets = this.bullets;
    const ship = [this.ship];

    const movableObjects = asteroids.concat(debris).concat(bullets).concat(ship);
    movableObjects.forEach((object) => object.move());
  }

  start() {
    const interval = Math.floor(1000/Game.FPS);
    this.intervalID = setInterval(this.step.bind(this), interval);
  }

  step() {
    const now = Date.now();
    this.timer = Math.floor(now - this.startTime) + this.elapsedTime;

    if (this.lives < 0) {
      this.gameOver({ dead: true });
    }

    const difficultyTimer = (this.timer) % (SETTINGS.difficulty.timeInterval * 1000);
    // Increase difficulty every 30 seconds
    if (difficultyTimer < 30) {
      this.increaseDifficulty();
      // There are no powerups in Dodgeball mode
      if (this.mode !== "Dodgeball") {
        this.powerups.push(Powerup.randomPowerup(this));
      }
    }

    const ship = this.ship;
    const invincibilityTimer = (now - this.ship.spawnTime);
    if (invincibilityTimer > SETTINGS.ship.invincibilityTime * 1000) {
      ship.invincible = false;
    }

    this.keyPressListener();
    this.move();
    this.draw();
    this.checkCollisions();
    // Add more asteroids to the game if the total area of the present asteroids
    // is below some specified minimum
    if (this.sumOfAsteroidAreas() < Asteroid.minimumArea){
      this.asteroids = this.asteroids.concat(this.addRandomAsteroids(1));
    }

    if (includes(["Bossteroid", "Super Bossteroid"], this.mode) && this.asteroids.length === 0) {
      this.gameOver({ dead: false });
    }
  }

  stop() {
    clearInterval(this.intervalID);
  }

  sumOfAsteroidAreas() {
    return sumBy(this.asteroids, (asteroid) => asteroid.area());
  }

  togglePause(){
    if (this.paused) {
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
  }
}
