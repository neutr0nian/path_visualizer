import { map } from "../constants.js";
import { blocks } from "../index.js";
import { getCellNumber } from "../utils.js";

export default class Bfs {
  path = new Set();
  visited = new Set();
  constructor(source, destination) {
    this.source = source;
    this.destCell = getCellNumber(destination[0], destination[1]);
  }

  run() {
    let q = [];

    q.push(this.source);
    this.visited.add(0);
    while (q.length != 0) {
      let [row, col] = [...q.shift()];
      let cellNumber = getCellNumber(row, col);
      this.path.add(cellNumber);

      if (cellNumber === this.destCell) {
        return this.tracePath();
      }

      let cell = getCellNumber(row - 1, col);
      if (row - 1 >= 0 && !this.visited.has(cell) && map[row - 1][col] == 1) {
        this.visited.add(cell);
        q.push([row - 1, col]);
      }
      cell = getCellNumber(row, col - 1);
      if (col - 1 >= 0 && !this.visited.has(cell) && map[row][col - 1] == 1) {
        this.visited.add(cell);
        q.push([row, col - 1]);
      }

      cell = getCellNumber(row + 1, col);
      if (
        row + 1 < map.length &&
        !this.visited.has(cell) &&
        map[row + 1][col] == 1
      ) {
        this.visited.add(cell);
        q.push([row + 1, col]);
      }

      cell = getCellNumber(row, col + 1);
      if (
        col + 1 < map.length &&
        !this.visited.has(cell) &&
        map[row][col + 1] == 1
      ) {
        this.visited.add(cell);
        q.push([row, col + 1]);
      }
    }
  }

  tracePath() {
    let i = 1;
    this.visited.forEach((v) => {
      let block = blocks[v];
      setTimeout(() => {
        block.block.draw("gray");
      }, 1000 + i);
      i += 100;
      if (this.path.has(v)) {
        let color = v === this.destCell ? "green" : "orange";
        setTimeout(() => {
          block.block.draw(color);
        }, 1000 + i + 100);
      }
      i += 100;
    });
  }

  findPath() {}
}
