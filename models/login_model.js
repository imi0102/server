const mongoose = require('mongoose');
const baseSchema = require('./base_model');

const loginSchema = baseSchema.add({
    email    : String,
    password    : String
  });
const LoginModel = mongoose.model('family_members', loginSchema);
module.exports = LoginModel;