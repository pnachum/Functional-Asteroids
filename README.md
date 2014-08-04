Asteroids
=========

## Overview

A deployed version of Asteroids can be found [here](http://philnachumasteroids.herokuapp.com/). It's a simple variant on the original arcade game. 

On the opening menu, click on a mode to select it, which begins the game. Use the left and right arrow keys to rotate the ship, the up arrow key to move, the space bar to fire, and the P key to pause/unpause. 

Asteroids is built using HTML canvas, which draws objects at every frame. The game logic is written in Javascript. 

## Notable Features
* Asteroids will spawn infinitely, with increasing speed and frequency over time (except in the Bossteroid and Super Bossteroid modes). The score multiplier also increases over time. 
* There is a small amount of friction on the ship (not physically accurate, given the lack of air resistance in space, but it makes for a better game).
* The game keeps track of the player's score, remaining lives, elapsed time, and score multiplier. These are displayed to the user depending on whether they're relevant to the current game mode. 
* Upon spawning, the ship will be briefly invincible, indicated by flashing. 


## Future Todos

### Fix pausing bug

Currently, the passage of time is calculated based on the difference between the time at which it is calculated, and the time at which the game was started. This means that the in-game timer still counts up even when the game is paused. 

### Asteroid physics

I've previously tried to get the asteroids to bounce off of each other with realistic collision physics based on the asteroids velocity and size (as a proxy for mass). The result was incredibly buggy, mostly due to the possibility of asteroids overlapping. This needs a lot more work. 

### Leaderboards

Currently, the end game alert prompts the user for their name, but does nothing with it. I'd like to store a leaderboard of the top scores, which displays after each game.  

### Weapon types

In addition to choosing a mode at the beginning of the game, players should also be able to choose a weapon type. 

### Powerups

The game should periodically spawn powerups that the player can pick up, such as extra lives, increased score multiplier, temporary invincibility, or faster bullets. 

### Music and sound effects

In particular, I'd love it if the Bossteroid and Super Bossteroid game modes played the theme from 2001: A Space Odyssey. Hopefully there aren't any copyright issues. 