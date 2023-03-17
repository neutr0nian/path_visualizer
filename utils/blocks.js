import { c } from "../index.js";

export default class Block {
  static width = 100;
  static height = 100;

  constructor({ position }) {
    this.position = position;
    this.width = 100;
    this.height = 100;
  }

  draw(color) {
    c.fillStyle = color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.strokeStyle = "#2E4057";
    c.strokeRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export const map = [
  [1, 0, 1, 1, 0],
  [1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1],
  [1, 1, 1, 1, 0],
];

export function prepareBlocks(blocks) {
  map.forEach((row, index) => {
    row.forEach((val, i) => {
      blocks.push({
        block: new Block({
          position: {
            x: Block.width * i,
            y: Block.width * index,
          },
        }),
        type: val === 0 ? "barrier" : "",
      });
    });
  });
}
