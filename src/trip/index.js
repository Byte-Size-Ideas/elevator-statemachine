import StateMachine from '../state-machine';

export default class Trip {

  constructor(elevator, currentFloor) {
    this.elevator = elevator;
    this.currentFloor = currentFloor;
  }

  async goToFloor(targetFloor) {
    let targetFloorInstance = StateMachine.getFloor(targetFloor);
    StateMachine.goToFloor(this.elevator, this.currentFloor, targetFloorInstance);

    /**
     * @todo Log a trip
     */
  }
}
