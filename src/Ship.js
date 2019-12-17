class Ship {
  constructor(length) {
    this.length = length;
    this.hits = [];
    this.sunk = false;
  }

  hit() {
    this.hits.push(true);
    this.isSunk();
  }

  isSunk() {
    this.sunk = this.hits.length === this.length;
  }
}

module.exports = Ship;
