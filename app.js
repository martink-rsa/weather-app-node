const request = require('postman-request');
require('dotenv').config();
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

const long = 37.8267;
const lat = -122.4233;

const weatherstackUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_ACCESS_KEY}&query=${long},${lat}`;

request({ url: weatherstackUrl, json: true }, (error, response) => {
  if (error) {
    msg.error('Unable to access weather API');
  } else if (response.body.error) {
    msg.error('Unable to load coordinates from weather API');
  } else {
    const { temperature, feelslike, precip } = response.body.current;
    msg.info(
      `It is currently ${temperature} degrees out. It feels like ${feelslike} degrees outside. There is ${precip}% chance of rain.`,
    );
  }
});

const city = encodeURIComponent('Los Angeles');

const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&limit=1`;
request({ url: geoUrl, json: true }, (error, response) => {
  if (error) {
    msg.error('Unable to access geocode API');
  } else if (response.body.error) {
    msg.error('Unable to get coordinates from geocode API');
  } else {
    const { coordinates } = response.body.features[0].geometry;
    msg.info(coordinates);
  }
});
