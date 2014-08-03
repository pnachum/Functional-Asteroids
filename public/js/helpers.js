(function (root){  
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});
	

	
  Object.prototype.inherits = function(superclass){
    superclass.surrogate = superclass.surrogate || function Surrogate(){};
    superclass.surrogate.prototype = superclass.prototype;
    this.prototype = new superclass.surrogate();
  };
	
	// random integer between min and max inclusive
	var random = AsteroidsGame.random = function(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	
	var randomFromArray = AsteroidsGame.randomFromArray = function(array){
		var index = random(0, array.length - 1);
		return array[index];
	};
	
	Array.prototype.removeItem = function(item){
		var badIndex = this.indexOf(item);
		this.splice(badIndex, 1);
	};
	
  var toRadians = AsteroidsGame.toRadians = function(degrees){
    return degrees * (Math.PI / 180);
  };
	
	
})(this);