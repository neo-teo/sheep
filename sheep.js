let sheep_left_walk;
let sheep_left;
let sheep_right_walk;
let sheep_right;

function preload() {
  sheep_left_walk = loadImage('/assets/sheep_left_walk_tiny.gif');
  sheep_left = loadImage('/assets/sheep_left_tiny.gif');
  sheep_right_walk = loadImage('/assets/sheep_right_walk_tiny.gif');
  sheep_right = loadImage('/assets/sheep_right_tiny.gif');
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
  constructor({ x, y, controls }) {
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
        image(sheep_left, this.x - 25, this.y - 25);
      } else {
        image(sheep_left_walk, this.x - 25, this.y - 25);
      }
    } else {
      if (this.isResting) {
        image(sheep_right, this.x - 25, this.y - 25);
      } else {
        image(sheep_right_walk, this.x - 25, this.y - 25);
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
