let sheep;
let flowers = [];
let bushes = [];

function setup() {
  createCanvas(innerWidth, innerHeight);

  noStroke();
  textSize(18);
  textFont('Courier New');
  text;

  sheep = new Sheep(width / 2, height / 2);

  flowers.push(new Flower(width / 2, height / 3));

  for (let i = 0; i < 10; i++) {
    bushes.push({ x: random(width), y: random(height) });
  }
}

function draw() {
  sheep.update();
  for (let f of flowers) {
    f.update();
  }

  background('#83F28F');

  sheep.draw();
  for (let f of flowers) {
    f.draw();
  }

  for (let b of bushes) {
    push();
    fill('darkgreen');
    text('\\|/', b.x, b.y);
    pop();
  }
}
