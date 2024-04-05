const express = require('express');
//const cors = require('cors');
const mongoose = require('mongoose');
const router = require('../router.js');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ type: 'application/*+json' }));

//app.use(cors());

mongoose.connect('mongodb+srv://adimi0125:adimi0125@clustor0.uinwwnr.mongodb.net/?retryWrites=true&w=majority&appName=clustor0/login');
app.use('/v1',router);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
