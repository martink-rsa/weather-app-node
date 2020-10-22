const chalk = require('chalk');
const log = console.log;

const msg = {
  error: (text = 'Error message not specified') => {
    log(chalk.red.bold('Error: \t'), text);
  },
  info: (text = 'Info message not specified') => {
    log(chalk.blue.bold('Info: \t'), text);
  },
  success: (text = 'Success message not specified') => {
    log(chalk.green.bold('Success:'), text);
  },
  warn: (text = 'Warning message not specified') => {
    log(chalk.yellow.bold('Warn: \t'), text);
  },
};

module.exports = msg;
