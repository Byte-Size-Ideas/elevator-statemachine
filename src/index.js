import StateMachine from './state-machine';
import { ErrorLog } from './utils/log';

const app = () => {
  console.log('Application Initiated');

  try {
    // Simulator
    let elevators = 3;
    let floors = 10;

    StateMachine.initialize(floors, elevators);

    // Each trip is a session. To begin a trip, we will request
    // an elevator at a floor;
    StateMachine.requestElevatorAtFloor(3).then((trip) => trip.goToFloor(7));

  }
  catch(e) {
    ErrorLog(e);
  }
};

export default app;
