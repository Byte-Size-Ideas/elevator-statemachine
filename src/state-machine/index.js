import Floor from '../models/floor';
import Elevator from '../models/elevator';

class StateMachine {
  // @todo build out the state machine that will manage the elevator

  constructor() {
    this.reset();
  }

  reset() {
    this.floors = [];
    this.isInitialized = false;
  }

  /**
   * Instantiate Floors and Elevators
   *
   * @param {Integer} totalFloors
   * @param {Integer} totalElevators
   */
  initialize(totalFloors=2, totalElevators=1) {
    if (this.isInitialized) {
      throw new Error('Do not try to get cute. You have to reset this statemachine before re-initializing');
    }

    if (totalFloors < 2) {
      throw new Error('Do you plan on having a stationary elevator? If not, pony up the money and build a couple more floors');
    }

    if (totalElevators < 1) {
      throw new Error('What is the point of having an elevator simulator without elevators?');
    }

    this.isInitialized = true;

    // Instantiate Floors
    for (let i = 1; i <= totalFloors; i++) {
      this.floors.push(new Floor(i));
    }

    let firstFloor = this.floors[0];

    // Instantiate Elevator and park it at the
    // first floor.
    for (let i = 1; i <= totalElevators; i++) {
      let elevator = new Elevator(i);

      firstFloor.addElevator(elevator);
    }
  }

  /**
   * Get the instance of the floor
   * @param {Integer} floorNumber
   */
  getFloor(floorNumber) {
    if (floorNumber < 1) {
      throw new Error('This building is built in Florida. So we do not have any basements');
    }

    if (floorNumber > this.floors.length) {
      throw new Error(`The builder only had enough money for ${this.floors.length}. Sorry floor ${floorNumber} does not exist`);
    }

    let floorIndex = floorNumber - 1; //Normalize for array index

    return this.floors[floorIndex];
  }

  requestElevatorAtFloor(floorNumber) {
  }
};

export default new StateMachine();
