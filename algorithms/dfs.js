import { map } from "../constants.js";
import { blocks } from "../index.js";
import { getCellNumber } from "../utils.js";

export default class Dfs {
  visited = new Set();
  timer = 1;

  constructor(source, destination) {
    this.source = source;
    this.destCell = getCellNumber(destination[0], destination[1], map.length);
  }

  tracePath(block) {
    let [row, col] = [...block];
    let currentCell = getCellNumber(row, col);
    let b = blocks[currentCell];
    console.log(currentCell, this.destCell);
    if (currentCell === this.destCell) {
      setTimeout(() => {
        b.block.draw("green");
      }, 1000 + this.timer);
      return true;
    } else {
      setTimeout(() => {
        b.block.draw("orange");
      }, 1000 + this.timer);
      this.timer += 200;
    }
    let res = false;
    //check valid columns
    let cell = getCellNumber(row, col - 1);
    if (
      !res &&
      col - 1 >= 0 &&
      !this.visited.has(cell) &&
      map[row][col - 1] === 1
    ) {
      this.visited.add(cell);
      res = this.tracePath([row, col - 1]);
    }
    cell = getCellNumber(row, col + 1);
    if (
      !res &&
      col + 1 < map.length &&
      !this.visited.has(cell) &&
      map[row][col + 1] === 1
    ) {
      this.visited.add(cell);
      res = this.tracePath([row, col + 1]);
    }
    //check valid rows
    cell = getCellNumber(row + 1, col);
    if (
      !res &&
      row + 1 < map.length &&
      !this.visited.has(cell) &&
      map[row + 1][col] === 1
    ) {
      this.visited.add(cell);
      res = this.tracePath([row + 1, col]);
    }
    cell = getCellNumber(row - 1, col);
    if (
      !res &&
      row - 1 >= 0 &&
      !this.visited.has(cell) &&
      map[row - 1][col] === 1
    ) {
      this.visited.add(cell);
      res = this.tracePath([row - 1, col]);
    }
    if (!res) {
      setTimeout(() => {
        b.block.draw("gray");
      }, this.timer + 1000);
      this.timer += 200;
    }
    return res;
  }

  run() {
    this.visited.add(getCellNumber(this.source[0], this.source[1]));
    this.tracePath(this.source);
  }
}
