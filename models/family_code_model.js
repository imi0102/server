const mongoose = require('mongoose');
const ApiConstants = require('../api/constatns/api_constants');

var familyCodeSchema = new mongoose.Schema({
    id    : String,
    familyCode : String
  });
  var familyCodeModel = mongoose.model(ApiConstants.FAMILY_CODES_COLLECTION, familyCodeSchema);
  module.exports = familyCodeModel;