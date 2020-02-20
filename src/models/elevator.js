export default class elevator {

  constructor(name) {
    this.name = name;
    this._movement = {
      isMoving: false,
      direction: null
    }
  }

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

    this._movement.isMoving = true;
    this._movement.direction = 'up';
  }

  moveDown() {
    if (this.isMovingUp) {
      throw new Error('Elevator is moving up. It needs to stop before moving down.');
    }

    this._movement.isMoving = true;
    this._movement.direction = 'down';
  }

  stopMoving() {
    this._movement.isMoving = false;
    this._movement.direction = null;
  }

};
