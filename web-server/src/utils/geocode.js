const request = require('postman-request');

const geocode = (address, cb) => {
  const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address,
  )}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&limit=1`;
  request(
    { url: geoUrl, json: true },
    (error, { body: { features = [] } } = {}) => {
      // Setting empty object prevents error from occurring when the function has an error
      if (error) {
        cb('Unable to connect to location services', undefined);
      } else if (features.length === 0) {
        cb('Unable to find location. Try another location.', undefined);
        // msg.error('Unable to get coordinates from geocode API');
      } else {
        const location = features[0].text;
        const {
          coordinates: [longitude, latitude],
        } = features[0].geometry;
        cb(undefined, { longitude, latitude, location });
      }
    },
  );
};

module.exports = geocode;
