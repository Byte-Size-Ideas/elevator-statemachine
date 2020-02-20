export const ErrorLog = (e) => {
  if (e.message) {
    console.error(`ERROR: ${e.message}`);
  }
  else {
    console.error('ERROR: [type:unknown]', e);
  }
}

export const StateLogger = (state, options) => {
  switch (state) {
    case 'door-open':
    case 'door-close':
    case 'moving-up':
    case 'moving-down':
    case 'stopped-moving':
      ElevatorDoorAndMovement(state,options);
      break;
    default:
      ErrorLog(new Error(`No log definition found for state ${state}`));
      break;
  }
}

const ElevatorDoorAndMovement = (state, options) => {
  let { name = 'unknown' } = options;

  switch (state) {
    case 'door-open':
      console.log(`Opening door for elevator ${name}.`);
      break;
    case 'door-close':
      console.log(`Closing door for elevator ${name}.`);
      break;
    case 'moving-up':
      console.log(`Elevator ${name} is moving upwards.`);
      break;
    case 'moving-down':
      console.log(`Elevator ${name} is moving downwards.`);
      break;
    case 'stopped-moving':
      console.log(`Elevator ${name} is not moving.`);
      break;
  }

}
