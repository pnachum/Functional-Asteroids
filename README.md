Functional Asteroids
=========

## Overview

A rebuilt version of my [Asteroids](https://github.com/philpee2/Asteroids) project, but this time
with code that is functional instead of object oriented.

Asteroids is built using the following tools:
* HTML canvas to draw the game
* [Redux](https://github.com/reactjs/redux) to manage the game state
* [React](https://github.com/facebook/react) to build all the UI that isn't in a canvas
* [Babel](https://github.com/babel/babel) to transpile JS and JSX
* [Flow](https://github.com/facebook/flow) to add type checking
* [Webpack](https://github.com/webpack/webpack) for module bundling
* [Aphrodite](https://github.com/Khan/aphrodite) for styling in JS
* [Keymaster](https://github.com/madrobby/keymaster) for key press handling
* [Lodash](https://github.com/lodash/lodash) for utility functions
* [Enumify](https://github.com/rauschma/enumify) for enums
* [ESLint](https://github.com/eslint/eslint) for linting

## New features

This version has the same features as the previous version, plus some new ones.

* The player has a limited number of bombs, which destroy every asteroid in the game.
* There are new powerups.
* The gun powerup causes the ship to temporarily shoot a three-bullet spread. Previously it would
  make the bullets larger and faster.
* The sound can be turned off.
* When the game ends, a new one can begin without refreshing the page.

## Running locally

* Clone the repo
* `npm install`
* `webpack`
* `open index.html`
