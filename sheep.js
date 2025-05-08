let red_sheep_left_walk;
let red_sheep_left;
let red_sheep_right_walk;
let red_sheep_right;

let blue_sheep_left_walk;
let blue_sheep_left;
let blue_sheep_right_walk;
let blue_sheep_right;

function preload() {
  red_sheep_left_walk = loadImage('/assets/red_walking_left.gif');
  red_sheep_right_walk = loadImage('/assets/red_walking_right.gif');
  red_sheep_left = loadImage('/assets/red_eating_left.gif');
  red_sheep_right = loadImage('/assets/red_eating_right.gif');

  blue_sheep_left_walk = loadImage('/assets/blue_walking_left.gif');
  blue_sheep_right_walk = loadImage('/assets/blue_walking_right.gif');
  blue_sheep_left = loadImage('/assets/blue_eating_left.gif');
  blue_sheep_right = loadImage('/assets/blue_eating_right.gif');
}

const wasdControls = {
  w: 'UP',
  s: 'DOWN',
  a: 'LEFT',
  d: 'RIGHT',
};

const arrowControls = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
};

class Sheep {
  constructor({ x, y, controls, color }) {
    this.x = x;
    this.y = y;

    this.score = 0;

    // noise indices
    this.velocity = 1;
    this.angle = PI / 2;

    this.ni = 0;

    this.isResting = false;
    this.restTimer = 0;

    this.controls = controls === 'wasd' ? wasdControls : arrowControls;
    this.color = color
    if (color === 'red') {
      this.sheep_left = red_sheep_left;
      this.sheep_left_walk = red_sheep_left_walk;
      this.sheep_right = red_sheep_right;
      this.sheep_right_walk = red_sheep_right_walk;
    } else {
      this.sheep_left = blue_sheep_left;
      this.sheep_left_walk = blue_sheep_left_walk;
      this.sheep_right = blue_sheep_right;
      this.sheep_right_walk = blue_sheep_right_walk;
    }
  }

  addToScore(n) {
    this.score += n;
  }

  update() {
    if (this.isResting) {
      this.restTimer++;
      if (this.restTimer > 100) this.endRest();
      return;
    }

    // if keydown velocity = 1 otherwise

    let newX = this.x + this.velocity * Math.cos(this.angle);
    let newY = this.y + this.velocity * Math.sin(this.angle);

    let distanceFromEdges = 50;

    if (
      newX < distanceFromEdges ||
      newX > width - distanceFromEdges ||
      newY < distanceFromEdges ||
      newY > height - distanceFromEdges
    ) {
      return;
    }

    this.x = newX;
    this.y = newY;
  }

  setDirectionFromKey(k) {
    const direction = this.controls[k];
    if (!direction || this.isResting) return;

    switch (direction) {
      case 'UP':
        this.angle = -PI / 2;
        break;
      case 'DOWN':
        this.angle = PI / 2;
        break;
      case 'LEFT':
        this.angle = PI;
        break;
      case 'RIGHT':
        this.angle = 0;
        break;
    }
  }

  draw() {
    ellipse(this.x, this.y, 1, 1);

    let facingLeft = cos(this.angle) < 0;

    if (facingLeft) {
      if (this.isResting) {
        image(this.sheep_left, this.x - 25, this.y - 25);
      } else {
        image(this.sheep_left_walk, this.x - 25, this.y - 25);
      }
    } else {
      if (this.isResting) {
        image(this.sheep_right, this.x - 25, this.y - 25);
      } else {
        image(this.sheep_right_walk, this.x - 25, this.y - 25);
      }
    }
  }

  startRest() {
    this.isResting = true;
    this.restTimer = 0;
  }

  endRest() {
    this.isResting = false;
    this.restTimer = 0;
    this.angle = (this.angle + PI) % TWO_PI;
  }
}
