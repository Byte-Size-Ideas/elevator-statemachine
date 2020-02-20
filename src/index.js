import StateMachine from './state-machine';

const app = () => {
  console.log('Application Initiated');

  // Simulator
  let elevators = 3;
  let floors = 10;

  let SM = new StateMachine();

  SM.introduce();

  // @todo Step 1: register floors and elevators

  // @todo Step 2: request an elevator

  // @todo Step 3: command elevator to go to a floor

  // @todo Step 4: repeat above steps 2&3 as many times as desired
};

export default app;
