(function (root){  
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});
	var GameText = AsteroidsGame.GameText; 
	var SETTINGS = AsteroidsGame.SETTINGS; 
	
	
	var UI = AsteroidsGame.UI = function(game, ctx){
		this.game = game; 
		this.ctx = ctx
		this.scoreText = new GameText("", 20, [5, 30], "black");
		this.multiplierText = new GameText("", 20, [5, 60], "black");
		this.modeText = new GameText("", 20, [5, 130], "black");
		this.timeText = new GameText("", 20, [5, 160], "black")
		
	};
	
	UI.DIM_X = 250;
	UI.DIM_Y = 500;	
	
	UI.prototype.draw = function(){
    this.ctx.clearRect(0, 0, UI.DIM_X, UI.DIM_Y);
		var game = this.game; 
		var mode = game.mode; 
		this.scoreText.string = "Score: " + game.score;
		this.multiplierText.string = "x" + game.scoreMultiplier;
		this.modeText.string = "Mode: " + mode;
		this.timeText.string = "Time: " + Math.floor(game.timer / 1000); 
		
		
		if (mode === "Classic"){
			this.scoreText.draw(this.ctx);
			this.multiplierText.draw(this.ctx);
		} 
		if (mode === "Bossteroid" || mode === "Super Bossteroid" || mode === "Classic"){
			this.drawShipIcons(this.ctx);
		}
		if (mode === "Bossteroid" || mode === "Super Bossteroid" || mode === "Dodgeball"){
			this.timeText.draw(this.ctx);
		}
		this.modeText.draw(this.ctx);
	};
	
	UI.prototype.drawShipIcons = function(ctx){
		for (var i = 0; i < this.game.lives; i++){
			var shipPos = [20 + 25 * i, 90];
			var shipRadius = this.game.ship.radius; 
			var turretRadius = this.game.ship.turret.radius;
			var color = SETTINGS.ship.color; 
			
	    ctx.fillStyle = color;
	    ctx.beginPath();
	    ctx.arc(
	      shipPos[0],
	      shipPos[1],
	      shipRadius,
	      0,
	      2 * Math.PI,
	      false
	    );
	    ctx.fill();
			
	    ctx.fillStyle = color;
	    ctx.beginPath();
	    ctx.arc(
	      shipPos[0],
	      shipPos[1] - shipRadius,
	      turretRadius,
	      0,
	      2 * Math.PI,
	      false
	    );
	    ctx.fill();
			
			
		}
	}
	
})(this);
  