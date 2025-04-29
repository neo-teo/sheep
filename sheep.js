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
    ellipse(this.x, this.y, 20, 20);

    // if angle is between 0 and PI --> left
    // if this.isResting, img is resting_left
    // else img is walking_left

    // else --> right
    // if this.isResting, img is resting_right
    // else img is walking_right
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
