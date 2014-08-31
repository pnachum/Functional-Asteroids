(function (root){  
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});
	
	var MovingObject = AsteroidsGame.MovingObject; 
	var SETTINGS = AsteroidsGame.SETTINGS; 
	var random = AsteroidsGame.random;
  var randomFromArray = AsteroidsGame.randomFromArray;
  var StandardBullet = AsteroidsGame.StandardBullet; 
  
 
  
  var types = ["life", "score", "bullet", "invincible", "rotate"];
	var Powerup = AsteroidsGame.Powerup = function(pos, type, game){
    MovingObject.call(this, pos, [0, 0], SETTINGS.powerups.radius, colorMap[type]);
    this.type = type;
    this.game = game; 
	};
  
  Powerup.inherits(MovingObject);
  
  var colorMap = Powerup.colorMap = {
    bullet: SETTINGS.bullets.standard.color, 
    life: SETTINGS.ship.color,
    score: "green",
    invincible: "purple"
  };
  
  
  

  
  Powerup.randomPowerup = function(game) {
    var position = [random(0, 500), random(0, 500)];
    if (game.lives >= 5) {
      // If the player has more than 5 lives, don't spawn extra life powerups
      var type = randomFromArray(types.slice(1));
    } else {
      var type = randomFromArray(types);
    }

    return new Powerup(position, type, game);
  };
  
  Powerup.prototype.applyEffect = function() {
    var game = this.game; 
    var ship = game.ship;
    
    
    switch (this.type) {
    case "bullet":
      StandardBullet.SPEED *= 1.5;
      StandardBullet.RADIUS *= 2; 
      SETTINGS.bullets.standard.distance *= 1.5;
      setTimeout(function() {
        StandardBullet.SPEED /= 1.5;
        StandardBullet.RADIUS /= 2; 
        SETTINGS.bullets.standard.distance /= 1.5;
      }, 5000);
      break;
    case "life":
      game.lives++;
      break;
    case "score":
      game.increaseDifficulty();
      break;
    case "invincible":
      ship.invincible = true; 
      setTimeout(function() {
        ship.invincible = false;
      }, 5000);
      break;
    }
  }
	
  
})(this);	