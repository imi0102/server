const mongoose = require('mongoose');
const baseSchema = require('./base_model');

var loginSchema = baseSchema.add({
    email    : String,
    password    : String
  });
var LoginModel = mongoose.model('family_members', loginSchema);
module.exports = LoginModel;