var {
  rotatePossible,
  setDropZone,
  checkCollision
} = require("../src/positionShipsHelpers");

function positionShips() {
  createPositioningGrid();

  // Position ships randomly
  let shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  for (let i = 0; i < 10; i++) {
    let id = "ship" + (i + 1);
    let length = shipLengths[i];
    let collision = true;
    let orientation = "";
    let start = null;
    let end = null;
    let fix = null;
    while (collision === true) {
      orientation = Math.random() < 0.5 ? "hor" : "vert";
      start = Math.floor(Math.random() * (10 - length + 1));
      end = start + length - 1;
      fix = Math.floor(Math.random() * 10);
      collision = !checkCollision(start, end, fix, orientation);
    }
    if (orientation === "hor") {
      initShipPos(id, fix, start, length, "hor");
    } else {
      initShipPos(id, start, fix, length, "vert");
    }
  }
}

function createPositioningGrid() {
  let container = document.getElementById("posGridContainer");

  // Create visible grid
  for (i = 0; i < 10; i++) {
    for (j = 0; j < 10; j++) {
      let field = document.createElement("div");
      let id = i.toString() + j.toString();
      field.id = id;
      field.classList.add("posField");
      container.appendChild(field);
    }
  }
}

function initShipPos(id, iStart, jStart, length, shipOrientation) {
  let elementsList = [];
  let parentId = "";
  let element = null;

  parentId = iStart.toString() + jStart.toString();
  element = document.getElementById(parentId);

  let ship = document.createElement("div");
  ship.classList.add("posUnsunkenShip");
  let shipLength = "";
  if (length === 1) {
    shipLength = "length1";
  } else if (shipOrientation === "hor") {
    switch (length) {
      case 2:
        shipLength = "length2";
        break;
      case 3:
        shipLength = "length3";
        break;
      case 4:
        shipLength = "length4";
        break;
    }
  } else {
    switch (length) {
      case 2:
        shipLength = "length2";
        break;
      case 3:
        shipLength = "length3";
        break;
      case 4:
        shipLength = "length4";
        break;
    }
  }
  ship.addEventListener("dblclick", rotate);
  ship.classList.add(shipLength);
  ship.classList.add(shipOrientation);
  ship.id = id;
  ship.setAttribute("draggable", true);
  ship.addEventListener("dragstart", onDragStart);
  element.appendChild(ship);
}

// Event handler
function rotate(event) {
  let ship = event.target;
  if (rotatePossible(ship)) {
    ship.classList.toggle("vert");
    ship.classList.toggle("hor");
  }
}

// Event handler
function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  let ship = event.target;
  ship.classList.add("moreTransparent");
  setDropZone(ship);
}

module.exports = { positionShips };
