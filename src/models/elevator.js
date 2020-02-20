import { StateLogger } from '../utils/log';

export default class elevator {

  constructor(name) {
    this.name = name;
    this._movement = {
      isMoving: false,
      direction: null
    };
    this.isDoorOpen = false;
  }

  /**
   * START: Door Controls
   */
  openDoor() {
    if (this.isMoving) {
      throw new Error('Jumping off a moving elevator is not a good idea. Let us keep the door shut for now');
    }
    this.isDoorOpen = true;
    StateLogger('door-open', { name: this.name });
  }

  closeDoor() {
    this.isDoorOpen = false;
    StateLogger('door-close', { name: this.name });
  }
  /**
   * END: Door Controls
   */

  /**
   * START: Elevator Movement Controls
   */
  get isMoving() {
    return this._movement && this._movement.isMoving;
  }

  get isMovingUp() {
    return this.isMoving && this._movement.direction === 'up';
  }

  get isMovingDown() {
    this.isMoving && this._movement.direction === 'down';
  }

  moveUp() {
    if (this.isMovingDown) {
      throw new Error('Elevator is moving down. It needs to stop before moving up.');
    }

    if (this.isDoorOpen) {
      throw new Error('Elevator cannot move with an open door.');
    }

    this._movement.isMoving = true;
    this._movement.direction = 'up';
    StateLogger('moving-up',{ name: this.name });
  }

  moveDown() {
    if (this.isMovingUp) {
      throw new Error('Elevator is moving up. It needs to stop before moving down.');
    }

    if (this.isDoorOpen) {
      throw new Error('Elevator cannot move with an open door.');
    }

    this._movement.isMoving = true;
    this._movement.direction = 'down';
    StateLogger('moving-down',{ name: this.name });
  }

  stopMoving() {
    this._movement.isMoving = false;
    this._movement.direction = null;
    StateLogger('stopped-moving',{ name: this.name });
  }

  /**
   * END: Elevator Movement Controls
   */

  /**
   * Elevator is available if the elevator
   * door is closed and if it is either
   * is stationary at the current floor
   * or is moving in the direction of the
   * target floor
   */
  isAvailable(currentFloor, targetFloor) {
    if (this.isDoorOpen) {
      return false;
    }

    let currentFloorNumber = currentFloor.floorNumber;
    let targetFloorNumber = targetFloor.floorNumber;

    if (targetFloorNumber === currentFloorNumber) {
      return this.isMoving; //Not availalbe if moving through current floor, otherwise available
    }

    // If not moving, definitely availalbe
    if (!this.isMoving) {
      return true;
    }

    if (currentFloorNumber < targetFloorNumber && this.isMovingUp) {
      return true;
    }

    if (currentFloorNumber > targetFloorNumber && this.isMovingDown) {
      return true;
    }

    return false;
  }
};
