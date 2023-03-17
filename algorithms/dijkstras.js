import { map } from "../constants.js";
import { blocks } from "../index.js";
import { getCellNumber } from "../utils.js";

export default class Dijkstras {
  visited = new Set();
  updateMap = {};

  constructor(source, destination) {
    this.source = source;
    this.sourceCell = getCellNumber(source[0], source[1]);
    this.destination = destination;
    this.distance = new Array(Math.pow(map.length, 2)).fill(Infinity);
  }

  getMinVertex() {
    let min = Infinity;
    let minIndex = -1;

    for (let i = 0; i < this.distance.length; i++) {
      if (this.distance[i] < min && !this.visited.has(i)) {
        min = this.distance[i];
        minIndex = i;
      }
    }
    return minIndex;
  }

  findPath() {
    let queue = {
      [this.sourceCell]: this.source,
    };
    while (true) {
      let vertex = queue[this.getMinVertex()];
      console.log("vertex", vertex);
      if (vertex) {
        let [row, col] = [...vertex];
        let currentCell = getCellNumber(row, col);

        this.visited.add(currentCell);

        let cell = getCellNumber(row + 1, col);

        //check valid rows
        if (
          row + 1 < map.length &&
          !this.visited.has(cell) &&
          map[row + 1][col] === 1 &&
          this.distance[cell] > this.distance[currentCell]
        ) {
          this.updateDistance(currentCell, cell, row + 1, col);
          queue[cell] = [row + 1, col];
        }

        cell = getCellNumber(row - 1, col);
        if (
          row - 1 >= 0 &&
          !this.visited.has(cell) &&
          map[row - 1][col] === 1 &&
          this.distance[cell] > this.distance[currentCell]
        ) {
          this.updateDistance(currentCell, cell, row - 1, col);
          queue[cell] = [row - 1, col];
        }

        //check valid cols
        cell = getCellNumber(row, col - 1);
        if (
          col - 1 >= 0 &&
          !this.visited.has(cell) &&
          map[row][col - 1] === 1 &&
          this.distance[cell] > this.distance[currentCell]
        ) {
          this.updateDistance(currentCell, cell, row, col - 1);
          queue[cell] = [row, col - 1];
        }

        cell = getCellNumber(row, col + 1);
        if (
          col + 1 < map.length &&
          !this.visited.has(cell) &&
          map[row][col + 1] === 1 &&
          this.distance[cell] > this.distance[currentCell]
        ) {
          this.updateDistance(currentCell, cell, row, col + 1);
          queue[cell] = [row, col + 1];
        }
      } else {
        break;
      }
    }
  }
  updateDistance(cellFrom, cellTo, row, col) {
    this.distance[cellTo] = this.distance[cellFrom] + map[row][col];
    this.updateMap[cellTo] = cellFrom;
  }

  run() {
    this.distance[this.sourceCell] = 0;

    this.findPath();

    const destCell = getCellNumber(this.destination[0], this.destination[1]);

    let target = destCell;
    const path = [target];
    while (target != this.sourceCell) {
      path.push(this.updateMap[target]);
      target = this.updateMap[target];
    }
    this.tracePath(path);
  }

  tracePath(path) {
    let i = 1;
    this.visited.forEach((v) => {
      let b = blocks[v];
      setTimeout(() => {
        b.block.draw("gray");
      }, 1000 + i);
      i += 200;
    });

    for (let p = path.length - 1; p >= 0; p--) {
      let b = blocks[path[p]];
      setTimeout(() => {
        b.block.draw("orange");
      }, 1000 + i);
      i += 200;
    }
  }
}
