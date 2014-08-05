(function (root){  
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});
  
	// Having a default settings object allows to experiment with or test new settings
	// without worry
	var DEFAULT_SETTINGS = {
		
		asteroids: {
			startingNumber: 2, 
			startingMinimumArea: 5000,
			startingSpawnRadius: 30, 
			minimumRadius: 10,
			color: 'sienna', 
			spawnBufferRange: 100, 
			startingSpeed: 0.5
		}, 
		
		
		ship: {
			radius: 10, 
			color: 'blue', 
			maxSpeed: 5,
			turnSpeed: 10, 
			acceleration: 0.3, 
			thrusterRadius: 5, 
			thrusterColor: 'orange', 
			turretColor: 'blue',  
			turretRadius: 3,  
			airResistance: 0.05,
			invincibilityTime: 3
		},

		
		bullets: {
			standard: {
				radius: 2, 
				color: 'black',  
				speed: 20, 
				maximumNumber: 5, 
				distance: 400
			}
		}, 
		
		difficulty: {
			timeInterval: 30, 
			asteroidSpeedIncrease: 0.5, 
			asteroidSpawnRadiusMultiplier: 1.5, 
			minimumAsteroidAreaMultiplier: 1.5 
		}
		
		
	};
	
	var NEW_SETTINGS = {
		
		asteroids: {
			startingNumber: 2, 
			startingMinimumArea: 5000,
			startingSpawnRadius: 30, 
			minimumRadius: 10,
			color: 'sienna', 
			spawnBufferRange: 200,  
			startingSpeed: 0.5
		}, 
		
		ship: {
			radius: 10, 
			color: 'blue', 
			maxSpeed: 5, 
			turnSpeed: 10, 
			acceleration: 0.3, 
			thrusterRadius: 5, 
			thrusterColor: 'orange', 
			turretColor: 'blue',  
			turretRadius: 3,  
			airResistance: 0.07, 
			invincibilityTime: 3
		},

		bullets: {
			standard: {
				radius: 2, 
				color: 'black',  
				speed: 20, 
				maximumNumber: 5, 
				distance: 400
			}
		}, 
		
		debris: {
			radius: 1,
			distance: 400, 
			number: 10,
			speed: 20
		},
		
		difficulty: {
			timeInterval: 10, 
			asteroidSpeedIncrease: 0.15, 
			asteroidSpawnRadiusMultiplier: 1.0, 
			minimumAsteroidAreaMultiplier: 1.25 
		}, 
		
		startingLives: 2,

	};
	
	var SETTINGS = AsteroidsGame.SETTINGS = NEW_SETTINGS; 
	SETTINGS.updateMode = function(newMode) {
		SETTINGS.mode = newMode; 
		
		switch (SETTINGS.mode){
			case ("Bossteroid"):
				SETTINGS.asteroids.startingNumber = 1; 
				SETTINGS.asteroids.startingMinimumArea = 0; 
				SETTINGS.asteroids.startingSpawnRadius = 100; 
				break;
			case ("Dodgeball"):
				SETTINGS.bullets.standard.maximumNumber = 0;
				SETTINGS.startingLives = 0;
				SETTINGS.difficulty.timeInterval = 5;
				break;
			case ("Super Bossteroid"):
				SETTINGS.asteroids.startingNumber = 1; 
				SETTINGS.asteroids.startingMinimumArea = 0; 
				SETTINGS.asteroids.startingSpawnRadius = 173; 
				SETTINGS.startingLives = 6;
				break;
			case ("Classic"):  
				SETTINGS.asteroids.startingNumber = 2; 
				
				break;
		}
	};
	
	

	

	
	
	
	
	var shipPreset = 3; 
	
	switch (shipPreset){
		case 1:
			// SETTINGS.shipColor = 'blue';
			// SETTINGS.turretColor = 'blue';
			SETTINGS.turnSpeed = 5; 
			break; 
		case 2: 
			// SETTINGS.shipColor = 'red';
			// SETTINGS.turretColor = 'red';
			SETTINGS.turnSpeed = 15; 
			break; 
		case 3: 
			// SETTINGS.shipColor = 'green';
			// SETTINGS.turretColor = 'green';
			SETTINGS.turnSpeed = 10; 
			break;
	}
	
	
	
})(this);
	