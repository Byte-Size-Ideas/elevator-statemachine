class StateMachine {
  // @todo build out the state machine that will manage the elevator

  constructor() {
    this.reset();
  }

  reset() {
    this.elevators = [];
    this.floors = [];
    this.isInitialized = false;
  }

  initialize(floors=2, elevators=1) {
    if (this.isInitialized) {
      throw new Error('Do not try to get cute. You have to reset this statemachine before re-initializing');
    }

    if (floors < 2) {
      throw new Error('Do you plan on having a stationary elevator? If not, pony up the money and build a couple more floors');
    }

    if (elevators < 1) {
      throw new Error('What is the point of having an elevator simulator without elevators?');
    }

    this.isInitialized = true;
  }
};

export default new StateMachine();
