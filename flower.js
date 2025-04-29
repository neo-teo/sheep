class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.pix = 6;

    this.h = 0;
    this.maxH = floor(random(2, 4));
    this.petalStage = -1;
    this.petalStages = [
      [{ x: 0, y: 0 }],
      [
        { x: 0.5, y: 0 },
        { x: -0.5, y: 0 },
        { x: 0.5, y: -1 },
        { x: -0.5, y: -1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: -2 },
        { x: -1, y: -1 },
        { x: 1, y: -1 },
        { x: 0, y: -1, inner: true },
      ],
    ];

    this.growthTimer = 0;

    this.c = random([
      { inner: 'white', outer: 'red' },
      { inner: 'white', outer: 'yellow' },
      { inner: 'white', outer: 'orange' },
      { inner: 'white', outer: 'blue' },
      { inner: 'yellow', outer: 'red' },
      { inner: 'yellow', outer: 'blue' },
    ]);
  }

  update() {
    if (this.isGrown()) {
      return;
    }

    this.grow();
  }

  isGrown() {
    return this.h >= this.maxH && this.petalStage === 2;
  }

  grow() {
    this.growthTimer++;
    if (this.growthTimer > 50) {
      if (this.h < this.maxH) {
        this.h++;
      } else {
        this.petalStage++;
      }
      this.growthTimer = 0;
    }
  }

  draw() {
    push();
    // stem
    fill('green');
    for (let i = 0; i < this.h; i++) {
      rect(this.x, this.y - i * this.pix, this.pix, this.pix);
    }

    if (this.petalStage > -1) {
      translate(this.x, this.y - this.maxH * this.pix);
      for (let p of this.petalStages[this.petalStage]) {
        p.inner ? fill(this.c.inner) : fill(this.c.outer);
        rect(p.x * this.pix, p.y * this.pix, this.pix, this.pix);
      }
    }
    pop();
  }
}
