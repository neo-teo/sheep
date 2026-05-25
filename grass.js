class Grass {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.pix = 6;

    const variants = [
      // .
      //  .
      [{ x: 0, y: 1 }, { x: 0, y: 0 }],

      // . .
      //  .
      //  .
      [{ x: 0, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 0 }],

      // .
      //  .
      //  .
      [{ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 0 }],

      //  .
      // .
      // .
      [{ x: 1, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }],
    ];

    this.shape = random(variants);
  }

  draw() {
    push();
    fill('#2d8a2d');
    for (let dot of this.shape) {
      rect(
        this.x + dot.x * this.pix,
        this.y - dot.y * this.pix,
        this.pix,
        this.pix
      );
    }
    pop();
  }
}
