const chalk = require('chalk');
const gradient = require('gradient-string');
module.exports = (data, option) => {
  let coloredData = '';

  switch (option) {
    case 'warn':
      coloredData = gradient('#3aed34', '#c2ed34').multiline('『 WARN 』 → ' + data);
      console.log(chalk.bold(coloredData));
      break;
    case 'error':
      coloredData = chalk.bold.hex('#FF0000')('『 WARN 』 → ') + chalk.bold.red(data);
      console.log(coloredData);
      break;
    default:
      coloredData = gradient('#ed3491', '#cb34ed', '#347bed', '#deed34').multiline(`${option} : ` + data);
      console.log(chalk.bold(coloredData));
      break;
  }
};

module.exports.loader = (data, option) => {
  let coloredData = '';

  switch (option) {
    case 'warn':
      coloredData = gradient('#00FFFF' , '#00FF33' , '#FFCCFF' , '#ed3491', '#0000FF' , '#cb34ed' ,'#00FF00' , '#347bed' , '#00EE00').multiline('『 Staw 』→' + data);
      console.log(chalk.bold(coloredData));
      break;
    case 'error':
      coloredData = chalk.bold.hex('#FF0000')('『 Staw 』→') + chalk.bold.red(data);
      console.log(coloredData);
      break;
    default:
      coloredData = gradient('#ed3491', '#cb34ed', '#347bed','#3366FF' , '#FF3366','#0000FF' , '#00DD00').multiline('『 Staw 』→ ' + data);
      console.log(chalk.bold(coloredData));
      break;
  }
};