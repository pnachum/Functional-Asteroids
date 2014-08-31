(function (root){  
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});

	var GameText = AsteroidsGame.GameText = function(string, size, pos, color){
		this.string = string; 
		this.size = size; 
		this.pos = pos; 
    this.color = color; 
	};
	
	GameText.prototype.draw = function(ctx){
		ctx.fillStyle = this.color; 
		ctx.font = this.size + "pt Arial ";
		ctx.fillText(this.string, this.pos[0], this.pos[1]);
	};
	
})(this);