const mongoose = require('mongoose');

var familyCodeSchema = new mongoose.Schema({
    id    : String,
    familyCode : String
  });
  var familyCodeModel = mongoose.model('familyCodes', familyCodeSchema);
  module.exports = familyCodeModel;