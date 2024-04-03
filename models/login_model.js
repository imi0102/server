const mongoose = require('mongoose');

var loginSchema = new mongoose.Schema({
    email    : String,
    password    : String
  });
  var LoginModel = mongoose.model('familyMembers', loginSchema);
  module.exports = LoginModel;