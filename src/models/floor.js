export default class floor {

  constructor(floorNumber) {
    this.floorNumber = floorNumber;
    this.elevators = new Set();
  }

  // Add elevator to current floor
  addElevator(elevator) {
    if (!this.elevators.has(elevator)) {
      this.elevators.add(elevator);
    }
  }

  // Remove elevator from current floor
  removeElevator(elevator) {
    if (this.elevators.has(elevator)) {
      this.elevators.delete(elevator);
    }
  }
};
