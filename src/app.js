require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();

const port = process.env.PORT || 3001;

app.post('/', async (req, res) => {
  try {
    fetch('https://api.netlify.com/build_hooks/60e44c82933ae134cffda9dd', {
      method: 'POST',
      body: '',
      headers: { 'Content-Type': 'application/json' },
    });

    res.status(201).send('Success');
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
