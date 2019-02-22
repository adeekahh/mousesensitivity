"use strict";

let img = new Image();
let canvas = document.getElementById("imageCanvas");
let ctx = document.getElementById("imageCanvas").getContext("2d");
let imageData = null;

let xPos = null;
let yPos = null;

let xVal = null;
let yVal = null;

let w = null;
let h = null;

let displacementX = null;
let displacementY = null;

const MAX_MOVEMENT = 25;

window.addEventListener("load", init());
function init() {
  img.addEventListener(
    "load",
    function() {
      ctx.drawImage(img, 0, 0);

      getImageData();
      mouseMoved();
    },
    false
  );
  img.src = "cat.jpg"; // Set source path
}

function getImageData() {
  w = ctx.canvas.width;
  h = ctx.canvas.height;

  imageData = ctx.getImageData(0, 0, w, h);
  console.log(imageData);
}

function mouseMoved() {
  canvas.addEventListener("mousemove", function() {
    //CLEAR RECT - 500x600
    ctx.clearRect(0, 0, w, h);
    //PUT IMAGEDATA ON CANVAS
    ctx.putImageData(imageData, 0, 0);

    xPos = event.offsetX; // Get the horizontal coordinate
    yPos = event.offsetY; // Get the vertical coordinate

    xVal = (xPos / w) * 2 - 1;
    yVal = (yPos / h) * 2 - 1;

    //DRAW SMALL RECTANGLE AT THE X AND Y POS
    ctx.strokeRect(25 + displacementX, 25 + displacementY, 450, 550);

    document.querySelector(".xVal").textContent = xVal;
    document.querySelector(".yVal").textContent = yVal;

    //CALCULATE DISPLACEMENTS WITH MULTIPLYING WITH MAX MOVEMENT

    displacementX = xVal * MAX_MOVEMENT;
    displacementY = yVal * MAX_MOVEMENT;

    //console.log(displacementX, displacementY);
  });
}
