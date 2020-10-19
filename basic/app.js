require('dotenv').config();
const chalk = require('chalk');
const log = console.log;
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const msg = require('./utils/msg');

console.clear();

const address = process.argv[2];

if (!address) {
  console.log('Please provide an address');
} else {
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      msg.error(error);
    } else {
      msg.info(`${latitude} ${longitude}`);
      forecast(latitude, longitude, location, (error, data) => {
        if (error) {
          msg.error(error);
        } else {
          msg.info(data);
        }
      });
    }
  });
}
