const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'hbs');

const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index');
});

// Pages
app.get('/weather', (req, res) => {
  res.send({ forecast: 'Sunny', location: 'Port Elizabeth' });
});

// Server

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
