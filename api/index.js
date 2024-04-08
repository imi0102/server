const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('../router.js');
const bodyParser = require('body-parser');
const { default: handler } = require('./repository/test.js');
const app = express();
const PORT = process.env.PORT || 5000;

//app.use(bodyParser.json());
// Custom JSON parsing middleware
app.use((req, res, next) => {
  if (req.is('application/json')) {
    let rawData = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => { rawData += chunk; });
    req.on('end', () => {
      try {
        req.body = JSON.parse(rawData);
        next();
      } catch (err) {
        res.status(400).send('Invalid JSON format');
      }
    });
  } else {
    next();
  }
});
//app.use(bodyParser.json({ type: 'application/*+json' }));

app.use(cors());

mongoose.connect('mongodb+srv://adimi0125:adimi0125@clustor0.uinwwnr.mongodb.net/?retryWrites=true&w=majority&appName=clustor0/login');
app.use('/v1',router);
app.post('/api',handler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = app;
