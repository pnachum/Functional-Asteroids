(function (root){  
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});
	var Rotateable = AsteroidsGame.Rotateable;
	var SETTINGS = AsteroidsGame.SETTINGS;
	
	var Thruster = AsteroidsGame.Thruster = function(ship){
		var startingPos = [ship.pos[0], ship.pos[1] + ship.radius]
		
    Rotateable.call(this, ship, startingPos, Thruster.RADIUS, Thruster.COLOR, 270);
	};
	
	Thruster.RADIUS = SETTINGS.ship.thrusterRadius;
	Thruster.COLOR = SETTINGS.ship.thrusterColor; 
	
	Thruster.inherits(Rotateable);
	
	
})(this);