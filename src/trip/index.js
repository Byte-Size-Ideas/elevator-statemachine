import StateMachine from '../state-machine';

export default class Trip {

  constructor(elevator, currentFloor) {
    this.elevator = elevator;
    this.currentFloor = currentFloor;
  }

  async goToFloor(targetFloor) {
    StateMachine.goToFloor(this.elevator, this.currentFloor, targetFloor);
  }
}
