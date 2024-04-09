const mongoose = require('mongoose');
const ApiConstants = require('../api/constants/api_constants');
const baseSchema = require('./base_model');

var familyCodeSchema = baseSchema.add({
    familyCode : String
  });
var FamilyCodeModel = mongoose.model(ApiConstants.FAMILY_CODES_COLLECTION, familyCodeSchema);
module.exports = FamilyCodeModel;