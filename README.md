Asteroids
=========

## Overview

A deployed version of Asteroids can be found [here](https://philnachumasteroids.firebaseapp.com/). It's a simple variant on the original arcade game.

Asteroids is built using HTML canvas, which draws objects at every frame. The game logic is written in Javascript.

## How to play

On the opening menu, click on a mode to select it, which begins the game. Use the left and right arrow keys to rotate the ship, the up arrow key to move, the space bar to fire, and the P key to pause/unpause.

## Notable Features

* There are multiple game modes to choose from
* The game has various sound effects
* Powerups are periodically placed in the game, which can be picked up for bonuses
* The game keeps track of the player's score, remaining lives, elapsed time, and score multiplier. These are displayed to the user depending on whether they're relevant to the current game mode.
* Upon spawning, the ship will be briefly invincible, indicated by flashing.

## Future Todos

### Asteroid physics

I've previously tried to get the asteroids to bounce off of each other with realistic collision physics based on the asteroids velocity and size (as a proxy for mass). The result was incredibly buggy, mostly due to the possibility of asteroids overlapping. This needs a lot more work.

### Leaderboards

Currently, the end game alert prompts the user for their name, but does nothing with it. I'd like to store a leaderboard of the top scores, which displays after each game.

### Weapon types

In addition to choosing a mode at the beginning of the game, players should also be able to choose a weapon type.
