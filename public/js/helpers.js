(function (root){
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});

  Object.prototype.inherits = function(superclass){
    superclass.surrogate = superclass.surrogate || function Surrogate(){};
    superclass.surrogate.prototype = superclass.prototype;
    this.prototype = new superclass.surrogate();
  };

  Array.prototype.removeItem = function(item){
    var badIndex = this.indexOf(item);
    this.splice(badIndex, 1);
  };

  var toRadians = AsteroidsGame.toRadians = function(degrees){
    return degrees * (Math.PI / 180);
  };

})(this);
