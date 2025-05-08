let sheepOne;
let sheepTwo;

let scoreOne = 0;
let scoreTwo = 0;

let flowers = [];
let bushes = [];

let gameSeconds = 0;
let flowerTimer = 0;

let gameOver = false;

function setup() {
  createCanvas(innerWidth, innerHeight);

  noStroke();
  textSize(18);
  textFont('Courier New');

  sheepOne = new Sheep({ x: width / 3, y: height / 2 });
  sheepTwo = new Sheep({ x: (2 * width) / 3, y: height / 2 });

  for (let i = 0; i < 20; i++) {
    flowers.push(new Flower(random(width), random(height)));
  }

  for (let i = 0; i < 10; i++) {
    bushes.push({ x: random(width), y: random(height) });
  }
}

function draw() {
  /**
   * GAME LOGIC
   */

  if (frameCount % 60 == 0) {
    gameSeconds++;
  }

  if (gameSeconds >= 60) {
    gameOver = true;
  }

  if (!gameOver) {
    for (let s of [sheepOne, sheepTwo]) {
      s.update();

      for (let i = flowers.length - 1; i >= 0; i--) {
        let f = flowers[i];

        if (dist(s.x, s.y, f.x, f.y) < 35) {
          s.startRest();

          if (!f.isDecaying) {
            f.startDecay();
          }

          s.addToScore(1);
        }

        if (f.isDecayed()) {
          flowers.splice(i, 1); // safely remove
          continue; // skip f.update() for this one since it's gone
        }

        f.update();
      }
    }

    flowerTimer++;

    if (flowerTimer > 100) {
      flowers.push(new Flower(random(width), random(height)));
      flowerTimer = 0;
    }
  }

  /**
   * RENDER LOGIC
   */

  if (gameOver) {
    background('black');

    textFont('Luminari');
    textSize(50);
    fill('white');
    ellipse(50, height / 2 - 5, 50, 50);
    ellipse(width - 50, height / 2 - 5, 50, 50);

    fill('white');
    textAlign(LEFT, CENTER);
    text(sheepOne.score, 100, height / 2);
    textAlign(RIGHT, CENTER);
    text(sheepTwo.score, width - 100, height / 2);

    textAlign(CENTER, CENTER);
    text('GAME OVER!', width / 2, height / 2 - 50);

    textSize(70);
    if (sheepOne.score > sheepTwo.score) {
      text('P1 WINS !!', width / 2, height / 2);
    } else if (sheepOne.score < sheepTwo.score) {
      text('P2 WINS !!', width / 2, height / 2);
    } else {
      text("IT'S A TIE :o", width / 2, height / 2);
    }

    return;
  }

  background('#83F28F');

  for (let b of bushes) {
    push();
    fill('darkgreen');
    text('\\|/', b.x, b.y);
    pop();
  }

  for (let s of [sheepOne, sheepTwo]) {
    s.draw();
  }

  for (let f of flowers) {
    f.draw();
  }

  // DRAW SCORES
  push();
  textFont('Luminari');
  textSize(50);
  fill('white');
  ellipse(50, 45, 50, 50);
  ellipse(width - 50, 45, 50, 50);

  fill('black');
  textAlign(LEFT, CENTER);
  text(sheepOne.score, 100, 50);
  textAlign(RIGHT, CENTER);
  text(sheepTwo.score, width - 100, 50);

  textSize(70);
  textAlign(CENTER, CENTER);
  text(60 - gameSeconds, width / 2, 50);

  pop();
}
