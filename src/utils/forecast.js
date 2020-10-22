const request = require('postman-request');

const forecast = (latitude, longitude, location, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_ACCESS_KEY}&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb('Unable to connect to weather services', undefined);
    } else if (body.error) {
      cb('Unable to get weather for location', undefined);
    } else {
      const { temperature, feelslike, precip } = body.current;
      cb(
        undefined,
        `It is currently ${temperature} °C out. It feels like ${feelslike} °C outside. There is ${precip}% chance of rain.`,
      );
    }
  });
};

module.exports = forecast;
