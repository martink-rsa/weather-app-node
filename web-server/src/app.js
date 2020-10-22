require('dotenv').config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const msg = require('./utils/msg.js');

const app = express();

// Define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

const websiteName = 'Node Weather App';

app.get('', (req, res) => {
  res.render('index', { title: 'Home', websiteName });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', websiteName });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    helpText: 'Enter in a location to get the weather.',
    websiteName,
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'An address query must be provided' });
  }
  const { address } = req.query;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      msg.error(error);
      res.send({ error });
    } else {
      msg.info(`${latitude} ${longitude}`);
      forecast(latitude, longitude, location, (error, data) => {
        if (error) {
          msg.error(error);
          res.send({ error });
        } else {
          res.send({ address, location, forecast: data });
        }
      });
    }
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Article not found',
    websiteName,
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    websiteName,
  });
});

// Server

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
