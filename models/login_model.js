const mongoose = require('mongoose');

var loginSchema = new mongoose.Schema({
    email    : String,
    password    : String
  });
  var LoginModel = mongoose.model('login', loginSchema);
  module.exports = LoginModel;