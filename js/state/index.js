import { createStore } from 'redux';
import asteroidsApp from './reducers';
import { move, addAsteroid } from './action_creators';
import { DIMENSION, FRAMES_PER_SECOND, SETTINGS } from '../constants';
import { times, random, sample } from 'lodash';

let store = createStore(asteroidsApp);
let intervalId;
let ctx;

export default function start(context) {
  ctx = context;
  initGame();
  const interval = Math.floor(1000 / FRAMES_PER_SECOND);
  intervalId = setInterval(step, interval);
}

function initGame() {
  addRandomAsteroids(SETTINGS.asteroids.startingNumber);
}

function addRandomAsteroids(numAsteroids) {
  times(numAsteroids, () => {
    const asteroid = randomAsteroid(DIMENSION, DIMENSION);
    store.dispatch(addAsteroid(asteroid));
  });
}

function randomAsteroid(dimX, dimY) {
  // Asteroids in dodgeball have a predefined set of sizes
  // const radius = options.dodgeball ? sample([15, 21.2, 30]) : Asteroid.spawnRadius;

  const pos = randomPos(dimX, dimY);
  const vel = randomVel(dimX, dimY, SETTINGS.asteroids.startingSpeed);
  const radius = SETTINGS.asteroids.startingSpawnRadius;
  return {
    pos,
    vel,
    radius,
  };
}

// Pick a random position along the edge of the game for the asteroid to
// spawn at
function randomPos(dimX, dimY) {
  const radius = SETTINGS.asteroids.startingSpawnRadius;
  const randomX = random(-radius, dimX + radius);
  const randomY = random(-radius, dimY + radius);
  const edgeX = sample([-radius, dimX + radius]);
  const edgeY = sample([-radius, dimY + radius]);
  const candidate1 = [edgeX, randomY];
  const candidate2 = [randomX, edgeY];
  return sample([candidate1, candidate2]);
}

// Pick a random direction for the asteroid to begin moving in
function randomVel(dimX, dimY, intensity) {
  return [dimX, dimY].map(dim => {
    const range = (intensity * dim) / 125;
    const direction = sample([-1, 1]);
    return random(1, range) * direction;
  });
}

function step() {
  store.dispatch(move());
}

function clear() {
  ctx.clearRect(0, 0, DIMENSION, DIMENSION);
}

function draw() {
  const { asteroids } = store.getState();
  clear();
  asteroids.forEach(asteroid => {
    const obj = {
      color: SETTINGS.asteroids.color,
      pos: asteroid.pos,
      radius: asteroid.radius,
    };
    drawObject(obj, ctx);
  });
}

function drawObject({ color, pos, radius }, context) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(
    pos[0],
    pos[1],
    radius,
    0,
    2 * Math.PI,
    false
  );
  context.fill();
}

let unsubscribe = store.subscribe(draw);
