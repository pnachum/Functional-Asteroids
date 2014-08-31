(function (root){  
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});
  var Asteroid = AsteroidsGame.Asteroid;
  var Ship = AsteroidsGame.Ship;
	var StandardBullet = AsteroidsGame.StandardBullet;
	var toRadians = AsteroidsGame.toRadians
	var GameText = AsteroidsGame.GameText;
	var SETTINGS = AsteroidsGame.SETTINGS; 
	var UI = AsteroidsGame.UI;
	

  
  var Game = AsteroidsGame.Game = function(ctx, uiContext){
		Asteroid.setConstants();

		
		this.startTime = Date.now();
    this.ctx = ctx; 
    this.bullets = [];
    this.ship = new Ship();
		this.scoreMultiplier = 1; 
		
		
    this.asteroids = this.addRandomAsteroids(SETTINGS.asteroids.startingNumber);
		this.debris = [];
    this.bindKeyHandlers();
		this.score = 0; 
		this.paused = false; 
		this.pauseText = new GameText("Paused", 20, [205, 270], "red");
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
			
			game.asteroids.slice(i).forEach(function(otherAsteroid){
				if (asteroid.isCollidedWith(otherAsteroid)){
					
					// game.asteroidCollision(asteroid, otherAsteroid);
			
				}	
			});
    }
		
		
		asteroidsToDestroy.forEach(function(asteroid){
			game.destroyAsteroid(asteroid);
		});
		
		bulletsToRemove.forEach(function(bullet){
			game.bullets.removeItem(bullet);
		});
  };
	
	Game.prototype.asteroidCollision = function(asteroid, otherAsteroid){
		
		
		console.log("before:")
		console.log(asteroid.vel)
		console.log(otherAsteroid.vel)
		 

		



		var v1 = asteroid.vel;
		var v2  = otherAsteroid.vel; 		
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
		
		
		var distance = asteroid.distance(otherAsteroid);
		var sumRadii = asteroid.radius + otherAsteroid.radius;
		var overlap = Math.abs(distance - sumRadii) + 1; 
		console.log("overlap: " + overlap)
		
		var blah = toRadians(90) - Math.atan(u1y / u1x);
		var newX = overlap * Math.sin(blah); 
		var newY = Math.sqrt(Math.pow(overlap, 2) - Math.pow(newX, 2));
		console.log("newX: " + newX); 
		console.log("newY: " + newY);
		
		
		asteroid.pos[0] = otherAsteroid.pos[0] + newX;
		asteroid.pos[1] = otherAsteroid.pos[1] - newY;
		
		
		asteroid.vel = [u1x, u1y];
		otherAsteroid.vel = [u2x, u2y];
		
		console.log("after:")
		console.log(asteroid.vel)
		console.log(otherAsteroid.vel)
		
		
		

		// var c1_c2 = c1.subtract(c2);
		//
		// var f1 = (2 * m2) / (  (m1 + m2) *  c1_c2.magnitudeSquared() )
		// var v1_v2 = v1.subtract(v2);
		// var vector1 = [v1_v2.scalarProduct(f1), c1_c2.scalarProduct(f1)];
		// var dotProdLeft = vector1[0].scalarProduct(c1_c2[0]);
		// var dotProdRight = vector1[1].scalarProduct(c1_c2[1]);
		// var dotProd = dotProdLeft.add(dotProdRight);
		//
		// return v1.subtract(dotProd);


		// asteroid.vel = [-asteroid.vel[0], -asteroid.vel[1]];
		// otherAsteroid.vel = [-otherAsteroid.vel[0], -otherAsteroid.vel[1]];
		
		
		
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
		var elapsedTime = Math.floor((Date.now() - this.startTime) / 1000); 		
		if (options.dead === true) {
	    var name = prompt("Game Over! Your score is " + this.score + ". You survived for " + elapsedTime + " seconds. Enter your name!");
		} else {
	    alert("You win! That took you " + elapsedTime + " seconds.");	
		}
    this.stop();
	};
	
	
	Game.prototype.increaseDifficulty = function(){
		if (this.mode !== "Bossteroid"){
			this.scoreMultiplier += 1; 
			var difficulty = SETTINGS.difficulty; 
			Asteroid.speed += difficulty.asteroidSpeedIncrease; 
			Asteroid.spawnRadius *= difficulty.asteroidSpawnRadiusMultiplier;
			Asteroid.minimumArea *= difficulty.minimumAsteroidAreaMultiplier; 
		}

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
		})

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
		
		if (this.lives < 0){
			this.gameOver({dead: true});
		}

		var now = Date.now(); 
		var difficultyTimer = (now - this.startTime) % (SETTINGS.difficulty.timeInterval * 1000); 
		if (difficultyTimer < 30){
			this.increaseDifficulty();
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
			this.start();
			this.paused = false; 
		} else {
			this.stop(); 
			this.pauseText.draw(this.ctx);
			this.paused = true; 
		}
	};
	
	Game.prototype.updateUI = function(){
		this.ui.score = this.score;
	}

  
})(this);  