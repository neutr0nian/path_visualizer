import { map } from "./constants.js";
import { blocks } from "./index.js";

const N = map.length;
export function getCellNumber(row, col) {
  return row * N + col;
}

export function getRowColumn(cellNumber, len) {
  let row = cellNumber % len;
  let col = Math.trunc(cellNumber / len);
  return [row, col];
}

export function animate(blocks) {
  blocks.forEach((b) => {
    let color = b.type === "barrier" ? "#2E4057" : "white";
    b.block.draw(color);
  });
}

export function fillColor(position, color) {
  let cell = getCellNumber(...position);
  blocks[cell].block.draw(color);
}
