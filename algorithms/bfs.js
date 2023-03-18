import { map } from "../constants.js";
import { blocks } from "../index.js";
import { getCellNumber } from "../utils.js";

export default class Bfs {
  path = {};
  visited = new Set();
  constructor(source, destination) {
    this.source = source;
    this.sourceCell = getCellNumber(source[0], source[1]);
    this.destCell = getCellNumber(destination[0], destination[1]);
  }

  run() {
    let q = [];

    q.push(this.source);
    this.visited.add(0);
    while (q.length != 0) {
      let [row, col] = [...q.shift()];
      let currentCell = getCellNumber(row, col);

      if (currentCell === this.destCell) {
        return this.tracePath();
      }

      let cell = getCellNumber(row - 1, col);
      if (row - 1 >= 0 && !this.visited.has(cell) && map[row - 1][col] == 1) {
        this.visited.add(cell);
        q.push([row - 1, col]);
        this.path[cell] = currentCell;
      }
      cell = getCellNumber(row, col - 1);
      if (col - 1 >= 0 && !this.visited.has(cell) && map[row][col - 1] == 1) {
        this.visited.add(cell);
        q.push([row, col - 1]);
        this.path[cell] = currentCell;
      }

      cell = getCellNumber(row + 1, col);
      if (
        row + 1 < map.length &&
        !this.visited.has(cell) &&
        map[row + 1][col] == 1
      ) {
        this.visited.add(cell);
        q.push([row + 1, col]);
        this.path[cell] = currentCell;
      }

      cell = getCellNumber(row, col + 1);
      if (
        col + 1 < map.length &&
        !this.visited.has(cell) &&
        map[row][col + 1] == 1
      ) {
        this.visited.add(cell);
        q.push([row, col + 1]);
        this.path[cell] = currentCell;
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
    });

    let target = this.destCell;
    const path = [target];
    while (target != this.sourceCell) {
      path.push(this.path[target]);
      target = this.path[target];
    }
    for (let p = path.length - 1; p >= 0; p--) {
      let b = blocks[path[p]];
      setTimeout(() => {
        b.block.draw("orange");
      }, 1000 + i);
      i += 200;
    }
  }

  findPath() {}
}
