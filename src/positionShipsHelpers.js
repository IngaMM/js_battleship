function rotatePossible(ship) {
  let shipClasses = [...ship.classList];
  let orientation = shipClasses.includes("hor") ? "hor" : "vert";
  let length = getLength(shipClasses);
  let iStart = parseInt(ship.parentElement.id[0]);
  let jStart = parseInt(ship.parentElement.id[1]);
  let newOrientation = orientation === "hor" ? "vert" : "hor";

  // First avoid leaving the grid then check for collision with other ships
  if (newOrientation === "vert" && iStart + length <= 10) {
    if (
      checkCollision(iStart + 1, iStart + length - 1, jStart, newOrientation)
    ) {
      return true;
    }
  }

  if (newOrientation === "hor" && jStart + length <= 10) {
    if (
      checkCollision(jStart + 1, jStart + length - 1, iStart, newOrientation)
    ) {
      return true;
    }
  }

  return false;
}

function getLength(shipClasses) {
  var index, value, result;
  for (let i = 0; i < shipClasses.length; i++) {
    if (shipClasses[i].substring(0, 6) === "length") {
      return parseInt(shipClasses[i].substring(6));
    }
  }
}

function checkCollision(start, end, fix, orientation) {
  // fix is the index perpendicular to the orientation
  // Get a list of all fields that would be newly occupied
  let idList = [];
  noCollision = true;
  if (orientation === "hor") {
    for (let j = start; j <= end; j++) {
      idList.push(fix.toString() + j.toString());
    }
  }
  if (orientation === "vert") {
    for (let i = start; i <= end; i++) {
      idList.push(i.toString() + fix.toString());
    }
  }

  // Get a list of all already occupied fields
  let occupiedList = getOccupiedList();

  // Compare the two lists
  idList.forEach(id => {
    if (occupiedList.includes(id)) {
      noCollision = false;
    }
  });

  return noCollision;
}

function setDropZone(ship) {
  // Avoid leaving the grid
  let shipClasses = [...ship.classList];
  let orientation = shipClasses.includes("hor") ? "hor" : "vert";
  let length = getLength(shipClasses);
  let idList = [];
  // Find possible new parents
  if (orientation === "hor") {
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9 - length + 1; j++) {
        idList.push(i.toString() + j.toString());
      }
    }
  }
  if (orientation === "vert") {
    for (let j = 0; j <= 9; j++) {
      for (let i = 0; i <= 9 - length + 1; i++) {
        idList.push(i.toString() + j.toString());
      }
    }
  }
  // Add event listener for dragover and drop to possible new parents
  idList.forEach(id => {
    let parent = document.getElementById(id);
    parent.addEventListener("dragover", onDragOver);
    parent.addEventListener("drop", onDrop);
  });
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  let id = event.dataTransfer.getData("text");
  let ship = document.getElementById(id);
  ship.classList.remove("moreTransparent");
  let newParent = event.target;

  // Prevent overlaying of ships
  let checkClasses = [...newParent.classList];
  if (checkClasses.includes("posUnsunkenShip")) {
    newParent = event.target.parentElement;
  }

  // Check for collision
  let shipClasses = [...ship.classList];
  let orientation = shipClasses.includes("hor") ? "hor" : "vert";
  let length = getLength(shipClasses);
  let iStart = parseInt(newParent.id[0]);
  let jStart = parseInt(newParent.id[1]);

  if (orientation === "vert") {
    if (checkCollision(iStart, iStart + length - 1, jStart, orientation)) {
      newParent.appendChild(ship);
    }
  }

  if (orientation === "hor") {
    if (checkCollision(jStart, jStart + length - 1, iStart, orientation)) {
      newParent.appendChild(ship);
    }
  }

  event.dataTransfer.clearData();
  clearDropZone();
}

function clearDropZone() {
  for (let j = 0; j <= 9; j++) {
    for (let i = 0; i <= 9; i++) {
      id = i.toString() + j.toString();
      let parent = document.getElementById(id);
      parent.removeEventListener("dragover", onDragOver);
      parent.removeEventListener("drop", onDrop);
    }
  }
}

function getOccupiedList() {
  let ships = document.querySelectorAll(".posUnsunkenShip");
  let occupiedList = [];
  ships.forEach(ship => {
    let shipClasses = [...ship.classList];
    let orientation = shipClasses.includes("hor") ? "hor" : "vert";
    let length = getLength(shipClasses);
    let parent = ship.parentElement.id;
    let iStart = parseInt(ship.parentElement.id[0]);
    let jStart = parseInt(ship.parentElement.id[1]);
    if (orientation === "hor") {
      for (let j = jStart; j < jStart + length; j++) {
        occupiedList.push(iStart.toString() + j.toString());
      }
    } else {
      //vertical
      for (let i = iStart; i < iStart + length; i++) {
        occupiedList.push(i.toString() + jStart.toString());
      }
    }
  });
  return occupiedList;
}

module.exports = {
  rotatePossible,
  setDropZone,
  getLength,
  checkCollision
};
