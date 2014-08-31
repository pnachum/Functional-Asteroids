(function (root){  
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});
	var MovingObject = AsteroidsGame.MovingObject;
	var toRadians = AsteroidsGame.toRadians;
	var Ship = AsteroidsGame.Ship;
	var SETTINGS = AsteroidsGame.SETTINGS;
	
	
	var Rotateable = AsteroidsGame.Rotateable = function(ship, pos, radius, color, degree){
    MovingObject.call(this, pos, [0, 0], radius, color);
		this.degree = degree; 
		this.ship = ship; 
	};
	
	
	Rotateable.inherits(MovingObject);
	
	Rotateable.prototype.direction = function(){
    var x = Math.cos(toRadians(this.degree));
    var y = -Math.sin(toRadians(this.degree));
		return [x, y];
	};
	
  Rotateable.prototype.move = function(){
    var ship = this.ship;
    var shipX = ship.pos[0]; 
    var shipY = ship.pos[1];
    
    var distX = ship.radius * Math.cos(toRadians(this.degree));
    var distY = ship.radius * Math.sin(toRadians(this.degree));
    
    this.pos = [shipX + distX, shipY - distY];
	};
	
	Rotateable.prototype.rotate = function(direction){
    this.degree = (this.degree + (direction * SETTINGS.ship.turnSpeed)) % 360; 
	};
	
})(this);