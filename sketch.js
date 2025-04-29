let sheep;

function setup() {
  createCanvas(innerWidth, innerHeight);

  noStroke();

  sheep = new Sheep(width / 2, height / 2);
}

function draw() {
  sheep.update();

  background('#83F28F');

  sheep.draw();
}
