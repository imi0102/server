const mongoose = require('mongoose');

var loginSchema = new mongoose.Schema({
    email    : String,
    password    : String
  });
  var LoginModel = mongoose.model('family_members', loginSchema);
  module.exports = LoginModel;