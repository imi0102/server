const mongoose = require('mongoose');
const ApiConstants = require('../api/constants/api_constants');
const baseSchema = require('./base_model');

const familyCodeSchema = baseSchema.add({
    familyCode : String
  });
const familyCodeModel = mongoose.model(ApiConstants.FAMILY_CODES_COLLECTION, familyCodeSchema);
module.exports = familyCodeModel;