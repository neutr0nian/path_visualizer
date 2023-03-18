import { map } from "./constants.js";
import { animate, fillColor, runAlgorithm } from "./utils.js";
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
const DEST = [4, 3];

let ALGOTORUN = "";

export const blocks = [];

prepareBlocks(blocks);
animate(blocks);
fillColor(SOURCE, "purple");
fillColor(DEST, "green");

sourceRowInput.addEventListener("change", (e) => {
  const row = parseInt(e.target.value) - 1;
  if (row > map.length - 1 || row < 0) {
    alert("Please select a valid source row");
    sourceRowInput.value = SOURCE[0] + 1;
  } else if (map[row][SOURCE[1]] !== 1) {
    alert("Selected [row, col] is not a valid cell");
    sourceRowInput.value = SOURCE[0] + 1;
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
    sourceRowInput.value = SOURCE[1] + 1;
  } else if (map[SOURCE[0]][col] !== 1) {
    alert("Selected [row, col] is not a valid cell");
    sourceRowInput.value = SOURCE[1] + 1;
  } else {
    fillColor(SOURCE, "white");
    SOURCE[1] = col;
    fillColor(SOURCE, "purple");
  }
});

destinationRowInput.addEventListener("change", (e) => {
  const row = parseInt(e.target.value) - 1;
  if (row > map.length - 1 || row < 0) {
    alert("Please select a valid destination row");
    destinationRowInput.value = DEST[0] + 1;
  } else if (map[row][DEST[1]] !== 1) {
    alert("Selected [row, col] is not a valid cell");
    destinationRowInput.value = DEST[0] + 1;
  } else {
    fillColor(DEST, "white");
    DEST[0] = row;
    fillColor(DEST, "green");
  }
});

destinationColInput.addEventListener("change", (e) => {
  const col = parseInt(e.target.value) - 1;
  if (col > map.length - 1 || col < 0) {
    alert("Please select a valid destination column");
    destinationColInput.value = DEST[1] + 1;
  } else if (map[DEST[0]][col] !== 1) {
    alert("Selected [row, col ]is not a valid cell");
    destinationColInput.value = DEST[1] + 1;
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
  animate(blocks);
  fillColor(SOURCE, "purple");
  fillColor(DEST, "green");
  runAlgorithm(ALGOTORUN, SOURCE, DEST);
});
