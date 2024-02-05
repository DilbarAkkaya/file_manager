import os from "node:os";

const getInfoFromOS = (arg) => {
  switch (arg) {
    case '--EOL':
      console.log('\x1b[95mdefault system End-Of-Line: \x1b[0m', os.EOL, `\x1b[95mos.EOL characters by stringifying to JSON ${JSON.stringify(os.EOL)} \x1b[0m`)
      break;
      case '--cpus':
        const arrCPU = os.cpus();
        const arrOfInfo = [];
        console.log(`\x1b[95mCount of CPUs: ${arrCPU.length} \x1b[0m`);
        arrCPU.forEach((item) => {
          arrOfInfo.push({'model': item.model, 'clock rate (GHz)': item.speed/1000})
        })
        console.table(arrOfInfo);
      break;
    default:
      console.log('Invalid input. Please enter a valid command.');
  }
}
export default getInfoFromOS;