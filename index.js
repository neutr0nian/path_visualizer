import Bfs from "./algorithms/bfs.js";
import Dfs from "./algorithms/dfs.js";
import Dijkstras from "./algorithms/dijkstras.js";
import { map } from "./constants.js";
import { animate, fillColor, getCellNumber } from "./utils.js";
import { prepareBlocks } from "./utils/blocks.js";

const canvas = document.querySelector("canvas");
export const c = canvas.getContext("2d");

//buttons
const bfsBtn = document.getElementById("bfs-btn");
const dfsBtn = document.getElementById("dfs-btn");
const djkBtn = document.getElementById("djk-btn");
const runBtn = document.getElementById("run-btn");

//inputs
const sourceRowInput = document.getElementById("s-row");
const sourceColInput = document.getElementById("s-col");

const destinationRowInput = document.getElementById("d-row");
const destinationColInput = document.getElementById("d-col");

const SOURCE = [0, 0];
const DEST = [0, 0];

let ALGOTORUN = "";

export const blocks = [];

prepareBlocks(blocks);
animate(blocks);

sourceRowInput.addEventListener("change", (e) => {
  const row = parseInt(e.target.value) - 1;
  console.log(SOURCE[0]);
  if (row > map.length - 1 || row < 0) {
    alert("Please select a valid source row");
  } else if (map[row][SOURCE[1]] !== 1) {
    alert("Selected [row, col] is not a valid cell");
  } else {
    fillColor(SOURCE, "white");
    SOURCE[0] = row;
    fillColor(SOURCE, "purple");
  }
});

sourceColInput.addEventListener("change", (e) => {
  const col = parseInt(e.target.value) - 1;
  if (col > map.length - 1 || col < 0) {
    alert("Please enter valid source column");
  } else if (map[SOURCE[0]][col] !== 1) {
    alert("Selected [row, col] is not a valid cell");
  } else {
    fillColor(SOURCE, "white");
    SOURCE[1] = col;
    fillColor(SOURCE, "purple");
  }
});

destinationRowInput.addEventListener("change", (e) => {
  const row = parseInt(e.target.value) - 1;
  console.log("dest row:", row);
  if (row > map.length - 1 || row < 0) {
    alert("Please select a valid destination row");
  } else if (map[row][DEST[1]] !== 1) {
    alert("Selected [row, col] is not a valid cell");
  } else {
    fillColor(DEST, "white");
    DEST[0] = row;
    fillColor(DEST, "green");
  }
});

destinationColInput.addEventListener("change", (e) => {
  const col = parseInt(e.target.value) - 1;
  console.log("dest col:", col);
  if (col > map.length - 1 || col < 0) {
    alert("Please select a valid destination column");
  } else if (map[DEST[0]][col] !== 1) {
    alert("Selected [row, col ]is not a valid cell");
  } else {
    fillColor(DEST, "white");
    DEST[1] = col;
    fillColor(DEST, "green");
  }
});

bfsBtn.addEventListener("click", () => {
  dfsBtn.classList.remove("btn-active");
  djkBtn.classList.remove("btn-active");
  bfsBtn.classList.add("btn-active");
  ALGOTORUN = "bfs";
});

dfsBtn.addEventListener("click", () => {
  djkBtn.classList.remove("btn-active");
  bfsBtn.classList.remove("btn-active");
  dfsBtn.classList.add("btn-active");
  ALGOTORUN = "dfs";
});

djkBtn.addEventListener("click", () => {
  dfsBtn.classList.remove("btn-active");
  bfsBtn.classList.remove("btn-active");
  djkBtn.classList.add("btn-active");
  ALGOTORUN = "djk";
});

runBtn.addEventListener("click", () => {
  runAlgorithm(ALGOTORUN);
});

function runAlgorithm(algoName) {
  animate(blocks);
  switch (algoName) {
    case "bfs":
      const bfs = new Bfs(SOURCE, DEST);
      bfs.run();
      break;
    case "dfs":
      const dfs = new Dfs(SOURCE, DEST);
      dfs.run();
      break;
    case "djk":
      const djk = new Dijkstras(SOURCE, DEST);
      return djk.run();
    default:
      return alert("Please select algorithm to run");
  }
}
