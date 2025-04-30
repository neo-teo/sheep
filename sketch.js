let sheep = [];
let flowers = [];
let bushes = [];

let timer = 0;

function setup() {
  createCanvas(innerWidth, innerHeight);

  noStroke();
  textSize(18);
  textFont('Courier New');
  text;

  sheep.push(new Sheep(width / 2, height / 2));
  for (let i = 0; i < 3; i++) {
    sheep.push(new Sheep(random(width), random(height)));
  }

  for (let i = 0; i < 20; i++) {
    flowers.push(new Flower(random(width), random(height)));
  }

  for (let i = 0; i < 10; i++) {
    bushes.push({ x: random(width), y: random(height) });
  }
}

function draw() {
  for (let s of sheep) {
    s.update();

    for (let i = flowers.length - 1; i >= 0; i--) {
      let f = flowers[i];

      if (dist(s.x, s.y, f.x, f.y) < 35) {
        s.startRest();
        f.startDecay();
      }

      if (f.isDecayed()) {
        flowers.splice(i, 1); // safely remove
        continue; // skip f.update() for this one since it's gone
      }

      f.update();
    }
  }

  timer++;

  if (timer > 100) {
    flowers.push(new Flower(random(width), random(height)));
    timer = 0;
  }

  background('#83F28F');

  for (let b of bushes) {
    push();
    fill('darkgreen');
    text('\\|/', b.x, b.y);
    pop();
  }

  for (let s of sheep) {
    s.draw();
  }

  for (let f of flowers) {
    f.draw();
  }
}
