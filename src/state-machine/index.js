import Floor from '../models/floor';
import Elevator from '../models/elevator';
import { StateLogger } from '../utils/log';
import Trip from '../trip';

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

  async requestElevatorAtFloor(floorNumber) {
    StateLogger('floor-request', { floorNumber })
    let targetFloor = this.getFloor(floorNumber);

    const elevatorCandidateForTargetFloor = () => {
      //find the elevator
      const floorHasAvailableElevator = (floor) => {
        let elevators = floor.elevators.values();
        let availableElevator;

        let elevator = elevators.next();

        do {
          if (elevator.value && elevator.value.isAvailable(floor.floorNumber, targetFloor)) {
            availableElevator = elevator.value;
          }

          elevator = elevators.next();
        }
        while(!elevator.done && !availableElevator);

        return availableElevator;
      }

      let foundElevator;
      let foundOnFloor;
      let index = targetFloor.floorNumber - 1; //This is to normalize the array index
      let oneFloorUp = index+1;
      let oneFloorDown = index-1;

      foundElevator = floorHasAvailableElevator(this.floors[index]);
      foundOnFloor = foundElevator && this.floors[index];

      while (
        !foundElevator &&
        (oneFloorUp < this.floors.length || oneFloorDown >= 0)
      ) {
        if (oneFloorUp < this.floors.length) {
          foundElevator = floorHasAvailableElevator(this.floors[oneFloorUp]);
          foundOnFloor = foundElevator && this.floors[oneFloorUp];
          oneFloorUp++;
        }

        if (!foundElevator && oneFloorDown >= 0) {
          foundElevator = floorHasAvailableElevator(this.floors[oneFloorDown]);
          foundOnFloor = foundElevator && this.floors[oneFloorDown];
          oneFloorDown--;
        }
      }

      return [foundElevator, foundOnFloor];
    };

    let [candidateElevator, candidateElevatorFloor] = elevatorCandidateForTargetFloor();

    let arrivalFloor = await this.goToFloor(candidateElevator, candidateElevatorFloor, targetFloor);

    return new Trip(candidateElevator, arrivalFloor);
  }
};

export default new StateMachine();
