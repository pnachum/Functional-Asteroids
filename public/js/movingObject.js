(function (root){  
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});

  
  var MovingObject = AsteroidsGame.MovingObject = function(pos, vel, radius, color){
    this.pos = pos; 
    this.vel = vel;
    this.color = color;
    this.radius = radius;
  };
	
	MovingObject.prototype.distance = function(other){
		var xDiff = this.pos[0] - other.pos[0];
		var yDiff = this.pos[1] - other.pos[1];
		return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
	};
	
  MovingObject.prototype.draw = function(ctx){
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  };
	
  MovingObject.prototype.isCollidedWith = function(otherObject){
		if (this === otherObject) { 
			return false; 
		}
		
    var distance = this.distance(otherObject)
  
    return (distance < this.radius + otherObject.radius);
  };
	
	MovingObject.prototype.mapToScreen = function(){
		var radius = this.radius
		if (this.pos[0] >= 500 + radius){
			this.pos[0] -= (500 + 2 * radius)
		} else if (this.pos[0] <= 0 - radius) {
			this.pos[0] += (500 + 2 * radius)
		}
		
		if (this.pos[1] >= 500 + radius){
			this.pos[1] -= (500 + 2 * radius)
		} else if (this.pos[1] <= 0 - radius) {
			this.pos[1] += (500 + 2 * radius)
		}
	};
	
  MovingObject.prototype.move = function(){
		this.pos[0] += this.vel[0];
		this.pos[1] += this.vel[1];
		this.mapToScreen();
  };

})(this);










