(function (root){
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});
  var MovingObject = AsteroidsGame.MovingObject;
  var random = AsteroidsGame.random;
  var randomFromArray = AsteroidsGame.randomFromArray;
  var SETTINGS = AsteroidsGame.SETTINGS;
  var Debris = AsteroidsGame.Debris;

  var Asteroid = AsteroidsGame.Asteroid = function (pos, vel, radius, spawnedSpeed) {
    MovingObject.call(this, pos, vel, radius, Asteroid.COLOR);
    // Asteroid stores the speed multiplier it spawned at so that when it is destroyed,
    // the new smaller asteroids can use the same speed, and not the class variable
    // speed, which increases over time.
    this.spawnedSpeed = spawnedSpeed;
  };

  Asteroid.inherits(MovingObject);

  Asteroid.setConstants = function(){
    Asteroid.minimumArea = SETTINGS.asteroids.startingMinimumArea;
    Asteroid.speed = SETTINGS.asteroids.startingSpeed;
    Asteroid.spawnRadius = SETTINGS.asteroids.startingSpawnRadius;
    Asteroid.COLOR = SETTINGS.asteroids.color;
  };

  // When an asteroid is hit with a bullet, it either breaks up into two
  // new asteroids, or if it's small enough, it explodes. In this case, it
  // is replaced with Debris objects.
  Asteroid.prototype.explode = function(){
    var pos = this.pos;
    var vels = [];
    var numDebris = SETTINGS.debris.number;
    var angle = 360 / numDebris;

    for (var i = 0; i < numDebris; i++){
      var degree = angle * i;
      vels.push([Math.cos(degree), Math.sin(degree)]);
    }

    return vels.map(function(vel){
      return new Debris(pos.slice(), vel);
    });
  };

  Asteroid.randomAsteroid = function(dimX, dimY, options){
    var radius;
    // Asteroids in dodgeball have a predefined set of sizes
    if (options.dodgeball){
      radius = randomFromArray([15, 21.2, 30]);
    } else {
      radius = Asteroid.spawnRadius;
    }

    var randomPos = Asteroid.randomPos(dimX, dimY);
    var randomVel = Asteroid.randomVel(dimX, dimY, Asteroid.speed);
    return new Asteroid(randomPos, randomVel, radius, Asteroid.speed);
  };

  // Pick a random position along the edge of the game for the asteroid to
  // spawn at
  Asteroid.randomPos = function(dimX, dimY, ship){
    var radius = Asteroid.spawnRadius;
    var randomX = random(-radius, dimX + radius);
    var randomY = random(-radius, dimY + radius);
    var edgeX = randomFromArray([-radius, dimX + radius]);
    var edgeY = randomFromArray([-radius, dimY + radius]);
    var candidate1 = [edgeX, randomY];
    var candidate2 = [randomX, edgeY];
    var randomPos = randomFromArray([candidate1, candidate2]);

    return randomPos;
  };

  // Pick a random direction for the asteroid to begin moving in
  Asteroid.randomVel = function(dimX, dimY, intensity){
    var rangeX = (intensity * dimX) / 125;
    var rangeY = (intensity * dimY) / 125;
    var xDirection = randomFromArray([-1, 1]);
    var yDirection = randomFromArray([-1, 1]);
    var randomDx = random(1, rangeX) * xDirection;
    var randomDy = random(1, rangeY) * yDirection;
    return [randomDx, randomDy];
  };

})(this);
