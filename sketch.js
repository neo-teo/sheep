let sheep;

let flowers = [];
let grasses = [];

let timer = 0;

function setup() {
  createCanvas(innerWidth, innerHeight);

  noStroke();
  textSize(18);
  textFont('Courier New');
  text;

  sheep = new Sheep(width / 2, height / 2);

  for (let i = 0; i < 20; i++) {
    flowers.push(new Flower(random(width), random(height)));
  }

  for (let i = 0; i < 30; i++) {
    grasses.push(new Grass(random(width), random(height)));
  }
}

function draw() {
  for (let s of [sheep]) {
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

  if (timer > 300) {
    flowers.push(new Flower(random(width), random(height)));
    timer = 0;
  }

  background('#83F28F');

  for (let g of grasses) {
    g.draw();
  }

  for (let s of [sheep]) {
    s.draw();
  }

  for (let f of flowers) {
    f.draw();
  }
}
