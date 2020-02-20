export default (e) => {
  if (e.message) {
    console.error(`ERROR: ${e.message}`);
  }
  else {
    console.error('ERROR: [type:unknown]', e);
  }
}
