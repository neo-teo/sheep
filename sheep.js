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

class Sheep {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    // noise indices
    this.velocity = 1;
    this.angle = PI / 2;

    this.ni = 0;

    this.isResting = false;
    this.restTimer = 0;
  }

  update() {
    if (this.isResting) {
      this.restTimer++;
      if (this.restTimer > 100) this.endRest();
      return;
    }

    let n = noise(this.ni);

    this.x += this.velocity * Math.cos(this.angle);
    this.y += this.velocity * Math.sin(this.angle);

    let distanceFromEdges = 50;
    if (
      random() < 0.0005 ||
      this.x < distanceFromEdges ||
      this.x > width - distanceFromEdges ||
      this.y < distanceFromEdges ||
      this.y > height - distanceFromEdges
    ) {
      this.startRest();
    }

    let d_angle = map(n, 0, 1, -0.02, 0.02);
    this.angle = (this.angle + d_angle) % TWO_PI;
    this.ni += 0.01;
  }

  draw() {
    ellipse(this.x, this.y, 1, 1);

    // if angle is between 0 and PI --> left
    // if this.isResting, img is resting_left
    // else img is walking_left

    // else --> right
    // if this.isResting, img is resting_right
    // else img is walking_right


    let facingLeft = this.angle >=0 && this.angle < PI;

    if(facingLeft){
      if(this.isResting){
        image(sheep_left, this.x -25, this.y -25)
      }else{
        image(sheep_left_walk, this.x -25, this.y -25)
      }
    }else{
      if(this.isResting){
        image(sheep_right, this.x -25, this.y -25);
      }else{
        image(sheep_right_walk, this.x -25, this.y-25);
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

