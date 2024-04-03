const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username    : String,
    password    : String
  });
  var Login = mongoose.model('login', userSchema);
  module.exports = Login;