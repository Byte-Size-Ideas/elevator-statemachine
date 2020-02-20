export default class StateMachine {
  // @todo build out the state machine that will manage the elevator

  initialize(floors=2, elevators=1) {
    if (floors < 2) {
      throw new Error('Do you plan on having a stationary elevator? If not, pony up the money and build a couple more floors');
    }

    if (elevators < 1) {
      throw new Error('What is the point of having an elevator simulator without elevators?');
    }
  }
};
